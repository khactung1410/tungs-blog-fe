import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { questionTypeActions, questionTopicActions } from '../../redux/actions';
import {
  Wrapper,
  Dropdown,
  FilterWrapper,
  Button,
  Table,
  RadioGroupWrapper,
  RadioGroup,
  NoteText,
  LabelWrapper
} from './QuestionsManage.styled';
import { multipleChoiceQuestionActions } from '../../redux/actions/multipleChoiceQuestion.actions';

interface MultipleChoiceQuestion {
    id: number;
    topic_id: number;
    belong_to_grades: number[];
    question_text: string;
    option_1: string;
    option_2: string;
    option_3: string;
    option_4: string;
    note: string;
    source?: string; // Nếu có trường source
  }

const QuestionsManage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Lấy danh sách loại câu hỏi, chủ đề và câu hỏi trắc nghiệm từ state của Redux
  const questionTypes = useAppSelector((state: any) => state.questionTypes.questionTypeList);
  const topics = useAppSelector((state: any) => state.questionTopics.questionTopicList);
  const multipleChoiceQuestions = useAppSelector((state: any) => state.multipleChoiceQuestions.multipleChoiceQuestionList) as MultipleChoiceQuestion[];;

  const [selectedQuestionType, setSelectedQuestionType] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  // Lấy danh sách các nguồn (source) duy nhất từ câu hỏi trắc nghiệm, ép kiểu về string để tránh lỗi kiểu 'unknown'
  const uniqueSources = Array.from(new Set(multipleChoiceQuestions.map(q => String(q.source))));

  useEffect(() => {
    // Gọi API lấy danh sách loại câu hỏi và chủ đề
    dispatch(questionTypeActions.getAll());
    dispatch(questionTopicActions.getAll());
  }, [dispatch]);

  // Hàm xử lý khi thay đổi loại câu hỏi
  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = Number(e.target.value);
    setSelectedQuestionType(typeId);

    if (typeId === 1) {
      // Gọi API lấy tất cả câu hỏi trắc nghiệm khi chọn loại câu hỏi trắc nghiệm
      dispatch(multipleChoiceQuestionActions.getAll());
    }
  };

  // Hàm xử lý khi thay đổi checkbox lớp học
  const handleGradeChange = (grade: number) => {
    setSelectedGrades((prevGrades) =>
      prevGrades.includes(grade) ? prevGrades.filter(g => g !== grade) : [...prevGrades, grade]
    );
  };

  // Lọc danh sách câu hỏi dựa vào nguồn, chủ đề, và lớp học
  const filteredQuestions = multipleChoiceQuestions.filter((question: MultipleChoiceQuestion) => {
    const matchesSource = selectedSource ? question.source === selectedSource : true;
    const matchesTopic = selectedTopic ? question.topic_id === selectedTopic : true;
    const matchesGrade = selectedGrades.length > 0 
  ? selectedGrades.some(grade => question.belong_to_grades.includes(grade)) // Không cần chuyển đổi
  : true;

    return matchesSource && matchesTopic && matchesGrade;
  });

  return (
    <Wrapper>
      <h3>Quản lý câu hỏi</h3>

      {/* Dropdown chọn loại câu hỏi */}
      <LabelWrapper>
        <label><strong>Loại câu hỏi:</strong></label>
        <Dropdown value={selectedQuestionType || ''} onChange={handleQuestionTypeChange}>
          <option value="" disabled>Chọn loại câu hỏi</option>
          {questionTypes.map((type: any) => (
            <option key={type.id} value={type.id}>{type.type_name}</option>
          ))}
        </Dropdown>
      </LabelWrapper>

      {selectedQuestionType === 1 && (
        <>
          <Button onClick={() => console.log('Cập nhật từ file Excel')}>Cập nhật từ file Excel</Button>

          <FilterWrapper>
            {/* Dropdown chọn chủ đề */}
            <LabelWrapper>
              <label><strong>Chủ đề:</strong></label>
              <Dropdown value={selectedTopic || ''} onChange={(e) => setSelectedTopic(Number(e.target.value))}>
                <option value="" disabled>Chọn chủ đề</option>
                {topics.map((topic: any) => (
                  <option key={topic.id} value={topic.id}>{topic.vn_name}</option>
                ))}
              </Dropdown>
            </LabelWrapper>

            {/* Checkboxes chọn lớp */}
            <LabelWrapper>
              <label><strong>Lớp: </strong></label>
              <RadioGroupWrapper>
                <RadioGroup>
                  {Array.from({ length: 9 }, (_, i) => i + 1).map(grade => (
                    <label key={grade}>
                      <input
                        type="checkbox"
                        checked={selectedGrades.includes(grade)}
                        onChange={() => handleGradeChange(grade)}
                      />
                      Lớp {grade}
                    </label>
                  ))}
                </RadioGroup>
              </RadioGroupWrapper>
            </LabelWrapper>

            {/* Dropdown chọn nguồn câu hỏi */}
            <LabelWrapper>
              <label><strong>Nguồn câu hỏi:</strong></label>
              <Dropdown value={selectedSource || ''} onChange={(e) => setSelectedSource(e.target.value)}>
                <option value="" disabled>Chọn nguồn</option>
                {uniqueSources.map((source: any, index: number) => (
                    <option key={index} value={source ? String(source) : ''}>
                    {source ? String(source) : ''}
                    </option>
                ))}
              </Dropdown>
            </LabelWrapper>
          </FilterWrapper>
        </>
      )}

      {/* Bảng hiển thị câu hỏi */}
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Chủ đề</th>
            <th>Lớp</th>
            <th>Câu hỏi</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {selectedQuestionType === 1 && filteredQuestions.map((q: any) => {
            // Lấy tên chủ đề theo ID chủ đề
            const topicName = topics.find((topic: any) => topic.id === q.topic_id)?.vn_name || 'Chưa có chủ đề';

            return (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{topicName}</td>
                <td>{q.belong_to_grades}</td>
                <td>
                  {q.question_text}
                  <div>
                    <span><strong>A. {q.option_1}</strong></span>&nbsp;&nbsp;
                    <span>B. {q.option_2}</span>&nbsp;&nbsp;
                    <span>C. {q.option_3}</span>&nbsp;&nbsp;
                    <span>D. {q.option_4}</span>
                  </div>
                </td>
                <td>{q.note}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {selectedQuestionType === 2 && (
        <NoteText>Lưu ý: Hiển thị chỉ có câu hỏi và đáp án cho loại này.</NoteText>
      )}
    </Wrapper>
  );
};

export default QuestionsManage;
