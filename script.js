/**
 * Função principal que é executada quando o conteúdo da página é carregado.
 * Orquestra o carregamento de componentes e a inicialização de funcionalidades.
 */
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * Carrega o cabeçalho do arquivo header.html e o insere na página.
     * Depois de carregar, inicializa os scripts que dependem dele.
     */
    const loadSharedComponents = () => {
        const headerPromise = fetch('header.html').then(res => res.ok ? res.text() : Promise.reject('header.html não encontrado'));
        const footerPromise = fetch('footer.html').then(res => res.ok ? res.text() : Promise.reject('footer.html não encontrado'));

        Promise.all([headerPromise, footerPromise])
            .then(([headerData, footerData]) => {
                document.querySelector('header').innerHTML = headerData;
                document.querySelector('#footer-container').innerHTML = footerData;

                // Agora que TUDO foi carregado, inicializamos os scripts
                initializeAllScripts();
            })
            .catch(error => console.error("Erro ao carregar componentes:", error));
    };

    /**
     * Aplica o efeito de máquina de escrever a um elemento.
     */
    const typeWriterEffect = () => {
        const textElement = document.getElementById('text-bottom');
        if (!textElement) return;

        const text = textElement.innerHTML;
        textElement.innerHTML = ''; // Limpa o texto original
        let i = 0;

        const type = () => {
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
     * Agrupa todas as funções de inicialização que devem rodar após o carregamento dos componentes.
     */
    const initializeAllScripts = () => {
        typeWriterEffect();
        initializeSlider();
        initializeGalleryModal();
        initializeContactModal();
        initializeBackToTop();
        initializeMobileDropdown();
    };

    /**
     * Função utilitária para prender o foco do teclado dentro de um elemento (modal).
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
     * Inicializa o slider de imagens da página inicial.
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
     * Inicializa o modal (lightbox) da galeria de imagens.
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

        if(closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if(modal) modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        if(prevBtn) prevBtn.addEventListener('click', showPrevImage);
        if(nextBtn) nextBtn.addEventListener('click', showNextImage);

        document.addEventListener('keydown', (e) => {
            if (modal && modal.style.display === 'block') {
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'Escape') closeModal();
            }
        });
    };

    /**
     * Inicializa o modal de contato (Ligar/WhatsApp).
     */
    const initializeContactModal = () => {
        const contactModal = document.getElementById('contact-modal');
        if (!contactModal) return;

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
                document.body.style.overflow = 'auto';
            };
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
     * Inicializa o botão "Voltar ao Topo".
     */
    const initializeBackToTop = () => {
        const backToTopButton = document.getElementById('back-to-top');

        if (!backToTopButton) return;

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
     * Altera o comportamento do menu dropdown em telas de toque.
     * Em vez de navegar, o primeiro toque no link "Coleções" abre o submenu.
     */
    const initializeMobileDropdown = () => {
        const dropdown = document.querySelector('.dropdown');
        if (!dropdown) return;

        const dropdownButton = dropdown.querySelector('.dropbtn');

        // Detecta se é um dispositivo de toque para aplicar o comportamento de clique
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        if (isTouchDevice) {
            dropdownButton.addEventListener('click', function(event) {
                // Impede a ação padrão do link (navegar para produtos.html)
                event.preventDefault();
                // Adiciona ou remove a classe que controla a visibilidade do dropdown
                dropdown.classList.toggle('dropdown-open');
            });

            // Adiciona um listener para fechar o dropdown se o usuário clicar fora dele
            document.addEventListener('click', function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('dropdown-open');
                }
            });
        }
    };

    // Inicia o processo de carregamento dos componentes, que por sua vez chamará a inicialização dos outros scripts.
    loadSharedComponents();
});