import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface Props<T> {
  getLabel: (item: T) => string;
  api: (searchKeyword: string) => T[];
}

function AutoComplete<T>({ getLabel, api }: Props<T>) {
  const [inputData, setInputData] = useState('');
  const [matchedList, setMatchedList] = useState<T[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputData(value);
    setSelectedIndex(0);
  };

  const changeSelete = ({ keyCode }: KeyboardEvent<HTMLInputElement>) => {
    if (keyCode === 38) {
      setSelectedIndex(
        prev => (prev - 1 + matchedList.length) % matchedList.length
      );
    } else if (keyCode === 40) {
      setSelectedIndex(prev => (prev + 1) % matchedList.length);
    }
  };

  let timer: any;
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      setMatchedList(api(inputData));
    }, 400);
  }, [inputData]);

  useEffect(() => {
    console.log(selectedIndex);
    scrollToSeleted();
  }, [selectedIndex]);

  const selectedRef = useRef<HTMLDivElement>(null);

  const scrollToSeleted = () => {
    selectedRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container>
      <Input
        type="text"
        value={inputData}
        onChange={onChange}
        onKeyDown={changeSelete}
        onBlur={() => setSelectedIndex(0)}
      />
      <MatchedList>
        {matchedList &&
          matchedList.map((item, index) => (
            <MatchedUser key={index} isSelected={index === selectedIndex}>
              {index === selectedIndex && <div ref={selectedRef} />}
              {getLabel(item)}
            </MatchedUser>
          ))}
      </MatchedList>
    </Container>
  );
}

export default AutoComplete;

const Container = styled.div`
  width: 500px;
  height: 500px;
  margin: 50px auto;
  * {
    box-sizing: border-box;
    list-style: none;
  }
`;

const Input = styled.input`
  width: 500px;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  &:focus + * {
    display: block;
  }
`;

const MatchedList = styled.ul`
  display: none;
  height: 1250px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #000;
    border-radius: 10px;
  }
`;

const MatchedUser = styled.li<{ isSelected: boolean }>`
  height: 250px;
  padding: 10px 20px;
  ${({ isSelected }) => isSelected && 'background-color: black; color: white;'}
  & + & {
    border-top: 1px solid black;
  }
`;
