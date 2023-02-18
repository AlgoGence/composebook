import React from 'react'

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props)
        this.canvasRef = React.createRef()
        this.hueCanvasRef = React.createRef()
        this.state = {
            //dimensions: { width: props.width, height: props.height },
            pos: [0, 0],
            mouseDown: false,
            huePos: [0, 0],
            hueMouseDown: false,
            preview: "white",
            hue: 0,
            saturation: 0,
            value: 0,
            hueColor: "red"
        }
        this.hueHorizontalPadding = 20
        this.hueThumbRadius = 10
        this.states = {}
        this.store = {}
    }

    takeStates(){
        this.setState(this.states)
        this.setStates = {}
    }

    componentDidMount() {
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
        this.hueColorCtx.fillRect(20, 10, this.hueColorCtx.canvas.width-40, this.hueColorCtx.canvas.height-20);
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
        if (!this.state.mouseDown) {
            return
        }
        this.onPickerMousePositionChange(e)
    }

    onPickerMousePositionChange(e){
        let x = (e.pageX - this.canvas.offsetLeft).clamp(0,this.canvas.width)
        let y = (e.pageY - this.canvas.offsetTop).clamp(0,this.canvas.height)
        this.setState({pos: [x, y]})
        let w = this.canvas.width
        let h = this.canvas.height
        let wf = x / w
        let hf = y / h
        let s = wf
        let v = 1 - hf
        this.setState({pos: [x, y]})
        this.onSaturationAndValueChange(s,v)
    }
    onSaturationAndValueChange(s,v){
        this.onHsvChange(null,s,v)
    }
    onCanvasMouseDown = (e) => {
        this.disableSelection()
        this.onPickerMousePositionChange(e)
        this.setState({mouseDown: true})
    }
    onCanvasMouseUp = (e) => {
        this.enableSelection()
        this.setState({mouseDown: false})
    }
    onCanvasMouseLeave = (e) => {
        //this.setState({mouseDown: false})
        if(this.state.mouseDown){
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
        //this.setState({mouseDown: false})
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
        if (!this.state.hueMouseDown) {
            return
        }
        this.onHueMousePositionChange(e)
    }
    onHueCanvasMouseDown = (e) => {
        this.onHueMousePositionChange(e)
        this.setState({hueMouseDown: true})
    }

    onHueMousePositionChange(e){
        let x = e.pageX - e.target.offsetLeft
        let y = e.pageY - e.target.offsetTop
        let w = this.hueCanvas.width
        let p = this.hueHorizontalPadding
        let hue = ((x-p).clamp(0,w-p*2)/(w-p*2))
        this.onHueChange(hue)
        this.setState({huePos: [x, y]})
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
        state.preview = `rgb(${rgb1[0]},${rgb1[1]},${rgb1[2]})`
        this.setState(state)
    }
    onHueCanvasMouseUp = (e) => {
        this.setState({hueMouseDown: false})
    }
    onHueCanvasMouseLeave = (e) => {
        this.setState({hueMouseDown: false})
    }

    render() {
        return (<div>
            <div
                style={{
                    display: "flex",
                    flexDirection:"row"
                }}
            >
                <div
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
        </div>);
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
