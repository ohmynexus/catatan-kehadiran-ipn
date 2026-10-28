# IPN NAMATOTA — Attendance PWA

## Isi paket
- `index.html`: aplikasi kehadiran (profil nama/foto, absensi, riwayat, rekap, lembur).
- `manifest.webmanifest`: metadata install PWA.
- `service-worker.js`: cache shell agar dapat dibuka offline setelah kunjungan online sukses.
- `icons/`: ikon 192, 512, dan maskable.

## Deploy GitHub Pages
1. Buat repository GitHub, misalnya `ipn-attendance`.
2. Upload seluruh isi folder paket ini ke root repository (bukan folder pembungkus).
3. GitHub: Settings → Pages → Deploy from a branch → pilih `main` dan `/(root)` → Save.
4. Tunggu deployment selesai. Buka URL Pages yang disediakan, misalnya `https://USERNAME.github.io/ipn-attendance/`.
5. Buka URL itu secara online satu kali, tunggu sampai halaman dan service worker selesai terpasang.
6. Android/Chrome: menu ⋮ → Install app atau Add to Home screen. iPhone/Safari: Share → Add to Home Screen.

## Subpath repository
Seluruh URL aset menggunakan jalur relatif `./`; manifest start_url/scope juga relatif, sehingga paket mendukung Pages project site di `/NAMA-REPO/`. Jangan mengubah tautan aset menjadi `/service-worker.js` atau `/manifest.webmanifest` yang mengarah ke root domain.

## Data dan foto profil
Data kehadiran, preferensi dan foto profil disimpan dalam localStorage pada origin situs/peramban. Foto profil diubah menjadi JPEG yang diperkecil (maksimum sisi 640px) sebelum disimpan. Ini penyimpanan lokal satu browser/perangkat, bukan sinkronisasi akun dan tidak ikut tersimpan di GitHub.

## Backup & restore
Di Pengaturan gunakan tombol cadangan/backup untuk mengunduh JSON. Simpan file JSON di tempat aman. Untuk restore, buka aplikasi pada browser/origin yang sesuai → Pengaturan → pilih file restore. Restore mengganti data saat ini, jadi buat backup terbaru lebih dulu. Jangan membagikan file cadangan karena dapat berisi nama/foto pribadi dan riwayat kerja.

## Batasan
- Offline tersedia setelah service worker berhasil meng-cache aplikasi melalui HTTPS. Perubahan kode baru akan diperoleh saat pembaruan cache aktif.
- Browser dapat menghapus penyimpanan lokal; backup berkala disarankan. Hindari mode incognito dan jangan hapus data situs.
- Foto kamera langsung bergantung dukungan browser/pemilih file perangkat. Atribut `capture="user"` memberi petunjuk, namun beberapa HP hanya menampilkan galeri.
- Jam yang ditampilkan mengikuti jam lokal perangkat.


Pembaruan header: identitas, kredit, jam lokal, dan tanggal kerja disusun vertikal rata kiri. Cache service worker diperbarui ke v2.


Update v4: removed the optional attendance note field and its form/edit/export handling. Existing saved legacy note properties are tolerated; records and attendance calculations remain compatible. Service worker cache advanced to v3.
