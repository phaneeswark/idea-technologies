import { defineConfig } from 'vite';
import { company } from './src/data.js';

const escapeHtml = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

// Fills the {{...}} placeholders in index.html (footer, search-engine info)
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
      return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        if (key === 'jsonLd') return jsonLd;
        if (!(key in company)) throw new Error(`index.html uses {{${key}}}, which is not in company (src/data.js)`);
        return escapeHtml(company[key]);
      });
    },
  };
}

export default defineConfig({
  // Relative paths, so the build works at any address (GitHub Pages subfolder, local server, etc.).
  base: './',
  plugins: [companyDetails()],
  // The Three.js 3D logo chunk is lazy-loaded, so a larger chunk is expected.
  build: { chunkSizeWarningLimit: 800 },
});
