import multer from 'multer'
import path from 'path'
import sharp from 'sharp'
import fs from 'fs'

export const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    req.fileValidationError = true
  }
  cb(null, true)
}

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('req.filessssssss')
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
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