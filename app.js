/**
 * Branding Redesign - Scripts principais
 * 
 * Funcionalidades:
 * - Menu mobile
 * - Scroll suave
 * - Slider de comparação
 * - Animações de scroll
 * - Formulário de contato
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== MENU MOBILE =====
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const navMenu = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // ===== HEADER SCROLL =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== COMPARISON SLIDER =====
    const comparisonSlider = document.querySelector('[data-comparison]');
    
    if (comparisonSlider) {
        const sliderHandle = comparisonSlider.querySelector('.slider-handle');
        const beforeImage = comparisonSlider.querySelector('.before');
        
        function updateSliderPosition(e) {
            let xPos = 0;
            
            if (e.type === 'mousedown' || e.type === 'mousemove') {
                xPos = e.pageX - comparisonSlider.getBoundingClientRect().left;
            } else if (e.type === 'touchstart' || e.type === 'touchmove') {
                xPos = e.touches[0].pageX - comparisonSlider.getBoundingClientRect().left;
            }
            
            // Limitar a posição dentro do slider
            const sliderWidth = comparisonSlider.offsetWidth;
            xPos = Math.max(0, Math.min(xPos, sliderWidth));
            
            // Atualizar posição
            const percent = (xPos / sliderWidth) * 100;
            beforeImage.style.width = `${percent}%`;
            sliderHandle.style.left = `${percent}%`;
        }
        
        // Eventos para desktop
        sliderHandle.addEventListener('mousedown', function() {
            comparisonSlider.classList.add('dragging');
            document.addEventListener('mousemove', updateSliderPosition);
        });
        
        // Eventos para mobile
        sliderHandle.addEventListener('touchstart', function() {
            comparisonSlider.classList.add('dragging');
            document.addEventListener('touchmove', updateSliderPosition);
        });
        
        // Parar de arrastar
        document.addEventListener('mouseup', function() {
            comparisonSlider.classList.remove('dragging');
            document.removeEventListener('mousemove', updateSliderPosition);
        });
        
        document.addEventListener('touchend', function() {
            comparisonSlider.classList.remove('dragging');
            document.removeEventListener('touchmove', updateSliderPosition);
        });
        
        // Atualizar ao redimensionar
        window.addEventListener('resize', function() {
            const currentPercent = parseFloat(beforeImage.style.width) || 50;
            beforeImage.style.width = `${currentPercent}%`;
            sliderHandle.style.left = `${currentPercent}%`;
        });
    }
    
    // ===== ANIMAÇÕES DE SCROLL =====
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('[data-step]');
        const windowHeight = window.innerHeight;
        const windowTop = window.scrollY;
        const windowBottom = windowTop + windowHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top + windowTop;
            const elementBottom = elementTop + element.offsetHeight;
            
            // Verificar se o elemento está visível na janela
            if (elementBottom >= windowTop && elementTop <= windowBottom) {
                element.style.animationPlayState = 'running';
            }
        });
    };
    
    // Disparar na carga inicial e no scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    
    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio (substituir por AJAX na implementação real)
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Mensagem Enviada!';
                
                // Resetar formulário
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Feedback visual
                    const feedback = document.createElement('div');
                    feedback.textContent = 'Obrigado por sua mensagem! Entraremos em contato em breve.';
                    feedback.style.color = 'var(--secondary)';
                    feedback.style.marginTop = '1rem';
                    feedback.style.fontWeight = '600';
                    contactForm.appendChild(feedback);
                    
                    setTimeout(() => {
                        feedback.style.opacity = '0';
                        setTimeout(() => feedback.remove(), 500);
                    }, 3000);
                }, 1500);
            }, 1000);
        });
    }
    
    // ===== ATUALIZAR ANO NO FOOTER =====
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }
});