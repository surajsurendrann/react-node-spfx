/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface Props {}

const AddDetailsSection: React.FC<Props> = () => {
  const [name, setName] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const newUser = {
      Title: name,
      Email: email,
      Designation: designation,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/adduser",
        newUser
      );

      setIsLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "New User Added",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/profile/${response.data}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <MainContainer>
        <Container>
          <Form onSubmit={handleSubmit}>
            <span>Create New User</span>
            <FormGroup>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                placeholder="Designation"
                onChange={(e) => setDesignation(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              Create
            </Button>
          </Form>
        </Container>
      </MainContainer>
    </>
  );
};

export default AddDetailsSection;

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
`;

// Form

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding: 15px 10px;
  box-shadow: 3px 4px 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #f5f5f5;
  font-size: 15px;
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
