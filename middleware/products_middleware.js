import  multer from 'multer';

export const upload = multer({

    // dest: 'images',
    limits:{
        fileSize: 10000000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        cb(new Error('Please upload an image.'))
        }
        
        cb(undefined, true)
    },

});