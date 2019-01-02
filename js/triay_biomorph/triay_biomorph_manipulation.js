TriayBiomorphs.prototype.twoToThe = function(n) {
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


TriayBiomorphs.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
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
    var biomorph = this.triay_biomorph
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
            biomorph.genes[geneboxIndex - 1] -= biomorph.mutSizeGene;
            break;
        case HorizPos.RightThird: 
            biomorph.genes[geneboxIndex - 1] += biomorph.mutSizeGene;
            break;
        case HorizPos.MidThird: 
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[0];
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[1];
                break;
            case VertPos.BottomRung: 
                biomorph.dGenes[geneboxIndex - 1] = Biomorph.swellTypes[2];
                break;
            }
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.genes[8]--;
            break;
        case HorizPos.RightThird: 
            // The Pascal original incremented gene 9 unconditionally,
            // then backed off the change if the 2^gene9 times the segment
            // number gene value exceeded 4095.
            // This version does the test first, then increments gene 9 only
            // if it is safe to do so.
            var sizeWorry = biomorph.segNoGene * this.twoToThe(biomorph.genes[8] + 1);
            if(sizeWorry <= WORRYMAX)
                biomorph.genes[8]++;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[0]
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[1]
                break;
            case VertPos.BottomRung: 
                biomorph.dGenes[8] = Biomorph.swellTypes[2]
                break;
            }
            break;
        }
        break;
    case 10: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.segNoGene--;
            break;
        case HorizPos.MidThird: 
            break; //{No Action}
        case HorizPos.RightThird: 
            var sizeWorry = (biomorph.segNoGene + 1) * this.twoToThe(biomorph.genes[8]);
            if(sizeWorry <= WORRYMAX) {
                biomorph.segNoGene++;
            }
            break;
        }
        break;
    case 11: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.segDistGene -= biomorph.trickleGene;
            break;
        case HorizPos.MidThird:
            switch(rung) {
            case VertPos.TopRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[0]
                break;
            case VertPos.MidRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[1]
            case VertPos.BottomRung: 
                biomorph.dGenes[9] = Biomorph.swellTypes[2]
            }
            break;
        case HorizPos.RightThird: 
            biomorph.segDistGene += biomorph.trickleGene;
            break;
        }
        break;
    case 12: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.symmetrical = false;
            break;
        case HorizPos.MidThird: 
            break; // {No Action}
        case HorizPos.RightThird: 
            biomorph.symmetrical = true;
            break;
        }
        break;
    case 13: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            biomorph.spokesGene = Biomorph.spokesGenes[0];
            break;
        case HorizPos.MidThird: 
            biomorph.spokesGene = Biomorph.spokesGenes[1];
            break;
        case HorizPos.RightThird: 
            biomorph.spokesGene = Biomorph.spokesGenes[2];
            break;
        }
        break;
    case 14: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.trickleGene > 1)
                biomorph.trickleGene--;
            break;
        case HorizPos.RightThird: 
            biomorph.trickleGene++;
            break;
        case HorizPos.MidThird: 
            break;// {No action}
        }
        break;
    case 15: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.mutSizeGene > 1)
                biomorph.mutSizeGene--;
            break;
        case HorizPos.RightThird: 
            biomorph.mutSizeGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
        }
        break;
    case 16: 
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(biomorph.mutProbGene > 1) {
                biomorph.mutProbGene--;
            }
            break;
        case HorizPos.RightThird: 
            if(biomorph.mutProbGene < 100)
                biomorph.mutProbGene++;
            break;
        case HorizPos.MidThird: 
            break; // {No action}
            break;
        }
    }
    if(biomorph.genes[8] < 1) {
        biomorph.genes[8] = 1;
    }

    if(biomorph.segNoGene < 1) {
        biomorph.segNoGene = 1;
    }
//  Alert subscribers that the genome has changed here.
}
