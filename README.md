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

- Company details (phone, email, address, president, contractor count): the `company` section at the top of `src/data.js`. This is the only place to change them; the pages, footer and search-engine info all read from it.
- Other text and data (services, clients, logos, DIR roles): `src/data.js`
- Page layouts: `src/pages.js`
- 3D logo: `src/logo3d.js`
- Styles and colors: `src/styles.css` (the tokens at the top)

## Contact form

Messages are emailed to info@ideatechnologies.net from your own Google Workspace account by a small Google Apps Script (`google-apps-script/Code.gs`). No outside service is involved. The visitor sees a "Thanks, your message was sent" confirmation, and pressing Reply in the email answers the visitor directly. Until it's set up, the form opens the visitor's email app instead.

### One-time setup (about 5 minutes)

1. Sign in to Google with your **Workspace** account and open https://script.google.com. Click **New project** and name it "Website contact form".
2. Delete the sample code, paste in everything from `google-apps-script/Code.gs`, and click **Save** (the disk icon).
3. Choose **sendTestEmail** in the function menu at the top, then click **Run**. Google asks for permission ("Review permissions", pick your account, then **Allow**). A test email should arrive at info@ideatechnologies.net.
4. Click **Deploy > New deployment**. Click the gear icon and choose **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
6. Paste that URL into `formEndpoint` in `src/data.js`, then commit and push.

If "Anyone" isn't offered in step 4, your Workspace admin has limited sharing. Ask them to allow web apps to be shared outside the organization in the Admin console, under Apps > Google Workspace > Drive and Docs > Sharing settings.

### Good to know

- Emails are sent from the Google account that deployed the script. They show as "*Visitor name* via Idea Technologies website".
- Up to 100 form messages a day are accepted (`DAILY_LIMIT` in the script), well within Google's sending limits. A hidden spam trap blocks simple bots.
- To change the script later, edit it at script.google.com, then go to **Deploy > Manage deployments**, click the pencil icon, choose **Version: New version** and click **Deploy**. The URL stays the same.
