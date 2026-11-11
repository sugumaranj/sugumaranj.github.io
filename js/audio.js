// audio.js - Futuristic Cyberpunk Audio Engine
// Provides HTML5 Audio + Procedural Web Audio API Synthesis fallback for 100% offline & zero-latency reliability.

const soundManager = (() => {
    let muted = localStorage.getItem('cyber_sound_muted') === 'true';
    let audioCtx = null;
    let initialized = false;

    // CDN Audio previews from snippet
    const cdnAudio = {
        slide: new Audio('https://cdn.freesound.org/previews/367/367997_6512973-lq.mp3'),
        accept: new Audio('https://cdn.freesound.org/previews/220/220166_4100837-lq.mp3'),
        reject: new Audio('https://cdn.freesound.org/previews/657/657950_6142149-lq.mp3')
    };

    // Pre-configure volume
    Object.values(cdnAudio).forEach(a => {
        a.volume = 0.45;
        a.preload = 'auto';
    });

    // Initialize AudioContext on first user gesture (Chrome / Safari autoplay policy compliance)
    const initAudioContext = () => {
        if (!initialized) {
            try {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) {
                    audioCtx = new AudioContext();
                    if (audioCtx.state === 'suspended') {
                        audioCtx.resume();
                    }
                }
            } catch (e) {
                // AudioContext not supported
            }
            initialized = true;
        } else if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    };

    // Web Audio Synthesizer fallback for instant latency-free sci-fi sounds
    const synthSlide = () => {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.22);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
        } catch (e) {}
    };

    const synthAccept = () => {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, now);
            osc.frequency.setValueAtTime(880, now + 0.08);

            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        } catch (e) {}
    };

    const synthReject = () => {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.18);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.18);
        } catch (e) {}
    };

    const synthHover = () => {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);

            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start(now);
            osc.stop(now + 0.04);
        } catch (e) {}
    };

    // Main Play functions with dual engine
    const playSound = (type) => {
        if (muted) return;
        initAudioContext();

        const audioEl = cdnAudio[type];
        if (audioEl) {
            audioEl.currentTime = 0;
            const playPromise = audioEl.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Fall back to Web Audio oscillator if CDN fails or blocked
                    if (type === 'slide') synthSlide();
                    else if (type === 'accept') synthAccept();
                    else if (type === 'reject') synthReject();
                });
            }
        } else {
            if (type === 'slide') synthSlide();
            else if (type === 'accept') synthAccept();
            else if (type === 'reject') synthReject();
        }
    };

    return {
        init: () => {
            window.addEventListener('click', initAudioContext, { once: true });
            window.addEventListener('keydown', initAudioContext, { once: true });
        },
        playSlide: () => playSound('slide'),
        playAccept: () => playSound('accept'),
        playReject: () => playSound('reject'),
        playHover: () => {
            if (!muted) {
                initAudioContext();
                synthHover();
            }
        },
        toggleMute: () => {
            muted = !muted;
            localStorage.setItem('cyber_sound_muted', muted);
            if (!muted) playSound('accept');
            return muted;
        },
        isMuted: () => muted
    };
})();

// Auto-bind sound triggers across the DOM
document.addEventListener('DOMContentLoaded', () => {
    soundManager.init();

    // Delegate clicks for data-sound attributes
    document.addEventListener('click', (e) => {
        const soundBtn = e.target.closest('[data-sound]');
        if (soundBtn) {
            const soundType = soundBtn.getAttribute('data-sound');
            if (soundType === 'slide') soundManager.playSlide();
            else if (soundType === 'accept') soundManager.playAccept();
            else if (soundType === 'reject') soundManager.playReject();
        }
    });

    // Delegate hover sounds for cyber buttons
    document.addEventListener('mouseover', (e) => {
        const btn = e.target.closest('.cyber-btn, .filter-btn, .nav-link');
        if (btn && !btn.dataset.hovered) {
            soundManager.playHover();
            btn.dataset.hovered = 'true';
            setTimeout(() => delete btn.dataset.hovered, 300);
        }
    });
});
