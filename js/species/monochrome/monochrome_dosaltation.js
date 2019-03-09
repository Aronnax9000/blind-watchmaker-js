

Monochrome.prototype.doSaltation = function() {

    var mut = this.session.options.mut
    var genes = this.session.options.genes
    if(mut[0] && genes[0]) {
        this.segNoGene = Monochrome.randInt(6);
        this.segDistGene = Monochrome.randInt(20);
    } else {
        this.segNoGene = 1;
        this.segDistGene = 1;
    }
    var r = Monochrome.randInt(100);
    this.completenessGene = CompletenessType.Double;
    if(mut[2] && genes[2]) {
        if(r < 50) {
            this.completenessGene = CompletenessType.Single;
        } 
    }
    if(mut[3] && genes[3]) {
        r = Monochrome.randInt(100);
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
    if(mut[4] && genes[4]) {
        this.trickleGene = Monochrome.randInt(10);
        if(this.trickleGene > 1) {
            this.mutSizeGene = Math.trunc(this.trickleGene / 2);
        }
    }
    for(let j = 0; j < 8; j++) {
        var maxGene;
        do {
            console.log('mutSizeGene ' + this.mutSizeGene)
            this.gene[j] = Math.trunc(this.mutSizeGene * (Monochrome.randInt(19) - 10));
            if(mut[1] && genes[1]) {
                this.dGene[j] = Monochrome.randSwell(this.dGene[j]);
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
        if(mut[7] && genes[7]) {
            this.dGene[8] = Monochrome.randSwell(this.dGene[8]);
        } else {
            this.dGene[8] = SwellType.Same;
        }
        if(mut[1] && genes[1]) {
            this.dGene[9] = Monochrome.randSwell(this.dGene[8])
        } else {
            this.dGene[9] = SwellType.Same;
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
    } while (maxgene > 100 || maxgene < -100);
    this.gene[8] = Monochrome.randInt(6);
}

