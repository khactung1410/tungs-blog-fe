// File MatchWordMeaning.styled.tsx

import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const GameMatchingContainer = styled.div`
  width: 75vw;
  padding: 0 15px;
  box-sizing: border-box;
`;

export const FormSection = styled.div`
  display: flex;
  width: 723px;
  flex-direction: row;
  gap: 30px;
`;

export const TextareaContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Textarea = styled.textarea<{ hidden: boolean }>`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')}; // Ẩn hoặc hiện lại nội dung của textarea
`;

export const FormLabel = styled(Form.Label)`
  font-weight: bold;
  font-size: 1.1rem;
`;

export const TimerContainer = styled.div`
  position: absolute; /* Đặt vị trí tuyệt đối để nằm trong dòng chảy của phần tử cha */
  top: 0; /* Canh trên cùng */
  left: 110%; /* Đặt ngay bên phải của nút "Bắt Đầu" */
  display: flex;
  align-items: center;
  z-index: 1000; /* Đảm bảo đồng hồ đếm giờ không bị chồng lên các phần tử khác */
`;

export const Timer = styled.div`
  font-size: 2rem; /* Giảm kích thước đồng hồ đếm giờ */
  font-weight: bold; /* Làm đồng hồ đậm hơn */
  text-align: right;
`;

export const ButtonContainer = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative; /* Đảm bảo TimerContainer nằm trong ButtonContainer */
`;

export const StyledButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1.2rem; /* Kích thước chữ của nút */
  font-weight: bold; /* Làm chữ đậm hơn */
  text-align: center;
  background-color: #007bff; /* Màu nền của nút */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap; /* Ngăn việc xuống dòng */

  &:hover {
    background-color: #0056b3; /* Màu nền khi hover */
  }

  &:disabled {
    background-color: #6c757d; /* Màu nền khi nút bị vô hiệu hóa */
    cursor: not-allowed;
  }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr); /* 6 cột với kích thước đều nhau */
  gap: 10px; /* Khoảng cách giữa các ô chữ nhật */
  width: 100%; /* Sử dụng toàn bộ chiều rộng của phần tử cha */
  padding: 0 10px; /* Padding hai bên để các ô không bị dính sát vào cạnh màn hình */
  box-sizing: border-box; /* Đảm bảo width bao gồm cả padding và border */
`;

export const Square = styled.div<{ selected: boolean; disabled?: boolean; highlight: boolean; scale: number; type: 'word' | 'meaning' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => {
    if (props.highlight && props.disabled) return '#ffffff'; // Màu nền trắng khi ô được chọn đúng
    if (props.highlight) return '#d3d3d3'; // Màu khi ô được chọn lần thứ hai
    if (props.selected) {
      return props.type === 'meaning' ? '#ffd700' : '#d3d3d3'; // Màu nền vàng đậm cho ô chứa nghĩa, màu nền khác cho ô chứa từ
    }
    return props.type === 'meaning' ? '#ffffe0' : '#f8f9fa'; // Màu nền vàng nhẹ cho ô chứa nghĩa, màu nền khác cho ô chứa từ
  }};
  border: ${props => (props.highlight && props.disabled ? 'none' : '1px solid #ddd')}; /* Không có border khi ô được chọn đúng */
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  font-weight: bold;
  padding: 2px; /* Padding để ô chữ nhật to hơn */
  height: calc(80vh / 5); /* Chiều cao của ô chữ nhật */
  width: calc((71vw - 70px) / 5); /* Chiều rộng của ô chữ nhật, trừ khoảng cách và padding */
  overflow: hidden;
  text-align: center;
  color: ${props => (props.disabled ? 'transparent' : 'black')}; /* Ẩn văn bản khi ô bị vô hiệu hóa */
  word-wrap: break-word; /* Đảm bảo văn bản xuống dòng khi cần */
  overflow-wrap: break-word; /* Đảm bảo văn bản xuống dòng khi cần */
  position: relative;
  font-style: ${props => props.type === 'meaning' ? 'italic' : 'normal'}; /* In nghiêng cho các ô chứa nghĩa tiếng Việt */
  
  /* Đoạn mã CSS sử dụng data-content để xử lý văn bản */
  &::before {
    content: attr(data-content); /* Sử dụng thuộc tính data-content để hiển thị văn bản */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: normal; /* Cho phép xuống dòng văn bản */
    font-size: ${props => props.scale < 1 ? `${Math.max(10, 24 / props.scale)}px` : '24px'}; /* Tự động điều chỉnh kích thước chữ dựa trên tỷ lệ */
    text-align: center;
    word-wrap: break-word; /* Đảm bảo văn bản xuống dòng khi cần */
    overflow-wrap: break-word; /* Đảm bảo văn bản xuống dòng khi cần */
  }
`;


