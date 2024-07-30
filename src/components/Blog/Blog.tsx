import React, { FormEventHandler } from 'react';
import InputField from '../Common/InputField';
import { FormSection } from './Blog.styled';
import { useState } from 'react';
import styled from 'styled-components';
import { Table, Form, Button, Container, Row, Col } from 'react-bootstrap';
import my_avatar from '../../images/tung_english_avatar.png';

export const HomeWrapper = styled.div`
  padding: 0px 0px;
`;

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


const Blog: React.FC = () => {


  return (
    <HomeWrapper>
    <div style={{ height: '100px' }} />
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginLeft: '40px' }}>
      {Array.from(Array(10).keys()).map((key) => (
        <div key={key} className="single-blog-wrapper">
          <div className="blog-card blog-card-blog">
            <div className="blog-card-image">
              <img
                className="img"
                alt="..."
                src="https://picsum.photos/id/1084/535/353?grayscale"
              />
              <div className="ripple-cont" />
            </div>
            <div className="blog-table">
              <h6 className="blog-category blog-text-success">
                <i className="far fa-newspaper" /> Active
              </h6>
              <h4 className="blog-card-caption">
                Lớp 3A
              </h4>
              <p className="blog-card-description">
                Ghi chú: ......
              </p>
              <div className="ftr">
                <div className="author">
                  <p>
                    <img
                      src={my_avatar}
                      alt="..."
                      className="avatar img-raised"
                    />
                    <span>GVCN: TungDK</span>
                  </p>
                </div>
                <div className="stats">
                  <i className="far fa-clock" /> Sĩ số:
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </HomeWrapper>
  );
};

export default Blog;
