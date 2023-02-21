import React from 'react'
export default class CheckerBoard extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef()
    }
    componentDidMount() {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvas.getContext("2d")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.draw()
    }
    
    draw(){
        const squareSize = this.props.squareSize || 20
        const lightColor = this.props.lightColor || "white"
        const darkColor = this.props.darkColor || "gray"
        let context = this.ctx
        let w = this.canvas.width
        let h = this.canvas.height
        let wc = w/squareSize + 1
        let hc = h/squareSize + 1
        for(let i=0; i<hc; i++) {
            for(let j=0; j<wc; j++) {
                context.fillStyle = ((i+j)%2==0) ? lightColor:darkColor;
                let xOffset = j*squareSize;
                let yOffset = i*squareSize;
                context.fillRect(xOffset, yOffset, squareSize, squareSize);
            }
        }
        context.strokeStyle = "black";
        context.strokeRect(0, 0, squareSize*wc, squareSize*hc)
    }
    
    render() {
        return <canvas
            ref={this.canvasRef}
            width={this.props.width}
            height={this.props.height}
            style={this.props.style}
        />
    }
}