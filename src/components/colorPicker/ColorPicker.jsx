import React from 'react'
import HueSaturationPicker from "./HueSaturationPicker";

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saturation: 1,
            value: 1
        }
    }
    onChange = (s,v)=>{
        console.log(s,v)
        this.setState({saturation: s, value: v})
    }
    onClickAction=()=>{
        this.setState({saturation: 0.5, value: 0.5})
    }
    render() {
        return <div>
            <HueSaturationPicker
                hue={1}
                width={this.props.width}
                height={this.props.height}
                saturation={this.state.saturation}
                value={this.state.value}
                onChange={this.onChange}
            />
            <span
                onClick={this.onClickAction}
            >Click</span>
        </div>

    }
}