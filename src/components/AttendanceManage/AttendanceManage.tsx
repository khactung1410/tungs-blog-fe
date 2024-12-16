import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
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
import { studentActions, classActions, attendanceActions, userActions } from '../../redux/actions';
import { attendanceStudentRecordActions } from '../../redux/actions/attendanceStudentRecord.actions';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchText, setSearchText] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [isEditing, setIsEditing] = useState(false);  // Trạng thái modal: sửa hay tạo mới
  const [filteredStudents, setFilteredStudents] = useState<StudentAttributes[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().tz('Asia/Ho_Chi_Minh').startOf('day').format('YYYY-MM-DD')
  );  
  const [attendanceSessionToEdit, setAttendanceSessionToEdit] = useState<AttendanceSessionAttributes | null>(null);
  const [isModalReady, setIsModalReady] = useState(false);

  const userInfo = useAppSelector((state: any) => state.authentication.userInfo);

  const classes = useAppSelector((state: any) => state.classes.classesList);
  const students = useAppSelector((state: any) => state.students.studentsList);
  const teachers = useAppSelector((state: any) => state.users.items);
  const attendanceSessions = useAppSelector((state: any) => state.attendanceSessions.attendanceSessionsList);
  const currentMonthAttendanceStudentRecords = useAppSelector((state: any) => state.attendanceStudentRecords.attendanceStudentRecordsList);

  useEffect(() => {
    dispatch(classActions.getAll());
    dispatch(studentActions.getAll());
    dispatch(userActions.getAllTeachers());
    dispatch(attendanceActions.getAllAttendanceSessions());
    const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  dispatch(attendanceStudentRecordActions.getAttendanceStudentRecordByMonth(currentYear, currentMonth));
  }, [dispatch]);

  // useEffect mới để reset selectedStudents khi lớp thay đổi
  useEffect(() => {
    if (selectedClass) {
      setFilteredStudents(students.filter((student: StudentAttributes) => student.classId === Number(selectedClass)));
      
      if (isEditing && attendanceSessionToEdit) {
        // Lấy danh sách học sinh được chọn từ attendanceSessionToEdit (chỉ khi đang sửa)
        const studentsInSession = currentMonthAttendanceStudentRecords.filter(
          (record: any) => record.sessionId === attendanceSessionToEdit.id
        );
  
        const selectedStudentIds = studentsInSession
          .filter((record: any) => record.isPresent === true)
          .map((record: any) => record.studentId);
  
        setSelectedStudents(selectedStudentIds); // Cập nhật danh sách học sinh có mặt
      } else {
        // Reset khi tạo mới
        setSelectedStudents([]);
      }
    } else {
      setFilteredStudents([]);
      setSelectedStudents([]); // Reset nếu không có lớp
    }
  }, [selectedClass, students, isEditing, attendanceSessionToEdit, currentMonthAttendanceStudentRecords]);
  

  const filteredSessions = attendanceSessions.filter((session: AttendanceSessionAttributes) => {
    const sessionMonth = new Date(session.date).getMonth() + 1;
    const isClassMatch = selectedClass ? session.classId === Number(selectedClass) : true;
    const isMonthMatch = sessionMonth === selectedMonth;

    return isClassMatch && isMonthMatch;
  });

  const resetModalState = () => {
    setSelectedClass('');
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setSelectedStudents([]);
    setAttendanceSessionToEdit(null);  // Reset thông tin điểm danh đang sửa
  };
  
  const toggleModal = () => {
    resetModalState();  // Reset thông tin khi đóng modal
    setModalOpen(!modalOpen);
  };
  
  const handleCreateAttendance = () => {
    setIsEditing(false);  // Chế độ tạo mới
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

  const handleEditAttendance = (session: AttendanceSessionAttributes) => {
    setIsEditing(true);  // Chế độ sửa
    // Khi ấn sửa, điền sẵn thông tin vào modal
    setAttendanceSessionToEdit(session);
    setSelectedClass(String(session.classId));
    setSelectedDate(new Date(session.date).toISOString().split('T')[0]);

    // Lọc ra những học sinh đã có mặt trong session này
    const studentsInSession = currentMonthAttendanceStudentRecords.filter(
      (record: any) => record.sessionId === session.id
    );
  
    // Tạo danh sách học sinh có mặt (dựa trên trường isPresent)
    const selectedStudentIds = studentsInSession
      .filter((record: any) => record.isPresent === true) // Chọn những học sinh có mặt
      .map((record: any) => record.studentId);
    setSelectedStudents(selectedStudentIds);
    setModalOpen(true);
  };  

  const handleSaveAttendance = () => {
    // Lưu lại điểm danh, xử lý logic lưu sửa điểm danh tại đây
    if (attendanceSessionToEdit) {
      const updatedAttendance = filteredStudents.map((student) => ({
        studentId: student.id,
        isPresent: selectedStudents.includes(student.id) ? 1 : 0,
      }));

      // Dispatch action sửa điểm danh
      dispatch(
        attendanceActions.updateAttendanceSession(
          attendanceSessionToEdit.id,
          selectedDate,
          updatedAttendance,
          userInfo.id
        )
      );
    }

    setModalOpen(false);
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
                onChange={(e) => {
                  const newMonth = Number(e.target.value);
                  setSelectedMonth(newMonth);
                  dispatch(attendanceStudentRecordActions.getAttendanceStudentRecordByMonth(new Date().getFullYear(), newMonth));
                }}
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
            <th>GV tạo</th>
            <th>GV sửa cuối</th>
            <th>Ghi chú</th>
            <th>Ngày tạo</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody>
          {filteredSessions.map((session: AttendanceSessionAttributes) => {
            const className = classes.find((cls: any) => cls.id === session.classId)?.name || 'N/A';
            const createdTeacherName = teachers.find((teacher: any) => teacher.id === session.createdByTeacherId)?.userName || 'N/A';
            const lastUpdatedTeacherName = teachers.find((teacher: any) => teacher.id === session.lastUpdatedByTeacherId)?.userName || 'N/A';
            const formattedDate = new Date(session.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const createdAtFormatted = session.createdAt
              ? new Date(session.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
              : 'N/A';

            return (
              <tr key={session.id}>
                <td>{session.id}</td>
                <td>{className}</td> {/* Hiển thị tên lớp */}
                <td>{formattedDate + '(Đi: 18/20; Vắng: 2)'}</td> {/* Hiển thị ngày định dạng dd/mm/yyyy */}
                <td>{createdTeacherName}</td> {/* Hiển thị tên giáo viên */}
                <td>{lastUpdatedTeacherName}</td> {/* Hiển thị tên giáo viên */}
                <td>{session.note}</td>
                <td>{createdAtFormatted}</td> {/* Ngày tạo định dạng dd/mm/yyyy */}
                <td>
                  <Button color="info" size="sm" onClick={() => handleEditAttendance(session)}>
                    Sửa
                  </Button>
                  {' '}
                  <Button color="danger" size="sm" onClick={() => console.log('Delete')}>
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

        <StyledModal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={() => setModalOpen(false)}>
            {attendanceSessionToEdit ? 'Sửa điểm danh' : 'Tạo điểm danh'}
        </ModalHeader>
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
                                setSelectedStudents(selectedStudents.filter((id) => id !== student.id));
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
          <Button color="primary" onClick={attendanceSessionToEdit ? handleSaveAttendance : handleCreateAttendance}>
            {attendanceSessionToEdit ? 'Sửa' : 'Tạo'}
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
