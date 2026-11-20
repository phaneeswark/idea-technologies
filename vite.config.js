import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { company, dir } from './src/data.js';

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Fills the {{...}} placeholders in the HTML pages (footer, search-engine info, DIR page)
// from the company details in src/data.js, so they are edited in one place.
function companyDetails() {
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    legalName: company.legalName,
    url: 'https://ideatechnologies.net/',
    email: company.email,
    telephone: company.phone,
    foundingDate: String(company.founded),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.street,
      addressLocality: company.city,
      addressRegion: company.state,
      postalCode: company.zip,
      addressCountry: 'US',
    },
  }).replace(/</g, '\\u003c');

  return {
    name: 'company-details',
    transformIndexHtml(html) {
      return html.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
        if (key === 'jsonLd') return jsonLd;
        // DIR page: the role list, one "• role" per line.
        if (key === 'dir.rolesList') return dir.roles.map((r) => `• ${escapeHtml(r)}`).join('<br>');
        // Footer badges: certifications plus the DIR contract number.
        if (key === 'certPills') {
          return [...company.certifications.filter((c) => / Certified$/.test(c)), dir.contract]
            .map((c) => `<span class="pill">${escapeHtml(c)}</span>`).join('');
        }
        // Anything else is a path into src/data.js: {{email}}, {{dir.contract}}, {{dir.docs.0.url}} …
        const [root, ...path] = key.startsWith('dir.') ? [dir, ...key.split('.').slice(1)] : [company, ...key.split('.')];
        const value = path.reduce((obj, k) => (obj == null ? undefined : obj[k]), root);
        if (value == null || typeof value === 'object') throw new Error(`An HTML page uses {{${key}}}, which is not a value in src/data.js`);
        return escapeHtml(value);
      });
    },
  };
}

export default defineConfig({
  // Relative paths, so the build works at any address (GitHub Pages subfolder, local server, etc.).
  base: './',
  plugins: [companyDetails()],
  // The Three.js 3D logo chunk is lazy-loaded, so a larger chunk is expected.
  build: {
    chunkSizeWarningLimit: 800,
    // Two pages: the main site, and the DIR contract page at /dir/.
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        dir: fileURLToPath(new URL('./dir/index.html', import.meta.url)),
      },
    },
  },
});
