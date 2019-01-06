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
Monochrome.force3 = function(r) {
    var i = Math.round(r)
    if(i > 2) { 
        i = 2
    }
    if(i < 0) {
        i = 0
    }
    return i
}

Monochrome.force2 = function(r) {
    var i = Math.round(r)
    if(i > 1) { 
        i = 1
    }
    if(i < 0) {
        i = 0
    }
    return i
}

Monochrome.triangle = function(screenwidth, screenheight, b, m) {
    var k = Math.round(200 * screenheight / 340);
    var x = m.h - b.h;
    var y = (screenheight - m.v) - (screenheight - b.v);
    var r1 = y / k;
    var r3 = (x - y / 2) / k;
    var r2 = (k - x - y / 2) / k;
    return [r1, r2, r3];
}

Monochrome.prototype.concoct = function(r1, r2, r3, a, b, c) {
    var weight
    this.segNoGene = Math.round(r1 * a.segNoGene + r2 * b.segNoGene + r3 * c.segNoGene)

    if(this.segNoGene < 1) {
        this.segNoGene = 1
    }

    this.segDistGene = Math.round(r1 * a.segDistGene + r2 * b.segDistGene + r3 * c.segDistGene);
    this.completenessGene = Monochrome.force2(r1 * a.completenessGene + r2 * b.completenessGene + r3 * c.completenessGene);
    this.spokesGene = Monochrome.force3(r1 * a.spokesGene + r2 * b.spokesGene + r3 * c.spokesGene);
    for(let j = 0; j < 9; j++) {
        this.gene[j] = Math.round(r1 * a.gene[j] + r2 * b.gene[j] + r3 * c.gene[j]);
    }
    var sizeWorry = this.segNoGene * Monochrome.twoToThe(gene[8]);
    if(sizeWorry > WORRYMAX) {
        this.gene[8]--
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    this.trickleGene = Math.round(r1 * a.trickleGene + r2 * b.trickleGene + r3 * c.trickleGene);
    this.mutSizeGene = Math.round(r1 * a.mutSizeGene + r2 * b.mutSizeGene + r3 * c.mutSizeGene);
    this.mutProbGene = Math.round(r1 * a.mutProbGene + r2 * b.mutProbGene + r3 * c.mutProbGene);

    if(this.mutProbGene < 1) {
        this.mutProbGene = 1
    }
    if(this.mutProbGene > 100) {
        this.mutProbGene = 100
    }
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = Monochrome.force3(r1 * a.dGene[j] 
        + r2 * b.dGene[j] 
        + r3 * c.dGene[j]);
    }

}

Monochrome.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
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
    // console.log(str);
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
            this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            this.gene[geneboxIndex - 1] += this.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[geneboxIndex - 1] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.gene[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = this.segNoGene * this.twoToThe(this.gene[8] + 1);
            if(sizeWorry <= WORRYMAX)
                this.gene[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[8] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[8] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[8] = SwellType.Shrink;
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (this.segNoGene + 1) * this.twoToThe(this.gene[8]);
            if(sizeWorry <= WORRYMAX) {
                this.segNoGene++;
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.segDistGene -= this.trickleGene;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                this.dGene[9] = SwellType.Swell;
                break;
            case VertPos.MidRung: 
                this.dGene[9] = SwellType.Same;
                break;
            case VertPos.BottomRung: 
                this.dGene[9] = SwellType.Shrink;
                break;
            }
            break;
        case HorizPos.RightThird: 
            this.segDistGene += this.trickleGene;
            break;
        }
        break;
    case 12: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.completenessGene = CompletenessType.Single;
            break;
        case HorizPos.MidThird: 
            break; // {No Action}
        case HorizPos.RightThird: 
            this.completenessGene = CompletenessType.Double;
            break;
        }
        break;
    case 13: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            this.spokesGene = SpokesType.NorthOnly;
            break;
        case HorizPos.MidThird: 
            this.spokesGene = SpokesType.NSouth;
            break;
        case HorizPos.RightThird: 
            this.spokesGene = SpokesType.Radial;
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.trickleGene > 1)
                this.trickleGene--;
            break;
        case HorizPos.RightThird: 
            this.trickleGene++;
            break;
        case HorizPos.MidThird: 
            break;// {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutSizeGene > 1)
                this.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            this.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(this.mutProbGene > 1) {
                this.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(this.mutProbGene < 100)
                this.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
            break;
        }
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}

const TRICKLE = 10;
const MutTypeNo = 9;

Monochrome.initializeMut = function(session) {
    var mut = new Array(MutTypeNo);
    mut[0] = true;  // Segmentation // {** changed 1.1 **}
    mut[1] = true;  // Gradient {** changed 1.1 **}
    mut[2] = true;  // Asymmetry {** changed 1.1 **}
    mut[3] = true;  // Radial Sym {** changed 1.1 **}
    mut[4] = true;  // Scaling Factor {** changed 1.1 **}
    mut[5] = false; // Mutation Size
    mut[6] = false; // Mutation Rate
    mut[7] = true;  // Tapering Twigs
    mut[8] = true;
    session.options.mut = mut;
}

// Really belongs on the session
Monochrome.initializeSession = function(session) {
    // console.log('initializeMut')
    Monochrome.initializeMut(session)
    session.options['sessionIcon'] = 'img/BWTreeLogoMonoThin_ICNO_17669_32x32.png'
}


function chromosome() {
    var chrome = new Array(9);
    for(let i = 0; i < 9; i++)
        chrome[i] = 0; // indexed 0-8, unlike Pascal 1-based arrays.
    return chrome;
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

Monochrome.prototype.toString = function() {
    var htmlResult = 
        "Gene: " + this.gene + " DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult +=  " SegNoGene: " + this.segNoGene +  
    " SegDistGene: " + this.segDistGene +  
    " CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    " SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    " TrickleGene: " + this.trickleGene +  
    " MutSizeGene: " + this.mutSizeGene +  
    " MutProbGene: " + this.mutProbGene;
    return htmlResult;
}

Monochrome.prototype.toHtml = function() {
    var h4open = "<h4>";
    var h4close = "</h4>";
    var breaktag = "<br />";
    var htmlResult = h4open + name + h4close + 
    "Gene: " + this.gene + breaktag + "DGene: ";
    for(let i = 0; i < 10; i++) {
        htmlResult +=  SwellType.properties[this.dGene[i]].name; 
        if(i<9) htmlResult += ",";
    }
    htmlResult += breaktag + "SegNoGene: " + this.segNoGene +  
    breaktag + "SegDistGene: " + this.segDistGene +  
    breaktag + "CompletenessGene: " + CompletenessType.properties[this.completenessGene].name +  
    breaktag + "SpokesGene: " + SpokesType.properties[this.spokesGene].name +  
    breaktag + "TrickleGene: " + this.trickleGene +  
    breaktag + "MutSizeGene: " + this.mutSizeGene +  
    breaktag + "MutProbGene: " + this.mutProbGene;
    return htmlResult;
}


Monochrome.prototype.basicTree = function () {
    this.makeGenes(-10, -20, -20, -15, -15, 0, 15, 15, 7);
    this.segNoGene = 2;
    this.segDistGene = 150;
    this.completenessGene = CompletenessType.Single;
    this.dGene[3] = SwellType.Shrink;
    this.dGene[4] = SwellType.Shrink;
    this.dGene[5] = SwellType.Shrink;
    this.dGene[8] = SwellType.Shrink;
    this.trickleGene = 9;
}

Monochrome.prototype.chess = function () {
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

Monochrome.prototype.insect = function() {
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




/*
 * PROCEDURE MakeGenes (VAR genotype: person; a, b, c, d, e, f, g, h, i: Integer);
        VAR
                j: Integer;
        BEGIN
                WITH genotype DO
                        BEGIN
                                FOR j := 1 TO 10 DO
                                        dgene[j] := same;
                                SegNoGene := 1;
                                SegDistGene := 150;
                                CompletenessGene := Double;
                                SpokesGene := NorthOnly;
                                TrickleGene := Trickle;
                                MutSizeGene := Trickle DIV 2;
                                MutProbGene := 10;
                                gene[1] := a;
                                gene[2] := b;
                                gene[3] := c;
                                gene[4] := d;
                                gene[5] := e;
                                gene[6] := f;
                                gene[7] := g;
                                gene[8] := h;
                                gene[9] := i;
                        END;
        END; {makegenes}

 */
Monochrome.prototype.makeGenes = function (a, b, c, d, e, f, g, h, i) {
    for(let s = 0; s < 10; s++) {
        this.dGene[s] = SwellType.Same;
    }
    this.segNoGene = 1;
    this.segDistGene = 150;
    this.completenessGene = CompletenessType.Double;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = TRICKLE;
    this.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    this.mutProbGene = 10;
    this.gene[0] = a;
    this.gene[1] = b;
    this.gene[2] = c;
    this.gene[3] = d;
    this.gene[4] = e;
    this.gene[5] = f;
    this.gene[6] = g;
    this.gene[7] = h;
    this.gene[8] = i;
}



Monochrome.prototype.randInt = function(ceiling) {
    return Math.floor(Math.random() * ceiling) + 1;  
}

Monochrome.prototype.direction = function(child) {
    if(this.randInt(2) == 2) 
        return child.mutSizeGene;
    else
        return -child.mutSizeGene;
}
Monochrome.prototype.direction9 = function() {
    if(this.randInt(2) == 2)
        return 1;
    else
        return -1;
}

Monochrome.prototype.copyBiomorph = function(child) {
    child.gene = this.gene.slice();
    child.dGene = this.dGene.slice();
    child.segNoGene = this.segNoGene;
    child.segDistGene = this.segDistGene;
    child.completenessGene = this.completenessGene;
    child.spokesGene = this.spokesGene;
    child.trickleGene = this.trickleGene;
    child.mutSizeGene = this.mutSizeGene;
    child.mutProbGene = this.mutProbGene;
    return child;
}

/*
 * Globals, line 29:
 * 
 * CONST
 *     WorryMax = 4095;
 */
const WORRYMAX = 4095;

Monochrome.prototype.twoToThe = function(n) {
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

//Monochrome.prototype.manipulation = _monochrome_manipulation;
Monochrome.prototype.randSwell = function(indGene) {
    switch(indGene) {
    case SwellType.Shrink:
        return SwellType.Same;
    case SwellType.Same:
        if(this.randInt(2) == 1) {
            return SwellType.Shrink;
        } else {
            return SwellType.Swell;
        }
    case SwellType.Swell:
        return SwellType.Same;
    }
}


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



Monochrome.prototype.reproduce = function(childCanvas) {
    // // // console.log("Reproduce");
    var child = new Monochrome(this.session, childCanvas);
    this.copyBiomorph(child);
    child.mutate();
    return child;
} // reproduce

Monochrome.prototype.doPerson = function(biomorphType) {
    switch(biomorphType) {
    case "Chess": this.chess(); break;
    case "BasicTree": this.basicTree(); break;
    case "Insect": this.insect(); break;
    case "Saltation": this.doSaltation(); break;
    }
//    this.develop(); 
//    $(this.drawer).trigger('mouseover');
    return this;
}


Monochrome.prototype.mutate = function() {
    var mut = this.session.options.mut

    if(mut[6]) 
        if(this.randInt(100) < this.mutProbGene) 
            do 
                this.mutProbGene += this.direction9();
            while ((Math.abs(this.mutProbGene) > 100) || (this.mutProbGene == 0));
    for(let j = 0; j<8; j++) 
        if(this.randInt(100) < this.mutProbGene) 
            this.gene[j] += this.direction(this);
    if(this.randInt(100) < this.mutProbGene) 
        this.gene[8] += this.direction9();
    if(this.gene[8] < 1) 
        this.gene[8] = 1;
    var sizeWorry = this.segNoGene * this.twoToThe(this.gene[8]);
    // // // console.log("Gene9: " + this.gene[8] + "SegNoGene: " + this.segNoGene + " SizeWorry: " + sizeWorry);
    if(sizeWorry > WORRYMAX)  
    {this.gene[8]--; 
    // // // console.log("Decrementing segNoGene");
    }
    if(mut[0]) 
        if(this.randInt(100) < this.mutProbGene) {
            var j = this.direction9();
            this.segNoGene += j;
            if(j > 0) {
                sizeWorry = this.segNoGene * this.twoToThe(this.gene[8]);
                if(sizeWorry > WORRYMAX) 
                    this.segNoGene--;
            }
        }
    if(this.segNoGene < 1) 
        this.segNoGene = 1;
    if((mut[1]) && (this.segNoGene > 1)) {
        for(let j = 0; j<8; j++) 
            if(this.randInt(100) < this.mutProbGene/2>>0) 
                this.dGene[j] = this.randSwell(this.dGene[j]);
        if(this.randInt(100) < this.mutProbGene/2>>0) 
            this.dGene[9] = this.randSwell(this.dGene[9]);
    }
    if(mut[7])
        if((mut[8] && (this.randInt(100) < this.mutProbGene))) 
            this.dGene[8] = this.randSwell(this.dGene[8]);
    if((mut[0]) && (this.segNoGene > 1)) 
        if(this.randInt(100) < this.mutProbGene) 
            this.segDistGene = this.segDistGene + this.direction9();
    if(mut[2]) 
        if(this.randInt(100) < this.mutProbGene/2>>0) 
            if(this.completenessGene == CompletenessType.Single) 
                this.completenessGene = CompletenessType.Double;
            else 
                this.completenessGene = CompletenessType.Single;
    if(mut[3]) 
        if(this.randInt(100) < this.mutProbGene/2>>0) 
            switch(this.spokesGene) {
            case SpokesType.NorthOnly: 
                this.spokesGene = SpokesType.NSouth;
                break;
            case SpokesType.NSouth: 
                if(this.direction9() == 1) 
                    this.spokesGene = SpokesType.Radial;
                else 
                    this.spokesGene = SpokesType.NorthOnly;
                break;
            case SpokesType.Radial: 
                this.spokesGene = SpokesType.NSouth;
                break;
            }
    if(mut[4]) 
        if(this.randInt(100) < Math.abs(this.mutProbGene)) {
            this.trickleGene += this.direction9();
            if(this.trickleGene < 1) 
                this.trickleGene = 1;
        }
    if(mut[5]) 
        if(this.randInt(100) < Math.abs(this.mutProbGene)) {
            this.mutSizeGene += this.direction9();
            if(this.mutSizeGene < 1) 
                this.mutSizeGene = 1;
        }
    
}
Monochrome.prototype.doSaltation = function() {
    // {bomb 5, range check failed, here after killing top Adam}
    var mut = this.session.options.mut
    if(mut[0]) {
        this.segNoGene = this.randInt(6);
        this.segDistGene = this.randInt(20);
    } else {
        this.segNoGene = 1;
        this.segDistGene = 1;
    }
    var r = this.randInt(100);
    this.completenessGene = CompletenessType.Double;
    if(mut[2]) {
        if(r < 50) {
            this.completenessGene = CompletenessType.Single;
        } 
    }
    r = this.randInt(100);
    if(mut[3]) {
        if(r < 33) {
            this.spokesGene = SpokesType.Radial;
        } else if(r < 66) {
            this.spokesGene = SpokesType.NSouth;
        } else {
            this.spokesGene = SpokesType.NorthOnly;
        }
    } else {
        this.spokesGene = SpokesType.NorthOnly;
    }
    if(mut[4]) {
        this.trickleGene = this.randInt(10);
        if(this.trickleGene > 1) {
            this.mutSizeGene = Math.trunc(this.trickleGene / 2);
        }
    }
    for(let j = 0; j < 8; j++) {
        var maxGene;
        do {
            this.gene[j] = Math.trunc(this.mutSizeGene * (this.randInt(19) - 10));
            if(mut[1]) {
                this.dGene[j] = this.randSwell(this.dGene[j]);
            } else {
                this.dGene[j] = SwellType.Same;
            }
            var factor;
            switch(this.dGene[j]) {
            case SwellType.Shrink:
                factor = 1;
                break;
            case SwellType.Same:
                factor = 0;
                break;
            case SwellType.Swell:
                factor = 1;
                break;
            }
            maxgene = this.gene[j] * this.segNoGene * factor;
        } while(maxgene > 9 * this.trickleGene || maxgene < -9 * this.trickleGene);
    }
    do {
        // console.log("doSaltation2 trickleGene " + this.trickleGene);
        if(mut[7]) {
            this.dGene[8] = this.randSwell(this.dGene[8]);
        } else {
            this.dGene[8] = SwellType.Same;
        }
        if(mut[1]) {
            this.dGene[9] = this.randSwell(this.dGene[8])
        } else {
            this.dGene[9] = Same;
        }
        var factor;
        // In the Pascal, the index of the previous for loop, j, is used.
        // the loop ran from 1 to 8.
        // I don't know if the value of the counter in a Pascal for...do loop
        // should
        // to be 9 or 8. I'm guessing 9, and since we use 0-based arrays,
        // using 8 below. Best inform for the guess is that dGene[7] isn't
        // altered within the routine, and using dGene[8] seems to cause endless
        // loops
        switch(this.dGene[8]) {
        case SwellType.Shrink:
            factor = 1;
            break;
        case SwellType.Same:
            factor = 0;
            break;
        case SwellType.Swell:
            factor = 1;
            break;
        }
        maxgene = this.segDistGene * this.segNoGene * factor;
        // console.log("mut1 and 7 maxgene " + maxgene);
    } while (maxgene > 100 || maxgene < -100);
    this.gene[8] = this.randInt(6);
}






/*
 * Globals, line 247.
 * 
 * Lin = RECORD
 *     StartPt, EndPt: Point;
 *     Thickness: 1..8;
 * END;
 * LinPtr = ^Lin;
 * LinHandle = ^LinPtr;
 */
function Lin(x, y, xnew, ynew, thick) {
    this.startPt = new Point(x,y); // start point of the line segment
    this.endPt = new Point(xnew,ynew); // end point of the line segment
    this.thickness = thick; // thickness of the line segment
    this.nextLin = null; // Pascal had implicit pointer to next element.
}

Lin.prototype.linToString = function() {
    return "Lin " + this.startPt.toString() + " -> " + this.endPt.toString() + " thickness " + this.thickness;
}

var PicStyleType = {LF: 1, RF: 2, FF: 3, LUD: 4, RUD:5, FUD:6, LSW:7, RSW:8, FSW:9,
        properties: {
            1: {name: "LF"},
            2: {name: "RF"},
            3: {name: "FF"},
            4: {name: "LUD"},
            5: {name: "RUD"},
            6: {name: "FUD"},
            7: {name: "LSW"},
            8: {name: "RSW"},
            9: {name: "FSW"}
        }
};
var Compass = {NorthSouth:1, EastWest:2, properties: {
    1: {name: "NorthSouth"}, 2:{name: "EastWest"}
}};


/*
 * Globals, line 253.
 *     Pic = RECORD
 *          BasePtr: Ptr;
 *          MovePtr: LinPtr;
 *          Origin: Point;
 *          PicSize: Integer;
 *          PicPerson: person
 *      END;
 */
function Pic(biomorph) {
    this.basePtr = null // The first Lin
    this.movePtr = null // The current Lin (used in walking the array)
    this.origin = new Point(0,0) // a Point
    this.picSize = 0 // Number of Lins
    this.picPerson = biomorph // the biomorph that this is a picture of.
    this.margin = new Rect() // used to compute bounding rectangle.
}


/*
 PROCEDURE ZeroPic (VAR thisPic: Pic; Here: Point);
    BEGIN
        WITH thisPic DO
            BEGIN
                MovePtr = LinPtr(BasePtr);
                PicSize = 0;
                Origin = Here
            END
    END; {ZeroPic}
 */
Pic.prototype.zeroPic = function (here) {
    if(this.basePtr != null) { 
        // Pic has lines. Walk the singly linked list all the way to the end,
        // disconnect each Lin from the next.
        var walkPtr = this.basePtr;
        while(walkPtr != null) {
            // Gotta grab a reference to the next element in the list 
            // before we disconnect it from the current one.
            var nextLin = walkPtr.nextLin
            walkPtr.nextLin = null;
            walkPtr = nextLin;
        }
        this.picSize = 0;
        this.origin = here;

    }
    this.margin = new Rect()
    this.basePtr = null
    this.movePtr = null
    // console.log('zeroPic') 
    // console.log(this)
}
/*
 * Globals, line 28.
 */
const PICSIZEMAX = 4095


/*
 * PROCEDURE PicLine (VAR thisPic: Pic; x, y, xnew, ynew, thick: Integer);
    BEGIN
        IF thick > 8 THEN
            thick = 8;
        WITH thisPic DO
            BEGIN
                IF PicSize >= PicSizeMax THEN
                    BEGIN
{Message(GetString(TooLargeString));}
 {used the help dialog! v1.1 changed to alert}
                        DisplayError(-147, 'Biomorph too large, or other problem', ' ', StopError);
                        ExitToShell
                    END
                ELSE
                    WITH MovePtr^ DO
                        BEGIN
                            StartPt.h = x;
                            StartPt.v = y;
                            EndPt.h = xnew;
                            EndPt.v = ynew;
                            Thickness = Thick
                        END;
                MovePtr = linptr(size(MovePtr) + 10);  {advance 'array subscript' by number}
{                                    of bytes occupied by one lin}
                PicSize = PicSize + 1
            END
    END; {PicLine}

 */
Pic.prototype.picLine = function(x, y, xnew, ynew, thick) {
//  // // console.log("picLine (" + x + "," + y + ")>(" + xnew + "," + ynew + ")" + " thickness " + thick);
    if(thick > 8)
        thick = 8;
    if(this.picSize >= PICSIZEMAX) {
        // {Message(GetString(TooLargeString));}
        // {used the help dialog! v1.1 changed to alert}
        alert('Biomorph too large, or other problem');
        return
    } else {
        newLin = new Lin(x, y, xnew, ynew, thick)
//        newLin.id = this.picSize++
//        // console.log('added line ' + newLin.id)
        if(this.basePtr == null) { // First Lin in the Pic.
            this.basePtr = newLin; // set the base pointer to the new Lin
        } else { // Pic already has at least one Lin.
            // Link the new Lin onto the Lin at end of the Pic
            this.movePtr.nextLin = newLin; 
        }
        this.movePtr = newLin; // Point to the new end of the list

        var margin = this.margin;
        if(x < margin.left)
            margin.left = x;
        else if(x > margin.right)
            margin.right = x;
        if(y > margin.bottom)
            margin.bottom = y;
        else if(y < margin.top)
            margin.top = y;
        if(xnew < margin.left)
            margin.left = xnew;
        else if(xnew > margin.right)
            margin.right = xnew;
        if(ynew > margin.bottom)
            margin.bottom = ynew;
        else if(ynew < margin.top)
            margin.top = ynew;

    }
} // {PicLine}


Pic.prototype.picToHtml = function() {
    var html = PicStyleType.properties[this.picStyle].name;
    return html;
}


Pic.prototype.actualLine = function(picStyle, orientation) {
    var origin = this.origin;
    var movePtr = this.movePtr;
    var drawer = this.drawer;
//    
//  // console.log("actualLine Style:" + PicStyleType.properties[picStyle].name 
//          + " id " + movePtr.id 
//          + " movePtr:" + movePtr.toString() 
//          + " Origin:" + origin.toString())

    drawer.penSize(movePtr.thickness);
    var x0;
    var x1;
    var y0;
    var y1;
    var startPt = movePtr.startPt;
    var endPt = movePtr.endPt;
    if(orientation == Compass.NorthSouth) {
        y0 = startPt.v;
        y1 = endPt.v;
        x0 = startPt.h;
        x1 = endPt.h;
    } else {
        y0 = startPt.h;
        y1 = endPt.h;
        x0 = startPt.v;
        x1 = endPt.v;
    }
    switch(picStyle) {
    case PicStyleType.LF: 
        drawer.drawLine(x0, y0, x1, y1);
        break;
    case PicStyleType.RF: 
        drawer.drawLine(-x0, y0, -x1, y1);
        break;
    case PicStyleType.FF: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, y0, -x1, y1);
        break;
    case PicStyleType.LUD: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, -y0, -x1, -y1);
        break;
    case PicStyleType.RUD: 
        drawer.drawLine(-x0, y0, -x1, y1);
        drawer.drawLine(x0, -y0, x1, -y1);
        break;
    case PicStyleType.FUD: 
        drawer.drawLine(x0, y0, x1, y1);
        drawer.drawLine(-x0, y0, -x1, y1);
        drawer.drawLine(x0, -y0, x1, -y1);
        drawer.drawLine(-x0, -y0, -x1, -y1);
        break;
    } // {CASES}
} // {ActualLine}

//{Pic already contains its own origin, meaning the coordinates at which}
//{ it was originally drawn. Now draw it at place}

Pic.prototype.drawPic = function(place) {
    var biomorph = this.picPerson
    this.drawer = _drawerFactorySingleton.getDrawer('canvas2d', biomorph.drawer);

    // console.log('drawPic picSize ' + this.picSize)
    // console.log(this)
    var drawer = this.drawer
    drawer.save()
    drawer.translate(-place.h,-place.v)
    if(false) { // draw bounding rectangle for debugging centring
        drawer.setColor("red")
        drawer.frameRect(this.margin)
    }
    var picStyle = PicStyleType.FF; 
    switch(biomorph.completenessGene) {
    case CompletenessType.Single: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
            picStyle = PicStyleType.LF;
            break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.LUD;
            break;
        case SpokesType.Radial: 
            picStyle = PicStyleType.LUD;
            break;
        }
        break;
    case CompletenessType.Double: 
        switch(biomorph.spokesGene) {
        case SpokesType.NorthOnly: 
            picStyle = PicStyleType.FF;
            break;
        case SpokesType.NSouth: 
            picStyle = PicStyleType.FUD;
            break;
        case SpokesType.Radial: 
            picStyle = PicStyleType.FUD;
            break;
        }
        break;
    }
    drawer.penSize(biomorph.session.myPenSize);
    // {reposition at base of grabbed space}
    this.movePtr = this.basePtr;
    drawer.setColor("black");

    while(true) {
        this.actualLine(picStyle, Compass.NorthSouth); // {sometimes rangecheck error}
        if(biomorph.spokesGene == SpokesType.Radial) 
            if(biomorph.completenessGene = CompletenessType.Single) 
                this.actualLine(PicStyleType.RUD, Compass.EastWest);
            else
                this.actualLine(picStyle, Compass.EastWest);
        if(this.movePtr.nextLin == null)
            break; // Leave iteration with thisPic.movePtr pointing to the last Lin.
        // Advance to next Lin.
        this.movePtr = this.movePtr.nextLin;
    }
    drawer.penSize(1);
} // {DrawPic}
Monochrome.prototype.tree = function(x, y, lgth, dir, dx, dy, thick, oddOne, order) {
    if(dir < 0)
        dir = dir + 8
    if(dir >= 8)
        dir = dir - 8

    if(this.trickleGene < 1)
        this.trickleGene = 1;

    var xnew = x + Math.trunc(lgth * dx[dir] / this.trickleGene);
    var ynew = y + Math.trunc(lgth * dy[dir] / this.trickleGene);

    if(this.dGene[8] == SwellType.Shrink) 
        thick = lgth;
    else if(this.dGene[8] == SwellType.Swell) 
        thick = 1 + this.gene[8] - lgth; // Make thicker the shorter the segment
    else {
        thick = 1;
    }

    this.pic.picLine(x, y, xnew, ynew, thick * this.session.myPenSize);

    if(lgth > 1)
        if(oddOne) {
            
            this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
        } else {
            this.tree(xnew, ynew, lgth - 1, dir - 1, dx, dy, thick, oddOne, order);
            if(lgth < order)
                this.tree(xnew, ynew, lgth - 1, dir + 1, dx, dy, thick, oddOne, order);
        }
} // {tree}
/*
 Pascal original has order passed-by-reference.
 Since JavaScript passes simple types by value,
 the dirty workaround (in this and the Java edition) is to 
 return the new value for order, and pray the calling
 routine assigns the return value to order.
 */
Monochrome.prototype.plugIn = function(gene, dx, dy) {
    var order = gene[8]; 
    dx[3] = gene[0];
    dx[4] = gene[1];
    dx[5] = gene[2];
    dy[2] = gene[3];
    dy[3] = gene[4];
    dy[4] = gene[5];
    dy[5] = gene[6];
    dy[6] = gene[7];
    dx[1] = -dx[3];
    dy[1] = dy[3];
    dx[0] = -dx[4];
    dy[0] = dy[4];
    dx[7] = -dx[5];
    dy[7] = dy[5];
    dx[2] = 0;
    dx[6] = 0;
    return order;
} // {PlugIn}

var clipBoarding = false;


var Mode = {
        Preliminary:1, 
        Breeding:2, 
        Albuming:3, 
        Phyloging:4, 
        Killing:5, 
        Moving:6, 
        Detaching:7, 
        Randoming:8, 
        Engineering:9, 
        Drifting:10, 
        Highlighting:11, 
        PlayingBack:12, 
        Triangling:13, 
        Sweeping:14
};

var theMode = Mode.Breeding;
Monochrome.prototype.develop = function() {
    // console.log('Develop')
    var drawingObject = this.drawer;
    // console.log(drawingObject)
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
    // // // // // console.log("develop order:" + order)
    this.pic.zeroPic(here);

    if(this.segNoGene < 1)
        this.segNoGene = 1;

    var	extraDistance;
    if(this.dGene[9] == SwellType.Swell)
        extraDistance = this.trickleGene;
    else if(this.dGene[9] == SwellType.Shrink)
        extraDistance = -this.trickleGene;
    else
        extraDistance = 0;

    var running = this.gene.slice();
    // // // // console.log("this.gene " + this.gene + "running:" + running);
    var incDistance = 0;
    // // // console.log("this.segNoGene " + this.segNoGene);
    // { FOR seg := 1 TO SegNoGene DO}
    var segNoGeneLimit = this.segNoGene + 1;
    for(let seg = 1; seg < segNoGeneLimit; seg++) {
        var oddOne = (seg % 2) == 1;
        // // // console.log("oddOne " + oddOne + " seg" + seg);
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
        var sizeWorry = this.segNoGene * this.twoToThe(this.gene[8]);
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



// Globals, lines 205-206
// TYPE
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);



$.widget("dawk.monochrome_genebox", {
    options : {
        geneboxCollection: null,
        geneboxIndex : 0,
        value : 0,
        gradientValue : SwellType.Same,
        hasMid: true,
        hasGradient: true,
        hasLeftRight: true,
        hasColor: false,
        showSign: false,
        title: ''
    },
    _create : function(options) {
        this._setOptions(options);
        
        this.element.addClass("genebox");
        $(this.element).tooltip();
        this.element.attr('title', this.options.title);
    },
    _init: function() {
        // HTML template for the manipulation areas of the genebox.
        var str =  '\
            <div class="geneboxInfo"> \
                <img src="img/swellcircle.png" class="gradientGene gradientSame" /> \
                <span class="geneValue"></span> \
            </div>';
        var engineering = this.options.geneboxCollection.options.engineering;
        if(engineering) {
            str += '<div class="geneboxNavi">';
                if(this.options.hasLeftRight) {
                    str += '<div class="geneboxLeft"></div>';
                }
                str += '<div class="geneboxMid"> ';
                if(this.options.hasGradient) {
                    str += 
                        '<div class="geneboxUp"></div> \
                        <div class="geneboxEquals"></div> \
                        <div class="geneboxDown"></div>';
                }
                else {
                    str += '<div class="geneboxEquals"></div>';
                }
                str += '</div>';
            
                if(this.options.hasLeftRight) {
                    str += '<div class="geneboxRight"></div>';
                 }
            str +='</div>';
        }
        this.element.append($.parseHTML(str));
        if(engineering) this._on( $(this.element).find('.geneboxLeft, .geneboxMid, .geneboxUp, .geneboxEquals, .geneboxDown, .geneboxRight'), {
            click: "_manipulate"
          });
        
        this.refresh();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
//        // console.log('genebox set options' + options);
        this.refresh();
    },

    refreshValue: function() {
        var str = this.options.value;
        if(this.options.showSign) {
            // // console.log("Showsign " + this.options.showSign);
            str = "+s+" + String(str);
            // // console.log(str);
        }
        // // console.log(str);
        this.element.find('.geneValue').text(str);
        
    },
    
    refreshColor: function() {
        this.element.find('.geneValue').text(this.options.value);
        if(this.options.hasColor) {
            $(this.element).css('background-color', str);
        }
        
    },
    
    refreshGradient: function() {
        if(this.options.hasGradient) {
            var gradientImg = this.element.find('.gradientGene');
    //        // // console.log("gradientValue " + this.options.gradientValue);
            switch (this.options.gradientValue) {
            case SwellType.Swell:
    //            // // console.log('refresh finds Swell');
                gradientImg.removeClass('gradientSame gradientShrink');
                gradientImg.addClass('gradientSwell');
                break;
            case SwellType.Shrink:
    //            // // console.log('refresh finds Shrink');
                gradientImg.removeClass('gradientSame gradientSwell');
                gradientImg.addClass('gradientShrink');
                break;
            case SwellType.Same:
    //            // // console.log('refresh finds Same');
                gradientImg.removeClass('gradientShrink gradientSwell');
                gradientImg.addClass('gradientSame');
                break;
            default:
                // // console.log('Illegal gradientValue: '+ this.options.gradientValue);
            }
        }
    },
    
    refresh : function() {
        this.refreshValue();
        this.refreshColor();
        this.refreshGradient();
    },
    _constrain : function(value) {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        return value;
    },
    _manipulate: function(event) {
//        HorizPos = (LeftThird, MidThird, RightThird);
//        VertPos = (TopRung, MidRung, BottomRung);
        var target = $(event.target);
        var leftRightPos;
        var rung;
        // // console.log(target.attr('class'));
        if(target.hasClass('geneboxLeft')) {
            leftRightPos = HorizPos.LeftThird;
        } else if(target.hasClass('geneboxRight')) {
            leftRightPos = HorizPos.RightThird;
        } else if(target.hasClass('geneboxMid')) {
            leftRightPos = HorizPos.MidThird;
        }
        
        if(target.hasClass('geneboxUp')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.TopRung;
        } else if(target.hasClass('geneboxEquals')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.MidRung;
        } else if(target.hasClass('geneboxDown')) {
            leftRightPos = HorizPos.MidThird;
            rung = VertPos.BottomRung;
        }
        
        this.options.geneboxCollection.manipulate(this.options.geneboxIndex, leftRightPos, rung)
        return false;
    }
    
});

$.widget( "dawk.gene1to9box", $.dawk.monochrome_genebox, {
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    }

} );

$.widget( "dawk.segNoGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasColor = false;
        this.options.hasGradient = false;
        this._super();
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
} );

$.widget( "dawk.segDistGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = true;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        if(Number(str) > 0) {
            this.element.find('.geneValue').text("+" + str);
        }
        else {
            this.element.find('.geneValue').text(str);
        }
    },
} );


$.widget( "dawk.completenessGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.element.attr('title', 'Completeness');

        this.options.showSign = true;
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        // // console.log(str);
        var properties = CompletenessType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );


$.widget( "dawk.spokesGenebox", $.dawk.monochrome_genebox, {
    _init : function() {
        this.element.attr('title', 'Spokes');
        this.options.hasLeftRight = true;
        this.options.hasMid = true;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    refresh: function() {
        this.refreshGradient();
        var str = this.options.value;
        // // console.log(str);
        var properties = SpokesType.properties[str];
        if(properties != null) {
            this.element.find('.geneValue').text(properties.geneboxName);
        }
    },
} );

$.widget('dawk.geneboxes', {
    options : {
        engineering: true,
        numGeneBoxes : 16,
        biomorph: null,
    },    
    _create: function(options) {
        this._setOptions(options);
        $(this.element).addClass('geneboxes')
    },
    manipulate: function(geneboxIndex, leftRightPos, rung) {
        console.log(this.options.biomorph)
        this.options.biomorph.manipulation(geneboxIndex, leftRightPos, rung);
        console.log('geneboxes widget finished calling manipulation on geneboxIndex ' + geneboxIndex);
        var canvas = $(this.element).parent().find('canvas').get(0);
        this.updateFromCanvas(canvas);
        console.log('geneboxes widget calling develop on ');
        console.log(this.options.biomorph)
        this.options.biomorph.develop();
    },

})

$.widget('dawk.monochrome_geneboxes', $.dawk.geneboxes, {
    options : {
        numGeneBoxes : 16,
    },

    updateFromCanvas: function(canvas) {

        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            // console.log('updateFromCanvas: no biomorph on canvas.')
            // console.log(canvas);
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
//      // console.log('update from canvas:  nGeneboxes ' + geneboxes.length + ' biomorph ' + biomorph);
        var genebox;
        for(let i = 0; i < 9; i++) {
            genebox = geneboxes.eq(i);
            genebox.gene1to9box("option", "value", biomorph.gene[i]);
            genebox.gene1to9box("option", "gradientValue", biomorph.dGene[i]);
            genebox.gene1to9box("refresh");
        }
        genebox = geneboxes.eq(9);
        genebox.segNoGenebox("option", "value", biomorph.segNoGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(10);
        genebox.segDistGenebox("option", "value", biomorph.segDistGene);
        genebox.segDistGenebox("option", "gradientValue", biomorph.dGene[9]);
        genebox.segDistGenebox("refresh");
        genebox = geneboxes.eq(11);
        genebox.completenessGenebox("option", "value", biomorph.completenessGene);
        genebox.completenessGenebox("refresh");
        genebox = geneboxes.eq(12);
        genebox.spokesGenebox("option", "value", biomorph.spokesGene);
        genebox.spokesGenebox("refresh");
        genebox = geneboxes.eq(13);
        genebox.segNoGenebox("option", "value", biomorph.trickleGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(14);
        genebox.segNoGenebox("option", "value", biomorph.mutSizeGene);
        genebox.segNoGenebox("refresh");
        genebox = geneboxes.eq(15);
        genebox.segNoGenebox("option", "value", biomorph.mutProbGene);
        genebox.segNoGenebox("refresh");

    },
    _create : function(options) {
        this._super(options)
        this.element.addClass("monochromeGeneboxes");

        for(let i = 0; i < 9; i++) {
            var geneBoxTitle = 'Gene and Gradient Gene '+(i+1);
            if(i == 8) {
                geneBoxTitle += '. Limited to values such that 2^Gene9 * Segment Number < 4096';
            }
            var geneBox = $("<div></div>").gene1to9box({
                geneboxCollection: this, 
                title: geneBoxTitle});
            geneBox.gene1to9box("option", "geneboxIndex", i + 1);
            this.element.append(geneBox);
        }
        var geneBox;
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Segment Number. Limited to values such that 2^Gene9 * Segment Number < 4096'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 10);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segDistGenebox({geneboxCollection: this, title: 'Segment Distance and Gradient Gene 10'});
        geneBox.segDistGenebox("option", "geneboxCollection", this);
        geneBox.segDistGenebox("option", "geneboxIndex", 11);
        this.element.append(geneBox);
        geneBox = $("<div></div>").completenessGenebox({geneboxCollection: this});
        geneBox.completenessGenebox("option", "geneboxCollection", this);
        geneBox.completenessGenebox("option", "geneboxIndex", 12);
        this.element.append(geneBox);
        geneBox = $("<div></div>").spokesGenebox({geneboxCollection: this});
        geneBox.spokesGenebox("option", "geneboxCollection", this);
        geneBox.spokesGenebox("option", "geneboxIndex", 13);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Trickle'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 14);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Size'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 15);
        this.element.append(geneBox);
        geneBox = $("<div></div>").segNoGenebox({geneboxCollection: this, title: 'Mutation Probability'});
        geneBox.segNoGenebox("option", "geneboxCollection", this);
        geneBox.segNoGenebox("option", "geneboxIndex", 16);
        this.element.append(geneBox);

        this.refresh();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    _setOptions : function(options) {
        this._super(options);
        this.refresh();
    },
    refresh : function() {
    },

    _destroy : function() {
        this.element.removeClass("monochromeGeneboxes").text("");
    }

});
/*
 * Constructor for the Monochrome biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */
function Monochrome(session, drawer) {
    this.session = session
    this.drawer = drawer
    // Hang the new biomorph off of the drawing element as a data attribute,
    // so the GUI can shift focus from one biomorph to another in response
    // to GUI events, such as mouseover in breeding view.
    this.gene = chromosome()
    this.dGene = new Array(10)
    for(let i = 0; i < 10; i++) {
        this.dGene[i] = SwellType.Same
    }
    this.segNoGene = 0
    this.segDistGene = 0
    this.completenessGene = CompletenessType.Single
    this.spokesGene = SpokesType.NorthOnly
    this.trickleGene = TRICKLE
    this.mutSizeGene = 0
    this.mutProbGene = 0
    this.pic = new Pic(this)
}

// Register the Monochrome biomorph species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Monochrome", 
        (function(session, drawer) { return new Monochrome(session, drawer);}),
        (function(session) { Monochrome.initializeSession(session);}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.monochrome_geneboxes.call(geneboxes, geneboxes_options) }),
        (function(geneboxes, canvas) { 
            $(geneboxes).monochrome_geneboxes('updateFromCanvas', canvas)})

);
