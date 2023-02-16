import React from 'react';
import styles from './styles.module.css';
import {useColorMode} from '@docusaurus/theme-common';

export default function Image(props) {
const {colorMode, setColorMode} = useColorMode();
var className = colorMode === 'dark' ? styles.darkImageStyle : styles.imageStyle
  return (
    <img
      className={className}
      {...props}>
    </img>
  );
}