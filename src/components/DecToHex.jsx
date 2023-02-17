import React from 'react';
import {useState} from 'react';
import styles from './styles.module.css';
export default function DecToHex(props) {

  const [output, setOutput] = useState(decToHex(props.value));
  const [input, setInput] = useState(props.value || 0);

  const handleChange = (event)=> {
      setInput(event.target.value)
      setOutput(decToHex(event.target.value))
  }

  return (
    <div className={styles.form} >
      <h2>Dec to Hex Converter</h2>
      <p>Change the <span className={styles.inputHeading}>input</span> and see the <span className={styles.outputHeading}>output</span></p>
      <hr></hr>
      <input
        type="number"
        value={input}
        onChange={handleChange}
        className={styles.inputBox}
      />
      <span className={styles.inputSuffix}>% alpha</span>
      <p className={styles.resultPara}>Hex value: <span className={styles.resultValue}>{output}</span></p>
    </div>
  );
}

function decToHex(input){
    let v = parseInt(input).toString(16);
    if(v.length == 1){
        return "0"+v
    }
    else{
        return v
    }
}