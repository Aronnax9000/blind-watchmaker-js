//FullPtr == ^Full;
//FullHandle == ^FullPtr;
//Full == RECORD
//genome;
//surround: Rect;
//origin, centre: Point;
//parent;
//firstBorn;
//lastBorn;
//eldersib;
//youngerSib;
//prec, next;
//damaged{,Blackened}

//snapHandle: Handle;
//snapBytes: Integer;
//snapBounds: Rect;
//}
function Full(genome) {
    this.genome = genome
    this.surround = genome.getRect()
    this.origin = new Point()
    this.centre = new Point()
    this.parent = null
    this.firstBorn = null
    this.lastBorn = null
    this.eldersib = null
    this.youngerSib = null
    this.prec = null
    this.next = null
    this.damaged = false
    this.snapHandle = null
    this.snapBytes = null
    this.snapBounds = new Rect()
}

//GodPtr == ^God;
//godHandle == ^GodPtr;
//God == RECORD
//adam;
//previousGod, nextGod;
//}
function God() {
    this.adam = null
    this.previousGod = null
    this.nextGod = null
}


function Pedigree(options) {
    this.options = options
    this.godCounter = 0
    this.rootGod = null
    this.thereAreLines = false
    this.theGod = null
}


Pedigree.prototype.created = function() {
    return new Full()
}


Pedigree.prototype.checkVictim = function(mLoc, thisFull) {
    if(thisFull.surround.ptInRect(mLoc)) {
        return thisFull 
    } else if(thisFull.next != null) {
        return this.checkVictim(thisFull)
    } else {
        return null
    }
}    

/*
 * Pascal version altered the value of thisFull if a victim was
 * found, && returned true. This version returns the victim && null
 * if no victim found.
 */
Pedigree.prototype.mouseInBox = function(mLoc, thisFull) {
    let victim = null
    if(thisFull != null) {
        victim = this.checkVictim(mLoc, thisFull)
    }
    return victim
}

Pedigree.prototype.invertRect == function(rect) {

}

//{highlights thisFull && its elder sibs, && all their descendants}
Pedigree.prototype.highlightAll = function(thisFull) {
    if(thisFull != null) {
        invertRect(thisFull.surround)
    }
    if(thisFull.lastBorn != null) {
        highlightAll(thisFull.lastBorn);
    }
    if(thisFull.elderSib != null) {
        highlightAll(thisFull.elderSib);
    } 
}


Pedigree.prototype.highlightPedigree = function(thisFull) {
    if(thisFull != null) {
        invertRect(thisFull.surround);
        if(thisFull.lastBorn != null) {
            highlightAll(thisFull.lastBorn);
        }
    }
} 


Pedigree.prototype.tryGod = function(thisGod) {
    godCounter++
    if(thisGod.nextGod == null) {
        return thisGod
    } else {
        return this.tryGod(thisGod.nextGod)
    }
}



Pedigree.prototype.findLastGod = function() { //{Delivers last God in theGod}
    let thisGod = this.rootGod
    this.godCounter = 1;
    if(thisGod.nextGod == null) {
        this.theGod = thisGod
    } else {
        tryGod(thisGod)
    } 
}

Pedigree.prototype.sysBeep = function() {
    alert('BEEP!')
}

Pedigree.prototype.AdamError = function(whichError, thisFull) {
    if(thisFull != null) {
        this.invertRect(thisFull.surround);
    }
    this.sysBeep(1);
    this.sysBeep(1);
    invertRect(thisFull.surround)
}

Pedigree.prototype.checkAdam = function(thisGod) {
    if(thisGod != null) {
        if(thisGod.adam != null) {
            if(thisGod.adam == thisFull) {
                return theGod = thisGod
            }
        }
        if(thisGod.nextGod != null) {
            return checkAdam(thisGod.nextGod);
        }
    }
    return null
}


//{Returns true if thisFull is an adam}
Pedigree.prototype.isAnAdam = function(thisFull) {
    let tryGod = rootGod;
    if(thisFull != null) {
        return checkAdam(tryGod) != null;
    } else {
        return false
    } 
}

Pedigree.prototype.showAllAdams = function(theGod) {
    if(theGod != null) {
        invertRect(theGod.adam.surround);
        if(theGod.nextGod != null) {
            showAllAdams(theGod.nextGod)
        }
    }
}


Pedigree.prototype.showRelatives = function(thisFull) {

    if(thisFull != null) {

        if(thisFull.parent != null) {
            this.frameRect(thisFull.parent.surround);
        }
        if(thisFull.elderSib != null) {
            this.frameRect(thisFull.elderSib.surround);
        }
        if(thisFull.youngerSib != null) {
            this.frameRect(thisFull.youngerSib.surround);
        }
        if(thisFull.lastBorn != null) {
            this.frameRect(thisFull.lastBorn.surround);
        }
        if(thisFull.firstBorn != null) {
            this.frameRect(thisFull.firstBorn.surround);
        }
    }
}


Pedigree.prototype.showAllFulls = function(thisFull) {
    if(thisFull != null) {
        this.frameRect(thisFull.surround);
        showRelatives(thisFull)
    }
    if(thisFull.next != null) {
        showAllFulls(thisFull.next)
    }
}


Pedigree.prototype.markIf = function(thisFull) {
    if(isAnAdam(thisFull)) {
//      FrameInnerRect(thisFull.surround);
    }
}

Pedigree.prototype.markUp = function(thisFull) {
    if(thisFull != null) {
        markIf(thisFull);
    }
    if(thisFull.next != null) {
        markUp(thisFull.next)
    }
} 




Pedigree.prototype.redevelop = function(thisFull) {
    tempSnap = new BitMap();

    if(thisFull != null) {
        tempSnap.baseAddr = thisFull.SnapHandle;
        tempSnap.rowBytes = thisFull.snapBytes;
        tempSnap.Bounds = thisFull.snapBounds;
//      CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null);
        markIf(thisFull);
        thisFull.damaged = false;
    }
} 


Pedigree.prototype.CrossOut = function(thisFull, colour) {
    if(thisFull != null) {
//      MoveTo(thisFull.surround.left, thisFull.surround.top);
//      PenPat(colour);
//      LineTo(thisFull.surround.right, thisFull.surround.bottom);
//      PenNormal
    }
}


Pedigree.prototype.SetAllUndamaged = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.damaged) {
            this.crossOut(thisFull, 'White');
            thisFull.damaged = false;
        }
        if(thisFull.next != null) {
            this.setAllUndamaged(thisFull.next)
        } 
    }
}


//{Records whether any intersection between This && Other (or Other's juniors),}
//{    in truth value of Other.damaged && This.damaged}
Pedigree.prototype.juniorIntersection = function(thisFull, otherFull) {
    if(thisFull != null && otherFull != null) {
        if(thisFull != otherFull) {
            if(thisFull.surround.sectRect(otherFull.surround, new Rect())) {
                otherFull.damaged = true;
                thisFull.damaged = true
            }
        }
        if(otherFull.next != null) {
            juniorIntersection(thisFull, otherFull.next);
        }
    }
} 


Pedigree.prototype.Coverer = function(thisFull) {
    if(thisFull != null && thisFull.next != null) {
        juniorIntersection(thisFull, thisFull.next);
    } 
}


//{Records whether any intersection between This && Other (or Other's seniors,}
//{    in truth value of Other.damaged && This.damaged}
Pedigree.prototype.seniorIntersection = function(thisFull, otherFull) {
    if(thisFull != null && otherFull != null) {
        if(thisFull != otherFull) {

            if(thisFull.surround.sectRect(otherFull.surround, new Rect())) {
                return true
            }
        }
        if(otherFull.prec != null) {
            return seniorIntersection(thisFull, otherFull.prec);
        }
    }
    return false
}


//{Returns true if(thisFull is covered by any of its own seniors}
Pedigree.prototype.isCovered = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.prec == null) {
            return false
        } else {
            return seniorIntersection(thisFull, thisFull.prec);
        }
    }
} 




Pedigree.prototype.overEdge = function(thisFull) {
    let destRect = new Rect();
    this.pRect.sectRect(thisFull.surround, destRect);
    overEdge = ! destRect.equalRect(thisFull.surround)
} 


Pedigree.prototype.redrawAll = function(thisFull) {
    if(thisFull != null) {
        this.moveTo(thisFull.centre.h, thisFull.centre.v);
        if(thisFull.parent != null) {
            this.lineTo(thisFull.parent.centre.h, thisFull.parent.centre.v)
        }
        if(thisFull.lastBorn != null) {
            redrawAll(thisFull.lastBorn);
        }
        if(thisFull.elderSib != null) {
            this.redrawAll(thisFull.elderSib);
        } 
    }
}


//{Draws line from each box to its parent, if it has one, treating}
//{original thisFull as adam}
Pedigree.prototype.redrawLines = function(thisFull) {
    if(thisFull != null) {
        MoveTo(thisFull.centre.h, thisFull.centre.v);
        if(thisFull.parent != null) {
            LineTo(thisFull.parent.centre.h, thisFull.parent.centre.v);
        }
        if(thisFull.lastBorn != null) {
            redrawAll(thisFull.lastBorn);
        }
    } 
}


Pedigree.prototype.allLines = function(theGod) {
    if(theGod != null) {
        if(theGod.adam != null) {
            redrawLines(theGod.adam);
        }
        if(theGod.nextGod != null) {
            this.allLines(theGod.nextGod)
        }
    }
}

Pedigree.prototype.connect = function(nucleusFull, orbitFull) {
    if((nucleusFull != null) && (orbitFull != null)) {
        this.moveTo(nucleusFull.centre.h, nucleusFull.centre.v);
        this.thereAreLines = true;
        this.lineTo(orbitFull.centre.h, orbitFull.centre.v);
    }
}


Pedigree.prototype.ChildLine = function(thisFull, child) {
    this.connect(thisFull, child);
    if(child.youngerSib != null) {
        this.childLine(thisFull, child.youngerSib);
    } 
}

Pedigree.prototype.localLines = function(thisFull) {
    if(thisFull.parent != null) {
        this.connect(thisFull, thisFull.parent);
    }
    if(thisFull.firstBorn != null) {
        this.childLine(thisFull, thisFull.firstBorn)
    } 
}


//{incorporates it into clip region so not drawn over in future}
Pedigree.prototype.incorporate = function(thisFull) {
//  RectRgn(Region2, thisFull.surround);
//  DiffRgn(DestRegion, Region2, DestRegion); //{DestRegion now updated to include new box}
//  SetClip(DestRegion)
} 


Pedigree.prototype.withdrawProtection = function(thisFull) {
//  RectRgn(Region2, thisFull.surround);
//  UnionRgn(DestRegion, Region2, DestRegion); {DestRegion now updated to include new box}
//  SetClip(DestRegion)
} 


Pedigree.prototype.protectAll = function(thisFull) {
    if(thisFull != null) {
        this.incorporate(thisFull);
    }
    if(thisFull.next != null) {
        this.protectAll(thisFull.next)
    }
} 


Pedigree.prototype.protect = function() {
//  RectRgn(DestRegion, pRect);
    if(specialFull != null) {
        this.protectAll(specialFull);
    } 
}


Pedigree.prototype.protect = function() {
//  RectRgn(DestRegion, this.pRect);
    if(specialFull != null) {
        protectAll(specialFull);
    } 
}


Pedigree.prototype.repairThis = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.damaged) {
            this.redevelop(thisFull);
            this.incorporate(thisFull);
            thisFull.damaged = false
        }
        if(thisFull.next != null) {
            this.repairThis(thisFull.next)
        }
    }
} 


Pedigree.prototype.repair = function() {
//  RectRgn(DestRegion, this.pRect);
    this.repairThis(specialFull)
}


Pedigree.prototype.WeedOut = function(thisFull) {
    if(thisFull != null) {
        if(thisFull.parent != null) {
            let onlyChild = (thisFull.youngerSib == null) && (thisFull.elderSib == null);
            if(onlyChild) {
                thisFull.parent.lastBorn = null;
                thisFull.parent.firstBorn = null
            }
        } else {
            //{not only child}
            if(thisFull.youngerSib == null) {
                thisFull.parent.lastBorn = thisFull.elderSib
            } else {
                thisFull.youngerSib.elderSib = thisFull.elderSib;
            }
            if(thisFull.elderSib == null) {
                thisFull.parent.firstBorn = thisFull.youngerSib
            } else {
                thisFull.elderSib.youngerSib = thisFull.youngerSib;
            }
        }
    }
}


Pedigree.prototype.wipeOut = function(thisFull) {
    let damageRect = thisFull.surround;
    coverer(thisFull);
    if(thisFull == specialFull) {
        oldSpecialFull = specialFull;
        specialFull = thisFull.next;
        thisFull.prec = null;
//      {Corrected by RD Dec 1993 to cure Norton-reported bug, bombing when ancestor Killed}
        thisFull.next = null;
    } else {
        thisFull.prec.next = thisFull.next;
    }
    if(thisFull.next != null) {
        thisFull.next.prec = thisFull.prec;
    }
    this.eraseRect(DamageRect);
} 

//{kill thisFull && all its elder sibs, including all their descendants}
Pedigree.prototype.killAll = function(thisFull) {
    var nextVictim
    var secondVictim
    if(thisFull != null) {
        nextVictim = thisFull.lastBorn;
        secondVictim = thisFull.elderSib;
        this.wipeOut(thisFull);
        if(thisFull == null) {
            this.sysBeep(1)
        } else {
            thisFull = null
        }
    }
    if(nextVictim != null) {
        killAll(nextVictim);
    }
    if(secondVictim != null) {
        killAll(secondVictim);
    }
} 


//{kill this one && all its descendants}
Pedigree.prototype.kill = function(thisFull) {
    var nextVictim
    var secondVictim
    if(thisFull != null) {
        nextVictim = thisFull.lastBorn;
        this.wipeOut(thisFull);
        if(thisFull == null) {
            this.sysBeep(1)
        } else {
            thisFull = null
        }
        if(nextVictim != null) {
            killAll(nextVictim);
        }
    }
} 


Pedigree.prototype.drawWholeLot = function(thisFull) {
    if(thisFull != null) {
        this.redevelop(thisFull);
        this.incorporate(thisFull);
        if(thisFull.next != null) {
            this.drawWholeLot(thisFull.next)
        }
    }
} 


Pedigree.prototype.shoot = function(thisFull) {
    this.findLastGod();
    let yesAdam = isAnAdam(thisFull); //{leaves theGod as thisFull's god if any}
    if(! yesAdam) {

        this.weedOut(thisFull);
        this.kill(thisFull)
    } else {
//      {only comes here if trying to kill an adam}
        if(thisFull.parent != null) {
            this.sysBeep(1);
        }
        if(thisFull.lastBorn != null) {
            this.killAll(thisFull.lastBorn);
            thisFull.firstBorn = null;
            thisFull.lastBorn = null;
        }
        if(thisFull != null) {
            this.wipeOut(thisFull);
            thisFull = null
        }
        if(godCounter == 3) {
            this.options.theMode = Preliminary;
            this.special = 0
        }
        if(theGod.previousGod == null) {
            this.sysBeep(1)
        } else {
            theGod.previousGod.nextGod = theGod.nextGod;
        }
        if(theGod.nextGod != null) {
            theGod.nextGod.previousGod = theGod.previousGod;
        }
        theGod.nextGod = null;
        theGod.previousGod = null;
        theGod.adam = null;
        if(theGod == null) {
            this.sysBeep(1)
        } else {
            theGod = null
        }

    }
//  EraseRect(pRect);
//  RectRgn(DestRegion, pRect);
    this.drawWholeLot(specialFull);
    this.allLines(rootGod);
//  ClipRect(pRect);
} 

Pedigree.prototype.shootAll = function(thisGod) {
    if(thisGod != null) {
        if(thisGod.adam != null) {
            shoot(thisGod.adam);
        }
        if(thisGod.nextGod != null) {
            shootAll(thisGod.nextGod)
        }
    }
} 


//{Normally called with specialFull first}
Pedigree.prototype.massacre = function(thisFull) {
    if(thisFull != null) {
        shoot(thisFull);
    }
    if(thisFull.next != null) {
        massacre(thisFull.next)
    } 
}


//{Isolates thisFull from all except its descendants, leaving rest of}
//{pedigree hierarchical linked list tidied up && pointing elsewhere.}
//{Does not touch linear Specialfull linked list, since this reflects}
//{spatial relations on screen, && nonrelatives can cover each other}
Pedigree.prototype.Detach = function(thisFull) {
    if(thisFull.parent != null) {

//      PenPat(White);
//      RectRgn(DestRegion, pRect);
        this.incorporate(thisFull);
        this.incorporate(thisFull.parent);
        this.connect(thisFull, thisFull.parent);
//      PenNormal;
//      ClipRect(pRect);
        if(thisFull.parent.lastBorn == thisFull) {
            thisFull.parent.lastBorn = thisFull.elderSib;
        }
        if(thisFull.parent.firstBorn == thisFull) {
            thisFull.parent.firstBorn = thisFull.youngerSib;
        }
    }// {of whitening line connecting with thisFull's parent}
    if(thisFull.youngerSib != null) {
        thisFull.youngerSib.elderSib = thisFull.elderSib;
    }
    if(thisFull.elderSib != null) {
        thisFull.elderSib.youngerSib = thisFull.youngerSib;
    }
    thisFull.elderSib = null;
    thisFull.youngerSib = null;
    thisFull.parent = null;
    tempGod = new God()
    tempGod.nextGod = null;
    this.findLastGod()
    tempGod.previousGod = theGod;
    tempGod.adam = thisFull;
    theGod.nextGod = tempGod;
    theGod = tempGod;
    markIf(thisFull);
}


Pedigree.prototype.followMouse = function(thisFull) {
//  SetCursor(CursList[WatchCursor]);
    tempSnap.baseAddr = thisFull.snapHandle;
    tempSnap.rowBytes = thisFull.snapBytes;
    tempSnap.Bounds = thisFull.snapBounds;
    if(thisFull.prec == null) {
       // {Chosen one is already in front. No change}
    } else {
        //{Must bring chosen one to front, after isolating it}
        thisFull.prec.next = thisFull.next;
        if(thisFull.next != null) {
            thisFull.next.prec = thisFull.prec;
        }
//      {Chosen one has now been isolated, still called thisFull}
        thisFull.next = specialFull; //{This brings it to front}
        specialFull.prec = thisFull; //{This corrects old specialfull's pointer to prec}
        oldSpecialFull = specialFull;
        specialFull = thisFull; //{This gives the new specialfull its proper name}
        specialFull.prec = null;
    }
    coverer(thisFull); // {Records all damage done by thisFull, now also Specialfull}
    // We will designate the most recently selected or spawned morph canvas as midBox
    //    child[special] = specialFull.genome;
    let wasOverEdge = overEdge(thisFull);
    let width = thisFull.surround.right - thisFull.surround.left;
    let height = thisFull.surround.bottom - thisFull.surround.top;
    let halfWidth = Math.trunc(width / 2);
    let halfHeight = Math.trunc(height / 2);
    let damageRect = thisFull.surround;
    this.protect();
//  PenPat(White);
    this.localLines(thisFull);
//  GetMouse(mous);
    if(thisFull != null) {
        horizOffset = thisFull.centre.h - mous.h;
        vertOffset = thisFull.centre.v - mous.v;
        thisFull.surround.left = thisFull.centre.h - halfWidth;
        thisFull.surround.right = thisFull.surround.left + width;
        thisFull.surround.top = thisFull.centre.v - Halfheight;
        thisFull.surround.bottom = thisFull.surround.top + Height;
        ClipRect(pRect);
        EraseRect(thisFull.surround);
    }
//  CopyBits(MainPtr^.PortBits, MyBitMap, pRect, pRect, srcCopy, null);
//  {store background}
//  CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null); {show chosen one in front}
//  PenMode(PatXor); {White is bad because it deletes other lines}
//  PenPat(Black);
    this.protect();
    this.thereAreLines = false;
    this.localLines(thisFull);
//  HideCursor;
    do {
        oldMous = mous;
//      REPEAT
//      GetMouse(mous)
//      UNTIL PtInRect(mous, pRect);
//      ClipRect(thisFull.surround);
//      {Bring on new one}
//      SetClip(DestRegion);
        if(mous.h != oldMous.h || mous.v != oldmous.v || ! stilldown) {
            if(thisFull != null) {
                thatFull = thisFull;
//              ClipRect(pRect);
//              TickValue = TickCount;
//              if(mous.v > 100) {
//              REPEAT
//              UNTIL TickCount != TickValue;
//              {an empirically suggested device for reducing flicker}
//              CopyBits(MyBitMap, MainPtr^.PortBits, thisFull.surround, thisFull.surround, srcCopy, null); {Bring back old}
                thisFull.centre.h = mous.h + horizOffset;
                thisFull.centre.v = mous.v + vertOffset;
                thisFull.surround.left = thisFull.centre.h - halfWidth;
                thisFull.surround.right = thisFull.surround.left + width;
                thisFull.surround.top = thisFull.centre.v - Halfheight;
                thisFull.surround.bottom = thisFull.surround.top + Height;
                if(this.thereAreLines) {
//                  SetClip(DestRegion);
                    this.localLines(thatFull); // {delete old lines}
                }
//              ClipRect(thisFull.surround);
//              CopyBits(tempSnap, MainPtr^.PortBits, tempSnap.Bounds, thisFull.surround, srcCopy, null);
//              {Bring on new one}
                if(this.thereAreLines) {
                    this.protect();
                    localLines(thisFull)
                }
            }
        }
    } while (stillDown);
//  ShowCursor;
//  SetCursor(CursList[HandCursor]);
//  PenNormal;
//  ClipRect(pRect);
    thisFull.origin.h = mous.h + horizOffset;
    thisFull.origin.v = mous.v + vertOffset;
    thisFull.damaged = true; // {WasOverEdge}
//  ClipRect(pRect);
    this.repair();
    this.protect();
    this.allLines(rootGod);
//  ClipRect(pRect);
} 




//current was a VAR. Value is instantiated during the routine
//via created() and returned.
Pedigree.prototype.spawnOne = function(thisFull, here, current) {

//    SetCursor(Curslist[WatchCursor]);
    current = new Full();
    document.createElement('canvas')
    current.genome = thisFull.genome.reproduce();
    current.origin = here;
    current.genome.develop()
    current.surround = current.genome.getRect();
    Triangle.atLeast(current.surround);
    let surround = current.surround
    let height = surround.bottom - surround.top;
    widthBytes = Math.trunc((right - left) / 8)
    if(widthBytes % 2 == 1) {
        widthBytes = widthBytes + 1;
    }
    width = widthBytes * 8;
    voffset = 0;
    let pRect = this.pRect
    if(surroundtop < pRect.top) {
        voffset = pRect.top - top;
        surround.top = pRect.top;
        surround.bottom = surround.top + surround.height;
    }
    if(surround.bottom > pRect.bottom) {
        voffset = pRect.bottom - surround.bottom;
        surround.bottom = pRect.bottom;
        surround.top = surround.bottom - height
    }
    if(surround.left < pRect.left) {
        surround.left = pRect.left;
        surround.right = surround.left + width
    }
    if(surround.right > pRect.right) {
        surround.right = pRect.right;
        surround.left = surround.right - width
    }
//  EraseRect(current.surround);
//  FrameRect(current.surround);

    current.centre.h = surround.left + Math.trunc((surround.right - surround.left) / 2)
    current.centre.v = surround.top + Math.trunc((surround.bottom - surround.top) / 2)

    here.v = current.origin.v + voffset;
    here.h = current.centre.h;
    DrawPic(MyPic, here, current.genome);
    let snapBounds = current.snapBounds

    snapBounds.left = 0;
    snapBounds.right = current.surround.right - current.surround.left;
    snapBounds.top = 0;
    snapBounds.bottom = height
    tempSnap.Bounds = current.snapBounds;
    current.snapBytes = widthBytes;
//  current.snapHandle = NewHandle(SizeNeeded);
//  tempSnap.baseAddr = current.snapHandle;
//  tempSnap.rowBytes = current.snapBytes;
//  CopyBits(MainPtr^.PortBits, tempSnap, current.surround, tempSnap.Bounds, srcCopy, null);
    current.parent = thisFull;
    current.elderSib = thisFull.lastBorn;
    if(current.elderSib != null) {
        current.elderSib.youngerSib = current;
    }
    current.lastBorn = null;
    current.youngerSib = null;
    if(thisFull.lastBorn == null) {
        thisFull.firstBorn = current;
    }
    thisFull.lastBorn = current;
    current.next = specialFull;  //{puts currentfull at head of list}
    specialFull.prec = current;  //{Updates seniority pointer of previous head}
    oldSpecialFull = specialFull;
    specialFull = current; // {Gives new head its proper title}
    specialFull.prec = null; // {Probably unnecessary but good form}
    child[Special] = current.genome;
    markIf(current);
} 


Pedigree.prototype.Radiate = function(from, goal, spokes, here) {
    dx = goal.h - from.h;
    dy = goal.v - from.v;
    here[0].h = from.h + dx;
    here[0].v = from.v + dy;
    here[1].h = from.h - dx;
    here[1].v = from.v - dy;
    here[2].h = from.h - dy;
    here[2].v = from.v + dx;
    here[3].h = from.h + dy;
    here[3].v = from.v - dx;
    for(let j = 0; j < spokes; i++) {
        this.moveTo(from.h, from.v);
        this.lineTo(here[j].h, here[j].v)
    }
} 


Pedigree.prototype.drawOutFrom  = function(thisFull) {
//  SetCursor(CursList[CrossCursor]);
//  ClipRect(pRect);
    if(isCovered(thisFull)) {
        redevelop(thisFull);
    }
    if(thisFull.prec == null) {
//      {Chosen one is already in front. No change}
    } else {
//      {Must bring chosen one to front, after isolating it}
        thisFull.prec.next = thisFull.next;
        if(thisFull.next != null) {
            thisFull.next.prec = thisFull.prec;
//          {Chosen one has now been isolated, still called thisFull}
            thisFull.next = specialFull; //{This brings it to front}
            specialFull.prec = thisFull; //{This corrects old specialfull's pointer to prec}
            oldSpecialFull = specialFull;
            specialFull = thisFull; // {This gives the new specialfull its proper name}
            specialFull.prec = null;
        }
    }
//  GetClip(SaveRegion);
//  RectRgn(DestRegion, pRect);
//  this.protect();
//  PenMode(PatXor);
//  OwnCursor(specialFull.surround, MainPtr^.PortBits, theCursor);
//  SetCursor(theCursor);
//  do {
//  GetMouse(mous);
//  UNTIL (! StillDown) || (! PtInRect(mous, thisFull.surround));
//  PenNormal;
//  FrameRect(thisFull.surround);
    markIf(thisFull);
//  child[special] = thisFull.genome;
//  if(StillDown) {

//  SetClip(DestRegion);
//  PenMode(PatXor);
//  Radiate(thisFull.centre, mous, Rays, here);
    while(stillDown) {

        oldMous = Mous;
        GetMouse(mous);
        if(mous.v < pRect.top) {
            mous.v = pRect.top;
        }
        if(mous.h != oldMous.h || mous.v != oldMous.v) { 

            this.radiate(thisFull.centre, oldMous, Rays, here);
            if(! thisFull.surround.ptInRect(mous)) {
                this.Radiate(thisFull.centre, mous, Rays, here)
            }
        } 
    }
//  {Button just released}
//  {SetCursor(CursList[WatchCursor]);}
    this.radiate(thisFull.centre, mous, rays, here);
//  PenNormal;
    j = Rays;
//  ClipRect(pRect);
    if(! thisFull.surround.ptInRect(mous)) {
        while (j >= 1) {
            theCursor.data = curslist[randcursor].mask;
            theCursor.data[8] = 128; // {make up dot cursor}
            theCursor.mask = theCursor.data;
//          SetCursor(theCursor);
            this.spawnOne(thisFull, here[j], current);
            j--
        }               
    }
    this.protect();
    this.localLines(thisFull);
//  ClipRect(pRect);
//  SetCursor(CursList[DrawOutCursor]);
} // {DrawOutFrom}

Pedigree.prototype.PhylogNew  = function(biomorph) {
    // Erase the Pedigree breeding area
    // EraseRect(pRect);
    tempGod = new God()
    tempGod.nextGod = null;
    this.findLastGod;
    tempGod.previousGod = this.theGod;
    this.theGod.nextGod = tempGod;
    this.theGod = tempGod;
    this.theGod.adam = new Full();
    this.theGod.adam.genome = biomorph;
    let pRect = this.pRect

    theGod.adam.origin.h = Math.trunc((pRect.right - pRect.left) / 2)
    theGod.adam.origin.v = Math.trunc((pRect.bottom - pRect.top) / 2)

    delayvelop(theGod.adam.genome, theGod.adam.origin);
    theGod.adam.surround = Margin;
    Triangle.atLeast(theGod.adam.surround);
    this.frameRect(theGod.adam.surround);
    this.frameInnerRect(theGod.adam.surround);
    let surround = theGod.adam.surround
    let height = surround.bottom - surround.top;
    let width = Math.trunc((surround.right - surround.left) / 8);
    while(width % 2 == 1) {
        width++
    }
    let snapBounds = theGod.adam.snapBounds
    snapBounds.left = 0;
    snapBounds.right = theGod.adam.surround.right - theGod.adam.surround.left;
    snapBounds.top = 0;
    snapBounds.bottom = height
    tempSnap.bounds = theGod.adam.snapBounds;
    theGod.adam.snapBytes = width;
    theGod.adam.snapHandle = new BitMap();
    tempSnap.baseAddr = theGod.adam.snapHandle;
    tempSnap.rowBytes = theGod.adam.snapBytes;
//  CopyBits(MainPtr^.PortBits, tempSnap, theGod.adam.surround, tempSnap.Bounds, srcCopy, null);
    let adam = theGod.adam 
    adam.centre.h = adam.surround.left + Math.trunc((adam.surround.right - adam.surround.left) / 2);
    adam.centre.v = adam.surround.top + Math.trunc((adam.surround.bottom - adam.surround.top) / 2)
    oldSpecialFull = specialFull;
    //{This corrects old specialfull's pointer to prec}
    if(specialFull != null) {
        specialFull.prec = theGod.adam
    }                                                                                        
    theGod.adam.next = specialFull;
    specialFull = theGod.adam;
    specialFull.prec = null;
    // {Changed July 1990}
    this.options.theMode = Mode.Phyloging; 
//  EraseRect(pRect);
//  RectRgn(DestRegion, pRect);
    drawWholeLot(specialFull);
    this.allLines(rootGod);
//  ClipRect(pRect);
}
