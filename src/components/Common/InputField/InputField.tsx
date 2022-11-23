import React from 'react';
import { useInput } from './useInput';
import { Input, LabelOfInput } from './InputField.styled';

interface Props {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  maxLength?: number;
  id?: string;
  onChange(item: string): void;
}

const InputField: React.FC<Props> = ({
  label,
  placeholder,
  value,
  error,
  id,
  maxLength,
  onChange
}) => {
  const [input, setInput] = useInput(value);
  const setItem = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    return e.target.value;
  };

  return (
    <div>
      <LabelOfInput>{label}</LabelOfInput>
      <Input
        placeholder={placeholder}
        id={id}
        value={input ?? 'empty'}
        error={!!error}
        maxLength={maxLength ?? 15}
        onChange={(e) => {
          const item = setItem(e);
          onChange(item);
        }}
        // onBlur={() => onTabOut()}
      />
    </div>
  );
};

export default InputField;
