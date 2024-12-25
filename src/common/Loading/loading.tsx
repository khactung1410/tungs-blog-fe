import React from "react";
import { Message, SpinnerCircle, SpinnerSVG, SpinnerWrapper } from "./loading.styled";

interface SpinnerProps {
    message?: string;
  }
  
  const Loading: React.FC<SpinnerProps> = ({ message }) => (
    <SpinnerWrapper>
      <SpinnerSVG viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <SpinnerCircle cx="33" cy="33" r="30" />
      </SpinnerSVG>
      {message && <Message>{message}</Message>}
    </SpinnerWrapper>
  );

export default Loading;
