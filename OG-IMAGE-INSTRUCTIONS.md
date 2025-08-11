# 📸 Instruções para Imagem de Compartilhamento Social

## Problema Resolvido ✅
O filtro rosa nas imagens quando o site é compartilhado foi causado por:
- `mix-blend-mode: multiply` nas imagens dos produtos (já removido)
- Falta de meta tags adequadas para compartilhamento social (já implementadas)

## 🎯 Imagem de Compartilhamento Recomendada

### Dimensões
- **Formato**: PNG ou JPG
- **Tamanho**: 1200x630 pixels (proporção 1.91:1)
- **Localização**: `/public/img/og-image.png`

### Conteúdo Recomendado
- **Logo ISOART** (posicionado no canto superior esquerdo)
- **Título**: "Soluções em EPS e PIR para Construção Civil"
- **Subtítulo**: "Especialistas em isolamento térmico"
- **Cores da marca**:
  - Azul principal: #004E73
  - Dourado: #D4D7C3
  - Fundo: Branco ou cinza claro

### Design
- Layout limpo e profissional
- Tipografia legível
- Espaçamento adequado entre elementos
- Sem filtros ou efeitos que possam causar distorções

## 🔧 Como Implementar

1. **Criar a imagem** seguindo as especificações acima
2. **Salvar como** `/public/img/og-image.png`
3. **Atualizar as meta tags** no `layout.tsx`:
   ```typescript
   images: [
     {
       url: '/img/og-image.png',
       width: 1200,
       height: 630,
       alt: 'ISOART - Soluções em EPS e PIR para Construção Civil',
       type: 'image/png',
     },
   ],
   ```

## 📱 Plataformas Suportadas
- **Facebook/Instagram**: Open Graph
- **Twitter**: Twitter Cards
- **LinkedIn**: Open Graph
- **WhatsApp**: Open Graph
- **Telegram**: Open Graph

## ✅ Status Atual
- [x] Meta tags implementadas
- [x] Filtro rosa removido
- [x] Logo SVG como imagem temporária
- [ ] Imagem de compartilhamento personalizada (pendente)
