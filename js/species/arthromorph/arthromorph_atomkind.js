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
