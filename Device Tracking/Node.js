const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

// File untuk menyimpan data lokasi
const LOCATIONS_FILE = path.join(__dirname, 'locations.json');

// Inisialisasi file lokasi jika belum ada
if (!fs.existsSync(LOCATIONS_FILE)) {
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify([]));
}

app.post('/track', (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        return res.status(400).send('Data yang diperlukan tidak lengkap.');
    }

    // Baca data lokasi yang sudah ada
    const locations = JSON.parse(fs.readFileSync(LOCATIONS_FILE, 'utf-8'));

    // Tambahkan data lokasi baru
    locations.push({
        latitude,
        longitude,
        timestamp: new Date().toISOString(),
    });

    // Simpan data lokasi yang telah diperbarui
    fs.writeFileSync(LOCATIONS_FILE, JSON.stringify(locations, null, 2));

    console.log('Lokasi disimpan:', { latitude, longitude });
    res.status(200).send('Lokasi berhasil disimpan.');
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});