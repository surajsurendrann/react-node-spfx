const router = require("express").Router();
import {Application, Request, Response} from 'express'
import {sp} from "@pnp/sp-commonjs"

// GET USERS
router.get("/users", async(req : Request, res : Response)=>{
    try{
        const users = await sp.web.lists.getByTitle("My List").items.getAll()
        res.status(200).json(users)
    }catch{
        console.log("error fetching users")
    }
} )

//ADD USER 
router.post("/adduser", async(req : Request, res : Response)=>{
    const newUser = req.body
    console.log(newUser)
    try {
        const response = await sp.web.lists.getByTitle("My List").items.add({
            Title: newUser.Title,
            Email: newUser.Email,
            Designation: newUser.Designation,
          });
          console.log("Successfully added to list")
          const folderName = response.data.Id
          
          //Add folder
          const documentLibraryName = "test";
          const newFolderName = `${folderName}`;
      
          const documentLirary = sp.web.lists.getByTitle(documentLibraryName);
          await documentLirary.rootFolder.folders
            .addUsingPath(newFolderName)
            .then(() => {
              console.log(`Folder ${newFolderName} created successfully`);
            })
            .catch((error) => {
              console.error(`error creating folder: ${error}`);
            });

           res.status(200).json(folderName) 
    } catch (error) {
        console.error(error)
    }
})

router.delete("/delete/:Id", async (req : Request, res : Response)=>{
    const {Id} = req.params
    console.log(Id)
    const id = parseInt(Id)
    //delete list
    const resp = await sp.web.lists.getByTitle("My List").items.getById(id).delete();
    //delete folder
    const folderUrl = `test/${Id}`
     await sp.web.getFolderByServerRelativePath(folderUrl).delete()
      .then(() => {
        console.log(`Folder ${Id} deleted successfully`);
      })
      .catch((error: any) => {
        console.error(`Error deleting folder: ${error}`);
      });
} )

//Update User

router.put("/updateuser",async (req : Request, res : Response)=>{
  const newUser = req.body
  const id = parseInt(newUser.Id)
  await sp.web.lists.getByTitle("My List").items.getById(id).update({
    Title: newUser.Title,
    Email: newUser.Email,
    Designation: newUser.Designation,
    Place: newUser.Place,
  });

})

//Get files

router.get("/files/:Id", async(req : Request, res : Response)=>{
  const {Id} = req.params
 try {
  const folder = await sp.web.getFolderByServerRelativePath(`test/${Id}`).files.get()
  const files = folder.map((file : any)=>{
    return file
  })

  res.status(200).json(files)
 }catch (error) {
  console.error(error)
 }
})

//upload files

router.put("/document/:Id", async(req : Request, res : Response)=>{
  const {Id} = req.params
  const file = (req?.files as any)?.file
  console.log("imagetype",file)

   if (!file) {
    console.error('No file selected');
    return res.status(400).json({
      success: false,
      message: 'No file selected',
    });
  }

  const documentLibraryName = `test/${Id}`;
  const fileNamePath = file.name;

  let result: any;
  if (file?.size <= 10485760) {
    // small upload
    console.log('Starting small file upload');
    result = await sp.web.getFolderByServerRelativePath
    (documentLibraryName).files.addUsingPath(fileNamePath, file.data, { Overwrite: true });
  } else {
    // large upload
    console.log('Starting large file upload');
    result = await sp.web.getFolderByServerRelativePath(documentLibraryName).files.addChunked(fileNamePath, file, ()  => {
      console.log(`Upload progress: `);
    }, true);
  }

  res.status(200).json("success");
})


module.exports = router