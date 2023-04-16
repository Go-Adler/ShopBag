import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: 'dprjb18ng',
  api_key: 387486932498994,
  api_secret: 'OlTPlcyFFZPCc0QhCNadVJn5Phg'
})

// Define a function to generate a custom file name
const generateFileName = (file, req) => {
  // Use the original file name and a unique identifier to create a custom file name
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const fileName = `${file.originalname}-${uniqueId}`;
  req.filename = fileName
  return fileName;
};

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:'uploads',
    allowed_formats: ["jpg", "png"], 
    transformation: [{ width: 500, height: 500, crop: 'fill' }],
    public_id: (req, file) => generateFileName(file, req)
  }
})

export const upload = multer({ storage }).array('images[]', 4)