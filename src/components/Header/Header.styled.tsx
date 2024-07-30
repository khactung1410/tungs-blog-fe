import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 100px;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const NewBlogButton = styled.button`
  background-color: #0164ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin: 0 7px;
  transition: transform 0.2s; /* Thêm chuyển đổi mượt mà */
  &:hover {
    transform: scale(1.1); /* Phóng to khi trỏ vào */
  }
`;

export const ExportFlashCardButton = styled.button`
  background-color: #0164ff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin: 0 7px;
  transition: transform 0.2s; /* Thêm chuyển đổi mượt mà */
  &:hover {
    transform: scale(1.1); /* Phóng to khi trỏ vào */
  }
`;
export const StyledNavLink = styled(Link)<{ bold?: boolean }>`
  margin: 12px;
  font-size: 20px; /* Tăng cỡ chữ */
  transition: transform 0.2s; /* Thêm chuyển đổi mượt mà */
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')}; /* Làm đậm nếu cần */
  &:hover {
    transform: scale(1.1); /* Phóng to khi trỏ vào */
  }
`;