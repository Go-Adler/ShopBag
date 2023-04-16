import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

export const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = true
  }
  cb(null, true)
}

cloudinary.config({
  cloud_name: 'dprjb18ng',
  api_key: 387486932498994,
  api_secret: 'OlTPlcyFFZPCc0QhCNadVJn5Phg'
})

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:'uploads',
    allowed_formats: ["jpg", "png"], 
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  }
})
export const sharpedImage = (req, res, next) => {
  if (req.fileValidationError) {
    next()
    return
  }
  req.files.forEach((file) => {
    const inputBuffer = fs.readFileSync(file.path)
    sharp(inputBuffer)
      .resize({ width: 400, height: 400, fit: 'cover' })
      .toFile(file.path, err => {
        if (err) throw err
      })
  })

  next()
}

export const upload = multer({ storage, fileFilter }).array('images[]', 4)