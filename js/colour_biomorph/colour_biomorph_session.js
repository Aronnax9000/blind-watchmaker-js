ColourBiomorph.initializeMut = function(session) {
    var mut = []
    for(let i = 0; i < 13; i++) {
        mut.push(true)
    }
    session.options.mut = mut
}


ColourBiomorph.initializeSession = function(session) {
    session.options.sessionIcon = 'img/BWTreeLogoBlueThin_icl4_17669_32x32.png'
    session.options.trickle = 10
    session.options.palette = new Palette()
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "New Random Start"]
    session.options.defaultBasicType = ["New Random Start"]
    session.options.hopefulMonsterBasicType = ["New Random Start"]
    
    ColourBiomorph.initializeMut(session)
}
