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
  addUser: (newUser: User) => void;
  deleteUser: (Id: number | undefined) => void;
  updateUser: (updatedUser: User) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserContextType>({
  users: [],
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

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
