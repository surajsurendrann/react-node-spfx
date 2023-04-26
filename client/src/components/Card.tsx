/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import styled from "styled-components";
import { User } from "./userContext";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  width: 300px;
  height: 200px;
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

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.Id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
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
        </DetailsContainer>
      </CardContainer>
    </Link>
  );
};

export default Card;
