import React from 'react'

export default class HuePicker extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef()
        this.state = {

        }
        this.mouseDown = false
        this.store = {}
        this.hueThumbRadius = 10
        this.hueHorizontalPadding = 20
    }
    componentDidMount() {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvas.getContext("2d")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.draw()
    }
    enableSelection(){
        document.onselectstart = null
    }
    disableSelection(){
        document.onselectstart = (e) => {
            e.preventDefault();
        }
    }
    onCanvasMouseUp = (e) => {
        this.enableSelection()
        this.mouseDown = false
    }
    onCanvasMouseDown = (e) => {
        this.disableSelection()
        this.mouseDown = true
        this.onMousePositionChange(e)
    }
    onCanvasMouseMove = (e) => {
        if (!this.mouseDown) {
            return
        }
        this.onMousePositionChange(e)
    }
    onCanvasMouseLeave = (e) => {
        if(this.mouseDown){
            this.disableSelection()
            this.store.windowMouseMove = window.onmousemove
            let thiz = this
            this.store.onmouseup = window.onmouseup
            window.onmouseup = function (){
                window.onmouseup = thiz.store.onmouseup
                delete thiz.store.onmouseup
                thiz.enableSelection()
                window.onmousemove = thiz.store.windowMouseMove
                delete thiz.store.windowMouseMove
                thiz.onCanvasMouseUp()
            }
            window.onmousemove = this.onCanvasMouseMove
        }
    }
    draw(){
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        let gradientH = this.ctx.createLinearGradient(0, 0, this.ctx.canvas.width, 0);
        gradientH.addColorStop(0, 'red');
        gradientH.addColorStop(1/6, 'yellow');
        gradientH.addColorStop(2/6, 'green');
        gradientH.addColorStop(3/6, 'cyan');
        gradientH.addColorStop(4/6, 'blue');
        gradientH.addColorStop(5/6, 'magenta');
        gradientH.addColorStop(6/6, 'red');
        this.ctx.fillStyle = gradientH;
        //this.ctx.fillRect(20, 10, this.ctx.canvas.width-40, this.ctx.canvas.height-20);
        this.ctx.roundRect(20, 20, this.ctx.canvas.width-40, this.ctx.canvas.height-40,50)
        this.ctx.fill()
        let pos = [this.props.hue*(this.canvas.width - this.hueHorizontalPadding*2)+this.hueHorizontalPadding,0]
        let start = pos[0]
        if(start<this.hueHorizontalPadding){
            start = this.hueHorizontalPadding
        }
        if(start>this.ctx.canvas.width-this.hueHorizontalPadding){
            start = this.ctx.canvas.width-this.hueHorizontalPadding
        }


        this.ctx.beginPath();
        this.ctx.arc(start, this.ctx.canvas.height/2, this.hueThumbRadius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.arc(start, this.ctx.canvas.height/2, this.hueThumbRadius-1, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.state.hueColor;
        this.ctx.fill();
        this.ctx.closePath();
    }
    render() {
        return <canvas
            ref={this.canvasRef}
            onMouseMove={this.onCanvasMouseMove}
            onMouseDown={this.onCanvasMouseDown}
            onMouseUp={this.onCanvasMouseUp}
            onMouseLeave={this.onCanvasMouseLeave}
            width={this.props.width}
            height={this.props.height}
        />
    }

    onMousePositionChange(e) {
        let x = (e.pageX - this.canvas.offsetLeft - this.hueHorizontalPadding).clamp(0,this.canvas.width - this.hueHorizontalPadding*2)
        let width = this.canvas.width - this.hueHorizontalPadding*2
        let h = x / width
        this.props.onChange(h)
    }
}