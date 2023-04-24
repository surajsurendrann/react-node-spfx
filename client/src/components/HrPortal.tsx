/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import styled from "styled-components";

const HrPortal = (props: any) => {
  return (
    <Layout>
      <nav>HrPortal</nav>
    </Layout>
  );
};

export default HrPortal;

const Layout = styled.div`
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100vw;
  z-index: 100;
  transition: all 0.3;
`;
