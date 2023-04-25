/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { User, UserContext } from "../components/userContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import Tabs from "../components/Tabs";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px 10px 0px 0px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = () => {
  const { users, updateUser } = useContext(UserContext); //change
  const { userId } = useParams<{ userId: any }>();
  const [isEditing, setIsEditing] = useState(false);
  const [Id] = useState<number>(parseInt(userId)); //change
  const [name, setName] = useState<string>();
  const [designation, setDesignation] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [place, setPlace] = useState<string>();

  const userProfile: User[] = users.filter(
    (user) => user.Id?.toString() === userId
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedUser = {
      Id,
      Title: name,
      Email: email,
      Designation: designation,
      Place: place,
    };

    updateUser(updatedUser);
    setIsEditing(false);
  }

  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
      <Container>
        {isEditing ? (
          <>
            {userProfile.map((user) => (
              <>
                {user.ImageUrl ? (
                  <Image src={user.ImageUrl} />
                ) : (
                  <Image src="" />
                )}
                <DetailsContainer>
                  <form onSubmit={handleSubmit}>
                    <p key={user.Id}>
                      Name :
                      <input
                        type="text"
                        defaultValue={user.Title}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      Email :
                      <input
                        type="text"
                        defaultValue={user.Email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      Designation :
                      <input
                        type="text"
                        defaultValue={user.Designation}
                        onChange={(e) => {
                          setDesignation(e.target.value);
                        }}
                      />
                    </p>
                    <p>
                      Place :
                      <input
                        type="text"
                        defaultValue={user.Place}
                        onChange={(e) => {
                          setPlace(e.target.value);
                        }}
                      />
                    </p>

                    <button type="submit">Save</button>
                  </form>
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </DetailsContainer>
              </>
            ))}
          </>
        ) : (
          <>
            {" "}
            {userProfile.map((user) => (
              <>
                {user.ImageUrl ? (
                  <Image src={user.ImageUrl} />
                ) : (
                  <Image src="" />
                )}
                <DetailsContainer>
                  <p key={user.Id}>Name : {user.Title}</p>
                  <p>Email : {user.Email}</p>
                  <p>Designation : {user.Designation}</p>
                  {user.Place && <p>Place : {user.Place}</p>}
                </DetailsContainer>
                <div>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
