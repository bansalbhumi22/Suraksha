import multer from "multer";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp')//cb=callback
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)//this is not good to use name the file same as user file name as there can be so much files with same name but it is for very short period of time so we can do it
  }
})

export const upload = multer({ storage: storage })