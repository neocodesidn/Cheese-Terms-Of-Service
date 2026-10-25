# Cheese Bot — Legal Center (Vercel)

Website **HTML/CSS/JS statis**, tanpa dependency npm, database, backend, tracking, atau layanan font eksternal. Desain monokrom mengadaptasi gaya ikon outline Cheese Bot, dan ikon SVG disalin dari paket Cheese Bot Panel Updater V2.

## Isi

- `index.html` — halaman depan Legal Center
- `terms.html` — Terms of Service (tersedia sebagai `/terms` di Vercel)
- `privacy.html` — Privacy Policy (tersedia sebagai `/privacy` di Vercel)
- `404.html` — halaman tidak ditemukan
- `styles.css`, `app.js` — gaya, responsivitas, navigasi, daftar isi, progress baca, copy URL, cetak
- `site-config.js` — kontak dan identitas operator
- `vercel.json` — Clean URLs dan security response headers
- `assets/` — ikon outline dari bot dan favicon

## WAJIB: Isi kontak resmi sebelum deploy publik

Edit `site-config.js`:

```js
window.CHEESE_SITE = Object.freeze({
  operatorName: 'Nama pengelola atau brand kamu',
  contactEmail: 'support@domainmu.com',
  supportUrl: 'https://discord.gg/kode-server',
  botInviteUrl: '',
  updatedAt: '25 Oktober 2026'
});
```

Minimal isi **contactEmail** atau **supportUrl**. Situs menampilkan pesan pengingat apabila keduanya kosong. Tautan Discord yang tidak kamu punya jangan diisi dengan URL palsu.

## Deploy termudah di Vercel Drop

1. Buka <https://vercel.com/drop> dan login.
2. Seret **file ZIP ini** ke halaman tersebut (atau ekstrak dan seret folder yang berisi `index.html`).
3. Tentukan nama project, pilih **Deploy**.
4. Kunjungi URL yang diberikan Vercel. Rute `/terms` dan `/privacy` diaktifkan oleh `vercel.json` dengan `cleanUrls`.
5. Setelah tersedia secara publik, tempel alamat tersebut ke **Discord Developer Portal → Applications → [bot kamu] → General Information** pada kolom Terms of Service URL dan Privacy Policy URL.

### Alternatif melalui GitHub

Upload isi folder ke sebuah repository, kemudian Vercel Dashboard → Add New → Project → Import Git Repository. Pilih framework preset **Other**, root directory repo root, tanpa build command, lalu deploy.

## Preview lokal

Dari folder ini jalankan `python -m http.server 8000` dan buka `http://localhost:8000/index.html`, `http://localhost:8000/terms.html`, `http://localhost:8000/privacy.html`. *Catatan:* clean URLs `/terms` dan `/privacy` hanya dikelola Vercel, bukan server bawaan Python.

## Catatan legal dan privasi

Teks kebijakan disusun sebagai draft yang relevan terhadap fitur bot pada arsip `Cheese-main-Panel-Updater-v2.zip` per 25 Oktober 2026. Ia bukan nasihat hukum. Verifikasi data yang benar-benar dikumpulkan dan disimpan pada server produksi serta kebijakan refund penjual sebelum situs diterbitkan. Apabila nama pemilik, kontak, retensi data, atau praktik pengolahan berubah, perbarui kebijakan.

## URL

- `/` — halaman depan
- `/terms` — Terms of Service
- `/privacy` — Privacy Policy

Tidak ada kunci API atau kredensial yang dibutuhkan.
