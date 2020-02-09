const express = require('express');
const AWS = require('aws-sdk');
const tokenValidator = require('../Validation/tokenValidator');

router = express.Router();

//= =========================================================================
// @route    GET: /getImages
// @desc     Getting all the images from S3 storage bucket and converting to base64 from <buffer >
// @access   Protected (due to tokenValidator)

router.get('/', tokenValidator, (req, res) => {

    const s3Storage = new AWS.S3({                  //Initializing S3 storage object.  

        accessKeyId: process.env.awsID,
        secretAccessKey: process.env.awsSecretID
    });

    //List all the objects(images) residing at S3 storage bucket
    s3Storage.listObjects({ Bucket: process.env.awsBucketName }, async(err, data) => {

        let arr = [];

        if(err)
            throw err;
        else {
            
            console.log('Connected to S3');
            
            // Putting all items(images) in arr[] from list 
            for(let i = 0; i < data.Contents.length; i++) {
            
                let params = {
                    Bucket: process.env.awsBucketName,
                    Key: data.Contents[i].Key
                };

                console.log('Downloading: ' + data.Contents[i].Key);

                //Getting object(image) from S3 and converting from <buffer > to base64 format which is readable by <img src = {base64 string}/>
                arr[i] = `data:image/jpeg;base64,${(await s3Storage.getObject(params).promise()).Body.toString('base64')}`;
            }
            console.log('Download Ended');
        }
        if(arr.length === 0)
            res.json({ imgMsg: 'No images'}); //If there is no image in S3 bucket.
        else {
            res.json(arr);
        }
    });
});

module.exports = router;    