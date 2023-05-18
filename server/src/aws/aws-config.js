
require('dotenv').config();
const AWS = require('aws-sdk');
const https = require('https');

const bucket_name = process.env.bucket_name;
const access_key = process.env.access_key;
const secret_access_key = process.env.secret_access_key;
const region = process.env.region;

const agent = new https.Agent({
  keepAlive: true,
  keepAliveTimeout: 1800000 // 30 minutes en millisecondes
});

const s3 = new AWS.S3({
  accessKeyId: access_key,
  secretAccessKey: secret_access_key,
  region: region,
  httpOptions: {
    timeout: 1800000, // 30 minutes en millisecondes
    agent: agent
  }
});


module.exports = s3;


/*
require('dotenv').config();
const { S3Client } = require("@aws-sdk/client-s3");
const https = require('https');

const bucket_name = process.env.bucket_name;
const access_key = process.env.access_key;
const secret_access_key = process.env.secret_access_key;
const region = process.env.region;

const agent = new https.Agent({
  keepAlive: true,
  keepAliveTimeout: 1800000 // 30 minutes en millisecondes
});

const s3 = new S3Client({
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_access_key
  },
  region: region,
  httpOptions: {
    timeout: 1800000, // 30 minutes en millisecondes
    agent: agent
  }
});


module.exports = s3;
*/