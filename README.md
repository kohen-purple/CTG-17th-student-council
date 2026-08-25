# GTC — 17th Student Council site

## What's here
- `index.html` — home page: small "GTC" / "하나님께 더 가까이" header, the two buttons, and the public "Answered" board.
- `ask-the-pastor.html` — question form. Questions CAN be answered by the admin and posted to the public board.
- `send-your-prayer.html` — prayer form. Prayer requests are **private only** — the admin can view and check them off as "seen," but they are never answered or shown on the board.
- `admin.html` — staff page, split into three sections: Questions (answer & publish), Prayer requests (view + seen checkbox + delete only), and the Board editor.
- `styles.css`, `app.js` — shared styling and data logic.
- `assets/gtc-logo.png` — the logo, background removed, used as the small corner button on every page that links to `admin.html`.

Just open `index.html` in a browser — no server needed.

## What changed in this update
- Simplified the copy throughout — shorter hero, shorter card text, shorter hints.
- Recolored everything to the sky-blue from your logo.
- Small logo button in the top-right corner of every page — tap it to go to the admin login. Replaces the old text link.
- Renamed to **GTC** with the tagline **하나님께 더 가까이**, "17th Student Council" as the eyebrow.
- Prayer requests are no longer answerable — admin can only read them and check "Seen." Only questions go through Answer → Board.
- Every submission stores the exact date and time it was sent (shown next to it in the admin view).

## Still true from before — read before using it for real
This demo saves everything with the browser's `localStorage`, and the admin gate is just a password typed into the page's JavaScript (currently `purple`, set near the top of `admin.html`). That means:
- **Submissions never leave the visitor's own browser.** You'll only see them in the admin view if you're on the same device/browser that submitted them.
- **The password is not real security** — anyone can read it from "View Source."

This is fine for testing the design and flow, but it does not centralize submissions across devices, which is what a real student council tool needs.

## To make it real
A free Firebase project (Firestore for the database, Firebase Auth for a real admin login) fixes both problems — submissions land in one place from any device, and only your admin account can read them. I can wire that up whenever you're ready; you'd just create the free project and paste in a couple of config keys.
