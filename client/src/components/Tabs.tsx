/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

interface TabProps {
  userId: string;
}

const Tabs: React.FC<TabProps> = ({ userId }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <BackButton onClick={handleBack}>go back</BackButton>
      <Link to={`/profile/${userId}`}>
        <PageTitle>Profile</PageTitle>
      </Link>
      <Link to={`/profile/documents/${userId}`}>
        <Document>Documents</Document>
      </Link>
    </Container>
  );
};

export default Tabs;

const Container = styled.div`
  display: flex;
  margin: 10px;
`;

const BackButton = styled.button`
  margin-left: 30px;
  color: white;
  background-color: #1da1f2;
  border: none;
  padding: 0px 20px;
  border-radius: 10px;
`;

const PageTitle = styled.div`
  margin-left: 20px;
  padding: 10px 100px;
  background-color: #1da1f2;
  color: white;
  border-radius: 10px;
`;
const Document = styled.button`
  margin-left: 60px;
  border: none;
  color: #0a97ef;
  font-size: 1rem;
  background-color: white;
`;
