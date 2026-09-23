// animations.js
document.addEventListener('DOMContentLoaded', () => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Intersection Observer for scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Slightly higher threshold so items reveal confidently
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Map elements to their desired reveal animations
        const animationMap = [
            { selector: '.section-title', class: 'reveal-up' },
            { selector: '.about-text', class: 'reveal-left' },
            { selector: '.about-image-wrapper', class: 'reveal-right' },
            { selector: '.timeline-item', class: 'reveal-up' },
            // For grids, we animate the parent and the children stagger in
            { selector: '.projects-grid', class: 'stagger-grid' },
            { selector: '.skills-grid', class: 'stagger-grid' },
            { selector: '.certifications-grid', class: 'stagger-grid' },
            { selector: '.crops-to-code-visual', class: 'stagger-grid' }
        ];

        animationMap.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(el => {
                el.classList.add(item.class);
                observer.observe(el);
            });
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
        }, { passive: true }); // optimize scroll performance
    }
});
