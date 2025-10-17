#!/bin/sh

# Diretório da aplicação (ajuste se necessário)
APP_DIR="/"

cd "$APP_DIR" || exit 1

# Log básico
echo "[RESET] Iniciando reset completo em $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> reset.log 2>&1

# Remover build anterior
rm -rf .next >> reset.log 2>&1

# Instalar dependências de produção
npm ci --only=production >> reset.log 2>&1 || npm install --omit=dev >> reset.log 2>&1

# Gerar novo build
npm run build >> reset.log 2>&1

echo "[RESET] Concluído em $(date -u +%Y-%m-%dT%H:%M:%SZ)" >> reset.log 2>&1

exit 0

