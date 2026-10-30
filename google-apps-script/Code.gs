/**
 * Idea Technologies website: contact form handler (Google Apps Script).
 *
 * The website sends each form submission here, and this script emails it
 * from your Google Workspace account. Setup steps are in the README
 * ("Contact form"). After changing this file, redeploy:
 * Deploy > Manage deployments > Edit > Version: New version > Deploy.
 */

// Where form messages are delivered.
const TO = 'info@ideatechnologies.net';

// Safety cap, so a spam flood can't use up your daily Gmail sending quota.
const DAILY_LIMIT = 100;

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

    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return reply({ ok: false, error: 'Please enter your name and a valid email address.' });
    }
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
      to: TO,
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
        email: TO,
        org: 'Setup test',
        interests: 'Other',
        message: 'If you can read this, the website contact form is set up correctly.',
      }),
    },
  });
  console.log(res.getContent());
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
