/*
 * AtomKind (Ted.pas, line 11)
 * type
 *      AtomKind = (Free, AnimalTrunk, AnimalJoint, AnimalClaw, SectionTrunk, SectionJoint, SectionClaw, SegmentTrunk, SegmentJoint, SegmentClaw, Joint, Claw);
 */
var AtomKind = {
        AnimalTrunk: 0, 
        AnimalJoint: 1, 
        AnimalClaw: 2, 
        SectionTrunk: 3, 
        SectionJoint: 4, 
        SectionClaw: 5, 
        SegmentTrunk: 6, 
        SegmentJoint: 7, 
        SegmentClaw: 8, 
        Joint: 9, 
        Claw: 10,
        Free: 1, 
        properties: {
            0: {name: "AnimalTrunk"},
            1: {name: "AnimalJoint"},
            2: {name: "AnimalClaw"},
            3: {name: "SectionTrunk"},
            4: {name: "SectionJoint"},
            5: {name: "SectionClaw"},
            6: {name: "SegmentTrunk"},
            7: {name: "SegmentJoint"},
            8: {name: "SegmentClaw"},
            9: {name: "Joint"},
            10: {name: "Claw"},
            11: {name: "Free"},
        }
}

var Pressure = {
        Positive: 1, 
        Zero: 2,
        Negative: 3,
        properties: {
            1: {name: 'Positive'},
            2: {name: 'Zero'},
            3: {name: 'Negative'}
        }
}
var Concentration = {
        FirstSegmentOnly: 1,
        LastSegmentOnly: 2,
        AnySegment: 3,
        properties: {
            1: {name: 'FirstSegmentOnly'},
            2:  {name: 'LastSegmentOnly'},
            3:  {name: 'AnySegment'}
        }
}


/*
 * Atom = record
 *     Kind: AtomKind;
 *     Height: real;          {also used for Thickness of a Joint}
 *     Width: real;           {also used for Length of a Joint}
 *     Angle: real;           {also used in an AnimalTrunk to store the number of atoms in the animal}
 *                            {also used in SectionTrunk to store the Overlap of segments}
 *                            {also used in SegmentTrunk to store the rank number of the segment}
 *     NextLikeMe: Integer;   {where to look in the BoneYard for the next atom. 0 means end of chain}
 *                            {Also used in AnimalTrunk to store Gradient gene, slightly more or less than 100.  Treat as Percentage}
 *     FirstBelowMe: Integer; {where to look in the BoneYard for the next atom. 0 means end of chain}
 * end;
 */



function Atom(kind) {
    this.kind = kind
    this.height = 1.0
    this.width = 1.0
    this.angle = 1.0
    this.nextLikeMe = null
    this.firstBelowMe = null
}

//{Destroy this animal.   Mark all of its Atoms as Free again.}
//{Recursively step through the animal}
//Kinda pointless in the JavaScript version
Atom.prototype.kill = function() {
    if(this.firstBelowMe) {
        this.firstBelowMe.kill();
    }
    if(this.nextLikeMe  && this.kind != AtomKind.AnimalTrunk) {
        this.nextLikeMe.kill();
    }
    this.kind = AtomKind.Free //{Free this Atom}
}

//Duplicate this entire animal.   
Atom.copy = function(which) {
    let newPlace = new Atom(which.kind) // {Grab a new atom}
    newPlace.height = which.height
    newPlace.width = which.width
    newPlace.angle = which.angle
    if(which.firstBelowMe) {
        newPlace.firstBelowMe = Atom.copy(which.firstBelowMe);
    }
    if(which.nextLikeMe) {
        if(which.kind == AtomKind.AnimalTrunk) {
            // Pascal original got this for free with an assignment
            newPlace.nextLikeMe = which.nextLikeMe
        } else {
            newPlace.nextLikeMe = Atom.copy(which.nextLikeMe)
        }
    }
    return newPlace; // {Return the new one}
}



//{Duplicate Subtree starting at the atom which, 
//but don't copy NextLikeMe.  Leave old value there}
//{Copy the things I own, but not the things after me}
Atom.copyExceptNext = function(which) {
    let newPlace = new Atom(which.kind) // {Grab a new atom}
    newPlace.height = which.height
    newPlace.width = which.width
    newPlace.angle = which.angle
    if(which.firstBelowMe) {
        // {Normal copy from here on}
        newPlace.firstBelowMe = Atom.copy(which.firstBelowMe); 
    }
    return newPlace // {Return the new one}
}

Atom.countAtoms = function(which) {
    // {travel over the Animal, counting Atoms}
    let count = 1 // {count me}
    if(which.firstBelowMe != null) {
        count += Atom.countAtoms(which.firstBelowMe)
    }

    if (which.nextLikeMe  != null && which.kind != AtomKind.AnimalTrunk) {
        count += Atom.countAtoms(which.nextLikeMe)
    }
    return count
}

//{Delete a section of the animal somewhere near the atom which.}
//{Caller must correct the AtomCount of the whole animal.  Return false if failed}
//{Must have a hold on the atom above what we delete.  If chosen atom is:  }
//{AnimalTrunk   delete first Sec}
//{       AnimalJoint   delete first Sec}
//{       AnimalClaw      delete first Sec}
//{               SectionTrunk    delete next Sec}
//{                       SectionJoint            delete first Seg}
//{                       SectionClaw             delete first Seg}
//{                               SegmentTrunk            delete next Seg}
//{                                       SegmentJoint            delete first Joint}
//{                                       SegmentClaw             delete first Joint}
//{                                               Joint                           delete next Joint}
//{                                               Joint                           delete next Joint}
//{                                               Joint                           delete Claw}
//{                                                       Claw                            fail}
//{Also fail if trying to delete last example of a kind}

Atom.doDelete = function(which) {
//  parent, chain: integer;
//  begin

    let parent = which;
    let doDelete = false; //{unless we actually succeed in killing one}
    if(parent.kind == AtomKind.AnimalTrunk) {
        parent = parent.firstBelowMe; // {AnimalJoint}
    }
    let kind = parent.kind
    if(kind == AtomKind.AnimalJoint 
            || kind == AtomKind.SectionJoint 
            || kind == AtomKind.SegmentJoint) {
        parent = parent.firstBelowMe; // {AnimalClaw is parent}
    }
    if(parent) {
        kind = parent.kind
        if(kind == AtomKind.SectionTrunk 
                || kind == AtomKind.SegmentTrunk 
                || kind == AtomKind.Joint) {
            let nextLikeMe = parent.nextLikeMe
            //{Delete nextLikeMe of parent}
            if(nextLikeMe) {
                chain = nextLikeMe.nextLikeMe; //{May be 0}
                nextLikeMe.nextLikeMe = null; //{So Kill won't get the rest of chain}
                nextLikeMe.kill(); //{won't be killing last one, since parent qualifies as one}
                nextLikeMe = chain;
                doDelete = true;
            }
        } else { 
            let firstBelowMe = parent.firstBelowMe
            //{Try to delete FirstBelow}
            if(firstBelowMe) { //{we know FirstBelow exists}
                chain = firstBelowMe.nextLikeMe; //{Atom after one we will delete}
                firstBelowMe.nextLikeMe = null;
                if(chain) { // {FirstBelow is not only one }
                    firstBelowMe.kill();
                    firstBelowMe = chain;
                    doDelete = true;
                }
            }
        }
    }
    return doDelete
}


Atom.prototype.printAt = function(segmentCounter) {
    var str = this.height.toFixed(2) + '     ' + this.width.toFixed(2) + '     ' + this.angle.toFixed(2) 
    switch(this.kind) {
    case AtomKind.AnimalTrunk: 
        str += 'AnimalTrunk gradientFactor ' + this.nextLikeMe;
        break
    case AtomKind.AnimalJoint: 
        str += '    AnimalJoint';
        break
    case AtomKind.AnimalClaw: 
        str += '    AnimalClaw';
        break
    case AtomKind.SectionTrunk: 
        str += '        SectionTrunk';
        break
    case AtomKind.SectionJoint: 
        str += '            SectionJoint';
        break
    case AtomKind.SectionClaw: 
        str += '            SectionClaw';
        break
    case AtomKind.SegmentTrunk: 
        segmentCounter++;
        str += '                SegmentTrunk ' + segmentCounter;
        break
    case AtomKind.SegmentJoint: 
        str += '                    SegmentJoint';
        break
    case AtomKind.SegmentClaw: 
        str += '                    SegmentClaw';
        break
    case AtomKind.Joint: 
        str += '                        Joint';
        break
    case AtomKind.Claw: 
        str += '                        Claw';
        break
    }
    console.log(str)
    return segmentCounter
}

//{Print this animal}

Atom.prototype.print = function(segmentCounter) {
//  {Recursively step through the animal}
    if(this.kind != AtomKind.Free) {
        segmentCounter = this.printAt(segmentCounter)
    }
    if(this.firstBelowMe) {
        segmentCounter = this.firstBelowMe.print(segmentCounter)
    }
    if(this.nextLikeMe && this.kind != AtomKind.AnimalTrunk) {
        segmentCounter = this.nextLikeMe.print(segmentCounter)
    }
    return segmentCounter
}

Atom.prototype.printMiddle = function() {
    console.log('Height    Width     Angle')
    this.print(0)
}


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
    aa.height = 20;
    aa.width = 20;
    aa.angle = Atom.countAtoms(aa);
    this.trunk = aa
}

Arthromorph.prototype.complexAnimal = function() {
//  Height Width Angle
//  01.00 01.00 01.00                       Claw         
    let aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    let bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
    //  01.00 01.00 02.00                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 2
    aa.firstBelowMe = bb
    //  01.00 01.00 03.00                 SegmentTrunk 3
    let st3 = new Atom(AtomKind.SegmentTrunk)
    st3.angle = 3
    st3.firstBelowMe = aa
//  01.00 01.00 01.00                       Claw
    aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
//  01.00 01.00 02.00                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 2
    aa.firstBelowMe = bb
//  01.00 01.00 02.00                 SegmentTrunk 2
    let st2 = new Atom(AtomKind.SegmentTrunk)
    st2.angle = 2
    st2.firstBelowMe = aa
    st2.nextLikeMe = st3
//  01.00 01.00 01.00                       Claw
    aa = new Atom(AtomKind.Claw);
//  01.00 05.00 -2.00                       Joint
    bb = new Atom(AtomKind.Joint);
    bb.width = 5
    bb.angle = -2
    bb.firstBelowMe = aa
//  01.00 05.00 02.00                       Joint
    aa = new Atom(AtomKind.Joint);
    aa.width = 5
    aa.angle = 2
    aa.nextLikeMe = bb
//  01.00 01.00 01.00                     SegmentClaw
    bb = new Atom(AtomKind.SegmentClaw)
    bb.firstBelowMe = aa
//  01.00 01.00 01.79                     SegmentJoint
    aa = new Atom(AtomKind.SegmentJoint)
    aa.angle = 1.79
    aa.firstBelowMe = bb
//  01.00 01.00 01.00                 SegmentTrunk 1
    let st1 = new Atom(AtomKind.SegmentTrunk)
    st1.firstBelowMe = aa
    st1.nextLikeMe = st2

//  01.00 01.00 01.00             SectionClaw
    aa = new Atom(AtomKind.SectionClaw)
    aa.firstBelowMe = st1

    //  01.00 01.00 01.00             SectionJoint
    bb = new Atom(AtomKind.SectionJoint)
    bb.firstBelowMe = st1
//  01.00 01.00 00.50         SectionTrunk
    aa = new Atom(AtomKind.SectionTrunk)
    aa.angle = 0.5
    aa.firstBelowMe = bb
//  01.00 01.00 01.00     AnimalClaw
    bb = new Atom(AtomKind.AnimalClaw)
    bb.firstBelowMe = aa
    //  01.00 05.00 05.00     AnimalJoint
    aa = new Atom(AtomKind.AnimalJoint)
    aa.width = 5
    aa.angle = 5
    aa.firstBelowMe = bb
    //  20.00 20.00 24.00 AnimalTrunk
    bb = new Atom(AtomKind.AnimalTrunk)
    bb.height = 20
    bb.width = 20
    bb.firstBelowMe = aa
    bb.angle = Atom.countAtoms(bb);
    this.trunk = bb
}

Arthromorph.prototype.doPerson = function(type) {
    switch(type) {
    case "Complex":
        this.complexAnimal()
        break
    case "Minimal":
    default:     
        this.minimalAnimal()
    }
    this.trunk.printMiddle()

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
    let atomNumber = Atom.countAtoms(this.trunk);
    let lastSegment = this.segmentCounter;
    let size = Math.trunc(this.trunk.angle); //{As a convention, we keep the number of Atoms in this animal in AnimalTrunk's Angle field}
    
    let pick = Arthromorph.randInt(size); //{a number from 1 to size.  Index of the atom we will modify}
    
    this.count = 0;

    
    let targetAtom = this.findNth(this.trunk, pick); // {find the Nth atom}
    if(targetAtom ==  null) console.log('null pick ' + pick + ' of ' + this.trunk.angle + ' size ' + size)
    var kind = targetAtom.kind
//    console.log('Picked ' + AtomKind.properties[kind].name)
    if(targetAtom == null) {
        //{Aren't pick atoms in this Animal}
        console.error('Atom count is wrong.  Fatal.  Quitting');
        return
    }
//  {Decide what to do}
    let change = Arthromorph.randInt(7); //          {seven basic operations}
//  { 1 twiddle Height, 2 twiddle Width, 3 twiddle Angle, 4 Duplicate entire subtree, 5 Delete subtree}
//  { 6 reverse an angle , 7 reverse sign of Gradient}
    if(change == 7 && targetAtom.kind == AtomKind.AnimalTrunk) {
        targetAtom.nextLikeMe *= -1;
    }
    if(change == 4) {
        //  {If Dup and target is second or third part of an Animal, Section, or Segment,}
        //  {Then jump down to the next part of the animal}
        if(kind == AtomKind.AnimalJoint || kind == AtomKind.SectionJoint || kind == AtomKind.SegmentJoint) {
            if(targetAtom.nextLikeMe == null) {
                console.log('mutation expected targetAtom to have a nextLikeMe, and it does not.')
                targetAtom.printMiddle()
                
            }
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

    // For debugging, make duplications happen more than twice as often as other mutations
//    if(Math.random() < 0.5 )
//        change == 4
    
    let ok = false;
    if(mutOK) { // && kind == AtomKind.Joint
            
        ok = true;
        if((change == 4 || change == 5) 
                && kind == AtomKind.Claw) {
            ok = false; //{Forbid delete or dup of claw}
        }
        if((change == 3 || change == 6) 
                && (kind == AtomKind.AnimalTrunk || kind == AtomKind.SegmentTrunk)) {
            //{These atoms have no Angle part. SectionTrunk does, because 'angle' 
            // is overlap, by convention}
            ok = false; 
        }  
        
        if(ok) {
            if(change == 4) {
                if(options.duplicationMut) {
                    console.log('duplicationMut')
//                    targetAtom.printMiddle()
                    
                    // There is only one AnimalTrunk per animal,
                    // so it doesn't need to use nextLikeMe to hold a reference
                    // to its next sibling. In AnimalTrunk, nextLikeMe is
                    // used to hold gradient factor, instead of to refer to another Atom.
                    //{ Special case, means GradientFactor}
                    if(kind == AtomKind.AnimalTrunk) {
                        targetAtom.nextLikeMe++ // Increment gradient factor, see above
                    } else { 
                        targetAtom.nextLikeMe = Atom.copyExceptNext(targetAtom); // {Insert copy of me after me}
//                      {CopyExceptNext makes sure NextLikeMe of copy now points to old NextLikeMe of target}
//                      {So brothers are kept, and new subtree is inserted}
//                        console.log('copy except next returned: ')
//                        targetAtom.nextLikeMe.printMiddle()
                    }
                    if(kind == AtomKind.Joint && targetAtom.firstBelowMe) { //{last joint has claw.  When duplicate, get rid of extra claw}
//                        alert('duplicating joint')
//                        console.log('duplicated joint deleting claw')
                        extraClaw = targetAtom.firstBelowMe;
                        targetAtom.firstBelowMe = null;
                        extraClaw.kill();
                    }
                    //{A little wasteful to count entire animal again}
                    this.trunk.angle = Atom.countAtoms(this.trunk);  
//                    this.trunk.printMiddle()
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
function Poles() {
    this.northPole = 0
    this.southPole = 0
    this.eastPole = 0
    this.westPole = 0
}

Arthromorph.prototype.dLine = function(drawingContext, x, y, endX, endY, thick, poles) {
    if(endY < poles.northPole) {
        poles.northPole = endY;
    }
    if(endY > poles.southPole) {
        poles.southPole = endY;
    }
    if(endX < poles.westPole) {
        poles.westPole = endX;
    }
    if(endX > poles.eastPole) {
        poles.eastPole = endX;
    }
    if(drawingContext) {
        drawingContext.penSize(thick);
        let halfThick = Math.trunc(thick / 2)
        drawingContext.moveTo(x - halfThick, y - halfThick);
        drawingContext.lineTo(endX - halfThick, endY - halfThick);
        drawingContext.penSize(1);
    }
}

Arthromorph.prototype.drawLine = function(drawingContext, x, y, endX, endY, thick, poles) {
    //console.log('drawLine' + x + ' ' + y + ' ' + endX + ' ' + endY)
    if(this.session.sideways) {
        this.dLine(drawingContext, y, x, endY, endX, thick, poles)
    } else {
        this.dLine(drawingContext, x, y, endX, endY, thick, poles);
    }
}

Arthromorph.prototype.dOval = function(drawingContext, x, y, width, height, poles) {

    let r = new Rect(x, y, x + width, y + height)
    if(r.top < poles.northPole) {
        poles.northPole = r.top;
    }
    if(r.bottom > poles.southPole) {
        poles.southPole = r.bottom;
    }
    if(r.left < poles.westPole) {
        poles.westPole = r.left;
    }
    if(r.right > poles.eastPole) {
        poles.eastPole = r.right;
    }
    if(drawingContext) {
        if(this.session.options.wantColor) {
            drawingContext.backColor("Green");
            drawingContext.eraseOval(r)
        } else {
            drawingContext.fillOval(r, "LightGray");
        }
        drawingContext.penSize(2);
        drawingContext.frameOval(r);
        drawingContext.penSize(1);
        drawingContext.backColor("White");
    }
}

Arthromorph.prototype.drawOval = function(drawingContext, x, y, width, height, poles) {
    if(this.session.options.sideways) {
        this.dOval(drawingContext, y, x, height, width, poles)
    } else {
        this.dOval(drawingContext, x, y, width, height, poles);
    }
}
Arthromorph.prototype.drawSeg = function(drawingContext, x, y, width, height, poles) {
//  {We must adjust the position before drawing the oval}
//  {convert from center of oval to left corner}
    let halfW = Math.round(width / 2);

    this.drawOval(drawingContext, x - halfW, y, Math.round(width), Math.round(height), poles);
    if(drawingContext) {
        drawingContext.foreColor("Black");
    }
}

//{Draw a claw.  Param info is already folded in}
Arthromorph.prototype.drawClaw = function(drawingContext, params, x, y, xCenter, poles) {                

    if(drawingContext) {
        drawingContext.foreColor("Red");
    }
    let oldX = x;
    let oldY = y;
    let ang = params[8] / 2.0;
//  {half claw opening, in radians}
    x = Math.round(x + params[7] * Math.sin(ang)); //{line end point   width*sine(angle)}
    y = Math.round(y + params[7] * Math.cos(ang)); //{line end point}
    thick = 1 + Math.trunc(params[6]); //{1 is minimum thickness}
    this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side, top of claw}

    let leftX = xCenter - (x - xCenter); //{do the left side, top of claw}
    let leftOldX = xCenter - (oldX - xCenter);
    this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles);
//  {Bottom of the claw}
    y = Math.round(y - 2.0 * params[7] * Math.cos(ang));
    this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side}
    this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles); //{left side}
    if(drawingContext) {
        drawingContext.foreColor("Black");
    }
}

//{Starting at the atom 'which', multiply its numbers into the array of params.}
//{At the bottom, draw the part starting at x,y}
//{params accumulates the final Joint width, Claw angle, etc.}
//{params: 1 Seg height, 2 Seg width, 3 (not used), 4 Joint thickness, 5 Joint length, 6 Joint angle,}
//{       7 Claw thickness, 8 Claw length, 9 Claw angle between pincers}
//{x,y are current local point, xCenter is the centerline of the animal (left and right Joints need this)}
//ySeg is returned (static variable in original Pascal)
Arthromorph.prototype.draw = function(drawingContext, which, params, x, y, xCenter, ySeg, poles) {
    myPars = params.slice();
//  {local copy so next segment builds on section above, not this segment}
    let gradientFactor = 0
    let kind = which.kind
    if(kind == AtomKind.AnimalTrunk) {
        gradientFactor = which.nextLikeMe;
        if(gradientFactor > 1000) {
            alert('gradientFactor > 1000')
        }
    }
//  console.log(params)
    paramOffset = this.session.options.paramOffset
    offset = paramOffset[kind];//{where in params to begin, see InitBoneYard}
//  console.log("height " + which.height + "width " + which.width+ "angle " + which.angle + " offset " + offset);

    params[offset] = params[offset] * which.height; //{fold in this atom's params}
    params[offset + 1] = params[offset + 1] * which.width;
    params[offset + 2] = params[offset + 2] * which.angle; //{Must be a real number, even if not used in this Atom}

    if(kind == AtomKind.SectionTrunk) {
        this.overlap = which.angle;//{by convention}
    } else if(kind == AtomKind.SegmentTrunk) {
        if(gradientFactor > 1000) {
            alert('gradientFactor > 1000')
        }
        params[1] += gradientFactor * which.angle;
        params[0] += gradientFactor * which.angle;
        this.drawSeg(drawingContext, x, ySeg, params[1], params[0], poles);
//      {Draw the oval in the right place. 2 = Width , 1 = Height }
        oldY = ySeg; // {Save for next segment} 
        x = x + Math.round(params[1] / 2.0);//{joint starts at the side of the segment}
        y = ySeg + Math.round(params[0] / 2.0);
//      {joint starts half way down the segment }
    } else if(kind == AtomKind.Joint) {
//      console.log(params)
//      {both next joint (NextLikeMe) and claw (FirstBelowMe) want x,y at end of this joint}
        let oldX = x;
        let oldY = y;
        let ang = params[5];
        let jointscale = 0.5
        let xDisp = Math.round(jointscale * params[4] * Math.cos(ang)); //{line end point   width*sine(angle)}
        let yDisp = Math.round(jointscale * params[4] * Math.sin(ang)); //{line end point}
        x += xDisp;
        y += yDisp
        let thick = 1 + Math.trunc(params[3]); //{1 is minimum thickness}
//      console.log('ang ' + ang + ' params4 ' + params[4] + ' jointscale ' + jointscale + ' xDisp ' + xDisp + ' yDisp ' + yDisp);

        this.drawLine(drawingContext, oldX, oldY, x, y, thick, poles); //{right side leg}
        let leftX = xCenter - (x - xCenter); //{do the left side leg}
        let leftOldX = xCenter - (oldX - xCenter);
        this.drawLine(drawingContext, leftOldX, oldY, leftX, y, thick, poles);
        if(drawingContext) {
            drawingContext.foreColor("Black")
        }
    } 

    if(kind == AtomKind.Claw) {
        this.drawClaw(drawingContext, params, x, y, xCenter, poles) //{all work is done in here}
    } else {
//      {TED:  why else?  Presumably because claw is the end of the line?}
        if(which.firstBelowMe) {
            ySeg = this.draw(drawingContext, which.firstBelowMe, params, x, y, xCenter, ySeg, poles); //{build on my cumulative numbers}
        }
        if(which.kind == AtomKind.SegmentTrunk) {
            x = xCenter;
            ySeg = Math.round(oldY + this.overlap * params[0]);//{Seg}
//          {Jump down by height of this segment to the next segment}
        }
        if(which.nextLikeMe) {
            if(kind == AtomKind.AnimalJoint || kind == AtomKind.SectionJoint || kind == AtomKind.SegmentJoint) {
                ySeg = this.draw(drawingContext, which.nextLikeMe, params, x, y, xCenter, ySeg, poles) //{build on me}
            } else if(kind != AtomKind.AnimalTrunk) {
                ySeg = this.draw(drawingContext, which.nextLikeMe, myPars, x, y, xCenter, ySeg, poles);//{build on my parent's numbers}
            }
//          {Note that each Joint builds on the length of the SegJoint, not the joint just before it.}
//          {This is consistant with the way Sections and Segments work.}
        }

    }
    return ySeg
}

//{An example of how to call Draw for an animal}
Arthromorph.prototype.drawAnimal = function(drawingContext, x, y, poles) {
    let params = []
    for(let ii = 0; ii < 9; ii++) {
        params.push(1.0) //{clear it all out}
    }
    ySeg = y;
    ySeg = this.draw(drawingContext, this.trunk, params, x, y, x, ySeg, poles);
//  {x = xCenter when we start}
}

Arthromorph.prototype.drawInBox = function() {

    let boxwidth = this.drawer.width
    let boxheight = this.drawer.height
    let options = this.session.options
    let poles = new Poles()
    let verticalOffset = 0
    let midriff = 0
    let centre = 0
    let start = 0
    if(options.sideways) {
        centre = Math.trunc(boxheight / 2)
        start = Math.trunc(boxwidth / 2)
        poles.westPole = boxwidth
        poles.eastPole = 0
        this.drawAnimal(null, centre, start, poles); //{return with NorthPole and SouthPole updated}
        midriff = poles.westPole + Math.trunc((poles.eastPole - poles.westPole) / 2);
        verticalOffset = start - midriff;
    } else {
        start = Math.trunc(boxheight / 2);
        centre = Math.trunc(boxwidth / 2);
        poles.northPole = this.drawer.height;
        poles.southPole = 0;
        //{Preliminary dummy draw to measure North & South extent of animal}
        this.drawAnimal(null, centre, start, poles);// {return with NorthPole and SouthPole updated}
        midriff = poles.northPole + Math.trunc((poles.southPole - poles.northPole) / 2);
        verticalOffset = start - midriff;
    }
    var drawingContext = _drawerFactorySingleton.getDrawer('canvas2d', this.drawer);

//  this.trunk.printMiddle()
//  console.log(this.trunk)
    this.drawAnimal(drawingContext, centre, start + verticalOffset, poles);
}


/*
 * Monochrome Arthromorph bounding box calculations.
 * Monochrome Arthromorphs store this as a Rect
 * in the this.pic.margin property
 */

Arthromorph.prototype.dummydraw = function() {
    var tempDrawer = this.drawer
    this.drawer = Document.createElement('canvas')
    this.develop()
    this.drawer = tempDrawer
}

Arthromorph.prototype.getWidth = function() {
    if(false) {
        dummydraw()
    }
    let margin = new Rect()
    return margin.right - margin.left
}
Arthromorph.prototype.getHeight = function() {
    if(this.pic.margin == null) {
        dummydraw()
    }
    let margin = new Rect()
    return margin.bottom - margin.top
}
Arthromorph.prototype.getRect = function() {
    if(this.pic.margin == null) {
        dummydraw()
    }
    let margin = new Rect()
    return new Rect(0,0, margin.right - margin.left,
            margin.bottom - margin.top)
}