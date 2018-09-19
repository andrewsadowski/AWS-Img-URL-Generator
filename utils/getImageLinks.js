const fs = require('fs');
const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
AWS.config.loadFromPath('./config.json');
const argv = require('yargs')
  .alias('b', 'bucketName')
  .usage('Usage: add the bucket name with the -b flag')
  .example('node getImageLinks.js -b "my-images"')
  .help('h').argv;

const s3 = new AWS.S3();


let bucketName;

if (argv.b) {
  bucketName = argv.b;
} else {
  bucketName = 'test'
}

const bucketParams = { Bucket: bucketName };
const imageArray = [];
const bucketContentsArr = [];

/**
 * @return {array} Returns an array of URLs from AWS S3 Bucket
 */

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
