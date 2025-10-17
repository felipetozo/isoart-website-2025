# CI/CD - Fluxo de Integração e Deploy Contínuo

## Introdução ao CI/CD

CI/CD (Continuous Integration/Continuous Deployment) é uma prática de desenvolvimento que automatiza o processo de integração de código e deploy de aplicações. No contexto do projeto Isoart Website 2025, implementaremos um fluxo que garante:

- **Qualidade do código**: Testes automáticos e análise de código
- **Deploy seguro**: Deploy automático em ambientes de staging e produção
- **Rastreabilidade**: Histórico completo de mudanças e deploys
- **Eficiência**: Redução de erros manuais e tempo de deploy

## Visão Geral do Projeto

**Projeto**: Isoart Website 2025
**Stack**: Next.js 15, React 19, TypeScript, TailwindCSS, next-intl, GSAP
**Repositório**: GitHub (conectado à Vercel)

### Arquitetura de Deploy

**Staging (Testes)**
- **Plataforma**: Vercel
- **Branch**: `develop`
- **Deploy**: Automático via integração GitHub-Vercel
- **URL**: Gerada automaticamente pela Vercel
- **Finalidade**: Testes e validação antes da produção

**Produção**
- **Plataforma**: Servidor privado regional
- **Branch**: `main`
- **Deploy**: FTP + notificação ao gestor para reset/rebuild
- **Processo atual**: Manual (envio de arquivos via FTP)
- **Processo futuro**: Automatizado via GitHub Actions

### Monitoramento e Analytics
- **Vercel Analytics**: Ativo
- **Google Analytics**: Configurado e pronto para ativação

## Implementação em Fases

### Fase A - Validação Básica e Automação (IMPLEMENTAÇÃO INICIAL)

#### 1. Workflows GitHub Actions
- [ ] **CI Básico** (`.github/workflows/ci.yml`)
  - Validação em todos os PRs e pushes
  - ESLint (`npm run lint`)
  - TypeScript type-check (`tsc --noEmit`)
  - Build test (`npm run build`)
  - Cache de node_modules
  - Matriz Node.js (18.x, 20.x)

- [ ] **Deploy Staging** (`.github/workflows/deploy-staging.yml`)
  - Trigger: Push para `develop`
  - Vercel gerencia deploy automaticamente
  - Notificações de status no PR
  - Validação antes do merge

- [ ] **Deploy Produção** (`.github/workflows/deploy-production.yml`)
  - Trigger: Push para `main`
  - Build de produção
  - Upload via FTP para servidor privado
  - Notificação ao gestor para reset
  - Criação de release tag

#### 2. Configuração GitHub
- [ ] **Secrets necessários**:
  - `FTP_SERVER` - endereço do servidor
  - `FTP_USERNAME` - usuário FTP
  - `FTP_PASSWORD` - senha FTP
  - `FTP_SERVER_DIR` - diretório de destino
  - `NOTIFY_WEBHOOK_URL` - notificação gestor (opcional)

- [ ] **Branch Protection Rules**:
  - `main`: Require PR reviews + status checks
  - `develop`: Require status checks
  - No direct pushes em `main`

- [ ] **Template Pull Request** (`.github/pull_request_template.md`)
  - Checklist de validação
  - Descrição de mudanças
  - Screenshots quando aplicável

### Fase B - Testes de Componentes (FUTURO)
- [ ] Configuração Jest
- [ ] Testes de componentes React
- [ ] Workflow de testes automatizados

### Fase C - Testes E2E e Performance (FUTURO)
- [ ] Playwright para testes E2E
- [ ] Lighthouse para performance
- [ ] Testes de acessibilidade

## Estrutura de Branches

```
main (produção)
├── develop (staging)
├── feature/nova-funcionalidade
├── hotfix/correcao-urgente
└── release/versao-x.x.x
```

## Workflow de Desenvolvimento

1. **Feature Development**
   - Criar branch a partir de `develop`
   - Desenvolver funcionalidade
   - Criar Pull Request para `develop`

2. **Code Review e CI**
   - Revisão de código
   - Execução automática: ESLint, TypeScript, Build
   - Aprovação e merge em `develop`

3. **Staging Deploy**
   - Deploy automático para Vercel (staging)
   - Validação da funcionalidade
   - Testes de integração

4. **Production Release**
   - Merge de `develop` para `main`
   - Deploy automático via FTP para servidor privado
   - Notificação ao gestor para reset do build
   - Criação de release tag no GitHub

## Benefícios Esperados

### Fase A (Imediatos)
- **Validação automática** de código em todos os PRs
- **Deploy automático** para staging (Vercel)
- **Deploy automático** para produção via FTP
- **Redução de 80%** nos erros de deploy manual
- **Rastreabilidade completa** via GitHub releases
- **Notificações automáticas** ao gestor do servidor

### Fases B e C (Futuro)
- **Melhoria na qualidade** do código através de testes automáticos
- **Maior confiabilidade** com rollback automático
- **Testes de performance** automatizados
- **Monitoramento contínuo** de acessibilidade

## Estrutura de Arquivos (Fase A)

```
.github/
├── workflows/
│   ├── ci.yml                    # Validação básica
│   ├── deploy-staging.yml        # Notificações Vercel
│   └── deploy-production.yml     # Deploy FTP + notificação
└── pull_request_template.md      # Template de PRs
```

## Configurações Necessárias

### GitHub Secrets (Repositório)
```bash
# FTP para deploy de produção
FTP_SERVER=seu_servidor_ftp.com
FTP_USERNAME=usuario_ftp
FTP_PASSWORD=senha_ftp_segura
FTP_SERVER_DIR=/home/uisoart/

# SMTP para envio de emails
SMTP_HOST=mail.infc.srv.br
SMTP_PORT=587
SMTP_USER=noreply@isoart.com.br
SMTP_PASS=senha_do_noreply

# Analytics
NEXT_PUBLIC_SURI_CHATBOT_ID=seu_chatbot_id
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# Notificações (opcional)
NOTIFY_WEBHOOK_URL=https://webhook.exemplo.com/notify
```

### Configuração de Email
```bash
# Usuário SMTP (quem envia)
SMTP_USER=noreply@isoart.com.br

# Destinos:
# - Formulários de contato → contato@isoart.com.br
# - Notificações do sistema → felipetozo@icloud.com
```

### Branch Protection Rules
- **Branch `main`**:
  - Require a pull request before merging
  - Require status checks to pass before merging
  - Restrict pushes that create files larger than 100 MB
- **Branch `develop`**:
  - Require status checks to pass before merging

## Próximos Passos

1. ✅ Revisar e aprovar este documento
2. [ ] Criar workflows do GitHub Actions
3. [ ] Configurar secrets no GitHub
4. [ ] Configurar branch protection rules
5. [ ] Executar primeiro deploy automatizado
6. [ ] Validar funcionamento completo

---

*Este documento será atualizado conforme a implementação avança.*
