const fs = require('fs');
const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
AWS.config.loadFromPath('./config.json');

const s3 = new AWS.S3();
const bucketParams = { Bucket: 'gallery-marquez-images' };

const imageArray = [];

s3.listObjects(bucketParams, function(err, data) {
  var bucketContents = data.Contents;
  for (var i = 0; i < bucketContents.length; i++) {
    var urlParams = {
      Bucket: 'gallery-marquez-images',
      Key: bucketContents[i].Key
    };
    console.log(bucketContents[i]);
    s3.getSignedUrl('getObject', urlParams, function(err, url) {
      // console.log('the url of the image is', url);
      imageArray.push(url + '\n');
      // console.log(imageArray);
    });
  }
});

const writeDataToFile = linkArray => {
  fs.writeFile('/output/imageLinks.txt', linkArray, err => {
    if (err) console.log(err);
    console.log('file written.');
  });
};

// // const s3bucket = new S3({
// //   params: { Bucket: 'gallery-marquez-images' }
// // });

// s3Bucket.getSignedUrl('getObject', urlParams, function(err, url) {
//   console.log('the url of the image is', url);
// });

// console.log(s3bucket);
