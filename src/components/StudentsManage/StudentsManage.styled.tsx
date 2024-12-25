import styled from 'styled-components';
import { Button, Input, Table } from 'reactstrap';

export const StudentsContainer = styled.div`
  padding: 20px;
  margin-left: 240px; //cách lề trái để tránh bị Header che mất.
`;

export const FormWrapper = styled.div`
  margin-bottom: 20px;
  border: 2px solid #ccc;
  padding: 15px;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

export const StyledTableHeader = styled.th`
  background-color: #f0f0f0;
  color: #333;
`;

export const TooltipWrapper = styled.div`
  position: relative;
  cursor: pointer;
  color: black;
  text-decoration: underline;

  /* Khi hover, tooltip sẽ xuất hiện */
  &:hover > .tooltip-content {
    display: block;
  }
`;

export const TooltipContent = styled.div`
  display: none;  /* Mặc định ẩn */
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 3px;
  font-size: 12px;
  white-space: normal; /* Cho phép xuống dòng */
  word-wrap: break-word; /* Quản lý việc xuống dòng trong trường hợp nội dung dài */
  z-index: 10;
  max-width: 500px; /* Giới hạn chiều rộng tối đa nếu cần */
  min-width: 100px; /* Chiều rộng tối thiểu */
  width: auto; /* Tự động điều chỉnh chiều rộng theo nội dung */
`;


export const HeaderButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  align-items: center;
`;

export const FilterInput = styled(Input)`
  width: 300px;
  margin-left: 20px;
`;

export const TableContainer = styled.div`
  position: relative;
  max-height: 80vh; /* Chiều cao tối đa cho vùng cuộn */
  overflow-y: auto; /* Cho phép cuộn dọc phần dữ liệu */
`;

export const StyledTable = styled(Table)`
  width: 100%;
  border-collapse: collapse;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    border-bottom: 2px solid #ccc;
    padding: 8px; /* Khoảng cách giữa nội dung và viền */
    text-align: left; /* Căn trái nội dung */
  }

  tbody tr:nth-child(odd) {
    background-color: #f0f8ff; /* Nền xanh nhạt cho dòng lẻ */
  }

  tbody tr:nth-child(even) {
    background-color: white; /* Nền trắng cho dòng chẵn */
  }

  tbody td {
    padding: 8px; /* Khoảng cách giữa nội dung và viền */
  }
`;