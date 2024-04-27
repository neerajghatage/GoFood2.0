require('dotenv').config(); 

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const BUCKET_NAME=process.env.BUCKET_NAME;
const BUCKET_REGION=process.env.BUCKET_REGION;
const ACCESS_KEY=process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY=process.env.SECRET_ACCESS_KEY;


const s3 = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});



const addImage = async (file) => {
    const randomString = () => crypto.randomBytes(32).toString("hex");
  
    const fileName = randomString();
  
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
  
    try {
      await s3.send(new PutObjectCommand(uploadParams));
    } catch (error) {
      console.log("Error", error);
    }
  
    let link= `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${fileName}`;
    console.log("Image uploaded ",link);
    return link;
    
  };
  
  module.exports = { addImage }; 
