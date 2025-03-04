const route = require('express').Router()
const propertyModel = require('../models/PropertySchema')
require('dotenv').config();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multerS3 = require('multer-s3');
const multer = require('multer');
const fs = require('fs')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// // AWS SDK Configuration
// const s3Client = new S3Client({
//     region: 'us-east-2',
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
// });

// const deleteFromS3 = async (imageKey) => {
//     try {
//         if (!imageKey) {
//             console.error("Image key is missing");
//             return;
//         }

//         const deleteParams = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: imageKey,
//         };

//         // console.log(`Attempting to delete image: ${imageKey}`);
//         const command = new DeleteObjectCommand(deleteParams);
//         const result = await s3Client.send(command);

//         console.log(`Image ${imageKey} successfully deleted from S3`, result);
//     } catch (error) {
//         console.error(`Error deleting image ${imageKey} from S3:`, error);
//         throw new Error(`Failed to delete image ${imageKey} from S3`);
//     }
// };

// // Multer S3 storage configuration
// const storage = multerS3({
//     s3: s3Client,
//     bucket: process.env.AWS_BUCKET_NAME,
//     // acl: 'public-read',
//     metadata: (req, file, cb) => {
//         cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//         const extension = path.extname(file.originalname);
//         const newFilename = `process/${uniqueSuffix}${extension}`;
//         cb(null, newFilename); // S3 key (path within the bucket)
//     },
// });

// // Multer instance with limits and file type filter
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10 * 1024 * 1024 * 1024 }, 
//     fileFilter: (req, file, cb) => {
//         cb(null, true);
//     },
// });

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const newFilename = `process-${uniqueSuffix}${extension}`;
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

route.get("/", async (req, res) => {
    try {
        const data = await propertyModel.find({});

        if (!data) {
            return res.status(404).send({ success: false, message: "Property not found" });
        }

        res.status(200).send({ success: true, result: data });
    } catch (error) {
        console.error("Error fetching property data:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

route.get('/:id', async(req, res) => {
    try {
        const data = await propertyModel.findOne({ _id: req.params.id });

        if (!data) {
            return res.status(404).send({ success: false, message: "Property not found" });
        }

        res.status(200).send({ success: true, data });
    } catch (error) {
        console.error("Error fetching property data:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
})

route.post('/', upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'image', maxCount: 100 }]), async (req, res) => {
    try {
        const banner = req.files['banner'] ? {
            s3Url: req.files['banner'][0].path,
            s3Key: req.files['banner'][0].originalname
        } : {};

        const images = req.files['image'] ? req.files['image'].map(file => ({
            s3Url: file.path,
            s3Key: file.originalname
        })) : [];


        /// Parse JSON stringified fields
        const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
        const propertyInfo = req.body.propertyInfo ? JSON.parse(req.body.propertyInfo) : {};
        const buildingInfo = req.body.buildingInfo ? JSON.parse(req.body.buildingInfo) : {};
        const description = req.body.description ? JSON.parse(req.body.description) : [];
        
        // Ensure other fields are correctly handled
        const propertyData = {
            ...req.body,
            banner,
            image: images,
            amenities,
            propertyInfo,
            buildingInfo,
            description
        };

        const data = await propertyModel.create(propertyData);
        res.status(200).send({ success: true, result:data });
    } catch (error) {
        console.error("Error creating property data:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});

route.put('/:id', upload.fields([{ name: 'banner', maxCount: 1 }, { name: 'image' }]), async(req, res) => {
    try {
        // Parse JSON stringified fields
        const amenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
        const propertyInfo = req.body.propertyInfo ? JSON.parse(req.body.propertyInfo) : {};
        const buildingInfo = req.body.buildingInfo ? JSON.parse(req.body.buildingInfo) : {};
        const description = req.body.description ? JSON.parse(req.body.description) : [];
        let newBanner = null;

        // Prepare new banner and images
        if(req.files['banner']) {
            await deleteFromS3(req.body.banner.s3Key)
            newBanner = req.files['banner'] ? {
                s3Url: req.files['banner'][0].path,
                s3Key: req.files['banner'][0].originalname
            } : null;
        }

        const newImages = req.files['image'] ? req.files['image'].map(file => ({
            s3Url: file.path,
            s3Key: file.originalname
        })) : [];

        const removedImages = req.body.removedImages ? JSON.parse(req.body.removedImages) : [];

        // Retrieve existing images from the database
        const existingProperty = await propertyModel.findById(req.params.id);
        const existingImages = existingProperty.image || [];

        // Filter out removed images from existing images
        const filteredImages = existingImages.filter(img => !removedImages.includes(img.s3Key));


        // Directly modify the property object
        const propertyData = {
            ...req.body,
            banner: newBanner || req.body.banner,
            image: [...filteredImages, ...newImages],
            amenities,
            propertyInfo,
            buildingInfo,
            description
        };

        // Remove images from the filesystem
        for (const image of removedImages) {
            fs.unlinkSync(image);
        }

        // Update the database
        const updatedProperty = await propertyModel.findByIdAndUpdate(req.params.id, propertyData, { new: true });
        res.status(200).send({ success: true, result: updatedProperty });
    } catch (error) {
        console.error("Error updating property data:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
});;

route.delete('/:id', async(req, res) => {
    try {
        const property = await propertyModel.findOne({ _id: req.params.id });
        if (!property) {
            return res.status(404).send({ success: false, message: "Property not found" });
        }

        // Delete banner from S3
        if (property.banner.s3Key) {
            // await deleteFromS3(property.banner.s3Key);
            fs.unlinkSync(property.banner.s3Url);
        }

        // Delete images from S3
        property.image.forEach(img => {
            if (img.s3Key) {
                // deleteFromS3(img.s3Key);
                fs.unlinkSync(img.s3Url);
            }
        });

        // await property?.remove();
        await propertyModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ success: true, message: "Property deleted successfully" });
    } catch (error) {
        console.error("Error deleting property:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
})


module.exports = route;