

/*
 * Constructor for the Arthromorph biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort) { drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property) {
 * 'species', a string containing the name) { the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */


function Arthromorph(session, drawer) {
    this.session = session
    this.drawer = drawer
    this.trunk = null
    this.segmentCounter = 0
    this.secondSegmentAtomNo = 0
    this.count = 0
    this.overlap = 0
}

Arthromorph.makeAllBodyMutations = function(session, state) {
    session.options.trunkMut = state;
    session.options.legsMut = state;
    session.options.clawsMut = state;
    session.options.animalTrunkMut = state;
    session.options.animalLegsMut = state;
    session.options.animalClawsMut = state;
    session.options.sectionTrunkMut = state;
    session.options.sectionLegsMut = state;
    session.options.sectionClawsMut = state;
    session.options.segmentTrunkMut = state;
    session.options.segmentLegsMut = state;
    session.options.segmentClawsMut = state;
}

Arthromorph.makeAllAtomMutations = function(session, state) {
    session.options.widthMut = state;
    session.options.heightMut = state;
    session.options.angleMut = state;
    session.options.duplicationMut = state;
    session.options.deletionMut = state;
}
Arthromorph.initializeSession = function(session) {
    // where in a cumParams the Width of an AnimalTrunk gets multiplied in
    let paramOffset = new Array(12)

    paramOffset[AtomKind.AnimalTrunk] = 0;          
    paramOffset[AtomKind.AnimalJoint] = 3;
    paramOffset[AtomKind.AnimalClaw] = 6;
    paramOffset[AtomKind.SectionTrunk] = 0;
    paramOffset[AtomKind.SectionJoint] = 3;
    paramOffset[AtomKind.SectionClaw] = 6;
    paramOffset[AtomKind.SegmentTrunk] = 0;
    paramOffset[AtomKind.SegmentJoint] = 3;
    paramOffset[AtomKind.SegmentClaw] = 6;
    paramOffset[AtomKind.Joint] = 3;
    paramOffset[AtomKind.Claw] = 6;

    session.options.paramOffset = paramOffset

    Arthromorph.makeAllBodyMutations(session, true)
    Arthromorph.makeAllAtomMutations(session, true)
    session.options.mutationPressure = Pressure.Zero;
    session.options.focusOfAttention = Concentration.AnySegment;
    session.options.sideways = false;
    session.options.wantColor = true
    session.options.sessionIcon = 'img/arthromorphs32x32.png';
    session.options.basicTypes = ["Minimal", "Complex"]
    session.options.defaultBasicType = "Minimal"


}

Arthromorph.prototype.doSaltation = function() {
}

Arthromorph.prototype.copyBiomorph = function() {
}

//{travel over the Animal, counting Atoms and return the Nth}
Arthromorph.prototype.findNth = function(which, pick) {
    this.count++;
    if(which.kind == AtomKind.SegmentTrunk) {
        this.segmentCounter++
    }
    if(this.segmentCounter == 2) {
        this.secondSegmentAtomNo = this.count
    }

    var findNth

    if(this.count >= pick) {
        findNth = which //{We are done!}
    } else {
        if(which.firstBelowMe) {
            findNth = this.findNth(which.firstBelowMe, pick);
        }
        if(this.count < pick) {
            if(which.nextLikeMe) {
                findNth = this.findNth(which.nextLikeMe, pick);
            }
        }
        if(this.count < pick) {
            findNth = null //{not there yet}
        }
    }

    return findNth
}

Arthromorph.prototype.countSeg = function(which) {
    if(which.kind == AtomKind.SegmentTrunk) {
        this.segmentCounter++
        which.angle = this.segmentCounter
    }
    if(which.firstBelowMe) {
        this.countSeg(which.firstBelowMe)
    }
    if(which.nextLikeMe && which.kind != AtomKind.AnimalTrunk) {
        this.countSeg(nextLikeMe);
    }
}




Arthromorph.randInt = function(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}


//{How much to grow or shrink a Length or Height or Angle}
Arthromorph.prototype.getFactor = function() {
    var choose
    switch(this.session.options.mutationPressure) {
    case Pressure.Positive: 
        choose = 2 + Arthromorph.randInt(2)
        break
    case Pressure.Zero: 
        choose = Arthromorph.randInt(4)
        break
    case Pressure.Negative: 
        choose = Arthromorph.randInt(2)
        break
    }
    //{Richard, you can play with these factors}
    switch(choose) {
    case 1:                      
        return 0.50;
    case 2: 
        return 0.9;
    case 3: 
        return 1.1;
    case 4: 
        return 1.5;
    }
}

//creates and returns a new, mutated copy) { the biomorph.
Arthromorph.prototype.reproduce = function(element) {
    

    let child = new Arthromorph(this.session, element);

    //{Reproduce copies an animal and calls Mutate}
    //{Please kill the old animal before calling this.  We may need to use his atoms.}
    let counter = 0;
    child.trunk = Atom.copy(this.trunk);
    let limit = 1000 // 1000
    do {
        counter++
        done = child.mutate() // {If it fails, just try again until we succeed at changing something}
    } while(counter < limit && ! done);
//    console.log('Child')
//    child.trunk.printMiddle()
    if(counter > limit) {
        console.error('Timed out, perhaps attempting impossible duplication or deletion');
        return null
    } else {
//      console.log(child.trunk)
        return child
    }
}


Arthromorph.prototype.develop = function() {
    this.drawInBox()
}


$.widget('dawk.arthromorph_geneboxes', $.dawk.geneboxes, {
    updateFromCanvas: function() {

    }
})

//Register the Colour biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Arthromorph", 
        (function(session, drawer) { return new Arthromorph(session, drawer)}),
        (function(session) { Arthromorph.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.arthromorph_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).arthromorph_geneboxes('updateFromCanvas', canvas)}));

