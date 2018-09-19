# AWS-S3-Bucket-ImageURL-Parser

This node CLI interfaces with AWS S3 buckets and grabs data from stored items, and generates a text file with SignedURLs. There is also a helper function that parses those SignedURLs into UnSigned URLs, if needed.

### Prerequisites

- NodeJS
- AWS Login Credentials

### Installing

Install dependencies via NPM/Yarn to run

```
npm install
```

Either create a config.json file with your AWS credentials, or a .aws directory with a credentials file with the following:

```
[default]
aws_access_key_id = {your aws_access_key_id}
aws_secret_access_key = {your_aws_secret_access_key}
```

### Running Application

CD into directory of application and type:

```
npm run start -- 'bucket-name'
```
