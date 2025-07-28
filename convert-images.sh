#!/bin/bash

# Script para converter imagens para AVIF
# Requer: imagemagick com suporte a AVIF

echo "Convertendo imagens para AVIF..."

# Função para converter uma imagem
convert_to_avif() {
    local input_file="$1"
    local output_file="$2"
    
    if [ -f "$input_file" ]; then
        echo "Convertendo: $input_file -> $output_file"
        convert "$input_file" "$output_file"
    else
        echo "Arquivo não encontrado: $input_file"
    fi
}

# Converter imagens de forros
convert_to_avif "public/img/produtos/forros/forros-dunas-01.png" "public/img/produtos/forros/forros-dunas-01.avif"
convert_to_avif "public/img/produtos/forros/forros-dunas-02.png" "public/img/produtos/forros/forros-dunas-02.avif"
convert_to_avif "public/img/produtos/forros/forros-dunas-03.png" "public/img/produtos/forros/forros-dunas-03.avif"
convert_to_avif "public/img/produtos/forros/forros-paris-01.png" "public/img/produtos/forros/forros-paris-01.avif"
convert_to_avif "public/img/produtos/forros/forros-paris-02.png" "public/img/produtos/forros/forros-paris-02.avif"
convert_to_avif "public/img/produtos/forros/forros-paris-03.png" "public/img/produtos/forros/forros-paris-03.avif"

# Converter imagens de embalagens
convert_to_avif "public/img/produtos/embalagens/perolas/embalagens-perolas01.jpg" "public/img/produtos/embalagens/perolas/embalagens-perolas-01.avif"
convert_to_avif "public/img/produtos/embalagens/perolas/embalagens-perolas02.png" "public/img/produtos/embalagens/perolas/embalagens-perolas-02.avif"
convert_to_avif "public/img/produtos/embalagens/perolas/embalagens-perolas03.jpg" "public/img/produtos/embalagens/perolas/embalagens-perolas-03.avif"

# Converter imagens de embalagens diversas
convert_to_avif "public/img/produtos/embalagens/embalagens/slider-3.jpg" "public/img/produtos/embalagens/embalagens/embalagens-01.avif"
convert_to_avif "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (51).JPG" "public/img/produtos/embalagens/embalagens/embalagens-02.avif"
convert_to_avif "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (2).JPG" "public/img/produtos/embalagens/embalagens/embalagens-03.avif"
convert_to_avif "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (3).JPG" "public/img/produtos/embalagens/embalagens/embalagens-04.avif"
convert_to_avif "public/img/produtos/embalagens/embalagens/EMBALAGENS DIVERSAS (52).JPG" "public/img/produtos/embalagens/embalagens/embalagens-05.avif"

# Converter imagens de construção civil
convert_to_avif "public/img/produtos/construcao-civil/flocosemeps.jpg" "public/img/produtos/construcao-civil/flocos-em-eps-01.avif"

# Converter imagens de molduras
convert_to_avif "public/img/produtos/molduras/molduras-portas-01.png" "public/img/produtos/molduras/molduras-portas-01.avif"
convert_to_avif "public/img/produtos/molduras/molduras-beiral-01.png" "public/img/produtos/molduras/molduras-beiral-01.avif"
convert_to_avif "public/img/produtos/molduras/molduras-paredes-01.png" "public/img/produtos/molduras/molduras-paredes-01.avif"
convert_to_avif "public/img/produtos/molduras/molduras-muros-01.png" "public/img/produtos/molduras/molduras-muros-01.avif"
convert_to_avif "public/img/produtos/molduras/molduras-colunas-01.png" "public/img/produtos/molduras/molduras-colunas-01.avif"

echo "Conversão concluída!" 