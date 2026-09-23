# Sugumaran J — Personal Portfolio

A premium, modern, and accessible personal portfolio website built for Sugumaran J. 
This portfolio showcases a distinctive multidisciplinary journey across Horticulture, Computer Applications, Cybersecurity, AI/ML, and Data Analysis.

## Technologies
- **HTML5**: Semantic structure and accessibility.
- **CSS3**: Custom properties, Flexbox, Grid, animations, and responsive design (mobile-first approach).
- **Vanilla JavaScript (ES6)**: DOM manipulation, data binding, scroll effects, and intersection observers.
- **No frameworks**: Zero dependency on React, Vue, Tailwind, or Bootstrap to ensure high performance and maintainability.

## Features
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop viewports.
- **Theme Toggle**: Built-in Dark (default) and Light mode using CSS Custom Properties and `localStorage`.
- **Data-Driven Content**: Portfolio content is structured in `js/data.js` for easy updates without hardcoding HTML.
- **Project Showcase**: Detailed project cards with a modal system for architectural diagrams and deep dives (e.g., CocoaGuard AI, WAF-XAI).
- **Experience & Education Timeline**: Clean vertical timelines.
- **Certification Gallery**: Searchable and filterable certification cards.
- **Achievement Showcase**: Dedicated section for bug bounty recognitions and competition awards.
- **Accessibility**: Keyboard navigation support, semantic HTML, and `prefers-reduced-motion` compliance.
- **GitHub Pages Ready**: Uses relative paths and includes a `.nojekyll` file to bypass Jekyll processing for faster deployments.

## Deployment to GitHub Pages

1. Create a new repository on GitHub (e.g., `sugumaranj6724.github.io` or `portfolio`).
2. Upload all the contents of the `portfolio_website` directory to the `main` branch of your repository.
   - Do **NOT** upload the raw LinkedIn export `.csv` files.
   - Ensure `index.html` is at the root of the repository.
3. Go to your repository's **Settings** > **Pages**.
4. Set the **Source** to `Deploy from a branch`.
5. Select the `main` branch and `/ (root)` folder, then click **Save**.
6. GitHub Actions will build and deploy your site within a few minutes.

## Local Development

Since this is a static site without a build step, you can view it by simply opening `index.html` in any modern web browser. For the best experience (and to avoid CORS issues if you later add external local assets), use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js (npx)
npx serve
```
Then navigate to `http://localhost:8000`.

## File Structure

```text
/
├── index.html          # Main HTML file
├── README.md           # This documentation
├── .nojekyll           # Bypasses GitHub Pages Jekyll build
├── css/
│   ├── style.css       # Core styling and variables
│   ├── responsive.css  # Media queries
│   └── animations.css  # Keyframes and transition classes
├── js/
│   ├── data.js         # Centralized portfolio content
│   ├── main.js         # Theme toggle, menu, and UI logic
│   ├── portfolio.js    # Data rendering and modal logic
│   └── animations.js   # Intersection observers
└── assets/             # Images, icons, and resume (placeholders provided)
```
