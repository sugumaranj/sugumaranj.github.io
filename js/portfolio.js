// portfolio.js
// Renders data from data.js into the DOM

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Populate Basic Info
    document.getElementById('hero-tagline').textContent = siteConfig.tagline;
    document.getElementById('hero-desc').textContent = siteConfig.description;
    
    // Populate social links in hero and footer
    const socialHtml = `
        ${siteConfig.linkedin ? `<a href="${siteConfig.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>` : ''}
        ${siteConfig.github ? `<a href="${siteConfig.github}" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>` : ''}
        ${siteConfig.email ? `<a href="mailto:${siteConfig.email}" class="social-link" aria-label="Email"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>` : ''}
    `;
    document.getElementById('hero-social').innerHTML = socialHtml;
    document.getElementById('footer-social').innerHTML = socialHtml;
    
    // Contact actions
    document.getElementById('contact-container').innerHTML = `
        ${siteConfig.linkedin ? `<a href="${siteConfig.linkedin}" target="_blank" rel="noopener noreferrer" class="cyber-btn" data-sound="accept"><span class="backdrop"><span class="corner"></span></span><kbd>in</kbd><span>Connect on LinkedIn</span><div class="glitch" aria-hidden="true"><span class="backdrop"><span class="corner"></span></span><kbd>in</kbd><span class="letters"><span>L</span><span>i</span><span>n</span><span>k</span><span>e</span><span>d</span><span>I</span><span>n</span></span></div></a>` : ''}
        ${siteConfig.email ? `<a href="mailto:${siteConfig.email}" class="cyber-btn cyber-btn-secondary" data-sound="accept"><span class="backdrop"><span class="corner"></span></span><kbd>@</kbd><span>Email Me</span><div class="glitch" aria-hidden="true"><span class="backdrop"><span class="corner"></span></span><kbd>@</kbd><span class="letters"><span>E</span><span>m</span><span>a</span><span>i</span><span>l</span></span></div></a>` : ''}
    `;

    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Populate Highlights
    const highlightsHtml = profileData.highlights.map(h => `
        <div class="highlight-item cyber-highlight">
            <div class="cyber-highlight-corner"></div>
            <div class="highlight-value counter" data-target="${h.value}">0</div>
            <div class="highlight-label">[ ${h.label.toUpperCase()} ]</div>
        </div>
    `).join('');
    document.getElementById('highlights-container').innerHTML = highlightsHtml;

    // 3. Populate About Story Cards (Sticky Scroll Layout)
    document.getElementById('about-content').innerHTML = `
        <div class="about-story-card" data-step="1">
            <div class="story-card-header">
                <span class="story-step-badge">Chapter 01</span>
                <span class="story-tag">Overview</span>
            </div>
            <h3 class="story-title">Who I Am</h3>
            <p class="story-body">${profileData.about.intro}</p>
        </div>

        <div class="about-story-card" data-step="2">
            <div class="story-card-header">
                <span class="story-step-badge">Chapter 02</span>
                <span class="story-tag story-tag-green">The Roots</span>
            </div>
            <h3 class="story-title">Where I Started — Horticulture</h3>
            <p class="story-body">${profileData.about.journey.start}</p>
            <div class="story-highlight-pill">
                <span class="pill-emoji">🌱</span>
                <span>Practical field discipline: observing systemic problems, protecting crops, and managing real-world growth.</span>
            </div>
        </div>

        <div class="about-story-card" data-step="3">
            <div class="story-card-header">
                <span class="story-step-badge">Chapter 03</span>
                <span class="story-tag story-tag-blue">The Pivot</span>
            </div>
            <h3 class="story-title">Where I Am Now — Computer Applications</h3>
            <p class="story-body">${profileData.about.journey.current}</p>
            <div class="story-highlight-pill">
                <span class="pill-emoji">💻</span>
                <span>Computational foundations: systems, algorithms, databases, and hands-on software development.</span>
            </div>
        </div>

        <div class="about-story-card" data-step="4">
            <div class="story-card-header">
                <span class="story-step-badge">Chapter 04</span>
                <span class="story-tag story-tag-purple">The Build</span>
            </div>
            <h3 class="story-title">What I Build — Cybersecurity & Practical AI</h3>
            <p class="story-body">${profileData.about.journey.focus}</p>
            <div class="story-highlight-pill">
                <span class="pill-emoji">🛡️</span>
                <span>Working systems: CocoaGuard AI (crop diagnostics), WAF-XAI (web app firewall), and WebVault.</span>
            </div>
        </div>

        <div class="about-story-card" data-step="5">
            <div class="story-card-header">
                <span class="story-step-badge">Chapter 05</span>
                <span class="story-tag story-tag-cyan">Mindset</span>
            </div>
            <h3 class="story-title">Engineering Philosophy</h3>
            <p class="story-body">I believe in learning by doing. Rather than just understanding concepts in isolation, I connect disciplines to solve genuine needs—whether protecting web applications or empowering agricultural resilience with machine learning.</p>
            <div class="story-bullets">
                <div class="story-bullet-item">
                    <span class="bullet-check">✓</span>
                    <span><strong>Hands-On Builder:</strong> Real implementations backed by working repositories and live prototypes.</span>
                </div>
                <div class="story-bullet-item">
                    <span class="bullet-check">✓</span>
                    <span><strong>Continuous Learner:</strong> 31+ certifications across AI, Cloud, Cybersecurity, and Web Development.</span>
                </div>
                <div class="story-bullet-item">
                    <span class="bullet-check">✓</span>
                    <span><strong>Cross-Disciplinary:</strong> Applying cutting-edge AI directly to agricultural domain knowledge.</span>
                </div>
            </div>
        </div>
    `;

    // 4. Populate Skills
    const skillsHtml = profileData.skills.map(group => `
        <div class="skill-category cyber-skill-card">
            <div class="cyber-card-backdrop"><div class="corner"></div></div>
            <h3 class="skill-category-title"><span class="cyber-heading-bracket">[</span> ${group.category} <span class="cyber-heading-bracket">]</span></h3>
            <div class="skill-chips">
                ${group.items.map(skill => `<span class="skill-chip cyber-chip">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
    document.getElementById('skills-container').innerHTML = skillsHtml;

    // 5. Populate Projects
    const projectsHtml = profileData.projects.map((p, index) => {
        let linksHtml = '';
        if(p.githubUrl) {
            linksHtml += `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-small cyber-btn-secondary" title="View Source" data-sound="accept"><span class="backdrop"><span class="corner"></span></span><kbd><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></kbd><span>Code</span></a>`;
        }
        if(p.demoUrl) {
            linksHtml += `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn btn-small cyber-btn-secondary" title="Live Demo" data-sound="accept"><span class="backdrop"><span class="corner"></span></span><kbd><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></kbd><span>Demo</span></a>`;
        }

        // Generate a relevant icon based on category
        let icon = '💻';
        if(p.category.includes('AI')) icon = '🧠';
        else if(p.category.includes('Data')) icon = '📊';
        else if(p.category.includes('Cyber')) icon = '🛡️';
        else if(p.category.includes('Web')) icon = '🌐';

        return `
        <div class="project-card cyber-card">
            <div class="cyber-card-backdrop"><div class="corner"></div></div>
            <div class="cyber-card-header">
                <span class="cyber-sys-tag">SYS.PRJ // 0x0${index + 1}</span>
                <span class="cyber-category-badge">[ ${p.category} ]</span>
            </div>
            <div class="project-image-placeholder cyber-image-box">${icon}</div>
            <h3 class="project-title">${p.title}</h3>
            <div class="project-subtitle">[ ${p.subtitle} ] • ${p.date}</div>
            <p class="project-description">${p.description}</p>
            <div class="project-tech">
                ${p.technologies.slice(0,4).map(t => `<span class="skill-chip cyber-chip">${t}</span>`).join('')}
                ${p.technologies.length > 4 ? `<span class="skill-chip cyber-chip">+${p.technologies.length - 4}</span>` : ''}
            </div>
            <div class="project-actions" style="margin-top: auto;">
                <button class="cyber-btn btn-small view-project-btn" data-id="${p.id}" data-sound="slide">
                    <span class="backdrop"><span class="corner"></span></span>
                    <kbd>↵</kbd>
                    <span>View Details</span>
                    <div class="glitch" aria-hidden="true">
                        <span class="backdrop"><span class="corner"></span></span>
                        <kbd>↵</kbd>
                        <span class="letters"><span>D</span><span>e</span><span>t</span><span>a</span><span>i</span><span>l</span><span>s</span></span>
                    </div>
                </button>
                ${linksHtml}
            </div>
        </div>
        `;
    }).join('');
    document.getElementById('projects-container').innerHTML = projectsHtml;

    // Project Modal Logic (Cyber Modal with Audio FX)
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalActions = document.getElementById('modal-actions');
    const modalCloseButtons = document.querySelectorAll('.modal-close');

    const closeModal = () => {
        if (modal.classList.contains('active')) {
            if (window.soundManager) soundManager.playReject();
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    };

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const btnEl = e.currentTarget;
            const projectId = btnEl.getAttribute('data-id');
            const project = profileData.projects.find(p => p.id === projectId);
            
            if(project) {
                if (window.soundManager) soundManager.playSlide();

                let archHtml = '';
                if(project.architecture && project.architecture.length > 0) {
                    const nodesHtml = project.architecture.map((node, i) => {
                        let arrow = i < project.architecture.length - 1 ? '<div class="arch-arrow">↓</div>' : '';
                        return `<div class="arch-node cyber-arch-node">${node}</div>${arrow}`;
                    }).join('');
                    archHtml = `
                        <div class="modal-section">
                            <h3><span class="cyber-heading-bracket">[</span> Architecture Pipeline <span class="cyber-heading-bracket">]</span></h3>
                            <div class="arch-flow">
                                ${nodesHtml}
                            </div>
                        </div>
                    `;
                }

                modalBody.innerHTML = `
                    <div class="modal-title-wrap">
                        <h2><span>${project.title}</span></h2>
                        <div class="subtitle">[ ${project.subtitle} ] • ${project.date}</div>
                    </div>
                    
                    <div class="modal-section">
                        <h3><span class="cyber-heading-bracket">[</span> System Overview <span class="cyber-heading-bracket">]</span></h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3><span class="cyber-heading-bracket">[</span> Key Features &amp; Implementation <span class="cyber-heading-bracket">]</span></h3>
                        <ul>
                            ${project.details.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>

                    ${archHtml}

                    <div class="modal-section">
                        <h3><span class="cyber-heading-bracket">[</span> Tech Stack <span class="cyber-heading-bracket">]</span></h3>
                        <div class="skill-chips">
                            ${project.technologies.map(t => `<span class="skill-chip cyber-chip">${t}</span>`).join('')}
                        </div>
                    </div>
                `;

                // Update Cyber Modal Actions
                let actionsHtml = `
                    <button class="cyber-btn modal-close-btn" data-action="Cancel" data-sound="reject">
                        <span class="backdrop"><span class="corner"></span></span>
                        <kbd>esc</kbd>
                        <span>Close</span>
                    </button>
                `;
                if (project.githubUrl) {
                    actionsHtml += `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn" data-action="Proceed" data-sound="accept">
                            <span class="backdrop"><span class="corner"></span></span>
                            <kbd>↵</kbd>
                            <span>View Source</span>
                        </a>
                    `;
                }
                if (project.demoUrl) {
                    actionsHtml += `
                        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn" data-action="Proceed" data-sound="accept">
                            <span class="backdrop"><span class="corner"></span></span>
                            <kbd>🚀</kbd>
                            <span>Live Demo</span>
                        </a>
                    `;
                }
                modalActions.innerHTML = actionsHtml;

                // Re-bind action close button
                modalActions.querySelector('.modal-close-btn').addEventListener('click', closeModal);
                
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    modalCloseButtons.forEach(btn => btn.addEventListener('click', closeModal));
    
    // Close on click outside modal card
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            closeModal();
        }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Populate Experience
    const expHtml = profileData.experience.map(e => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${e.date}</span>
                <h3 class="timeline-title">${e.title}</h3>
                <h4 class="timeline-company">${e.company}</h4>
                <p class="timeline-desc">${e.description}</p>
            </div>
        </div>
    `).join('');
    document.getElementById('experience-container').innerHTML = expHtml;

    // 7. Populate Education
    const eduHtml = profileData.education.map(e => `
        <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <span class="timeline-date">${e.date}</span>
                <h3 class="timeline-title">${e.degree}</h3>
                <h4 class="timeline-company">${e.school}</h4>
                ${e.status ? `<p class="timeline-desc"><strong>Status:</strong> ${e.status}</p>` : ''}
                ${e.description ? `<p class="timeline-desc">${e.description}</p>` : ''}
            </div>
        </div>
    `).join('');
    document.getElementById('education-container').innerHTML = eduHtml;

    // 8. Populate Certifications
    const renderCerts = (filter = 'all') => {
        let filtered = profileData.certifications;
        if(filter !== 'all') {
            filtered = profileData.certifications.filter(c => c.category === filter);
        }
        
        const certHtml = filtered.map(c => `
            <div class="cert-card cyber-cert-card">
                <div class="cyber-card-backdrop"><div class="corner"></div></div>
                <div class="cert-date"><span class="cyber-code-accent">[</span> ${c.date} <span class="cyber-code-accent">]</span></div>
                <h3 class="cert-title">${c.title}</h3>
                <div class="cert-issuer">${c.issuer}</div>
                ${c.url && c.url !== '#' ? `<a href="${c.url}" target="_blank" rel="noopener noreferrer" class="cert-link cyber-link" data-sound="accept">VERIFY CREDENTIAL →</a>` : '<span class="cert-link" style="color:var(--text-muted)">Credential link unavailable</span>'}
            </div>
        `).join('');
        
        document.getElementById('certifications-container').innerHTML = certHtml;
    };
    
    renderCerts();
    
    // Cert Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.soundManager) soundManager.playAccept();
            renderCerts(e.currentTarget.getAttribute('data-filter'));
        });
    });

    // 9. Populate Awards
    const awardsHtml = profileData.awards.map(a => `
        <div class="cert-card cyber-award-card">
            <div class="cyber-card-backdrop"><div class="corner"></div></div>
            <div class="cert-date"><span class="cyber-code-accent">[</span> ${a.date || 'RECOGNIZED'} <span class="cyber-code-accent">]</span></div>
            <h3 class="cert-title">${a.title}</h3>
            <div class="cert-issuer">${a.description}</div>
        </div>
    `).join('');
    document.getElementById('awards-container').innerHTML = awardsHtml;

});
