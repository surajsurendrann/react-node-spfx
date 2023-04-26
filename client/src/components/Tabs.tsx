/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface TabProps {
  userId: string;
}

const Tabs: React.FC<TabProps> = ({ userId }) => {
  return (
    <Container>
      <Left>
        <Link to={`/profile/${userId}`}>
          <PageTitle>Profile</PageTitle>
        </Link>
      </Left>

      <Right>
        <Link to={`/profile/documents/${userId}`}>
          <PageTitle>Documents</PageTitle>
        </Link>
      </Right>
    </Container>
  );
};

export default Tabs;

const Container = styled.div`
  display: flex;
  margin: 10px;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;

const Right = styled.div`
  flex: 1;
`;

const PageTitle = styled.button`
  margin-left: 20px;
  padding: 10px 100px;
  background-color: #1da1f2;
  color: white;
  border: none;
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;
//   color: black;
// `;
