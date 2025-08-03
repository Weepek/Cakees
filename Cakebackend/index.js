// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const helmet = require('helmet');
// const morgan = require('morgan');

// dotenv.config({ path: './.env' });

// const app = express();

// // Middleware
// app.use(helmet()); // Secure HTTP headers
// app.use(morgan('combined')); // Log requests
// app.use(cors());
// app.use(express.json());

// // Routes
// const dessertRoutes = require('./routes/dessert');
// app.use('/api/dessert', dessertRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Global error:', err.stack);
//   res.status(500).json({ success: false, message: 'Something went wrong!' });
// });

// // Validate environment variables
// console.log('MONGO_URI:', process.env.MONGO_URI);
// console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
// if (!process.env.MONGO_URI) {
//   console.error('MONGO_URI is not defined in .env file');
//   process.exit(1);
// }

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     connectTimeoutMS: 10000,
//   })
//   .then(() => console.log('Successfully connected to MongoDB'))
//   .catch((err) => {
//     console.error('Failed to connect to MongoDB:', err.message);
//     console.error('Error Details:', err);
//     process.exit(1);
//   });

// // Start server
// const PORT = process.env.PORT || 5000;
// mongoose.connection.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });

// // Handle uncaught exceptions and rejections
// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err);
//   process.exit(1);
// });

// process.on('unhandledRejection', (err) => {
//   console.error('Unhandled Rejection:', err);
//   process.exit(1);
// });

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const cors = require('cors');
// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'));

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer for temporary file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = 'uploads/';
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB Connected'))
// .catch(err => console.error('MongoDB Connection Error:', err));

// // Dessert Schema
// const dessertSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Please add a name'],
//     trim: true,
//     maxlength: [50, 'Name cannot be more than 50 characters'],
//   },
//   description: {
//     type: String,
//     required: [true, 'Please add a description'],
//     maxlength: [500, 'Description cannot be more than 500 characters'],
//   },
//   price: {
//     type: Number,
//     required: [true, 'Please add a price'],
//     min: [0, 'Price must be at least 0'],
//   },
//   category: {
//     type: String,
//     required: [true, 'Please select a category'],
//     enum: ['Cake', 'Cheesecake', 'Cupcake', 'Croissant'],
//   },
//   mainImage: {
//     type: String,
//     required: [true, 'Please upload a main image'],
//   },
//   addImage1: String,
//   addImage2: String,
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Dessert Model - Make sure the collection name is correct
// const Dessert = mongoose.model('Dessert', dessertSchema, 'desserts');

// // Helper function to upload to Cloudinary and clean up temp files
// const uploadToCloudinary = async (file) => {
//   try {
//     const result = await cloudinary.uploader.upload(file.path, {
//       folder: 'cake-shop',
//       width: 500,
//       height: 500,
//       crop: 'limit'
//     });
//     // Delete the temporary file
//     fs.unlinkSync(file.path);
//     return result.secure_url;
//   } catch (err) {
//     // Clean up the temporary file if upload fails
//     if (fs.existsSync(file.path)) {
//       fs.unlinkSync(file.path);
//     }
//     console.error('Cloudinary upload error:', err);
//     throw new Error('Failed to upload image');
//   }
// };

// // API Routes

// // Get all desserts
// app.get('/api/dessert/list', async (req, res) => {
//   try {
//     const desserts = await Dessert.find();
//     res.json({
//       success: true,
//       count: desserts.length,
//       data: desserts,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       error: 'Server Error',
//     });
//   }
// });

// // Get single dessert
// app.get('/api/dessert/:id', async (req, res) => {
//   try {
//     const dessert = await Dessert.findById(req.params.id);

//     if (!dessert) {
//       return res.status(404).json({
//         success: false,
//         error: 'Dessert not found',
//       });
//     }

//     res.json({
//       success: true,
//       data: dessert,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       error: 'Server Error',
//     });
//   }
// });

// // Add new dessert
// app.post('/api/dessert/add', upload.fields([
//   { name: 'mainImage', maxCount: 1 },
//   { name: 'addImage1', maxCount: 1 },
//   { name: 'addImage2', maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     // Validate required fields
//     if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
//       return res.status(400).json({
//         success: false,
//         error: 'Please provide all required fields: name, description, price, category',
//       });
//     }

//     // Check if main image was uploaded
//     if (!req.files || !req.files['mainImage']) {
//       return res.status(400).json({
//         success: false,
//         error: 'Please upload a main image',
//       });
//     }

//     // Upload images to Cloudinary
//     const mainImageUrl = await uploadToCloudinary(req.files['mainImage'][0]);
//     const addImage1Url = req.files['addImage1'] ? await uploadToCloudinary(req.files['addImage1'][0]) : null;
//     const addImage2Url = req.files['addImage2'] ? await uploadToCloudinary(req.files['addImage2'][0]) : null;

//     // Create dessert
//     const dessert = await Dessert.create({
//       name: req.body.name,
//       description: req.body.description,
//       price: parseFloat(req.body.price),
//       category: req.body.category,
//       mainImage: mainImageUrl,
//       addImage1: addImage1Url,
//       addImage2: addImage2Url,
//     });

//     res.status(201).json({
//       success: true,
//       data: dessert,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       error: err.message || 'Server Error',
//     });
//   }
// });



// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     error: 'Server Error',
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });




require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for temporary file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = 'uploads/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Dessert Schema
const dessertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Cake', 'Cheesecake', 'Cupcake', 'Croissant'],
  },
  mainImage: {
    type: String,
    required: [true, 'Please upload a main image'],
  },
  addImage1: String,
  addImage2: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Dessert Model - Make sure the collection name is correct
const Dessert = mongoose.model('Dessert', dessertSchema, 'desserts');

// Helper function to upload to Cloudinary and clean up temp files
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'cake-shop',
      width: 500,
      height: 500,
      crop: 'limit'
    });
    // Delete the temporary file
    fs.unlinkSync(file.path);
    return result.secure_url;
  } catch (err) {
    // Clean up the temporary file if upload fails
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    console.error('Cloudinary upload error:', err);
    throw new Error('Failed to upload image');
  }
};

// API Routes

// Get all desserts
app.get('/api/dessert/list', async (req, res) => {
  try {
    const desserts = await Dessert.find();
    res.json({
      success: true,
      count: desserts.length,
      data: desserts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Get single dessert
app.get('/api/dessert/:id', async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);

    if (!dessert) {
      return res.status(404).json({
        success: false,
        error: 'Dessert not found',
      });
    }

    res.json({
      success: true,
      data: dessert,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
});

// Add new dessert
app.post('/api/dessert/add', upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'addImage1', maxCount: 1 },
  { name: 'addImage2', maxCount: 1 },
]), async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: name, description, price, category',
      });
    }

    // Check if main image was uploaded
    if (!req.files || !req.files['mainImage']) {
      return res.status(400).json({
        success: false,
        error: 'Please upload a main image',
      });
    }

    // Upload images to Cloudinary
    const mainImageUrl = await uploadToCloudinary(req.files['mainImage'][0]);
    const addImage1Url = req.files['addImage1'] ? await uploadToCloudinary(req.files['addImage1'][0]) : null;
    const addImage2Url = req.files['addImage2'] ? await uploadToCloudinary(req.files['addImage2'][0]) : null;

    // Create dessert
    const dessert = await Dessert.create({
      name: req.body.name,
      description: req.body.description,
      price: parseFloat(req.body.price),
      category: req.body.category,
      mainImage: mainImageUrl,
      addImage1: addImage1Url,
      addImage2: addImage2Url,
    });

    res.status(201).json({
      success: true,
      data: dessert,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
});

 
// Delete dessert
app.delete('/api/dessert/:id', async (req, res) => {
  try {
    const dessert = await Dessert.findById(req.params.id);

    if (!dessert) {
      return res.status(404).json({
        success: false,
        error: 'Dessert not found',
      });
    }

    // Delete images from Cloudinary first
    try {
      const mainImageId = getPublicId(dessert.mainImage);
      if (mainImageId) {
        await cloudinary.uploader.destroy(mainImageId);
      }
      
      if (dessert.addImage1) {
        const addImage1Id = getPublicId(dessert.addImage1);
        if (addImage1Id) await cloudinary.uploader.destroy(addImage1Id);
      }
      
      if (dessert.addImage2) {
        const addImage2Id = getPublicId(dessert.addImage2);
        if (addImage2Id) await cloudinary.uploader.destroy(addImage2Id);
      }
    } catch (cloudinaryErr) {
      console.error('Error deleting images from Cloudinary:', cloudinaryErr);
      // Continue with deletion even if image deletion fails
    }

    // Delete the document from MongoDB
    await Dessert.deleteOne({ _id: req.params.id });

    res.json({
      success: true,
      data: {},
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  }
});

// Improved getPublicId function
function getPublicId(url) {
  if (!url) return null;
  
  // Handle both http and https
  const urlParts = url.split('/');
  const uploadIndex = urlParts.indexOf('upload');
  
  if (uploadIndex === -1 || uploadIndex === urlParts.length - 1) {
    return null;
  }
  
  // Get the part after 'upload' which includes version and public_id
  const afterUpload = urlParts.slice(uploadIndex + 1).join('/');
  
  // Remove file extension
  const publicIdWithExtension = afterUpload.split('/').pop();
  const publicId = publicIdWithExtension.split('.')[0];
  
  return publicId;
}

// Helper function to extract public ID from Cloudinary URL
function getPublicId(url) {
  const matches = url.match(/\/upload\/v\d+\/(.+?)\./);
  return matches ? matches[1] : null;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Server Error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});