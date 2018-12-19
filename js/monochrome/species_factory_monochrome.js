function _monochrome_doPerson(biomorphType, canvas) {
    
    var genotype = new Person();
    switch(biomorphType) {
    case "Chess": this.chess(genotype); break;
    case "BasicTree": this.basicTree(genotype); break;
    case "Insect": this.insect(genotype); break;
    case "Saltation": this.doSaltation(genotype); break;
    }
    this.develop(genotype, canvas, drawCrossHairs); 
    jQuery.data(canvas, "genotype", genotype);
    $(canvas).trigger('mouseover');

    return genotype;
}




function Monochrome() {
    this.basicTree = _monochrome_basicTree;
    this.chess = _monochrome_chess;
    this.insect = _monochrome_insect;
    this.doSaltation = _monochrome_doSaltation;
    this.geneboxes = $.fn.monochrome_geneboxes;
    this.doPerson = _monochrome_doPerson;
    this.tree = _monochrome_tree;
    this.plugIn = _monochrome_plugIn;
    this.develop = _monochrome_develop;
    this.drawPic = _monochrome_drawPic;
    this.actualLine = _monochrome_actualLine;
    this.picLine = _monochrome_picLine;
    this.zeroPic = _monochrome_zeroPic;
    this.reproduce = _monochrome_reproduce;
    this.makeGenes = _monochrome_makeGenes;
//    this.manipulation = _monochrome_manipulation;
    this.randSwell = _monochrome_randSwell;
    this.copyBiomorph = _monochrome_copyBiomorph;
    this.direction9 =_monochrome_direction9;
    this.direction = _monochrome_direction;
}

_speciesFactorySingleton.registerSpeciesType("Monochrome", (
        function() { 
            return new Monochrome();}));


//test
var monochrome = _speciesFactorySingleton.getSpecies("Monochrome");
console.log("monochrome");
console.log(monochrome);

