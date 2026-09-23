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
        ${siteConfig.linkedin ? `<a href="${siteConfig.linkedin}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Connect on LinkedIn</a>` : ''}
        ${siteConfig.email ? `<a href="mailto:${siteConfig.email}" class="btn btn-secondary">Email Me</a>` : ''}
    `;

    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 2. Populate Highlights
    const highlightsHtml = profileData.highlights.map(h => `
        <div class="highlight-item">
            <div class="highlight-value counter" data-target="${h.value}">0</div>
            <div class="highlight-label">${h.label}</div>
        </div>
    `).join('');
    document.getElementById('highlights-container').innerHTML = highlightsHtml;

    // 3. Populate About
    document.getElementById('about-content').innerHTML = `
        <p>${profileData.about.intro}</p>
        <p><strong>Where I Started:</strong> ${profileData.about.journey.start}</p>
        <p><strong>Where I Am Now:</strong> ${profileData.about.journey.current}</p>
        <p><strong>What I Build:</strong> ${profileData.about.journey.focus}</p>
    `;

    // 4. Populate Skills
    const skillsHtml = profileData.skills.map(group => `
        <div class="skill-category">
            <h3 class="skill-category-title">${group.category}</h3>
            <div class="skill-chips">
                ${group.items.map(skill => `<span class="skill-chip">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
    document.getElementById('skills-container').innerHTML = skillsHtml;

    // 5. Populate Projects
    const projectsHtml = profileData.projects.map((p, index) => {
        let linksHtml = '';
        if(p.githubUrl) {
            linksHtml += `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-small" title="View Source"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>`;
        }
        if(p.demoUrl) {
            linksHtml += `<a href="${p.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-small" title="Live Demo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>`;
        }

        // Generate a random icon based on category
        let icon = '💻';
        if(p.category.includes('AI')) icon = '🧠';
        else if(p.category.includes('Data')) icon = '📊';
        else if(p.category.includes('Cyber')) icon = '🛡️';
        else if(p.category.includes('Web')) icon = '🌐';

        return `
        <div class="project-card">
            <div class="project-image-placeholder">${icon}</div>
            <div class="project-category">${p.category}</div>
            <h3 class="project-title">${p.title}</h3>
            <div class="project-subtitle">${p.subtitle} • ${p.date}</div>
            <p class="project-description">${p.description}</p>
            <div class="project-tech">
                ${p.technologies.slice(0,4).map(t => `<span class="skill-chip">${t}</span>`).join('')}
                ${p.technologies.length > 4 ? `<span class="skill-chip">+${p.technologies.length - 4}</span>` : ''}
            </div>
            <div class="project-actions" style="margin-top: auto;">
                <button class="btn btn-primary btn-small view-project-btn" data-id="${p.id}">View Details</button>
                ${linksHtml}
            </div>
        </div>
        `;
    }).join('');
    document.getElementById('projects-container').innerHTML = projectsHtml;

    // Project Modal Logic
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.querySelector('.modal-close');

    document.querySelectorAll('.view-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = e.target.getAttribute('data-id');
            const project = profileData.projects.find(p => p.id === projectId);
            
            if(project) {
                let archHtml = '';
                if(project.architecture && project.architecture.length > 0) {
                    const nodesHtml = project.architecture.map((node, i) => {
                        let arrow = i < project.architecture.length - 1 ? '<div class="arch-arrow">↓</div>' : '';
                        return `<div class="arch-node">${node}</div>${arrow}`;
                    }).join('');
                    archHtml = `
                        <div class="modal-section">
                            <h3>Architecture</h3>
                            <div class="arch-flow">
                                ${nodesHtml}
                            </div>
                        </div>
                    `;
                }

                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <div class="subtitle">${project.subtitle} • ${project.date}</div>
                    
                    <div class="modal-section">
                        <h3>Overview</h3>
                        <p>${project.description}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3>Key Features / Findings</h3>
                        <ul>
                            ${project.details.map(d => `<li>${d}</li>`).join('')}
                        </ul>
                    </div>

                    ${archHtml}

                    <div class="modal-section">
                        <h3>Technologies</h3>
                        <div class="skill-chips">
                            ${project.technologies.map(t => `<span class="skill-chip">${t}</span>`).join('')}
                        </div>
                    </div>
                `;
                
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });
    
    // Close on click outside
    modal.addEventListener('click', (e) => {
        if(e.target === modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
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
            <div class="cert-card">
                <div class="cert-date">${c.date}</div>
                <h3 class="cert-title">${c.title}</h3>
                <div class="cert-issuer">${c.issuer}</div>
                ${c.url && c.url !== '#' ? `<a href="${c.url}" target="_blank" rel="noopener noreferrer" class="cert-link">Verify Credential →</a>` : '<span class="cert-link" style="color:var(--text-muted)">Credential link unavailable</span>'}
            </div>
        `).join('');
        
        document.getElementById('certifications-container').innerHTML = certHtml;
    };
    
    renderCerts();
    
    // Cert Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderCerts(e.target.getAttribute('data-filter'));
        });
    });

    // 9. Populate Awards
    const awardsHtml = profileData.awards.map(a => `
        <div class="cert-card">
            <div class="cert-date">${a.date || 'Recognized'}</div>
            <h3 class="cert-title">${a.title}</h3>
            <div class="cert-issuer">${a.description}</div>
        </div>
    `).join('');
    document.getElementById('awards-container').innerHTML = awardsHtml;

});
