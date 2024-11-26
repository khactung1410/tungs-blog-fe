import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import { studentActions, classActions } from '../../redux/actions';
import { TooltipWrapper, TooltipContent, FormWrapper, StudentsContainer, StyledButton, StyledTableHeader, HeaderButtonsContainer, FilterInput, StyledTable, TableContainer } from './StudentsManage.styled';
import ConfirmationPopup from '../Common/ConfirmationPopup';

const StudentsManage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: null as string | null,
    phoneNumber: '',
    fbLink: '',
    note: '',
    classId: '',
    startDate: null as string | null,
    id: null as number | null,
  });
  const isDisabled = !formData.name || !formData.classId;
  const [searchTerm, setSearchTerm] = useState('');  // State để lưu từ khoá tìm kiếm

  const classes = useAppSelector((state: any) => state.classes.classesList);
  const students = useAppSelector((state: any) => state.students.studentsList);

  useEffect(() => {
    dispatch(classActions.getAll());
    dispatch(studentActions.getAll());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedDate = value ? new Date(value).toISOString() : null;
    setFormData({ ...formData, [name]: formattedDate });
  };

  const handleCreateStudent = () => {
    const updatedFormData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth || null,
      startDate: formData.startDate || null,
    };
    dispatch(studentActions.createStudent(updatedFormData)).then(() => {
      dispatch(studentActions.getAll());
    });
    resetForm();
  };

  const handleUpdateStudent = () => {
    const updatedFormData = {
      ...formData,
      dateOfBirth: formData.dateOfBirth || null,
      startDate: formData.startDate || null,
    };
    dispatch(studentActions.updateStudent(updatedFormData));
    resetForm();
  };

  const handleDeleteStudent = (studentId: number) => {
    dispatch(studentActions.deleteStudent(studentId));
    setShowDeletePopup(false);
    setStudentToDelete(null);
  };

  const handleUpdateStudentListFromExcel = () => {
    dispatch(studentActions.addStudentListFromGoogleSheet());
    setShowUpdatePopup(false);
  };
  const handleOpenStudentInformation = (id: string) => {
    // Mở trang mới với đường dẫn có `id`
    window.open(`/students-manage/${id}`, '_blank');
  };

  const handleEditStudent = (student: any) => {
    setFormData({
      name: student.name,
      dateOfBirth: student.dateOfBirth,
      phoneNumber: student.phoneNumber,
      fbLink: student.fbLink,
      note: student.note,
      classId: student.classId,
      startDate: student.startDate,
      id: student.id,
    });
    setFormVisible(true);
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      dateOfBirth: null,
      phoneNumber: '',
      fbLink: '',
      note: '',
      classId: '',
      startDate: null,
      id: null,
    });
    setFormVisible(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Filter students based on searchTerm
  const filteredStudents = students.filter((student: any) => {
    const searchStr = searchTerm.toLowerCase();
    const studentName = student.name ? student.name.toLowerCase() : '';
    const studentPhone = student.phoneNumber ? student.phoneNumber.toLowerCase() : '';
    const studentFbLink = student.fbLink ? student.fbLink.toLowerCase() : '';
    const studentDob = student.dateOfBirth ? formatDate(student.dateOfBirth).toLowerCase() : '';
    const studentStartDate = student.startDate ? formatDate(student.startDate).toLowerCase() : '';
    const studentCreatedDate = student.createdDate ? formatDate(student.createdDate).toLowerCase() : '';
    const studentClass = classes.find((cls: any) => cls.id === student.classId);
    const className = studentClass ? studentClass.name.toLowerCase() : '';
    
    return (
      student.id.toString().includes(searchStr) ||
      studentName.includes(searchStr) ||
      studentPhone.includes(searchStr) ||
      studentFbLink.includes(searchStr) ||
      studentDob.includes(searchStr) ||
      studentStartDate.includes(searchStr) ||
      studentCreatedDate.includes(searchStr) ||
      className.includes(searchStr)
    );
  });

  return (
    <StudentsContainer>
      <HeaderButtonsContainer>
        <div>
          <StyledButton
            color="primary"
            onClick={() => setFormVisible(true)}
            disabled={formVisible}
          >
            Thêm Học Sinh
          </StyledButton>
          <StyledButton
            color="info"
            onClick={() => setShowUpdatePopup(true)}
            style={{ marginLeft: '10px' }}
          >
            Cập nhật Học Sinh (Excel)
          </StyledButton>
        </div>
        <FilterInput
          type="text"
          placeholder="Tìm kiếm học sinh..."
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </HeaderButtonsContainer>

      {formVisible && (
        <FormWrapper>
          <Form>
            <FormGroup>
              <Label for="name">
                Tên Học Sinh<span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dateOfBirth">Ngày Sinh</Label>
              <Input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}
                onChange={handleDateChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Số Điện Thoại</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="fbLink">Link Facebook</Label>
              <Input
                type="text"
                name="fbLink"
                id="fbLink"
                value={formData.fbLink}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="note">Ghi chú (NOTE) :</Label>
              <Input
                type="text"
                name="note"
                id="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="classId">
                Lớp<span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                type="select"
                name="classId"
                id="classId"
                value={formData.classId}
                onChange={handleInputChange}
              >
                <option value="">Chọn Lớp</option>
                {classes.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Ngày Bắt Đầu Học</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={formData.startDate ? formData.startDate.split('T')[0] : ''}
                onChange={handleDateChange}
              />
            </FormGroup>
            <StyledButton
              color="success"
              onClick={formData.id ? handleUpdateStudent : handleCreateStudent}
              disabled={isDisabled}
            >
              {formData.id ? 'Cập Nhật Học Sinh' : 'Thêm Học Sinh'}
            </StyledButton>
            <StyledButton
              color="secondary"
              onClick={resetForm}
              style={{ marginLeft: '10px' }}
            >
              Hủy
            </StyledButton>
          </Form>
        </FormWrapper>
      )}
    <TableContainer>
      <StyledTable striped>
        <thead>
          <tr>
            <StyledTableHeader>ID</StyledTableHeader>
            <StyledTableHeader>Tên Học Sinh</StyledTableHeader>
            <StyledTableHeader>Lớp</StyledTableHeader>
            <StyledTableHeader>Ghi chú</StyledTableHeader>
            <StyledTableHeader>Ngày Sinh</StyledTableHeader>
            <StyledTableHeader>Số Điện Thoại</StyledTableHeader>
            <StyledTableHeader>Link Facebook</StyledTableHeader>
            <StyledTableHeader>Ngày Bắt Đầu</StyledTableHeader>
            <StyledTableHeader>Ngày Thêm</StyledTableHeader>
            <StyledTableHeader>Cập Nhật</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student: any) => {
            const studentClass = classes.find((cls: any) => cls.id === student.classId);
            return (
              <tr key={student.id}>
                <td
                  style={{ cursor: 'pointer', color: 'red' }} 
                  onClick={() => handleOpenStudentInformation(student.id)}
                >
                  {student.id}
                </td>
                <td
                  style={{ cursor: 'pointer', color: 'red' }} 
                  onClick={() => handleOpenStudentInformation(student.id)}
                >
                  {student.name}
                </td>
                <td>{studentClass ? studentClass.name : 'Không có lớp'}</td>
                <td>
                {student.note ? 
                    <TooltipWrapper>
                        Xem ghi chú
                        {/* Đây là phần tử chứa nội dung có thể chỉnh sửa */}
                        <TooltipContent
                            className="tooltip-content"
                            contentEditable={true}
                        >
                            {student.note}
                        </TooltipContent>
                    </TooltipWrapper>: ''
                }
                </td>
                <td>{student.dateOfBirth ? formatDate(student.dateOfBirth): ''}</td>
                <td>
                {student.phoneNumber ? 
                    <TooltipWrapper>
                        Xem SĐT
                        {/* Đây là phần tử chứa nội dung có thể chỉnh sửa */}
                        <TooltipContent
                            className="tooltip-content"
                            contentEditable={true}
                        >
                            {student.phoneNumber}
                        </TooltipContent>
                    </TooltipWrapper>: ''
                }
                </td>
                <td>
                  {student.fbLink ? <a href={student.fbLink} target="_blank" rel="noopener noreferrer">here</a> : ''}
                </td>
                <td>{student.startDate ? formatDate(student.startDate) : ''}</td>
                <td>{student.createdDate ? formatDate(student.createdDate) : ''}</td>
                <td>
                  <Button color="warning" onClick={() => handleEditStudent(student)}>Sửa</Button>
                  <Button color="danger" onClick={() => {
                    setStudentToDelete(student);
                    setShowDeletePopup(true);
                  }}>
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </TableContainer>
    <p>Số học sinh: {filteredStudents.length}</p>

      {/* Popup xác nhận xóa và cập nhật học sinh */}
      {showDeletePopup && studentToDelete && (
            <ConfirmationPopup
                isOpen={showDeletePopup}
                onClose={() => setShowDeletePopup(false)}
                title={`Xác nhận xóa học sinh: ${studentToDelete?.name} - id: ${studentToDelete?.classId}`}
                message={
                    <>
                        Lưu ý: Khi Xóa, học sinh này chỉ xóa trong Database, vẫn sẽ còn trong file Excel!<br />
                        Link file excel: <a href="https://docs.google.com/spreadsheets/d/1vf--cgdKLupf1nLHySAazN2RvTZtfF9EwphoJ7BaB0A/edit?gid=1525671082#gid=1525671082" target="_blank">Nhấn vào đây để xem file Excel</a>
                    </>
                }
                onConfirm={() => handleDeleteStudent(studentToDelete?.id)}
            />
      )}
      {showUpdatePopup && (
            <ConfirmationPopup
                isOpen={showUpdatePopup}
                onClose={() => setShowUpdatePopup(false)}
                title="Xác nhận cập nhật học sinh từ file Excel"
                message="Bạn muốn cập nhật danh sách học sinh từ file Excel? Thao tác này không thể hoàn tác."
                onConfirm={() => handleUpdateStudentListFromExcel()}
            />
      )}
    </StudentsContainer>
  );
};

export default StudentsManage;

