ColourBiomorph.initializeMut = function(session) {
    var mut = []
    for(let i = 0; i < 14; i++) {
        mut.push(true)
    }
    session.options.mut = mut
}

ColourBiomorph.initializeGenes = function(session) {
    var genes = []

    genes.push(false) // Segmentation // {** changed 1.1 **}
    genes.push(false) // Gradient {** changed 1.1 **}
    genes.push(false) // Asymmetry {** changed 1.1 **}
    genes.push(false) // Radial Sym {** changed 1.1 **}
    genes.push(false) // Scaling Factor {** changed 1.1 **}
    genes.push(false) // Mutation Size
    genes.push(false) // Mutation Rate
    genes.push(false) // Limb Shape
    genes.push(false) // Limb Fill
    genes.push(false) // Colour
    genes.push(false) // Background Colour
    genes.push(false) // Thickness
    
    session.options.genes = genes
}


ColourBiomorph.initializeSession = function(session) {
    ColourBiomorph.initializeMut(session)
    ColourBiomorph.initializeGenes(session)
    session.options.sessionIcon = 'img/BWTreeLogoBlueThin_icl4_17669_32x32.png';
    session.options.trickle = 10
    session.options.palette = new Palette()
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "Hopeful Monster"]
    session.options.defaultBasicType = ["Hopeful Monster"]
    session.options.hopefulMonsterBasicType = ["Hopeful Monster"]
    session.options.defaultView = 'NewRandomStart';
    session.updateMenus = ColourBiomorph.updateMenus
    session.buildMenus = ColourBiomorph.buildMenus
    session.menuclick = ColourBiomorph.menuclick

    session.serializationSize = 55
}
