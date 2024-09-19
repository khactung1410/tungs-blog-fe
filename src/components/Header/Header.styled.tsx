// Header.styled.tsx
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div<{ isdarkmode: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  background-color: ${(props) => (props.isdarkmode ? '#1a1a1a' : '#f0f0f0')}; /* Darker background for dark mode */
  color: ${(props) => (props.isdarkmode ? 'white' : 'black')};
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
  flex: 1; /* Allows this section to expand */
  justify-content: space-between; /* Pushes ToggleButton to the bottom */
`;

export const NavLinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1; /* Takes up available space above ToggleButton */
  width: 100%; /* Ensures the width is the same as HeaderWrapper */
`;

export const NavItem = styled.div<{ isactive?: boolean }>`
  width: 100%; /* Matches the width of the HeaderWrapper */
  padding: 10px;
  font-size: 18px;
  background-color: ${(props) => (props.isactive ? '#0164ff' : 'transparent')}; /* Blue background if active */
  color: ${(props) => (props.isactive ? 'white' : 'inherit')}; /* White text if active */
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  text-align: left; /* Align text to the left */
  display: flex;
  align-items: center; /* Center items vertically within the NavItem */
  padding-left: 15px; /* Add padding to ensure text is not too close to the edge */
  &:hover {
    background-color: ${(props) => (props.isactive ? '#014bbf' : '#e0e0e0')}; /* Lighter blue or gray on hover */
  }
`;

export const ToggleButton = styled.button`
  background-color: #0164ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-top: auto; /* Pushes the button to the bottom of the container */
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #014bbf;
  }
`;
