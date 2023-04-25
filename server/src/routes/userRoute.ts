const router = require("express").Router();
import {Application, Request, Response} from 'express'
import fileUpload from 'express-fileupload';
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

module.exports = router