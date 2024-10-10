// Header.styled.tsx
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  background-color: #f0f0f0;
  color: black;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  z-index: 2;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  flex: 1;
  justify-content: space-between; /* Giữ khoảng trống và đưa nút xuống dưới cùng */
  width: 100%;
`;

export const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  width: 100%;
`;

export const NavItem = styled.div<{ isactive?: boolean }>`
  width: 100%;
  padding: 10px;
  font-size: 18px;
  background-color: ${(props) => (props.isactive ? '#0164ff' : 'transparent')};
  color: ${(props) => (props.isactive ? 'white' : 'inherit')};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: left;
  display: flex;
  align-items: center;
  padding-left: 15px;
  &:hover {
    background-color: ${(props) => (props.isactive ? '#014bbf' : '#e0e0e0')};
  }
`;

// Styled cho nút Log out/Log in giống ToggleButton
export const LogoutButton = styled.button`
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
