#!/bin/bash

# Script para renomear imagens para o padrão correto
echo "Renomeando imagens para o padrão correto..."

# Renomear imagens de forros (já estão no padrão correto)
echo "Forros já estão no padrão correto"

# Renomear imagens de embalagens
if [ -f "public/img/produtos/embalagens/perolas/embalagens-perolas-01.avif" ]; then
    echo "Embalagens perolas já renomeadas"
else
    echo "Renomeando embalagens perolas..."
    mv "public/img/produtos/embalagens/perolas/embalagens-perolas01.jpg" "public/img/produtos/embalagens/perolas/embalagens-perolas-01.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/perolas/embalagens-perolas02.png" "public/img/produtos/embalagens/perolas/embalagens-perolas-02.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/perolas/embalagens-perolas03.jpg" "public/img/produtos/embalagens/perolas/embalagens-perolas-03.avif" 2>/dev/null || echo "Arquivo não encontrado"
fi

# Renomear imagens de embalagens diversas
if [ -f "public/img/produtos/embalagens/embalagens/embalagens-01.avif" ]; then
    echo "Embalagens diversas já renomeadas"
else
    echo "Renomeando embalagens diversas..."
    mv "public/img/produtos/embalagens/embalagens/slider-3.jpg" "public/img/produtos/embalagens/embalagens/embalagens-01.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (51).JPG" "public/img/produtos/embalagens/embalagens/embalagens-02.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (2).JPG" "public/img/produtos/embalagens/embalagens/embalagens-03.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (3).JPG" "public/img/produtos/embalagens/embalagens/embalagens-04.avif" 2>/dev/null || echo "Arquivo não encontrado"
    mv "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (52).JPG" "public/img/produtos/embalagens/embalagens/embalagens-05.avif" 2>/dev/null || echo "Arquivo não encontrado"
fi

# Renomear imagens de construção civil
if [ -f "public/img/produtos/construcao-civil/flocos-em-eps-01.avif" ]; then
    echo "Construção civil já renomeada"
else
    echo "Renomeando construção civil..."
    mv "public/img/produtos/construcao-civil/flocosemeps.jpg" "public/img/produtos/construcao-civil/flocos-em-eps-01.avif" 2>/dev/null || echo "Arquivo não encontrado"
fi

# Renomear imagens de molduras (já estão no padrão correto)
echo "Molduras já estão no padrão correto"

echo "Renomeação concluída!" 