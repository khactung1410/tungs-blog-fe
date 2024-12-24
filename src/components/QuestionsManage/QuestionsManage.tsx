import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { questionTypeActions, questionTopicActions } from '../../redux/actions';
import {
  Wrapper,
  ShortDropdown,
  Dropdown,
  FilterWrapper,
  Button,
  Table,
  RadioGroupWrapper,
  RadioGroup,
  NoteText,
  LabelWrapper,
  RowWrapper
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
    source?: string;
  }

const QuestionsManage: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const questionTypes = useAppSelector((state: any) => state.questionTypes.questionTypeList);
  const topics = useAppSelector((state: any) => state.questionTopics.questionTopicList);
  const multipleChoiceQuestions = useAppSelector((state: any) => state.multipleChoiceQuestions.multipleChoiceQuestionList) as MultipleChoiceQuestion[];

  const [selectedQuestionType, setSelectedQuestionType] = useState<number | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<number | null>(null);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  const uniqueSources = Array.from(new Set(multipleChoiceQuestions.map(q => String(q.source))));

  useEffect(() => {
    dispatch(questionTypeActions.getAll());
    dispatch(questionTopicActions.getAll());
    dispatch(multipleChoiceQuestionActions.getAll());
  }, [dispatch]);

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = Number(e.target.value);
    setSelectedQuestionType(typeId);

    // Có thể dispatch một action nếu muốn xử lý ngay khi loại câu hỏi thay đổi
  };

  const handleGradeChange = (grade: number) => {
    setSelectedGrades((prevGrades) =>
      prevGrades.includes(grade) ? prevGrades.filter(g => g !== grade) : [...prevGrades, grade]
    );
  };

  // Hàm xử lý khi ấn nút "Cập nhật từ file Excel" riêng biệt cho từng loại câu hỏi
  const handleUpdateFromExcel = () => {
    if (selectedQuestionType === 1) {
      dispatch(multipleChoiceQuestionActions.addFromGoogleSheet());
      // dispatch(multipleChoiceQuestionActions.getAll());
    } else if (selectedQuestionType === 2) {
      // Action cho loại câu hỏi khác
      // dispatch(otherQuestionTypeActions.getAll());
    } 
    // Thêm các action khác nếu có loại câu hỏi khác
  };

  const filteredQuestions = multipleChoiceQuestions.filter((question: MultipleChoiceQuestion) => {
    const matchesSource = selectedSource ? question.source === selectedSource : true;
    const matchesTopic = selectedTopic ? question.topic_id === selectedTopic : true;
    const matchesGrade = selectedGrades.length > 0 
      ? selectedGrades.some(grade => question.belong_to_grades.includes(grade)) 
      : true;

    return matchesSource && matchesTopic && matchesGrade;
  });

  return (
    <Wrapper>
      <h3>Quản lý câu hỏi</h3>

      <RowWrapper>
        <LabelWrapper>
          <label><strong>Loại câu hỏi:</strong></label>
          <ShortDropdown value={selectedQuestionType || ''} onChange={handleQuestionTypeChange}>
            <option value="" disabled>Chọn loại câu hỏi</option>
            {questionTypes.map((type: any) => (
              <option key={type.id} value={type.id}>{type.type_name}</option>
            ))}
          </ShortDropdown>
        </LabelWrapper>

        {/* Nút "Cập nhật từ file Excel" riêng cho mỗi loại câu hỏi */}
        {selectedQuestionType && (
          <Button onClick={handleUpdateFromExcel}>
            {`Cập nhật từ file Excel (${questionTypes.find((type: any) => type.id === selectedQuestionType)?.type_name})`}
          </Button>
        )}
      </RowWrapper>

      {selectedQuestionType === 1 && (
        <>
          <FilterWrapper>
            <LabelWrapper>
              <label><strong>Chủ đề:</strong></label>
              <Dropdown value={selectedTopic || ''} onChange={(e) => setSelectedTopic(Number(e.target.value))}>
                <option value="" disabled>Chọn chủ đề</option>
                {topics.map((topic: any) => (
                  <option key={topic.id} value={topic.id}>{topic.vn_name}</option>
                ))}
              </Dropdown>
            </LabelWrapper>

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

          <FilterWrapper>
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
          </FilterWrapper>
        </>
      )}

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Câu hỏi</th> {/* Chuyển cột Câu hỏi lên sau cột ID */}
            <th>Chủ đề</th>
            <th>Lớp</th>
            <th>Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {selectedQuestionType === 1 && filteredQuestions.map((q: any) => {
            const topicName = topics.find((topic: any) => topic.id === q.topic_id)?.vn_name || 'Chưa có chủ đề';

            return (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td> {/* Chuyển nội dung cột Câu hỏi lên vị trí này */}
                  {q.question_text}
                  <div>
                    <span>{q.key === 1 ? <strong>A. {q.option_1}</strong> : `A. ${q.option_1}`}</span>&nbsp;&nbsp;
                    <span>{q.key === 2 ? <strong>B. {q.option_2}</strong> : `B. ${q.option_2}`}</span>&nbsp;&nbsp;
                    <span>{q.key === 3 ? <strong>C. {q.option_3}</strong> : `C. ${q.option_3}`}</span>&nbsp;&nbsp;
                    <span>{q.key === 4 ? <strong>D. {q.option_4}</strong> : `D. ${q.option_4}`}</span>
                  </div>
                </td>
                <td>{topicName}</td> {/* Cột chủ đề */}
                <td>{q.belong_to_grades}</td> {/* Cột lớp */}
                <td>{q.note}</td> {/* Cột ghi chú */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default QuestionsManage;
