import React, { useEffect, useState } from "react";
import { HeightProps, height } from "styled-system";
import styled from "styled-components";

import { AnimatePresence, motion } from "framer-motion";
import LoginPageTemplate from "./LoginTemplate";

const Wrapper = styled.div<HeightProps>`
  background-color: ${({ theme }) => theme.colors.navBackgroundActive};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${height}
`;

const Login: React.FC = () => {
  const [pageHeight, setPageHeight] = useState(900);

  useEffect(() => {
    setPageHeight(window.innerHeight);
  }, []);

  return (
    <Wrapper height={pageHeight}>
      <AnimatePresence>
        <motion.div style={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <LoginPageTemplate />
        </motion.div>
      </AnimatePresence>
    </Wrapper>
  );
};

export default Login;
