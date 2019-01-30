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
//    this.trunk.printMiddle()

}
