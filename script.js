/**
 * Função principal que é executada quando o conteúdo da página é carregado.
 * Orquestra o carregamento de componentes e a inicialização de funcionalidades.
 */
document.addEventListener('DOMContentLoaded', function() {
    // ==========================================================================
    // INICIALIZAÇÃO DAS FUNCIONALIDADES
    // ==========================================================================

    /**
     * Inicializa o efeito de texto curvado no cabeçalho.
     */
    (function initializeCircleTypeText() {
        const textTop = document.getElementById('text-top');
        if (textTop && typeof CircleType !== 'undefined') {
            new CircleType(textTop).radius(160);
        }
        const textBottom = document.getElementById('text-bottom');
        if (textBottom && typeof CircleType !== 'undefined') {
            new CircleType(textBottom).dir(-1).radius(150);
        }
    })();

    /**
     * Inicializa o slider de imagens da página inicial.
     */
    (function initializeSlider() {
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
    })();

    /**
     * Inicializa o modal (lightbox) da galeria de imagens.
     */
    (function initializeGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        if (!modal) return;

        const modalImg = document.getElementById('modal-image');
        const closeModalBtn = modal.querySelector('.close-modal');
        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        const productImages = document.querySelectorAll('.product-card img');

        let currentGalleryPaths = [];
        let currentImageIndex = 0;

        // Função para prender o foco dentro do modal
        function trapFocus(element) {
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
        }

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
    })();

    /**
     * Inicializa o modal de contato (Ligar/WhatsApp).
     */
    (function initializeContactModal() {
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
    })();

    /**
     * Inicializa o botão "Voltar ao Topo".
     */
    (function initializeBackToTop() {
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
    })();

});