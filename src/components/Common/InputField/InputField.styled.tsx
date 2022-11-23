import styled from 'styled-components';

export const LabelOfInput = styled.p`
  font-family: Montserrat, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  user-select: none;
`;

export const Input = styled.input<{
  error: boolean;
}>`
  width: 122px;
  height: 51px;
  padding: 15px;
  font-size: 14px;
  line-height: 17px;
  outline: none;
  border: ${(props) => (props.error ? '1px solid #ff0000' : '1px solid #d4dbf5')};
  border-radius: 4px;
`;
