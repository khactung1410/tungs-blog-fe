import React from 'react';
import { useParams } from 'react-router-dom';

const StudentInformation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Student Information</h1>
      <p>Student ID: {id}</p>
      {/* Bạn có thể thêm thông tin chi tiết của học sinh ở đây */}
    </div>
  );
};

export default StudentInformation;