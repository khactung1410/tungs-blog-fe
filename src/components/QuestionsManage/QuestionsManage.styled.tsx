import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  margin-left: 250px; //cách lề trái để tránh bị Header che mất.
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
`;

// Thu ngắn selection của "Loại câu hỏi"
export const ShortDropdown = styled(Dropdown)`
  width: 300px; /* Giảm độ rộng của dropdown "Loại câu hỏi" */
`;

export const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  margin-left: 20px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row; 
  gap: 15px;
  align-items: center;
`;

export const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1; 
  
  label {
    margin: 0;
    min-width: 120px;  
  }
`;

export const RadioGroupWrapper = styled.div`
  margin-top: 20px; /* Tăng margin-top để tạo khoảng cách cho dòng "Lớp" */
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

export const RowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
