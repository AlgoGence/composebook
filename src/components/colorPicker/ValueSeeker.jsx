import React from 'react'
import styles from './styles.module.css';

export default class ValueSeeker extends React.Component {
    constructor(props) {
        super(props);
        this.config = {
            marginRight: 20,
            marginLeft: 5
        }
    }
    render() {
        return <div
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginRight: this.config.marginRight+"px",
                marginLeft: this.config.marginLeft+"px"
            }}
        >
            <span style={{width: this.props.titleWidth}}>{this.props.title}:</span>
            <input
                type="range"
                min={this.props.min}
                max={this.props.max}
                step={this.props.step || 1}
                value={this.props.value}
                className={styles.slider}
                onChange={this.props.onChange}
            />
            <input
                type="number"
                value={this.props.value}
                onChange={this.props.onChange}
                className={styles.inputBox}
            />
        </div>
    }
}