const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Dessert = require('../models/Desser');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Validate Cloudinary configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Cloudinary configuration is incomplete. Check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env');
  process.exit(1);
}

// Configure Multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(file.originalname.toLowerCase().split('.').pop());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// GET: List all desserts
router.get('/list', async (req, res) => {
  try {
    const desserts = await Dessert.find();
    res.json({ success: true, data: desserts });
  } catch (error) {
    console.error('Error fetching desserts:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET: Get dessert by ID
router.get('/:id', async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);
    if (!dessert) {
      return res.status(404).json({ message: 'Dessert not found' });
    }
    res.json(dessert);
  } catch (err) {
    console.error('Error fetching dessert:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST: Add a new dessert
router.post(
  '/add',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'addImage1', maxCount: 1 },
    { name: 'addImage2', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { name, description, category, price } = req.body;

      // Validate required fields
      if (!name || !description || !price || !req.files || !req.files.mainImage) {
        return res.status(400).json({ success: false, message: 'Missing required fields: name, description, price, and mainImage are required' });
      }

      // Function to upload image to Cloudinary
      const uploadToCloudinary = async (file, fieldName) => {
        if (!file) return null;
        try {
          console.log(`Uploading ${fieldName} to Cloudinary...`);
          const result = await cloudinary.uploader.upload(
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
            {
              folder: 'desserts',
              public_id: `${fieldName}_${Date.now()}`,
              resource_type: 'image',
            }
          );
          console.log(`Uploaded ${fieldName} to Cloudinary: ${result.secure_url}`);
          return result.secure_url;
        } catch (error) {
          console.error(`Failed to upload ${fieldName} to Cloudinary:`, error);
          throw new Error(`Cloudinary upload failed for ${fieldName}: ${error.message}`);
        }
      };

      // Upload images to Cloudinary
      const mainImageUrl = await uploadToCloudinary(req.files.mainImage[0], 'mainImage');
      if (!mainImageUrl) {
        throw new Error('Main image upload failed, no URL returned');
      }
      const addImage1Url = req.files.addImage1
        ? await uploadToCloudinary(req.files.addImage1[0], 'addImage1')
        : null;
      const addImage2Url = req.files.addImage2
        ? await uploadToCloudinary(req.files.addImage2[0], 'addImage2')
        : null;

      // Log URLs before saving
      console.log('Image URLs:', { mainImageUrl, addImage1Url, addImage2Url });

      // Create new dessert
      const dessert = new Dessert({
        name,
        description,
        category: category || 'Uncategorized',
        price: parseFloat(price),
        mainImage: mainImageUrl,
        addImage1: addImage1Url,
        addImage2: addImage2Url,
      });

      // Save dessert
      await dessert.save();
      console.log(`Dessert saved: ${name}, Main Image: ${mainImageUrl}`);
      res.json({ success: true, message: 'Dessert added successfully', data: dessert });
    } catch (error) {
      console.error('Error adding dessert:', error);
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
  }
);

module.exports = router;