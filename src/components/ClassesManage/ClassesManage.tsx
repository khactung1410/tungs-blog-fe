import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Button, Table, Container, Form, FormGroup, Label, Input } from 'reactstrap';
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
  background-color: #f0f0f0; /* Thay đổi màu nền tiêu đề */
  color: #333; /* Thay đổi màu chữ */
`;

const ClassesManage: React.FC = () => {
    const dispatch = useDispatch();
    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        className: '',
        teacherId: '',
        perSessionFee: '',
        perMonthFee: '',
        notes: '',
        id: null as number | null,
    });

    const classesMock = [
        {
            id: 1,
            className: 'Toán 12A1',
            teacherId: 1,
            teacherName: 'Nguyễn Văn A',
            perSessionFee: 100000,
            perMonthFee: 1200000,
            notes: 'Lớp ôn thi đại học.',
        },
        {
            id: 2,
            className: 'Văn 10B2',
            teacherId: 2,
            teacherName: 'Trần Thị B',
            perSessionFee: 80000,
            perMonthFee: 960000,
            notes: 'Lớp bồi dưỡng văn học.',
        },
        {
            id: 3,
            className: 'Anh Văn 11C3',
            teacherId: 3,
            teacherName: 'Lê Văn C',
            perSessionFee: 90000,
            perMonthFee: 1080000,
            notes: 'Lớp nâng cao kỹ năng giao tiếp.',
        },
    ];

    const teachersMock = [
        { id: 1, name: 'Nguyễn Văn A' },
        { id: 2, name: 'Trần Thị B' },
        { id: 3, name: 'Lê Văn C' },
    ];

    const { teachers, classes } = useSelector((state: RootState) => ({
        teachers: teachersMock,
        classes: classesMock,
    }));

    useEffect(() => {
        // dispatch(userActions.getAllTeachers());
        // dispatch(classActions.getAllClasses());
    }, [dispatch]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCreateClass = () => {
        // dispatch(classActions.createClass(formData));
        resetForm();
    };

    const handleUpdateClass = () => {
        // dispatch(classActions.updateClass(formData));
        resetForm();
    };

    const handleEditClass = (cls: any) => {
        setFormData({
            className: cls.className,
            teacherId: cls.teacherId,
            perSessionFee: cls.perSessionFee,
            perMonthFee: cls.perMonthFee,
            notes: cls.notes,
            id: cls.id,
        });
        setFormVisible(true);
    };

    const resetForm = () => {
        setFormData({
            className: '',
            teacherId: '',
            perSessionFee: '',
            perMonthFee: '',
            notes: '',
            id: null,
        });
        setFormVisible(false);
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
                            <Label for="className">Tên Lớp</Label>
                            <Input
                                type="text"
                                name="className"
                                id="className"
                                value={formData.className}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="teacherId">Giáo viên</Label>
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
                                        {teacher.name}
                                    </option>
                                ))}
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="perSessionFee">Học phí 1 buổi (Nếu có):</Label>
                            <Input
                                type="number"
                                name="perSessionFee"
                                id="perSessionFee"
                                value={formData.perSessionFee}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="perMonthFee">Học phí 1 tháng (Nếu có):</Label>
                            <Input
                                type="number"
                                name="perMonthFee"
                                id="perMonthFee"
                                value={formData.perMonthFee}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Ghi chú</Label>
                            <Input
                                type="textarea"
                                name="notes"
                                id="notes"
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <Button
                            color="success"
                            onClick={formData.id ? handleUpdateClass : handleCreateClass}
                        >
                            {formData.id ? 'Cập Nhật Lớp Học' : 'Lưu Lớp Học'}
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
                            <td>{cls.className}</td>
                            <td>{cls.teacherName}</td>
                            <td>{cls.perSessionFee}</td>
                            <td>{cls.perMonthFee}</td>
                            <td>{cls.notes}</td>
                            <td>
                                <Button color="warning" onClick={() => handleEditClass(cls)}>Sửa</Button>
                                <Button color="danger">Xoá</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ClassesContainer>
    );
};

export default ClassesManage;
