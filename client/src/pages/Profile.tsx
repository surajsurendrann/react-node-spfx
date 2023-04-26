import * as React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { User, UserContext } from "../components/userContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import Tabs from "../components/Tabs";
import Swal from "sweetalert2";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100vh;
  align-items: center;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 10px 0px 0px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Profile = () => {
  const { users, updateUser, deleteUser } = useContext(UserContext); //change
  const { userId } = useParams<{ userId: any }>();
  const [isEditing, setIsEditing] = useState(false);
  const [Id] = useState<number>(parseInt(userId)); //change
  const [name, setName] = useState<string>();
  const [designation, setDesignation] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [place, setPlace] = useState<string>();

  const navigate = useNavigate();

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

  const handelDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteUser(Id);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          navigate("/");
        } catch {}
      }
    });
  };

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

                <form onSubmit={handleSubmit}>
                  <table key={user.Id}>
                    <tr>
                      <td>Name</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={user.Title}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </td>

                      <td>Email</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={user.Email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>Designation</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={user.Designation}
                          onChange={(e) => {
                            setDesignation(e.target.value);
                          }}
                        />
                      </td>

                      <td>Place</td>
                      <td>
                        <input
                          type="text"
                          defaultValue={user.Place}
                          onChange={(e) => {
                            setPlace(e.target.value);
                          }}
                        />
                      </td>
                    </tr>
                  </table>
                  <button type="submit">Save</button>
                </form>
                <div>
                  <button type="button" onClick={handelDelete}>
                    Delete
                  </button>
                </div>
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
              </>
            ))}
          </>
        ) : (
          <>
            <div>
              <button
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            </div>
            {userProfile.map((user) => (
              <>
                {user.ImageUrl ? (
                  <Image src={user.ImageUrl} />
                ) : (
                  <Image src="" />
                )}
                <table key={user.Id}>
                  <tr>
                    <td>Name</td> <td>: {user.Title}</td>
                  </tr>
                  <tr>
                    <td>Email</td> <td>: {user.Email}</td>
                  </tr>
                  <tr>
                    <td>Designation</td> <td>: {user.Designation}</td>
                  </tr>
                  <tr>
                    {user.Place && (
                      <>
                        <td>Place</td>
                        <td>: {user.Place}</td>
                      </>
                    )}
                  </tr>
                </table>
              </>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

export default Profile;
