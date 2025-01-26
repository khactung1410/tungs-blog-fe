import styled from 'styled-components';
import { Tab } from 'react-bootstrap';

export const FormSection = styled.div`
  display: flex;
  width: 723px;
  flex-direction: row;
  gap: 30px;
`;
export const TabContainer = styled.div`
  margin-top: 20px;
`;

export const Title = styled.p`
  font-weight: bold;
  margin-top: 20px;
`;

export const StyledTab = styled(Tab)`
  &.nav-link {
    color: #000;
  }
`;

export const NumberInput = styled.input`
  width: 80px;
`;
