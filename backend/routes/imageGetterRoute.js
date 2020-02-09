const express = require('express');
const AWS = require('aws-sdk');
const tokenValidator = require('../Validation/tokenValidator');

router = express.Router();

router.get('/', tokenValidator, (req, res) => {

    const s3Storage = new AWS.S3({

        accessKeyId: process.env.awsID,
        secretAccessKey: process.env.awsSecretID
    });

    s3Storage.listObjects({ Bucket: process.env.awsBucketName }, async(err, data) => {

        let arr = [];

        if(err)
            throw err;
        else {
            
            console.log('Connected to S3');
            
            for(let i = 0; i < data.Contents.length; i++) {
            
                let params = {
                    Bucket: process.env.awsBucketName,
                    Key: data.Contents[i].Key
                };

                console.log('Downloading: ' + data.Contents[i].Key);
                arr[i] = `data:image/jpeg;base64,${(await s3Storage.getObject(params).promise()).Body.toString('base64')}`;
            }
            console.log('Download Ended');
        }
        if(arr.length === 0)
            res.json({ imgMsg: 'No images'});
        else {
            res.json(arr);
        }
    });
});

module.exports = router;    