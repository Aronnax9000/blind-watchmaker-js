
ColourBiomorph.randLimbType = function() {
    switch(Monochrome.randInt(3)) {
    case 1:
        return LimbType.Stick
    case 2:
        return LimbType.Oval
    case 3:
        return LimbType.Rectangle
    }
}

ColourBiomorph.randLimbFill = function() {
    switch(Monochrome.randInt(2)) {
    case 1:
        return LimbFillType.Open
    case 2:
        return LimbFillType.Filled
    }
}

ColourBiomorph.prototype.makeGenes = function(a, b, c, d, e, f, g, h, i) {
    var trickle = this.session.options.trickle
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = SwellType.Same
    }
    this.segNoGene = 1;
    this.segDistGene = 1;
    this.completenessGene = CompletenessType.Double;
    this.spokesGene = SpokesType.NorthOnly;
    this.trickleGene = trickle;
    this.mutSizeGene = Math.trunc(trickle / 2);
    this.mutProbGene = 10;
    var gene = this.gene
    gene[1] = a
    gene[2] = b
    gene[3] = c
    gene[4] = d
    gene[5] = e
    gene[6] = f
    gene[7] = g
    gene[8] = h
    gene[9] = i
}

ColourBiomorph.prototype.chess = function() {
    var trickle = this.session.options.trickle
    let mut = this.session.options.mut
    let genes = this.session.options.genes

    this.makeGenes(-trickle, 3 * trickle, -3 * trickle, -3 * trickle, trickle, -2 * trickle, 6 * trickle, -5 * trickle, 7)
    for(let j = 0; j < 8; j++) {
        if(genes[9] && mut[9]) {
            this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
        } else {
            this.colorGene[j] = 0
        }
    }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }

    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
    this.thicknessGene = 1;
}

ColourBiomorph.prototype.basicTree = function() {
    var trickle = this.session.options.trickle
    let mut = this.session.options.mut
    let genes = this.session.options.genes
    
    this.makeGenes(-trickle, -trickle, -trickle, -trickle, -trickle, 0, trickle, trickle, 6);
    for(let j = 0; j < 8; j++) {
        if(genes[9] && mut[9]) {
            this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
        } else {
            this.colorGene[j] = 0
        }
    }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }
    this.limbShapeGene = LimbType.Stick
    this.limbFillGene = LimbFillType.Filled
    this.thicknessGene = 1
}

ColourBiomorph.prototype.insect = function() {
    var trickle = this.session.options.trickle
    let mut = this.session.options.mut
    let genes = this.session.options.genes
    this.makeGenes(trickle, 
            trickle, 
            -4 * trickle, 
            trickle, 
            -trickle, 
            -2 * trickle, 
            8 * trickle, 
            -4 * trickle, 
            6)
            for(let j = 0; j < 8; j++) {
                if(genes[9] && mut[9]) {
                    this.colorGene[j] = Math.trunc(ColourBiomorph.Rainbow / 2)
                } else {
                    this.colorGene[j] = 0
                }
            }
    if(genes[10] && mut[10]) {
        this.backColorGene = Math.trunc(ColourBiomorph.Rainbow / 3)
    } else {
        this.backColorGene = 215 // white
    }
    this.limbShapeGene = LimbType.Stick;
    this.limbFillGene = LimbFillType.Filled;
 
    this.thicknessGene = 1
}



//initializes the biomorph's genotype as one) { a named set) { types.
ColourBiomorph.prototype.doPerson = function(biomorphType) {
    if(biomorphType) {
        switch(biomorphType) {
        case "Chess": this.chess(); break;
        case "BasicTree": this.basicTree(); break;
        case "Insect": this.insect(); break;
        case "Hopeful Monster":
        default: 
            this.basicTree()
            this.doSaltation()
            break;
        }
    } else {
        this.basicTree()
        this.doSaltation()
    }
    return this;
} 
