import styled from 'styled-components';
import {
  Table,
} from 'reactstrap';

export const FormSection = styled.div`
  display: flex;
  width: 723px;
  flex-direction: row;
  gap: 30px;
`;

export const TuitionContainer = styled.div`
  padding: 20px;
`;
export const StyledTable = styled(Table)`
  border: 0.8px solid #000 !important; /* Tăng độ đậm của viền */
  th,
  td {
    border: 0.8px solid #000 !important; /* Tăng độ đậm viền các ô */
  }
`;