/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { pathConstants } from '../../constants';
import { userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

// Styled-components
const AttendanceContainer = styled(Container)`
  margin-top: 20px;
`;

const AttendanceForm = styled(Form)`
  margin-bottom: 20px;
`;

const StudentPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);

  const onLogout = () => {
    dispatch(userActions.logout());
    navigate(pathConstants.ROOT);
  };
  return (
    <>
      <AttendanceContainer>
        <div style={{ height: '10px' }} />
        <h2>Page này học sinh sau khi đăng nhập vào sẽ để làm bài tập</h2>
        <AttendanceForm>
          <Col md="4">
              <Form.Group>
              <Form.Label>&nbsp;</Form.Label>
              <Button onClick={onLogout} variant="success" className="w-100">
                  Log out
              </Button>
              </Form.Group>
          </Col>
        </AttendanceForm>
      </AttendanceContainer>
    </>
  );
};

export default StudentPage;
