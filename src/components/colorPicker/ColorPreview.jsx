import React from 'react'
import CheckerBoard from './CheckerBoard';

export default class ColorPreview extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <div
        >
            <CheckerBoard 
                width={this.props.width} 
                height={this.props.height}
                style={{
                    position: 'absolute'
                }}
            />
            <div
                style={{
                    backgroundColor: this.props.color,
                    width: this.props.width,
                    height: this.props.height,
                    cursor: "pointer",
                    position: 'absolute'
                }}
            ></div>
            
        </div>
        
    }
}