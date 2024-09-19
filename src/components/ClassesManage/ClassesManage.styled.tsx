import styled from 'styled-components';
import { Button, Container} from 'reactstrap';

export const ClassesContainer = styled(Container)`
    .create-class-button {
        margin-bottom: 20px;
    }
    .form-wrapper {
        border: 1px solid #ccc;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
    }
    table thead {
        background-color: #f8f9fa;
    }
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
  background-color: #f0f0f0; /* Thay đổi màu nền tiêu đề */
  color: #333; /* Thay đổi màu chữ */
`;