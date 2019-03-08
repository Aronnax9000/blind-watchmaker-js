ColourBiomorph.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    var str = "Manipulation geneBoxIndex:" + geneboxIndex;
    let options = this.session.options
    let mut = options.mut
    let genes = options.genes

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
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
            if(mut[12]) {
                this.gene[geneboxIndex - 1] -= this.mutSizeGene;
            }
            break;
        case HorizPos.RightThird: 
            if(mut[12]) {
                this.gene[geneboxIndex - 1] += this.mutSizeGene;
            }
            break;
        case HorizPos.MidThird: 
            if(genes[1]) {
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
            }
            break;
        }
        break;
    case 9:
        if(mut[13]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.gene[8]--;
                let gene8Limit = mut[14] ? 0 : 1;
                if(this.gene[8] < gene8Limit) 
                    this.gene[8] = gene8Limit;
                break;
            case HorizPos.RightThird: 
                // The Pascal original incremented gene 9 unconditionally,
                // then backed off the change if the 2^gene9 times the segment
                // number gene value exceeded 4095.
                // This version does the test first, then increments gene 9 only
                // if it is safe to do so.
                var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8] + 1);
                if(sizeWorry <= WORRYMAX)
                    this.gene[8]++;
                break;
            case HorizPos.MidThird:
                if(genes[1]) {
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
                }
                break;
            }
        }
        break;
    case 10: 
        if(genes[0] && mut[0]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.segNoGene--;
                break;
            case HorizPos.MidThird: 
                break; //{No Action}
            case HorizPos.RightThird: 
                var sizeWorry = (this.segNoGene + 1) * Monochrome.twoToThe(this.gene[8]);
                if(sizeWorry <= WORRYMAX) {
                    this.segNoGene++;
                }
                break;
            }
        }
        break;
    case 11: 
        if(genes[0] && mut[0]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.segDistGene -= this.trickleGene;
                break;
            case HorizPos.MidThird:
                if(genes[1] && mut[1]) {
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
                }
                break;
            case HorizPos.RightThird: 
                this.segDistGene += this.trickleGene;
                break;
            }
        }
        break;
    case 12: 
        if(mut[2]) {
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
        }
        break;
    case 13: 
        if(mut[2]) {
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
        }
        break;
    case 14: 
        if(mut[4]) {
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
        }
        break;
    case 15: 
        if(mut[5]) {

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
        }
        break;
    case 16: 
        if(mut[6]) {

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
            }
        }

        break
    case 17:
        if(mut[11]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                if(this.thicknessGene > 1) {
                    this.thicknessGene--;
                }
                break;
            case HorizPos.RightThird: 
                if(this.thicknessGene < 100)
                    this.thicknessGene++;
                break;
            case HorizPos.MidThird: 
                break; // {No action}
            }
        }
        break
    case 18:
        if(mut[7]) {
            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.limbShapeGene = LimbType.Stick;
                break;
            case HorizPos.RightThird: 
                this.limbShapeGene = LimbType.Rectangle;
                break;
            case HorizPos.MidThird: 
                this.limbShapeGene = LimbType.Oval;
                break; // {No action}
            }
        }
        break
    case 19: // limbFillGene
        if(mut[8]) {

            switch(leftRightPos) {
            case HorizPos.LeftThird:
                this.limbFillGene = LimbFillType.Open
                break;
            case HorizPos.RightThird: 
                this.limbFillGene = LimbFillType.Filled
                break;
            }
        }
        break;
    case 20: // backColorGene
        if(mut[10]) {
            this.backColorGene = leftRightPos
        }
        break;
    case 21: 
        if(mut[9]) {
            this.colorGene[0] = leftRightPos
        }
        break;
    case 22: 
        if(mut[9]) {
            this.colorGene[1] = leftRightPos
        }
        break;
    case 23: 
        if(mut[9]) {
            this.colorGene[2] = leftRightPos
        }
        break;
    case 24: 
        if(mut[9]) {
            this.colorGene[3] = leftRightPos
        }
        break;
    case 25: 
        if(mut[9]) {
            this.colorGene[4] = leftRightPos
        }
        break;
    case 26: 
        if(mut[9]) {
            this.colorGene[5] = leftRightPos
        }
        break;
    case 27: 
        if(mut[9]) {
            this.colorGene[6] = leftRightPos
        }
        break;
    case 28: 
        if(mut[9]) {
            this.colorGene[7] = leftRightPos
        }
        break;
    }


    let gene8Limit = mut[14] ? 0 : 1;
    if(this.gene[8] < gene8Limit) {
        this.gene[8] = gene8Limit;
    }

    if(this.segNoGene < 1) {
        this.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}
