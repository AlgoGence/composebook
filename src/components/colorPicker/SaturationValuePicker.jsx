import React from 'react'
import {ColorLib} from './ColorLib'
export default class SaturationValuePicker extends React.Component {
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

        this.ctx.fillStyle = this.getFinalColor()
        this.ctx.fill()
        this.ctx.closePath();
    }
    getFinalColor(){
        let h = this.props.hue
        let s = this.props.saturation
        let v = this.props.value
        let [r,g,b] = ColorLib.hsvToRgb(h,s,v)
        return `rgb(${r},${g},${b})`
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
        let h = this.props.hue
        let css = `hsl(${h*360},100%,50%)`
        return css
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