const multer = require("multer")
const path = require("path")
const sharp = require("sharp")
const fs = require("fs")

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
   req.fileValidationError = true
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file, 'filesssssssssssssssssssssssssssssssssssssss');
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

function flattenArrays(req, res, next) {
  // Get an array of all the file objects
  const files = Object.values(req.files);

  // Flatten the array of file objects into a single array
  req.files = files.flat();

  next();
}

const sharpedImage =  (req, res, next) => {
 if(req.fileValidationError) {
  next()
  return
 }
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
const fields = [
  { name: 'image-0', maxCount: 1 },
  { name: 'image-1', maxCount: 1 },
  { name: 'image-2', maxCount: 1 },
  { name: 'image-3', maxCount: 1 },
];

const upload = multer({
   storage,
   fileFilter 
  }).fields(fields)

module.exports = { upload, sharpedImage, flattenArrays }