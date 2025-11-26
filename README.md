# Bah!Bordei - Site Institucional

Este é o repositório do site institucional da Bah!Bordei, uma marca de bordados artesanais. O site foi desenvolvido para apresentar as coleções de produtos, contar a história da marca e facilitar o contato para encomendas.

**Acesse o site ao vivo:** [https://alexsandrornichele-sudo.github.io/bah-bordei-site/](https://alexsandrornichele-sudo.github.io/bah-bordei-site/)

---

## Tecnologias Utilizadas

*   **HTML5:** Para a estrutura e conteúdo das páginas.
*   **CSS3:** Para estilização, layout e responsividade (incluindo Flexbox e Grid).
*   **JavaScript (ES6):** Para interatividade, como a animação de digitação, os modais (pop-ups) e o carregamento dinâmico do cabeçalho e rodapé.

---

## Estrutura do Projeto

O projeto foi estruturado para ser modular e de fácil manutenção.

-   `index.html`: A página inicial do site.
-   `produtos.html`: A página que exibe todas as coleções disponíveis.
-   `colecao-*.html`: Páginas dedicadas para cada coleção de produtos.
-   `header.html`: **Arquivo centralizado do cabeçalho.** Qualquer alteração feita aqui aparecerá em todas as páginas.
-   `footer.html`: **Arquivo centralizado do rodapé.** Contém as informações de contato, modais e o botão "Voltar ao Topo".
-   `style.css`: A folha de estilos principal, contendo toda a aparência do site.
-   `script.js`: O arquivo JavaScript principal, responsável por:
    -   Carregar o `header.html` e o `footer.html` em todas as páginas.
    -   Controlar a animação de "máquina de escrever".
    -   Gerenciar os modais de galeria de imagens e de contato.
    -   Controlar o menu hambúrguer em telas móveis.
-   `/images`: Pasta contendo todas as imagens do site.

---

## Como Fazer Alterações

### Para alterar o Cabeçalho ou Rodapé:
Basta editar os arquivos `header.html` ou `footer.html`, respectivamente. As mudanças serão aplicadas a todo o site automaticamente.

### Para adicionar um novo produto a uma coleção existente:
1.  Abra o arquivo `colecao-*.html` correspondente.
2.  Copie um bloco `<div class="product-card">...</div>` existente.
3.  Cole-o abaixo e altere a imagem (`src`), o título (`<h3>`), a descrição (`<p>`) e o link do WhatsApp.

### Para publicar suas alterações:
Após fazer qualquer alteração nos arquivos, abra o terminal na pasta do projeto e execute os seguintes comandos:

```bash
# 1. Adiciona todas as suas alterações
git add .

# 2. Cria um "commit" (um registro) com uma mensagem descritiva
git commit -m "Descreva aqui a alteração que você fez"

# 3. Envia as alterações para o GitHub
git push
```
O GitHub Pages atualizará o site ao vivo automaticamente em alguns minutos.