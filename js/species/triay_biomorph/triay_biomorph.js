/**
 * Triay Biomorph Genebox
 */

$.widget("dawk.triay_biomorph_genebox", $.dawk.biomorph_genebox, {
    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
            switch (this.options.gradientValue) {
            case "Swell":
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case "Shrink":
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case "Same":
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
            }
        }
    },
});


$.widget( "dawk.triay_biomorph_gene1to9box", $.dawk.triay_biomorph_genebox, {
    options: {
        hasGradient: true
    },
});

$.widget( "dawk.triay_biomorph_segNoGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        showSign: true
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
});

$.widget( "dawk.triay_biomorph_segDistGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        hasGradient: true,
        showSign: true
    },
})

$.widget( "dawk.triay_biomorph_completenessGenebox", $.dawk.triay_biomorph_genebox, {
    _init : function() {
        this.element.attr('title', 'Completeness');
        this.options.hasMid = false;
        this._super();
    },
    refresh: function() {
        this.element.find('.geneValue').text(
                this.options.value ? 'Bilat' : 'Asym');
    },
})

$.widget( "dawk.triay_biomorph_spokesGenebox", $.dawk.triay_biomorph_genebox, {
    options: {
        hasMid: true  
    },
    refresh: function() {
        this.element.find('.geneValue').text(this.options.value);
    },
});

$.widget('dawk.triay_biomorph_geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        biomorph: null,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;

        biomorph = biomorph.triay_biomorph

        geneboxes = $(this.element).find('.genebox');
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.triay_biomorph_gene1to9box("updateValue", biomorph.genes[i], biomorph.dGenes[i]);
        }
        genebox = geneboxes.eq(9);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.segNoGene);
        genebox = geneboxes.eq(10);
        genebox.triay_biomorph_segDistGenebox("updateValue", biomorph.segDistGene, biomorph.dGenes[9]);
        genebox = geneboxes.eq(11);
        genebox.triay_biomorph_completenessGenebox("updateValue", biomorph.symmetrical);
        genebox = geneboxes.eq(12);
        genebox.triay_biomorph_spokesGenebox("updateValue", biomorph.spokesGene);
        genebox = geneboxes.eq(13);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.trickleGene);
        genebox = geneboxes.eq(14);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.mutSizeGene);
        genebox = geneboxes.eq(15);
        genebox.triay_biomorph_segNoGenebox("updateValue", biomorph.mutProbGene);
    },
    _create : function(options) {
        this._super(options)

        this.element.addClass("monochromeGeneboxes");
        this.element.addClass("geneboxes");
        let template = '<div></div>';

        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            $(template).triay_biomorph_gene1to9box({
                geneboxCollection: this, 
                geneboxIndex: i + 1,
                title: geneBoxTitle}).appendTo(this.element);
        }

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 10,
            title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096'
        }).appendTo(this.element);

        $(template).triay_biomorph_segDistGenebox({
            geneboxCollection: this, 
            geneboxIndex: 11,
            title: 'Segment Distance and Gradient Gene 10'}).appendTo(this.element);

        $(template).triay_biomorph_completenessGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
        }).appendTo(this.element);

        $(template).triay_biomorph_spokesGenebox({
            geneboxCollection: this,
            geneboxIndex: 13,
        }).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 14,
            title: 'Trickle'}).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 15,
            title: 'Mutation Size'}).appendTo(this.element);

        $(template).triay_biomorph_segNoGenebox({
            geneboxCollection: this, 
            geneboxIndex: 16,
            title: 'Mutation Probability'}).appendTo(this.element);
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
        this.options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        this.options.biomorph.develop();
    },
    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }

});
function TriayBiomorphs(session, drawer) {
    this.session = session
    this.drawer = drawer
//    this.full = null
}

TriayBiomorphs.prototype.copyBiomorph = function(child) {
    child.triay_biomorph = new Biomorph (child.drawer.getContext('2d'), 
            child.drawer.width, child.drawer.height, this.triay_biomorph)

}

TriayBiomorphs.initializeSession = function(session) {
    session.options.sessionIcon = 'img/BWSpiderLogoMono_ICNO_23096_16x16.png'
        session.options.basicTypes = ['Hopeful Monster',
            'BasicTree',
            'Chess',
            'Insect']
            session.options.defaultBasicType = 'Hopeful Monster'
            session.options.hopefulMonsterBasicType = 'Hopeful Monster'
}

/*
 * Triay monochrome biomorph bounding box calculations.
 * Triay monochrome biomorphs store this as a Rect-like
 * structure in the this.biomorph.box property
 */

TriayBiomorphs.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = Document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

TriayBiomorphs.prototype.getWidth = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return margin.right - margin.left
}
TriayBiomorphs.prototype.getHeight = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return margin.bottom - margin.top
}
TriayBiomorphs.prototype.getRect = function() {
    if(this.triay_biomorph.box == null) {
        dummydraw()
    }
    let margin = this.triay_biomorph.box
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}


TriayBiomorphs.prototype.doSaltation = function() {
    this.triay_biomorph.randomize()
}
// initializes the biomorph's genotype to a random set of values
// causes the biomorph's genotype to undergo a random mutation
TriayBiomorphs.prototype.mutate = function() {
}
//creates and returns a new, mutated copy of the biomorph.
TriayBiomorphs.prototype.reproduce = function(element) {
    var child = new TriayBiomorphs(this.session, element)
    child.triay_biomorph = this.triay_biomorph.breed(element)
    return child
}
// called when it is time for the biomorph to draw itself. 
TriayBiomorphs.prototype.develop = function() {
    this.triay_biomorph.ctx = this.drawer.getContext('2d')
    this.triay_biomorph.generate()
    this.triay_biomorph.drawWithImages()
}


//Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Triay Biomorph", 
        (function(session, drawer) { return new TriayBiomorphs(session, drawer)}),
        (function(session) { TriayBiomorphs.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.triay_biomorph_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).triay_biomorph_geneboxes('updateFromCanvas', canvas)}));

TriayBiomorphGeneTemplate.prototype.basicTree = function () {
    
    this.makeGenes(-10, -20, -20, -15, -15, 0, 15, 15, 7);
    this.segNoGene = 2;
    this.segDistGene = 150;
    this.symmetrical = false;
    this.dGenes[3] = 'Shrink'
    this.dGenes[4] = 'Shrink'
    this.dGenes[5] = 'Shrink'
    this.dGenes[8] = 'Shrink'
    this.trickleGene = 9;
}

TriayBiomorphGeneTemplate.prototype.chess = function () {
    this.makeGenes(-TRICKLE, 
            3 * TRICKLE, 
            -3 * TRICKLE, 
            -3 * TRICKLE, 
            TRICKLE, 
            -2 * TRICKLE, 
            6 * TRICKLE, 
            -5 * TRICKLE, 
            7);
}

TriayBiomorphGeneTemplate.prototype.insect = function() {
    this.makeGenes( 
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

TriayBiomorphGeneTemplate.prototype.makeGenes = function (a, b, c, d, e, f, g, h, i) {
    for(let s = 0; s < 10; s++) {
        this.dGenes.push("Same");
    }
    this.segNoGene = 1;
    this.segDistGene = 150;
    this.symmetrical = true;
    this.spokesGene = "Single";
    this.trickleGene = TRICKLE;
    this.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    this.mutProbGene = 10;
    this.genes.push(a)
    this.genes.push(b)
    this.genes.push(c)
    this.genes.push(d)
    this.genes.push(e)
    this.genes.push(f)
    this.genes.push(g)
    this.genes.push(h)
    this.genes.push(i)
}

//initializes the biomorph's genotype as one of a named set of types.

function TriayBiomorphGeneTemplate() {
    this.segNoGene = 1
    this.segDistGene = 150
    this.symmetrical = true
    this.spokesGene = "Single"
    this.trickleGene = TRICKLE
    this.mutSizeGene = Math.trunc(TRICKLE/2) // Trickle div 2;
    this.mutProbGene = 10
    this.genes = []
    this.dGenes = []
}

TriayBiomorphs.prototype.doPerson = function(biomorphType) {
    let genes = null
    switch(biomorphType) {
   
    case "Chess":     
        genes = new TriayBiomorphGeneTemplate()
        genes.chess(); break;
    case "Insect": 
        genes = new TriayBiomorphGeneTemplate()
        genes.insect(); break;
    case "BasicTree": 
        genes = new TriayBiomorphGeneTemplate()
        genes.basicTree(); break;
    case "Hopeful Monster": 
    default: 
    }
    var drawer = this.drawer
    this.triay_biomorph = new Biomorph(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            genes)

    return this;
}
TriayBiomorphs.prototype.twoToThe = function(n) {
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


TriayBiomorphs.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    var str = "Manipulation geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    var biomorph = this.triay_biomorph
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
            biomorph.genes[geneboxIndex - 1] -= biomorph.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            biomorph.genes[geneboxIndex - 1] += biomorph.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[0];
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[1];
                break;
            case VertPos.BottomRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[2];
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.genes[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = biomorph.segNoGene * Monochrome.twoToThe(biomorph.genes[8] + 1);
            if(sizeWorry <= WORRYMAX)
                biomorph.genes[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[0]
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[1]
                break;
            case VertPos.BottomRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[2]
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (biomorph.segNoGene + 1) * Monochrome.twoToThe(biomorph.genes[8]);
            if(sizeWorry <= WORRYMAX) {
                biomorph.segNoGene++
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.segDistGene -= biomorph.trickleGene
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[0]
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[1]
                break;
            case VertPos.BottomRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[2]
                break;
            }
            break;
        case HorizPos.RightThird: 
            biomorph.segDistGene += biomorph.trickleGene
            break;
        }
        break;
    case 12: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.symmetrical = false
            break
        case HorizPos.MidThird: 
            break // {No Action}
        case HorizPos.RightThird: 
            biomorph.symmetrical = true;
            break;
        }
        break;
    case 13: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.spokesGene = Biomorph.spokesGenes[0];
            break;
        case HorizPos.MidThird: 
            biomorph.spokesGene = Biomorph.spokesGenes[1];
            break;
        case HorizPos.RightThird: 
            biomorph.spokesGene = Biomorph.spokesGenes[2];
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.trickleGene > 1)
                biomorph.trickleGene--
            break
        case HorizPos.RightThird: 
            biomorph.trickleGene++
            break
        case HorizPos.MidThird: 
            break // {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.mutSizeGene > 1)
                biomorph.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            biomorph.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.mutProbGene > 1) {
                biomorph.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(biomorph.mutProbGene < 100)
                biomorph.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
            break;
        }
    }
    if(biomorph.genes[8] < 1) {
        biomorph.genes[8] = 1;
    }

    if(biomorph.segNoGene < 1) {
        biomorph.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}
//A biomorph is a set of genes, represented as numbers, strings and booleans
//The genes lead to the generation of segments using a recursive tree building
//algorithm, which can then be drawn on a canvas
//The naming was largely taken from the original code. They include:
//- genes: an array of 9 numbers, which control the general growth of the biomorph
//- dGenes: an array of 10 strings, which represent modifiers to the expression of the genes
//- segNoGene: the number of segments
//- segDistGene: the distance between segments
//- symmetrical: whether the biomorph is vertically symmetrical
//- spokesGene: string representing if the biomorph has a body in 1, 2 or 4 parts
//- trickleGene: curbs how big the biomorphs get (scale-ish)
//- mutSizeGene: Indicates how much a gene changes when it mutates
//- mutProbGene: The probability of mutation for a gene
//Additionally, we pass in an HTML5 canvas context, and width and height of the canvas
//The genes are optional (you'll get a random biomorph). The biomorph is then generated 
//(effectively, all the segments to be draw are worked out ahead of drawing)

function Biomorph (ctx, width, height, genes) {
    this.box = null
    this.canvasWidth = width
    this.canvasHeight = height

    this.doScale = false;
    // The centre is being changed by the algorithm so we keep a working version here
    // as well as copy for generated centre (which can change depending on scale/translate of the coordinates)
    // and finally an origin, a pristine copy of the centre coordinates
    // Use rounded coordinates to keep canvas off the anti-aliasing
    this.workingCentre = { x: Math.round(this.canvasWidth/2), y: Math.round(this.canvasHeight/2) }
    this.generatedCentre = { x: this.workingCentre.x, y: this.workingCentre.y }
    this.origin = { x: this.workingCentre.x, y: this.workingCentre.y }

    this.segments = []
    this.nbSegments = 0
    this.ctx = ctx

    this.children = []

    this.type = 'biomorph';

    if (genes) {
        this.genes = genes.genes.slice()
        this.dGenes = genes.dGenes.slice()
        this.segNoGene = genes.segNoGene
        this.segDistGene = genes.segDistGene
        this.symmetrical = genes.symmetrical
        this.spokesGene = genes.spokesGene
        this.trickleGene = genes.trickleGene
        this.mutSizeGene = genes.mutSizeGene
        this.mutProbGene = genes.mutProbGene
//      this.generate()
    }
    else {
        this.randomize()
    }
}

Biomorph.swellTypes = ["Swell", "Same", "Shrink"]
Biomorph.spokesGenes = ["Single", "Double", "Radial"]

Biomorph.prototype.randomize = function () {

    var randomGenes = Biomorph.randomGenes()
    this.genes = randomGenes.genes.slice()
    this.dGenes = randomGenes.dGenes.slice()
    this.segNoGene = randomGenes.segNoGene
    this.segDistGene = randomGenes.segDistGene
    this.symmetrical = randomGenes.symmetrical
    this.spokesGene = randomGenes.spokesGene
    this.trickleGene = randomGenes.trickleGene
    this.mutSizeGene = randomGenes.mutSizeGene
    this.mutProbGene = randomGenes.mutProbGene
//  this.generate()
}

Biomorph.prototype.resetCentre = function () {

    this.generatedCentre = {x: this.origin.x, y: this.origin.y }
    this.workingCentre = {x: this.origin.x, y: this.origin.y }
}

Biomorph.randomInt = function(lower, upper) {
    return Math.trunc(Math.random() * (upper - lower) + lower)
}

Biomorph.randSwell = function() {
    return Biomorph.swellTypes[Math.trunc(Math.random() * Biomorph.swellTypes.length)]
}

Biomorph.randSpokes = function() {
    return Biomorph.spokesGenes[Math.trunc(Math.random() * Biomorph.spokesGenes.length)]
}



//Gives a random set of genes to form a "hopeful monster"
//The values are set to produce something varied but still visually pleasing
Biomorph.randomGenes = function () {

    return {
        genes: [Biomorph.randomInt(-20, 20), Biomorph.randomInt(-20, 20), Biomorph.randomInt(10, 20), Biomorph.randomInt(-10, 10), Biomorph.randomInt(-10, 10), Biomorph.randomInt(10, 20), Biomorph.randomInt(10, 20), Biomorph.randomInt(10, 20), Biomorph.randomInt(3, 6)],
        dGenes: [Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), Biomorph.randSwell(), "Same", Biomorph.randSwell()],
        segNoGene: Biomorph.randomInt(1, 6),
        segDistGene: Biomorph.randomInt(-30, 30),
        symmetrical: true,
        spokesGene: Biomorph.randSpokes(),
        trickleGene: 1,
        mutSizeGene: 5,
        mutProbGene: 10
    }
}

//Some mutations can be turned off or on depending on 
//what you're trying to achieve
Biomorph.mutations = {
        segmentation: true,
        gradient: true,
        asymmetry: true,
        radialSym: true,
        scalingFactor: true,
        mutationSize: false,
        mutationRate: false,
        taperingTwigs: true,
        fatten: true
}


//Width and height are optional and useful if the canvas has changed size
//since it was passed to the biomorph.
//This method generates all the segment for the current set of genes
//If the genes change, this needs to be called again
//You'll notice that spokesGene and the symmetrical flags aren't used here
//They come into play when drawing. Effectively, this generates the first part
//of the biomorph and it'll be duplicated and twisted to match these genes on drawing.
Biomorph.prototype.generate = function (width, height) {

    if (width && height) {

        this.canvasWidth = width
        this.canvasHeight = height

        // Use round coordinates to avoid potential performance problems
        this.origin.x = Math.round(width/2)
        this.origin.y = Math.round(height/2)
    }

    this.resetCentre()

    var extraDistance = 0
    var incDistance = 0

    // Make a working copy of the original genes
    // so as to not mess with the original values
    this.runningGenes = this.genes.slice()
    this.segments = []

    if (this.dGenes[9] === "Swell") {
        extraDistance = this.trickleGene
    }
    else if (this.dGenes[9] === "Shrink") {
        extraDistance = -this.trickleGene
    }

    // To start building the tree with an odd value
    // A lot of the original code didn't use zero based arrays
    // so a little creativity was necessary to reproduce the same
    // process as closely as possible
    for (var i = 1; i <= this.segNoGene; i++) {

        if (i > 1) {
            var startX = this.workingCentre.x
            var startY = this.workingCentre.y
            var thickness = 1

            this.workingCentre.y += (this.segDistGene + incDistance) / this.trickleGene
            incDistance += extraDistance

            if (this.dGenes[8] === "Shrink") {
                thickness = this.genes[8]
            }

            this.segments.push({ startX: Math.round(startX), startY: Math.round(startY), endX: Math.round(this.workingCentre.x), endY: Math.round(this.workingCentre.y), size: thickness })

            for (var j = 0; j < this.runningGenes.length - 1; j++) { // loop over everything except the last one
                if (this.dGenes[j] === "Swell") {
                    this.runningGenes[j] += this.trickleGene
                }
                else if (this.dGenes[j] === "Shrink") {
                    this.runningGenes[j] -= this.trickleGene
                }
            }

            // The last gene roughly controls the size of the biomorph
            // We don't want this to be less than 1 otherwise it might not render at all
            if (this.runningGenes[8] < 1) {
                this.runningGenes[8] = 1
            }
        }

        // This is a recursive function which will build an entire part of the biomorph
        // The last argument is the direction, which arbitrarily in the original code starts at 2
        // The direction represents which gene will be used to alter the segments positions
        // see the dx and dy methods. The depth is determined by the 9th (last) gene
        this.buildTree(i % 2 !== 0, this.workingCentre.x, this.workingCentre.y, this.runningGenes[8], 2)
    }

    this.nbSegments = this.segments.length

    this.setBoundingBox() // Calculate top/bottom

    this.translate(0, this.verticalOffset()) // recentre biomorph

    if(this.doScale) {
        this.scaleToBox(0.8) // make sure the biomorph fits inside the canvas
    }
}

//This is a recursive function which does most of the construction work
Biomorph.prototype.buildTree = function (odd, x, y, depth, direction) {

    // We want to make sure we loop around that array
    // as we progress in direction
    if (direction < 0) {
        direction = direction + 8 // 8 = length of dx/dy array
    }
    else if (direction >= 8) { // >= length of dx/dy array
        direction = direction - 8
    }

    var endX = x + depth * this.dx(direction) / this.trickleGene
    var endY = y + depth * this.dy(direction) / this.trickleGene

    var thickness = 1

    // The depth is used to make segments wider or thinner
    // if the modifier gene 9 is active
    if (this.dGenes[8] === "Shrink") {
        thickness = depth
    }
    else if (this.dGenes[8] === "Swell") {
        thickness = 1 + this.genes[8] - depth
    }

    this.segments.push({ startX: Math.round(x), startY: Math.round(y), endX: Math.round(endX), endY: Math.round(endY), size: thickness })

    // The depth serves as the stopping condition of the recursive loop
    // It's important that on every call it decreases
    if (depth > 1) {

        // The odd flag inverts changes the direction (dx, dy) for the segment
        if (odd) {
            this.buildTree(odd, endX, endY, depth - 1, direction + 1)

            // Basically, don't execute this on the first call
            if (depth < this.runningGenes[8]) {
                this.buildTree(odd, endX, endY, depth - 1, direction - 1)
            }
        }
        else {
            this.buildTree(odd, endX, endY, depth - 1, direction - 1)

            // Basically, don't execute this on the first call
            if (depth < this.runningGenes[8]) {
                this.buildTree(odd, endX, endY, depth - 1, direction + 1)
            }
        }
    } 
}

//This method provides a value based on a direction using the current genes
//How these values are mapped comes from the original algorithm
Biomorph.prototype.dx = function (direction) {

    switch (direction) {
    case 0:
        return -this.runningGenes[1]
        break
    case 1:
        return -this.runningGenes[0]
        break
    case 3:
        return this.runningGenes[0]
        break
    case 4:
        return this.runningGenes[1]
        break
    case 5:
        return this.runningGenes[2]
        break
    case 7:
        return -this.runningGenes[2]
        break
    case 2:
    case 6:
        return 0
        break
    }
}

//This method provides a value based on a direction using the current genes
//How these values are mapped comes from the original algorithm
Biomorph.prototype.dy = function (direction) {

    switch (direction) {
    case 0:
    case 4:
        return this.runningGenes[5]
        break
    case 1:
    case 3:
        return this.runningGenes[4]
        break
    case 2:
        return this.runningGenes[3]
        break
    case 5:
    case 7:
        return this.runningGenes[6]
        break
    case 6:
        return this.runningGenes[7]
        break
    }
}

//For positioning and general manipulation it's good to know how big
//things are and where they are. Particularly because we want the biomorph to be
//centered horizontally and vertically. By nature biomorphs can be uneven and would be
//drawn too high or too low. This allows us to calculate the offset and apply
//the proper transformation to always draw in the center of the canvas
Biomorph.prototype.setBoundingBox = function () {

    var segment
    let box = {
            left: Math.min(this.segments[0].startX, this.segments[0].endX),
            top: Math.min(this.segments[0].startY, this.segments[0].endY),
            right: Math.max(this.segments[0].startX, this.segments[0].endX),
            bottom: Math.max(this.segments[0].startY, this.segments[0].endY),
    }

    for (var i = 1; i < this.segments.length; i++) {
        segment = this.segments[i]

        if (segment.startX < box.left) {
            box.left = segment.startX
        }
        if (segment.startY < box.top) {
            box.top = segment.startY
        }
        if (segment.startX > box.right) {
            box.right = segment.startX
        }
        if (segment.startY > box.bottom) {
            box.bottom = segment.startY
        }

        if (segment.endX < box.left) {
            box.left = segment.endX
        }
        if (segment.endY < box.top) {
            box.top = segment.endY
        }
        if (segment.endX > box.right) {
            box.right = segment.endX
        }
        if (segment.endY > box.bottom) {
            box.bottom = segment.endY
        }
    }

    // This corrects a few pixels difference in the calculations (left and right distance should be equal)
    // Probably to do with vertical symmetry
    if (this.generatedCentre.x - box.left > box.right - this.generatedCentre.x) {
        box.right = this.generatedCentre.x + (this.generatedCentre.x - box.left)
    }
    else {
        box.left = this.generatedCentre.x - (box.right - this.generatedCentre.x)
    }

    var upExtent = this.generatedCentre.y - box.top
    var downExtent = box.bottom - this.generatedCentre.y

    // If it's not single, we have to infer from the current segments
    // (just the first part), how big the box will be when drawn

    if (this.spokesGene !== "Single") {
        if (upExtent > downExtent) {
            box.bottom = this.generatedCentre.y + upExtent
        }
        else {
            box.top = this.generatedCentre.y - downExtent
        }
    }

    if (this.spokesGene === "Radial") {
        var wid = box.right - box.left
        var ht = box.bottom - box.top

        if (wid > ht) {
            box.top = this.generatedCentre.y - wid / 2 - 1
            box.bottom = this.generatedCentre.y + wid / 2 + 1
        }
        else {
            box.left = this.generatedCentre.x - ht / 2 - 1
            box.right = this.generatedCentre.x + ht / 2 + 1
        }
    }

    box.width = box.right - box.left
    box.height = box.bottom - box.top

    this.halfWidth = box.width/2
    this.halfHeight = box.height/2

    this.box = box
}

Biomorph.prototype.verticalOffset = function () {

    var top = this.generatedCentre.y - this.box.top
    var bottom = this.box.bottom - this.generatedCentre.y

    return Math.round((top - bottom)/2)
}

Biomorph.prototype.scaleToBox = function (ratio) {

    if (this.box.width > this.canvasWidth * ratio || this.box.height > this.canvasHeight * ratio) {
        var scale = Math.min((this.canvasWidth * ratio)/this.box.width, (this.canvasHeight * ratio)/this.box.height)
        this.scale(scale)
        this.translate(Math.round(this.origin.x * (1 - scale)), Math.round(this.origin.y * (1 - scale)))

        this.setBoundingBox()
    }
}

//Not ideal, in theory it would be better to keep scale as an attribute
//and compute that on draw. Since performance can be tricky when drawing
//lots of them, pre-calculation is helpful
Biomorph.prototype.scale = function (scale) {

    this.generatedCentre.x = Math.round(this.generatedCentre.x * scale)
    this.generatedCentre.y = Math.round(this.generatedCentre.y * scale)

    var segment

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX = Math.round(segment.startX * scale)
        segment.startY = Math.round(segment.startY * scale)
        segment.endX = Math.round(segment.endX * scale)
        segment.endY = Math.round(segment.endY * scale)
    }
}

//Same as scale. Would be better as an attribute and compute on draw
//Done for performance & clarity reasons
Biomorph.prototype.translate = function (offsetX, offsetY) {

    var segment

    this.generatedCentre.x += offsetX
    this.generatedCentre.y += offsetY

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX += offsetX
        segment.startY += offsetY
        segment.endX += offsetX
        segment.endY += offsetY
    }
}

//Biomorphs can have upwards of 300 segments, which when duplicated a number
//of times for symmetry and spokes can amount to thousands.
//This technique, particularly when dealing with biomorphs with different
//stroke size, seems to yield the best results.
//It's also a lot more understandable than the original approach
Biomorph.prototype.drawWithImages = function () {

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    var segment
    var currentWidth = this.segments[0].size

    // Let's draw the first part
    this.ctx.beginPath()
    this.ctx.lineWidth = currentWidth

    for (var i = 0; i < this.nbSegments; i++) {
        segment = this.segments[i]

        // Minimises the changes in the context
        // Ideally, the segments could even be sorted by size (TODO)
        if (segment.size !== currentWidth) {
            this.ctx.stroke()
            currentWidth = segment.size
            this.ctx.lineWidth = currentWidth
        }

        this.ctx.moveTo(segment.startX, segment.startY)
        this.ctx.lineTo(segment.endX, segment.endY)
    }

    this.ctx.stroke()

    // If it's symmetrical, we have to duplicate the whole part 
    // on itself on the x axis.
    if (this.symmetrical) {
        this.ctx.save()
        this.ctx.scale(-1, 1)
        this.ctx.drawImage(this.ctx.canvas, this.generatedCentre.x * -2, 0)
        this.ctx.restore()
    }

    // If it's double or going to be radial, we take the initial shape (could be symmetrical)
    // and duplicate it by inverting the x and y axis (horizontal symmetry)
    if (this.spokesGene === "Double" || this.spokesGene === "Radial") {
        this.ctx.save()
        this.ctx.scale(-1, -1)
        this.ctx.drawImage(this.ctx.canvas, this.generatedCentre.x * -2, this.generatedCentre.y * -2)
        this.ctx.restore()
    }

    // If it's radial, we take the horizontally symmetrical shape we've just draw
    // and rotate it 90deg on itself to create a radial shape
    if (this.spokesGene === "Radial") {
        this.ctx.save()
        this.ctx.translate(this.generatedCentre.x, this.generatedCentre.y)
        this.ctx.rotate(90 * Math.PI/180)
        this.ctx.drawImage(this.ctx.canvas, -this.generatedCentre.x, -this.generatedCentre.y)
        this.ctx.restore()
    }
}

//This method is closer to the original algorithm in terms of code
//It works out, at draw time, which segments to draw based on the symmetrical
//and spokes gene. This method can be a lot faster on biomorph with
//strokeWidth set to 1. Effectively this does the manipulations of drawWithImages 
//but for each segment, in coordinate space
//The lofi flag draws every other line which
//can help make the shape clearer if it's scaled down for instance.
//TODO: investigate speed/memory tradeoff by pre-computing the lines
Biomorph.prototype.drawWithLines = function (lofi) {

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

    var segment
    var step = lofi && this.symmetrical && this.nbSegments > 30 ? 2 : 1;

    var mid2 = this.generatedCentre.x * 2
    var belly2 = this.generatedCentre.y * 2
    var diffX = this.generatedCentre.y - this.generatedCentre.x
    var diffY = this.generatedCentre.x - this.generatedCentre.y
    var currentWidth = this.segments[0].size

    var startX
    var startY
    var endX
    var endY

    // Starts a new path
    this.ctx.beginPath()
    this.ctx.lineWidth = currentWidth

    for (var i = 0; i < this.nbSegments; i = i+step) {
        segment = this.segments[i]

        // Minimises the changes in the context
        // Ideally, the segments could even be sorted by size (TODO)
        if (segment.size !== currentWidth) {
            this.ctx.stroke()
            currentWidth = segment.size
            this.ctx.lineWidth = currentWidth
        }

        this.ctx.moveTo(segment.startX, segment.startY)
        this.ctx.lineTo(segment.endX, segment.endY)

        // Flip the x coordinate to draw the symmetrical version
        if (this.symmetrical) {
            this.ctx.moveTo(mid2 - segment.startX, segment.startY)
            this.ctx.lineTo(mid2 - segment.endX, segment.endY)
        }

        if (this.spokesGene === "Double" || this.spokesGene === "Radial") {

            // The horizontal symmetry
            this.ctx.moveTo(mid2 - segment.startX, belly2 - segment.startY)
            this.ctx.lineTo(mid2 - segment.endX, belly2 - segment.endY)

            // and the symmetrical counterpart
            if (this.symmetrical) {
                this.ctx.moveTo(segment.startX, belly2 - segment.startY)
                this.ctx.lineTo(segment.endX, belly2 - segment.endY)
            }

            if (this.spokesGene === "Radial") {

                // We're switching the coordinate system to draw the same segment rotated by 90deg
                startX = segment.startY - diffX
                startY = segment.startX - diffY
                endX = segment.endY - diffX
                endY = segment.endX - diffY

                this.ctx.moveTo(mid2 - startX, startY)
                this.ctx.lineTo(mid2 - endX, endY)

                this.ctx.moveTo(startX, belly2 - startY)
                this.ctx.lineTo(endX, belly2 - endY)

                // Let's not forget the symmetrical counterpart...
                if (this.symmetrical) {
                    this.ctx.moveTo(mid2 - startX, belly2 - startY)
                    this.ctx.lineTo(mid2 - endX, belly2 - endY)

                    this.ctx.moveTo(startX, startY)
                    this.ctx.lineTo(endX, endY)
                }
            }
        }
    }

    this.ctx.stroke()
}

Biomorph.nextSwell = function (swellType) {

    if (swellType === "Shrink") {
        return "Same"
    }
    else if (swellType === "Same") {
        return ["Shrink", "Swell"][Math.trunc(Math.random() * 2)]
    }
    else {
        return "Same"
    }
}

Biomorph.prototype.getGenes = function () {
    return {
        'genes': this.genes.slice(), 
        'dGenes': this.dGenes.slice(), 
        'trickleGene': this.trickleGene, 
        'mutProbGene': this.mutProbGene, 
        'mutSizeGene': this.mutSizeGene, 
        'spokesGene': this.spokesGene, 
        'symmetrical': this.symmetrical, 
        'segNoGene': this.segNoGene, 
        'segDistGene': this.segDistGene
    }
}

Biomorph.randomSign = function() {
    if(Math.random() < 0.5) return -1
    else return 1
}

Biomorph.randInt = function() {
    return Math.trunc(Math.random() * 100 + 1)
}


//The breeding process is relatively straighforward compared to the rest
//It looks at each gene and rolls a D100. If it's under the probability, then
//the gene will mutate by a factor of the mutSize
Biomorph.prototype.breed = function (element) {

    // A child starts with a copy of the genes of its parent
    var child = this.getGenes()

    if (Biomorph.mutations.mutationRate && Biomorph.randomInt(0, 100) < child.mutProbGene) {

        child.mutProbGene += Biomorph.randomSign()

        while (child.mutProbGene === 0 && child.mutProbGene <= 100) {
            child.mutProbGene += Biomorph.randomSign()
        }
    }

    for (var i = 0; i < child.genes.length - 1; i++) {

        if (Biomorph.randomInt(0, 100) < child.mutProbGene) {
            child.genes[i] += child.mutSizeGene * Biomorph.randomSign()
        }
    }

    if (Biomorph.randomInt(0, 100) < child.mutProbGene) {
        child.genes[child.genes.length - 1] += Biomorph.randomSign()
    }

    if (child.genes[child.genes.length - 1] <= 0) {
        child.genes[child.genes.length - 1] = 1
    }

    if (Biomorph.mutations.segmentation && Biomorph.randomInt(0, 100) < child.mutProbGene) {
        child.segNoGene += Biomorph.randomSign()
    }

    if (child.segNoGene < 1) {
        child.segNoGene = 1
    }

    if (Biomorph.mutations.gradient && child.segNoGene > 1) {

        // The loop stops short because the 9th dGene uses a different probability
        for (var i = 0; i < child.dGenes.length - 2; i++) {

            if (Biomorph.randomInt(0, 100) < child.mutProbGene/2) {
                child.dGenes[i] = Biomorph.nextSwell(child.dGenes[i])
            }
        }

        // Do the last one using the same probability
        if (Biomorph.randomInt(0, 100) < child.mutProbGene/2) {
            child.dGenes[child.dGenes.length - 1] = Biomorph.nextSwell(child.dGenes[child.dGenes.length - 1])
        }
    }

    // This is the gene that controls the width of the lines, it has a higher probability of changing
    if (Biomorph.mutations.taperingTwigs && Biomorph.mutations.fatten && Biomorph.randomInt(0, 100) < child.mutProbGene) {
        child.dGenes[child.dGenes.length - 2] = Biomorph.nextSwell(child.dGenes[child.dGenes.length - 2])
    }

    if (Biomorph.mutations.segmentation && child.segNoGene > 1 && Biomorph.randomInt(0, 100) < child.mutProbGene) {
        child.segDistGene += Biomorph.randomSign()
    }

    if (Biomorph.mutations.asymmetry && Biomorph.randomInt(0, 100) < child.mutProbGene/2) {
        child.symmetrical = !child.symmetrical
    }

    if (Biomorph.mutations.radialSym && Biomorph.randomInt(0, 100) < child.mutProbGene/2) {

        if (child.spokesGene === "Single") {
            child.spokesGene = "Double"
        }
        else if (child.spokesGene === "Double") {
            if (Math.random() < 0.5) {
                child.spokesGene = "Radial"
            }
            else {
                child.spokesGene = "Single"
            }
        }
        else {
            child.spokesGene = "Double"
        }
    }

    if (Biomorph.mutations.scalingFactor && Biomorph.randInt(0, 100) < child.mutProbGene) {
        child.trickleGene += Biomorph.randomSign()

        if (child.trickleGene < 1) {
            child.trickleGene = 1
        }
    }

    if (Biomorph.mutations.mutationSize && Biomorph.randInt(0, 100) < child.mutProbGene) {
        child.mutSizeGene += Biomorph.randomSign()

        if (child.mutSizeGene < 1) {
            child.mutSizeGene = 1
        }
    }
    var newBiomorph
    if(element) 
        newBiomorph = new Biomorph(element.getContext('2d'), element.width, element.height, child)
    else
        newBiomorph = new Biomorph(this.ctx, this.canvasWidth, this.canvasHeight, child)


    // Attach the child using the same parameters as his parent but with new genes
    this.children.push(newBiomorph)

    return this.children[this.children.length - 1]
}
