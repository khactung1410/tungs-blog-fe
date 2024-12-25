import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { submitText } from '../../redux/actions';
import { AppDispatch } from '../../store';
import { downloadTracingWord, downloadVocabTest } from '../../redux/actions/vocabTest.actions';
import { Tabs, Tab } from 'react-bootstrap';
import styled from 'styled-components';
import Loading from '../../common/Loading/loading';

const TabContainer = styled.div`
  margin-top: 20px;
`;

const Title = styled.p`
  font-weight: bold;
  margin-top: 20px;
`;

const StyledTab = styled(Tab)`
  &.nav-link {
    color: #000;
  }
`;

const NumberInput = styled.input`
  width: 80px;
`;

const FlashCardPDF: React.FC = () => {
  const [text, setText] = useState('');
  const [warningLines, setWarningLines] = useState<string[]>([]);
  const [invalidLines, setInvalidLines] = useState<string[]>([]);
  const [withWordPhonics, setWithWordPhonics] = useState(false);
  const [activeTab, setActiveTab] = useState('flashcard');
  const [tracingWord, setTracingWord] = useState('');
  const [numberOfStudents, setNumberOfStudents] = useState<number>(1);
  
  const dispatch = useDispatch<AppDispatch>();
  const { loading, fileUrl, error } = useSelector((state: RootState) => state);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isLoadingPDF, setIsLoading] = useState(false); // Thêm trạng thái loading

  useEffect(() => {
    const lines = text.split('\n');
    const linesWithoutColon = lines.filter(line => line.trim() !== '' && !line.includes(':'));
    setWarningLines(linesWithoutColon);
    setInvalidLines(linesWithoutColon);
  }, [text]);

  const handleFlashcard = async (event: React.FormEvent) => {
    event.preventDefault();
  if (text.trim() !== '' && invalidLines.length === 0) {
    setIsLoading(true); // Set isLoadingPDF=true khi bắt đầu
    try {
      await dispatch(submitText({ vocabs: text, withPhonics: withWordPhonics }));
    } catch (error) {
      console.error("Error dispatching vocab test", error);
    } finally {
      setIsLoading(false); // Set isLoadingPDF=false khi xong
    }
  }
  };

  const handleVocabTest = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() !== '' && invalidLines.length === 0) {
      dispatch(downloadVocabTest({ vocabs: text, withPhonics: withWordPhonics, numberOfStudents }));
    }
  };

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleTracingWordChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTracingWord(e.target.value);
  };

  const handleTracingWord = () => {
    const trimmedTracingWord = tracingWord.trim(); // Trim chuỗi
    if (trimmedTracingWord !== '') {
      dispatch(downloadTracingWord({ vocabs: trimmedTracingWord })); // Sử dụng chuỗi đã trim
    }
  };

  const countNonEmptyLines = (text: string) => {
    return text.split('\n').filter(line => line.trim() !== '').length;
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  }, [text]);

  const handleNumberOfStudentsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > 50) {
      setNumberOfStudents(50);
    } else {
      setNumberOfStudents(value);
    }
  };

  const handleNumberOfStudentsBlur = () => {
    if (numberOfStudents < 1) {
      setNumberOfStudents(1);
    }
  };
  return (
    <div className="container mt-5">
      {
        isLoadingPDF ? <Loading message="Đang tải file, vui lòng đợi..." /> : ''
      }
      <TabContainer>
        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k as string)}>
          <StyledTab eventKey="flashcard" title="TẠO FLASHCARDS">
            <form onSubmit={handleFlashcard}>
              <Title>Nhập danh sách từ:</Title>
              <p>Mỗi từ và nghĩa nằm trên 1 hàng, ngăn cách nhau bởi dấu hai chấm :</p>
              <textarea
                className="form-control"
                rows={10}
                value={text}
                onChange={handleTextChange}
                ref={textareaRef}
              />
              <div className="text-center mt-2">
                <strong>Tổng số từ: {countNonEmptyLines(text)}</strong>
              </div>
              {invalidLines.length > 0 && (
                <div className="alert alert-warning">
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Các dòng sau không hợp lệ (Không có dấu hai chấm):
                  </p>
                  {invalidLines.map((line, index) => (
                    <p key={index} style={{ color: 'red', marginBottom: '5px' }}>{line}</p>
                  ))}
                </div>
              )}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="withWordPhonics"
                  checked={withWordPhonics}
                  onChange={() => setWithWordPhonics(!withWordPhonics)}
                />
                <label className="form-check-label" htmlFor="withWordPhonics">
                  Có phiên âm của từ ?
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-3"
                disabled={loading || text.trim() === '' || invalidLines.length > 0}
              >
                Flashcards
              </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {fileUrl && (
              <button onClick={handleDownload} className="btn btn-success mt-3">
                Download PDF
              </button>
            )}
          </StyledTab>

          <StyledTab eventKey="vocabTest" title="TẠO VOCAB TEST">
            <form onSubmit={handleVocabTest}>
              <Title>Nhập danh sách từ:</Title>
              <p>Mỗi từ và nghĩa nằm trên 1 hàng, ngăn cách nhau bởi dấu hai chấm :</p>
              <textarea
                className="form-control"
                rows={10}
                value={text}
                onChange={handleTextChange}
                ref={textareaRef}
              />
              <div className="text-center mt-2">
                <strong>Tổng số từ: {countNonEmptyLines(text)}</strong>
              </div>
              {invalidLines.length > 0 && (
                <div className="alert alert-warning">
                  <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    Các dòng sau không hợp lệ (Không có dấu hai chấm):
                  </p>
                  {invalidLines.map((line, index) => (
                    <p key={index} style={{ color: 'red', marginBottom: '5px' }}>{line}</p>
                  ))}
                </div>
              )}
              
              <div className="form-group mt-3">
                <label htmlFor="numberOfStudents" style={{ fontWeight: 'bold' }}>Số bài test (Số học sinh):</label>
                <NumberInput
                  type="number"
                  className="form-control"
                  id="numberOfStudents"
                  value={numberOfStudents}
                  onChange={handleNumberOfStudentsChange}
                  onBlur={handleNumberOfStudentsBlur}
                  min={1}
                  step={1}
                />
              </div>
              
              <button
                type="submit"
                className="btn btn-warning mt-3"
                disabled={loading || text.trim() === '' || invalidLines.length > 0}
              >
                Vocab Test
              </button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {fileUrl && (
              <button onClick={handleDownload} className="btn btn-success mt-3">
                Download PDF
              </button>
            )}
          </StyledTab>

          <StyledTab eventKey="tracingWords" title="TẠO TRACING WORDS">
            <Title>Nhập từ:</Title>
            <textarea
              className="form-control"
              rows={5} // Số dòng hiển thị của textarea
              value={tracingWord}
              onChange={handleTracingWordChange}
            />
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={handleTracingWord}
              disabled={loading || tracingWord.trim() === ''}
            >
              Tracing Word
            </button>
          </StyledTab>
        </Tabs>
      </TabContainer>
    </div>
  );
};

export default FlashCardPDF;
