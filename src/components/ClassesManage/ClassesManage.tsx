import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import { classActions, userActions } from '../../redux/actions';

const ClassesContainer = styled.div`
  padding: 20px;
`;

const FormWrapper = styled.div`
  margin-bottom: 20px;
  border: 2px solid #ccc;
  padding: 15px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 20px;
`;

const StyledTableHeader = styled.th`
  background-color: #f0f0f0;
  color: #333;
`;

const RequiredAsterisk = styled.span`
  color: red;
  margin-left: 5px;
`;

const ClassesManage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    sessionFee: null as number | null,
    monthlyFee: null as number | null,
    note: '',
    id: null as number | null,
  });
  const classes = useAppSelector((state: any) => state.classes.classesList);
  const teachers = useAppSelector((state: any) => state.users.items);

  useEffect(() => {
    dispatch(userActions.getAllTeachers());
    dispatch(classActions.getAll());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newValue = (name === 'sessionFee' || name === 'monthlyFee') && value === '' ? null : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const getTeacherUserName = (teacherId: number): string | undefined => {
    const teacher = teachers.find((t: any) => t.id === teacherId);
    return teacher ? teacher.userName : undefined;
  };

  const isFormValid = () => {
    return formData.name.trim() !== '' && formData.teacherId !== '';
  };

  const handleCreateClass = () => {
    if (!isFormValid()) return;
    dispatch(classActions.createClass(formData));  // Tạo lớp học mới
    resetForm();
  };

  const handleUpdateClass = () => {
    if (!isFormValid() || formData.id === null) return;
    dispatch(classActions.updateClass(formData));  // Cập nhật lớp học đã có
    resetForm();
  };

  const handleDeleteClass = (classID: number) => {
    dispatch(classActions.deleteClass(classID));
    resetForm();
  };

  const handleEditClass = (cls: any) => {
    // Cập nhật dữ liệu cho form khi nhấn "Sửa"
    setFormData({
      name: cls.name,
      teacherId: cls.teacherId,
      sessionFee: cls.sessionFee,
      monthlyFee: cls.monthlyFee,
      note: cls.note || '',
      id: cls.id,  // Lưu id của lớp để cập nhật sau này
    });
    setFormVisible(true);  // Hiển thị form khi sửa
  };

  const resetForm = () => {
    setFormData({
      name: '',
      teacherId: '',
      sessionFee: null,
      monthlyFee: null,
      note: '',
      id: null,
    });
    setFormVisible(false);  // Ẩn form sau khi tạo hoặc cập nhật
  };

  return (
    <ClassesContainer>
      <StyledButton
        color="primary"
        onClick={() => setFormVisible(true)}
        disabled={formVisible}
      >
        Tạo Lớp Học
      </StyledButton>

      {formVisible && (
        <FormWrapper>
          <Form>
            <FormGroup>
              <Label for="name">
                Tên Lớp
                <RequiredAsterisk>*</RequiredAsterisk>
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
              <Label for="teacherId">
                Giáo viên
                <RequiredAsterisk>*</RequiredAsterisk>
              </Label>
              <Input
                type="select"
                name="teacherId"
                id="teacherId"
                value={formData.teacherId}
                onChange={handleInputChange}
              >
                <option value="">Chọn Giáo viên</option>
                {teachers.map((teacher: any) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.userName}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="sessionFee">Học phí 1 buổi (Nếu có):</Label>
              <Input
                type="number"
                name="sessionFee"
                id="sessionFee"
                value={formData.sessionFee !== null ? formData.sessionFee : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="monthlyFee">Học phí 1 tháng (Nếu có):</Label>
              <Input
                type="number"
                name="monthlyFee"
                id="monthlyFee"
                value={formData.monthlyFee !== null ? formData.monthlyFee : ''}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Ghi chú</Label>
              <Input
                type="textarea"
                name="note"
                id="note"
                value={formData.note}
                onChange={handleInputChange}
              />
            </FormGroup>
            <Button
              color="success"
              onClick={formData.id !== null ? handleUpdateClass : handleCreateClass} // Cập nhật khi có id
              disabled={!isFormValid()}
            >
              {formData.id !== null ? 'Cập Nhật Lớp Học' : 'Lưu Lớp Học'}
            </Button>
            <Button
              color="secondary"
              onClick={resetForm}
            >
              Huỷ
            </Button>
          </Form>
        </FormWrapper>
      )}

      <Table>
        <thead>
          <tr>
            <StyledTableHeader>ID</StyledTableHeader>
            <StyledTableHeader>Tên Lớp</StyledTableHeader>
            <StyledTableHeader>Tên GVCN</StyledTableHeader>
            <StyledTableHeader>Học Phí theo buổi</StyledTableHeader>
            <StyledTableHeader>Học Phí theo tháng</StyledTableHeader>
            <StyledTableHeader>Ghi chú</StyledTableHeader>
            <StyledTableHeader>Cập Nhật</StyledTableHeader>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls: any) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{getTeacherUserName(cls.teacherId)}</td>
              <td>{cls.sessionFee}</td>
              <td>{cls.monthlyFee}</td>
              <td>{cls.note}</td>
              <td>
                <Button color="warning" onClick={() => handleEditClass(cls)}>Sửa</Button>
                <Button color="danger" onClick={() => handleDeleteClass(cls.id)}>Xoá</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ClassesContainer>
  );
};

export default ClassesManage;
