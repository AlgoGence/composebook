import React from 'react';
import {useState} from 'react';
export default function NameForma(props) {

  const [count, setCount] = useState(props.count || 0);

  const onClickHandler = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count is: {count}</p>
      <button onClick={onClickHandler}>Increase count</button>
    </div>
  );

}