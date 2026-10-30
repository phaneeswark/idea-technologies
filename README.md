# Idea Technologies — website redesign

A new site for ideatechnologies.net. All content comes from the current site. The logo has been rebuilt in 3D with Three.js and appears in the homepage hero.

## Run it

```bash
npm install
npm run dev        # local preview at http://localhost:5173
npm run build      # production files go into dist/
```

Upload the contents of `dist/` to any static host (your current web host, Netlify, Vercel, S3, etc.).

## Live site (GitHub Pages)

The site is hosted at **https://phaneeswark.github.io/idea-technologies/**. To publish changes, run:

```bash
npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch; the live link updates about a minute later. Save your source changes with `git add -A && git commit -m "..." && git push`.

## Share a preview link (from this Mac)

Run these in two separate terminal windows, in this folder:

```bash
npm run build && npm run serve
```

```bash
./.tools/cloudflared tunnel --no-autoupdate --url http://localhost:8080
```

The second command prints a public `https://….trycloudflare.com` link. It works only while both commands are running and the Mac is awake, and you get a new link each time you restart the tunnel. Press Ctrl-C in either window to stop sharing.

## Pages

| Route | Page |
|---|---|
| `#/` | Home: 3D logo hero, client name marquee, stats, services, client logo carousel, process, industries, DIR band |
| `#/company` | Overview, mission, vision, executive expertise, alliances |
| `#/services` | Six services in detail |
| `#/clients` | Industries, plus a client directory you can filter and search |
| `#/dir` | DIR-CPO-5540 contract: copy the contract number, search roles, PDF appendices, how to order |
| `#/careers` | Disciplines with one-click email applications |
| `#/contact` | Validated form (opens the visitor's email app), map, contact cards |
| `#/legal` | Legal disclaimer |

## Features

- Real 3D logo: extruded, beveled badge and letters, reflections, mouse tilt, build-in animation and a light sweep
- Animated network background that reacts to the mouse
- Light and dark themes (follows the system setting and remembers the visitor's choice)
- Command palette (Ctrl/⌘ + K, or `/`) that searches pages, services, IT roles, clients and documents
- Scroll reveals, animated counters, 3D tilt cards, magnetic buttons, scroll progress bar, back-to-top button
- Responsive down to 320px; respects reduced-motion settings
- SEO meta tags and Organization structured data

## Where to edit

- Text and data: `src/data.js`
- Page layouts: `src/pages.js`
- 3D logo: `src/logo3d.js`
- Styles and colors: `src/styles.css` (the tokens at the top)

## Contact form

The form opens the visitor's email app with the message pre-filled to info@ideatechnologies.net. If you'd rather receive submissions without email, point the submit handler in `src/main.js` (`initContactForm`) at a form service such as Formspree or your own API.
