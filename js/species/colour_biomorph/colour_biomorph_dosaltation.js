
//Unlike Pascal original, uses 0-based arrays.
ColourBiomorph.prototype.doSaltation = function() {
    var mut = this.session.options.mut
    var genes = this.session.options.genes

    if(mut[0] && genes[0]) {
        this.segNoGene = Monochrome.randInt(6)
        this.segDistGene = Monochrome.randInt(20)
    } else {            
        this.segNoGene  = 1
        this.segDistGene = 1
    }
    var r = Monochrome.randInt(100)
    this.completenessGene = CompletenessType.Double
    if(mut[2] && genes[2]) {
        if(r < 50) 
            this.completenessGene = CompletenessType.Single
            else 
                this.completenessGene = CompletenessType.Double
    }
    r = Monochrome.randInt(100)
    if(mut[3] && genes[3]) {
        if(r < 33)
            this.spokesGene = SpokesType.Radial
            else if(r < 66) 
                this.spokesGene = SpokesType.NSouth
                else 
                    this.spokesGene = SpokesType.NorthOnly
    } else {
        this.spokesGene = SpokesType.NorthOnly
    }
    if(mut[4] && genes[0]) {
        this.trickleGene = 1 + Math.trunc(Monochrome.randInt(100) / 10)
        if(this.trickleGene > 1)
            this.mutSizeGene = Math.trunc(this.trickleGene / 2)
    }
    if(mut[9] && genes[9]) {
        this.randomForeColour()
    } else {
        for(let j = 0; j < 8; j++) {
            this.colorGene[j] = 0
        }
    }
    if(mut[7] && genes[7]) {
        this.limbShapeGene = ColourBiomorph.randLimbType()
    } else {
        this.limbShapeGene = LimbType.Stick
    }
    if(mut[8] && genes[8]) {
        this.limbFillGene = ColourBiomorph.randLimbFill()
    } else {
        this.limbFillGene = LimbFillType.Filled
    }
    if(mut[10] && genes[10]) {
        this.randomBackColour()
    } else {
        this.backColorGene = 215 // White
    }
    if(mut[11] && genes[11]) {
        this.thicknessGene = Monochrome.randInt(3)
    } else {
        this.thicknessGene = 1
    }

    var maxGene

    // Nested do straight outta Roger Emanuel Kaufman -- ABC
    for(let j = 0; j < 8; j++) do {
        if(mut[12]) {
            this.gene[j] = this.mutSizeGene * (Monochrome.randInt(19) - 10)
        }
        if(mut[1] && genes[1]) {
            this.dGene[j] = Monochrome.randSwell(this.dGene[j])
        } else {
            this.dGene[j] = SwellType.Same
        }
        switch(this.dGene[j]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: { 
            factor = 0
            break
        }
        case SwellType.Swell: {
            factor = 1
            break
        }
        }
        maxGene = this.gene[j] * this.segNoGene * factor
    } while ((maxGene > 9 * this.trickleGene) 
            || (maxGene < -9 * this.trickleGene));

    do {
        if(mut[1] && genes[1]) {
            this.dGene[9] = Monochrome.randSwell(this.dGene[9])
        } else {
            this.dGene[9] = SwellType.Same
        }

        var factor

        //  Pascal version used dGene[j] here, past the loop, 
        //  which is bad practice as the value of j
        //  is undefined past the loop. In fact, 
        //  in Mac Pascal, j = 9 past the loop, here
        //  decremented to 8 for 0-based arrays.
        switch(this.dGene[8]) {
        case SwellType.Shrink: {
            factor = 1
            break
        }
        case SwellType.Same: {
            factor = 0
            break
        }
        case SwellType.Swell: { 
            factor = 1
            break
        }
        }
        maxGene = this.segDistGene * this.segNoGene * factor
    } while(maxGene > 100 || maxGene < -100);

    do {
        this.gene[8] = Monochrome.randInt(6)
    } while(this.gene[8] <= 1);

    this.dGene[8] = SwellType.Same;

}

