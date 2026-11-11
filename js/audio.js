// audio.js - Futuristic Cyberpunk Audio Engine
// Provides HTML5 Audio + Procedural Web Audio API Synthesis for 100% offline & zero-latency reliability.

const soundManager = (() => {
    let muted = localStorage.getItem('cyber_sound_muted') === 'true';
    let audioCtx = null;
    let loadingSoundPending = false;
    let chatterInterval = null;
    let droneNodes = null;

    // CDN Audio previews fallback
    const cdnAudio = {
        slide: new Audio('https://cdn.freesound.org/previews/367/367997_6512973-lq.mp3'),
        accept: new Audio('https://cdn.freesound.org/previews/220/220166_4100837-lq.mp3'),
        reject: new Audio('https://cdn.freesound.org/previews/657/657950_6142149-lq.mp3')
    };

    Object.values(cdnAudio).forEach(a => {
        a.volume = 0.45;
        a.preload = 'auto';
    });

    // Initialize AudioContext & auto-resume on any user gesture
    const initAudioContext = () => {
        if (!audioCtx) {
            try {
                const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
                if (AudioCtxClass) {
                    audioCtx = new AudioCtxClass();
                }
            } catch (e) {}
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume().then(() => {
                if (loadingSoundPending && !muted) {
                    loadingSoundPending = false;
                    startLoadingSoundInternal();
                }
            }).catch(() => {});
        } else if (audioCtx && audioCtx.state === 'running') {
            if (loadingSoundPending && !muted) {
                loadingSoundPending = false;
                startLoadingSoundInternal();
            }
        }
    };

    // Continuous High-Speed Digital Data Packet Chatter (simulates rapid memory decryption/scanning)
    const startChatter = () => {
        if (chatterInterval || !audioCtx || audioCtx.state !== 'running') return;
        const cyberScale = [1175, 1318, 1568, 1760, 2093, 2349, 2637];
        chatterInterval = setInterval(() => {
            if (muted || !audioCtx || audioCtx.state !== 'running') return;
            try {
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const freq = cyberScale[Math.floor(Math.random() * cyberScale.length)];

                osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.025, now + 0.003);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + 0.025);
            } catch (e) {}
        }, 45); // ~22 rapid rhythmic digital data clicks per second
    };

    const stopChatter = () => {
        if (chatterInterval) {
            clearInterval(chatterInterval);
            chatterInterval = null;
        }
    };

    // Ascending Cyber Power Hum (smooth pitch glide as progress reaches 100%)
    const startAscendingDrone = () => {
        if (droneNodes || !audioCtx || audioCtx.state !== 'running') return;
        try {
            const now = audioCtx.currentTime;
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const filter = audioCtx.createBiquadFilter();
            const gain = audioCtx.createGain();

            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(75, now); // 75Hz sub-power

            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(150, now);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(240, now);
            filter.Q.setValueAtTime(3.0, now);

            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.035, now + 0.2);

            osc1.connect(filter);
            osc2.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);

            osc1.start(now);
            osc2.start(now);

            droneNodes = { osc1, osc2, filter, gain };
        } catch (e) {}
    };

    const updateDronePitch = (progressPercent) => {
        if (!droneNodes || !audioCtx || audioCtx.state !== 'running') return;
        try {
            const now = audioCtx.currentTime;
            const baseFreq = 75 + (progressPercent / 100) * 205;
            droneNodes.osc1.frequency.cancelScheduledValues(now);
            droneNodes.osc1.frequency.exponentialRampToValueAtTime(Math.max(60, baseFreq), now + 0.25);

            droneNodes.osc2.frequency.cancelScheduledValues(now);
            droneNodes.osc2.frequency.exponentialRampToValueAtTime(Math.max(120, baseFreq * 2), now + 0.25);

            const cutoff = 240 + (progressPercent / 100) * 600;
            droneNodes.filter.frequency.cancelScheduledValues(now);
            droneNodes.filter.frequency.exponentialRampToValueAtTime(Math.max(200, cutoff), now + 0.25);
        } catch (e) {}
    };

    const stopAscendingDrone = () => {
        if (!droneNodes || !audioCtx) return;
        try {
            const now = audioCtx.currentTime;
            droneNodes.gain.gain.cancelScheduledValues(now);
            droneNodes.gain.gain.setValueAtTime(droneNodes.gain.gain.value, now);
            droneNodes.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
            const { osc1, osc2 } = droneNodes;
            setTimeout(() => {
                try {
                    osc1.stop();
                    osc2.stop();
                    osc1.disconnect();
                    osc2.disconnect();
                } catch (e) {}
            }, 180);
        } catch (e) {}
        droneNodes = null;
    };

    const startLoadingSoundInternal = () => {
        if (muted || !audioCtx || audioCtx.state !== 'running') return;
        startAscendingDrone();
        startChatter();
    };

    // Step Telemetry Diagnostic Chirps
    const playStepChirp = (step) => {
        if (muted || !audioCtx || audioCtx.state !== 'running') return;
        try {
            const now = audioCtx.currentTime;
            if (step === 0) {
                // Step 0: BIOS initialized - Fast descending dual chirp
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(880, now);
                osc.frequency.exponentialRampToValueAtTime(587, now + 0.05);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.06, now + 0.005);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.055);
            } else if (step === 1) {
                // Step 1: Mounting Modules - Ascending cyber burst
                [
                    { f: 659, t: 0, d: 0.04 },
                    { f: 880, t: 0.025, d: 0.045 },
                    { f: 1175, t: 0.05, d: 0.06 }
                ].forEach(note => {
                    const osc = audioCtx.createOscillator();
                    const gain = audioCtx.createGain();
                    const st = now + note.t;
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(note.f, st);

                    gain.gain.setValueAtTime(0.001, st);
                    gain.gain.linearRampToValueAtTime(0.05, st + 0.004);
                    gain.gain.exponentialRampToValueAtTime(0.0001, st + note.d);

                    osc.connect(gain);
                    gain.connect(audioCtx.destination);
                    osc.start(st);
                    osc.stop(st + note.d + 0.01);
                });
            } else if (step === 2) {
                // Step 2: Calibrating Neural Graphics - Resonant laser sweep
                const osc = audioCtx.createOscillator();
                const filter = audioCtx.createBiquadFilter();
                const gain = audioCtx.createGain();

                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(740, now);
                osc.frequency.exponentialRampToValueAtTime(1480, now + 0.08);

                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(1200, now);
                filter.frequency.exponentialRampToValueAtTime(1600, now + 0.08);
                filter.Q.setValueAtTime(4.0, now);

                gain.gain.setValueAtTime(0.001, now);
                gain.gain.linearRampToValueAtTime(0.065, now + 0.008);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + 0.09);
            }
        } catch (e) {}
    };

    // Majestic Cyber Boot Chime (D major 9th voicing on 100% completion)
    const playBootChime = () => {
        if (muted) return;
        initAudioContext();
        stopChatter();
        stopAscendingDrone();
        if (!audioCtx || audioCtx.state !== 'running') return;

        try {
            const now = audioCtx.currentTime;
            const chord = [
                { freq: 293.66, type: 'sine', gain: 0.08, delay: 0.00, decay: 0.80 }, // D4
                { freq: 440.00, type: 'sine', gain: 0.075, delay: 0.02, decay: 0.85 }, // A4
                { freq: 587.33, type: 'sine', gain: 0.07, delay: 0.04, decay: 0.90 }, // D5
                { freq: 739.99, type: 'triangle', gain: 0.05, delay: 0.06, decay: 0.85 }, // F#5
                { freq: 1318.51, type: 'sine', gain: 0.045, delay: 0.08, decay: 0.95 }  // E6 shimmer
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
                noteGain.gain.linearRampToValueAtTime(note.gain, startTime + 0.015);
                noteGain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

                osc.connect(noteGain);
                noteGain.connect(masterGain);

                osc.start(startTime);
                osc.stop(stopTime + 0.02);
            });
        } catch (e) {}
    };

    // Web Audio Synthesizer fallback for UI clicks & transitions
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
        startLoadingSound: () => {
            if (!muted) {
                initAudioContext();
                if (audioCtx && audioCtx.state === 'running') {
                    startLoadingSoundInternal();
                } else {
                    loadingSoundPending = true;
                }
            }
        },
        updateLoadingProgress: (progressPercent, step) => {
            if (!muted) {
                initAudioContext();
                if (loadingSoundPending && audioCtx && audioCtx.state === 'running') {
                    loadingSoundPending = false;
                    startLoadingSoundInternal();
                }
                updateDronePitch(progressPercent);
                if (progressPercent >= 100) {
                    playBootChime();
                } else {
                    playStepChirp(step);
                }
            }
        },
        stopLoadingSound: () => {
            loadingSoundPending = false;
            stopChatter();
            stopAscendingDrone();
        },
        // Backward-compatible aliases
        startBootSequence: () => soundManager.startLoadingSound(),
        stopBootDrone: () => soundManager.stopLoadingSound(),
        playTelemetryBlip: (step) => playStepChirp(step),
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
                soundManager.stopLoadingSound();
            }
            return muted;
        },
        isMuted: () => muted
    };
})();

// Auto-bind sound triggers across the DOM
document.addEventListener('DOMContentLoaded', () => {
    soundManager.init();

    document.addEventListener('click', (e) => {
        const soundBtn = e.target.closest('[data-sound]');
        if (soundBtn) {
            const soundType = soundBtn.getAttribute('data-sound');
            if (soundType === 'slide') soundManager.playSlide();
            else if (soundType === 'accept') soundManager.playAccept();
            else if (soundType === 'reject') soundManager.playReject();
        }
    });

    document.addEventListener('mouseover', (e) => {
        const btn = e.target.closest('.cyber-btn, .filter-btn, .nav-link');
        if (btn && !btn.dataset.hovered) {
            soundManager.playHover();
            btn.dataset.hovered = 'true';
            setTimeout(() => delete btn.dataset.hovered, 300);
        }
    });
});
