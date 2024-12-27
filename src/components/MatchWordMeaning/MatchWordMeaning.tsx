// file MatchWordMeaning.tsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  TextareaContainer,
  Textarea,
  FormLabel,
  TimerContainer,
  Timer,
  ButtonContainer,
  StyledButton,
  GridContainer,
  Square,
  GameMatchingContainer
} from './MatchWordMeaning.styled';

// Định nghĩa kiểu cho Square
interface SquareType {
  id: number;
  text: string;
  type: 'word' | 'meaning';
  disabled?: boolean; // Thêm thuộc tính disabled vào đây
}

const WordMatchingGame: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [pairs, setPairs] = useState<{ word: string; meaning: string }[]>([]);
  const [squares, setSquares] = useState<SquareType[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [highlighted, setHighlighted] = useState<number[]>([]); // Thêm trạng thái để đánh dấu các ô được chọn
  const [time, setTime] = useState({ minutes: 0, seconds: 0, milliseconds: 0 });
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [textareaHidden, setTextareaHidden] = useState<boolean>(false); // Trạng thái để kiểm soát việc ẩn/hien nội dung
  const [gameStarted, setGameStarted] = useState<boolean>(false); // Trạng thái để kiểm soát trò chơi đã bắt đầu

  useEffect(() => {
    // Cleanup timer on component unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const startGame = () => {
    const lines = inputText.split('\n').filter(line => line.trim());
    const newPairs = lines.map(line => {
      const [word, meaning] = line.split(':').map(part => part.trim());
      return { word, meaning };
    });

    // Nếu có nhiều hơn 15 cặp, chọn ngẫu nhiên 15 cặp
    const selectedPairs = newPairs.length > 15 
      ? newPairs.sort(() => Math.random() - 0.5).slice(0, 15)
      : newPairs;

    const newSquares: SquareType[] = selectedPairs.flatMap((pair, index) => [
      { id: index * 2, text: pair.word, type: 'word' },
      { id: index * 2 + 1, text: pair.meaning, type: 'meaning' }
    ]);

    // Shuffle squares
    newSquares.sort(() => Math.random() - 0.5);

    setPairs(selectedPairs);
    setSquares(newSquares);
    setSelected([]);
    setHighlighted([]); // Reset highlighted squares
    setTime({ minutes: 0, seconds: 0, milliseconds: 0 });
    setTextareaHidden(true); // Ẩn nội dung textarea khi bắt đầu trò chơi
    setGameStarted(true); // Trò chơi đã bắt đầu

    if (intervalId) {
      clearInterval(intervalId);
    }

    const id = setInterval(updateTime, 10); // Cập nhật mỗi 10ms
    setIntervalId(id);
  };

  const stopGame = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setGameStarted(false); // Trò chơi đã dừng
    setTextareaHidden(false); // Hiện lại textarea
  };

  const openRandomTeamPage = () => {
    window.open('/random-team', '_blank'); // Mở tab mới với đường dẫn '/random-team'
  };
  

  const updateTime = () => {
    setTime((prev) => {
      let { minutes, seconds, milliseconds } = prev;
  
      milliseconds += 10; // Tăng 10ms
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds += 1;
      }
  
      return { minutes, seconds, milliseconds }; // Trả về đầy đủ các thuộc tính
    });
  };
  
  

  const calculateScale = (text: string, width: number, height: number): number => {
    const ratio = Math.min(width / text.length, height / 24); // Điều chỉnh tỷ lệ theo kích thước ô và độ dài văn bản
    return ratio;
  };

  const handleSquareClick = (id: number) => {
    if (selected.length === 2 || squares.find(square => square.id === id)?.disabled) {
      return;
    }
  
    setSelected(prev => {
      const newSelected = [...prev, id];
  
      if (newSelected.length === 2) {
        const [firstId, secondId] = newSelected;
        const firstSquare = squares.find(square => square.id === firstId);
        const secondSquare = squares.find(square => square.id === secondId);
  
        if (firstSquare && secondSquare) {
          if (pairs.some(pair => 
            (pair.word === firstSquare.text && pair.meaning === secondSquare.text) ||
            (pair.word === secondSquare.text && pair.meaning === firstSquare.text)
          )) {
            // Nếu người dùng chọn đúng, disable các ô và thêm vào highlighted
            setSquares(prevSquares => prevSquares.map(square => 
              square.id === firstId || square.id === secondId 
                ? { ...square, disabled: true } 
                : square
            ));
            setHighlighted(prev => [...prev, firstId, secondId]); // Đánh dấu các ô đã chọn đúng
          } else {
            // Nếu người dùng chọn sai, reset lựa chọn sau 1 giây
            setTimeout(() => setSelected([]), 250);
          }
        }
  
        setTimeout(() => setSelected([]), 250); // Đặt lại selected sau 1 giây
      }
  
      return newSelected;
    });
  };

  useEffect(() => {
    if (squares.every(square => square.disabled)) {
      stopGame(); // Dừng trò chơi khi tất cả các ô đã bị disable
    }
  }, [squares]);

  return (
    <GameMatchingContainer>
      <Row>
        <Col>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <FormLabel hidden={textareaHidden}>Danh sách từ và nghĩa:</FormLabel>
            <TextareaContainer>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Nhập danh sách từ và nghĩa, mỗi cặp trên một dòng, cách nhau bằng dấu hai chấm"
                hidden={textareaHidden}
              />
              <ButtonContainer>
                <StyledButton
                  onClick={openRandomTeamPage}
                  hidden={textareaHidden}
                  style={{ backgroundColor: '#007bff', marginBottom: '10px' }}
                >
                  Chia Đội
                </StyledButton>

                {gameStarted ? (
                  <StyledButton onClick={stopGame} style={{ backgroundColor: 'red', marginLeft: '10px' }}>Dừng Lại</StyledButton>
                ) : (
                  <StyledButton onClick={startGame}>Bắt Đầu</StyledButton>
                )}
                <TimerContainer>
                  <Timer>
                    {`${time.seconds}:${String(time.milliseconds / 10).padStart(2, '0')}`}
                  </Timer>
                </TimerContainer>
              </ButtonContainer>
            </TextareaContainer>
          </Form.Group>
          {gameStarted && (
            <GridContainer>
              {squares.map((square) => (
                <Square
                  key={square.id}
                  selected={selected.includes(square.id)}
                  disabled={square.disabled}
                  highlight={highlighted.includes(square.id)} // Kiểm tra ô có được đánh dấu không
                  scale={calculateScale(square.text, 140, 135)} // Cập nhật kích thước của ô vuông
                  onClick={() => handleSquareClick(square.id)}
                  data-content={square.text}
                  type={square.type}
                />
              ))}
            </GridContainer>
          )}
        </Col>
      </Row>
    </GameMatchingContainer>
  );
};

export default WordMatchingGame;
