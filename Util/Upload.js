import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Ensure unique filenames
    }
  });
  
  // Initialize upload instance
  const upload = multer({ storage: storage });
// const upload=multer({dest: 'uploads'})

export default upload;