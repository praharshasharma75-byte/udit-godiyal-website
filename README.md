# Udit Godiyal website — GitHub Pages package

Ready-to-upload static website. No build, installation, paid server or secret keys required.

## First publish to GitHub
1. Create a public repository named udit-godiyal-website. Add a README to initialise it.
2. Extract this ZIP on your computer.
3. Open the extracted udit-godiyal-website folder. Upload its CONTENTS to the repository root using Add file > Upload files. Include the assets folder and all its contents. Do not upload the ZIP itself or place the website inside an extra enclosing folder.
4. Commit the files to main.
5. Repository Settings > Pages > Source: Deploy from a branch > main > /(root) > Save.
6. Wait for deployment to finish. Your test address is https://YOUR-USERNAME.github.io/udit-godiyal-website/.
7. Check both pages, the background video, images and music links. Spotify playback is provided by Spotify and can depend on browser/privacy settings and Spotify availability.

## Connect the existing domain only after testing
Keep the existing Wix domain connection until the GitHub version works.
1. In repository Settings > Pages, set Custom domain to www.uditgodiyal.com and Save. GitHub adds a CNAME file; retain it in future uploads.
2. In Namecheap, open Domain List > Manage for uditgodiyal.com. Check Nameservers first. If Namecheap BasicDNS is in use, edit Advanced DNS > Host Records. If Wix or other custom nameservers are in use, DNS changes belong with that provider; do not change nameservers without preserving all existing records.
3. Replace only conflicting web records for @ and www, using the records below. Preserve email MX, SPF, DKIM, DMARC and other unrelated records.

Type | Host | Value
--- | --- | ---
A | @ | 185.199.108.153
A | @ | 185.199.109.153
A | @ | 185.199.110.153
A | @ | 185.199.111.153
CNAME | www | YOUR-USERNAME.github.io

Use your actual GitHub username, without https:// or a repository path. TTL: Automatic.
4. Allow DNS to update (up to 24 hours). In GitHub Pages enable Enforce HTTPS when available.
5. Check both https://www.uditgodiyal.com and https://uditgodiyal.com.

## Editing later
Edit HTML for text/links, style.css for design and app.js for video controls. Replace or add images in assets. Commit updates to main to republish. Keep relative links so the site works both at the test URL and on the custom domain.

## Media
The homepage video, photos, artwork and thumbnails are included. Spotify players and YouTube destinations remain hosted by those services. The Less Than Human film uses its existing Wix-hosted video URL; download and rehost that film or replace the link before removing Wix-hosted media. No contact form backend is present; contact links open email.

## Reference
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
