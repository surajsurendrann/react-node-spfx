import { useContext } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import SearchSection from "../components/SearchSection";
import { UserContext } from "../components/userContext";

const Home = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <Navbar />
      <Container>
        <SearchSection />
        <CardWrapper>
          {users.map((item) => (
            <Card user={item} key={item.Id} />
          ))}
        </CardWrapper>
      </Container>
    </>
  );
};

export default Home;

const Container = styled.div`
  margin: 0px 60px;
  display: flex;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 100%;
  align-items: center;
`;
