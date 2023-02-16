import React from 'react';

export default function Color(props) {
  return (
    <div
        style={{
            backgroundColor: props.color,
            width: props.width || "70px",
            height: props.height || "30px",
            margin: props.margin || "0px"
        }}
    >
    </div>
  );
}