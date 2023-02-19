import React from 'react'

export default class HueSaturationPicker extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef()
        this.state = {

        }
        this.mouseDown = false
        this.store = {}
    }
    componentDidMount() {
        this.canvas = this.canvasRef.current
        this.ctx = this.canvas.getContext("2d")
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevProps,prevState,snapshot)
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
        let gradientH = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, this.getCoreColor());
        this.ctx.fillStyle = gradientH;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        let gradientV = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        this.ctx.fillStyle = gradientV;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        let pos = [this.props.saturation*this.canvas.width,(1-this.props.value)*this.canvas.height]
        this.ctx.beginPath();
        this.ctx.arc(pos[0], pos[1], 12, 0, 2 * Math.PI);
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();


        this.ctx.beginPath();
        this.ctx.arc(pos[0], pos[1], 12, 0, 2 * Math.PI);
        let rgb = hsvToRgb(this.props.hue, this.props.saturation, this.props.value)
        this.ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        this.ctx.fill()
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

    getCoreColor() {
        let rgb = hsvToRgb(this.props.hue,1,1)
        return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    }

    onMousePositionChange(e) {
        let x = (e.pageX - this.canvas.offsetLeft).clamp(0,this.canvas.width)
        let y = (e.pageY - this.canvas.offsetTop).clamp(0,this.canvas.height)
        let width = this.canvas.width
        let height = this.canvas.height
        let wf = x / width
        let hf = y / height
        let s = wf
        let v = 1 - hf
        this.props.onChange(s,v)
    }
}
function hsvToRgb(h, s, v) {
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            r = v, g = t, b = p;
            break;
        case 1:
            r = q, g = v, b = p;
            break;
        case 2:
            r = p, g = v, b = t;
            break;
        case 3:
            r = p, g = q, b = v;
            break;
        case 4:
            r = t, g = p, b = v;
            break;
        case 5:
            r = v, g = p, b = q;
            break;
    }

    return [r * 255, g * 255, b * 255];
}