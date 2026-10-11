# Achint Kiran — Portfolio

Live: https://achintk27.github.io/portfolio/

Static HTML, CSS and a small progressive-enhancement script. No packages or build service needed to host it on GitHub Pages.

## Add a project
Edit `projects.json`: add a unique `id`, category, title, description, tags, metric, unit, cover (`booking` or `pipeline`), demo URL (or empty string), challenge, approach and result. Run `python3 build.py` and commit the generated HTML files along with the data. Add custom visuals in the `cover` function as projects grow; existing covers are labelled concepts, not screenshots.

Profile/education/experience content lives in `profile-template.html`. Shared styling is in `style.css`. Search and filters are in `projects.js`. The home page features the project collection; every project has a static detail page and works without JavaScript. Replace `Achint-Kiran-Resume.pdf` when updating the résumé.

Preview: `python3 -m http.server 4174`. Publish the root files to the repository main branch; GitHub Pages serves them.
