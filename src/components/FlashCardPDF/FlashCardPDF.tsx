import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { submitText } from '../../redux/actions';
import { AppDispatch } from '../../store';
import { downloadWord } from '../../redux/actions/vocabTest.actions';

const FlashCardPDF: React.FC = () => {
  const [text, setText] = useState('');
  const [warningLines, setWarningLines] = useState<string[]>([]);
  const [withWordPhonics, setWithWordPhonics] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loading, fileUrl, error } = useSelector((state: RootState) => state);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const lines = text.split('\n');
    const linesWithoutColon = lines.filter(line => line.trim() !== '' && !line.includes(':'));
    setWarningLines(linesWithoutColon);
  }, [text]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() !== '' && warningLines.length === 0) {
      console.log(withWordPhonics);
      dispatch(submitText({ vocabs: text, withPhonics: withWordPhonics }));
    }
  };

  const handleVocabTest = (event: React.FormEvent) => {
    event.preventDefault();
    if (text.trim() !== '' && warningLines.length === 0) {
      dispatch(downloadWord({ vocabs: text, withPhonics: withWordPhonics }));
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

  const countNonEmptyLines = (text: string) => {
    return text.split('\n').filter(line => line.trim() !== '').length;
  };

  // Effect to keep the scroll position at the top
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  }, [text]);

  return (
    <div className="container mt-5">
      <div style={{ height: '85px' }} />
      <h2>Vocabularies</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ position: 'relative' }}>
          <div
            className="form-control"
            style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', height: 'auto', minHeight: '200px' }}
          >
            {text.split('\n').map((line, index) => (
              <div key={index} style={{ color: line.trim() !== '' && !line.includes(':') ? 'red' : 'black' }}>
                {line}
              </div>
            ))}
          </div>
          <textarea
            className="form-control"
            rows={10}
            value={text}
            onChange={handleTextChange}
            ref={textareaRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'transparent', color: 'transparent', caretColor: 'black', overflow: 'hidden' }}
            required
            onScroll={(e) => e.currentTarget.scrollTop = 0}
          />
        </div>
        <div className="text-center mt-2">
          <strong>Tổng số từ: {countNonEmptyLines(text)}</strong>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="withWordPhonics"
            checked={withWordPhonics}
            onChange={() => setWithWordPhonics(!withWordPhonics)}
          />
          <label className="form-check-label" htmlFor="withWordPhonics">
            With word's Phonics
          </label>
        </div>
        {warningLines.length > 0 && (
          <div className="alert alert-warning text-center">
            <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              Các dòng sau không có dấu hai chấm:
            </p>
            {warningLines.map((line, index) => (
              <p key={index} style={{ marginBottom: '5px' }}>{line}</p>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading || text.trim() === '' || warningLines.length > 0}
        >
          Flashcards
        </button>
        <button
          type="button"
          className="btn btn-warning mt-3 ml-2"
          onClick={handleVocabTest}
          disabled={loading || text.trim() === '' || warningLines.length > 0}
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
    </div>
  );
};

export default FlashCardPDF;
