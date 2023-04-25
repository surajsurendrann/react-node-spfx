import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

interface Document {
  UniqueId: string;
  Name: string;
  ServerRelativeUrl: string;
}

const Documents = () => {
  const { userId } = useParams<{ userId: any }>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<Document[]>([]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.put(
        `http://localhost:3001/api/document/${userId}`,
        formData
      );
      console.log(response);
      alert("File uploaded");
      setSelectedFile(null);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const getFiles = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/files/${userId}`
      );

      const files = response.data;
      setFiles(files);
    } catch {}
  }, [userId]);

  useEffect(() => {
    getFiles();
  }, [getFiles]);

  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
      <Container>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleUpload}>Upload</button>

        {files.map((file) => (
          <>
            <p key={file.UniqueId}>
              # {file.Name} :<a href={file.ServerRelativeUrl}>Download</a>{" "}
              <hr />
            </p>
          </>
        ))}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;

export default Documents;
