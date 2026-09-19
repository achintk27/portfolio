# Achint Kiran — personal portfolio

A Mario-inspired portfolio with an animated avatar, explorable world, university pennants, and a searchable project collection. Projects remain visible without playing the game.

## Add a project

Edit the `portfolioProjects` array at the top of `projects.js`. Copy an existing entry and supply:

- `id`: a unique URL-friendly name (used for direct project links)
- `title`, `description`, `category`, `tags`, and `status`
- `featured`: true to show it before other projects
- `metric` and `metricLabel`: the result shown on the cover
- `details`: the engineering challenge and implementation
- `liveUrl` and `sourceUrl`: optional links; leave empty if unavailable
- `image` and `imageAlt`: optional screenshot path and description
- `result`: optional additional outcome

Put project screenshots in `assets/`. Categories and counts update automatically. The gallery shows six projects at a time and offers Show more for larger collections. Search checks titles, descriptions, categories, and technologies.

Only add verified projects and results. Do not expose proprietary internship source code.

## Files

- `index.html`: biography, education, experience, accessible fallback project cards
- `projects.js`: project data and searchable gallery
- `platformer.js`: game, animated avatar, scenery, and world map
- `style.css`: desktop and mobile styling
- `assets/`: game artwork and university logos
- `Achint-Kiran-Resume.pdf`: résumé linked from the header

Run a local static server from this folder to preview. For example: `python3 -m http.server 4173`.

GitHub Pages can serve these files from the root of the main branch. The repository owner has chosen to make the portfolio public.

Game assets include Kenney Pixel Platformer (CC0); see `assets/kenney-license.txt`.
