/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from "react";
import { useState, useContext, ChangeEvent } from "react";
import styled from "styled-components";
import { UserContext } from "./userContext";

interface Props {}

const AddDetailsSection: React.FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const { addUser } = useContext(UserContext);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser = {
      Title: name,
      Email: email,
      Designation: designation,
      image: image,
    };

    addUser(newUser);

    //set back to null
    setName("");
    setDesignation("");
    setEmail("");
    setImage(null);
    alert("successfull");
  }

  return (
    <MainContainer>
      {/* Image section */}

      <Container>
        <ImageContainer>
          {image ? (
            <Img src={URL.createObjectURL(image)} alt="" />
          ) : (
            <Img
              src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png"
              alt=""
            />
          )}
        </ImageContainer>
        <InputContainer>
          <FileInputContainer>
            <FileLabel>Select an image</FileLabel>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FileInputContainer>
        </InputContainer>
      </Container>

      {/* Details Section */}

      <DetailsContainer>
        <Form onSubmit={handleSubmit}>
          <label> Name</label>
          <Input
            required
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label>Email</label>
          <Input
            required
            type="text"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <label> Designation</label>
          <Input
            required
            type="text"
            value={designation}
            onChange={(event) => {
              setDesignation(event.target.value);
            }}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </DetailsContainer>
    </MainContainer>
  );
};

export default AddDetailsSection;

const MainContainer = styled.div`
  display: flex;
  max-width: 100%;
  min-height: 100%;
  overflow: hidden;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

//Image section

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
  min-height: 92vh;
  align-items: center;
  /* background-color: #1da1f2; */
`;

const ImageContainer = styled.div`
  margin: 20px 10px 0px 10px;
`;
const InputContainer = styled.div`
  margin-left: 80px;
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10%;
  border: none;
`;

const FileInputContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
`;

const FileInput = styled.input`
  /* margin-top: 20px; */
  position: absolute;
  font-size: 100px;
  opacity: 0;
  right: 0;
  top: 0;
`;

const FileLabel = styled.label`
  display: inline-block;
  background-color: #3498db;
  color: #fff;
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #2980b9;
  }
`;

// Form

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  width: 80%;
  max-width: 600px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 10px 10px 10px 0px;
  border: 1px solid;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;
