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