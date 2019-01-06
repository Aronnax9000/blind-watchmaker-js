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
    console.log('new Shells')
    this.session = session
    this.drawer = drawer
}

Shells.initializeSession = function(session) {
    session.options['sessionIcon'] = 'img/SnailLogoBlackBackground_icl4_17669_32x32.png'
}

//initializes the biomorph's genotype as one of a named set of types.
Shells.prototype.doPerson = function(morphType) {
    console.log('Shells doPerson ' + morphType)
    var drawer = this.drawer
    this.shell = new Shell(drawer.getContext('2d'), 
            drawer.width,
            drawer.height,
            null)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//  this.shell.mutProbGene = 100

} 
Shells.prototype.doSaltation = function() {
    console.log('Shells.doSaltation')
    this.shell.randomize()
}
//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
Shells.prototype.mutate = function() {
    console.log('Shells.mutate')
}
//creates and returns a new, mutated copy of the biomorph.
Shells.prototype.reproduce = function(element) {
    var child = new Shells(this.session, element)
    child.shell = this.shell.breed(element)
    return child
}
//called when it is time for the biomorph to draw itself. 
Shells.prototype.develop = function() {
//    alert('Shells.develop')
    this.shell.generate()
    this.shell.ctx = this.drawer.getContext('2d')
    this.shell.draw()
}

Shells.prototype.copyBiomorph = function(child) {
    child.shell = new Shell (child.drawer.getContext('2d'), child.drawer.width, child.drawer.height, this.shell)
}

//FUNCTION margarine (W: real; direction: integer): real;
//{we want to change by large amounts when low, small amounts when large}
//VAR
//m, logged, logchanged, WMutSize: real;
//BEGIN
//WMutSize := 0.1;
//logged := ln(W);
//logchanged := logged + WMutSize * direction;
//IF logchanged > 20 THEN
//logchanged := 20;
//m := exp(logchanged);
//IF m < 1 THEN
//m := 1;
//margarine := m
//END;


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

Shells.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    // geneboxIndex is one-based
    var str = "Manipulation one-based geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    var shell = this.shell
    switch(geneboxIndex) {
    case 1:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.opening = Shells.margarine(shell.opening, -1)
            break;
        case HorizPos.RightThird: 
            shell.opening = Shells.margarine(shell.opening, 1)
            break;
        }
        break;;
    case 2:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.displacement -= shell.mutSize.displacement
            break;
        case HorizPos.RightThird: 
            shell.displacement += shell.mutSize.displacement
            break;
        }
        break;;
    case 3:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.shape -= shell.mutSize.shape
            break;
        case HorizPos.RightThird: 
            shell.shape += shell.mutSize.shape
            break;
        }
        break;;
    case 4:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translation -= shell.mutSize.translation
            break;
        case HorizPos.RightThird: 
            shell.translation += shell.mutSize.translation
            break;
        }
        break;
    case 5:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.handedness = -1
            break;
        case HorizPos.RightThird: 
            shell.handedness = 1
            break;
        }
        break;
    case 6:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.displacement -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.displacement += 0.1
            break;
        }
        break;
    case 7:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.translation -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.translation += 0.1
            break;
        }
        break;
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.coarsegraininess--
            break;
        case HorizPos.RightThird: 
            shell.coarsegraininess++
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.reach > 1) {
                shell.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.reach++
            break;
        }
        break;
    case 10:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, -1)
            break;
        case HorizPos.RightThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, 1)
            break;
        }
        break;
    case 11:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.shape > 0) {
                shell.mutSize.shape--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.shape++
            break;
        }
        break;
    case 12:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.reach > 1) {
                shell.mutSize.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.reach++
            break;
        }
        break;
    case 13:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(shell.mutProbGene > 1) {
                shell.mutProbGene--
            }
            break;
        case HorizPos.RightThird:
            if(shell.mutProbGene < 100) {
                shell.mutProbGene++
            }
            break;
        }
        break;
    case 14:
        var keys = Object.keys(Shell.patterns)
        keys.push('circle')
        var pattern
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] == shell.pattern) {
                pattern = i
                break
            }
        }
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(pattern > 0) {
                pattern--
            }
            break;
        case HorizPos.RightThird: 
            if(pattern < keys.length - 1) {
                pattern++
            }
            break;
        }
        shell.pattern = keys[pattern]
//        alert("Pattern " + pattern + ":" + shell.pattern)
        break;
    }
    
    if(shell.displacement < 0) {
        shell.displacement = 0
    } else if(shell.displacement > 100) {
        shell.displacement = 100
    }
    
}

//Register the species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Triay Shell", 
        (function(session, drawer) { return new Shells(session, drawer)}),
        (function(session) { Shells.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.shells_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).shells_geneboxes('updateFromCanvas', canvas)}));

