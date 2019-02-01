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

Monochrome.force2 = function(r) {
    var i = Math.round(r)
    if(i > 1) { 
        i = 1
    }
    if(i < 0) {
        i = 0
    }
    return i
}


// b.h := round(134 * ScreenWidth / 512);
// b.v := round(250 * ScreenHeight / 342);

Triangle.triangle = function(screenwidth, screenheight, b, m) {
    console.log(screenwidth + ',' + screenheight + ',' + b + ',' + m)
    // k is the equator of the triangle
    var k = Math.round(200.5 * screenheight / 340); // was 200. 
    // horizontal difference between the mouse and the left of triangle (b)
    // positive if to the right of b, 
    var x = m.h - b.h;
    // (screenheight - m.v) is how high up from the bottom we are
    // (screenheight - b.v) is how high up from the bottom point b is.
    // Difference is how much lower mouse is than b.
    var y = (screenheight - m.v) - (screenheight - b.v);

    var r1 = y / k;
    var r3 = (x - y / 2) / k;
    var r2 = (k - x - y / 2) / k;
    
    return [r1, r2, r3];
}

//// 470 x 116
//// top of triangle
//let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
//// 268 x 560 
//// left of triangle
//let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
//// 666 x 560 
//// right of triangle
//let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));


Monochrome.prototype.concoct = function(r, a, b, c) {
    var weight
    let r1 = r[0]
    let r2 = r[1]
    let r3 = r[2]
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

}

