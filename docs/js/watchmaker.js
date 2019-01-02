/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */function drawerFactory_registerDrawerType(drawerType, constructorFunction) {
    this.properties[drawerType] = constructorFunction;
    // console.log("Registered Drawer Type " + drawerType);

}

function drawerFactory_getDrawer(drawerFactoryType, drawingObject) {
    var drawer;
    try {
        drawer = this.properties[drawerFactoryType](drawingObject);
    } catch (err) {
        console.error("DrawerFactory can't find a registered drawer for type '" + drawerFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.properties){
            // console.log(propt + ': ' + this.properties[propt]);
        }
        // console.log("err: " + err);
    }
    return drawer;
}

function DrawerFactory() {
    this.properties = {};
    this.registerDrawerType = drawerFactory_registerDrawerType;
    this.getDrawer = drawerFactory_getDrawer;
}

function testDrawer(drawerType, drawingObject) {
    drawer = _drawerFactorySingleton.getDrawer(drawerType, drawingObject);
    drawer.setColor("black");
    drawer.penSize(1);
    drawer.moveTo(0,0);
    drawer.lineTo(100,100);
    
    drawer.frameRect(new Rect(100,0,200,100));
    drawer.paintRect(new Rect(200,0,300,100));

    drawer.frameRect(new Rect(300,0,400,50));
    drawer.frameOval(new Rect(300,0,400,50));

    drawer.frameRect(new Rect(400,0,500,50));
    drawer.paintOval(new Rect(400,0,500,50));

    drawer.frameRect(new Rect(500,0,600,50));
    drawer.setColor("#00FF00");
    drawer.paintOval(new Rect(500,0,600,50));
    drawer.setColor("#000000");
    drawer.frameOval(new Rect(500,0,600,50));
}    




var _drawerFactorySingleton = new DrawerFactory();
function canvas2DDrawer_erase() {
    // Store the current transformation matrix
    //drawingContext.save();
    // Use the identity matrix while clearing the canvas
    this.setTransform(1, 0, 0, 1, 0, 0);
    var width = this.getWidth();
    var height = this.getHeight();
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    // console.log('erase ' + width + 'x' + height);

    this.drawingContext.clearRect(0, 0, width, height);
    this.setColor('#FF0000');
    this.drawingContext.strokeStyle = 'red';
    this.penSize(4);
    this.moveTo(0,0);
    this.lineTo(200,200);
    
    this.drawingContext.translate(halfWidth + 0.5, halfHeight / 2 + 0.5);
//    if(drawCrossHairs) {
//        this.drawingContext.beginPath();
//        // Draw crosshairs
//        this.drawingContext.moveTo(-halfWidth, 0);
//        this.drawingContext.lineTo(halfWidth,0);
//        this.drawingContext.moveTo(0, -halfHeight);
//        this.drawingContext.lineTo(0,halfHeight);
//        this.drawingContext.closePath;
//        this.drawingContext.lineWidth = 0.5;
//        this.drawingContext.setColor = "red";
//        this.drawingContext.stroke();
//    }
}

function canvas2DDrawer_penSize(penSize) {
    if(penSize === undefined) {
        return this.drawingContext.lineWidth * 2;
    } else {
//        // console.log("canvas2DDrawer.penSize = " + penSize);
        this.drawingContext.lineWidth = penSize / 2;
    }
}

function canvas2DDrawer_setColor(color) {
    this.drawingContext.strokeStyle = color;
    this.drawingContext.fillStyle = color;
//    // console.log('setColor ' + color);
}

function canvas2DDrawer_moveTo(x,y) {
    this.drawingContext.beginPath();
    this.drawingContext.moveTo(x,y);
}
function canvas2DDrawer_lineTo(x,y) {
    this.drawingContext.lineTo(x,y);
    this.drawingContext.stroke();
}

function canvas2DDrawer_frameOval(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.stroke();
}

function canvas2DDrawer_paintOval(rect) {
    var cx = (rect.left + rect.right) / 2;
    var cy = (rect.top + rect.bottom) / 2;
    var rx = (rect.right - rect.left) / 2;
    var ry = (rect.bottom - rect.top) / 2;
        
    this.drawingContext.save(); // save state
    this.drawingContext.beginPath();

    this.drawingContext.translate(cx-rx, cy-ry);
    this.drawingContext.scale(rx, ry);
    this.drawingContext.arc(1, 1, 1, 0, 2 * Math.PI, false);

    this.drawingContext.restore(); // restore to original state
    this.drawingContext.fill();
}


function canvas2DDrawer_paintRect(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.fillRect(rect.left, rect.top, width, height);
}
function canvas2DDrawer_frameRect(rect) {
    var width = (rect.right - rect.left);
    var height = (rect.bottom - rect.top);
    this.drawingContext.strokeRect(rect.left, rect.top, width, height);
    
}

function canvas2DDrawer_getHeight() {
    return this.drawingObject.height;
}
function canvas2DDrawer_getWidth() {
    return this.drawingObject.width;
}

function canvas2DDrawer_translate(x,y) {
    this.drawingContext.translate(x,y);
}
function canvas2DDrawer_save() {
    this.drawingContext.save();
}
function canvas2DDrawer_restore() {
    this.drawingContext.restore();
}
function canvas2DDrawer_setTransform(x1, x2, x3, x4, x5, x6) {
    this.drawingContext.setTransform(x1, x2, x3, x4, x5, x6);
}
function canvas2DDrawer_clearRect(x1, x2, x3, x4) {
    this.drawingContext.beginPath();
        
    this.drawingContext.clearRect(x1, x2, x3, x4);
}

function canvas2DDrawer_drawLine(x1, y1, x2, y2) {
    var drawingContext = this.drawingContext;
    drawingContext.beginPath();
    drawingContext.moveTo(x1, y1);
    drawingContext.lineTo(x2, y2);
    drawingContext.stroke();
}

function canvas2DDrawer_stroke() {
    this.drawingContext.stroke();
}




function Canvas2DDrawer(drawingObject) {
    this.drawingObject = drawingObject;
    this.drawingContext = drawingObject.getContext('2d');
    this.getHeight = canvas2DDrawer_getHeight;
    this.getWidth = canvas2DDrawer_getWidth;
    this.penSize = canvas2DDrawer_penSize;
    this.moveTo = canvas2DDrawer_moveTo;
    this.lineTo = canvas2DDrawer_lineTo;
    this.frameRect = canvas2DDrawer_frameRect;
    this.paintRect = canvas2DDrawer_paintRect;
    this.frameOval = canvas2DDrawer_frameOval;
    this.paintOval = canvas2DDrawer_paintOval;
    this.setColor = canvas2DDrawer_setColor;
    this.translate = canvas2DDrawer_translate;
    this.save = canvas2DDrawer_save;
    this.restore = canvas2DDrawer_restore;
    this.setTransform = canvas2DDrawer_setTransform;
    this.erase = canvas2DDrawer_erase;
    this.drawingContext.translate(0.5, 0.5);
    this.clearRect = canvas2DDrawer_clearRect;
    this.drawLine = canvas2DDrawer_drawLine;
    this.stroke = canvas2DDrawer_stroke;
}


_drawerFactorySingleton.registerDrawerType("canvas2d", (
        function(drawingObject) { 
            return new Canvas2DDrawer(drawingObject);}));



/*
 * drawing_context_nop.js
 * 
 * Author: Alan Canon
 * 
 * No-operation implementation of a drawer, for use as a prototype
 * for new drawers.
 */

function nopDrawer_penSize(penSize) {
}

function nopDrawer_setColor(color) {
}

function nopDrawer_moveTo(x,y) {
}

function nopDrawer_lineTo(x,y) {
}

function nopDrawer_frameOval(rect) {
}

function nopDrawer_paintOval(rect) {
}

function nopDrawer_paintRect(rect) {
}

function nopDrawer_frameRect(rect) {
}
function nopDrawer_translate(x,y) {
    
}
function nopDrawer_save() {
}
function nopDrawer_restore() {
}

function nopDrawer_getHeight() {
    return 0;
}
function nopDrawer_getWidth() {
    return 0;
}

function nopDrawer_setTransform(x1, x2, x3, x4, x5, x6) {
    
}

function NopDrawer(drawingObject) {
    this.drawingContext = null;
    this.getHeight = nopDrawer_getHeight;
    this.getWidth = nopDrawer_getWidth;
    this.penSize = nopDrawer_penSize;
    this.moveTo = nopDrawer_moveTo;
    this.lineTo = nopDrawer_lineTo;
    this.frameRect = nopDrawer_frameRect;
    this.paintRect = nopDrawer_paintRect;
    this.frameOval = nopDrawer_frameOval;
    this.paintOval = nopDrawer_paintOval;
    this.setColor = nopDrawer_setColor;
    this.translate = nopDrawer_translate;
    this.save = nopDrawer_save;
    this.restore = nopDrawer_restore;
    this.setTransform = nopDrawer_setTransform;
}

_drawerFactorySingleton.registerDrawerType("nop", (
        function(drawingObject) { 
            return new NopDrawer(drawingObject);}));



/*
 * drawing_context_svg.js
 * 
 * Author: Alan Canon
 * 
 * SVG implementation of a drawer. This drawer appends SVG elements to a dom representing
 * a scalable vector graphics image. Unlike svgDrawer, this drawer is stateful,
 * keeping track of penSize, color, and the last moveTo or lineTo coordinates.
 * 
 */

function svgDrawer_penSize(_penSize) {
    if(_penSize === undefined) {
        return this._penSize;
    } else {
        this._penSize = _penSize;
    }
}

function svgDrawer_setColor(color) {
    this.color = color
}

function svgDrawer_moveTo(x,y) {
    this.x = x;
    this.y = y
}

function svgDrawer_lineTo(x,y) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    element.setAttribute("style", "stroke-width:" + this._penSize + "px;");

    element.setAttribute('x1', this.x);
    element.setAttribute('y1', this.y);
    element.setAttribute('x2', x);
    element.setAttribute('y2', y);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
    
    this.x = x;
    this.y = y;
}

function svgDrawer_frameOval(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", "none");
    
    var cx = (rect.right + rect.left) / 2;
    var cy = (rect.bottom + rect.top) / 2;
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('rx', cx - rect.left);
    element.setAttribute('ry', cy - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_paintOval(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", this.color);
    var cx = (rect.right + rect.left) / 2;
    var cy = (rect.bottom + rect.top) / 2;
    element.setAttribute('cx', cx);
    element.setAttribute('cy', cy);
    element.setAttribute('rx', cx - rect.left);
    element.setAttribute('ry', cy - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_paintRect(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", this.color);

    element.setAttribute('x', rect.left);
    element.setAttribute('y', rect.top);
    element.setAttribute('width', rect.right - rect.left);
    element.setAttribute('height', rect.bottom - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
}

function svgDrawer_frameRect(rect) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttribute("stroke-width", this._penSize + "px");
    element.setAttribute("fill", "none");

    element.setAttribute('x', rect.left);
    element.setAttribute('y', rect.top);
    element.setAttribute('width', rect.right - rect.left);
    element.setAttribute('height', rect.bottom - rect.top);
    element.setAttribute('stroke', this.color);

    this.drawingContext.appendChild(element);
    
}

function svgDrawer_getHeight() {
    return this.height;
}
function svgDrawer_getWidth() {
    return this.width;
}

function svgDrawer_translate(x,y) {
   
}
function svgDrawer_save() {
}
function svgDrawer_restore() {
}


function SVGDrawer(drawingObject) {
    this.drawingContext = drawingObject;
    this.getHeight = svgDrawer_getHeight;
    this.getWidth = svgDrawer_getWidth;
    this.penSize = svgDrawer_penSize;
    this.moveTo = svgDrawer_moveTo;
    this.lineTo = svgDrawer_lineTo;
    this.frameRect = svgDrawer_frameRect;
    this.paintRect = svgDrawer_paintRect;
    this.frameOval = svgDrawer_frameOval;
    this.paintOval = svgDrawer_paintOval;
    this.setColor = svgDrawer_setColor;
    this.translate = svgDrawer_translate;
    this.save = svgDrawer_save;
    this.restore = svgDrawer_restore;    
    this.penSize(1);
}


_drawerFactorySingleton.registerDrawerType("svg", (
        function(drawingObject) { 
            return new SVGDrawer(drawingObject);}));
var stillBreeding = false;

$( function() {
    $.widget('dawk.breedingBox', {
        options: {
            canvas: null,
            boxIndex: null,
            isMidBox: false,
            breedingBoxes: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('boxDiv');
            var canvasId = "canvas" + this.options.boxIndex;
            var canvas = $("<canvas></canvas>");
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            this.options.canvas = canvas;
            this.element.append(canvas);
            if (this.options.isMidBox) {
                canvas.addClass('midBox');
            }

            this._on( canvas, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var parentBreedingWindow = this.element.parents('.breedingWindow').get(0);
            var geneboxes = $(parentBreedingWindow)
                .find('.monochromeGeneboxes').get(0);
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', this.options.canvas);
        },
        _doCanvasClicked: function(event) {
            var canvas = this.options.canvas;
            
            var position = this.element.position();
            var midCanvasDiv = this.options.breedingBoxes.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var deltaX = midCanvasDivPosition.left - position.left;
            var deltaY = midCanvasDivPosition.top - position.top;
            var boxes = this.options.breedingBoxes;
            var numBoxes = boxes.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            var midCanvas = $(this.element).parent().find('.midBox').get(0);
            var genotype = jQuery.data(event.target, 'genotype');
            var breedingBoxes = this.options.breedingBoxes;
            var clickedBoxIndex =  this.options.boxIndex;
            if (genotype != null) {
                // erase the other canvases
                var breedingWindowCanvases = $(canvas).parents('.boxes').find('canvas');
                $(breedingWindowCanvases).each(function(index) {
                    if(index != clickedBoxIndex) {
                        // console.log('erase ' + index)
                        eraseCanvas(this);
                        $(this).css({left: midCanvasDivPosition.left, top: midCanvasDivPosition.top});
                    }
                });
 
                if (! this.options.isMidBox) {
                    $( canvas ).animate({
                        left: "+=" + deltaX,
                        top: "+=" + deltaY
                    }, { duration: 1000,                               
                        easing: 'easeOutExpo',
                        complete: function() {
//                            // console.log('midCanvas');
//                            // console.log(midCanvas);
                            // Hand the biomorph off to the new canvas
                            jQuery.data(canvas, 'genotype', null)
                            jQuery.data(midCanvas, 'genotype', genotype)
                            // Inform the genotype that it now draws on a different
                            // canvas
                            genotype.drawer = midCanvas
                            // console.log('animateToCenter complete')
                            
                            // console.log(genotype.drawer)
                            $(midCanvas).css({left:0,top:0})
                            var midCanvasPos = $(midCanvas).position()
                            genotype.develop()
                            breedingBoxes.produceLitter(numBoxes, midBox)
                        } });
                } else {
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            } else {
                // console.log("Genotype was null");
            } 
            // Update the geneboxes with the genes of the new parent.
            $(midCanvasDiv).trigger("mouseover");
            return false;
        },
    });
});/*
 * breedingBoxes widget definition
 */
$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingBoxes", {
        // default options
        options: {
            cols: 3,
            numBoxes: 15,
            speciesFactory: null,
        },

        sparkLine: function(destinationCanvas) {
            var canvas = $(this.element).parent().find('.overlayCanvas')[0];
//            // console.log(canvas);

            var context = canvas.getContext('2d');
            var midBox = Math.trunc(this.options.numBoxes / 2);
            var parents = $(destinationCanvas).parent();
            
            var midCanvas = $(destinationCanvas).parents('.boxes').find('.midBox').get(0);
            var midDiv = $(midCanvas).parent();
            var midPos = $(midDiv).position();
            var destDiv = $(destinationCanvas).parent();
            var destPos = $(destDiv).position();
            var x0 = Math.trunc(midPos.left + midDiv.width() / 2);
            var y0 = Math.trunc(midPos.top + midDiv.height() / 2);
            var x1 = Math.trunc(destPos.left + destDiv.width() / 2);
            var y1 = Math.trunc(destPos.top + destDiv.height() / 2);
            context.strokeStyle = '#000000';
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.closePath();
            context.stroke();
        },

        doReproduce: function (sourceCanvas, targetCanvas) {
            var breedingWindow = $(sourceCanvas).parents('.breedingWindow').get(0);
            var generations = $(breedingWindow).find('.generations').get(0);
            generations.value = Number(generations.value) + 1;
            
            var genotype = jQuery.data(sourceCanvas, "genotype");
            if(genotype != null) {
                var childGenotype = genotype.reproduce(targetCanvas);
                jQuery.data(targetCanvas, 'genotype', childGenotype);
                childGenotype.develop(); 
            }
            else  
                alert("Genotype is null");
//            return genotype;
        },


        produceKthOffspring: function (numBoxes, midBox, k, midCanvasDivPosition, recursive) {
            if(k < numBoxes) {
                // console.log('produceKthOffspring ' + k)
                // console.log($(this.element))
                var sourceCanvas = $(this.element).find('.midBox').get(0);
                var targetCanvas = $(this.element).find('canvas').get(k);
                $(targetCanvas).css({ left: "0px", top: "0px" });
                if (k != midBox) {
                    var position = $(targetCanvas).parent().position();
                    var deltaX = midCanvasDivPosition.left - position.left;
                    var deltaY = midCanvasDivPosition.top - position.top;
//                  // console.log('offspring ' + targetId + ' offSet ' + deltaX + ',' + deltaY);
                    // Move the target canvas to the centre
                    $(targetCanvas).css({ left: deltaX, top: deltaY});
                    // Grow the offspring on the target canvas
                    this.doReproduce(sourceCanvas, targetCanvas);
                    if(recursive) { // one at a time
                        this.sparkLine(targetCanvas);
                        // Move the target canvas back into its home position
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0
                        }, { duration: 200, 
                            easing: 'easeOutExpo',
                            complete: function() {
                                var overlayCanvas = $(targetCanvas).parents('.watchmakerView').find('.overlayCanvas')[0];
                                
                                eraseCanvasNoCenter(overlayCanvas);
                                var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
//                                // console.log('finished recursive animate Offspring ' + k);
                            }});
                    } else { // Explosive breeding
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                        }, { queue: true, duration: 2000,
                            easing: 'easeOutExpo',
                            complete: function() {
//                              eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
//                              // console.log('finished animate Offspring ' + targetCanvas.attr('id'));
                            }});
                    }
                } else { // midbox
                    if(recursive) {
                        this.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
                    }
                }
            } else {
                stillBreeding = false;
            }
        },

        produceLitter: function(numBoxes, midBox) {
            var midCanvasDiv = this.options.midCanvasDiv;
            var midCanvasDivPosition = midCanvasDiv.position();
            var recursive = ! document.getElementById('explosiveBreeding').checked;
            if(recursive) {
                this.produceKthOffspring(numBoxes, midBox, 0, midCanvasDivPosition, recursive);
            } else {
                for (k = 0; k < numBoxes; k++) {
                    this.produceKthOffspring(numBoxes, midBox, k, midCanvasDivPosition, recursive);
                }
            }

        },

        // The constructor
        _create: function() {
            var session = this.options.session
            var species = this.options.session.species
            var boxes = this.element
            $(boxes).attr('id', 'boxes').addClass('boxes')
            this.element.append(boxes)
            var numBoxes = this.options.numBoxes
            var midBox = Math.trunc(numBoxes / 2)
            for (j = 0; j < numBoxes; j++) {
                var isMidBox = j == midBox
                var canvasDiv = $("<div></div>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    breedingBoxes: this}).appendTo(boxes)
                // console.log('adding canvas ' + j)
                if(isMidBox) {
                    // Create a biomorph and render it on the middle canvas.
                    this.options.midCanvasDiv = canvasDiv
                    var canvas = $(canvasDiv).find('canvas').get(0)
                    var biomorph = _speciesFactorySingleton.getSpecies(
                            species, session, canvas)
                    $(canvas).data('genotype', biomorph)        
                    biomorph.doPerson('BasicTree')
                    biomorph.develop()
                }
            }

            this._refresh()
        },

        // Called when created, and later when changing options
        _refresh: function() {
        },

        // A public method to change the color to a random value
        // can be called directly via .colorize( "random" )
        random: function( event ) {
        },

        _destroy: function() {
        },

        // _setOptions is called with a hash of all options that are changing
        // always refresh when changing options
        _setOptions: function() {
            // _super and _superApply handle keeping the right this-context
            this._superApply( arguments )
            this._refresh()
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            this._super( key, value );
        }
    });
} );
function pointToString() {
        return "(" + this.h + "," + this.v + ")";
}

function pointCopy() {
        var child = new Point(this.h, this.v);
        return child;
}


/* 
 * QuickDraw style point, with h (horizontal) and v (vertical) 
 */
function Point(x,y) {
   this.h = x;
   this.v = y;
   
   this.toString = pointToString;
   this.copy = pointCopy;
   // // // // // console.log("Point" + this.toString());
}


function rectToString() {
        return "Rect (" + this.left + "," + this.top + "),(" + this.right + "," + this.bottom + ")";
                        
}


/*
 * QuickDraw style Rect, with left, right, top and bottom
 */
function Rect() {
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.toString = rectToString;
}function SpeciesFactory() {
    this.constructorFunctions = {}
    this.sessionInitializers = {}
    this.geneboxesWidgets = {}
}

SpeciesFactory.prototype.registerSpeciesType = function(speciesType, 
        constructorFunction, 
        sessionInitializer,
        geneboxesWidget) {
    this.constructorFunctions[speciesType] = constructorFunction
    this.sessionInitializers[speciesType] = sessionInitializer
    this.geneboxesWidgets[speciesType] = geneboxesWidget
    // console.log("Registered Species Type " + speciesType);
    // console.log("Constructor")
    // console.log(this.constructorFunctions[speciesType])
    // console.log("Session initializer ")
    // console.log(this.sessionInitializers[speciesType])
}

SpeciesFactory.prototype.getSpecies = function(speciesFactoryType, session, canvas) {
    var species = null;
    try {
        species = this.constructorFunctions[speciesFactoryType](session, canvas)
    } catch (err) {
        console.error(err)
        console.error("SpeciesFactory can't find a registered species for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        console.error('session')
        console.error(session)
        console.error('drawer')
        console.error(drawer)
        console.error('geneboxes')
        console.error(geneboxes)
        for(let propt in this.constructorFunctions) {
            // console.log(propt + ': ' + this.constructorFunctions[propt]);
        }
        
    }
    if(species != null)
        // console.log("Got species for " + speciesFactoryType);
    return species;
}
SpeciesFactory.prototype.initializeSession = function(speciesFactoryType, session) {
    var species = null;
    try {
        species = this.sessionInitializers[speciesFactoryType](session);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered session initializer for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.sessionInitializers){
            // console.log(propt + ': ' + this.sessionInitializers[propt]);
        }
        // console.log("err: " + err);
    }
    if(species != null)
        // console.log("Got session initializer for " + speciesFactoryType);
    return species;
}

SpeciesFactory.prototype.geneboxes = function(speciesFactoryType, 
        geneboxes, geneboxes_options) {
    var species = null;
    try {
        species = this.geneboxesWidgets[speciesFactoryType](geneboxes, geneboxes_options);
    } catch (err) {
        console.error("SpeciesFactory can't find a registered session initializer for type '" + speciesFactoryType + "'. Valid values are " + this.properties);
        for(let propt in this.sessionInitializers){
            // console.log(propt + ': ' + this.sessionInitializers[propt]);
        }
        // console.log("err: " + err);
    }
    if(species != null)
        // console.log("Got session initializer for " + speciesFactoryType);
    return species;
}



var _speciesFactorySingleton = new SpeciesFactory();


var drawCrossHairs = false;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


function startAutoReproduce(canvasId, targetCanvasId) {
    autoRunning = true;
    doRepro(canvasId, targetCanvasId);
    measureGenerationRate(Number(document.getElementById('generations').value));
}

function doRepro(sourceCanvas, targetCanvas) {
    doReproduce(sourceCanvas, targetCanvas);
    if(autoRunning)
        setTimeout(function() { 
            doRepro(sourceCanvas, targetCanvas)}, 
                Number(document.getElementById("autoReproduceInterval").value));
}

function eraseCanvasNoCenter(canvas) {
//    // console.log("eraseCanvasNoCenter");
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
}

function eraseCanvas(canvas) {
    // Store the current transformation matrix
    //drawingContext.save();
    var drawingContext = canvas.getContext("2d");
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawingContext.clearRect(0, 0, canvas.width, canvas.height);
    drawingContext.translate(canvas.width / 2 + 0.5, canvas.height / 2 + 0.5);

    if(drawCrossHairs) {
        drawingContext.beginPath();
        // Draw crosshairs
        drawingContext.moveTo(-100, 0);
        drawingContext.lineTo(100,0);
        drawingContext.moveTo(0, -100);
        drawingContext.lineTo(0,100);
        drawingContext.closePath;
        drawingContext.lineWidth = 0.5;
        drawingContext.strokeStyle = "red";
        drawingContext.stroke();
    }
}

$.widget('dawk.blindWatchmaker', {
    options: {
        menu: null,
        sessionCount: 0,
    } ,
    _create: function () {
        var ul = $('<ul class="watchmakerTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        this.newWatchmakerSession('Monochrome');
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
        this.buildMenu();
    },
    on_activate: function (event, ui) {
        var parents = $(ui.newTab).parents('.blindWatchmaker').get(0);
        $(parents).blindWatchmaker('buildMenu');
    },
    raiseAlert: function() {
     // console.log('Blindwatchmaker callback from view');   
    },
    newWatchmakerSession: function(species) {
//        // console.log('new Watchmaker session ' + species);
        var index = this.options.sessionCount;
        this.options.sessionCount++;
        var uuid = uuidv4();
        var sessionName = species + ' ' + index;
        
        var string = '<li><a href="#' + uuid + '">' + sessionName + '</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.watchmakerSession({'name': sessionName, 'blindWatchmaker': this, species: species});
        var tabcount = $(this.element).children('ul.watchmakerTabs').children('li').length;
//        // console.log('watchmaker session tabcount '+ tabcount);
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    buildMenu: function() {
//        // console.log('bw buildMenu');
        $(this.element).find('.watchmakerMenu').each(function() {this.remove();});
        var menu = $('<ul class="watchmakerMenu"></ul>');
        $(this.element).append(menu);
        var liTop = $('<li><div>Menu</div></li>');
        menu.append(liTop);
        var menuContents = $("<ul></ul>");
        liTop.append(menuContents);
        var newSessionMenu;
        newSessionMenu = $("<li><div>New Monochrome session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Monochrome");}});
        newSessionMenu = $("<li><div>New Colour session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Colour");}});
        newSessionMenu = $("<li><div>New Snails session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Snails");}});
        newSessionMenu = $("<li><div>New Arthromorphs session</div></li>");
        menuContents.append(newSessionMenu);
        this._on(newSessionMenu, {click: function(event) { this.newWatchmakerSession("Arthromorphs");}});
        
        if($(this.element).find('.watchmakerSession').length != 0) {
            var liCloseSession = $('<li><div>Close session</div></li>');
            this._on(liCloseSession, {click: 'closeSession'});
            menuContents.append(liCloseSession);
        }

        
//        // console.log($(this.element).tabs("option", "active"));
        var activeIndex = $(this.element).tabs("option", "active");
//        // console.log(activeIndex);
        var activeSession = $(this.element).find('.watchmakerSession').get(activeIndex);
        var sessionName = $(activeSession).watchmakerSession('option', 'name');
        var sessionLi = $("<li><div>" + sessionName + "</div></li>")
        menuContents.append(sessionLi);
        var sessionMenu = $('<ul></ul>');
        sessionLi.append(sessionMenu);
        $(activeSession).watchmakerSession('buildMenu', sessionMenu);

        menu.menu().show();
    },
    closeSession: function() {
        var selectedIndex = this.element.tabs('option', 'active');
        // console.log('selectedIndex ' + selectedIndex);
        var selectedDiv = $(this.element).find('.watchmakerSession').get(selectedIndex);
        var ul = this.element.find('ul.watchmakerTabs').get(0);
        // console.log(ul);
        var liToRemove = $(ul).find('li').get(selectedIndex);
        var divToRemove = $(this.element).find('div').get(selectedIndex);
        // console.log(liToRemove);
        // console.log(divToRemove);
        $(divToRemove).remove();
        $(liToRemove).remove();
        this.element.tabs("refresh");
    }
});$.widget('dawk.watchmakerSession', {
    options: {
        species: null,
        session: null,
        name: 'Default Session',
        blindWatchmaker: null
    },
    raiseAlert: function(newMenu) {
        // console.log('raise alert in watchmaker session')
        // console.log(newMenu);
        var blindWatchmaker = $(this.element).watchmakerSession('option', 'blindWatchmaker');
        $(blindWatchmaker.element).blindWatchmaker('raiseAlert');
    },
    buildMenu: function(menuContents) {
        var li;
        li = $('<li><div>New Breeding</div></li>');
        menuContents.append(li);
        this._on(li, {click: 'newBreedingWindow'});

        li = $('<li><div>New Engineering</div></li>');
        menuContents.append(li);
        this._on(li, {click: 'newEngineeringWindow'});
        var activeIndex = $(this.element).tabs("option", "active");
        var activeView = $(this.element).find('.watchmakerView').get(activeIndex);

    },
    on_activate: function (event, ui) {
        // One of the session's views, like Breeding, has just become active.
        var newlyActiveView = $(ui.newTab).parents('.watchmakerView').get(0);
//      $(parents).watchmakerView('buildMenu');
//      // console.log(ui.newPanel);
        $(ui.newPanel).trigger('dawk:viewGainedFocus');

    },   
    _create: function () {
        var species = this.options.species
        this.options.session = new WatchmakerSession(species)
        // console.log('new WatchmakerSession species ' + species);
        this.element.addClass('watchmakerSession');
        var ul = $('<ul class="watchmakerViewTabs"></ul>');
        this.element.append(ul);
        this.element.tabs({activate: this.on_activate});
        this.newBreedingWindow(this.options.session, species);
        this.newEngineeringWindow(this.options.session, species);
        this.element.tabs('option', 'active', 0);
        this.element.tabs("refresh");
    },
    newBreedingWindow: function(species) {
        var uuid = uuidv4();
        var string = '<li><a href="#' + uuid + '">Breeding</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.breedingWindow({
            session: this.options.session, 
            watchmakerSession: this, 
            species: species});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    
        this.element.tabs("refresh");
        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        // console.log('watchmaker view tabcount '+ tabcount);
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);

    },
    newEngineeringWindow: function(species) {
        var uuid = uuidv4();
        var string = '<li><a href="#' + uuid + '">Engineering</a><span class="ui-icon ui-icon-circle-close ui-closable-tab"></li>';
        var newTabLi = $(string);
        var ul = this.element.find('ul').get(0);
        $(ul).append(newTabLi);
        var div = $('<div id="' + uuid + '"></div>');
        this.element.append(div);
        div.engineeringWindow({session: this.options.session, 
            
            watchmakerSession: this});
        $('.ui-closable-tab').click(
                function() {
                    var tabContainerDiv = $(this).closest(".ui-tabs")
                    .attr("id");
                    var panelId = $(this).closest("li").remove().attr(
                    "aria-controls");
                    $("#" + panelId).remove();
                    $("#" + tabContainerDiv).tabs("refresh");
                    var tabCount = $("#" + tabContainerDiv).find(
                    ".ui-closable-tab").length;
                    if (tabCount < 1) {
                        $("#" + tabContainerDiv).hide();
                    }
                });    

        var tabcount = $(this.element).children('ul.watchmakerViewTabs').children('li').length;
        // console.log('watchmaker view tabcount '+ tabcount);
        this.element.tabs("refresh");
        this.element.tabs("option", "active", tabcount - 1);
    }
});

function WatchmakerSession(species) {
    this.options = {}
    this.myPenSize = 1;

    this.species = species
    _speciesFactorySingleton.initializeSession(species, this)
}$( function() { 
    $.widget( "dawk.breedingAutoReproduceControl", {
        options: {
            startButton: null,
            generationsPreviousSecond: 0,
        },
        _create: function() {
            $(this.element).addClass('autoReproduceControl');
            var div = $('<span></span>');
            this.element.append(div);
            var button = $('<button class="startAutoReproduce">Auto Reproduce</button>');
            this.options.startButton = button;
            div.append(button);
            this._on(button, {'click': this.startAutoBreeding});
            var string = '<span> with delay of <input type="text"\
                class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
                milliseconds.</span>';
            div.append($(string));
            var stopButton = $("<button>Stop</button>");
            div.append(stopButton);
            this._on(stopButton, {'click': this.stopAutoBreeding});
            
        },
        stopAutoBreeding: function(event) {
            this.options.autoRunning = false;
            var startButton = $(this.element).find('.startAutoReproduce').get(0);
            $(startButton).removeAttr('disabled');
        },
        startAutoBreeding: function(event) {
            var startButton = $(this.element).find('.startAutoReproduce').get(0);
            $(startButton).attr('disabled', 'disabled');
            this.options.autoRunning = true;
            this.autoBreed();
            var generations = $(this.element).parents('.breedingWindow').find('.generations').get(0);
            this.measureGenerationRate(Number(generations.value));
        },
        autoBreed: function() {
            var breedingWindow = $(this.element).parent();
            var breedingBoxes = $(this.element).parent().find('.boxes').get(0);
            if (this.options.autoRunning) {
                var useFitness = $(breedingWindow).find('.useFitness').get(0).checked;
                var numBoxes = $(boxes).breedingBoxes("option", "numBoxes");
                if (useFitness) {
                    var canvas = $(breedingBoxes).find('.box').get(0);
                    var biomorph = getBiomorphFromCanvas(canvas);
                    var bestSoFar = canvas;
                    var errorToBeat = fitness(biomorph, canvas.width, canvas.height);
                    $(breedingBoxes).find('.box').each( function(index) {
                        canvas = this;
                        var currentError = fitness(getBiomorphFromCanvas(canvas),
                                canvas.width, canvas.height);
                        if (currentError < errorToBeat) {
                            bestSoFar = canvas;
                            errorToBeat = currentError;
                        }
                    });
                    $(bestSoFar).trigger('click');
                } else {
                    var luckyParent = Math.trunc(Math.random() * numBoxes);
                    var luckyCanvas = $(breedingBoxes).find('.box').get(luckyParent);
                    $(luckyCanvas).trigger('click');
                }
                var interval = Number($(this.element).parents('.breedingWindow')
                        .find('.autoReproduceInterval').get(0).value);
                this._delay(this.autoBreed, interval);
                
            }            
        },
        measureGenerationRate: function() {
            var generationCounter = $(this.element).parent().find('.generations').get(0);
            var newGenerationValue = Number(generationCounter.value) + 1;
            generationCounter.value = newGenerationValue;
            var generationRate = $(this.element).parent().find('.generationRate').get(0);
            generationRate.value = newGenerationValue - this.options.generationsPreviousSecond;
            this.options.generationsPreviousSecond = newGenerationValue;
            if(this.options.autoRunning)
                this._delay(this.measureGenerationRate, 1000);
        }
    });
});
$.widget('dawk.watchmakerView', {
  options: {
      session: null
  },
  _create: function() {
      this._super("_create")
      $(this.element).addClass('watchmakerView')
  },
  _init: function() {
      $(this.element).on('dawk:viewGainedFocus', this.viewGainedFocus)
  },
  viewGainedFocus: function(event) {
      // console.log('View gained focus');
  },
  buildMenu: function(menuContents) {
      // console.log('in view buildmenu')
      var li
      li = $('<li><div>Close View</div></li>')
      menuContents.append(li)
  },
})


function fitness(biomorph, targetWidth, targetHeight) {
    var margin = biomorph.pic.margin;
    var marginWidth = margin.right - margin.left;
    var marginHeight = margin.bottom - margin.top;
    var widthError = Math.abs(targetWidth - marginWidth) / targetWidth;
    var heightError = Math.abs(targetHeight - marginHeight) / targetHeight;
    var averageError = (widthError + heightError) / 2;
    return averageError;
}

function getBiomorphFromCanvas(canvas) {

    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}


$( function() {
    $.widget( "dawk.breedingControl", {
        _create: function() {
            $(this.element).addClass('breedingControl');
            var string = '<span>\
                <input type="checkbox" class="useFitness" /> <span>Use Fitness\
                (Breed based on how well biomorph fits its box)\
                </span> <input type="checkbox" id="explosiveBreeding" /> <span>Explosive\
                Breeding </span>\
                </span>';
            var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});
$( function() {
    $.widget( "dawk.breedingOffspringCounter", {

        _create: function() {
            $(this.element).addClass('breedingOffspringCounter');
            var string = '<span>Offspring count: <input type="number" value="0" class="generations" />\
                Offspring per second: <input type="number" value="0"\
                class="generationRate" />\
                </span>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingWindow", $.dawk.watchmakerView, {
        options: { 
            watchmakerSession: null,
            biomorph: null
        },
        viewGainedFocus: function(event) {
            var watchmakerSession = $(this).breedingWindow("option", "watchmakerSession");
            // console.log($(watchmakerSession.element).watchmakerSession('option', 'name'));
            var newMenu = $('<ul></ul>');
            var operation = $('<li><div><a href="#">Operation</a></div><ul></ul></li>');
            newMenu.append(operation);
            var li = $('<li><div><a href="#">Breed in new</a></div></li>');
            newMenu.append(li);
            var li = $('<li><div><a href="#">Engineer in new</a></div></li>');
            newMenu.append(li);
            $(watchmakerSession.element).watchmakerSession('raiseAlert', newMenu);
        },

        _create: function () {
            this._super("_create")
            var species = this.options.session.species
            $(this.element).addClass('breedingWindow')
            $("<div></div>").breedingAutoReproduceControl().appendTo(this.element)
            $("<div></div>").breedingControl().appendTo(this.element)
            $("<div></div>").breedingOffspringCounter().appendTo(this.element)
            var geneboxes_options = {
                engineering : false
            }
            var geneboxes = $("<div></div>");
            _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options);
            this.element.append(geneboxes);
            var container = $("<div></div>");
            container.addClass('container');
            var boxes = $("<div></div>").breedingBoxes({session: this.options.session});
            var overlay = $("<div></div>");
            overlay.addClass("overlay");
            container.append(overlay);
            container.append(boxes);
            var overlayCanvas = $('<canvas></canvas>');
            overlayCanvas.attr('width', 1000);
            overlayCanvas.attr('height', 600);
            overlayCanvas.addClass('overlayCanvas');
            overlay.append(overlayCanvas);
            this.element.append(container);
            var numBoxes = boxes.breedingBoxes("option", 'numBoxes');
            var cols = boxes.breedingBoxes("option", 'cols');

            var midCanvas = $(this.element).find('.midBox').get(0);
            $(midCanvas).trigger('mouseover');
            $(midCanvas).trigger('click');
        }})});


$.widget('dawk.engineeringWindow', $.dawk.watchmakerView, {
    _create: function() {
        this._super("_create")
        $(this.element).addClass('engineeringWindow')
        var species = this.options.session.species
        // console.log('EW species ' + species)
        var geneboxes_options = {
            engineering : true,
            species: species,
        }
        var geneboxes = $("<div></div>")
        _speciesFactorySingleton.geneboxes(species, geneboxes, geneboxes_options)
        this.element.append(geneboxes)
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            height: 600,
            width: 1000})
        this.element.append(engineeringDiv)
        var canvas = $(engineeringDiv).find('canvas').get(0)
        var biomorph = _speciesFactorySingleton.getSpecies(species, this.options.session, canvas)
        biomorph.doPerson("BasicTree")
        jQuery.data(canvas, 'genotype', biomorph)
        biomorph.develop()
        $(canvas).trigger('mouseover')
        
    },

    // Called when created, and later when changing options
    _refresh: function() {
    },

    _destroy: function() {
    },

    // _setOptions is called with a hash of all options that are changing
    // always refresh when changing options
    _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
    },

    // _setOption is called for each individual option that is changing
    _setOption: function( key, value ) {
        this._super( key, value );
    }
});$( function() {
    $.widget('dawk.engineeringBox', {
        options: {
            canvas: null,
            width: 200,
            height: 200,
        },
        _create: function() {
            this.element.addClass('boxDiv');
            var canvas = $("<canvas></canvas>");
            this.options.canvas = canvas;
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
            this.element.append(canvas);

            this._on( canvas, {
                click: "_doCanvasClicked",
                mouseover: "_doMouseOver"
            });
        },
        _doMouseOver: function(event) {
            var parentBreedingWindow = this.element.parents('.engineeringWindow').get(0);
            var geneboxes = $(parentBreedingWindow)
                .find('.monochromeGeneboxes').get(0);
//            // console.log(geneboxes);
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', this.options.canvas.get(0));
        },
        _doCanvasClicked: function(event) {
            // Raise the hypodermic message TODO
            return false;
        },
    });
});