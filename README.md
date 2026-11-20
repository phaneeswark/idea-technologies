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

The site is hosted at **https://phaneeswark.github.io/idea-technologies/**. It publishes itself: every push to the `main` branch rebuilds the site and updates the live link within a couple of minutes.

```bash
git add -A && git commit -m "Describe the change" && git push
```

To watch a publish, or see why one failed, open the **Actions** tab of the repository on GitHub. If a publish fails (for example, a typo in `src/data.js`), the live site keeps showing the last working version.

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
| `#/` | Home: 3D logo hero, stats, services, client logo carousel, process, industries, DIR band |
| `#/company` | Overview, mission, vision, executive expertise, alliances |
| `#/services` | Six services in detail |
| `#/clients` | Industries, plus a client directory you can filter and search |
| `dir/` | DIR-CPO-5540 contract page, a separate page that keeps the original site's DIR layout and colours with the new header (`dir/index.html`, `dir/dir.css`). Its contact details and role list come from `src/data.js`. The old `#/dir` link redirects here. |
| `#/careers` | Disciplines with one-click email applications |
| `#/contact` | Contact form that emails info@ and itsac@ directly (checks name, email and phone), map, contact cards |
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

- **[docs/where-to-change-things.md](docs/where-to-change-things.md):** what to edit for every kind of change (phone, address, names, DIR details, services, clients, logos, layout), how to publish, and how to check it went live.
- **[docs/contact-form-emails.md](docs/contact-form-emails.md):** how the contact form sends email through a Google Apps Script, how it was set up, how to change recipients and limits, and troubleshooting.

In short: company details (names, phone, email, address, DIR contract) are all in the **WEBSITE SETTINGS** section at the top of `src/data.js`. Who receives contact form emails is set in the Google Apps Script at script.google.com.
