# Contact form emails

How the **Send message** form on the Contact page delivers emails, how it was set up, and what to change when something needs to change.

---

## In short

When a visitor sends the form, the message is emailed to **info@ideatechnologies.net** and **itsac@ideatechnologies.net**. Pressing **Reply** on that email answers the visitor directly.

No outside form service is involved. The sending is done by a small **Google Apps Script**, a piece of code that runs inside your own Google account and sends mail as that account.

```
Visitor fills in the form on the website
        │
        ▼
1. The website checks the name, email and phone
   (shows "Please enter a valid email address" etc. under the box)
        │  only if everything is valid
        ▼
2. The website sends the form to the Google Apps Script web address
        │
        ▼
3. The script checks everything again (so bots can't skip step 1),
   then emails the message to info@ and itsac@
        │
        ▼
4. The visitor sees "Thanks, <name>. Your message was sent."
```

If sending fails (no internet, Google down), the visitor sees a message with your email address and phone number instead, so the inquiry isn't lost.

---

## The pieces and where they live

| Piece | Where it lives | What it does |
|---|---|---|
| **The Google Apps Script (live copy)** | https://script.google.com → project **Website contact form**, in the Google account that set it up | Receives the form and sends the email. **This is the copy that actually runs.** |
| **The script's web address** | `src/data.js` → `formEndpoint` | Tells the website where to send the form. Ends in `/exec`. |
| **A saved copy of the script** | `google-apps-script/Code.gs` in this project | A backup and a record of changes. Editing this file alone changes nothing (see below). |
| **Who receives the emails** | In the script: `TO` (line 11) | `['info@ideatechnologies.net', 'itsac@ideatechnologies.net']` |
| **Daily limit** | In the script: `DAILY_LIMIT` (line 16) | At most 50 form messages a day, so spam can't use up Google's sending quota. |
| **Form checks in the browser** | `src/validate.js` | Checks the name, email and phone as soon as the visitor leaves each box. |
| **Form checks in the script** | In the script: `checkEmail`, `checkPhone` | The same checks again, on Google's side. |
| **The form itself** | `src/pages.js` → `contact` page | The boxes, labels, and the thank-you and error messages. |
| **Sending code** | `src/main.js` → `initContactForm` | Runs the checks and sends the form to the script. |

> **Important:** the script runs at script.google.com, not from this project. To change how emails are sent, edit it **at script.google.com** and **publish a new version** (steps below). Then copy the same change into `google-apps-script/Code.gs`, so the saved copy stays in step.

---

## What you receive

- **From:** your Google account, shown as *"Jane Smith via Idea Technologies website"*
- **To:** info@ and itsac@ideatechnologies.net
- **Reply-to:** the visitor's email address, so pressing Reply answers them
- **Subject:** `Website inquiry — Staff Augmentation — Jane Smith` (the first interest they ticked, then their name)
- **Body:** name, company/agency, email, phone, interests, then their message

---

## What gets checked

These checks run twice: in the visitor's browser (instant messages) and in the script (so they can't be skipped).

| Field | Rule | Message the visitor sees |
|---|---|---|
| Name | Required, must contain letters | "Please enter your name." / "Please enter a valid name." |
| Email | Required, written correctly (`name@domain.com`) | "Please enter a valid email address." |
| Email | Not a throwaway inbox (mailinator.com, yopmail.com, example.com …) | "Please use your work or personal email, not a temporary one." |
| Email | The domain must actually receive email, so typos like `gmial.com` or `gmail.con` are caught | "Please enter a valid email address. "gmial.com" doesn't receive email." |
| Phone | Optional. If entered: a real US number (`(512) 366-0019`) or international with + and country code (`+91 98765 43210`). An extension like `x12` is allowed. | "Please enter a valid phone number, e.g. …" |

Also:
- **Spam trap:** a hidden box that people never see but simple bots fill in. Those submissions are silently dropped.
- **Daily limit:** after 50 messages in a day (Texas time), further messages are refused until the next day.

**Limit:** the check can't tell whether a specific mailbox exists at a real provider. A made-up name at gmail.com (for example `zzz123@gmail.com`) still gets through, because Gmail doesn't reveal which mailboxes exist.

---

## How to make common changes

### Publish a new version of the script (needed after any script change)

1. Open https://script.google.com and the **Website contact form** project.
2. Make your change in the code and press **⌘S** (Save).
3. Click **Deploy → Manage deployments**.
4. Click the **pencil ✏️** icon.
5. Under **Version**, choose **New version**, then click **Deploy**.

The web address stays the same, so the website needs no change. Saving alone is not enough: until you publish a new version, the old code keeps running.

### Change who receives the emails

1. At script.google.com, edit line 11:
   ```js
   const TO = ['info@ideatechnologies.net', 'itsac@ideatechnologies.net'];
   ```
   Add, remove or replace addresses. Keep the quotes and commas.
2. Publish a new version (steps above).
3. Make the same edit in `google-apps-script/Code.gs`, then commit and push.

### Change the daily limit

Edit `DAILY_LIMIT` (line 16) the same way. Google counts every recipient, so with 2 addresses, 50 messages = 100 emails:
- free Gmail account: 100 emails a day, so keep it at 50 or below
- Google Workspace account: 1,500 emails a day, so up to 750 is safe

### Block another throwaway email domain

Add the domain (for example `'spammy.com',`) to the `BLOCKED_DOMAINS` list in **both** places:
1. `src/validate.js`, then commit and push (website check)
2. The script at script.google.com, then publish a new version, and copy it into `google-apps-script/Code.gs` (script check)

### Change the error messages or phone rules

Same as above: change both `src/validate.js` and the script, so the website and the script agree.

### Change the thank-you message or form labels

`src/pages.js` → the `contact` page (look for `form-success` and the `<label>`s). Commit and push.

### Change the contact form's checkbox options ("I am interested in")

`src/data.js` → `interests`. Commit and push.

### Turn the form off (go back to "opens the visitor's email app")

In `src/data.js`, set `formEndpoint: ''` (empty quotes). Commit and push.

### Move the script to a different Google account

The emails come from the account that owns the script. To change that, do the full setup below while signed in to the new account, then paste the new web address into `formEndpoint` in `src/data.js`.

---

## First-time setup (already done, kept for reference)

This is how it was set up. You only need it again to recreate the script, for example in another Google account.

1. Sign in to Google with the account that should send the emails and open https://script.google.com. Click **New project** and name it **Website contact form**.
2. Delete the sample code, paste in everything from `google-apps-script/Code.gs`, and press **⌘S**.
3. In the function menu at the top, pick **sendTestEmail** and click **▶ Run**.
   - Google asks for permission: **Review permissions** → pick the account → **Advanced** → **Go to Website contact form** → **Allow**.
   - It needs permission to **send email as you** and to **connect to an external service** (used to check whether an email's domain receives mail).
   - A test email arrives at every address in `TO`.
4. Click **Deploy → New deployment**, click the gear ⚙ next to "Select type", and choose **Web app**:
   - **Execute as:** Me
   - **Who has access:** Anyone. The website's visitors aren't signed in to Google, so it has to be "Anyone".
5. Click **Deploy** and copy the **Web app URL** (ends in `/exec`).
6. Paste it into `formEndpoint` in `src/data.js`, then commit and push.

If **Anyone** isn't offered in step 4, a Google Workspace admin has blocked it. In the Admin console, go to **Apps → Google Workspace → Drive and Docs → Sharing settings** and allow sharing outside the organization.

---

## Checking it works

- **Is the script running?** Open the web address (the `formEndpoint` URL) in a browser. You should see:
  `{"ok":true,"status":"Idea Technologies contact form is running."}`
- **Does email arrive?** At script.google.com, run **sendTestEmail** (pick it in the function menu, click ▶ Run). A test email goes to every address in `TO`.
- **End to end:** fill in the form on the live Contact page with your own details.

---

## Troubleshooting

| What you see | Likely cause and fix |
|---|---|
| Visitors get "Sorry, your message couldn't be sent" | The script isn't reachable. Open the web address in a browser (see "Checking it works"). If it shows a Google sign-in or error page, check that the deployment's **Who has access** is still **Anyone**. |
| No emails arrive, but visitors see "Thanks" | Check the **Spam** folder. Then at script.google.com open **Executions** (left sidebar) to see errors. Run **sendTestEmail** to test sending. |
| "We received too many messages today." | The daily limit was reached. It resets the next day. Raise `DAILY_LIMIT` if it's genuine traffic. |
| You edited the script but nothing changed | You saved but didn't publish. Do **Deploy → Manage deployments → ✏️ → New version → Deploy**. |
| Google asks for permission again | The script's needs changed. Run **sendTestEmail** once and click **Allow**. |
| You created a **New deployment** instead of a new version | That gives a new web address. Either paste the new address into `formEndpoint` in `src/data.js`, or archive it and update the original deployment instead. |
