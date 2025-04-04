const express = require('express');
const fileUpload = require('express-fileupload');
const Tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();

// ✅ Allow requests ONLY from your Vercel frontend
app.use(cors({
    origin: 'https://palsave.vercel.app', // Change this to your actual Vercel URL
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

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

// ✅ Run on PORT provided by Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`OCR API running on port ${PORT}`));
