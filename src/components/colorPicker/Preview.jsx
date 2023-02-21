import React from 'react'
import SaturationValuePicker from "./SaturationValuePicker";
export default class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pickerWidth: 300,
            pickerHeight: 300,
            hue: 1,
            saturation: 1,
            value: 1
        }
    }
    onSaturationValueChange=(s,v)=>{
        this.setState({saturation: s, value: v})
    }
    render() {
        return <SaturationValuePicker
            width={this.state.pickerWidth}
            height={this.state.pickerHeight}
            hue={this.state.hue}
            saturation={this.state.saturation}
            value={this.state.value}
            onChange={this.onSaturationValueChange}
        />
    }
}