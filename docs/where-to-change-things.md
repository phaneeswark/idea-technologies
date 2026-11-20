# Where to change things

A lookup table for updating the website: find what you want to change, open that file, edit, and publish.

---

## How a change goes live

Every change follows the same three steps:

1. **Edit** the file listed below.
2. **Commit and push** it to GitHub.
3. **Wait about a minute.** GitHub rebuilds the site automatically and the live link updates:
   https://phaneeswark.github.io/idea-technologies/

You can do this in either of two ways.

**Option A: on the GitHub website (no tools needed)**
1. Open the file on GitHub, for example
   https://github.com/phaneeswark/idea-technologies/blob/main/src/data.js
2. Click the **pencil ✏️** icon (Edit this file).
3. Make your change.
4. Click **Commit changes…**, then **Commit changes** again.

**Option B: on this Mac**
1. Edit the file in any text editor.
2. In this folder, run:
   ```bash
   git add -A && git commit -m "Describe the change" && git push
   ```

**Checking that it went live:** open the **Actions** tab at
https://github.com/phaneeswark/idea-technologies/actions
- ✅ green tick: live within a minute
- ❌ red cross: something in the change broke the build, usually a missing quote or comma. **The live site keeps showing the last working version**, so nothing breaks for visitors. Click the failed run to see the error, fix the file and push again.

**Preview before publishing (optional, on this Mac):** run `npm run dev` and open http://localhost:5173

---

## Company details: one place

All company details are in **`src/data.js`**, in the **WEBSITE SETTINGS** section at the top. Change a value there and it updates everywhere: every page, the DIR page, the footer, page titles and search-engine info.

| I want to change… | Setting in `src/data.js` | Shows up on |
|---|---|---|
| Phone number | `phone: '+1 (512) 366-0019'` (keep the +1; the tap-to-call link updates itself) | Contact page, footer, homepage button, DIR page, error messages |
| Email address | `email: 'info@ideatechnologies.net'` | Contact page, footer, DIR page, careers links, form notes |
| Street address | `street`, `city`, `state`, `zip` | Contact page, footer, map, DIR page |
| City/state in sentences ("based in Austin, Texas") | `city`, `stateName` | Homepage, Company, Contact, Careers, DIR page |
| President's name | `president` | Contact page, footer |
| Name under "please contact" on the DIR page | `dir` → `contact` | DIR page |
| Company name | `name` | Page titles, text across the site |
| Legal name | `legalName` | Footer copyright, DIR page |
| Year founded | `founded` | Homepage counter, DIR page "About" |
| Active contractors | `activeContractors: '23+'` (a number, or text like `'23+'` in quotes) | Homepage counter, Company page, DIR page |
| "Strong presence in the United States and India" | `presence`, `presenceShort` | Homepage, Company page |
| Certifications | `certifications` | Homepage badges, footer badges, Company page, search-engine info |
| DIR contract number | `dir` → `contract` | Everywhere it appears: DIR page, homepage, footer, services |
| DIR website links | `dir` → `contractUrl`, `programUrl`, `coopUrl` | DIR page, footer |
| DIR appendix PDFs (B, C, D) | `dir` → `docs` (keep the order D, B, C) | DIR page, site search |
| IT roles offered under DIR | `dir` → `roles` | DIR page list, site search |
| Contact form's Google script address | `formEndpoint` | Contact form (see [contact-form-emails.md](contact-form-emails.md)) |

---

## Page content

Also in **`src/data.js`**, below the settings, under **PAGE CONTENT**:

| I want to change… | Where in `src/data.js` | Shows up on |
|---|---|---|
| Homepage introduction paragraphs | `intro` | Homepage |
| The six services (title, short and long text, bullet points) | `services` | Homepage, Services page, pop-ups, footer search |
| The 5-step process (Consult → Manage) | `lifecycle` | Homepage, Services page |
| Industries (Government, Energy …) | `industries` | Homepage, Clients page, Company page |
| Client list (names and type: state, local or private) | `clients` | Clients page directory, homepage count "21+" |
| Technology expertise tags | `expertise`, `sectorsExpertise` | Company page, homepage |
| Contact form checkboxes ("I am interested in") | `interests` | Contact page |
| Client logos in the homepage carousel | `clientLogos` | Homepage |

**Adding a client logo:**
1. Put the image (PNG, ideally on a transparent or white background) in `public/clients/`, for example `public/clients/twc.png`.
2. Add a line to `clientLogos` in `src/data.js`:
   `{ file: 'clients/twc.png', name: 'Texas Workforce Commission' },`
3. Commit and push.

---

## Contact form emails

Handled by a Google Apps Script in your Google account, not by this project. Full details are in **[contact-form-emails.md](contact-form-emails.md)**.

| I want to change… | Where |
|---|---|
| Who receives the form emails (info@, itsac@) | Script at script.google.com → `TO`, then publish a new version |
| Daily message limit | Script → `DAILY_LIMIT`, then publish a new version |
| Block a throwaway email domain | `src/validate.js` **and** the script → `BLOCKED_DOMAINS` |
| Email or phone rules and messages | `src/validate.js` **and** the script |
| Thank-you message, form labels | `src/pages.js` → `contact` page |
| Turn off direct sending | `src/data.js` → `formEndpoint: ''` |

---

## Layout, design and other pages

| I want to change… | File |
|---|---|
| Wording or layout of a main-site page (Home, Company, Services, Clients, Careers, Contact, Legal) | `src/pages.js`, which has one section per page |
| DIR page wording or layout | `dir/index.html` |
| DIR page header (dark banner with the logo) | `dir/dir.css` (`.dir-hero`) and the logo/title in `dir/index.html` |
| Top menu items | `index.html` (`<nav class="nav">`) |
| Footer links and text | `index.html` (`<footer class="site-footer">`) |
| Colours and fonts (main site) | `src/styles.css`, the colour settings at the top (`--brand` is the orange) |
| The 3D logo on the homepage | `src/logo3d.js` |
| Browser tab icon | `public/favicon.svg` |
| Search-engine description of the site | `index.html` (`<meta name="description">`) |

---

## Tips to avoid a broken publish

- **Keep the quotes and commas.** Text goes between quotes, and each line in a list ends with a comma:
  `phone: '+1 (512) 366-0019',`
- **Apostrophes inside text** (like *company's*) must use the curly one ’ or a backslash `\'`. A plain `'` ends the text early.
- **Numbers without quotes, text with quotes.** `founded: 2009` is right. `activeContractors: 23+` is wrong; it must be `'23+'`.
- **After pushing, check the Actions tab.** A red cross means the change didn't go live. Fix it and push again.

---

## GitHub account note

This folder is set to always push to GitHub as **phaneeswark**, even if another GitHub account is active on this Mac. If pushing ever fails with "Permission denied", check that the `phaneeswark` login is still signed in:

```bash
gh auth status
```
