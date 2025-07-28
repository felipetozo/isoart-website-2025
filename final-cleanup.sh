#!/bin/bash

# Script final para remover todas as imagens não utilizadas

echo "Removendo todas as imagens não utilizadas..."

# Lista de imagens que ainda são referenciadas nos JSONs
USED_IMAGES=(
    "public/img/produtos/forros/forros-dunas-01.avif"
    "public/img/produtos/forros/forros-dunas-02.avif"
    "public/img/produtos/forros/forros-dunas-03.avif"
    "public/img/produtos/forros/forros-paris-01.avif"
    "public/img/produtos/forros/forros-paris-02.avif"
    "public/img/produtos/forros/forros-paris-03.avif"
    "public/img/produtos/embalagens/perolas/embalagens-perolas-01.avif"
    "public/img/produtos/embalagens/perolas/embalagens-perolas-02.avif"
    "public/img/produtos/embalagens/perolas/embalagens-perolas-03.avif"
    "public/img/produtos/embalagens/embalagens/embalagens-01.avif"
    "public/img/produtos/embalagens/embalagens/embalagens-02.avif"
    "public/img/produtos/embalagens/embalagens/embalagens-03.avif"
    "public/img/produtos/embalagens/embalagens/embalagens-04.avif"
    "public/img/produtos/embalagens/embalagens/embalagens-05.avif"
    "public/img/produtos/construcao-civil/flocos-em-eps-01.avif"
    "public/img/produtos/molduras/molduras-portas-01.avif"
    "public/img/produtos/molduras/molduras-beiral-01.avif"
    "public/img/produtos/molduras/molduras-paredes-01.avif"
    "public/img/produtos/molduras/molduras-muros-01.avif"
    "public/img/produtos/molduras/molduras-colunas-01.avif"
)

# Função para verificar se uma imagem está na lista de usadas
is_used() {
    local file="$1"
    for used in "${USED_IMAGES[@]}"; do
        if [[ "$file" == "$used" ]]; then
            return 0
        fi
    done
    return 1
}

# Remover todas as imagens antigas (JPG, PNG) que não estão sendo usadas
echo "Removendo imagens antigas não utilizadas..."
find public/img/produtos -name "*.jpg" -o -name "*.png" | while read file; do
    echo "Removendo arquivo antigo: $file"
    rm "$file"
done

# Remover imagens AVIF não utilizadas
echo "Removendo imagens AVIF não utilizadas..."
find public/img/produtos -name "*.avif" | while read file; do
    if ! is_used "$file"; then
        echo "Removendo imagem não utilizada: $file"
        rm "$file"
    fi
done

echo "Limpeza final concluída!" 