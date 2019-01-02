function _snail_doPerson(biomorphType, canvas) {
    
    var genotype = new Shell(canvas.getContext('2d'), canvas.width, canvas.height, null)
    genotype.draw();
    jQuery.data(canvas, "genotype", genotype);
    $(canvas).trigger('mouseover');

    return genotype;
}




function Snail() {
    this.doSaltation = _snail_doSaltation;
    this.geneboxes = $.fn.monochrome_geneboxes;
    this.doPerson = _snail_doPerson;
    this.tree = _snail_tree;
    this.plugIn = _snail_plugIn;
    this.develop = _snail_develop;
    this.drawPic = _snail_drawPic;
    this.actualLine = _snail_actualLine;
    this.picLine = _snail_picLine;
    this.zeroPic = _snail_zeroPic;
    this.reproduce = _snail_reproduce;
    this.makeGenes = _snail_makeGenes;
//    this.manipulation = _snail_manipulation;
    this.randSwell = _snail_randSwell;
    this.copyBiomorph = _snail_copyBiomorph;
    this.direction9 =_snail_direction9;
    this.direction = _snail_direction;
}



_speciesFactorySingleton.registerSpeciesType("Snail", (
        function() { 
            return new Monochrome();}));


//test
var snail = _speciesFactorySingleton.getSpecies("Snail");


