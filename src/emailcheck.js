// Checks that an email address is real enough to reply to:
// 1. it is written correctly (name@domain.tld),
// 2. it isn't a throwaway/disposable inbox or a placeholder domain,
// 3. its domain actually receives email (has mail servers, checked via Google's public DNS).
// The Google Apps Script repeats these checks, so they can't be skipped.

// Throwaway inboxes and placeholder domains. Add more here if spam gets through.
export const BLOCKED_DOMAINS = [
  'example.com', 'example.org', 'example.net', 'test.com', 'domain.com', 'email.test',
  'mailinator.com', 'guerrillamail.com', 'guerrillamail.net', 'sharklasers.com', 'grr.la',
  '10minutemail.com', 'tempmail.com', 'temp-mail.org', 'tempmailo.com', 'tempail.com',
  'yopmail.com', 'trashmail.com', 'getnada.com', 'dispostable.com', 'maildrop.cc',
  'throwawaymail.com', 'fakeinbox.com', 'mailnesia.com', 'mintemail.com', 'emailondeck.com',
  'moakt.com', 'mohmal.com', 'burnermail.io', 'mailcatch.com', 'spamgourmet.com',
  'discard.email', 'mytemp.email', 'tempr.email', 'emailfake.com', 'fakemail.net',
];

const SYNTAX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,24}$/;

export const INVALID_EMAIL = 'Please enter a valid email address.';

export function emailLooksValid(email) {
  return email.length <= 254 && SYNTAX.test(email);
}

// Returns '' when the email is fine, or a message to show the visitor.
export async function checkEmail(raw) {
  const email = raw.trim();
  if (!emailLooksValid(email)) return INVALID_EMAIL;
  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.includes(domain)) return 'Please use your work or personal email, not a temporary one.';

  const verdict = await domainReceivesMail(domain);
  if (verdict === false) return `${INVALID_EMAIL} “${domain}” doesn’t receive email.`;
  return ''; // true, or null when the lookup itself failed (the server checks again)
}

// true = has mail servers, false = doesn't, null = couldn't check.
async function domainReceivesMail(domain) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=MX`, { signal: ctrl.signal });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.Status === 3) return false; // domain doesn't exist
    if (data.Status !== 0) return null;
    const mx = (data.Answer || []).filter((a) => a.type === 15);
    // "0 ." is a "null MX": the domain says it never accepts email.
    return mx.some((a) => !/^\d+\s+\.?$/.test(a.data.trim()));
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
