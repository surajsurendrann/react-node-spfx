import React from "react";
import Navbar from "../components/Navbar";
import Tabs from "../components/Tabs";
import { useParams } from "react-router-dom";

const Documents = () => {
  const { userId } = useParams<{ userId: any }>();
  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
    </>
  );
};

export default Documents;
