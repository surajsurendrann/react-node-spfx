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
      
          //upload image
      
          const uploadDocumentLibraryName = `test/${folderName}`;
           const filePathName = "image.jpg"

          // const fileNamePath = encodeURI(newUser.image.name);
          let result: any;
          if (newUser.image.size <= 10485760) {
            // small upload
            result = await sp.web
              .getFolderByServerRelativePath(uploadDocumentLibraryName)
              .files.addUsingPath(filePathName, newUser.image, { Overwrite: true });
          } else {
            // large upload
            result = await sp.web
              .getFolderByServerRelativePath(uploadDocumentLibraryName)
              .files.addChunked(
                filePathName,
                newUser.image,
                () => {
                  console.log(`progress : large file upload`);
                },
                true
              );
          }
      
        //   console.log(`Result of file upload: ${JSON.stringify(result)}`);
      
          //Create a link of image in list
      
          const url = `https://3kz837.sharepoint.com/sites/mysite/test/${folderName}/image.jpg`;
          try{

              await sp.web.lists
              .getByTitle("My List")
              .items.getById(response.data.Id)
              .update({
                  ImageUrl: url,
                });
            }catch(error){
                console.log("error while uploading")
                res.status(500).json("upload linking failed")
            }
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