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
	
	let ashell = a.shell;
	let bshell = b.shell;
	let cshell = c.shell;
	let genes = new Object();
	genes.opening = r1 * ashell.opening + r2 * bshell.opening + r3 * cshell.opening
	genes.displacement = r1 * ashell.displacement + r2 * bshell.displacement + r3 * cshell.displacement
    genes.shape = r1 * ashell.shape + r2 * bshell.shape + r3 * cshell.shape
	genes.translation = r1 * ashell.translation + r2 * bshell.translation + r3 * cshell.translation
	genes.coarsegraininess = Math.round(r1 * ashell.coarsegraininess + r2 * bshell.coarsegraininess + r3 * cshell.coarsegraininess)
    genes.reach = Math.round(r1 * ashell.reach + r2 * bshell.reach + r3 * cshell.reach)
    if(r1 > r2)
		if(r1 > r3) 
			genes.pattern = ashell.pattern
		else
		    genes.pattern = cshell.pattern
	else
	    if(r2 > r3)
			genes.pattern = bshell.pattern
		else
		    genes.pattern = cshell.pattern
	
    genes.handedness = (r1 * ashell.handedness 
		+ r2 * bshell.handedness 
		+ r3 * cshell.handedness) < 0 ? -1 : 1
    genes.translationGradient = r1 * ashell.translationGradient + r2 * bshell.translationGradient + r3 * cshell.translationGradient
    if(genes.mutSize) {
        genes.mutSize = {
                displacement: r1 * ashell.mutSize.displacement + r2 * bshell.mutSize.displacement + r3 * cshell.mutSize.displacement,
                translation: r1 * ashell.mutSize.translation + r2 * bshell.mutSize.translation + r3 * cshell.mutSize.translation,
                shape: r1 * ashell.mutSize.shape + r2 * bshell.mutSize.shape + r3 * cshell.mutSize.shape,
                reach: Math.round(r1 * ashell.mutSize.reach + r2 * bshell.mutSize.reach + r3 * cshell.mutSize.reach)
        }
    }
    genes.mutProbGene = r1 * ashell.mutProbGene + r2 * bshell.mutProbGene + r3 * cshell.mutProbGene
	this.shell = new Shell(genes)
}

