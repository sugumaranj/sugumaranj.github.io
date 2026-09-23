// animations.js

// Using window.addEventListener('load') ensures all DOM injection by portfolio.js is complete
window.addEventListener('load', () => {
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
            { selector: '.crops-to-code-visual', class: 'stagger-grid' },
            { selector: '.highlights-container', class: 'stagger-grid' }
        ];

        animationMap.forEach(item => {
            const elements = document.querySelectorAll(item.selector);
            elements.forEach(el => {
                el.classList.add(item.class);
                observer.observe(el);
            });
        });

        // Number Counting Animation
        const counters = document.querySelectorAll('.counter');
        const counterObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    const target = +targetElement.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            targetElement.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            targetElement.innerText = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(targetElement);
                }
            });
        }, counterObserverOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
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
