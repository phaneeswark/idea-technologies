// Contact form checks. Each returns '' when the value is fine, or a message to show the visitor.
// The Google Apps Script (google-apps-script/Code.gs) repeats these checks, so they can't be skipped.

/* ---------- Name ---------- */

export function checkName(raw) {
  const name = raw.trim();
  if (!name) return 'Please enter your name.';
  if (!/\p{L}/u.test(name)) return 'Please enter a valid name.';
  return '';
}

/* ---------- Email ---------- */
// 1. written correctly (name@domain.tld)
// 2. not a throwaway inbox or placeholder domain
// 3. the domain actually receives email (has mail servers, checked via Google's public DNS)

// Throwaway inboxes and placeholder domains. Add more here (and in Code.gs) if spam gets through.
export const BLOCKED_DOMAINS = [
  'example.com', 'example.org', 'example.net', 'test.com', 'domain.com', 'email.test',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', 'grr.la',
  '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'tempmailo.com', 'tempail.com',
  'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
  'throwawaymail.com', 'fakeinbox.com', 'mailnesia.com', 'mintemail.com', 'emailondeck.com',
  'moakt.com', 'mohmal.com', 'burnermail.io', 'mailcatch.com', 'spamgourmet.com',
  'discard.email', 'mytemp.email', 'tempr.email', 'emailfake.com', 'fakemail.net',
];

const EMAIL_SYNTAX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;
const INVALID_EMAIL = 'Please enter a valid email address.';

// Instant check (no network): format and blocked domains.
export function checkEmailFormat(raw) {
  const email = raw.trim();
  if (!email) return 'Please enter your email address.';
  if (email.length > 254 || !EMAIL_SYNTAX.test(email)) return INVALID_EMAIL;
  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) return 'Please use your work or personal email, not a temporary one.';
  return '';
}

// Full check: format, then whether the domain receives email.
export async function checkEmail(raw) {
  const problem = checkEmailFormat(raw);
  if (problem) return problem;
  const domain = raw.trim().split('@')[1].toLowerCase();
  if ((await domainReceivesMail(domain)) === false) return `${INVALID_EMAIL} “${domain}” doesn’t receive email.`;
  return ''; // true, or null when the lookup itself failed (the server checks again)
}

const mxCache = new Map();

// true = has mail servers, false = doesn't, null = couldn't check.
function domainReceivesMail(domain) {
  if (!mxCache.has(domain)) {
    const lookup = lookupMx(domain);
    mxCache.set(domain, lookup);
    lookup.then((v) => { if (v === null) mxCache.delete(domain); }); // retry failed lookups next time
  }
  return mxCache.get(domain);
}

async function lookupMx(domain) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.Status === 3) return false; // domain doesn't exist
    if (data.Status !== 0) return null;
    // "0 ." is a "null MX": the domain says it never accepts email.
    return (data.Answer || []).some((a) => a.type === 15 && !/^\d+\s+\.?$/.test(a.data.trim()));
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ---------- Phone (optional) ---------- */
// US numbers: 10 digits with a real area code, e.g. (512) 366-0019 or 512-366-0019.
// International: start with + and the country code, 8 to 15 digits, e.g. +91 98765 43210.
// An extension is allowed at the end: "ext 123", "x123" or "#123".

const INVALID_PHONE = 'Please enter a valid phone number, e.g. (512) 366-0019 or +91 98765 43210.';
const US_NUMBER = /^[2-9]\d{2}[2-9]\d{6}$/; // area code and exchange can't start with 0 or 1

export function checkPhone(raw) {
  const value = raw.trim();
  if (!value) return '';
  const main = value.replace(/\s*(?:ext\.?|x|#)\s*\d{1,6}$/i, '');
  if (!/^\+?[\d\s().-]+$/.test(main)) return INVALID_PHONE;
  const digits = main.replace(/\D/g, '');
  if (/^(\d)\1+$/.test(digits)) return INVALID_PHONE; // 0000000000, 1111111111…

  if (main.startsWith('+')) {
    if (digits.startsWith('1')) return digits.length === 11 && US_NUMBER.test(digits.slice(1)) ? '' : INVALID_PHONE;
    return digits.length >= 8 && digits.length <= 15 ? '' : INVALID_PHONE;
  }
  const us = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return US_NUMBER.test(us) ? '' : INVALID_PHONE;
}
