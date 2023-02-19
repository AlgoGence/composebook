import React from 'react'
import styles from './styles.module.css';

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.previewRef = React.createRef()
        this.hueCanvasRef = React.createRef()
        this.containerRef = React.createRef()
        this.state = {
            //dimensions: { width: props.width, height: props.height },
            pos: [0, 0],
            huePos: [0, 0],
            preview: "white",
            hue: 0,
            saturation: 0,
            value: 1,
            hueColor: "red",
            red: 255,
            green: 255,
            blue: 255
        }
        this.hueHorizontalPadding = 20
        this.hueThumbRadius = 10
        this.states = {}
        this.store = {}
        this.stateUpdateImmediate = true
        this.mouseDown = false
        this.hueMouseDown = false
    }

    takeStates(){
        console.log(this.states)
        this.setStates(this.states)
        this.setStatess = {}
    }

    componentDidMount() {
        this.container = this.containerRef.current
        this.preview = this.previewRef.current
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.onResize()
            }
        });
        ro.observe(this.container);

        this.canvas = this.canvasRef.current
        this.hueCanvas = this.hueCanvasRef.current
        this.ColorCtx = this.canvas.getContext("2d")
        this.hueColorCtx = this.hueCanvasRef.current.getContext("2d")
    }
    drawSaturationGradient() {
        let gradientH = this.ColorCtx.createLinearGradient(0, 0, this.ColorCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, this.state.hueColor);
        this.ColorCtx.fillStyle = gradientH;
        this.ColorCtx.fillRect(0, 0, this.ColorCtx.canvas.width, this.ColorCtx.canvas.height);
    }

    drawDarknessGradient() {
        let gradientV = this.ColorCtx.createLinearGradient(0, 0, 0, this.ColorCtx.canvas.height);
        gradientV.addColorStop(0, 'rgba(0,0,0,0)');
        gradientV.addColorStop(1, '#000');
        this.ColorCtx.fillStyle = gradientV;
        this.ColorCtx.fillRect(0, 0, this.ColorCtx.canvas.width, this.ColorCtx.canvas.height);
    }


    drawThumbOuterStroke() {
        this.ColorCtx.beginPath();
        this.ColorCtx.arc(this.state.pos[0], this.state.pos[1], 12, 0, 2 * Math.PI);
        this.ColorCtx.strokeStyle = "white";
        this.ColorCtx.lineWidth = 2;
        this.ColorCtx.stroke();
        this.ColorCtx.closePath();


        this.ColorCtx.beginPath();
        this.ColorCtx.arc(this.state.pos[0], this.state.pos[1], 12, 0, 2 * Math.PI);
        let rgb = hsvToRgb(this.state.hue, this.state.saturation, this.state.value)
        this.ColorCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
        this.ColorCtx.closePath();
    }
    drawColorPickerThumb() {
        this.drawThumbOuterStroke()
    }
    drawColorPicker() {
        this.drawSaturationGradient()
        this.drawDarknessGradient()
        this.drawColorPickerThumb()
    }
    drawHuePicker() {
        this.hueColorCtx.imageSmoothingEnabled = true;
        this.hueColorCtx.clearRect(0, 0, this.hueColorCtx.canvas.width, this.hueColorCtx.canvas.height);
        let gradientH = this.hueColorCtx.createLinearGradient(0, 0, this.hueColorCtx.canvas.width, 0);
        gradientH.addColorStop(0, 'red');
        gradientH.addColorStop(1/6, 'yellow');
        gradientH.addColorStop(2/6, 'green');
        gradientH.addColorStop(3/6, 'cyan');
        gradientH.addColorStop(4/6, 'blue');
        gradientH.addColorStop(5/6, 'magenta');
        gradientH.addColorStop(6/6, 'red');
        this.hueColorCtx.fillStyle = gradientH;
        //this.hueColorCtx.fillRect(20, 10, this.hueColorCtx.canvas.width-40, this.hueColorCtx.canvas.height-20);
        this.hueColorCtx.roundRect(20, 20, this.hueColorCtx.canvas.width-40, this.hueColorCtx.canvas.height-40,50)
        this.hueColorCtx.fill()
        let start = this.state.huePos[0]
        if(start<this.hueHorizontalPadding){
            start = this.hueHorizontalPadding
        }
        if(start>this.hueColorCtx.canvas.width-this.hueHorizontalPadding){
            start = this.hueColorCtx.canvas.width-this.hueHorizontalPadding
        }


        this.hueColorCtx.beginPath();
        this.hueColorCtx.arc(start, this.hueColorCtx.canvas.height/2, this.hueThumbRadius, 0, 2 * Math.PI);
        this.hueColorCtx.strokeStyle = "white";
        this.hueColorCtx.lineWidth = 3;
        this.hueColorCtx.stroke();
        this.hueColorCtx.closePath();

        this.hueColorCtx.beginPath();
        this.hueColorCtx.arc(start, this.hueColorCtx.canvas.height/2, this.hueThumbRadius-1, 0, 2 * Math.PI);
        this.hueColorCtx.fillStyle = this.state.hueColor;
        this.hueColorCtx.fill();
        this.hueColorCtx.closePath();
    }
    componentDidUpdate() {
        this.drawColorPicker()
        this.drawHuePicker()
    }

    /////////
    onCanvasMouseMove = (e) => {
        if (!this.mouseDown) {
            return
        }
        this.onPickerMousePositionChange(e)
    }

    onPickerMousePositionChange(e){
        let x = (e.pageX - this.canvas.offsetLeft).clamp(0,this.canvas.width)
        let y = (e.pageY - this.canvas.offsetTop).clamp(0,this.canvas.height)
        this.onPickerMouseXYObtained(x,y)
    }
    onSaturationAndValueChange(s,v){
        this.onHsvChange(null,s,v)
    }
    onCanvasMouseDown = (e) => {
        this.disableSelection()
        this.onPickerMousePositionChange(e)
        this.mouseDown = true
    }
    onCanvasMouseUp = (e) => {
        this.enableSelection()
        this.mouseDown = false
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
    onCanvasMouseEnter = (e) => {
        //this.setStates({mouseDown: false})
    }
    disableSelection(){
        document.onselectstart = (e) => {
            e.preventDefault();
        }
    }
    enableSelection(){
        document.onselectstart = null
    }
    ///////////////////////////////////
    onHueCanvasMouseMove = (e) => {
        if (!this.hueMouseDown) {
            return
        }
        this.onHueMousePositionChange(e)
    }
    onHueCanvasMouseDown = (e) => {
        this.onHueMousePositionChange(e)
        this.hueMouseDown = true
    }

    onHueMousePositionChange(e){
        let x = e.pageX - e.target.offsetLeft
        this.onHueMouseXObtained(x)
    }
    onHueChange(hue){
        this.onHsvChange(hue,null,null)
    }
    onHsvChange(h,s,v){
        let state = {}
        state.hue = h || this.state.hue
        state.saturation = s || this.state.saturation
        state.value = v || this.state.value
        let rgb = hsvToRgb(state.hue,1,1)
        if(h!=null){
            state.hueColor = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
        }
        let rgb1 = hsvToRgb(state.hue,state.saturation,state.value)
        console.log("calculated",rgb1)
        state.red = rgb1[0]
        state.green = rgb1[1]
        state.blue = rgb1[2]
        state.preview = `rgb(${rgb1[0]},${rgb1[1]},${rgb1[2]})`
        this.setStates(state)
    }
    onHueCanvasMouseUp = (e) => {
        this.hueMouseDown = false
    }
    onHueCanvasMouseLeave = (e) => {
        this.hueMouseDown = false
    }
    onResize(){
        let w = this.container.offsetWidth
        this.preview.style.width = (w*0.3).px
        this.canvas.width = w*0.7
        this.hueCanvas.width = w
        this.drawColorPicker()
        this.drawHuePicker()
    }
    onRedChange = (e) => {
        let r = parseInt(e.target.value)
        this.onRGBChanged(r,this.state.green,this.state.blue)
    }
    onRGBChanged(r,g,b){
        console.log("original",r,g,b)
        let prev = this.stateUpdateImmediate
        this.stateUpdateImmediate = false
        let hsv = rgbToHsv(r,g,b)

        let h = hsv[0]
        let s = hsv[1]
        let v = hsv[2]
        let w = this.hueCanvas.width

        let pw = this.canvas.width
        let ph = this.canvas.height
        let p = this.hueHorizontalPadding
        let x = h*(w-2*p)+p
        this.onHueMouseXObtained(x)

        let px = s*pw
        let py = (1-v)*ph
        this.onPickerMouseXYObtained(px,py)
        this.takeStates()
        this.stateUpdateImmediate = prev
    }
    onGreenChange = (e) => {
        let g = parseInt(e.target.value)
        this.onRGBChanged(this.state.red,g,this.state.blue)
    }
    onBlueChange = (e) => {
        let b = parseInt(e.target.value)
        this.onRGBChanged(this.state.red,this.state.green,b)
    }
    render() {
        return (<div
            ref={this.containerRef}
            style={{
                border: "1px solid gray",
                borderRadius: "8px"
            }}
        >
            <h2
                style={{
                    margin: "16px"
                }}
            >
                Color Picker
            </h2>
            <div
                style={{
                    width: "100%",
                    backgroundColor: "gray",
                    height: "1px"
                }}
            ></div>
            <div
                style={{
                    display: "flex",
                    flexDirection:"row"
                }}
            >
                <div
                    ref={this.previewRef}
                    style={{
                        width: "150px",
                        height: this.props.height,
                        backgroundColor: `${this.state.preview}`
                    }}
                ></div>
                <canvas
                    ref={this.canvasRef} {...this.props}
                    onMouseMove={this.onCanvasMouseMove}
                    onMouseDown={this.onCanvasMouseDown}
                    onMouseUp={this.onCanvasMouseUp}
                    onMouseLeave={this.onCanvasMouseLeave}
                />
            </div>

            <br></br>
            <canvas
                ref={this.hueCanvasRef}
                width="600"
                height={"50px"}
                onMouseMove={this.onHueCanvasMouseMove}
                onMouseDown={this.onHueCanvasMouseDown}
                onMouseUp={this.onHueCanvasMouseUp}
                onMouseLeave={this.onHueCanvasMouseLeave}
            />
            <br/>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px"
                }}
            >
                <input
                    type="range"
                    min="1"
                    max="255"
                    value={this.state.red}
                    className={styles.colorRanger}
                    style={{
                        width: "100%"
                    }}
                    onChange={this.onRedChange}
                />
                <span>{this.state.red.round}</span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px"
                }}
            >
                <input
                    type="range"
                    min="1"
                    max="255"
                    value={this.state.green}
                    className={styles.colorRanger}
                    style={{
                        width: "100%"
                    }}
                    onChange={this.onGreenChange}
                />
                <span>{this.state.green.round}</span>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "24px"
                }}
            >
                <input
                    type="range"
                    min="1"
                    max="255"
                    value={this.state.blue}
                    className={styles.colorRanger}
                    style={{
                        width: "100%"
                    }}
                    onChange={this.onBlueChange}
                />
                <span>{this.state.blue.round}</span>
            </div>
        </div>);
    }

    onHueMouseXObtained(x) {
        let w = this.hueCanvas.width
        let p = this.hueHorizontalPadding
        let hue = ((x-p).clamp(0,w-p*2)/(w-p*2))
        this.onHueChange(hue)
        this.setStates({huePos: [x, 0]})
    }

    onPickerMouseXYObtained(x, y) {
        this.setStates({pos: [x, y]})
        let w = this.canvas.width
        let h = this.canvas.height
        let wf = x / w
        let hf = y / h
        let s = wf
        let v = 1 - hf
        this.setStates({pos: [x, y]})
        this.onSaturationAndValueChange(s,v)
    }
    setStates(value){
        console.log(this.states)
        let thiz = this
        if(this.stateUpdateImmediate===true){
            thiz.setState(value)
        }
        else{
            Object.keys(value).forEach(function (key){
                thiz.states[key] = value[key]
            })
        }
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
function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [ h, s, v ];
}
