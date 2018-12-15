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
//    console.log("Registered Drawer Type " + drawerType);

}

function drawerFactory_getDrawer(drawerFactoryType, drawingObject) {
    var drawer;
    try {
        drawer = this.properties[drawerFactoryType](drawingObject);
    } catch (err) {
        console.error("DrawerFactory can't find a registered drawer for type '" + drawerFactoryType + "'. Valid values are " + this.properties);
        for(var propt in this.properties){
            console.log(propt + ': ' + this.properties[propt]);
        }
        console.log("err: " + err);
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
    console.log('erase ' + width + 'x' + height);

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
//        console.log("canvas2DDrawer.penSize = " + penSize);
        this.drawingContext.lineWidth = penSize / 2;
    }
}

function canvas2DDrawer_setColor(color) {
    this.drawingContext.strokeStyle = color;
    this.drawingContext.fillStyle = color;
//    console.log('setColor ' + color);
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
            this.options.canvas = canvas;
            canvas.attr('width', this.options.width);
            canvas.attr('height', this.options.height);
            canvas.addClass('box');
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
                            console.log(midCanvas);
//                            jQuery.data(midCanvas, 'genotype', genotype);
                            $(midCanvas).css({left:0,top:0});
                            var midCanvasPos = $(midCanvas).position();
                            develop(genotype, midCanvas,
                                    drawCrossHairs);
                            breedingBoxes.produceLitter(numBoxes, midBox);
                        } });
                } else {
                    breedingBoxes.produceLitter(numBoxes, midBox);
                }
            } else {
                console.log("Genotype was null");
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
        },

        sparkLine: function(destinationCanvas) {
            var canvas = document.getElementById('overlayCanvas');
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
            generations.value = Number($(generations).attr('value')) + 1;
            
            var genotype = jQuery.data(sourceCanvas, "genotype");
            if(genotype != null) {
                var childGenotype = reproduce(genotype);
                jQuery.data(targetCanvas, 'genotype', childGenotype);
                develop(childGenotype, targetCanvas, drawCrossHairs); 
            }
            else  
                alert("Genotype is null");
            return genotype;
        },


        produceKthOffspring: function (numBoxes, midBox, k, midCanvasDivPosition, recursive) {
            if(k < numBoxes) {
                var sourceCanvas = $(this.element).find('.midBox').get(0);
                var targetCanvas = $(this.element).find('canvas').get(k);
                $(targetCanvas).css({ left: "0px", top: "0px" });
                if (k != midBox) {
                    var position = $(targetCanvas).parent().position();
                    var deltaX = midCanvasDivPosition.left - position.left;
                    var deltaY = midCanvasDivPosition.top - position.top;
//                  console.log('offspring ' + targetId + ' offSet ' + deltaX + ',' + deltaY);
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
                            progress: function(animation, progress, msRemaining) {
                                var context = $(targetCanvas)[0].getContext("2d");

//                              $('#progress').html(targetCanvas.attr('width') + " " + (100 * progress) + "%");
                            },
                            complete: function() {
                                eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
                                var breedingBoxes = $(targetCanvas).parent().breedingBox("option", "breedingBoxes");
                                breedingBoxes.produceKthOffspring(numBoxes, midBox, k + 1, midCanvasDivPosition, recursive);
//                                console.log('finished recursive animate Offspring ' + k);
                            }});
                    } else { // Explosive breeding
                        $( targetCanvas ).animate({
                            left: 0,
                            top: 0,
                        }, { queue: true, duration: 2000,
                            easing: 'easeOutExpo',
                            complete: function() {
//                              eraseCanvasNoCenter(document.getElementById('overlayCanvas'));
//                              console.log('finished animate Offspring ' + targetCanvas.attr('id'));
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
            var boxes = this.element;
            $(boxes).attr('id', 'boxes').addClass('boxes');
            this.element.append(boxes);
            var numBoxes = this.options.numBoxes;
            var midBox = Math.trunc(numBoxes / 2);
            for (j = 0; j < numBoxes; j++) {
                var isMidBox = j == midBox;
                var canvasDiv = $("<div></div>").breedingBox({ 
                    boxIndex: j, 
                    isMidBox: isMidBox, 
                    breedingBoxes: this}).appendTo(boxes);
                if(isMidBox) {
                    this.options.midCanvasDiv = canvasDiv;
                }
            }

            this._refresh();
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
            this._superApply( arguments );
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function( key, value ) {
            this._super( key, value );
        }
    });
} );

const TRICKLE = 10;
const MutTypeNo = 9;

var mut = new Array(MutTypeNo);

function initializeMut() {
    mut[0] = true;  // Segmentation // {** changed 1.1 **}
    mut[1] = true;  // Gradient {** changed 1.1 **}
    mut[2] = true;  // Asymmetry {** changed 1.1 **}
    mut[3] = true;  // Radial Sym {** changed 1.1 **}
    mut[4] = true;  // Scaling Factor {** changed 1.1 **}
    mut[5] = false; // Mutation Size
    mut[6] = false; // Mutation Rate
    mut[7] = true;  // Tapering Twigs
    mut[8] = true;
}

var SwellType = {
        Swell: 1,
        Shrink: 2,
        Same: 3,
        properties: {
            1: {name: "Swell"},
            2: {name: "Shrink"},
            3: {name: "Same"}
        }
};




function chromosome() {
    var chrome = new Array(9);
    for(i = 0; i < 9; i++)
        chrome[i] = 0; // indexed 0-8, unlike Pascal 1-based arrays.
    return chrome;
}

var CompletenessType = {
        Single: 1,
        Double: 2,
        properties: {
            1: {name: "Single", geneboxName: "Asym"},
            2: {name: "Double", geneboxName: "Bilat"}
        }
};

var SpokesType = {
        NorthOnly: 1,
        NSouth: 2,
        Radial: 3,
        properties: {
            1: {name: "NorthOnly", geneboxName: "Single"},
            2: {name: "NSouth", geneboxName: "UpDn"},
            3: {name: "Radial", geneboxName: "Radial"}
        }
};

function personToString() {
    var htmlResult = 
        "Gene: " + this.gene + " DGene: ";
    for(i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult +=  " SegNoGene: " + this.segNoGene +  
    " SegDistGene: " + this.segDistGene +  
    " CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    " SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    " TrickleGene: " + this.trickleGene +  
    " MutSizeGene: " + this.mutSizeGene +  
    " MutProbGene: " + this.mutProbGene;
    return htmlResult;
}

function personToHtml() {
    var h4open = "<h4>";
    var h4close = "</h4>";
    var breaktag = "<br />";
    var htmlResult = h4open + name + h4close + 
    "Gene: " + this.gene + breaktag + "DGene: ";
    for(i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult += breaktag + "SegNoGene: " + this.segNoGene +  
    breaktag + "SegDistGene: " + this.segDistGene +  
    breaktag + "CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    breaktag + "SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    breaktag + "TrickleGene: " + this.trickleGene +  
    breaktag + "MutSizeGene: " + this.mutSizeGene +  
    breaktag + "MutProbGene: " + this.mutProbGene;
    return htmlResult;
}


function Person() {
    this.gene = chromosome();
    this.dGene = new Array(10);
    for(i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same;
    }
    this.segNoGene = 0;
    this.segDistGene = 0;
    this.completenessGene = CompletenessType.Single;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = TRICKLE;
    this.mutSizeGene = 0;
    this.mutProbGene = 0;
    this.toHtml = personToHtml;
    this.toString = personToString;
    this.pic = null;
    this.manipulation = manipulation;
}

/*
 * PROCEDURE MakeGenes (VAR genotype: person; a, b, c, d, e, f, g, h, i: Integer);
        VAR
                j: Integer;
        BEGIN
                WITH genotype DO
                        BEGIN
                                FOR j := 1 TO 10 DO
                                        dgene[j] := same;
                                SegNoGene := 1;
                                SegDistGene := 150;
                                CompletenessGene := Double;
                                SpokesGene := NorthOnly;
                                TrickleGene := Trickle;
                                MutSizeGene := Trickle DIV 2;
                                MutProbGene := 10;
                                gene[1] := a;
                                gene[2] := b;
                                gene[3] := c;
                                gene[4] := d;
                                gene[5] := e;
                                gene[6] := f;
                                gene[7] := g;
                                gene[8] := h;
                                gene[9] := i;
                        END;
        END; {makegenes}

 */
function makeGenes(genotype, a, b, c, d, e, f, g, h, i) {
    for(j = 0; j < 10; j++) {
        genotype.dGene[j] = SwellType.Same;
    }
    genotype.segNoGene = 1;
    genotype.segDistGene = 150;
    genotype.completenessGene = CompletenessType.Double;
    genotype.spokesGene = SpokesType.NorthOnly;
    genotype.trickleGene = TRICKLE;
    genotype.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    genotype.mutProbGene = 10;
    genotype.gene[0] = a;
    genotype.gene[1] = b;
    genotype.gene[2] = c;
    genotype.gene[3] = d;
    genotype.gene[4] = e;
    genotype.gene[5] = f;
    genotype.gene[6] = g;
    genotype.gene[7] = h;
    genotype.gene[8] = i;
}



function randSwell (indGene) {
    switch(indGene) {
    case SwellType.Shrink:
        return SwellType.Same;
    case SwellType.Same:
        if(randInt(2) == 1) {
            return SwellType.Shrink;
        } else {
            return SwellType.Swell;
        }
    case SwellType.Swell:
        return SwellType.Same;
    }
}


function doSaltation(genotype) {
    // {bomb 5, range check failed, here after killing top Adam}
    if(mut[0]) {
        genotype.segNoGene = randInt(6);
        genotype.segDistGene = randInt(20);
    } else {
        genotype.segNoGene = 1;
        genotype.segDistGene = 1;
    }
    var r = randInt(100);
    genotype.completenessGene = CompletenessType.Double;
    if(mut[2]) {
        if(r < 50) {
            genotype.completenessGene = CompletenessType.Single;
        } 
    }
    r = randInt(100);
    if(mut[3]) {
        if(r < 33) {
            genotype.spokesGene = SpokesType.Radial;
        } else if(r < 66) {
            genotype.spokesGene = SpokesType.NSouth;
        } else {
            genotype.spokesGene = SpokesType.NorthOnly;
        }
    } else {
        genotype.spokesGene = SpokesType.NorthOnly;
    }
    if(mut[4]) {
        genotype.trickleGene = randInt(10);
        if(genotype.trickleGene > 1) {
            genotype.mutSizeGene = Math.trunc(genotype.trickleGene / 2);
        }
    }
    for(j = 0; j < 8; j++) {
        var maxGene;
        do {
            genotype.gene[j] = Math.trunc(genotype.mutSizeGene * (randInt(19) - 10));
            if(mut[1]) {
                genotype.dGene[j] = randSwell(genotype.dGene[j]);
            } else {
                genotype.dGene[j] = SwellType.Same;
            }
            var factor;
            switch(genotype.dGene[j]) {
            case SwellType.Shrink:
                factor = 1;
                break;
            case SwellType.Same:
                factor = 0;
                break;
            case SwellType.Swell:
                factor = 1;
                break;
            }
            maxgene = genotype.gene[j] * genotype.segNoGene * factor;
        } while(maxgene > 9 * genotype.trickleGene || maxgene < -9 * genotype.trickleGene);
    }
    do {
        console.log("doSaltation2 trickleGene " + genotype.trickleGene);
        if(mut[7]) {
            genotype.dGene[8] = randSwell(genotype.dGene[8]);
        } else {
            genotype.dGene[8] = SwellType.Same;
        }
        if(mut[1]) {
            genotype.dGene[9] = randSwell(genotype.dGene[8])
        } else {
            genotype.dGene[9] = Same;
        }
        var factor;
        // In the Pascal, the index of the previous for loop, j, is used.
        // the loop ran from 1 to 8.
        // I don't know if the value of the counter in a Pascal for...do loop
        // should
        // to be 9 or 8. I'm guessing 9, and since we use 0-based arrays,
        // using 8 below. Best inform for the guess is that dGene[7] isn't
        // altered within the routine, and using dGene[8] seems to cause endless
        // loops
        switch(genotype.dGene[8]) {
        case SwellType.Shrink:
            factor = 1;
            break;
        case SwellType.Same:
            factor = 0;
            break;
        case SwellType.Swell:
            factor = 1;
            break;
        }
        maxgene = genotype.segDistGene * genotype.segNoGene * factor;
        console.log("mut1 and 7 maxgene " + maxgene);
    } while (maxgene > 100 || maxgene < -100);
    genotype.gene[8] = randInt(6);
}

function chess (genotype) {
    makeGenes(genotype, 
            -TRICKLE, 
            3 * TRICKLE, 
            -3 * TRICKLE, 
            -3 * TRICKLE, 
            TRICKLE, 
            -2 * TRICKLE, 
            6 * TRICKLE, 
            -5 * TRICKLE, 
            7);
}
/**
 * PROCEDURE BasicTree (VAR genotype: person);
        VAR
                j: Integer;
        BEGIN
                makegenes(genotype, -10, -20, -20, -15, -15, 0, 15, 15, 7);
                WITH genotype DO
                        BEGIN
                                SegNoGene := 2;
                                SegDistGene := 150;
                                CompletenessGene := single;
                                dgene[4] := shrink;
                                dgene[5] := shrink;
                                dgene[6] := shrink;
                                dgene[9] := shrink;
                                tricklegene := 9;
                        END;
        END; {root}
 */
function basicTree(genotype) {
    makeGenes(genotype, -10, -20, -20, -15, -15, 0, 15, 15, 7);
    genotype.segNoGene = 2;
    genotype.segDistGene = 150;
    genotype.completenessGene = CompletenessType.Single;
    genotype.dGene[3] = SwellType.Shrink;
    genotype.dGene[4] = SwellType.Shrink;
    genotype.dGene[5] = SwellType.Shrink;
    genotype.dGene[8] = SwellType.Shrink;
    genotype.trickleGene = 9;
}

function insect(genotype) {
    makeGenes(
            genotype, 
            TRICKLE, 
            TRICKLE, 
            -4 * TRICKLE, 
            TRICKLE, 
            -TRICKLE, 
            -2 * TRICKLE, 
            8 * TRICKLE, 
            -4 * TRICKLE, 
            6);
}


function randInt(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}

function direction(child) {
    if(randInt(2) == 2) 
        return child.mutSizeGene;
    else
        return -child.mutSizeGene;
}
function direction9() {
    if(randInt(2) == 2)
        return 1;
    else
        return -1;
}

function copyBiomorph(child, parent) {
    child.gene = parent.gene.slice();
    child.dGene = parent.dGene.slice();
    child.segNoGene = parent.segNoGene;
    child.segDistGene = parent.segDistGene;
    child.completenessGene = parent.completenessGene;
    child.spokesGene = parent.spokesGene;
    child.trickleGene = parent.trickleGene;
    child.mutSizeGene = parent.mutSizeGene;
    child.mutProbGene = parent.mutProbGene;
    return child;
}

/*
 * Globals, line 29:
 * 
 * CONST
 *     WorryMax = 4095;
 */
const WORRYMAX = 4095;

function twoToThe(n) {
    switch(n) {
    case 0: 
        return 1;
    case 1: 
        return 2;
    case 2: 
        return 4;
    case 3: 
        return 8;
    case 4: 
        return 16;
    case 5: 
        return 32;
    case 6: 
        return 64;
    case 7: 
        return 128;
    case 8: 
        return 256;
    case 9: 
        return 512;
    case 10: 
        return 1024;
    case 11: 
        return 2048;
    case 12: 
        return 4096;
    default:
        return 8192;
    }
}

function randSwell(indGene) {
    switch(indGene) {
    case SwellType.Shrink: 
        return SwellType.Same;
    case SwellType.Same: 
        if(randInt(2) == 1) {
            return SwellType.Shrink;
        } else {
            return SwellType.Swell;
        }
    case SwellType.Swell: 
        return SwellType.Same;
    }
}

var HorizPos = {
        LeftThird: 1,
        MidThird: 2,
        RightThird: 3,
        properties: {
            1: {name: "LeftThird"},
            2: {name: "MidThird"},
            3: {name: "RightThird"}
        }
};

var VertPos = {
        TopRung: 1,
        MidRung: 2,
        BottomRung: 3,
        properties: {
            1: {name: "TopRung"},
            2: {name: "MidRung"},
            3: {name: "BottomRung"}
        }
};

function manipulation(geneboxIndex, leftRightPos, rung) {
    var str = geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    console.log(str);
    switch(geneboxIndex) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            this.gene[geneboxIndex - 1] += this.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = this.segNoGene * twoToThe(this.gene[8] + 1);
            if(sizeWorry <= WORRYMAX)
                this.gene[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[8] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[8] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[8] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (this.segNoGene + 1) * twoToThe(this.gene[8]);
            if(sizeWorry <= WORRYMAX) {
                this.segNoGene++;
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segDistGene -= this.trickleGene;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[9] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[9] = SwellType.Same;
            case VertPos.BottomRung: 
                this.dGene[9] = SwellType.Shrink;
            }
            break;
        case HorizPos.RightThird: 
            this.segDistGene += this.trickleGene;
            break;
        }
        break;
    case 12: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.completenessGene = CompletenessType.Single;
            break;
        case HorizPos.MidThird: 
            break; // {No Action}
        case HorizPos.RightThird: 
            this.completenessGene = CompletenessType.Double;
            break;
        }
        break;
    case 13: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.spokesGene = SpokesType.NorthOnly;
            break;
        case HorizPos.MidThird: 
            this.spokesGene = SpokesType.NSouth;
            break;
        case HorizPos.RightThird: 
            this.spokesGene = SpokesType.Radial;
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.trickleGene > 1)
                this.trickleGene--;
            break;
        case HorizPos.RightThird: 
            this.trickleGene++;
            break;
        case HorizPos.MidThird: 
            break;// {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutSizeGene > 1)
                this.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            this.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutProbGene > 1) {
                this.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(this.mutProbGene < 100)
                this.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
            break;
        }
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}

function reproduce(parent) {
    // // console.log("Reproduce");
    var child = new Person();
    copyBiomorph(child, parent);
    if(mut[6]) 
        if(randInt(100) < child.mutProbGene) 
            do 
                child.mutProbGene += direction9();
            while ((Math.abs(child.mutProbGene) > 100) || (child.mutProbGene == 0));
    for(j = 0; j<8; j++) 
        if(randInt(100) < child.mutProbGene) 
            child.gene[j] += direction(child);
    if(randInt(100) < child.mutProbGene) 
        child.gene[8] += direction9();
    if(child.gene[8] < 1) 
        child.gene[8] = 1;
    var sizeWorry = child.segNoGene * twoToThe(child.gene[8]);
    // // console.log("Gene9: " + child.gene[8] + "SegNoGene: " + child.segNoGene + " SizeWorry: " + sizeWorry);
    if(sizeWorry > WORRYMAX)  
    {child.gene[8]--; 
    // // console.log("Decrementing segNoGene");
    }
    if(mut[0]) 
        if(randInt(100) < child.mutProbGene) {
            var j = direction9();
            child.segNoGene += j;
            if(j > 0) {
                sizeWorry = child.segNoGene * twoToThe(child.gene[8]);
                if(sizeWorry > WORRYMAX) 
                    child.segNoGene--;
            }
        }
    if(child.segNoGene < 1) 
        child.segNoGene = 1;
    if((mut[1]) && (child.segNoGene > 1)) {
        for(j = 0; j<8; j++) 
            if(randInt(100) < child.mutProbGene/2>>0) 
                child.dGene[j] = randSwell(child.dGene[j]);
        if(randInt(100) < child.mutProbGene/2>>0) 
            child.dGene[9] = randSwell(child.dGene[9]);
    }
    if(mut[7])
        if((mut[8] && (randInt(100) < child.mutProbGene))) 
            child.dGene[8] = randSwell(child.dGene[8]);
    if((mut[0]) && (child.segNoGene > 1)) 
        if(randInt(100) < child.mutProbGene) 
            child.segDistGene = child.segDistGene + direction9();
    if(mut[2]) 
        if(randInt(100) < child.mutProbGene/2>>0) 
            if(child.completenessGene == CompletenessType.Single) 
                child.completenessGene = CompletenessType.Double;
            else 
                child.completenessGene = CompletenessType.Single;
    if(mut[3]) 
        if(randInt(100) < child.mutProbGene/2>>0) 
            switch(child.spokesGene) {
            case SpokesType.NorthOnly: 
                child.spokesGene = SpokesType.NSouth;
                break;
            case SpokesType.NSouth: 
                if(direction9() == 1) 
                    child.spokesGene = SpokesType.Radial;
                else 
                    child.spokesGene = SpokesType.NorthOnly;
                break;
            case SpokesType.Radial: 
                child.spokesGene = SpokesType.NSouth;
                break;
            }
    if(mut[4]) 
        if(randInt(100) < Math.abs(child.mutProbGene)) {
            child.trickleGene += direction9();
            if(child.trickleGene < 1) 
                child.trickleGene = 1;
        }
    if(mut[5]) 
        if(randInt(100) < Math.abs(child.mutProbGene)) {
            child.mutSizeGene += direction9();
            if(child.mutSizeGene < 1) 
                child.mutSizeGene = 1;
        }
    return child;
} // reproduce


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
   // // // // console.log("Point" + this.toString());
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
}

var myPenSize = 1;



/*
 * Globals, line 247.
 * 
 * Lin = RECORD
 *     StartPt, EndPt: Point;
 *     Thickness: 1..8;
 * END;
 * LinPtr = ^Lin;
 * LinHandle = ^LinPtr;
 */

function linToString() {
	return "Lin " + this.startPt.toString() + " -> " + this.endPt.toString() + " thickness " + this.thickness;
}

function Lin(x, y, xnew, ynew, thick) {
    this.startPt = new Point(x,y);
    this.endPt = new Point(xnew,ynew);
    this.thickness = thick;
    this.nextLin = null;    
    this.toString = linToString;
}

/*
 * Globals, line 253.
 *     Pic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 *      
 * 
 */
function Pic() {
    this.basePtr = null; // The first Lin
    this.movePtr = null; // The current Lin (used in walking the array)
    this.origin = new Point(0,0); // a Point
    this.picSize = 0; // Number of Lins
    this.picPerson = null; // the biomorph that this is a picture of.
    this.margin = new Rect();
}
/*
 PROCEDURE ZeroPic (VAR thisPic: Pic; Here: Point);
    BEGIN
        WITH thisPic DO
            BEGIN
                MovePtr = LinPtr(BasePtr);
                PicSize = 0;
                Origin = Here
            END
    END; {ZeroPic}
 */
function zeroPic(thisPic, here) {
    if(thisPic.basePtr != null) { 
        // Pic has lines. Walk the singly linked list all the way to the end,
        // disconnect each Lin from the next.
        var walkPtr = thisPic.basePtr;
        while(walkPtr != null) {
            // Gotta grab a reference to the next element in the list 
            // before we disconnect it from the current one.
            var nextLin = walkPtr.nextLin
            walkPtr.nextLin = null;
            walkPtr = nextLin;
        }
        thisPic.picSize = 0;
        thisPic.origin = here;
    }
    thisPic.margin = new Rect();
}
/*
 * Globals, line 28.
 */
const PICSIZEMAX = 4095;


/*
 * PROCEDURE PicLine (VAR thisPic: Pic; x, y, xnew, ynew, thick: Integer);
    BEGIN
        IF thick > 8 THEN
            thick = 8;
        WITH thisPic DO
            BEGIN
                IF PicSize >= PicSizeMax THEN
                    BEGIN
{Message(GetString(TooLargeString));}
 {used the help dialog! v1.1 changed to alert}
                        DisplayError(-147, 'Biomorph too large, or other problem', ' ', StopError);
                        ExitToShell
                    END
                ELSE
                    WITH MovePtr^ DO
                        BEGIN
                            StartPt.h = x;
                            StartPt.v = y;
                            EndPt.h = xnew;
                            EndPt.v = ynew;
                            Thickness = Thick
                        END;
                MovePtr = linptr(size(MovePtr) + 10);  {advance 'array subscript' by number}
{                                    of bytes occupied by one lin}
                PicSize = PicSize + 1
            END
    END; {PicLine}

 */
function picLine(thisPic, x, y, xnew, ynew, thick) {
//	   // console.log("picLine (" + x + "," + y + ")>(" + xnew + "," + ynew + ")" + " thickness " + thick);
    if(thick > 8)
        thick = 8;
    if(thisPic.PicSize >= PICSIZEMAX) {
        // {Message(GetString(TooLargeString));}
        // {used the help dialog! v1.1 changed to alert}
        alert('Biomorph too large, or other problem');
        return;
    } else {
        newLin = new Lin(x, y, xnew, ynew, thick);
        if(thisPic.basePtr == null) { // First Lin in the Pic.
            thisPic.basePtr = newLin; // set the base pointer to the new Lin
        } else { // Pic already has at least one Lin.
            // Link the new Lin onto the Lin at end of the Pic
            thisPic.movePtr.nextLin = newLin; 
        }
        thisPic.movePtr = newLin; // Point to the new end of the list

        thisPic.picSize++;
        var margin = thisPic.margin;
    	if(x < margin.left)
    		margin.left = x;
    	else if(x > margin.right)
    		margin.right = x;
    	if(y > margin.bottom)
    		margin.bottom = y;
    	else if(y < margin.top)
    		margin.top = y;
    	if(xnew < margin.left)
    		margin.left = xnew;
    	else if(xnew > margin.right)
    		margin.right = xnew;
    	if(ynew > margin.bottom)
    		margin.bottom = ynew;
    	else if(ynew < margin.top)
    		margin.top = ynew;

    }
} // {PicLine}

function newFunction() {
	
}

function picToHtml() {
	var html = PicStyleType.properties[this.picStyle].name;
	return html;
}

var PicStyleType = {LF: 1, RF: 2, FF: 3, LUD: 4, RUD:5, FUD:6, LSW:7, RSW:8, FSW:9,
		properties: {
            1: {name: "LF"},
            2: {name: "RF"},
            3: {name: "FF"},
            4: {name: "LUD"},
            5: {name: "RUD"},
            6: {name: "FUD"},
            7: {name: "LSW"},
            8: {name: "RSW"},
            9: {name: "FSW"}
          }
};
var Compass = {NorthSouth:1, EastWest:2, properties: {
	1: {name: "NorthSouth"}, 2:{name: "EastWest"}
}};



var orientation = Compass.NorthSouth;



function actualLine(picStyle, orientation, thisPic, drawer) {
    var origin = thisPic.origin;
    var movePtr = thisPic.movePtr;
//    console.log("actualLine Style:" + PicStyleType.properties[picStyle].name + " movePtr:" + movePtr.toString() + " Origin:" + origin.toString() + " Place:" + place.toString());
    
    drawer.penSize(movePtr.thickness);
    var x0;
    var x1;
    var y0;
    var y1;
    var startPt = movePtr.startPt;
    var endPt = movePtr.endPt;
    if(orientation == Compass.NorthSouth) {
        y0 = startPt.v;
        y1 = endPt.v;
        x0 = startPt.h;
        x1 = endPt.h;
    } else {
        y0 = startPt.h;
        y1 = endPt.h;
        x0 = startPt.v;
        x1 = endPt.v;
    }
    switch(picStyle) {
    case PicStyleType.LF: 
        drawer.drawLine(x0, y0, x1, y1);
    break;
    case PicStyleType.RF: 
    	drawer.drawLine(-x0, y0, -x1, y1);
    break;
    case PicStyleType.FF: 
    	drawer.drawLine(x0, y0, x1, y1);
    	drawer.drawLine(-x0, y0, -x1, y1);
    break;
    case PicStyleType.LUD: 
    	drawer.drawLine(x0, y0, x1, y1);
    	drawer.drawLine(-x0, -y0, -x1, -y1);
    break;
    case PicStyleType.RUD: 
    	drawer.drawLine(-x0, y0, -x1, y1);
    	drawer.drawLine(x0, -y0, x1, -y1);
    break;
    case PicStyleType.FUD: 
    	drawer.drawLine(x0, y0, x1, y1);
    	drawer.drawLine(-x0, y0, -x1, y1);
    	drawer.drawLine(x0, -y0, x1, -y1);
    	drawer.drawLine(-x0, -y0, -x1, -y1);
    break;
    } // {CASES}
} // {ActualLine}

//{Pic already contains its own origin, meaning the coordinates at which}
//{ it was originally drawn. Now draw it at place}

function drawPic(thisPic, place, biomorph, drawer, drawMargin) {
//    if(biomorph.dGene[8] == SwellType.Swell) {
//        alert("Gradient Gene 9 is Swell");
//    }
//    console.log('drawPic' + drawer.penSize());
	// {To correct initialisation bug, due to call in DoUpdate}
	drawer.save();
	drawer.translate(-place.h,-place.v);
	if(drawMargin) {
		var margin = thisPic.margin;
		drawer.setColor("red");
		drawer.frameRect(margin);
	}
    var picStyle = PicStyleType.FF; 
    // console.log("Completeness " + CompletenessType.properties[biomorph.completenessGene].name +
//    		"SpokesType " + SpokesType.properties[biomorph.spokesGene].name);
    switch(biomorph.completenessGene) {
    case CompletenessType.Single: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
        	picStyle = PicStyleType.LF;
        	break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.LUD;
        	break;
        case SpokesType.Radial: 
            picStyle = PicStyleType.LUD;
            break;
        }
        break;
    case CompletenessType.Double: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
            picStyle = PicStyleType.FF;
            break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.FUD;
            break;
        case SpokesType.Radial: 
        	picStyle = PicStyleType.FUD;
        	break;
        }
        break;
    }
    drawer.penSize(myPenSize);
    // {reposition at base of grabbed space}
    thisPic.movePtr = thisPic.basePtr; 
    drawer.setColor("black");

    while(true) {
    	actualLine(picStyle, Compass.NorthSouth, thisPic, drawer); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
        	if(biomorph.completenessGene = CompletenessType.Single) 
                actualLine(PicStyleType.RUD, Compass.EastWest, thisPic, drawer);
            else
            	actualLine(picStyle, Compass.EastWest, thisPic, drawer);
        if(thisPic.movePtr.nextLin == null)
        	break; // Leave iteration with thisPic.movePtr pointing to the last Lin.
        // Advance to next Lin.
        thisPic.movePtr = thisPic.movePtr.nextLin;
    }
//    drawer.stroke();
//	drawer.closePath();
//	drawer.penSize(1);
} // {DrawPic}
function tree(x, y, lgth, dir, biomorph, dx, dy, thick, myPic, oddOne, order) {
    if(dir < 0)
        dir = dir + 8;
    if(dir >= 8)
        dir = dir - 8;

    if(biomorph.trickleGene < 1)
        biomorph.trickleGene = 1;

    var xnew = x + Math.trunc(lgth * dx[dir] / biomorph.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / biomorph.trickleGene);

    if(biomorph.dGene[8] == SwellType.Shrink) 
        thick = lgth;
    else if(biomorph.dGene[8] == SwellType.Swell) 
        thick = 1 + biomorph.gene[8] - lgth; // Make thicker the shorter the segment
    else {
        thick = 1;
    }

    picLine(myPic, x, y, xnew, ynew, thick * myPenSize);

    if(lgth > 1)
        if(oddOne) {
            
            tree(xnew, ynew, lgth - 1, dir + 1, biomorph, dx, dy, thick, myPic, oddOne, order);
            if(lgth < order)
                tree(xnew, ynew, lgth - 1, dir - 1, biomorph, dx, dy, thick, myPic, oddOne, order);
        } else {
            tree(xnew, ynew, lgth - 1, dir - 1, biomorph, dx, dy, thick, myPic, oddOne, order);
            if(lgth < order)
                tree(xnew, ynew, lgth - 1, dir + 1, biomorph, dx, dy, thick, myPic, oddOne, order);
        }
} // {tree}
/*
 Pascal original has order passed-by-reference.
 Since JavaScript passes simple types by value,
 the dirty workaround (in this and the Java edition) is to 
 return the new value for order, and pray the calling
 routine assigns the return value to order.
 */
function plugIn(gene, dx, dy) {
    var order = gene[8]; 
    dx[3] = gene[0];
    dx[4] = gene[1];
    dx[5] = gene[2];
    dy[2] = gene[3];
    dy[3] = gene[4];
    dy[4] = gene[5];
    dy[5] = gene[6];
    dy[6] = gene[7];
    dx[1] = -dx[3];
    dy[1] = dy[3];
    dx[0] = -dx[4];
    dy[0] = dy[4];
    dx[7] = -dx[5];
    dy[7] = dy[5];
    dx[2] = 0;
    dx[6] = 0;
    return order;
} // {PlugIn}

var clipBoarding = false;


var Mode = {
        Preliminary:1, 
        Breeding:2, 
        Albuming:3, 
        Phyloging:4, 
        Killing:5, 
        Moving:6, 
        Detaching:7, 
        Randoming:8, 
        Engineering:9, 
        Drifting:10, 
        Highlighting:11, 
        PlayingBack:12, 
        Triangling:13, 
        Sweeping:14
};

var theMode = Mode.Breeding;
function develop(biomorph, drawingObject, drawMargin) {
    var drawer = _drawerFactorySingleton.getDrawer('canvas2d', drawingObject);

    // Use the identity matrix while clearing the canvas
    drawer.setTransform(1, 0, 0, 1, 0, 0);
    drawer.clearRect(0, 0, drawingObject.width, drawingObject.height);
    drawer.translate(drawingObject.width / 2 + 0.5, drawingObject.height / 2 + 0.5);
    var myPic = new Pic();
    // console.log("Develop here:" + here.toString() + " Margin:" + margin.toString() + " Delayed:" + delayedDrawing);
    var dx = [0,0,0,0,0,0,0,0];
    var dy = [0,0,0,0,0,0,0,0];

    var x; 
    var y; 
    var seg; 
    var upExtent; 
    var downExtent;
    var wid; 
    var ht; 
    var thick;

    var oldHere;

    clipBoarding = false;
    here = new Point(0,0);
    var centre = here.copy();
    var order = plugIn(biomorph.gene, dx, dy); // Pass-by value workaround returns order as result.
    // // // // console.log("develop order:" + order)
    zeroPic(myPic, here);

    if(biomorph.segNoGene < 1)
        biomorph.segNoGene = 1;

    var	extraDistance;
    if(biomorph.dGene[9] == SwellType.Swell)
        extraDistance = biomorph.trickleGene;
    else if(biomorph.dGene[9] == SwellType.Shrink)
        extraDistance = -biomorph.trickleGene;
    else
        extraDistance = 0;

    var running = biomorph.gene.slice();
    // // // console.log("biomorph.gene " + biomorph.gene + "running:" + running);
    var incDistance = 0;
    // // console.log("biomorph.segNoGene " + biomorph.segNoGene);
    // { FOR seg := 1 TO SegNoGene DO}
    var segNoGeneLimit = biomorph.segNoGene + 1;
    for(seg = 1; seg < segNoGeneLimit; seg++) {
        var oddOne = (seg % 2) == 1;
        // // console.log("oddOne " + oddOne + " seg" + seg);
        if(seg > 1) {
            oldHere = here.copy();
            here.v += (biomorph.segDistGene + incDistance)/biomorph.trickleGene>>0;
            incDistance += extraDistance;
            if(biomorph.dGene[8] == SwellType.Shrink)
                thick = biomorph.gene[8];
            else
                thick = 1;
            // // // // console.log("picLine A");
            picLine(myPic, oldHere.h, oldHere.v, here.h, here.v, thick);
            var dGene = biomorph.dGene;
            for(j = 0; j<8; j++) {
                // // console.log("SwellType[" + j + "] " + SwellType.properties[dGene[j]].name);
                if(dGene[j] == SwellType.Swell) {
                    // // console.log("Swell[" + j + "] trickle: " + biomorph.trickleGene);
                    running[j] += biomorph.trickleGene;
                }
                if(dGene[j] == SwellType.Shrink) {
                    // // console.log("Shrink[" + j + "] trickle: " + biomorph.trickleGene);
                    running[j] -= biomorph.trickleGene;
                }
            }
            if(running[8] < 1) {
                running[8] = 1;
            }
            // // console.log("before plugin running " + running + " dx" + dx + "dy " + dy + " order" + order);

            order = plugIn(running, dx, dy);
            // // console.log("running " + running + " dx" + dx + "dy " + dy + " order" + order);
        }	
        var sizeWorry = biomorph.segNoGene * twoToThe(biomorph.gene[8]);
        if(sizeWorry > WORRYMAX)
            biomorph.gene[8] = biomorph.gene[8] - 1;
        if(biomorph.gene[8] < 1) {
            biomorph.gene[8] = 1;
        }
        // // console.log("call to tree order " + order + " gene8" + biomorph.gene[8]);
        tree(here.h, here.v, order, 2, biomorph, dx, dy, thick, myPic, oddOne, order);
    }
    var spokesGene = biomorph.spokesGene;


    var margin = myPic.margin;

    if(! (spokesGene == SpokesType.NorthOnly && biomorph.completenessGene == CompletenessType.Single)) {

        if(centre.h - margin.left > margin.right - centre.h)
            margin.right = centre.h + (centre.h - margin.left)
            else
                margin.left = centre.h - (margin.right - centre.h);
        var upExtent = centre.v - margin.top; //{can be zero if biomorph goes down}
        var downExtent = margin.bottom - centre.v;

        if(((spokesGene == SpokesType.NSouth) || (spokesGene == SpokesType.Radial)) || 
                (theMode == Mode.Engineering)) // {Obscurely necessary to cope with erasing last Rect in Manipulation}
            if(upExtent > downExtent)
                margin.bottom = centre.v + upExtent;
            else
                margin.top = centre.v - downExtent;

        if(spokesGene == SpokesType.Radial) {
            wid = margin.right - margin.left;
            ht = margin.bottom - margin.top;
            if(wid > ht) {
                margin.top = centre.v - Math.trunc(wid/2) - 1;
                margin.bottom = centre.v + Math.trunc(wid/2) + 1;
            } else {
                margin.left = centre.h - Math.trunc(ht/2) - 1;
                margin.right = centre.h + Math.trunc(ht/2) + 1;
            }
        }
    }
    myPic.picPerson = biomorph;
    biomorph.pic = myPic;

    margin = myPic.margin;
    // console.log("Margin " + margin.toString());
    var     offCentre = new Point((margin.left + margin.right) / 2, (margin.top + margin.bottom) / 2);
    // console.log("offCentre " + offCentre.toString());
    drawPic(myPic, offCentre, biomorph, drawer, drawMargin);

}// {develop}



// Globals, lines 205-206
// TYPE
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);



$.widget("dawk.monochrome_genebox", {
    options : {
        geneboxCollection: null,
        geneboxIndex : 0,
        value : 0,
        gradientValue : SwellType.Same,
        hasMid: true,
        hasGradient: true,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
        title: ''
    },
    _create : function(options) {
        this._setOptions(options);
        
        this.element.addClass("monochromeGenebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
                <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
                <span class="geneValue"></span> \
            </div>';
        var engineering = this.options.geneboxCollection.options.engineering;
        if(engineering) {
            str += '<div class="geneboxNavi">';
                if(this.options.hasLeftRight) {
                    str += '<div class="geneboxLeft"></div>';
                }
                str += '<div class="geneboxMid"> ';
                if(this.options.hasGradient) {
                    str += 
                        '<div class="geneboxUp"></div> \
                        <div class="geneboxEquals"></div> \
                        <div class="geneboxDown"></div>';
                }
                else {
                    str += '<div class="geneboxEquals"></div>';
                }
                str += '</div>';
            
                if(this.options.hasLeftRight) {
                    str += '<div class="geneboxRight"></div>';
                 }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
            click: "_manipulate"
          });
        
        this.refresh();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
//        console.log('genebox set options' + options);
        this.refresh();
    },

    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            // console.log("Showsign " + this.options.showSign);
            str = "+s+" + String(str);
            // console.log(str);
        }
        // console.log(str);
        this.element.find('.geneValue').text(str);
        
    },
    
    refreshColor: function() {
        this.element.find('.geneValue').text(this.options.value);
        if(this.options.hasColor) {
            $(this.element).css('background-color', str);
        }
        
    },
    
    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
    //        // console.log("gradientValue " + this.options.gradientValue);
            switch (this.options.gradientValue) {
            case SwellType.Swell:
    //            // console.log('refresh finds Swell');
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
    //            // console.log('refresh finds Shrink');
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
    //            // console.log('refresh finds Same');
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
                // console.log('Illegal gradientValue: '+ this.options.gradientValue);
            }
        }
    },
    
    refresh : function() {
        this.refreshValue();
        this.refreshColor();
        this.refreshGradient();
    },
    _constrain : function(value) {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        return value;
    },
    _manipulate: function(event) {
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);
        var target = $(event.target);
        var leftRightPos;
        var rung;
        // console.log(target.attr('class'));
        if(target.hasClass('geneboxLeft')) {
            leftRightPos = HorizPos.LeftThird;
        } else if(target.hasClass('geneboxRight')) {
            leftRightPos = HorizPos.RightThird;
        } else if(target.hasClass('geneboxMid')) {
            leftRightPos = HorizPos.MidThird;
        }
        
        if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        }
        
        this.options.geneboxCollection.manipulate(this.options.geneboxIndex, leftRightPos, rung)
        return false;
    }
    
});

$.widget( "dawk.gene1to9box", $.dawk.monochrome_genebox, {
    _init : function() {
        
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    }

} );

$.widget( "dawk.segNoGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasColor = false;
        this.options.hasGradient = false;
        this._super();
    },
    refresh: function() {
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );

$.widget( "dawk.segDistGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = true;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );


$.widget( "dawk.completenessGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.element.attr('title', 'Completeness');

        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        // console.log(str);
        var properties = CompletenessType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


$.widget( "dawk.spokesGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.element.attr('title', 'Spokes');
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        // console.log(str);
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


$.widget('dawk.monochrome_geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        genotype: null,
    },

    updateFromCanvas: function(canvas) {
        
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.genotype = biomorph;
//        console.log('update from ' + id + ' biomorph ' + biomorph);
        geneboxes = $(this.element).find('.monochromeGenebox');
//        console.log('update from ' + id + ' nGeneboxes ' + geneboxes.length + ' biomorph ' + biomorph);
        var genebox;
        for(i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("option", "value", biomorph.gene[i]);
            genebox.gene1to9box("option", "gradientValue", biomorph.dGene[i]);
            genebox.gene1to9box("refresh");
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("option", "value", biomorph.segNoGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("option", "value", biomorph.segDistGene);
        genebox.segDistGenebox("option", "gradientValue", biomorph.dGene[9]);
        genebox.segDistGenebox("refresh");
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("option", "value", biomorph.completenessGene);
        genebox.completenessGenebox("refresh");
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("option", "value", biomorph.spokesGene);
        genebox.spokesGenebox("refresh");
        genebox = geneboxes.eq(13);
        genebox.segNoGenebox("option", "value", biomorph.trickleGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("option", "value", biomorph.mutSizeGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("option", "value", biomorph.mutProbGene);
        genebox.segNoGenebox("refresh");
        
    },
    _create : function(options) {
        this._setOptions(options);
//        for (var k in this.options){
//            if (typeof this.options[k] !== 'function') {
//                 console.log("Key is " + k + ", value is" + this.options[k]);
//            }
//        }
        this.element.addClass("monochromeGeneboxes");
        var i;
        for (i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            var geneBox = $("<div></div>").gene1to9box({
                geneboxCollection: this, 
                title: geneBoxTitle});
            geneBox.gene1to9box("option", "geneboxIndex", i + 1);
            this.element.append(geneBox);
        }
        var geneBox;
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 10);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segDistGenebox({geneboxCollection: this, title: 'Segment Distance and Gradient Gene 10'});
        geneBox.segDistGenebox("option", "geneboxCollection", this);
        geneBox.segDistGenebox("option", "geneboxIndex", 11);
        this.element.append(geneBox);
        geneBox = $("<div></div>").completenessGenebox({geneboxCollection: this});
        geneBox.completenessGenebox("option", "geneboxCollection", this);
        geneBox.completenessGenebox("option", "geneboxIndex", 12);
        this.element.append(geneBox);
        geneBox = $("<div></div>").spokesGenebox({geneboxCollection: this});
        geneBox.spokesGenebox("option", "geneboxCollection", this);
        geneBox.spokesGenebox("option", "geneboxIndex", 13);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Trickle'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 14);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Size'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 15);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Probability'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 16);
        this.element.append(geneBox);
        
        this.refresh();
    },
    _setOption : function(key, value) {
//        // console.log('setOption ' + key + ": " + value);
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
        console.log('manipulate ' + geneboxIndex);
       this.options.genotype.manipulation(geneboxIndex, leftRightPos, rung);
       var canvas = $(this.element).parent().find('canvas').get(0);
       this.updateFromCanvas(canvas);
       develop(this.options.genotype, canvas,
               drawCrossHairs);
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }
    
});
initializeMut();

var drawCrossHairs = false;
var autoRunning = false;


function doPerson(biomorphType, canvas) {
    
    var genotype = new Person();
    switch(biomorphType) {
    case "Chess": chess(genotype); break;
    case "BasicTree": basicTree(genotype); break;
    case "Insect": insect(genotype); break;
    case "Saltation": doSaltation(genotype); break;
    }
    develop(genotype, canvas, drawCrossHairs); 
    jQuery.data(canvas, "genotype", genotype);
    $(canvas).trigger('mouseover');

    return genotype;
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
//    console.log("eraseCanvasNoCenter");
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

function formChanged(canvasId) {
    var form = document.getElementById('engineering');
    var canvas  = document.getElementById(canvasId);
    genotype = jQuery.data(canvas, "genotype");
    genotype.fromForm(form);
    drawCrossHairs = document.getElementById('crosshairs').checked;
    develop(genotype, canvas, drawCrossHairs); 
}
$.widget('dawk.blindWatchmaker', {
   options: {
       
   } ,
   _create: function () {
     var ul = $('<ul></ul>');
     this.element.append(ul);
     this.element.tabs();
     var newTabLi = $('<li><a href="#monochrome">Monochrome</a></li>');
     ul.append(newTabLi);
     var div = $('<div id="#monochrome"></div>');
     this.element.append(div);
     div.watchmakerSession();
     this.element.tabs("refresh");
   },
});$.widget('dawk.watchmakerSession', {
   options: {
       
   },
   _create: function () {
       var ul = $('<ul></ul>');
       this.element.append(ul);
       this.element.tabs();
       this.newBreedingWindow();
       this.newEngineeringWindow();
       this.element.tabs('option', 'active', 0);
  },
  newBreedingWindow: function() {
      var newTabLi = $('<li><a href="#breeding">Breeding</a></li>');
      this.element.find('ul').append(newTabLi);
      var div = $('<div id="breeding"></div>');
      this.element.append(div);
      div.breedingWindow();
      this.element.tabs("refresh");
  },
  newEngineeringWindow: function() {
      var newTabLi = $('<li><a href="#engineering">Engineering</a></li>');
      this.element.find('ul').append(newTabLi);
      var div = $('<div id="engineering"></div>');
      this.element.append(div);
      div.engineeringWindow();
      this.element.tabs("refresh");
  }
});
function initGeneboxes(container, options) {
    var geneboxes = $("<div></div>").monochrome_geneboxes(options);
    container.append(geneboxes);
    return geneboxes;
}




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

function autoBreed(breedingBoxes) {

}

$( function() { 
    $.widget( "dawk.breedingAutoReproduceControl", {
        options: {
            startButton: null

        },
        _create: function() {
            var div = $('<div></div>');
            this.element.append(div);
            var button = $('<button>AutoReproduce</button>');
            this.options.startButton = button;
            div.append(button);
            this._on(button, {'click': 'startAutoBreeding'});
            var string = '<span> with delay of <input type="text"\
                class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
                milliseconds.</span>';
            div.append($(string));
        },
        startAutoBreeding: function() {
            this.options.autoRunning = true;
            this.autoBreed();
            this.measureGenerationRate(Number(document.getElementById('generations').value));
        },
        autoBreed: function() {
            var breedingWindow = $(this.element).parent();
            var breedingBoxes = $(this.element).parent().find('.boxes').get(0);
            if (autoRunning) {
                var useFitness = $(breedingWindow).find('.useFitness').get(0).checked;
                var numBoxes = $(boxes).breedingBoxes("option", "numBoxes");
                if (useFitness) {
                    var canvas = $(breedingBoxes).find('.box').get(0);
                    var biomorph = getBiomorphFromCanvas(canvas);
                    var bestSoFar = canvas;
                    var errorToBeat = fitness(biomorph, canvas.width, canvas.height);
                    $(breedingBoxes).each( function(index) {
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
                    $(breedingBoxes).find('.box').get(luckyParent).trigger('click');
                }
                setTimeout(function() {
                    autoBreed()
                }, Number(document.getElementById("autoReproduceInterval").value));
            }            
        },
        measureGenerationRate: function(generationsPreviousSecond) {
            
            var generationCounter = $(this.element).parent().find('.generations').get(0);
            var newGenerationValue = Number(generationCounter.value) + 1;
            generationCounter.value = newGenerationValue;
            var generationRate = $(this.element).parent().find('.generationsRate').get(0);
            generationRate.value = newGenerationValue - generationsPreviousSecond;
            if(this.options.autoRunning)
                setTimeout(function() { this.measureGenerationRate(newGenerationValue)}, 1000);
            
        }
    });
});

$( function() {
    $.widget( "dawk.breedingControl", {
        _create: function() {
            var string = '<div>\
                <input type="checkbox" class="useFitness" /> <span>Use Fitness\
                (Breed based on how well biomorph fits its box) <a\
                href="engineering.html">Engineering</a>\
                </span> <input type="checkbox" id="explosiveBreeding" /> <span>Explosive\
                Breeding </span>\
                </div>';
            var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});
$( function() {
    $.widget( "dawk.breedingOffspringCounter", {
        _create: function() {
            var string = '<div>\
                Offspring count: <input type="number" value="0" class="generations" />\
                Offspring per second: <input type="number" value="0"\
                class="generationRate" />\
                </div>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingWindow", {
        _create: function () {
            $(this.element).addClass('breedingWindow');
            $(this.element).breedingAutoReproduceControl();
            $(this.element).breedingControl();
            $(this.element).breedingOffspringCounter();
            var geneboxes = initGeneboxes(this.element, {
                numBoxes : 15,
                cols : 5,
                engineering : false
            });
            var container = $("<div></div>");
            container.addClass('container');
            var boxes = $("<div></div>").breedingBoxes();
            var overlay = $("<div></div>");
            overlay.addClass("overlay");
            container.append(overlay);
            container.append(boxes);
            var overlayCanvas = $('<canvas></canvas>');
            overlayCanvas.attr('id', 'overlayCanvas');
            overlayCanvas.attr('width', 1000);
            overlayCanvas.attr('height', 600);
            overlayCanvas.addClass('overlayCanvas');
            overlay.append(overlayCanvas);
            this.element.append(container);
            var numBoxes = boxes.breedingBoxes("option", 'numBoxes');
            var cols = boxes.breedingBoxes("option", 'cols');

            var midCanvas = $(this.element).find('.midBox').get(0);
            doPerson("BasicTree", midCanvas);
            $(midCanvas).trigger('mouseover');
//            $(midCanvas).trigger('click');
        }})});


$.widget('dawk.engineeringWindow', {
    options: {},
    _create: function() {
        $(this.element).addClass('engineeringWindow');
        var geneboxes = initGeneboxes(this.element, {
            engineering : true
        });
        var engineeringDiv = $("<div></div>").engineeringBox({ 
            height: 600,
            width: 1000});
        this.element.append(engineeringDiv);
        doPerson("BasicTree", $(engineeringDiv).find('canvas').get(0));
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
//            console.log(geneboxes);
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', this.options.canvas);
        },
        _doCanvasClicked: function(event) {
            // Raise the hypodermic message TODO
            return false;
        },
    });
});