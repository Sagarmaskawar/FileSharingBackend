import { request, response } from "express";
import File from "../models/file.js";
import Registerusers from "../models/user.js";

export const uploadImage=async(request,response)=>{
    const fileObj={
        path: request.file.path,
        name: request.file.originalname,
        type: request.body.filetype,
        studentId: request.body.studentId
    }
    try{
    const file = await File.create(fileObj)
    response.status(200).json({path: `http://localhost:8000/file/${file._id}`})
    }
    catch(error){
        console.log(error);
        response.status(500).json({error:error.message})
    }
}

export const downloadImage=async(request,response)=>{
    try{
       const file= await File.findById(request.params.fileId);
       file.downloadContent++;
       await file.save();
       response.download(file.path, file.name)
    }
    catch(error){
        console.log(error)
        response.status(500).json({error:error.message})
    }
}

// export const uploadImage = async (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: "No file uploaded." });
//     }
  
//     const { filetype, studentId } = req.body;
  
//     // Basic validation
//     if (!filetype || !studentId) {
//       return res.status(400).json({ error: "filetype and studentId are required." });
//     }
  
//     const fileObj = {
//       path: req.file.path,
//       name: req.file.originalname,
//       type: filetype,
//       studentId: studentId
//     };
  
//     try {
//       const file = await File.create(fileObj);
//       res.status(200).json({ path: `http://localhost:8000/file/download/${file._id}` });
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       res.status(500).json({ error: error.message });
//     }
//   };
  
//   // Download image handler
//   export const downloadImage = async (req, res) => {
//     console.log(req,req.params,'requestttt');
//     try {
//         console.log(await File.findById(req.params.fileId),'this one')
//       const file = await File.findById(req.params.fileId);
      
//       if (!file) {
//         return res.status(404).json({ error: "File not found." });
//       }
  
//       file.downloadContent = (file.downloadContent || 0) + 1;
//       await file.save();
//       response.status(200).json({message:'User Register Successfully'});
  
//     //    const filepath = path.resolve(file.path);

//     //   res.download(filepath, file.name, (err) => {
//     //     if (err) {
//     //       console.error("Error downloading file:", err);
//     //       return res.status(500).json({ error: "Error downloading file." });
//     //     }
//     //   });
//     } catch (error) {
//       console.error("Server error:", error);
//       res.status(500).json({ error: error.message });
//     }
//   };

export const registerUser = async (request, response) => {
    const {userName,password}=request.body;
    const userObj = {
        userName: userName, // Corrected from request.body.UserName
        password: password, // Corrected from request.file.Password
    };
    try {
        const existinguser = await Registerusers.findOne({ userName});  
        if (existinguser) {
            return response.status(400).json({ error: 'Username already exists' });
        }
        const user = await Registerusers.create(userObj);
        response.status(200).json({message:'User Register Successfully'});
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: error.message });
    }
};

export const loginUser = async (request, response) => {
    const { userName, password } = request.body;

    try {
        const existingUser = await Registerusers.findOne({ userName });

        if (existingUser) {
            // If user exists, check if password matches
            if (existingUser.password == password) {
                response.status(200).json(existingUser);
            } else {
                response.status(400).json({ error: 'Credentials do not match.' });
            }
        } else {
            response.status(400).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: error.message });
    }
};

export const getUser=async(request,response)=>{
    try{
        const existingUsers = await Registerusers.find({ userName: { $ne: request.params.userName } });
        const users =existingUsers.map(user => ({
            _id: user._id,
            userName: user.userName
        }));
        response.status(200).json(users);
    }
    catch(error){
        console.log(error)
        response.status(500).json({error:error.message})
    }
}

export const getUserFiles=async(request,response)=>{
    try{
        const files = await File.find({ studentId: request.params.Id });
         response.status(200).json(files);
    }
    catch(error){
        console.log(error)
        response.status(500).json({error:error.message})
    }
}