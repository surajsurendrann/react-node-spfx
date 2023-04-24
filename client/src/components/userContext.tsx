/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from "react";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export interface User {
  Id?: number;
  Title?: string;
  Email?: string;
  Designation?: string;
  Place?: string;
  image?: File | null;
  ImageUrl?: string;
}

interface UserContextType {
  users: User[];
  // upUsers: number;
  addUser: (newUser: User) => void;
  deleteUser: (Id: number | undefined) => void;
  // handleUpdate: (Id: number) => void;
  updateUser: (updatedUser: User) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  // upUsers: null,
  addUser: () => {},
  deleteUser: () => {},
  // handleUpdate: () => {},
  updateUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  // const [upUsers, setUpUsers] = useState<number>(null);
  // const [userId, setUserId] = useState<number>();

  //Get users
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("http://localhost:3001/api/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  //Add users
  const addUser = async (newUser: User) => {
    const response = await axios.post(
      "http://localhost:3001/api/adduser",
      newUser
    );
    console.log(response);
  };

  //Delete user

  const deleteUser = async (Id: any) => {
    const response = await axios.delete(
      `http://localhost:3001/api/delete/${Id}`
    );
    console.log(response);
  };

  //Update

  // const handleUpdate = async (Id: number) => {
  //   setUserId(Id);
  //   const items: any = await sp.web.lists
  //     .getByTitle("My List")
  //     .items.getById(Id)();
  //   setUpUsers(items);
  // };

  const updateUser = async (newUser: User) => {
    const response = await axios.put(
      `http://localhost:3001/api/updateuser`,
      newUser
    );
    console.log(response);

    // const documentLibraryName = `test/${newUser.Id}`;
    // // const fileNamePath = encodeURI(newUser.image.name);

    // let result: any;
    // if (newUser.image.size <= 10485760) {
    //   // small upload
    //   result = await sp.web
    //     .getFolderByServerRelativePath(documentLibraryName)
    //     .files.addUsingPath("image.jpg", newUser.image, { Overwrite: true });
    // } else {
    //   // large upload
    //   result = await sp.web
    //     .getFolderByServerRelativePath(documentLibraryName)
    //     .files.addChunked(
    //       "image.jpg",
    //       newUser.image,
    //       (data) => {
    //         console.log(`progress`);
    //       },
    //       true
    //     );
    // }

    // console.log(`Result of file upload: ${JSON.stringify(result)}`);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

/* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/explicit-function-return-type */
// /* eslint-disable @typescript-eslint/no-floating-promises */
// import * as React from "react";
// import { createContext, useState, useEffect } from "react";
// import { sp } from "@pnp/sp/presets/all";

// export interface IListItem {
//   Id: number;
//   Title: string;
//   Email: string;
//   Designation: string;
// }

// interface SharePointListContextType {
//   listItems: IListItem[];
//   addListItem: () => void;
//   deleteListItem: (itemId: number) => void;
//   updateListItem: (itemId: number, title: string, description: string) => void;
// }

// export const SharePointListContext = createContext<SharePointListContextType>({
//   listItems: [],
//   addListItem: () => {},
//   deleteListItem: () => {},
//   updateListItem: () => {},
// });

// export const SharePointListProvider: React.FC = ({ children }) => {
//   const [listItems, setListItems] = useState<IListItem[]>([]);

//   useEffect(() => {
//     sp.web.lists
//       .getByTitle("Users")
//       .items.select("Title", "Description")
//       .get()
//       .then((items) => {
//         setListItems(items);
//       });
//     console.log(listItems);
//   }, []);

//   const addListItem = () => {
//     sp.web.lists
//       .getByTitle("users")
//       .items.add({
//         Title: "New Item",
//         Description: "New item added using React and TypeScript",
//       })
//       .then(() => {
//         sp.web.lists
//           .getByTitle("ListName")
//           .items.select("Id", "Title", "Description")
//           .get()
//           .then((items) => {
//             setListItems(items);
//           });
//       });
//   };

//   const deleteListItem = (itemId: number) => {
//     sp.web.lists
//       .getByTitle("ListName")
//       .items.getById(itemId)
//       .delete()
//       .then(() => {
//         const updatedItems = listItems.filter((item) => item.Id !== itemId);
//         setListItems(updatedItems);
//       });
//   };

//   const updateListItem = (
//     itemId: number,
//     title: string,
//     description: string
//   ) => {
//     sp.web.lists
//       .getByTitle("ListName")
//       .items.getById(itemId)
//       .update({
//         Title: title,
//         Description: description,
//       })
//       .then(() => {
//         sp.web.lists
//           .getByTitle("ListName")
//           .items.select("Id", "Title", "Description")
//           .get()
//           .then((items) => {
//             setListItems(items);
//           });
//       });
//   };

//   const contextValue: SharePointListContextType = {
//     listItems,
//     addListItem,
//     deleteListItem,
//     updateListItem,
//   };

//   return (
//     <SharePointListContext.Provider value={contextValue}>
//       {children}
//     </SharePointListContext.Provider>
//   );
// };

// export default SharePointListProvider;
