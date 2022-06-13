const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let fileDestination = 'public/uploads/'
        if (!fs.existsSync(fileDestination)) {
            fs.mkdirSync(fileDestination, { recursive: true })
            cb(null, fileDestination)
        }
        else {
            cb(null, fileDestination)
        }

    },
    filename: (req, file, cb) => {
        let filename = path.basename(file.originalname, path.extname(file.originalname))
        let ext = path.extname(file.originalname)
        cb(null, filename + '_' + Date.now() + ext)


    }

})

let imageFilter = (req, file, cb) => {
    if (!file.originalname) {
        return cb(new Error('Please choose a file to upload'), false)
    }

    if (!file.originalname.match(/\.(jpg|png|gif|jpeg|svg|JPG|PNG|GIF|JPEG|SVG|jfif)$/)) {
        return cb(new Error('You can upload image file only'), false)

    }
    else {
        cb(null, true)
    }
}

let upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 2048000 //2MB
    }
})

module.exports = upload