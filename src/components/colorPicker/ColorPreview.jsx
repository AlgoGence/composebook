import React from 'react'
import styles from '../styles.module.css'

export default class ColorPreview extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div
            style={{
                backgroundColor: this.props.color,
                width: this.props.width,
                height: this.props.height,
                cursor: "pointer"
            }}
        ></div>
    }
}