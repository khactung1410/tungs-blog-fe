import { Button, Form, FormGroup, Modal, Table } from 'reactstrap';
import styled from 'styled-components';

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
  th,
  td {
    text-align: center;
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
  margin-bottom: 0;  /* Đảm bảo không có khoảng cách dư thừa */
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
  max-height: calc(70vh - 150px); /* Đặt giới hạn chiều cao cho bảng, đảm bảo không quá 70% màn hình */
  overflow-y: auto; /* Cho phép cuộn */
  margin-top: 10px;
  border: 1px solid #dee2e6; /* Viền bảng */

  table {
    width: 100%; /* Bảng chiếm toàn bộ chiều ngang */
    border-collapse: collapse;

    thead {
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: #f8f9fa;
      border-bottom: 2px solid #dee2e6;
    }

    th, td {
      text-align: center;
      padding: 10px;
      border-bottom: 1px solid #dee2e6;
      white-space: nowrap;
    }

    th:first-child, td:first-child {
      width: 50px; /* Cố định chiều rộng cho cột checkbox */
      position: sticky;
      left: 0;
      background-color: #f8f9fa;
    }

    th {
      border-bottom: 2px solid #dee2e6;
    }
  }
`;






