import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;

  label {
    margin: 0;
  }
`;

export const RadioGroupWrapper = styled.div`
  margin-bottom: 15px;
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  td {
    div {
      display: flex;
      gap: 15px;
    }

    strong {
      font-weight: bold;
    }
  }
`;

export const NoteText = styled.p`
  font-size: 14px;
  color: #555;
`;
