# Website Bah!Bordei

## 📖 Descrição

Este é o código-fonte do site institucional da **Bah!Bordei**, um ateliê de bordados artesanais. O projeto foi desenvolvido como um portfólio online para exibir as coleções de produtos, contar a história da marca e facilitar o contato para encomendas.

O site foi construído com HTML, CSS e JavaScript puro, utilizando uma arquitetura de **Single Page Application (SPA)** para proporcionar uma navegação fluida e rápida, sem a necessidade de recarregar a página a cada clique.

---

## ✨ Funcionalidades Principais

-   **Navegação SPA (Single Page Application):** Transições de página instantâneas que carregam apenas o conteúdo necessário, melhorando a experiência do usuário.
-   **Design Responsivo:** Layout adaptado para uma visualização otimizada em desktops, tablets e smartphones.
-   **Navegação Móvel Otimizada:** A barra de navegação em dispositivos móveis é horizontal e rolável, com salvamento de posição e centralização automática do item clicado.
-   **Componentes Dinâmicos e Interativos:**
    -   **Slider de Imagens:** Na página inicial, apresentando os principais trabalhos.
    -   **Galeria de Imagens (Lightbox):** Permite visualizar as imagens dos produtos em tamanho maior, com navegação entre elas.
    -   **Modal de Contato:** Um pop-up que oferece opções de contato (ligação e WhatsApp) de forma acessível.
    -   **Animações Sutis:** Efeito de "máquina de escrever" no slogan e animações de fade-in nos produtos conforme o usuário rola a página.
-   **Atualização Dinâmica da Navegação:** A barra de navegação é atualizada dinamicamente para exibir os links relevantes para cada seção (ex: lista de produtos na página de produtos).

---

## 📂 Estrutura de Arquivos

```
/
├── index.html                  # Página inicial
├── produtos.html               # Página com a visão geral das coleções
├── colecao-porta-aliancas.html # Página de uma coleção específica (e outras)
├── style.css                   # Folha de estilos principal
├── script.js                   # Lógica de interatividade e SPA
└── /images/                    # Pasta com todas as imagens do site
```

---

## 🛠️ Como Funciona

### Lógica de SPA (`script.js`)

O coração do site é o `script.js`, que gerencia a navegação sem recarregamento de página.

1.  **Interceptação de Cliques:** Um `event listener` global captura cliques em links `<a>`.
2.  **Prevenção de Recarregamento:** Se o link for interno, o comportamento padrão do navegador é prevenido com `e.preventDefault()`.
3.  **Busca de Conteúdo:** A função `loadContent` utiliza a API `fetch` para buscar o conteúdo HTML da URL do link clicado.
4.  **Atualização do DOM:** O HTML recebido é parseado. O conteúdo das tags `<main>` e `<nav>` da página atual é substituído pelo conteúdo das mesmas tags da página buscada.
5.  **Atualização do Histórico:** A URL do navegador é atualizada com `history.pushState()`, e o evento `popstate` é usado para gerenciar os botões de "voltar" e "avançar".
6.  **Reinicialização de Scripts:** Funções de inicialização de componentes (como o slider e a galeria) são chamadas novamente para que funcionem no novo conteúdo carregado.

### Navegação Móvel (`initializeNavScroller`)

Para telas menores, a barra de navegação se torna rolável.

-   **Rolagem por Clique:** Ao clicar em um item, a barra rola suavemente para centralizá-lo.
-   **Memória de Posição:** A posição de rolagem manual de cada página é salva no `sessionStorage`. Ao voltar para uma página, essa posição é restaurada, proporcionando uma experiência contínua.

---

## 🚀 Como Publicar Alterações

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