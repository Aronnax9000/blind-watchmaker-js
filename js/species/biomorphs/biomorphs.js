
function Biomorphs() {
    
}


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
/*
 * Monochrome biomorph bounding box calculations.
 * Monochrome biomorphs store this as a Rect
 * in the this.pic.margin property
 */

Biomorphs.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

Biomorphs.prototype.getWidth = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return margin.right - margin.left
}
Biomorphs.prototype.getHeight = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return margin.bottom - margin.top
}
Biomorphs.prototype.getRect = function() {
    if(this.pic.margin == null || this.pic.margin.isDegenerate()) {
        this.dummydraw()
    }
    let margin = this.pic.margin
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}

