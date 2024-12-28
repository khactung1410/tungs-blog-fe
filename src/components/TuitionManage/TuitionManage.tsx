/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { pathConstants } from '../../constants';
import { userActions } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  Table,
} from 'reactstrap';
import { studentActions, classActions, attendanceActions, attendanceStudentRecordActions } from '../../redux/actions';

// Styled-components
const TuitionContainer = styled.div`
  padding: 20px;
  margin-left: 250px; //cách lề trái để tránh bị Header che mất.
`;
interface FeeResult {
  absenceDates: any;
  student: any; // Thay `any` bằng kiểu chính xác nếu có
  absencesLastMonth: number;
  feePerSession: number;
  currentMonthFee: number;
  lastMonthAbsenceFee: number;
  totalFee: number;
}

const TuitionManage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [attendanceFee, setAttendanceFee] = useState<FeeResult[]>([]);

  const students = useSelector((state: any) => state.students.studentsList);
  const classes = useSelector((state: any) => state.classes.classesList);
  const attendanceSessions = useSelector(
    (state: any) => state.attendanceSessions.attendanceSessionsList
  );
  const previousMonthAttendanceStudentRecords = useSelector(
    (state: any) => state.attendanceStudentRecords.attendanceStudentRecordsList
  );

  const [attendanceFrom, setAttendanceFrom] = useState(
    new Date(new Date().getFullYear(), 11, 1).toISOString().slice(0, 10) // Đảm bảo ngày "Từ" là 1/12
  );
  const [attendanceTo, setAttendanceTo] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10) // Ngày cuối tháng hiện tại
  );
  
  
  const [sessionsThisMonth, setSessionsThisMonth] = useState(8);

  useEffect(() => {
    setIsLoading(true);
    const currentYear = new Date().getFullYear();
    const previousMonth = new Date().getMonth();
    console.log('previousMonth', previousMonth)
    Promise.all([
      dispatch(classActions.getAll()),
      dispatch(studentActions.getAll()),
      dispatch(attendanceActions.getAllAttendanceSessions()),
      dispatch(
        attendanceStudentRecordActions.getAttendanceStudentRecordByMonth(
          currentYear,
          previousMonth
        )
      ),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error loading data:', err);
        setIsLoading(false);
      });
  }, [dispatch]);

  const handleStudentSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "all") {
      // Chọn tất cả học sinh
      setSelectedStudents(students.map((student: { id: string }) => student.id));
    } else {
      // Chỉ chọn 1 học sinh
      setSelectedStudents([selectedValue]);
    }
  };

  const handleClassSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedClassId = e.target.value;
    setSelectedClass(selectedClassId);
    
    // Filter students based on selected class
    if (selectedClassId === '') {
      setSelectedStudents(students.map((student: { id: string }) => student.id)); // Show all students
    } else {
      setSelectedStudents(
        students
          .filter((student: { classId: string }) => student.classId === selectedClassId)
          .map((student: { id: string }) => student.id)
      );
    }
  };

  const handleCalculateFee = () => {
    const results = selectedStudents.map((studentId: string) => {
      const student = students.find((s: any) => s.id === studentId);
      const studentClass = classes.find((cls: any) => cls.id === student?.classId);
      const feePerSession = studentClass ? studentClass.sessionFee : 0;
  
      // Lấy danh sách các ngày nghỉ
      const absences = previousMonthAttendanceStudentRecords.filter(
        (record: any) =>
          record.studentId === student?.id &&
          record.isPresent === false &&
          attendanceSessions.some(
            (session: any) =>
              session.id === record.sessionId &&
              new Date(session.date).getMonth() === new Date().getMonth() - 1 // Tháng trước
          )
      );
  
      // Danh sách ngày nghỉ (dạng ngày/tháng)
      const absenceDates = absences.map((absence: any) => {
        const session = attendanceSessions.find((s: any) => s.id === absence.sessionId);
        return session
          ? new Date(session.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }).replace('-', '/')
          : '';
      });
  
      const absencesLastMonth = absenceDates.length;
      const currentMonthFee = sessionsThisMonth * feePerSession;
      const lastMonthAbsenceFee = absencesLastMonth * feePerSession;
      const totalFee = currentMonthFee - lastMonthAbsenceFee;
  
      return {
        student,
        absencesLastMonth,
        absenceDates, // <-- Thêm danh sách ngày nghỉ
        feePerSession,
        currentMonthFee,
        lastMonthAbsenceFee,
        totalFee,
      };
    });
  
    setAttendanceFee(results);
  };

  const handleSelectAllStudents = () => {
    setSelectedStudents(students.map((student: { id: any }) => student.id));
  };

  const getMonthName = (date: string) => {
    const month = new Date(date).getMonth();
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return months[month];
  };

  const getPreviousMonthName = (attendanceFrom: string) => {
    // Tính toán tháng trước
    const previousMonth = new Date(new Date(attendanceFrom).setMonth(new Date().getMonth() - 1)); 
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
      'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return months[previousMonth.getMonth()];
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN'); // Định dạng số theo chuẩn Việt Nam
  };  

  return (
    <TuitionContainer>
      <h2>Quản lí học phí</h2>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="attendanceFrom">Từ</Label>
                <Input
                  type="date"
                  id="attendanceFrom"
                  value={attendanceFrom}
                  onChange={(e) => setAttendanceFrom(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="attendanceTo">Đến</Label>
                <Input
                  type="date"
                  id="attendanceTo"
                  value={attendanceTo}
                  onChange={(e) => setAttendanceTo(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="sessionsThisMonth">Số buổi học</Label>
                <Input
                  type="number"
                  id="sessionsThisMonth"
                  value={sessionsThisMonth}
                  onChange={(e) => setSessionsThisMonth(Number(e.target.value))}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="classSelection">Chọn lớp</Label>
                <Input
                  type="select"
                  id="classSelection"
                  onChange={handleClassSelection}
                >
                  <option value="">-- Chọn lớp --</option>
                  {classes.map((cls: { id: string; name: string }) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="studentSelection">Tên các học sinh</Label>
                <Input
                  type="select"
                  id="studentSelection"
                  onChange={handleStudentSelection}
                >
                  <option value="">-- Chọn học sinh --</option>
                  <option value="all">Tất cả học sinh</option>
                  {students
                    .filter((student: { classId: string }) =>
                      selectedClass ? student.classId === selectedClass : true
                    )
                    .map((student: { id: string; name: string }) => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                </Input>
              </FormGroup>
              <div>
                <strong>Học sinh đã chọn:</strong>{" "}
                {selectedStudents.length > 0 ? (
                  <ul>
                    {selectedStudents.map((studentId) => {
                      const student = students.find(
                        (stu: { id: string }) => stu.id === studentId
                      );
                      return student ? (student.name + ',') : null;
                    })}
                  </ul>
                ) : (
                  <p>Chưa có học sinh nào được chọn.</p>
                )}
              </div>
            </Col>
          </Row>
          <Button color="success" onClick={handleCalculateFee}>
            Tính học phí
          </Button>
          {attendanceFee.length > 0 && (
            attendanceFee.map((fee, index) => {
              const studentClass = classes.find(
                (cls: any) => cls.id === fee.student?.classId
              );
              return (
                <React.Fragment key={index}>
                  {/* Hiển thị tên lớp */}
                  <span style={{ color: 'green', fontWeight: 'bold', display: 'block' }}>
                    Lớp: {studentClass ? studentClass.name : "Không xác định"}
                  </span>
                  
                  {/* Hiển thị học phí */}
                  <p style={{ color: 'blue', fontWeight: 'bold' }}>
                    Học phí Tiếng Anh {getMonthName(attendanceTo)}: {fee.student ? fee.student.name : ""}
                  </p>
                  
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Nội dung</th>
                        <th>Số buổi</th>
                        <th>Học phí 1 buổi</th>
                        <th>Số tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Số buổi <strong>nghỉ</strong> {getPreviousMonthName(attendanceFrom)}</td>
                        <td>{fee.absencesLastMonth}
                            <br />
                            {fee.absenceDates.length > 0 && (
                              <small>(Nghỉ {fee.absenceDates.join('; ')})</small>
                            )}
                        </td>
                        <td>{formatCurrency(fee.feePerSession)}</td>
                        <td>
                          {fee.absencesLastMonth} x {formatCurrency(fee.feePerSession)} = {formatCurrency(fee.lastMonthAbsenceFee)}
                        </td>
                      </tr>
                      <tr>
                        <td>Số buổi học {getMonthName(attendanceTo)}</td>
                        <td>{sessionsThisMonth}</td>
                        <td>{formatCurrency(fee.feePerSession)}</td>
                        <td>
                          {sessionsThisMonth} x {formatCurrency(fee.feePerSession)} = {formatCurrency(fee.currentMonthFee)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}></td>
                        <td colSpan={1}>
                          = {formatCurrency(fee.currentMonthFee)} - {formatCurrency(fee.lastMonthAbsenceFee)}
                          <span style={{ color: 'red', fontWeight: 'bold', display: 'block' }}>
                            Tổng học phí: {formatCurrency(fee.totalFee)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </React.Fragment>
              );
            })
          )}

        </>
      )}
    </TuitionContainer>
  );
};

export default TuitionManage;
