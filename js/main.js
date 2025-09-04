// Animation d'apparition au scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-item, .studio-card, .formation-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, entry.target.dataset.delay || 0);
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach((element, index) => {
        element.dataset.delay = index * 100;
        observer.observe(element);
    });
}

// Lightbox pour les galeries
function initLightbox() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('imageModalLabel');
    
    if (!modal || !modalImage || !modalTitle) return;

    // Gestionnaire pour toutes les images de galerie
    document.querySelectorAll('[data-bs-toggle="modal"]').forEach(img => {
        img.addEventListener('click', function() {
            const src = this.dataset.src;
            const title = this.dataset.title;
            
            modalImage.src = src;
            modalImage.alt = title;
            modalTitle.textContent = title;
        });
    });

    // Navigation au clavier dans la lightbox
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') {
                navigateGallery('prev');
            } else if (e.key === 'ArrowRight') {
                navigateGallery('next');
            }
        }
    });
}

// Navigation dans la galerie
function navigateGallery(direction) {
    const currentSrc = document.getElementById('modalImage').src;
    const galleryImages = document.querySelectorAll('[data-bs-toggle="modal"]');
    let currentIndex = -1;
    
    galleryImages.forEach((img, index) => {
        if (img.dataset.src === currentSrc) {
            currentIndex = index;
        }
    });
    
    if (currentIndex !== -1) {
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % galleryImages.length;
        } else {
            newIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
        }
        
        const newImg = galleryImages[newIndex];
        document.getElementById('modalImage').src = newImg.dataset.src;
        document.getElementById('imageModalLabel').textContent = newImg.dataset.title;
    }
}

// Smooth scrolling pour les liens internes
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animation des statistiques
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent.replace('+', '');
                const isPlus = target.textContent.includes('+');
                
                if (!isNaN(finalValue)) {
                    animateNumber(target, 0, parseInt(finalValue), 2000, isPlus);
                }
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration, hasPlus = false) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.round(start + (end - start) * easeOutQuart);
        
        element.textContent = current + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Initialisation des interactions
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    initLightbox();
    initSmoothScrolling();
    animateStats();
    
    // Amélioration de l'accessibilité
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        img.setAttribute('tabindex', '0');
    });
});

// Gestion responsive de la navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Preloader pour les images (optionnel)
function preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        const imageLoader = new Image();
        imageLoader.src = img.dataset.src;
    });
}

// Contact form validation (si ajouté plus tard)
function validateContactForm(form) {
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');
    
    if (email && !email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return false;
    }
    
    if (message && message.value.length < 10) {
        return false;
    }
    
    return true;
}

// Utilitaires pour les cartes
function addCardHoverEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialiser les effets des cartes
document.addEventListener('DOMContentLoaded', addCardHoverEffects);




