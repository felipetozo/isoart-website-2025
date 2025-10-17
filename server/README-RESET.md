Reset automático pós-deploy (sem SSH)

Passo a passo para o gestor configurar no servidor (acesso apenas por FTP + painel):

1) Criar o script /restart.sh (na raiz do site)
   - Enviar o arquivo via FTP (conteúdo em server/restart.sh)
   - No painel (cPanel/Plesk/Outro), definir permissões 755 (executable)

2) Criar um Cron Job (a cada 1 minuto)
   Comando do cron:
   * * * * * [ -f /trigger.txt ] && /bin/sh /restart.sh && rm -f /trigger.txt

3) Como funciona
   - O CI/CD envia um arquivo /trigger.txt ao final do deploy
   - O cron detecta o arquivo, executa /restart.sh e remove o trigger

4) Observações
   - O /restart.sh abaixo executa um reset completo: remove .next, instala deps de prod e gera build
   - Garanta que Node.js e npm estejam disponíveis no servidor
   - Ajuste APP_DIR se o site estiver em subpasta

