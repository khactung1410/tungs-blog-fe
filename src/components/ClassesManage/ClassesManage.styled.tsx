import styled from 'styled-components';
import { Container } from 'reactstrap';

export const ClassesContainer = styled(Container)`
    padding: 20px;
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
