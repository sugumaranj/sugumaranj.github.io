// audio.js - Futuristic Cyberpunk Audio Engine
// Provides HTML5 Audio + Procedural Web Audio API Synthesis fallback for 100% offline & zero-latency reliability.

const soundManager = (() => {
    let muted = localStorage.getItem('cyber_sound_muted') === 'true';
    let audioCtx = null;
    let bootDroneNodes = null;
    let bootDronePending = false;

    // CDN Audio previews
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

    // Initialize AudioContext & resume if suspended
    const initAudioContext = () => {
        if (!audioCtx) {
            try {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    audioCtx = new AudioCtxClass();
                }
            } catch (e) {
                // AudioContext not supported
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                if (bootDronePending && !muted) {
                    bootDronePending = false;
                    startBootDroneInternal();
                }
            }).catch(() => {});
        } else if (audioCtx && audioCtx.state === 'running') {
            if (bootDronePending && !muted) {
                bootDronePending = false;
                startBootDroneInternal();
            }
        }
    };

    // Ambient Boot Drone (Low sub-bass power humming while preloader loads)
    const startBootDroneInternal = () => {
        if (muted || !audioCtx || bootDroneNodes || audioCtx.state !== 'running') return;
        try {
            const now = audioCtx.currentTime;
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            const gain = audioCtx.createGain();

            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(55, now); // A1 sub-fundamental

            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(110.8, now); // A2 harmonic with subtle 0.8Hz phase pulse

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(180, now);
            filter.Q.setValueAtTime(2.0, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.exponentialRampToValueAtTime(0.04, now + 0.35);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);

            osc1.start(now);
            osc2.start(now);

            bootDroneNodes = { osc1, osc2, gain, filter };
        } catch (e) {}
    };

    const stopBootDroneInternal = () => {
        bootDronePending = false;
        if (!bootDroneNodes || !audioCtx) return;
        try {
            const now = audioCtx.currentTime;
            bootDroneNodes.gain.gain.cancelScheduledValues(now);
            bootDroneNodes.gain.gain.setValueAtTime(bootDroneNodes.gain.gain.value, now);
            bootDroneNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
            const { osc1, osc2 } = bootDroneNodes;
            setTimeout(() => {
                try {
                    osc1.stop();
                    osc2.stop();
                    osc1.disconnect();
                    osc2.disconnect();
                } catch (e) {}
            }, 180);
        } catch (e) {}
        bootDroneNodes = null;
    };

    // High-tech Telemetry Chirps during preloader steps
    const playTelemetryBlip = (step) => {
        if (muted) return;
        initAudioContext();
        if (!audioCtx || audioCtx.state !== 'running') return;

        try {
            const now = audioCtx.currentTime;
            if (step === 0) {
                // Step 0: BIOS / CPU Core - Crisp diagnostic blip
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(659.25, now);
                osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.045);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.05);
            } else if (step === 1) {
                // Step 1: Mounting Modules - Dual ascending cyber data chirp
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gain1 = audioCtx.createGain();
                const gain2 = audioCtx.createGain();

                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(587.33, now); // D5
                gain1.gain.setValueAtTime(0.001, now);
                gain1.gain.linearRampToValueAtTime(0.055, now + 0.004);
                gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

                osc2.type = 'triangle';
                osc2.frequency.setValueAtTime(880, now + 0.035); // A5
                gain2.gain.setValueAtTime(0.001, now + 0.035);
                gain2.gain.linearRampToValueAtTime(0.06, now + 0.04);
                gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

                osc1.connect(gain1);
                gain1.connect(audioCtx.destination);
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);

                osc1.start(now);
                osc1.stop(now + 0.045);
                osc2.start(now + 0.035);
                osc2.stop(now + 0.09);
            } else if (step === 2) {
                // Step 2: Calibrating Neural Graphics - Resonant cyber sweep
                const osc = audioCtx.createOscillator();
                const filter = audioCtx.createBiquadFilter();
                const gain = audioCtx.createGain();

                osc.type = 'sine';
                osc.frequency.setValueAtTime(740, now);
                osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08); // F#5 -> D6

                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(1200, now);
                filter.Q.setValueAtTime(2.5, now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.07, now + 0.008);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + 0.095);
            }
        } catch (e) {}
    };

    // Majestic Futuristic Cyber Boot Chime (D major 9th voicing)
    const playBootChime = () => {
        if (muted) return;
        initAudioContext();
        stopBootDroneInternal();
        if (!audioCtx || audioCtx.state !== 'running') return;

        try {
            const now = audioCtx.currentTime;
            const chord = [
                { freq: 293.66, type: 'sine', gain: 0.07, delay: 0.00, decay: 0.70 }, // D4
                { freq: 440.00, type: 'sine', gain: 0.065, delay: 0.02, decay: 0.75 }, // A4
                { freq: 587.33, type: 'sine', gain: 0.06, delay: 0.04, decay: 0.80 }, // D5
                { freq: 739.99, type: 'triangle', gain: 0.045, delay: 0.06, decay: 0.75 }, // F#5
                { freq: 1318.51, type: 'sine', gain: 0.04, delay: 0.08, decay: 0.85 }  // E6 shimmer
            ];

            const masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(1.0, now);
            masterGain.connect(audioCtx.destination);

            chord.forEach(note => {
                const osc = audioCtx.createOscillator();
                const noteGain = audioCtx.createGain();
                const startTime = now + note.delay;
                const stopTime = startTime + note.decay;

                osc.type = note.type;
                osc.frequency.setValueAtTime(note.freq, startTime);

                noteGain.gain.setValueAtTime(0.0001, startTime);
                noteGain.gain.linearRampToValueAtTime(note.gain, startTime + 0.012);
                noteGain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

                osc.connect(noteGain);
                noteGain.connect(masterGain);

                osc.start(startTime);
                osc.stop(stopTime + 0.02);
            });
        } catch (e) {}
    };

    // Web Audio Synthesizer fallback for instant latency-free sci-fi UI sounds
    const synthSlide = () => {
        if (!audioCtx) return;
        try {
            const osc = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            const gain = audioCtx.createGain();
            const now = audioCtx.currentTime;

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.22);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1200, now);
            filter.frequency.exponentialRampToValueAtTime(300, now + 0.22);

            gain.gain.setValueAtTime(0.09, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

            osc.connect(filter);
            filter.connect(gain);
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

            gain.gain.setValueAtTime(0.12, now);
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

            gain.gain.setValueAtTime(0.1, now);
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

            gain.gain.setValueAtTime(0.025, now);
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
            initAudioContext();
            ['click', 'pointerdown', 'touchstart', 'keydown'].forEach(evt => {
                window.addEventListener(evt, () => {
                    initAudioContext();
                }, { capture: true, once: false });
            });
        },
        startBootSequence: () => {
            if (!muted) {
                initAudioContext();
                if (audioCtx && audioCtx.state === 'running') {
                    startBootDroneInternal();
                } else {
                    bootDronePending = true;
                }
            }
        },
        stopBootDrone: () => stopBootDroneInternal(),
        playTelemetryBlip: (step) => playTelemetryBlip(step),
        playBootChime: () => playBootChime(),
        synthBoot: () => playBootChime(),
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
            if (!muted) {
                initAudioContext();
                playBootChime();
            } else {
                stopBootDroneInternal();
            }
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
