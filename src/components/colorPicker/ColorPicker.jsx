import React from 'react'
import SaturationValuePicker from "./SaturationValuePicker";
import HuePicker from "./HuePicker";
import ColorPreview from "./ColorPreview";
import ValueSeeker from "./ValueSeeker";
import {ColorLib} from './ColorLib'
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props)
        this.config = {
            pickerHeight: 300,
            hueHeight: 50,
            containerBorder: "1px solid gray",
            containerBorderRadius: 8
        }
        this.state = {
            selectedModel: "RGB",
            color: {
                r: 255,
                g: 0,
                b: 0,

                h: 0,
                s: 1,
                v: 1,

                ss: 1,

                l: 0.5,

                c: 0,
                m: 100,
                y: 100,
                k: 0,
                
                a: 100
            },

            hue: 0,
            saturation: 1,
            value: 1,

            hueWidth: 0,
            hueHeight: this.config.hueHeight,

            pickerWidth: 0,
            pickerHeight: this.config.pickerHeight,

            previewWidth:0,
            previewHeight: this.config.pickerHeight
        }
        this.containerRef = React.createRef()
        this.containerStyle = {
            border: this.config.containerBorder,
            borderRadius: this.config.containerBorderRadius +"px"
        }
        this.rowStyle = {
            display: "flex",
            flexDirection: "row"
        }
        this.change = {}
    }
    onSaturationValueChange = (s,v)=>{
        let c = this.state.color
        this.onHSVChange(c.h,s,v)
    }
    onClickAction=()=>{
        this.setState({saturation: 0.5, value: 0.5})
    }
    onHueChange = (h)=>{
        let c = this.state.color
        this.onHSVChange(h,c.s,c.v)
    }
    onHSVChange(h,s,v){
        let c = this.state.color

        let [r,g,b] = ColorLib.hsvToRgb(h,s,v)
        let [hh,ss,l] = ColorLib.rgbToHsl(r,g,b)
        let [cc,m,y,k] = ColorLib.rgbToCmyk(r,g,b)
        
        c.h = h
        c.s = s
        c.v = v
        c.r = parseInt(r)
        c.g = parseInt(g)
        c.b = parseInt(b)
        
        c.ss = ss
        c.l = l

        c.c = cc
        c.m = m
        c.y = y
        c.k = k
        this.setState({color:c})
    }
    componentDidMount() {
        this.container = this.containerRef.current
        const ro = new ResizeObserver(entries => {
            for (let entry of entries) {
                this.onResize()
            }
        });
        ro.observe(this.container);
    }
    onResize(){
        let w = this.container.offsetWidth
        let state = {
            previewWidth: w*0.3,
            pickerWidth: w*0.7,
            hueWidth: w
        }
        this.setState(state)
    }
    Divider(){
        return <div
            style={{
                width: "100%",
                backgroundColor: "gray",
                height: "1px"
            }}
        ></div>
    }
    Heading(text){
        return <h2
            style={{
                margin: "16px"
            }}
        >
            {text}
        </h2>
    }
    SaturationValuePickerItem(){
        return <SaturationValuePicker
            width={this.state.pickerWidth}
            height={this.state.pickerHeight}
            hue={this.state.color.h}
            saturation={this.state.color.s}
            value={this.state.color.v}
            onChange={this.onSaturationValueChange}
        />
    }
    PreviewItem(){
        return <ColorPreview
            width={this.state.previewWidth+"px"}
            height={this.state.previewHeight+"px"}
            color={this.css()}
        />
    }
    css(){
        let c = this.state.color
        return `rgba(${c.r},${c.g},${c.b},${c.a/100})`
    }
    HuePickerItem(){
        return <HuePicker
            hue={this.state.color.h}
            onChange={this.onHueChange}
            width={this.state.hueWidth}
            height={this.state.hueHeight}
        />
    }
    PreviewAndPicker(){
        return <div style={this.rowStyle}>
            {this.PreviewItem()}
            {this.SaturationValuePickerItem()}
        </div>
    }
    LineBreak(){
        return <br/>
    }
    onChannelChange(id,value,group){
        if(id==='a'){
            let c = this.state.color
            c[id] = value
            this.setState({color:c})
        }
        else if(group==="HSV"){
            let c = this.state.color
            c[id] = value
            let [r,g,b] = ColorLib.hsvToRgb(c.h,c.s,c.v)
            let [h,ss,l] = ColorLib.rgbToHsl(r,g,b)
            let [cc,m,y,k] = ColorLib.rgbToCmyk(r,g,b)
            c.r = parseInt(r)
            c.g = parseInt(g)
            c.b = parseInt(b)
            c.h = h
            c.ss = ss
            c.l = l
            c.c = cc
            c.m = m
            c.y = y
            c.k = k
            this.setState({color:c})
        }
        else if(group==="CMYK"){
            let c = this.state.color
            c[id] = value
            let [r,g,b] = ColorLib.cmykToRgb(c.c,c.m,c.y,c.k)
            let [h,s,v] = ColorLib.rgbToHsv(r,g,b)
            let [hh,ss,l] = ColorLib.rgbToHsl(r,g,b)
            c.r = r
            c.g = g
            c.b = b

            c.h = h
            c.s = s
            c.v = v

            c.ss = ss
            c.l = l
            this.setState({color:c})
        }
        else if(group==="RGB"){
            let c = this.state.color
            c[id] = value
            let [h,s,v] = ColorLib.rgbToHsv(c.r,c.g,c.b)
            let [hh,ss,l] = ColorLib.rgbToHsl(c.r,c.g,c.b)
            let [cc,m,y,k] = ColorLib.rgbToCmyk(c.r,c.g,c.b)
            c.h = h
            c.s = s
            c.v = v
            c.ss = ss
            c.l = l
            c.c = cc
            c.m = m
            c.y = y
            c.k = k
            this.setState({color:c})
        }
        else if(group==="HSL"){
            let c = this.state.color
            c[id] = value
            let [r,g,b] = ColorLib.hslToRgb(c.h,c.ss,c.l)
            let [h,s,v] = ColorLib.rgbToHsv(r,g,b)
            let [cc,m,y,k] = ColorLib.rgbToCmyk(r,g,b)
            c.r = parseInt(r)
            c.g = parseInt(g)
            c.b = parseInt(b)
            c.v = v
            c.s = s
            c.c = cc
            c.m = m
            c.y = y
            c.k = k
            this.setState({color:c})
        }
    }
    ChannelSeeker(title,titleWidth,min,max,id,converter,step,group){
        return <ValueSeeker
            title={title}
            titleWidth={titleWidth+"px"}
            min={min}
            max={max}
            step={step}
            value={this.state.color[id]}
            onChange={(e)=>{this.onChannelChange(id,converter(e.target.value),group)}}
        />
    }
    Gap(w,h){
        return <div style={{width:w,height:h}}/>
    }
    Code(code){
        return <div
            style={{
                margin: "24px"
            }}
        >
            <CodeBlock 
                language='kotlin'
                
            >
                {code}
            </CodeBlock>
        </div>
    }
    RGBSection(){
        return <div>
            {this.Heading(`RGB(${this.state.color.r},${this.state.color.g},${this.state.color.b})`)}
            {this.ChannelSeeker("R",65,0,255,"r",(i)=>{return parseInt(i)},1,"RGB")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("G",65,0,255,"g",(i)=>{return parseInt(i)},1,"RGB")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("B",65,0,255,"b",(i)=>{return parseInt(i)},1,"RGB")}
            {this.Gap(0,5)}
            {this.Code(`Color(${this.state.color.r},${this.state.color.g},${this.state.color.b})`)}
            
        </div>        
    }
    HSVSection(){
        return <div>
            {this.Heading("HSV")}
            {this.ChannelSeeker("H",65,0,1,"h",(i)=>{return parseFloat(i)},0.001,"HSV")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("S",65,0,1,"s",(i)=>{return parseFloat(i)},0.001,"HSV")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("V",65,0,1,"v",(i)=>{return parseFloat(i)},0.001,"HSV")}
            {this.Gap(0,5)}
        </div>        
    }
    HSLSection(){
        return <div>
            {this.Heading("HSL")}
            {this.ChannelSeeker("H",65,0,1,"h",(i)=>{return parseFloat(i)},0.001,"HSL")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("S",65,0,1,"ss",(i)=>{return parseFloat(i)},0.001,"HSL")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("L",65,0,0.5,"l",(i)=>{return parseFloat(i)},0.001,"HSL")}
            {this.Gap(0,5)}
        </div>        
    }

    CMYKSection(){
        return <div>
            {this.Heading("CMYK")}
            {this.ChannelSeeker("C",65,0,100,"c",(i)=>{return parseFloat(i)},1,"CMYK")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("M",65,0,100,"m",(i)=>{return parseFloat(i)},1,"CMYK")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("Y",65,0,100,"y",(i)=>{return parseFloat(i)},1,"CMYK")}
            {this.Gap(0,5)}
            {this.ChannelSeeker("K",65,0,100,"k",(i)=>{return parseFloat(i)},1,"CMYK")}
            {this.Gap(0,5)}
        </div>        
    }
    PickerSection(){
        return <div>
            {this.PreviewAndPicker()}
            {this.LineBreak()}
            {this.HuePickerItem()}
            {this.ChannelSeeker("Alpha",65,0,100,"a",(i)=>{return parseInt(i)},1,"Alpha")}
        </div>
    }
    SlidersSection(){
        switch(this.state.selectedModel){
            case "RGB": {
                return <>{this.RGBSection()}</>
            }
            case "HSV": {
                return <>{this.HSVSection()}</>
            }
            case "HSL": {
                return <>{this.HSLSection()}</>
            }
            case "CMYK": {
                return <>{this.CMYKSection()}</>
            }
            case "ALL": {
                return <>
                    {this.RGBSection()}
                    {this.Divider()}
                    {this.HSVSection()}
                    {this.Divider()}
                    {this.HSLSection()}
                    {this.Divider()}
                    {this.CMYKSection()}
                </>
            }
        }
        
    }
    onTabClick(group){
        console.log(group)
        this.setState({selectedModel: group})
    }
    TabLink(group){
        return <button 
            className={this.state.selectedModel === group ? styles.activeTablinks : styles.tablinks} 
            onClick={()=>{this.onTabClick(group)}}>
            {group}
        </button>
    }
    TabsSection(){
        return <div className={styles.tab}>
            {this.TabLink("RGB")}
            {this.TabLink("HSV")}
            {this.TabLink("HSL")}
            {this.TabLink("CMYK")}
            {this.TabLink("ALL")}
        </div>
    }
    render() {
        return <div ref={this.containerRef} style={this.containerStyle}>
            {this.Heading("Color Picker")}
            {this.Divider()}
            {this.PickerSection()}
            {this.LineBreak()}
            {this.Divider()}
            {this.TabsSection()}
            {this.SlidersSection(0)}
        </div>

    }
    previewColor(){
        let [r,g,b] = ColorLib.hsvToRgb(this.state.hue, this.state.saturation, this.state.value)
        return ColorLib.rgbString(r,g,b)
    }
}