//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
ColourBiomorph.prototype.mutate = function() {

    var mut = this.session.options.mut
    var genes = this.session.options.genes

    if(mut[6] && genes[6] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutProbGene += this.direction9();
        if(this.mutProbGene < 1) {
            this.mutProbGene = 1
        } else if(this.mutProbGene > 100) {
            this.mutProbGene = 100
        }
    }

    if(mut[12]) {
        for(let j = 0; j < 8; j++) 
            if(Monochrome.randInt(100) < this.mutProbGene) 
                this.gene[j] += this.direction();

        if(Monochrome.randInt(100) < this.mutProbGene)
            this.gene[8] += this.direction9();

        if(this.gene[8] < 1)
            this.gene[8] = 1;
        else if(this.gene[8] > 8)
            this.gene[8] = 8;
    }
    if(mut[9] && genes[9]) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene) {
                this.colorGene[j] = this.colorGene[j] + this.direction9();
                if((this.colorGene[j] >= ColourBiomorph.Rainbow))
                    this.colorGene[j] = ColourBiomorph.Rainbow - 1;
                if((this.colorGene[j] < 0))
                    this.colorGene[j] = 0;
            }
    }

    if(mut[7] && genes[7] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbShapeGene = ColourBiomorph.randLimbType();

    if(mut[8] && genes[8] && Monochrome.randInt(100) < this.mutProbGene)
        this.limbFillGene = ColourBiomorph.randLimbFill();

    if(mut[10] && genes[10] && Monochrome.randInt(100) < this.mutProbGene) {
        this.backColorGene = this.backColorGene + this.direction9()

        if(this.backColorGene >= ColourBiomorph.Rainbow) 
            this.backColorGene = ColourBiomorph.Rainbow - 1
        
        if(this.backColorGene < 0) 
            this.backColorGene = 0
    }

    if(mut[11] && genes[11]  && Monochrome.randInt(100) < this.mutProbGene) {
        this.thicknessGene += this.direction9();
        if(this.thicknessGene < 1)
            this.thicknessGene = 1;
    }

    if(mut[0] && genes[0] && Monochrome.randInt(100) < this.mutProbGene) {
        this.segNoGene = this.segNoGene + this.direction9();
        if(this.segNoGene < 1) {
            this.segNoGene = 1;
        }
    }

    if(mut[1] && genes[1] && this.segNoGene > 1) {
        for(let j = 0; j < 8; j++)
            if(Monochrome.randInt(100) < this.mutProbGene / 2)
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene / 2)
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }

    if(mut[0] && genes[0] && this.segNoGene > 1 && Monochrome.randInt(100) < this.mutProbGene) {
        this.segDistGene = this.segDistGene + this.direction9()
    }


    if(mut[2] && genes[2] && Monochrome.randInt(100) < this.mutProbGene / 2) {
        if(this.completenessGene == CompletenessType.Single) {
            this.completenessGene = CompletenessType.Double
        } else {
            this.completenessGene = CompletenessType.Single
        }
    }

    if(mut[3] && genes[3] && Monochrome.randInt(100) < this.mutProbGene / 2) 
        switch(this.spokesGene) {
        case SpokesType.NorthOnly: 
            this.spokesGene = SpokesType.NSouth
            break
        case SpokesType.NSouth: 
            if(this.direction9() == 1) {
                this.spokesGene = SpokesType.Radial
            } else {
                this.spokesGene = SpokesType.NorthOnly
            }
            break
        case SpokesType.Radial: 
            this.spokesGene = SpokesType.NSouth
            break
        }

    if(mut[4] && genes[4] && Monochrome.randInt(100) < this.mutProbGene) {
        this.trickleGene = this.trickleGene + this.direction9();
        if(this.trickleGene < 1)
            this.trickleGene = 1
    }
    if(mut[5] && genes[5] && Monochrome.randInt(100) < this.mutProbGene) {
        this.mutSizeGene = this.mutSizeGene + this.direction9()
        if(this.mutSizeGene < 1)
            this.mutSizeGene = 1
    }
}
