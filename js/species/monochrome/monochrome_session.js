Monochrome.initializeGenes = function(session) {
    var genes = []

    genes.push(false)  // Segmentation // {** changed 1.1 **}
    genes.push(false)  // Gradient {** changed 1.1 **}
    genes.push(false)  // Asymmetry {** changed 1.1 **}
    genes.push(false)  // Radial Sym {** changed 1.1 **}
    genes.push(false)  // Scaling Factor {** changed 1.1 **}
    genes.push(false) // Mutation Size
    genes.push(false) // Mutation Rate
    genes.push(false)  // Tapering Twigs (Gene9 Gradient)
    session.options.genes = genes
}


Monochrome.initializeMut = function(session) {
    var mut = []

    mut.push(true)  // Segmentation // {** changed 1.1 **}
    mut.push(true)  // Gradient {** changed 1.1 **}
    mut.push(true)  // Asymmetry {** changed 1.1 **}
    mut.push(true)  // Radial Sym {** changed 1.1 **}
    mut.push(true)  // Scaling Factor {** changed 1.1 **}
    mut.push(false) // Mutation Size
    mut.push(false) // Mutation Rate
    mut.push(true)  // Tapering Twigs (Gene9 Gradient)
    session.options.mut = mut
}

//Really belongs on the session
Monochrome.initializeSession = function(session) {
    Monochrome.initializeMut(session)
    Monochrome.initializeGenes(session)
    session.options.sessionIcon = 'img/BWTreeLogoMonoThin_ICNO_17669_32x32.png';
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "Hopeful Monster"]
    session.options.defaultBasicType = "BasicTree";
    session.options.hopefulMonsterBasicType = "Hopeful Monster";
    session.updateMenus = Monochrome.updateMenus
    session.buildMenus = Monochrome.buildMenus
    session.menuclick = Monochrome.menuclick
    session.trianglable = true
    session.arrayable = true
    session.options.topOfTriangle = new Monochrome(session, null).doPerson('BasicTree')
    session.options.leftOfTriangle = new Monochrome(session, null).doPerson('Insect')
    session.options.rightOfTriangle = new Monochrome(session, null).doPerson('Chess')
    session.serializationSize = 40
}

