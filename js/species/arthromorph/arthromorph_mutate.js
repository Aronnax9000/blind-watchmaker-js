
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
//                    console.log('duplicationMut')
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
