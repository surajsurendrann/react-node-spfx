/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styled from "styled-components";
import { UserContext } from "./userContext";
import { User } from "./userContext";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  width: 200px;
  height: 250px;
  box-shadow: 2px 2px 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border: 1px solid;
  border-radius: 50px;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin: 0px 10px;
`;

const Details = styled.span`
  margin-bottom: 6px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// interface User {
//   Id?: number | null;
//   Title: string;
//   Email: string;
//   Designation: string;
//   Place?: string;
//   image?: File;
//   ImageUrl?: string;
// }

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  const { deleteUser } = React.useContext(UserContext);

  return (
    <CardContainer>
      <ImageContainer>
        {user.ImageUrl ? (
          <Image src={user.ImageUrl} />
        ) : (
          <Image src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />
        )}
      </ImageContainer>
      <DetailsContainer>
        <Details>Name : {user.Title}</Details>
        <Details>Designation : {user.Designation}</Details>
        <Details>Email : {user.Email}</Details>
        {user.Place && <Details>Place : {user.Place}</Details>}
        <ButtonContainer>
          <Link
            to={`/profile/${user.Id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <button>Profile</button>
          </Link>
          {/* <Link to="/update">
            <button onClick={() => handleUpdate(user.Id)}>Update</button>
          </Link> */}
          <button
            onClick={() => {
              deleteUser(user.Id);
            }}
          >
            delete
          </button>
        </ButtonContainer>
      </DetailsContainer>
    </CardContainer>
  );
};

export default Card;
