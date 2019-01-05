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

Monochrome.force3 = function(r) {
    var i = Math.round(r)
    if(i > 1) { 
        i = 1
    }
    if(i < 0) {
        i = 0
    }
    return i
}

Monochrome.concoct = function(r1, r2, r3, a, b, c, canvas) {
    var concoction = _speciesFactorySingleton.getSpecies(a.session.species, canvas)
    var weight;
    concoction.segNoGene = Math.round(r1 * a.segNoGene + r2 * b.segNoGene + r3 * c.segNoGene)
    
    if(concoction.segNoGene < 1) {
        concoction.segNoGene = 1;
    }
    
    concoction.segDistGene = round(r1 * a.SegDistGene + r2 * b.SegDistGene + r3 * c.SegDistGene);
    concoction.completenessGene = CompletenessType(Force2(r1 * Integer(a.CompletenessGene) + r2 * Integer(b.CompletenessGene) + r3 * Integer(c.CompletenessGene)));
    concoction.spokesGene = SpokesType(Force3(r1 * Integer(a.SpokesGene) + r2 * Integer(b.SpokesGene) + r3 * Integer(c.SpokesGene)));
    for(let j = 0; j < 9; j++) {
        concoction.gene[j] = Math.round(r1 * a.gene[j] + r2 * b.gene[j] + r3 * c.gene[j]);
    }
    var sizeWorry = concoction.segNoGene * Monochrome.twoToThe(gene[8]);
    if(sizeWorry > WorryMax) {
        concoction.gene[8]--
    }
    if(concoction.gene[8] < 1) {
        concoction.gene[8] = 1;
    }
    concoction.trickleGene = Math.round(r1 * a.trickleGene + r2 * b.trickleGene + r3 * c.trickleGene);
    concoction.mutSizeGene = Math.round(r1 * a.mutSizeGene + r2 * b.mutSizeGene + r3 * c.mutSizeGene);
    concoction.mutProbGene = Math.round(r1 * a.mutProbGene + r2 * b.mutProbGene + r3 * c.mutProbGene);
    if(concoction.mutProbGene < 1) {
        concoction.mutProbGene = 1
    }
    if(concoction.mutProbGene > 100) {
        concoction.mutProbGene = 100
    }
    for(let j = 0; j < 10; j++) {
        concoction.dGene[j] = SwellType.swellType(
                force3(r1 * Integer(a.dGene[j]) 
                        + r2 * Integer(b.dGene[j]) 
                        + r3 * Integer(c.dGene[j])));
        
    }
    
}

