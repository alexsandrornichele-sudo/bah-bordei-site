# Bah!Bordei - Site Institucional

Este é o repositório do site institucional da **Bah!Bordei**, um ateliê de bordados artesanais. O projeto foi desenvolvido como um portfólio online para exibir as coleções de produtos, contar a história da marca e facilitar o contato para encomendas.

O site foi construído com foco em design responsivo, performance e uma experiência de usuário moderna, utilizando uma arquitetura de **Single Page Application (SPA)** com HTML, CSS e JavaScript puros.

## ✨ Funcionalidades Principais

- **Design Totalmente Responsivo**: Layout adaptado para uma visualização ideal em desktops, tablets e celulares.
- **Tipografia e Espaçamento Fluidos**: Uso da função `clamp()` do CSS para que fontes e espaçamentos se ajustem suavemente ao tamanho da tela, sem saltos bruscos.
- **Navegação SPA (Single Page Application)**: Transições de página rápidas e suaves sem a necessidade de recarregar o site, utilizando a History API do navegador.
- **Slider de Imagens**: Um carrossel automático e em loop infinito na página inicial para destacar os principais trabalhos.
- **Galeria de Imagens (Lightbox)**: Modal acessível para visualização de imagens dos produtos, com navegação por setas e teclado, e "armadilha de foco" (`trapFocus`) para garantir a acessibilidade.
- **Botão de Compartilhamento Moderno**: Utiliza a **Web Share API** para acionar o compartilhamento nativo do sistema operacional. Em navegadores sem suporte, oferece um fallback inteligente que copia o link para a área de transferência.
- **Animações na Rolagem**: Efeito sutil de *fade-in* nos cards de produto conforme o usuário rola a página, criado com `IntersectionObserver` para melhor performance.
- **Carregamento Otimizado de Imagens**: Atributo `loading="lazy"` nas imagens dos produtos para que sejam carregadas apenas quando estiverem próximas de entrar na tela, melhorando o tempo de carregamento inicial.
- **Componentes Reutilizáveis**: O código JavaScript é modularizado para inicializar componentes (slider, modais, etc.) de forma independente, facilitando a manutenção.

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível.
- **CSS3**: Estilização moderna com:
  - **Variáveis CSS (Custom Properties)**: Para uma paleta de cores centralizada e de fácil manutenção.
  - **Flexbox e Grid Layout**: Para a criação de layouts complexos e responsivos.
  - **`clamp()`**: Para design fluido.
- **JavaScript (ES6+)**: Para toda a interatividade, lógica de SPA, manipulação do DOM e inicialização de componentes, sem o uso de frameworks externos.

## 📂 Estrutura dos Arquivos

```
Bah!Bordei/
├── 📄 index.html                # Página inicial
├── 📄 produtos.html              # Página principal das coleções
├── 📄 colecao-*.html             # Páginas individuais de cada coleção
├── 🖼️ images/                   # Pasta com todas as imagens do site
├── 🎨 style.css                 # Folha de estilos principal, bem documentada
└── ⚙️ script.js                 # Script principal com toda a lógica interativa
└── 📖 README.md                 # Este arquivo
```

### `style.css`

A folha de estilos é organizada com um índice numérico que facilita a navegação. As seções principais incluem:
1.  **Configurações Globais e Variáveis**: Define a paleta de cores e fontes do projeto.
2.  **Estrutura Base**: Estilos gerais do `body`.
3.  **Componentes**: Estilos agrupados por componentes (Header, Nav, Slider, Cards, Modal, Footer).
4.  **Media Queries**: Regras para o design responsivo, organizadas por breakpoints (tablets e celulares).

### `script.js`

O JavaScript é modular e bem documentado. As principais funções são:
- `loadContent(url)`: Função central da SPA, que carrega o conteúdo de uma nova página de forma assíncrona.
- `initializeMainContentFeatures()`: Agrupa funções que precisam ser reinicializadas a cada mudança de página (ex: `initializeGalleryModal`, `initializeShareButton`).
- `initializeGlobalFeatures()`: Agrupa funções que rodam apenas uma vez, no carregamento inicial do site (ex: `initializeBackToTop`).
- `trapFocus(element)`: Função de acessibilidade que prende o foco do teclado dentro de um modal ativo.

## 🚀 Como Executar

Por ser um site estático, basta abrir o arquivo `index.html` em qualquer navegador moderno.

Para desenvolvimento local, é recomendado utilizar um servidor local (como a extensão **Live Server** do Visual Studio Code) para evitar possíveis problemas de CORS ao usar a função `fetch()` para carregar as páginas.

---

*Projeto desenvolvido e refinado com foco em boas práticas de desenvolvimento web, acessibilidade e experiência do usuário.*