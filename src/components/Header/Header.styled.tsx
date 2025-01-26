import styled from 'styled-components';

export const Sidebar = styled.aside<{ expand: boolean }>`
  width: ${(props) => (props.expand ? '260px' : '70px')};
  min-width: ${(props) => (props.expand ? '260px' : '70px')};
  height: 100vh; /* Chiều cao toàn màn hình */
  background-color: #0e2238;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.25s ease-in-out;
  position: fixed; /* Đảm bảo sidebar cố định */
  left: 0;
  top: 0;
  z-index: 1000;
`;


export const ToggleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 1.5rem;
`;

export const Logo = styled.div<{ expand: boolean }>`
  margin: auto 0;
  font-size: 1.15rem;
  font-weight: 600;
  color: white;
  text-align: center;
  display: ${(props) => (props.expand ? 'block' : 'none')};
`;

export const Nav = styled.ul`
  flex: 1;
  padding: 0 0;
  list-style: none;
`;

export const NavItem = styled.li`
  position: relative;
  &:hover > ul {
    display: block;
  }
`;

export const NavLink = styled.a<{ expand: boolean; isActive?: boolean }>`
padding: 0.625rem 1.625rem;
color: white;
display: flex;
align-items: center;
white-space: nowrap;
text-decoration: none;
border-left: 3px solid transparent;
font-size: 0.9rem;
background-color: ${(props) =>
  props.isActive ? 'rgba(255, 255, 255, 0.075)' : 'transparent'};
border-left: ${(props) =>
  props.isActive ? '3px solid #3b7ddd' : '3px solid transparent'};

&:hover {
  background-color: rgba(255, 255, 255, 0.075);
  border-left: 3px solid #3b7ddd;
}

span {
  margin-left: 0.75rem;
  display: ${(props) => (props.expand ? 'inline' : 'none')};
}
`;

export const Dropdown = styled.ul<{ expand: boolean }>`
  position: relative; /* Không còn dùng absolute */
  background-color: #0e2238;
  padding: 0;
  list-style: none;
  margin: 0;
`;


export const DropdownItem = styled.li`
  padding: 0.625rem 1.625rem;
  color: white;
  text-decoration: none;
  margin-left: 2rem; /* Thụt vào bên phải */
  &:hover {
    background-color: rgba(255, 255, 255, 0.075);
  }
`;


export const Footer = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
