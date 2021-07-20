# Avatar upload demo using Multer, Express and EJS

In this project we can add, list, preview and delete images.

Supported image formats are `jpeg`, `jpg`, `bmp` and `png` with file size limited to 1 MB.

Views are rendered at server side using EJS templating engine.

Multer middlware is added with [`DiskStorage`](https://github.com/expressjs/multer#diskstorage) as persistence which can be later extended to blob solutions like AWS S3, Azure Blob storage, Cloudinary, etc.

To run -
```shell
git clone git@github.com:kunalm8470/multer_demo.git
cd ./multer_demo
npm install
npm run start
```