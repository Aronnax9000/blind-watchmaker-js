Monochrome.prototype.mutate = function() {
    var mut = this.session.options.mut

    if(mut[6]) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            do 
                this.mutProbGene += this.direction9();
            while ((Math.abs(this.mutProbGene) > 100) || (this.mutProbGene == 0));
    for(let j = 0; j<8; j++) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            this.gene[j] += this.direction(this);
    if(Monochrome.randInt(100) < this.mutProbGene) 
        this.gene[8] += this.direction9();
    if(this.gene[8] < 1) 
        this.gene[8] = 1;
    var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
    if(sizeWorry > WORRYMAX) {
        this.gene[8]--; 
    }
    if(mut[0]) 
        if(Monochrome.randInt(100) < this.mutProbGene) {
            var j = this.direction9();
            this.segNoGene += j;
            if(j > 0) {
                sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
                if(sizeWorry > WORRYMAX) 
                    this.segNoGene--;
            }
        }
    if(this.segNoGene < 1) 
        this.segNoGene = 1;
    if((mut[1]) && (this.segNoGene > 1)) {
        for(let j = 0; j<8; j++) 
            if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
            this.dGene[9] = Monochrome.randSwell(this.dGene[9]);
    }
    if(mut[7])
        if((mut[8] && (Monochrome.randInt(100) < this.mutProbGene))) 
            this.dGene[8] = Monochrome.randSwell(this.dGene[8]);
    if((mut[0]) && (this.segNoGene > 1)) 
        if(Monochrome.randInt(100) < this.mutProbGene) 
            this.segDistGene = this.segDistGene + this.direction9();
    if(mut[2]) 
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
            if(this.completenessGene == CompletenessType.Single) 
                this.completenessGene = CompletenessType.Double;
            else 
                this.completenessGene = CompletenessType.Single;
    if(mut[3]) 
        if(Monochrome.randInt(100) < this.mutProbGene/2>>0) 
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
        if(Monochrome.randInt(100) < Math.abs(this.mutProbGene)) {
            this.trickleGene += this.direction9();
            if(this.trickleGene < 1) 
                this.trickleGene = 1;
        }
    if(mut[5]) 
        if(Monochrome.randInt(100) < Math.abs(this.mutProbGene)) {
            this.mutSizeGene += this.direction9();
            if(this.mutSizeGene < 1) 
                this.mutSizeGene = 1;
        }
    // Really only supposed to return true if mutation happened
    return true
    
}
