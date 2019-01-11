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

Monochrome.prototype.doPerson = function(biomorphType) {
    switch(biomorphType) {
    case "Chess": this.chess(); break;
    case "Insect": this.insect(); break;
    case "Hopeful Monster": this.doSaltation(); break;
    case "BasicTree": 
    default: 
        this.basicTree()
    }
    return this;
}
