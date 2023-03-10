const multer = require("multer")
const path = require("path")
const sharp = require("sharp")
const fs = require("fs")

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const sharpedImage =  (req, res, next) => {
  req.files.forEach((file) => {
    const inputBuffer = fs.readFileSync(file.path)
    sharp(inputBuffer)
    .resize({ width:400, height: 400, fit: 'cover'})
    .toFile(file.path, (err, info) => {
      if(err) throw err
    })
  })
  next()
}



const upload = multer({ storage, fileFilter }).array('images', 4)


module.exports = { upload, sharpedImage }