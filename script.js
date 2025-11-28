/**
 * @file Script principal para o site Bah!Bordei.
 * @description Gerencia a navegação SPA, inicialização de componentes como slider,
 * modais, animações e outras funcionalidades interativas.
 */

document.addEventListener('DOMContentLoaded', function() {

    const typeWriterEffect = () => {
        const textElement = document.getElementById('text-bottom');
        if (!textElement) return;

        const text = textElement.innerHTML;
        textElement.innerHTML = ''; // Limpa o texto original
        let i = 0;

        const type = () => { // Função aninhada para o efeito de digitação
            if (i < text.length) {
                textElement.innerHTML += text.charAt(i);
                if (text.charAt(i) === ' ') textElement.style.whiteSpace = 'normal'; // Permite quebra de linha
                i++;
                setTimeout(type, 100); // Velocidade da digitação (em milissegundos)
            } else {
                // Quando a digitação termina, remove a animação do cursor
                textElement.style.borderRight = 'none';
                textElement.style.animation = 'none';
            }
        };

        type(); // Inicia o efeito
    };

    /**
     * Prende o foco do teclado dentro de um elemento (modal), garantindo acessibilidade.
     * Impede que o usuário navegue para elementos fora do modal com a tecla Tab.
     * @param {HTMLElement} element - O elemento que deve conter o foco.
     */
    const trapFocus = (element) => {
        const focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])');
        const firstFocusableEl = focusableEls[0];
        const lastFocusableEl = focusableEls[focusableEls.length - 1];

        element.addEventListener('keydown', function(e) {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableEl) {
                    lastFocusableEl.focus();
                    e.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableEl) {
                    firstFocusableEl.focus();
                    e.preventDefault();
                }
            }
        });
    };

    /**
     * Inicializa o slider de imagens da página inicial, clonando o primeiro slide
     * para criar um efeito de loop infinito.
     */
    const initializeSlider = () => {
        const slides = document.querySelector('.slides');
        if (!slides) return; // Sai da função se não estiver na página do slider

        const originalSlides = Array.from(slides.children);
        const slideCount = originalSlides.length;

        if (slideCount > 1) {
            const firstSlideClone = originalSlides[0].cloneNode(true);
            slides.appendChild(firstSlideClone);

            let currentSlide = 0;

            slides.addEventListener('transitionend', () => {
                if (currentSlide === slideCount) {
                    slides.style.transition = 'none';
                    currentSlide = 0;
                    slides.style.transform = `translateX(0)`;
                    setTimeout(() => {
                        slides.style.transition = 'transform 0.5s ease-in-out';
                    });
                }
            });

            setInterval(() => {
                currentSlide++;
                slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            }, 4000);
        }
    };

    /**
     * Inicializa o modal (lightbox) da galeria de imagens dos produtos.
     * Gerencia a abertura, fechamento, navegação entre imagens e acessibilidade.
     */
    const initializeGalleryModal = () => {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;

        // Cria a estrutura interna do modal da galeria dinamicamente
        // Isso evita repetição de código HTML nas páginas
        modal.innerHTML = `
            <span class="close-modal" aria-label="Fechar">&times;</span>
            <div class="modal-content">
                <a class="prev" aria-label="Imagem anterior">&#10094;</a>
                <img id="modal-image" alt="Imagem do produto em destaque">
                <a class="next" aria-label="Próxima imagem">&#10095;</a>
            </div>
        `;

        const modalImg = document.getElementById('modal-image');
        const closeModalBtn = modal.querySelector('.close-modal');
        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        const productImages = document.querySelectorAll('.product-card img');

        let currentGalleryPaths = [];
        let currentImageIndex = 0;

        function openModal(clickedImage) {
            const mainImage = clickedImage.src;
            const galleryData = clickedImage.dataset.gallery;
            currentGalleryPaths = [mainImage];

            if (galleryData) {
                const extraImages = galleryData.split(',').filter(path => path.trim() !== '');
                currentGalleryPaths = currentGalleryPaths.concat(extraImages);
            }

            currentImageIndex = 0;
            updateModalImage();
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            closeModalBtn.focus(); // Move o foco para o botão de fechar
            trapFocus(modal);

            modal.classList.toggle('single-image', currentGalleryPaths.length <= 1);
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        function updateModalImage() {
            if (modalImg && currentGalleryPaths.length > 0) {
                modalImg.src = currentGalleryPaths[currentImageIndex];
            }
        }

        function showNextImage() {
            if (currentGalleryPaths.length > 1) {
                currentImageIndex = (currentImageIndex + 1) % currentGalleryPaths.length;
                updateModalImage();
            }
        }

        function showPrevImage() {
            if (currentGalleryPaths.length > 1) {
                currentImageIndex = (currentImageIndex - 1 + currentGalleryPaths.length) % currentGalleryPaths.length;
                updateModalImage();
            }
        }

        productImages.forEach(img => {
            img.addEventListener('click', () => openModal(img));
        });

        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
        if (nextBtn) nextBtn.addEventListener('click', showNextImage);

        document.addEventListener('keydown', (e) => {
            if (modal && modal.style.display === 'block') {
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'Escape') closeModal();
            }
        });
    };

    const initializeContactModal = () => {
        let contactModal = document.getElementById('contact-modal'); // Use let to allow re-assignment if created
        if (!contactModal) { // Create if it doesn't exist
            contactModal = document.createElement('div');
            contactModal.id = 'contact-modal';
            contactModal.className = 'modal';
            // O conteúdo interno do modal deve ser adicionado aqui ou já existir no HTML.
            document.body.appendChild(contactModal);
        }

        const phoneTriggers = document.querySelectorAll('.phone-modal-trigger');
        const closeContactModal = contactModal.querySelector('.close-contact-modal');

        phoneTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                contactModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                closeContactModal.focus(); // Move o foco para o botão de fechar
                trapFocus(contactModal);
            });
        });

        if (closeContactModal) {
            closeContactModal.onclick = function() {
                contactModal.style.display = "none";
                document.body.style.overflow = 'auto'; // Fechamento do onclick
            }
        }

        window.addEventListener('click', function(event) {
            if (event.target == contactModal) {
                contactModal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (contactModal && contactModal.style.display === 'block' && e.key === 'Escape') {
                contactModal.style.display = "none";
                document.body.style.overflow = 'auto';
            }
        });
    };

    /**
     * Inicializa o botão "Voltar ao Topo", que aparece após rolar a página
     * e permite um retorno suave ao topo.
     */
    const initializeBackToTop = () => {
        let backToTopButton = document.getElementById('back-to-top'); // Use let
        if (!backToTopButton) { // Create if it doesn't exist
            backToTopButton = document.createElement('a');
            backToTopButton.id = 'back-to-top';
            backToTopButton.className = 'back-to-top';
            backToTopButton.href = '#';
            backToTopButton.title = 'Voltar ao topo';
            backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(backToTopButton);
        }

        // Mostra ou esconde o botão baseado na posição de rolagem
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        };

        // Rola a página para o topo quando o botão é clicado
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    /**
     * Gerencia a posição de rolagem da barra de navegação em dispositivos móveis.
     * Salva a posição de rolagem para cada página e centraliza o item clicado.
     */
    const initializeNavScroller = () => {
        const navUl = document.querySelector('nav ul');
        if (!navUl) return;

        const currentPath = window.location.pathname;
        let navScrollPositions = JSON.parse(sessionStorage.getItem('navScrollPositions') || '{}');

        const lastClickedHref = sessionStorage.getItem('lastClickedNavLink');
        let scrolledToClickedLink = false;

        // 1. Tenta rolar para o último link clicado (maior prioridade)
        if (lastClickedHref) {
            // Itera sobre os links para encontrar o correspondente, pois o atributo href pode ser relativo
            // enquanto lastClickedHref é absoluto. A propriedade .href do elemento é sempre absoluta.
            let targetLink = null;
            navUl.querySelectorAll('a').forEach(link => {
                if (link.href === lastClickedHref) {
                    targetLink = link;
                }
            });

            if (targetLink) {
                const item = targetLink.parentElement; // O elemento <li>
                
                // Calcula a posição para centralizar o item
                // item.offsetLeft é a posição do item em relação ao início do seu container rolável (navUl)
                // A fórmula subtrai metade da largura da nav e adiciona metade da largura do item para achar o ponto de centralização.
                let scrollLeft = item.offsetLeft - (navUl.offsetWidth / 2) + (item.offsetWidth / 2);

                // Garante que a posição de rolagem não seja menor que 0 (início da barra)
                scrollLeft = Math.max(0, scrollLeft);
                // E também não seja maior que o máximo possível (final da barra), evitando espaços em branco.
                // navUl.scrollWidth é a largura total do conteúdo, incluindo a parte não visível.
                scrollLeft = Math.min(scrollLeft, navUl.scrollWidth - navUl.offsetWidth);

                if (item === navUl.firstElementChild) { // Se for o primeiro item, rola para o começo
                    navUl.scrollTo({ left: 0, behavior: 'smooth' }); 
                } else {
                    navUl.scrollTo({ left: scrollLeft, behavior: 'smooth' });
                }
                scrolledToClickedLink = true;
            }
            sessionStorage.removeItem('lastClickedNavLink'); // Limpa a referência para não afetar a próxima navegação manual.
        }

        // 2. Se não rolou para um link clicado, aplica a posição de rolagem manual salva
        if (!scrolledToClickedLink && navScrollPositions[currentPath]) {
            navUl.scrollTo({ left: parseFloat(navScrollPositions[currentPath]), behavior: 'auto' });
        }

        // Adiciona um listener para salvar a posição de rolagem quando o usuário rola a nav
        navUl.addEventListener('scroll', () => {
            if (window.innerWidth <= 768) { // Salva apenas em dispositivos móveis
                navScrollPositions[currentPath] = navUl.scrollLeft; // Salva a posição atual associada à URL da página
                sessionStorage.setItem('navScrollPositions', JSON.stringify(navScrollPositions));
            }
        });
    };

    /**
     * Inicializa um IntersectionObserver para aplicar um efeito de fade-in
     * aos elementos conforme eles entram na área visível da tela.
     */
    const initializeFadeInObserver = () => {
        // Seleciona todos os elementos que devem ter o efeito
        const animatedElements = document.querySelectorAll('.product-box, .collection-item, .product-card');

        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Se o elemento está visível na tela
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Para de observar o elemento para a animação não repetir
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // A animação dispara quando 10% do elemento estiver visível
        });

        // Inicia a observação para cada elemento
        animatedElements.forEach(el => observer.observe(el));
    };

    /**
     * Inicializa o botão de compartilhamento, utilizando a Web Share API nativa
     * quando disponível, ou um fallback que copia o link para a área de transferência.
     */
    const initializeShareButton = () => {
        const shareButton = document.getElementById('share-button');

        if (shareButton) {
            shareButton.addEventListener('click', async () => {
                const shareData = {
                    title: document.title,
                    text: 'Dá uma olhada nessa coleção incrível da Bah!Bordei!',
                    url: window.location.href
                };

                try {
                    // Tenta usar a API de compartilhamento nativa
                    if (navigator.share) {
                        await navigator.share(shareData);
                    } else {
                        // Fallback: Copia para a área de transferência
                        await navigator.clipboard.writeText(window.location.href);
                        const originalText = shareButton.innerHTML;
                        shareButton.innerHTML = 'Link Copiado!';
                        setTimeout(() => {
                            shareButton.innerHTML = originalText;
                        }, 2000); // Volta ao texto original após 2 segundos
                    }
                } catch (err) {
                    console.error("Erro ao compartilhar:", err);
                }
            });
        }
    };

    /**
     * Agrupa as funções de inicialização que precisam ser executadas
     * sempre que um novo conteúdo principal é carregado (navegação SPA).
     */
    const initializeMainContentFeatures = () => {
        initializeSlider();
        initializeGalleryModal();
        initializeShareButton(); // Adiciona a inicialização do botão de compartilhar
        initializeFadeInObserver();
        initializeNavScroller();
    };

    /**
     * Agrupa as funções de inicialização de componentes globais, que
     * rodam apenas uma vez, no carregamento inicial completo da página.
     */
    const initializeGlobalFeatures = () => {
        typeWriterEffect();
        initializeContactModal(); // Modal de contato é global
        initializeBackToTop();    // Botão de voltar ao topo é global
    };

    // --- LÓGICA DE ROTEAMENTO (SPA) ---

    const mainContent = document.querySelector('main');

    /**
     * Carrega o conteúdo de uma nova página de forma assíncrona (SPA)
     * e o injeta no elemento <main>, atualizando também a navegação e o título.
     * @param {string} url - A URL da página a ser carregada.
     */
    const loadContent = async (url) => {
        // Não limpamos navScrollPositions aqui, pois ele é específico por URL e pode ser restaurado via popstate
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Página não encontrada');

            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const newMain = doc.querySelector('main');
            const newNav = doc.querySelector('nav'); // Procura pela nova navegação
            const newTitle = doc.querySelector('title').innerText;
            const currentNav = document.querySelector('nav'); // Seleciona a navegação atual

            if (newMain && currentNav) {
                mainContent.innerHTML = newMain.innerHTML;
                if (newNav) { // Substitui o elemento <nav> inteiro para garantir que classes (ex: .nav-home) sejam aplicadas corretamente.
                    currentNav.replaceWith(newNav);
                }
                document.title = newTitle;
                window.scrollTo({ top: 0, behavior: 'auto' });
                initializeMainContentFeatures(); // Re-inicializa scripts para o novo conteúdo
            }
        } catch (error) {
            console.error('Erro ao carregar a página:', error);
            mainContent.innerHTML = '<h1>Erro ao carregar o conteúdo.</h1>';
        }
    };

    /**
     * Intercepta cliques em links internos para previnir o recarregamento da página
     * e acionar a navegação SPA através da History API.
     */
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        // Verifica se é um link interno válido
        if (link && link.href.startsWith(window.location.origin) && !link.href.includes('#') && link.target !== '_blank') {
            // Se o link clicado estiver dentro da barra de navegação e for um dispositivo móvel, salva o href
            if (link.closest('nav') && window.innerWidth <= 768) {
                sessionStorage.setItem('lastClickedNavLink', link.href);
            }

            e.preventDefault(); // Previne o recarregamento da página
            const url = link.href;

            // Não faz nada se o link for para a página atual
            if (url === window.location.href) return;

            history.pushState({}, '', url); // Atualiza a URL na barra de endereço
            loadContent(url);
        }
    });

    /**
     * Lida com os eventos de navegação do histórico do navegador (botões voltar/avançar).
     */
    window.addEventListener('popstate', () => {
        loadContent(window.location.href);
    });

    // --- INICIALIZAÇÃO GLOBAL ---
    // Inicializa funcionalidades globais (que rodam uma vez) e de conteúdo (que rodam a cada mudança de página)
    initializeGlobalFeatures();
    initializeMainContentFeatures();

});