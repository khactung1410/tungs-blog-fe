import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  AttendanceContainer,
  ActionBar,
  StyledTable,
  ModalContent,
  ButtonStyled,
  FilterForm,
  FormGroupStyled,
  ScrollableTableWrapper,
  StyledModal,
} from './AttendanceManage.styled';
import { studentActions, classActions, attendanceActions } from '../../redux/actions';

interface StudentAttributes {
  id: number;
  name: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  fbLink?: string;
  note?: string;
  classId: number;
  startDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
interface AttendanceSessionAttributes {
  id: number;
  classId: number;
  date: Date;
  createdByTeacherId: number;
  lastUpdatedByTeacherId: number;
  note?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AttendanceManage: React.FC = () => {
  const dispatch = useAppDispatch();

  // const attendanceSessions = [
  //   {
  //     id: 1,
  //     classId: 1,
  //     date: new Date('2024-11-01'),
  //     createdByTeacherId: 101,
  //     lastUpdatedByTeacherId: 102,
  //     note: 'Điểm danh tháng 11',
  //     createdAt: new Date('2024-11-01'),
  //     updatedAt: new Date('2024-11-05'),
  //   },
  //   {
  //     id: 2,
  //     classId: 2,
  //     date: new Date('2024-11-10'),
  //     createdByTeacherId: 103,
  //     lastUpdatedByTeacherId: 104,
  //     note: 'Điểm danh đặc biệt',
  //     createdAt: new Date('2024-11-10'),
  //     updatedAt: new Date('2024-11-11'),
  //   },
  // ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchText, setSearchText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentAttributes[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);


  const classes = useAppSelector((state: any) => state.classes.classesList);
  const students = useAppSelector((state: any) => state.students.studentsList);
  const attendanceSessions = useAppSelector((state: any) => state.attendanceSessions.attendanceSessionsList);

  useEffect(() => {
    dispatch(classActions.getAll());
    dispatch(studentActions.getAll());
    console.log('Fetching attendance sessions...');
    dispatch(attendanceActions.getAllAttendanceSessions());
  }, [dispatch]);

  // useEffect mới để reset selectedStudents khi lớp thay đổi
  useEffect(() => {
    if (selectedClass) {
      setFilteredStudents(students.filter((student: StudentAttributes) => student.classId === Number(selectedClass)));
      // Reset selected students khi chọn lớp mới
      setSelectedStudents([]);
    } else {
      setFilteredStudents([]);
    }
    // Reset selectedStudents when class changes
    setSelectedStudents([]); // This will reset the "Select All" checkbox
  }, [selectedClass, students]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleCreateAttendance = () => {
    // Lấy danh sách học sinh và trạng thái checkbox
    const attendanceSessionListStudentList = filteredStudents.map((student) => ({
      studentId: student.id,
      isPresent: selectedStudents.includes(student.id) ? 1 : 0, // true -> 1, false -> 0
    }));
  
    // Dispatch action với thông tin lớp, ngày điểm danh và danh sách học sinh
    dispatch(
      attendanceActions.createAttendanceSession(
        Number(selectedClass), // classId
        selectedDate, // date
        attendanceSessionListStudentList, // danh sách học sinh,
        userInfo.id,
        userInfo.id
      )
    );
  
    // Đóng modal sau khi tạo điểm danh
    toggleModal();
  };
  

  return (
    <AttendanceContainer>
      <ActionBar className="action-bar">
        <ButtonStyled color="primary" onClick={toggleModal}>
          Tạo Điểm Danh
        </ButtonStyled>
        <FilterForm inline>
          <FormGroupStyled>
            <Label for="classSelect">Lớp</Label>
            <Input
              type="select"
              name="classSelect"
              id="classSelect"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Chọn Lớp</option>
              {classes.map((cls: any) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </Input>
          </FormGroupStyled>

          <FormGroupStyled>
            <Label for="monthSelect">Tháng</Label>
            <Input
              type="select"
              id="monthSelect"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Tháng {i + 1}
                </option>
              ))}
            </Input>
          </FormGroupStyled>

          <FormGroupStyled style={{ display: 'flex', alignItems: 'center' }}>
            <Label for="search" style={{ marginRight: '10px' }}>Tìm kiếm</Label>
            <Input
              type="text"
              id="search"
              placeholder="Nhập từ khóa"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </FormGroupStyled>
        </FilterForm>
      </ActionBar>

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Lớp</th>
            <th>Ngày điểm danh</th>
            <th>GV điểm danh</th>
            <th>Ghi chú</th>
            <th>Ngày tạo</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {attendanceSessions.map((session: AttendanceSessionAttributes) => (
            <tr key={session.id}>
              <td>{session.id}</td>
              <td>{session.classId}</td>
              <td>{new Date(session.date).toLocaleDateString()}</td>
              <td>{session.createdByTeacherId}</td>
              <td>{session.note}</td>
              <td>{session.createdAt?.toString()}</td>
              <td>
                <Button color="info" size="sm" onClick={() => console.log('Edit')}>
                  Sửa
                </Button>{' '}
                <Button color="danger" size="sm" onClick={() => console.log('Delete')}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <StyledModal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Tạo điểm danh</ModalHeader>
        <ModalBody>
  <ModalContent>
    {/* Căn chỉnh hai trường "Lớp" và "Điểm danh ngày" */}
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'flex-start' }}>
      {/* Trường Lớp */}
      <FormGroup style={{ width: '150px' }}>
        <Label for="classSelectModal" style={{ display: 'block', marginBottom: '5px' }}>
          Lớp
        </Label>
        <Input
          type="select"
          name="classSelect"
          id="classSelectModal"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Chọn Lớp</option>
          {classes.map((cls: any) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </Input>
      </FormGroup>

      {/* Trường Điểm danh ngày */}
      <FormGroup style={{ width: '180px' }}>
        <Label for="attendanceDate" style={{ display: 'block', marginBottom: '5px' }}>
          Điểm danh ngày
        </Label>
        <Input
          type="date"
          name="attendanceDate"
          id="attendanceDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </FormGroup>
    </div>

    {/* Bảng chọn học sinh */}
    <ScrollableTableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>
              <div style={{ textAlign: 'center' }}>
                <Label style={{ display: 'block' }}>Chọn tất cả</Label>
                <Input
                  type="checkbox"
                  checked={filteredStudents.length > 0 && selectedStudents.length === filteredStudents.length}
                  onChange={(e) =>
                    setSelectedStudents(
                      e.target.checked ? filteredStudents.map((s: any) => s.id) : []
                    )
                  }
                />
              </div>
            </th>
            <th>Tên</th>
            <th>Lớp</th>
            <th>Ảnh</th>
            <th>Ghi chú</th>
            <th>SĐT</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student: StudentAttributes) => {
            const className = classes.find((cls: any) => cls.id === student.classId)?.name || '';
            return (
              <tr key={student.id}>
                <td>
                  <Input
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(
                          selectedStudents.filter((id) => id !== student.id)
                        );
                      }
                    }}
                  />
                </td>
                <td>{student.name}</td>
                <td>{className}</td>
                <td>
                  <img
                    src={student.fbLink || ''}
                    alt={student.name}
                    width={50}
                    style={{ borderRadius: '5px' }}
                  />
                </td>
                <td>{student.note}</td>
                <td>{student.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </ScrollableTableWrapper>
  </ModalContent>
</ModalBody>


        <ModalFooter>
          <Button color="primary" onClick={handleCreateAttendance}>
            Tạo
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Hủy
          </Button>
        </ModalFooter>
      </StyledModal>
    </AttendanceContainer>
  );
};

export default AttendanceManage;
