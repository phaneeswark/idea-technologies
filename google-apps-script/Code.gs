/**
 * Idea Technologies website: contact form handler (Google Apps Script).
 *
 * The website sends each form submission here, and this script emails it
 * from your Google Workspace account. Setup steps are in the README
 * ("Contact form"). After changing this file, redeploy:
 * Deploy > Manage deployments > Edit > Version: New version > Deploy.
 */

// Where form messages are delivered. Add or remove addresses as needed.
const TO = ['info@ideatechnologies.net', 'itsac@ideatechnologies.net'];

// Safety cap on form messages per day, so a spam flood can't use up your sending quota.
// Google counts every recipient: a free Gmail account can email 100 recipients a day
// (50 messages to 2 addresses); a Google Workspace account can email 1,500.
const DAILY_LIMIT = 50;

function doPost(e) {
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Hidden spam-trap field: real visitors never fill it in. Pretend success.
    if (d.botcheck) return reply({ ok: true });

    const name = clean(d.name, 120);
    const email = clean(d.email, 200);
    const org = clean(d.org, 200);
    const phone = clean(d.phone, 60);
    const interests = clean(d.interests, 400);
    const message = clean(d.message, 5000, true);

    if (!name) return reply({ ok: false, field: 'name', error: 'Please enter your name.' });
    if (!/\p{L}/u.test(name)) return reply({ ok: false, field: 'name', error: 'Please enter a valid name.' });
    const phoneProblem = checkPhone(phone);
    if (phoneProblem) return reply({ ok: false, field: 'phone', error: phoneProblem });
    const emailProblem = checkEmail(email);
    if (emailProblem) return reply({ ok: false, field: 'email', error: emailProblem });
    if (!underDailyLimit()) {
      return reply({ ok: false, error: 'We received too many messages today.' });
    }

    const subject = 'Website inquiry' + (interests ? ' — ' + interests.split(',')[0] : '') + ' — ' + name;
    const rows = [
      ['Name', name],
      ['Company / Agency', org || '—'],
      ['Email', email],
      ['Phone', phone || '—'],
      ['Interested in', interests || '—'],
    ];

    const text = rows.map(([k, v]) => k + ': ' + v).join('\n') + '\n\nMessage:\n' + (message || '—');
    const html =
      '<table style="border-collapse:collapse;font:14px/1.5 Arial,sans-serif">' +
      rows.map(([k, v]) =>
        '<tr><td style="padding:4px 16px 4px 0;color:#667;white-space:nowrap">' + esc(k) +
        '</td><td style="padding:4px 0"><b>' + esc(v) + '</b></td></tr>').join('') +
      '</table>' +
      '<p style="font:14px/1.6 Arial,sans-serif;white-space:pre-wrap;margin-top:16px">' + esc(message || '—') + '</p>' +
      '<p style="font:12px Arial,sans-serif;color:#889">Sent from the contact form on the Idea Technologies website. Reply to answer ' + esc(name) + ' directly.</p>';

    MailApp.sendEmail({
      to: TO.join(','),
      replyTo: email,
      name: name.replace(/[<>"]/g, '') + ' via Idea Technologies website',
      subject: subject,
      body: text,
      htmlBody: html,
    });
    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'Server error' });
  }
}

// Opening the script's URL in a browser shows this, to confirm it's running.
function doGet() {
  return reply({ ok: true, status: 'Idea Technologies contact form is running.' });
}

// Run this once from the editor (select it, click Run) to grant permission
// and send yourself a test email.
function sendTestEmail() {
  const res = doPost({
    postData: {
      contents: JSON.stringify({
        name: 'Test Visitor',
        email: TO[0],
        org: 'Setup test',
        interests: 'Other',
        message: 'If you can read this, the website contact form is set up correctly.',
      }),
    },
  });
  console.log(res.getContent());
}

// ---- Email address check (the website runs the same check first) ----

// Throwaway inboxes and placeholder domains. Keep in step with src/validate.js.
const BLOCKED_DOMAINS = [
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

// Returns '' when the email is fine, or a message for the visitor.
function checkEmail(email) {
  if (!email || email.length > 254 || !EMAIL_SYNTAX.test(email)) return INVALID_EMAIL;
  const domain = email.split('@')[1].toLowerCase();
  if (BLOCKED_DOMAINS.indexOf(domain) !== -1) return 'Please use your work or personal email, not a temporary one.';
  if (domainReceivesMail(domain) === false) return INVALID_EMAIL + ' \u201c' + domain + '\u201d doesn\u2019t receive email.';
  return '';
}

// true = domain has mail servers, false = it doesn't, null = couldn't check (let it through).
function domainReceivesMail(domain) {
  const cache = CacheService.getScriptCache();
  const hit = cache.get('mx:' + domain);
  if (hit) return hit === 'yes';
  try {
    const res = UrlFetchApp.fetch('https://dns.google/resolve?type=MX&name=' + encodeURIComponent(domain), { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return null;
    const data = JSON.parse(res.getContentText());
    let ok;
    if (data.Status === 3) ok = false; // domain doesn't exist
    else if (data.Status !== 0) return null;
    // "0 ." is a "null MX": the domain says it never accepts email.
    else ok = (data.Answer || []).some((a) => a.type === 15 && !/^\d+\s+\.?$/.test(String(a.data).trim()));
    cache.put('mx:' + domain, ok ? 'yes' : 'no', 21600); // remember for 6 hours
    return ok;
  } catch (err) {
    console.warn('MX lookup failed for ' + domain + ': ' + err);
    return null;
  }
}

// ---- Phone check (optional field; same rules as src/validate.js) ----
// US: 10 digits with a real area code. International: + and country code, 8 to 15 digits.
const INVALID_PHONE = 'Please enter a valid phone number, e.g. (512) 366-0019 or +91 98765 43210.';
const US_NUMBER = /^[2-9]\d{2}[2-9]\d{6}$/;

function checkPhone(value) {
  if (!value) return '';
  const main = value.replace(/\s*(?:ext\.?|x|#)\s*\d{1,6}$/i, '');
  if (!/^\+?[\d\s().-]+$/.test(main)) return INVALID_PHONE;
  const digits = main.replace(/\D/g, '');
  if (/^(\d)\1+$/.test(digits)) return INVALID_PHONE;
  if (main.charAt(0) === '+') {
    if (digits.charAt(0) === '1') return digits.length === 11 && US_NUMBER.test(digits.slice(1)) ? '' : INVALID_PHONE;
    return digits.length >= 8 && digits.length <= 15 ? '' : INVALID_PHONE;
  }
  const us = digits.length === 11 && digits.charAt(0) === '1' ? digits.slice(1) : digits;
  return US_NUMBER.test(us) ? '' : INVALID_PHONE;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function clean(v, max, multiline) {
  let s = String(v == null ? '' : v);
  s = multiline ? s.replace(/\r\n?/g, '\n') : s.replace(/[\r\n]+/g, ' ');
  return s.trim().slice(0, max);
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function underDailyLimit() {
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const props = PropertiesService.getScriptProperties();
    const key = 'count-' + Utilities.formatDate(new Date(), 'America/Chicago', 'yyyy-MM-dd');
    const n = Number(props.getProperty(key) || 0);
    if (n >= DAILY_LIMIT) return false;
    props.setProperty(key, String(n + 1));
    return true;
  } finally {
    lock.releaseLock();
  }
}
