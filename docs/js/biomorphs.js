var SwellType = {
    Swell: 1,
    Shrink: 2,
    Same: 3,
    properties: {
        1: {name: "Swell"},
        2: {name: "Shrink"},
        3: {name: "Same"}
    },
    swellType: function(index) {
        switch(index) {
        case 1:
            return SwellType.Swell;
        case 2:
            return SwellType.Shrink;
        case 3:
            return SwellType.Same;
        }
    }
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
$.widget("dawk.biomorph_genebox", {
    options : {
        hasMid: false,
        hasGradient: false,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
    },
    _create : function(options) {
        this._setOptions(options);
        this.element.addClass("genebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        let options = this.options;
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
            <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
            <span class="geneValue"></span> \
            </div>';
        var engineering = options.geneboxCollection.options.engineering;
        if(engineering) {
            if(options.hasLeftRight && (options.hasMid || options.hasGradient)) {
                str += '<div class="geneboxNaviThirds">'
            } else if(options.hasLeftRight){
                str += '<div class="geneboxNaviHalves">'
            } else {
                str += '<div class="geneboxNaviWhole">'
            } 

            if(options.hasLeftRight) {
                str += '<div class="geneboxLeft"></div>';
            }


            if(options.hasGradient) {
                str += '<div class="geneboxMidThirds">';
                str += 
                    '<div class="geneboxUp"></div> \
                    <div class="geneboxEquals"></div> \
                    <div class="geneboxDown"></div>';
                str += '</div>';
            } else if(options.hasMid) {
                str += '<div class="geneboxMidWhole">\
                    <div class="geneboxEquals"></div>\
                    </div>';
            }

            if(options.hasLeftRight) {
                str += '<div class="geneboxRight"></div>';
            }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) {
            this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
                click: "_manipulate"
            });
            this._on( $(this.element).find('.geneboxNaviWhole'), {
                click: "_launchPicker"
            });
        }
        this.refresh();
    },
    _launchPicker: function() {
        console.error('Launch picker has no picker to launch: override in the genebox definition.')
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    updateValue: function(newValue, newGradientValue) {
        let options = this.options
        options.value = newValue
        if(options.hasGradient) {
            options.gradientValue = newGradientValue
        }
        this.refresh();
    },
    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            str = "+" + String(str);
        }
        this.element.find('.geneValue').text(str);

    },

    refreshColor: function() {

        if(this.options.hasColor) {
            $(this.element).css('background-color', this.options.value);
        }

    },

    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
            switch (this.options.gradientValue) {
            case SwellType.Swell:
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
            }
        }
    },

    refresh : function() {
        this.refreshValue();
        let options = this.options
        if(options.hasColor) {
            this.refreshColor()
        }

        if(options.hasGradient) {  
            this.refreshGradient()
        }
    },
    _manipulate: function(event) {
        var target = $(event.target);
        var leftRightPos;
        var rung;
        if(target.hasClass('geneboxLeft')) {
            leftRightPos = HorizPos.LeftThird;
        } else if(target.hasClass('geneboxRight')) {
            leftRightPos = HorizPos.RightThird;
        } else if(target.hasClass('geneboxMid')) {
            leftRightPos = HorizPos.MidThird;
        } else if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        } else if(target.hasClass('geneboxNaviWhole')) {
            console.log('geneboxNaviWhole in rung calculation. Picker related? Probably not a problem.')
        }
        let options = this.options
        options.geneboxCollection.manipulate(options.geneboxIndex, leftRightPos, rung)
        return false;
    }

});


$.widget('dawk.geneboxes', {
    options : {
        engineering: true,
        session: null,
        numGeneBoxes : 16,
        biomorph: null,
    },    
    _create: function(options) {
        this._setOptions(options);
        $(this.element).addClass('geneboxes')
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) { 
        let options = this.options
        options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        options.biomorph.develop();
    },
})


/**
 * Spokes genebox
 */

$.widget( "dawk.spokesGenebox", $.dawk.biomorph_genebox, {
    options: {
        hasMid: true,
        title: 'Spokes'
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
});

function Biomorphs() {
    
}

Biomorphs.prototype.develop = function() {
    var drawingObject = this.drawer;
    var drawingContext = _drawerFactorySingleton.getDrawer('canvas2d', drawingObject);
    // Use the identity matrix while clearing the canvas
    drawingContext.setTransform(1, 0, 0, 1, 0, 0);
    drawingContext.clearRect(0, 0, drawingObject.width, drawingObject.height);
    drawingContext.translate(drawingObject.width / 2 + 0.5, drawingObject.height / 2 + 0.5);

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
    var order = this.plugIn(this.gene, dx, dy); // Pass-by value workaround returns order as result.
    this.pic.zeroPic(here);

    if(this.segNoGene < 1)
        this.segNoGene = 1;

    var extraDistance;
    if(this.dGene[9] == SwellType.Swell)
        extraDistance = this.trickleGene;
    else if(this.dGene[9] == SwellType.Shrink)
        extraDistance = -this.trickleGene;
    else
        extraDistance = 0;

    var running = this.gene.slice();

    var incDistance = 0;
    var segNoGeneLimit = this.segNoGene + 1;
    for(let seg = 1; seg < segNoGeneLimit; seg++) {
        var oddOne = (seg % 2) == 1;
        if(seg > 1) {
            oldHere = here.copy();
            here.v += (this.segDistGene + incDistance)/this.trickleGene>>0;
            incDistance += extraDistance;
            if(this.dGene[8] == SwellType.Shrink)
                thick = this.gene[8];
            else
                thick = 1;

            this.pic.picLine(oldHere.h, oldHere.v, here.h, here.v, thick);
            var dGene = this.dGene;
            for(let  j = 0; j<8; j++) {
                if(dGene[j] == SwellType.Swell) {
                    running[j] += this.trickleGene;
                }
                if(dGene[j] == SwellType.Shrink) {
                    running[j] -= this.trickleGene;
                }
            }
            if(running[8] < 1) {
                running[8] = 1;
            }

            order = this.plugIn(running, dx, dy);
        }       
        var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
        if(sizeWorry > WORRYMAX)
            this.gene[8] = this.gene[8] - 1;
        if(this.gene[8] < 1) {
            this.gene[8] = 1;
        }
        this.tree(here.h, here.v, order, 2, dx, dy, thick, oddOne, order);
    }
    
    var margin = this.pic.margin;

    var spokesGene = this.spokesGene;
    
    if(! (spokesGene == SpokesType.NorthOnly && this.completenessGene == CompletenessType.Single)) {

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

    var offCentre = new Point((margin.left + margin.right) / 2, (margin.top + margin.bottom) / 2);

    this.pic.drawPic(offCentre);

}// {develop}
