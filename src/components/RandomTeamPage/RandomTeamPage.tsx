import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Styled-components cho custom styling
const Textarea = styled.textarea`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
`;

const TextField = styled.input`
  width: 100%;
  margin-bottom: 10px;
`;

const FormLabel = styled(Form.Label)`
  font-weight: bold;
  font-size: 1.2rem;
`;

const FormTextRight = styled(Form.Text)`
  display: block;
  text-align: right;
`;

const ResultTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

// Danh sách tên con vật bằng tiếng Việt
const animalNames = ['Hổ', 'Sư Tử', 'Gấu', 'Cọp', 'Cá heo', 'Mèo', 'Ngựa', 'Voi', 'Cáo', 'Khỉ'];

// Danh sách màu sắc cho các đội
type TeamColor = 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'dark';
const teamColors: TeamColor[] = ['info', 'success', 'warning', 'danger', 'primary', 'secondary', 'dark'];

const RandomTeamPage: React.FC = () => {
  const [studentList, setStudentList] = useState<string>('');
  const [studentsPerTeam, setStudentsPerTeam] = useState<number>(1);
  const [teams, setTeams] = useState<{ [key: string]: string[] } | null>(null);

  const handleSplitTeams = () => {
    const students = studentList.split(/[\n,]+/).map(name => name.trim()).filter(name => name);
    const teamSize = studentsPerTeam;

    // Shuffle array function
    const shuffleArray = (array: string[]) => {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }
      return array;
    };

    const shuffledStudents = shuffleArray(students);
    const resultTeams: { [key: string]: string[] } = {};
    let teamIndex = 0;

    while (shuffledStudents.length) {
      const teamName = animalNames[teamIndex % animalNames.length];
      resultTeams[teamName] = shuffledStudents.splice(0, teamSize);
      teamIndex++;
    }

    if (shuffledStudents.length > 0) {
      const lastTeamName = animalNames[teamIndex % animalNames.length];
      resultTeams[lastTeamName] = (resultTeams[lastTeamName] || []).concat(shuffledStudents);
    }

    setTeams(resultTeams);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form.Group>
            <FormLabel>Danh Sách Học Sinh</FormLabel>
            <Textarea
              value={studentList}
              onChange={(e) => setStudentList(e.target.value)}
              placeholder="Nhập danh sách tên sinh viên, mỗi tên trên 1 dòng hoặc cách nhau bằng dấu phẩy"
            />
            <FormTextRight>Đã nhập vào: {studentList.split(/[\n,]+/).filter(name => name.trim()).length}</FormTextRight>
          </Form.Group>
          <Form.Group>
            <FormLabel>Số Thành Viên Mỗi Đội</FormLabel>
            <TextField
              type="number"
              value={studentsPerTeam}
              onChange={(e) => setStudentsPerTeam(Number(e.target.value))}
              min="1"
              placeholder="Số lượng thành viên mỗi đội"
            />
          </Form.Group>
          <Button onClick={handleSplitTeams} variant="primary">Chia Đội</Button>
        </Col>
      </Row>
      {teams && (
        <Row>
          <Col md={12}>
            <ResultTable>
              <thead>
                <tr>
                  <th>Đội</th>
                  <th>Danh sách thành viên</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(teams).map(([teamName, members], index) => {
                  const teamColor: TeamColor = teamColors[index % teamColors.length];
                  return (
                    <tr key={index}>
                      <td>{teamName}</td>
                      <td>
                        {members.map((member, i) => (
                          <Button
                            key={i}
                            variant={teamColor}
                            style={{ 
                              margin: '2px', 
                              fontWeight: 'bold', 
                              textTransform: 'uppercase' 
                            }}
                          >
                            {member.toUpperCase()}
                          </Button>
                        ))}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ResultTable>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RandomTeamPage;
