const express = require('express')
const { upload, sharpedImage } = require("../../middlewares/adminMiddlewares")

const { productEdit, renderProductEditPage, renderProductsPage, renderProductAddPage, productAdd, disableProduct, enableProduct } = require("../../controller/adminControllers/productsController")

const route = express.Router()

route.get("/add", renderProductAddPage);
route.get("/edit/:id", renderProductEditPage);
route.get("/", renderProductsPage);

route.post("/edit/:id",  upload, sharpedImage, productEdit);
route.post("/add", upload, sharpedImage, productAdd);
route.post("/disable",  disableProduct);
route.post("/enable",  enableProduct);
route.post("/enable",  enableProduct);


module.exports = route

for (let file of Object.values(req.files)) {
  // Create a read stream from the file path
  const readStream = fs.createReadStream(file.path);

  // Create a write stream to a new file path
  const writeStream = fs.createWriteStream(`processed/${file.filename}`);

  // Create a sharp instance with some options
  const transformer = sharp()
    .resize(200, 200) // Resize the image to 200x200 pixels
    .jpeg({ quality: 80 }) // Convert the image to JPEG format with 80% quality

  // Pipe the read stream to the transformer and then to the write stream
  readStream.pipe(transformer).pipe(writeStream);
}