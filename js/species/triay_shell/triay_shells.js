
/*
 * Constructor for the Triay Shell biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */

function Shells(session, drawer) {
    this.session = session
    this.drawer = drawer
}

Shells.initializeSession = function(session) {
    session.options['sessionIcon'] = 'img/SnailLogoBlackBackground_icl4_17669_16x16.png'
    session.options.basicTypes = [
        "Snail",
        "Turitella",
        "Bivalve",
        "Ammonite",
        "Nautilus",
        "Brachiopod",
        "Cone",
        "Whelk",
        "Scallop",
        "Eloise",
        "Gallaghers",
        "Rapa",
        "Lightning",
        "Sundial",
        "Fig",
        "Tun",
        "RazorShell",
        "JapaneseWonder"]
    session.options.defaultView = 'Engineering'
    session.options.defaultBasicType = "Snail"
    session.options.hopefulMonsterBasicType = "Hopeful Monster"
    session.options.mut = [true, true, true, true, true, false, false]
//    Topan := snail;
//    Leftan := Turritella;
//    Rightan := bivalve;
    session.options.wDetails = {
            start: 1.2,
            by: 1.5,
            till: 10
    }
    session.options.dDetails = {
            start: 0,
            by: 0.2,
            till: 0.6
}
    session.options.tDetails = {
            start: 0,
            by: 2,
            till: 8
    }    
    session.options.threshold = 20
}

//initializes the biomorph's genotype as one of a named set of types.
Shells.prototype.doPerson = function(morphType) {
    var genes = null
    if(morphType) {
        genes = (new ShellHardcodedAnimals())[morphType]
    }
    var drawer = this.drawer
    this.shell = new Shell(genes)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//  this.shell.mutProbGene = 100

} 
Shells.prototype.doSaltation = function() {
    this.shell.randomize()
}
//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
Shells.prototype.mutate = function() {
}
//creates and returns a new, mutated copy of the biomorph.
Shells.prototype.reproduce = function(element) {
    var child = new Shells(this.session, element)
    child.shell = this.shell.breed()
    return child
}
//called when it is time for the biomorph to draw itself. 
Shells.prototype.develop = function() {
//    alert('Shells.develop')
    this.shell.generate(this.drawer)
    this.shell.draw()
}

Shells.margarine = function (w, direction) {
    // {we want to change by large amounts when low, small amounts when large}
    var wMutSize = 0.1
    var logged = Math.log(w)
    var logchanged = logged + wMutSize * direction
    if(logchanged > 20) {
        logchanged = 20
    }
    var m = Math.exp(logchanged)

    if(m < 1) {
        m = 1
    }
    return m
}
