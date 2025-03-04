const route = require('express').Router()
const newsModel = require('../models/NewsSchema')
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
//         const newFilename = `slider/${uniqueSuffix}${extension}`;
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

route.get("/", async (req, res) => {
    try {
        const data = await newsModel.findOne({});

        if (!data) {
            return res.status(404).send({ success: false, message: "Community not found" });
        }

        res.status(200).send({ success: true, data: data })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Server error" })
    }
})

route.get('/:id', async(req, res) => {
    try {
        const data = await newsModel.findOne({ _id: req.params.id });
        if (!data) {
            return res.status(404).send({ success: false, message: "Community not found" });
        }
        res.status(200).send({ success: true, data: data })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Server error" })
    }
})

route.post('/', upload.single('banner'), async (req, res) => {
    try {
        const banner = req.file ? {
            s3Url: req.file.location,
            s3Key: req.file.key
        } : {};

        const newCommunity = new newsModel({ ...req.body, banner })
        await newCommunity.save()
        res.status(200).send({ success: true, result: newCommunity })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Server error", error })
    }
})

route.put('/:id', upload.single('banner'), async (req, res) => {
    try {
        const community = await newsModel.findById(req.params.id)
        if (!community) {
            return res.status(404).send({ success: false, message: "Community not found" });
        }
        if (req.file) {
            await deleteFromS3(community.banner.s3Key)
            const banner = req.file ? {
                s3Url: req.file.location,
                s3Key: req.file.key
            } : {};

            const updatedCommunity = await newsModel.findByIdAndUpdate(req.params.id, { ...req.body, banner }, { new: true })
            res.status(200).send({ success: true, result: updatedCommunity })
        } else {
            const updatedCommunity = await newsModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).send({ success: true, result: updatedCommunity })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Server error", error })
    }
})

route.delete('/:id', async(req, res) => {
    try {
        const community = await newsModel.findById(req.params.id)
        await deleteFromS3(community.banner.s3Key)
        const deletedCommunity = await newsModel.findByIdAndDelete(req.params.id)
        res.status(200).send({ success: true, result: deletedCommunity })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Server error", error })
    }
})


module.exports = route;