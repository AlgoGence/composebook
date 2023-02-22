export const ColorLib = {
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and l in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSL representation
     */
    rgbToHsl: function (r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0; // achromatic
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, l];
    },

    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h, s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  l       The lightness
     * @return  Array           The RGB representation
     */
    hslToRgb: function (h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;

            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [r * 255, g * 255, b * 255];
    },

    /**
     * Converts an RGB color value to HSV. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h, s, and v in the set [0, 1].
     *
     * @param   Number  r       The red color value
     * @param   Number  g       The green color value
     * @param   Number  b       The blue color value
     * @return  Array           The HSV representation
     */
    rgbToHsv: function (r, g, b) {
        r /= 255, g /= 255, b /= 255;

        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }

            h /= 6;
        }

        return [h, s, v];
    },

    /**
     * Converts an HSV color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
     * Assumes h, s, and v are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     *
     * @param   Number  h       The hue
     * @param   Number  s       The saturation
     * @param   Number  v       The value
     * @return  Array           The RGB representation
     */
    hsvToRgb: function (h, s, v) {
        var r, g, b;

        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);

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
    },

    rgbString: function(r,g,b){
        return `rgb(${r},${g},${b})`
    },
    rgbToCmyk: function(r, g, b, normalized){
        var c = 1 - (r / 255);
        var m = 1 - (g / 255);
        var y = 1 - (b / 255);
        var k = Math.min(c, Math.min(m, y));
        
        c = (c - k) / (1 - k);
        m = (m - k) / (1 - k);
        y = (y - k) / (1 - k);
        
        if(!normalized){
            c = Math.round(c * 10000) / 100;
            m = Math.round(m * 10000) / 100;
            y = Math.round(y * 10000) / 100;
            k = Math.round(k * 10000) / 100;
        }
        
        c = isNaN(c) ? 0 : c;
        m = isNaN(m) ? 0 : m;
        y = isNaN(y) ? 0 : y;
        k = isNaN(k) ? 0 : k;
        
        return [c,m,y,k]
    },
    cmykToRgb: function(c, m, y, k, normalized){
        c = (c / 100);
        m = (m / 100);
        y = (y / 100);
        k = (k / 100);
        
        c = c * (1 - k) + k;
        m = m * (1 - k) + k;
        y = y * (1 - k) + k;
        
        var r = 1 - c;
        var g = 1 - m;
        var b = 1 - y;
        
        if(!normalized){
            r = Math.round(255 * r);
            g = Math.round(255 * g);
            b = Math.round(255 * b);
        }
        
        return [r,g,b]
    },
    rgbaToHex: function(r,g,b,a,hexa=true){
        let hex = this.decToHex(r)+this.decToHex(g)+this.decToHex(b)
        let alpha = this.decToHex(a)
        if(hexa){
            return hex + alpha
        }
        else{
            return alpha + hex
        }
    },
    decToHex: function (input){
        let v = parseInt(input).toString(16);
        if(v.length == 1){
            return "0"+v
        }
        else{
            return v
        }
    },
    ahexToRgba: function(hex){
        let x = hex.slice(0,2)
        let a = parseInt(hex.slice(2,4),16)
        let r = parseInt(hex.slice(4,6),16)
        let g = parseInt(hex.slice(6,8),16)
        let b = parseInt(hex.slice(8,10),16)
        if(
            (x === "0x" || x === "0X") 
            && (
                !isNaN(a) 
                && !isNaN(r) 
                && !isNaN(g) 
                && !isNaN(b)
            )
        ){
            return [a,r,g,b]
        }
        return null
    },
    hexaToRgba: function(hex){
        let x = hex.slice(0,2)
        let r = parseInt(hex.slice(2,4),16)
        let g = parseInt(hex.slice(4,6),16)
        let b = parseInt(hex.slice(6,8),16)
        let a = parseInt(hex.slice(8,10),16)
        if(
            (x === "0x" || x === "0X") 
            && (
                !isNaN(a) 
                && !isNaN(r) 
                && !isNaN(g) 
                && !isNaN(b)
            )
        ){
            return [a,r,g,b]
        }
        return null
    }
}