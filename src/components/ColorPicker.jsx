import React from 'react'
import { useRef, useEffect } from 'react'
import {useState} from 'react';
//import { SketchPicker } from 'react-color'

/*
export default function ColorPicker(props) {
  return <SketchPicker/>
} */


export default class ColorPicker extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            //dimensions: { width: props.width, height: props.height },
            pos: [0,0],
            mouseDown: false
        }
    }
    componentDidMount() {
        this.canvas = this.refs.canvas
        this.ColorCtx = this.canvas.getContext("2d")
      }

      componentDidUpdate() {
           var color = 'rgba(0,0,255,1)';
                  let gradientH = this.ColorCtx.createLinearGradient(0, 0, this.ColorCtx.canvas.width, 0);
                  gradientH.addColorStop(0, '#fff');
                  gradientH.addColorStop(1, color);
                  this.ColorCtx .fillStyle = gradientH;
                  this.ColorCtx .fillRect(0, 0, this.ColorCtx.canvas.width, this.ColorCtx.canvas.height);


                  // Create a Vertical Gradient(white to black)
                   let gradientV = this.ColorCtx.createLinearGradient(0, 0, 0, this.ColorCtx.canvas.height);
                   gradientV.addColorStop(0, 'rgba(0,0,0,0)');
                   gradientV.addColorStop(1, '#000');
                   this.ColorCtx .fillStyle = gradientV;
                   this.ColorCtx .fillRect(0, 0, this.ColorCtx.canvas.width, this.ColorCtx.canvas.height);

                   this.ColorCtx.beginPath();
                    this.ColorCtx.arc(this.state.pos[0],this.state.pos[1],10, 0, 2 * Math.PI);
                    this.ColorCtx.strokeStyle = "black";
                    this.ColorCtx.lineWidth = 2;
                    this.ColorCtx.stroke();
                    this.ColorCtx.closePath();

                  this.ColorCtx.beginPath();
                    this.ColorCtx.arc(this.state.pos[0],this.state.pos[1],12, 0, 2 * Math.PI);
                    this.ColorCtx.strokeStyle = "white";
                    this.ColorCtx.lineWidth = 4;
                    this.ColorCtx.stroke();
                    this.ColorCtx.closePath();
        }
    onCanvasMouseMove = (e) => {
        if(!this.state.mouseDown){
            return
        }
        this.setState({pos:[e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop]})
      }
          onCanvasMouseDown = (e) => {
            this.setState({pos:[e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop]})
            this.setState({mouseDown:true})
          }
          onCanvasMouseUp = (e) => {
            this.setState({mouseDown:false})
          }
          onCanvasMouseLeave = (e) => {
            this.setState({mouseDown:false})
          }
  render() {
    return (<div>
              <canvas
                ref="canvas" {...this.props}
                onMouseMove={this.onCanvasMouseMove}
                onMouseDown={this.onCanvasMouseDown}
                onMouseUp={this.onCanvasMouseUp}
                onMouseLeave={this.onCanvasMouseLeave}
              />
              <br></br>
              <p>{`${this.state.pos[0]},${this.state.pos[1]}`}</p>
          </div>);
  }
}

/* export default function ColorPicker(props) {

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [pos, setPos] = useState([0,0]);
    const [mouseDown, setMouseDown] = useState(false);

    const canvasRef = useRef(null)

      const draw = (ColorCtx, frameCount) => {
        var color = 'rgba(0,0,255,1)';
        let gradientH = ColorCtx .createLinearGradient(0, 0, ColorCtx.canvas.width, 0);
        gradientH.addColorStop(0, '#fff');
        gradientH.addColorStop(1, color);
        ColorCtx .fillStyle = gradientH;
        ColorCtx .fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);


        // Create a Vertical Gradient(white to black)
         let gradientV = ColorCtx.createLinearGradient(0, 0, 0, ColorCtx.canvas.height);
         gradientV.addColorStop(0, 'rgba(0,0,0,0)');
         gradientV.addColorStop(1, '#000');
         ColorCtx .fillStyle = gradientV;
         ColorCtx .fillRect(0, 0, ColorCtx.canvas.width, ColorCtx.canvas.height);

         ColorCtx.beginPath();
          ColorCtx.arc(pos[0],pos[1],10, 0, 2 * Math.PI);
          ColorCtx.strokeStyle = "black";
          ColorCtx.lineWidth = 2;
          ColorCtx.stroke();
          ColorCtx.closePath();

        ColorCtx.beginPath();
          ColorCtx.arc(pos[0],pos[1],12, 0, 2 * Math.PI);
          ColorCtx.strokeStyle = "white";
          ColorCtx.lineWidth = 4;
          ColorCtx.stroke();
          ColorCtx.closePath();
      }

      useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId
        draw(context, 0)
      }, [draw])
      const onCanvasMouseMove = function(e){
        if(!mouseDown){
            return
        }
        setPos([e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop])
      }
      const onCanvasMouseDown = function(e){
        setPos([e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop])
        setMouseDown(true)
      }
      const onCanvasMouseUp = function(e){
        setMouseDown(false)
      }
      const onCanvasMouseLeave = function(e){
        setMouseDown(false)
      }
      return <div>
          <canvas
            ref={canvasRef} {...props}
            onMouseMove={onCanvasMouseMove}
            onMouseDown={onCanvasMouseDown}
            onMouseUp={onCanvasMouseUp}
            onMouseLeave={onCanvasMouseLeave}
          />
          <br></br>
          <p>{`${pos[0]},${pos[1]}`}</p>
      </div>
} */
