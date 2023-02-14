import React from 'react';

export default function Image(props) {
  return (
    <img
      src={props.src}
      style={{
        borderRadius: '8px',
        color: '#fff',
        padding: '0.2rem',
      }}>
    </img>
  );
}