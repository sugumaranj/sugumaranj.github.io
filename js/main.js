// main.js - Core UI Controller & Cyber Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check local storage for theme
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    if(currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (window.soundManager) soundManager.playAccept();
            if(document.body.getAttribute('data-theme') === 'light') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            }
        });
    }

    // Sound FX Toggle
    const soundToggle = document.getElementById('sound-toggle');
    const soundOnIcon = document.querySelector('.sound-on-icon');
    const soundOffIcon = document.querySelector('.sound-off-icon');

    const updateSoundUI = (isMuted) => {
        if (isMuted) {
            if (soundOnIcon) soundOnIcon.style.display = 'none';
            if (soundOffIcon) soundOffIcon.style.display = 'block';
            if (soundToggle) soundToggle.title = 'Audio Effects: MUTED';
        } else {
            if (soundOnIcon) soundOnIcon.style.display = 'block';
            if (soundOffIcon) soundOffIcon.style.display = 'none';
            if (soundToggle) soundToggle.title = 'Audio Effects: ON';
        }
    };

    if (soundToggle && window.soundManager) {
        updateSoundUI(soundManager.isMuted());
        soundToggle.addEventListener('click', () => {
            const isMuted = soundManager.toggleMute();
            updateSoundUI(isMuted);
        });
    }

    // Mobile Menu
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    // Copy nav links into overlay
    if (mobileOverlay && navLinks) {
        mobileOverlay.innerHTML = navLinks.outerHTML;
    }
    
    if (hamburgerBtn && mobileOverlay) {
        hamburgerBtn.addEventListener('click', () => {
            const isActive = hamburgerBtn.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            if (window.soundManager) {
                if (isActive) soundManager.playSlide();
                else soundManager.playReject();
            }
        });

        mobileOverlay.addEventListener('click', (e) => {
            if(e.target.tagName === 'A') {
                hamburgerBtn.classList.remove('active');
                mobileOverlay.classList.remove('active');
                if (window.soundManager) soundManager.playAccept();
            }
        });
    }

    // Back to top
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            if (window.soundManager) soundManager.playSlide();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Keyboard Shortcuts (Cyber Terminal Mode)
    window.addEventListener('keydown', (e) => {
        // Only if no text input is focused
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.key === 'p' || e.key === 'P') {
            const projectsSec = document.getElementById('projects');
            if (projectsSec) {
                if (window.soundManager) soundManager.playSlide();
                projectsSec.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (e.key === 'c' || e.key === 'C') {
            const contactSec = document.getElementById('contact');
            if (contactSec) {
                if (window.soundManager) soundManager.playAccept();
                contactSec.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Navbar active state on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 220)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // Also update overlay links
        if (mobileOverlay) {
            const overlayLinks = mobileOverlay.querySelectorAll('.nav-link');
            overlayLinks.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        }
    }, { passive: true });
});
