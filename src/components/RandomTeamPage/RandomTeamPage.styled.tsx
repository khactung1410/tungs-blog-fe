// AttendanceManage.styled.tsx updated to match StudentsManage style
import styled from 'styled-components';
import { Button, Form, FormGroup, Modal, Table } from 'reactstrap';

export const AttendanceContainer = styled.div`
  padding: 20px;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  gap: 20px; /* Giữa các phần tử trong ActionBar */
`;

export const StyledTable = styled(Table)`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #f0f0f0; /* Màu nền header */
    color: #333; /* Màu chữ header */
    border-bottom: 2px solid #ccc;
    padding: 8px; /* Khoảng cách giữa nội dung và viền */
    text-align: center; /* Căn giữa nội dung header */
  }

  tbody tr:nth-child(odd) {
    background-color: #f0f8ff; /* Nền xanh nhạt cho dòng lẻ */
  }

  tbody tr:nth-child(even) {
    background-color: white; /* Nền trắng cho dòng chẵn */
  }

  tbody td {
    padding: 8px; /* Khoảng cách giữa nội dung và viền */
    text-align: center; /* Căn giữa nội dung */
  }
`;

export const ModalContent = styled.div`
  max-height: 70vh; /* Modal chiếm tối đa 70% chiều cao màn hình */
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden; /* Đảm bảo không tràn nội dung */
`;

export const StyledModal = styled(Modal)`
  width: 60vw; /* Modal chiếm 60% chiều rộng màn hình */
  max-width: 60vw; /* Đảm bảo Modal không vượt quá 60% chiều rộng màn hình */
`;

export const FormGroupStyled = styled(FormGroup)`
  margin-right: 20px; /* Giữa các phần tử trong Form */
  margin-bottom: 0; /* Đảm bảo không có khoảng cách dư thừa */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  label {
    margin-bottom: 5px; /* Thêm khoảng cách giữa Label và Input */
  }

  input {
    width: 200px; /* Có thể điều chỉnh kích thước của ô input */
  }
`;

export const FilterForm = styled(Form)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap; /* Cho phép các phần tử xuống dòng khi không đủ không gian */
  justify-content: flex-start;
`;

export const ButtonStyled = styled(Button)`
  font-size: 0.875rem; /* Giảm kích thước chữ */
  padding: 5px 10px; /* Điều chỉnh padding để nút nhỏ hơn */
`;

export const ScrollableTableWrapper = styled.div`
  position: relative;
  max-height: 80vh; /* Chiều cao tối đa cho vùng cuộn */
  overflow-y: auto; /* Cho phép cuộn dọc phần dữ liệu */
`;
