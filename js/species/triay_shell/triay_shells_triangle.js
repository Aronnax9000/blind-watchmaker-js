Shells.force3 = function(r) {
    var i = Math.round(r)
    if(i > 3) { 
        i = 3
    }
    if(i < 1) {
        i = 1
    }
    return i
}

Shells.force2 = function(r) {
    var i = Math.round(r)
    if(i > 2) { 
        i = 2
    }
    if(i < 1) {
        i = 1
    }
    if(i == 1) 
        return CompletenessType.Single
    else 
        return CompletenessType.Double
}


// b.h := round(134 * ScreenWidth / 512);
// b.v := round(250 * ScreenHeight / 342);



//// 470 x 116
//// top of triangle
//let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
//// 268 x 560 
//// left of triangle
//let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
//// 666 x 560 
//// right of triangle
//let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));


Shells.prototype.concoct = function(r, a, b, c) {
    let r1 = r[0]
    let r2 = r[1]
    let r3 = r[2]
	
	
	this.shell.opening = r1 * a.shell.opening + r2 * b.shell.opening + r3 * c.shell.opening
	this.shell.displacement = r1 * a.shell.displacement + r2 * b.shell.displacement + r3 * c.shell.displacement
    this.shell.shape = r1 * a.shell.shape + r2 * b.shell.shape + r3 * c.shell.shape
	this.shell.translation = r1 * a.shell.translation + r2 * b.shell.translation + r3 * c.shell.translation
	this.shell.coarsegraininess = Math.round(r1 * a.shell.coarsegraininess + r2 * b.shell.coarsegraininess + r3 * c.shell.coarsegraininess)
    this.shell.reach = Math.round(r1 * a.shell.reach + r2 * b.shell.reach + r3 * c.shell.reach)
    if(r1 > r2)
		if(r1 > r3) 
			this.shell.pattern = a.shell.pattern
		else
		    this.shell.pattern = c.shell.pattern
	else
	    if(r2 > r3)
			this.shell.pattern = b.shell.pattern
		else
		    this.shell.pattern = c.shell.pattern
	
    this.shell.handedness = (r1 * a.shell.handedness 
		+ r2 * b.shell.handedness 
		+ r3 * c.shell.handedness) < 0 ? -1 : 1
    this.shell.translationGradient = r1 * a.shell.translationGradient + r2 * b.shell.translationGradient + r3 * c.shell.translationGradient
    if(genes.mutSize) {
        this.shell.mutSize = {
                displacement: r1 * a.shell.mutSize.displacement + r2 * b.shell.mutSize.displacement + r3 * c.shell.mutSize.displacement,
                translation: r1 * a.shell.mutSize.translation + r2 * b.shell.mutSize.translation + r3 * c.shell.mutSize.translation,
                shape: r1 * a.shell.mutSize.shape + r2 * b.shell.mutSize.shape + r3 * c.shell.mutSize.shape,
                reach: Math.round(r1 * a.shell.mutSize.reach + r2 * b.shell.mutSize.reach + r3 * c.shell.mutSize.reach)
        }
    }
    this.shell.mutProbGene = r1 * a.shell.mutProbGene + r2 * b.shell.mutProbGene + r3 * c.shell.mutProbGene
	/*
    this.segNoGene = Math.round(r1 * a.segNoGene + r2 * b.segNoGene + r3 * c.segNoGene)

    if(this.segNoGene < 1) {
        this.segNoGene = 1
    }

    this.segDistGene = Math.round(r1 * a.segDistGene + r2 * b.segDistGene + r3 * c.segDistGene);
    this.completenessGene = Monochrome.force2(r1 * a.completenessGene + r2 * b.completenessGene + r3 * c.completenessGene);
    this.spokesGene = Monochrome.force3(r1 * a.spokesGene + r2 * b.spokesGene + r3 * c.spokesGene);
    for(let j = 0; j < 9; j++) {
        this.gene[j] = Math.round(r1 * a.gene[j] + r2 * b.gene[j] + r3 * c.gene[j]);
    }
    var sizeWorry = this.segNoGene * Monochrome.twoToThe(this.gene[8]);
    if(sizeWorry > WORRYMAX) {
        this.gene[8]--
    }
    if(this.gene[8] < 1) {
        this.gene[8] = 1;
    }

    this.trickleGene = Math.round(r1 * a.trickleGene + r2 * b.trickleGene + r3 * c.trickleGene);
    this.mutSizeGene = Math.round(r1 * a.mutSizeGene + r2 * b.mutSizeGene + r3 * c.mutSizeGene);
    this.mutProbGene = Math.round(r1 * a.mutProbGene + r2 * b.mutProbGene + r3 * c.mutProbGene);

    if(this.mutProbGene < 1) {
        this.mutProbGene = 1
    }
    if(this.mutProbGene > 100) {
        this.mutProbGene = 100
    }
    for(let j = 0; j < 10; j++) {
        this.dGene[j] = Monochrome.force3(r1 * a.dGene[j] 
        + r2 * b.dGene[j] 
        + r3 * c.dGene[j]);
    }
*/
}

