# Inductive LLC — Site Deployment Guide
## Namecheap Shared Hosting

---

## File Structure

```
inductive_site/
├── index.html              # Home
├── about.html              # About Josh
├── content.html            # Blog index
├── contact.html            # Contact form
├── 404.html                # Custom 404
├── .htaccess               # Apache config (HTTPS, caching, 404)
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/                 # Drop any images here
└── blog/
    └── adoption-of-hydrogen.html
```

---

## Step 1 — Set Up Formspree (Contact Form)

Namecheap shared hosting doesn't run server-side code by default. Use [Formspree](https://formspree.io) (free tier handles 50 submissions/month) to process the contact form.

1. Go to [formspree.io](https://formspree.io) → create account → New Form
2. Set the notification email to `info@inductivellc.com`
3. Copy the form endpoint URL (looks like `https://formspree.io/f/xpzgkwqr`)
4. In `contact.html`, replace `YOUR_FORMSPREE_ID` in the form `action` attribute:
   ```html
   <form id="contact-form" action="https://formspree.io/f/xpzgkwqr" ...>
   ```

---

## Step 2 — Upload Files to Namecheap

### Option A: cPanel File Manager (simplest)
1. Log in to Namecheap → **Manage** → **cPanel**
2. Open **File Manager** → navigate to `public_html/`
3. Delete any default Namecheap placeholder files (`index.html`, etc.)
4. Upload all files and folders from `inductive_site/` maintaining the same directory structure
5. Make sure `.htaccess` uploads — it's a hidden file; your upload client must have "show hidden files" enabled

### Option B: FTP/SFTP (faster for bulk upload)
Namecheap cPanel provides FTP credentials under **FTP Accounts**.

```
Host:     ftp.yourdomain.com
User:     (from cPanel FTP Accounts)
Password: (set in cPanel)
Port:     21 (FTP) or 22 (SFTP if enabled)
Remote:   /public_html/
```

Use FileZilla, Transmit, or Cyberduck. Upload entire `inductive_site/` contents directly into `public_html/`.

---

## Step 3 — Point Your Domain

If the domain is registered at Namecheap and hosting is also Namecheap:
- Go to **Domain List** → **Manage** → **Nameservers**
- Select **Namecheap Web Hosting DNS** — it auto-connects to your hosting

If domain is elsewhere:
- Update nameservers to Namecheap's:
  ```
  dns1.registrar-servers.com
  dns2.registrar-servers.com
  ```
- Or use an A record pointing to your Namecheap hosting IP (find it in cPanel → **General Information**)

DNS propagation: up to 24–48 hours, usually under 2 hours.

---

## Step 4 — Enable HTTPS (SSL)

1. In cPanel → **SSL/TLS** → **AutoSSL** → run it (free, auto-renews)
2. Once active, open `.htaccess` and uncomment the HTTPS redirect block:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
3. Re-upload `.htaccess`

---

## Step 5 — Add the About Page to Nav

The original site's nav had Home / Content / Contact. The About page exists but isn't in the nav yet (it was a separate page in the original). To add it:

In `index.html`, `content.html`, `contact.html`, and `blog/adoption-of-hydrogen.html`, change:
```html
<ul class="nav-links">
  <li><a href="index.html">Home</a></li>
  <li><a href="content.html">Content</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>
```
To:
```html
<ul class="nav-links">
  <li><a href="index.html">Home</a></li>
  <li><a href="about.html">About</a></li>
  <li><a href="content.html">Content</a></li>
  <li><a href="contact.html">Contact</a></li>
</ul>
```

---

## Adding Future Blog Posts

1. Copy `blog/adoption-of-hydrogen.html` as a template
2. Save as `blog/your-new-article-slug.html`
3. Update the title, meta description, article-meta, h1, and body content
4. Add a new `.blog-card` block to `content.html` pointing to the new file

---

## Notes

- **No build step** — this is plain HTML/CSS/JS. Edit files directly and re-upload the changed file.
- **Google Fonts** loads from CDN — requires internet connection to render correctly. For a fully self-hosted version, download the fonts and serve from `/css/fonts/`.
- **Images** — drop any images into `/images/` and reference as `<img src="images/filename.jpg">`. The `Inductive_about.png` from the original site can be placed here.
