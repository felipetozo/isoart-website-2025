#!/bin/bash

# Script para atualizar referências de molduras para AVIF

echo "Atualizando referências de molduras para AVIF..."

# Lista de arquivos para atualizar
FILES=(
    "src/app/data/products/molduras-decorativas/molduras-portas-janelas.json"
    "src/app/data/products/molduras-decorativas/molduras-beiral.json"
    "src/app/data/products/molduras-decorativas/molduras-paredes.json"
    "src/app/data/products/molduras-decorativas/molduras-muros.json"
    "src/app/data/products/molduras-decorativas/molduras-colunas-capiteis.json"
)

# Atualizar cada arquivo
for file in "${FILES[@]}"; do
    echo "Atualizando $file..."
    
    # Substituir .png por .avif
    sed -i '' 's/\.png/\.avif/g' "$file"
    
    # Substituir .jpg por .avif nos projectImages
    sed -i '' 's/slider-[0-9]*\.jpg/molduras-01.avif/g' "$file"
done

echo "Atualização concluída!" 