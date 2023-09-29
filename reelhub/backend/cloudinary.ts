import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.CLOUD_API_KEY;
const secret = process.env.CLOUD_SECRET;

cloudinary.config({ 
    cloud_name: cloudName,
    api_key: apiKey, 
    api_secret: secret
  });


export default cloudinary


