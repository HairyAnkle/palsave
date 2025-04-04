const express = require('express');
const fileUpload = require('express-fileupload');
const Tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(fileUpload());

app.post('/upload-id', async (req, res) => {
    if (!req.files || !req.files.idImage) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { data } = req.files.idImage;
    const result = await Tesseract.recognize(data, 'eng');

    const extractedText = result.data.text;
    const verified = extractedText.includes("PALUWAGAN");  // Simulated check

    res.json({ verified, extractedText });
});

app.listen(3000, () => console.log('OCR API running on port 3000'));
