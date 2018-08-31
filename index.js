const fs = require('fs');
const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
AWS.config.loadFromPath('./config.json');

const s3 = new AWS.S3();
const bucketParams = { Bucket: 'gallery-marquez-images' };

const imageArray = [];
const bucketContentsArr = [];

const getBucketLinks = () => {
  s3.listObjects(bucketParams, function(err, data) {
    var bucketContents = data.Contents;
    bucketContentsArr.push(bucketContents);

    for (var i = 0; i < bucketContents.length; i++) {
      var urlParams = {
        Bucket: bucketParams.Bucket,
        Key: bucketContents[i].Key
      };

      s3.getSignedUrl('getObject', urlParams, function(err, url) {
        imageArray.push(url);
        let urlBreak = url + '\n';
        fs.appendFile('./output/imageLinks.txt', urlBreak, err => {
          if (err) throw err;
        });
      });
    }
  });
};

getBucketLinks();

const writeDataToFile = link => {
  fs.writeFile('./output/imageLinks.txt', link, err => {
    if (err) throw err;
  });
};
