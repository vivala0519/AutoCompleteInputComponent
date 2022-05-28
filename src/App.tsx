import React, { useState } from 'react';
import generatedData from './generated.json';

function App() {
  const [inputs, setInputs] = useState('');
  const [result, setResult] = useState<string[]>([]);

  const inputFunction = (e: any) => {
    setInputs(e.target.value);
    setResult([]);
    for (let i = 0; i < generatedData.length; i++) {
      if (generatedData[i]['name'].includes(inputs)) {
        setResult([...result, generatedData[i]['name']]);
      }
    }
  };
  const resultList = result.map(q => <a className="list-item">{q}</a>);
  return (
    <div className="wrapper">
      <div className="control">
        <input type="text" className="input" onChange={inputFunction} />
      </div>
      <div className="list is-hoverable">{resultList}</div>
    </div>
  );
}

export default App;
