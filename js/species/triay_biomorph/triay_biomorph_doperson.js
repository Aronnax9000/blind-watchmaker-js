TriayBiomorphGeneTemplate.prototype.basicTree = function () {
    
    this.makeGenes(-10, -20, -20, -15, -15, 0, 15, 15, 7);
    this.segNoGene = 2;
    this.segDistGene = 150;
    this.symmetrical = false;
    this.dGenes[3] = 'Shrink'
    this.dGenes[4] = 'Shrink'
    this.dGenes[5] = 'Shrink'
    this.dGenes[8] = 'Shrink'
    this.trickleGene = 9;
}

TriayBiomorphGeneTemplate.prototype.chess = function () {
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

TriayBiomorphGeneTemplate.prototype.insect = function() {
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

TriayBiomorphGeneTemplate.prototype.makeGenes = function (a, b, c, d, e, f, g, h, i) {
    for(let s = 0; s < 10; s++) {
        this.dGenes.push("Same");
    }
    this.segNoGene = 1;
    this.segDistGene = 150;
    this.symmetrical = true;
    this.spokesGene = "Single";
    this.trickleGene = TRICKLE;
    this.mutSizeGene = Math.trunc(TRICKLE/2); // Trickle div 2;
    this.mutProbGene = 10;
    this.genes.push(a)
    this.genes.push(b)
    this.genes.push(c)
    this.genes.push(d)
    this.genes.push(e)
    this.genes.push(f)
    this.genes.push(g)
    this.genes.push(h)
    this.genes.push(i)
}

//initializes the biomorph's genotype as one of a named set of types.

function TriayBiomorphGeneTemplate() {
    this.segNoGene = 1
    this.segDistGene = 150
    this.symmetrical = true
    this.spokesGene = "Single"
    this.trickleGene = TRICKLE
    this.mutSizeGene = Math.trunc(TRICKLE/2) // Trickle div 2;
    this.mutProbGene = 10
    this.genes = []
    this.dGenes = []
}

TriayBiomorphs.prototype.doPerson = function(biomorphType) {
    let genes = null
    switch(biomorphType) {
   
    case "Chess":     
        genes = new TriayBiomorphGeneTemplate()
        genes.chess(); break;
    case "Insect": 
        genes = new TriayBiomorphGeneTemplate()
        genes.insect(); break;
    case "BasicTree": 
        genes = new TriayBiomorphGeneTemplate()
        genes.basicTree(); break;
    case "Hopeful Monster": 
    default: 
    }
    var drawer = this.drawer
    this.triay_biomorph = new Biomorph(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            genes)

    return this;
}
