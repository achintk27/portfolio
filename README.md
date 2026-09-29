# Achint Kiran — personal portfolio

A minimal, responsive portfolio for software engineering opportunities, with selected projects, education, engineering and research experience, skills, and contact information.

**Live:** https://achintk27.github.io/portfolio/

## Update the content

- `index.html` contains all portfolio content and project cards.
- `style.css` controls the layout and typography.
- `projects.js` adds optional project filtering, search, and Show more. The content works without JavaScript.
- `Achint-Kiran-Resume.pdf` is the résumé linked from the header and experience section. The current version is the SWE internship résumé supplied on September 29, 2026.

## Add a project

Duplicate a project `<article>` inside `#project-grid` in `index.html`:

1. Give it a unique ID such as `project-my-app` and a `data-category` value.
2. Update the title, description, implementation highlights, technologies, and verified results.
3. Add a live demo or source link when available; omit unavailable links.
4. Optionally add a screenshot using `<img class="project-image" src="assets/my-app.webp" alt="Description of the app" loading="lazy" width="800" height="500">`.
5. Update the technical details. Keep enough information visible to understand the project without expanding them.

Category controls appear automatically above three projects. Search and Show more appear above six projects. The first six projects follow the order in the HTML, so place featured work first. Direct project anchors reveal cards even beyond the initial six.

## Preview and publish

Run a static server from this folder, for example `python3 -m http.server 4173`, then open `http://localhost:4173`.

GitHub Pages serves the root of the `main` branch. Commit the updated files to publish. There are no package dependencies, external fonts, trackers, or build steps.

The earlier game files and assets are retained for reference but are not loaded by the current website. A local snapshot of the previous design is also preserved in the workspace under `work/before-minimal-2026-09-29/`.
