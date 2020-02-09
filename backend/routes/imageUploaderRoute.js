const express = require('express');
const tokenValidator = require('../Validation/tokenValidator');
const AWS = require('aws-sdk');
const imageThumbnail = require('image-thumbnail');

const router = express.Router();

router.post('/', tokenValidator, (req, res) => {

    const image = req.files.image;

    if(!(image.mimetype === 'image/jpeg' || image.mimetype === 'image/gif' || image.mimetype === 'image/png'))
        return res.json({ imgMsg: 'Not supported format' });

    const s3Storage = new AWS.S3({

        accessKeyId: process.env.awsID,
        secretAccessKey: process.env.awsSecretID
    });

    const params = {

        Bucket: process.env.awsBucketName,
        Key: image.name,
        Body: image.data
    };

    s3Storage.upload(params, (err, data) => {

        if(err)
            throw err;
        else 
            console.log(`File uploaded to S3 succesfully: ${data.Location}`);
    });

    imageThumbnail(image.data, { percentage: 100, responseType: 'base64' })
        .then( thumbnail => {

            if(thumbnail) 
                res.json({ thum: `data:image/jpeg;base64,${thumbnail}` });
            else
                res.json({ imgMsg: 'Could not get thumbnail' });
        }).catch( err => console.log(err)); 
    });

module.exports = router;