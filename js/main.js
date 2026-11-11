// main.js - Core UI Controller & Cyber Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // Theme Switcher System
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.body.removeAttribute('data-theme');
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            localStorage.setItem('theme', 'dark');
        }
    }

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Cyberpunk BIOS Boot Preloader Controller
    const initCyberPreloader = () => {
        const preloader = document.getElementById('cyber-preloader');
        if (!preloader) return;

        const terminal = document.getElementById('preloader-terminal');
        const progressFill = document.getElementById('preloader-progress-fill');
        const progressText = document.getElementById('preloader-progress-text');
        const skipBtn = document.getElementById('preloader-skip');

        let isDismissed = false;

        // Engage futuristic boot audio sequence (hum + telemetry chirps)
        if (window.soundManager && soundManager.startLoadingSound) {
            soundManager.startLoadingSound();
        }

        const dismissPreloader = (skippedByUser = false) => {
            if (isDismissed) return;
            isDismissed = true;
            if (window.soundManager) {
                soundManager.stopLoadingSound();
                if (skippedByUser) {
                    soundManager.playSlide();
                }
            }
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
                preloader.setAttribute('aria-hidden', 'true');
            }, 650);
        };

        // User click on preloader background activates/resumes sound
        preloader.addEventListener('pointerdown', (e) => {
            if (e.target.closest('#preloader-skip')) return;
            if (window.soundManager) {
                soundManager.init();
                soundManager.startLoadingSound();
            }
        });

        // Allow immediate skip via button or Escape key
        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dismissPreloader(true);
            });
        }
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dismissPreloader(true);
            }
        });

        // Fast cyberpunk terminal boot telemetry progression
        const messages = [
            { progress: 25 },
            { progress: 55 },
            { progress: 85 },
            { progress: 100, success: true }
        ];

        let step = 0;
        const interval = setInterval(() => {
            if (isDismissed) {
                clearInterval(interval);
                return;
            }

            if (step < messages.length) {
                const msg = messages[step];
                if (progressFill) progressFill.style.width = msg.progress + '%';
                if (progressText) progressText.textContent = msg.progress + '%';

                if (terminal) {
                    const lines = terminal.querySelectorAll('.terminal-line');
                    if (lines[step]) {
                        lines[step].classList.add(msg.success ? 'success-line' : 'active-line');
                    }
                }

                // Audio cue per progression stage (ascending pitch + digital chatter + telemetry chirps)
                if (window.soundManager) {
                    soundManager.updateLoadingProgress(msg.progress, step);
                }

                step++;
            } else {
                clearInterval(interval);
                setTimeout(() => dismissPreloader(false), 450);
            }
        }, 320); // ~1.3s total progression + 450ms boot chime
    };

    initCyberPreloader();

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (window.soundManager) soundManager.playAccept();
            const isCurrentlyLight = document.body.getAttribute('data-theme') === 'light' || 
                                     document.documentElement.getAttribute('data-theme') === 'light';
            applyTheme(isCurrentlyLight ? 'dark' : 'light');
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
            if (e.target.tagName === 'A' || e.target === mobileOverlay) {
                hamburgerBtn.classList.remove('active');
                mobileOverlay.classList.remove('active');
                if (window.soundManager) {
                    if (e.target.tagName === 'A') soundManager.playAccept();
                    else soundManager.playReject();
                }
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
