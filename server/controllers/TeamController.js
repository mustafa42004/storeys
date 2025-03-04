const route = require('express').Router()
const teamModel = require('../models/TeamSchema')
require('dotenv').config();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const multerS3 = require('multer-s3');
const multer = require('multer');
const fs = require('fs')
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

// // AWS SDK Configurationconst 
// Ensure the uploads directory exists
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

//         await s3Client.send(new DeleteObjectCommand(deleteParams));
//         fs.unlinkSync(`./uploads/${imageKey}`);
//     } catch (error) {
//         console.error(error);
//     }
// };

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

const upload = multer({ storage });

route.get('/', async(req, res) => {
    const team = await teamModel.find()
    res.status(200).send({ success: true, result: team })
})

route.get('/:id', async(req, res) => {
    const team = await teamModel.findById(req.params.id)
    if (!team) {
        return res.status(404).send({ success: false, message: "Member not found" })
    }
    res.status(200).send({ success: true, result: team })
})

route.post('/', upload.any(), async(req, res) => {
    try {
        const members = req.body.team;
        const files = req.files;

        const teamData = members.map((member, index) => {
            const profile = {
                s3Url: files[index]?.path,
                s3Key: files[index]?.originalname
            };
            return { ...member, profile };
        });

        const newTeam = await teamModel.insertMany(teamData);
        res.status(200).send({ success: true, result: newTeam });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error creating team", error });
    }
});

route.put('/:id', upload.single('profile'), async (req, res) => {
    try {
        const file = req.file;
        const { firstName, lastName, designation, updatedDate } = req.body;
        const { id } = req.params;

        // Find the existing member
        const existingMember = await teamModel.findOne({ _id: id});

        let profile = existingMember.profile;

        if (file) {
            // If a new profile image is provided
            profile = {
                s3Url: file.path,
                s3Key: file.originalname
            };

            // Delete the old profile image if it exists
            if (existingMember.profile.s3Url) {
                await deleteFromS3(existingMember.profile.s3Key);
            }
        }

        // Update the member's data
        const updatedMember = await teamModel.findByIdAndUpdate(
            req.params.id,
            {
                firstName,
                lastName,
                designation,
                updatedDate,
                profile
            },
            { new: true }
        );

        res.status(200).send({ success: true, result: updatedMember });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: "Error updating team", error });
    }
});

route.delete('/:id', async(req, res) => {
    try {
        const team = await teamModel.findById(req.params.id)
        if (!team) {
            return res.status(404).send({ success: false, message: "Member not found" })
        }
        fs.unlinkSync(team.profile.s3Url)
        // await deleteFromS3(team.profile.s3Key)
        const deletedTeam = await teamModel.findByIdAndDelete(req.params.id)
        res.status(200).send({ success: true, result: deletedTeam })
    } catch (error) {
        console.log(error)
        res.status(500).send({ success: false, message: "Error deleting team", error })
    }
})


module.exports = route;