/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import React, { FormEventHandler } from 'react';
import InputField from '../Common/InputField';
import { FormSection } from './Home.styled';
import { useState } from 'react';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import my_avatar from '../../images/tung_english_avatar.png';
import { useAppSelector } from '../../hooks';

// Styled-components
const AttendanceContainer = styled(Container)`
  margin-top: 20px;
`;

const StatusBadge = styled.span`
  color: red;
`;

const AttendanceTable = styled(Table)`
  margin-top: 20px;
`;

const AttendanceForm = styled(Form)`
  margin-bottom: 20px;
`;

// Dummy data for students
const students = [
  { id: 1, name: 'Nguyễn Hoài An', dob: '13/09/2008', status: 'Chưa thông báo' },
  { id: 2, name: 'Đặng Phương Anh', dob: '30/07/2008', status: 'Chưa thông báo' },
  { id: 3, name: 'Trần Minh Anh', dob: '05/01/2008', status: 'Chưa thông báo' },
  { id: 4, name: 'Phạm Bảo Châu', dob: '23/02/2008', status: 'Chưa thông báo' },
  { id: 5, name: 'Lê Tuấn Kiệt', dob: '12/03/2008', status: 'Chưa thông báo' },
  { id: 6, name: 'Hoàng Thanh Hà', dob: '29/04/2008', status: 'Chưa thông báo' },
  { id: 7, name: 'Vũ Thùy Dương', dob: '10/05/2008', status: 'Chưa thông báo' },
  { id: 8, name: 'Bùi Gia Bảo', dob: '21/06/2008', status: 'Chưa thông báo' },
  { id: 9, name: 'Đỗ Ngọc Huyền', dob: '19/07/2008', status: 'Chưa thông báo' },
  { id: 10, name: 'Ngô Thanh Tùng', dob: '08/08/2008', status: 'Chưa thông báo' },
];
type AttendanceType = 'present' | 'excused' | 'unexcused';


const HomePage: React.FC = () => {
  const [attendance, setAttendance] = useState(
    students.map(student => ({
      ...student,
      present: true,
      excused: false,
      unexcused: false,
    }))
  );
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);
  
  const handleAttendanceChange = (index: number, type: AttendanceType) => {
    const newAttendance = [...attendance];
    newAttendance[index] = {
      ...newAttendance[index],
      present: type === 'present',
      excused: type === 'excused',
      unexcused: type === 'unexcused',
    };
    setAttendance(newAttendance);
  };
  return (
    <>
      {!isUserLoggedIn && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          margin: 0
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '105px' }} />
            <div>WELCOME TO HOME PAGE</div>
          </div>
        </div>
      )}
      {isUserLoggedIn && (
        <AttendanceContainer>
        <div style={{ height: '105px' }} />
        <h2>Điểm danh</h2>
        <AttendanceForm>
        <Row>
            <Col md="4">
              <Form.Group>
                <Form.Label>Chọn lớp</Form.Label>
                <Form.Control as="select">
                  <option>8A</option>
                  {/* Add more classes as needed */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <Form.Label>Chọn ngày</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <Button variant="success" className="w-100">
                  Thông báo cho PH
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </AttendanceForm>
        <AttendanceTable striped bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Ngày sinh</th>
              <th>Có mặt</th>
              <th>Nghỉ có phép</th>
              <th>Nghỉ không phép</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>
                  <Form.Check
                    type="radio"
                    checked={student.present}
                    onChange={() => handleAttendanceChange(index, 'present')}
                  />
                </td>
                <td>
                  <Form.Check
                    type="radio"
                    checked={student.excused}
                    onChange={() => handleAttendanceChange(index, 'excused')}
                  />
                </td>
                <td>
                  <Form.Check
                    type="radio"
                    checked={student.unexcused}
                    onChange={() => handleAttendanceChange(index, 'unexcused')}
                  />
                </td>
                <td>
                  <StatusBadge>{student.status}</StatusBadge>
                </td>
              </tr>
            ))}
          </tbody>
        </AttendanceTable>
      </AttendanceContainer>)}
    </>
  );
};

export default HomePage;
