import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';
import styled from 'styled-components';
import { studentActions, classActions } from '../../redux/actions';

const StudentsContainer = styled.div`
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

const StudentsManage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: null as string | null,
        phoneNumber: '',
        fbLink: '',
        classId: '',
        startDate: null as string | null,
        id: null as number | null,
    });

    const classes = useAppSelector((state: any) => state.classes.classesList);
    const students = useAppSelector((state: any) => state.students.studentsList);

    useEffect(() => {
        dispatch(classActions.getAll());
        dispatch(studentActions.getAll());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle the date change for both dateOfBirth and startDate
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
        dispatch(studentActions.createStudent(updatedFormData));
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
        resetForm();
    };

    const handleEditStudent = (student: any) => {
        setFormData({
            name: student.name,
            dateOfBirth: student.dateOfBirth,
            phoneNumber: student.phoneNumber,
            fbLink: student.fbLink,
            classId: student.classId,
            startDate: student.startDate,
            id: student.id,
        });
        setFormVisible(true);
    };

    const resetForm = () => {
        setFormData({
            name: '',
            dateOfBirth: null,
            phoneNumber: '',
            fbLink: '',
            classId: '',
            startDate: null,
            id: null,
        });
        setFormVisible(false);
    };

    // Function to format the date to dd-mm-yyyy
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <StudentsContainer>
            <StyledButton
                color="primary"
                onClick={() => setFormVisible(true)}
                disabled={formVisible}
            >
                Thêm Học Sinh
            </StyledButton>
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
                                value={formData.dateOfBirth ? formData.dateOfBirth.split('T')[0] : ''}  // Display only the date part
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
                            <Label for="classId">
                                Lớp<span style={{ color: 'red' }}>*</span>:
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
                                value={formData.startDate ? formData.startDate.split('T')[0] : ''}  // Display only the date part
                                onChange={handleDateChange}
                            />
                        </FormGroup>
                        <Button
                            color="success"
                            onClick={formData.id ? handleUpdateStudent : handleCreateStudent}
                            disabled={!formData.name || !formData.classId} // Disable if name or classId is empty
                        >
                            {formData.id ? 'Cập Nhật Học Sinh' : 'Lưu Học Sinh'}
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
                        <StyledTableHeader>Tên Học Sinh</StyledTableHeader>
                        <StyledTableHeader>Lớp</StyledTableHeader> {/* Added class column */}
                        <StyledTableHeader>Ngày Sinh</StyledTableHeader>
                        <StyledTableHeader>Số Điện Thoại</StyledTableHeader>
                        <StyledTableHeader>Link Facebook</StyledTableHeader>
                        <StyledTableHeader>Ngày Bắt Đầu</StyledTableHeader>
                        <StyledTableHeader>Ngày Thêm</StyledTableHeader>
                        <StyledTableHeader>Cập Nhật</StyledTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student: any) => {
                        const studentClass = classes.find((cls: any) => cls.id === student.classId);

                        return (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{studentClass ? studentClass.name : 'Không có lớp'}</td> {/* Display class name */}
                                <td>{formatDate(student.dateOfBirth)}</td> {/* Format date */}
                                <td>{student.phoneNumber}</td>
                                <td><a href={student.fbLink} target="_blank" rel="noopener noreferrer">here</a></td>
                                <td>{formatDate(student.startDate)}</td> {/* Format date */}
                                <td>{formatDate(student.createdDate)}</td> {/* Format date */}
                                <td>
                                    <Button color="warning" onClick={() => handleEditStudent(student)}>Sửa</Button>
                                    <Button color="danger" onClick={() => handleDeleteStudent(student.id)}>Xoá</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </StudentsContainer>
    );
};

export default StudentsManage;
