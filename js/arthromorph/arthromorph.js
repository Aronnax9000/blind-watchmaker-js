

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
    session.options.sessionIcon = 'img/arthromorphs32x32.png'

}

Arthromorph.prototype.doSaltation = function() {
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


Arthromorph.prototype.tandem = function(targetAtom) {
    //{If Dup and target is second or third part of an Animal, Section, or Segment,}
    //{Then jump down to the next part of the animal}
    let kind = targetAtom.kind
    if(kind == AtomKind.AnimalJoint 
            || kind == AtomKind.SectionJoint 
            || kind == AtomKind.SegmentJoint) {
        targetAtom = targetAtom.nextLikeMe; //{AnimalClaw}
        kind = targetAtom.kind
    }
    if(kind == AtomKind.AnimalClaw || kind == AtomKind.SectionClaw || kind == AtomKind.SegmentClaw) {
        //{SectionTrunk .. where we want to be }
        targetAtom = targetAtom.firstBelowMe;
    }
//  {Insert copy of me after me}
//  {CopyExceptNext makes sure NextLikeMe of copy now points to old NextLikeMe of target}
//  {So brothers are kept, and new subtree is inserted}
    targetAtom.nextLikeMe = Atom.copyExceptNext(targetAtom); 

    if(targetAtom.kind == AtomKind.Joint && targetAtom.firstBelowMe) {
        //{last joint has claw.  When duplicate, get rid of extra claw}
        let extraClaw = targetAtom.firstBelowMe;
        targetAtom.firstBelowMe = null;
        extraClaw.kill();
    }
    //{A little wasteful to count entire animal again}
    this.trunk.angle = Atom.countAtoms(this.trunk); 
}

//{I still vote for AnimalJoint . Width = 20 and AnimalJoint . angle = 0.25 
//in the default animal .}

Arthromorph.prototype.minimalAnimal = function() {
    let aa = new Atom(AtomKind.Claw);

    let bb = new Atom(AtomKind.Joint);
    bb.width = 5;
    bb.angle = 2;
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.SegmentClaw)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.SegmentJoint)
    bb.nextLikeMe = aa;
    bb.angle = 2;

    aa = new Atom(AtomKind.SegmentTrunk)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.SectionClaw)
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.SectionJoint)
    aa.nextLikeMe = bb;

    bb = new Atom(AtomKind.SectionTrunk)
    bb.angle = 0.5; //{Segment overlap, by convention}
    bb.firstBelowMe = aa;

    aa = new Atom(AtomKind.AnimalClaw)
    aa.firstBelowMe = bb;

    bb = new Atom(AtomKind.AnimalJoint)
    bb.nextLikeMe = aa;
    bb.width = 5; //{make it visible}
    bb.angle = 5;

    aa = new Atom(AtomKind.AnimalTrunk)
    aa.firstBelowMe = bb;
    aa.nextLikeMe = -2; // {Gradient, by convention}
    aa.angle = Atom.countAtoms(aa);
    aa.height = 20;
    aa.width = 20;

    this.trunk = aa
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
    if(counter > limit) {
        console.error('Timed out, perhaps attempting impossible duplication or deletion');
        return null
    } else {
//        console.log(child.trunk)
        return child
    }
}

Arthromorph.prototype.doPerson = function(type) {
    this.minimalAnimal()
}
Arthromorph.prototype.develop = function() {
    this.drawInBox()
}

//{Mutate first picks an atom randomly from the Animal.}
//{       From num of atoms, picks one and step down to it}
//{               Flip a coin for what to do: change Height, Width, Angle, Dup part, Delete part, Flip angle}
//{                       Test if legal to do it and do it (else return false)}
//{                               Delete does not delete the first-and-only of its kind}
//{Forbid: Angle mod if none, delete last Section, or Seg }
//{               Delete Animal, Dup Animal,   Delete Claw, Dup Claw}
//{Range limits on some modifications??  Only angles can be negative.}
Arthromorph.prototype.mutate = function() {
    if(this.trunk.kind != AtomKind.AnimalTrunk) {
        console.error('Not an animal');
    }
    this.secondSegmentAtomNo = 0;
    let  atomNumber = Atom.countAtoms(this.trunk);
    let lastSegment = this.segmentCounter;
    let size = Math.trunc(this.trunk.angle); //{As a convention, we keep the number of Atoms in this animal in AnimalTrunk's Angle field}
    let pick = Arthromorph.randInt(size); //{a number from 1 to size.  Index of the atom we will modify}
    this.count = 0;
    
    let targetAtom = this.findNth(this.trunk, pick); // {find the Nth atom}
    if(targetAtom == null) {
        //{Aren't pick atoms in this Animal}
        console.error('Atom count is wrong.  Fatal.  Quitting');
        return
    }
//  {Decide what to do}
    let change = Arthromorph.randInt(7); //          {seven basic operations}
//  { 1 twiddle Height, 2 twiddle Width, 3 twiddle Angle, 4 Duplicate entire subtree, 5 Delete subtree}
//  { 6 reverse an angle , 7 reverse sign of Gradient}
    let kind = targetAtom.kind
    if(change == 7 && targetAtom.kind == AtomKind.AnimalTrunk) {
        targetAtom.nextLikeMe *= -1;
    }
    if(change == 4) {
        //  {If Dup and target is second or third part of an Animal, Section, or Segment,}
        //  {Then jump down to the next part of the animal}
        if(kind == AtomKind.AnimalJoint || kind == AtomKind.SectionJoint || kind == AtomKind.SegmentJoint) {
            targetAtom = targetAtom.nextLikeMe; // {AnimalClaw}
            kind = targetAtom.kind
        }
        if(kind == AtomKind.AnimalClaw || kind == AtomKind.SectionClaw || kind == AtomKind.SegmentClaw) {
            targetAtom = targetAtom.firstBelowMe;
            kind = targetAtom.kind
        }
        // {SectionTrunk .. where we want to be }
    }
    let mutOK = false;
    let options = this.session.options
    switch(kind) {
    case AtomKind.AnimalTrunk: 
        if(options.animalTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.AnimalJoint: 
        if(options.animalLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.AnimalClaw: 
        if(options.animalClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionTrunk: 
        if(options.sectionTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionJoint: 
        if(options.sectionLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SectionClaw: 
        if(options.sectionClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentTrunk: 
        if(options.segmentTrunkMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentJoint: 
        if(options.segmentLegsMut) {
            mutOK = true;
        }
        break
    case AtomKind.SegmentClaw: 
        if(options.segmentClawsMut) {
            mutOK = true;
        }
        break
    case AtomKind.Joint: 
        if(options.legsMut) {
            mutOK = true;
        }
        break
    case AtomKind.Claw: 
        if(options.clawsMut) {
            mutOK = true;
        }
        break
    default:
        mutOK = false;
    }

    switch(options.focusOfAttention) {
    case Concentration.FirstSegmentOnly: 
        if(this.secondSegmentAtomNo > 0) {
            if(this.count < this.secondSegmentAtomNo) {
                let couldBe = (kind == AtomKind.SegmentTrunk || kind == AtomKind.SegmentJoint || kind == AtomKind.SegmentClaw || kind == AtomKind.Joint || kind == AtomKind.Claw);
                if(! couldBe) {
                    mutOK = false;
                }
            } else {
                mutOK = false;
            }
            break
        }
    case Concentration.LastSegmentOnly: 
        if(this.segmentCounter != lastSegment) {
            MutOk = false;
        }
        break
    case Concentration.AnySegment: 
        //{No need for action.  mutOK retains its present value}
    }

    let ok = false;
    if(mutOK) {
        ok = true;
        if(change == 4 || change == 5 && kind == AtomKind.Claw) {
            ok = false; //{Forbid delete or dup of claw}
        }
        if(change == 3 || change == 6 && kind == AtomKind.AnimalTrunk || kind == AtomKind.SegmentTrunk) {
            ok = false; //{These atoms have no Angle part. SectionTrunk does, because 'angle' is overlap, by convention}
        }  
        if(ok) {
            if(change == 4) {
                if(options.duplicationMut) {
                    if(kind == AtomKind.AnimalTrunk) {
                        targetAtom.nextLikeMe++
                    } else { //{Special case, means GradientFactor}
                        targetAtom.nextLikeMe = Atom.copyExceptNext(target); // {Insert copy of me after me}
//                      {CopyExceptNext makes sure NextLikeMe of copy now points to old NextLikeMe of target}
//                      {So brothers are kept, and new subtree is inserted}
                    }
                    if(kind == AtomKind.Joint && targetAtom.firstBelowMe) { //{last joint has claw.  When duplicate, get rid of extra claw}
                        extraClaw = targetAtom.firstBelowMe;
                        targetAtom.firstBelowMe = null;
                        extraClaw.kill();
                    }
                    //{A little wasteful to count entire animal again}
                    this.trunk.angle = Atom.countAtoms(this.trunk);           
                } else {
                    ok = false;
                }
            }
            if(change < 4) {
                let factor = this.getFactor(); //{See table above}
                switch(change) {
                case 1: 
                    if(options.heightMut) {
                        targetAtom.height *= factor
                    } else {
                        ok = false;
                    }
                    break
                case 2: 
                    if(options.widthMut) {
                        targetAtom.width *= factor
                    } else {
                        ok = false;
                    }
                    break
                case 3: 
                    if(options.angleMut) {
                        targetAtom.angle *= factor;
                        if(kind == AtomKind.SectionTrunk) {
                            targetAtom.angle = Math.abs(targetAtom.angle);// {forbid backward overlaps}
                            if(targetAtom.angle > 1) {
                                targetAtom.angle = 1;// {Otherwise disembodied segments}
                            }
                        }
                    } else {
                        ok = false;
                    }
                }
            }
            if(change == 5) {
                if(options.deletionMut) {
                    if(kind == AtomKind.AnimalTrunk) {
                        targetAtom.nextLikeMe--;// {special case. by convention means GradientFactor}
//                      {Delete.  Complex because we need to talk to the atom above where we delete}
                        ok = Atom.doDelete(targetAtom); // {there is a problem here}
                        if(ok) {
//                          {A little wasteful to count entire animal again}
                            this.trunk.angle = Atom.countAtoms(this.trunk)
                        }
                    } 
                } else {
                    ok = false;
                }
            }
            if(change == 6 && kind != AtomKind.SectionTrunk) {
                if(options.angleMut) {
                    targetAtom.angle *= -1.0; //{reverse an angle}
                } else {
                    ok = false;
                }
            }
        }
    }
    return ok && mutOK;
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

