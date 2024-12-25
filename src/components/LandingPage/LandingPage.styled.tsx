import { styled } from "styled-components";

// Styled cho nút Log out/Log in giống ToggleButton
export const LoginButton = styled.button`
  background-color: #0164ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  width: 100%; /* Để nút có cùng chiều rộng với sidebar */
  cursor: pointer;
  margin-top: auto; /* Đẩy nút xuống dưới cùng */
  transition: background-color 0.3s;
  &:hover {
    background-color: #014bbf;
  }
`;