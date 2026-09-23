// animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply fade-in classes
        const animateElements = document.querySelectorAll('.section-title, .about-text, .about-image-wrapper, .skill-category, .project-card, .timeline-item, .cert-card, .step');
        
        animateElements.forEach((el, index) => {
            el.classList.add('fade-in');
            // Add slight stagger to grids
            if(el.classList.contains('project-card') || el.classList.contains('skill-category') || el.classList.contains('cert-card')) {
                const staggerIndex = (index % 4) + 1;
                el.classList.add(`stagger-${staggerIndex}`);
            }
            observer.observe(el);
        });
    }

    // Scroll progress bar
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
});
