
Monochrome.initializeMut = function(session) {
    var mut = []

    mut.push(true)  // Segmentation // {** changed 1.1 **}
    mut.push(true)  // Gradient {** changed 1.1 **}
    mut.push(true)  // Asymmetry {** changed 1.1 **}
    mut.push(true)  // Radial Sym {** changed 1.1 **}
    mut.push(true)  // Scaling Factor {** changed 1.1 **}
    mut.push(false) // Mutation Size
    mut.push(false) // Mutation Rate
    mut.push(true)  // Tapering Twigs
    mut.push(true)  // Gene 9 Gradient (not in Classic Watchmaker)
    session.options.mut = mut
}

Monochrome.initializeSession = function(session) {
    Monochrome.initializeMut(session)
    session.options.sessionIcon = 'img/BWTreeLogoMonoThin_ICNO_17669_32x32.png';
    session.options.basicTypes = ["BasicTree", "Chess", "Insect", "Hopeful Monster"]
    session.options.defaultBasicType = "BasicTree";
    session.options.hopefulMonsterBasicType = "Hopeful Monster";
    session.viewGainedFocus = Monochrome.viewGainedFocus
    session.menuclick = Monochrome.menuclick
    session.buildMenus = Monochrome.buildMenus
    session.trianglable = true
    session.arrayable = true
    session.options.topOfTriangle = new Monochrome(session, null).doPerson('BasicTree')
    session.options.leftOfTriangle = new Monochrome(session, null).doPerson('Insect')
    session.options.rightOfTriangle = new Monochrome(session, null).doPerson('Chess')

}

Monochrome.buildMenus = function(menu) {
//    console.log('monochrome mutations menu')
    $("<li>").monochrome_mutationsmenu().insertBefore($(menu).find('.menuPedigree')[0])

}

Monochrome.toggleMut = function(mut, index, target) {
    mut[index] = ! mut[index]
    let li = $(target).closest('li')
    if(mut[index]) {
        $(li).addClass('checked')
        $(li).find('img').css('display', 'inline-block')
    } else {
        $(li).removeClass('checked')
        $(li).find('img').css('display', 'none')
    }
}

Monochrome.menuclick = function(event) {
    console.log('Monochrome menuclick')
    console.log(this)
    let options = this.options
    let target = event.target
    let menuid = $(target).data('menuid')
    console.log('BreedingView menu ' + menuid)
    let mut = options.mut
    switch(menuid) {
    case 'Segmentation':
        Monochrome.toggleMut(mut, 0, target)
        return false 
    case 'Gradient':
        Monochrome.toggleMut(mut, 1, target)
        return false 
    case 'Asymmetry':
        Monochrome.toggleMut(mut, 2, target)
        return false 
    case 'RadialSym':
        Monochrome.toggleMut(mut, 3, target)
        return false 
    case 'ScalingFactor':
        Monochrome.toggleMut(mut, 4, target)
        return false 
    case 'MutationSize':
        Monochrome.toggleMut(mut, 5, target)
        return false 
    case 'MutationRate':
        Monochrome.toggleMut(mut, 6, target)
        return false 
    case 'TaperingTwigs':
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'Gene9Gradient':
        Monochrome.toggleMut(mut, 8, target)
        return false 
    }
    console.log('returning true')
    return true // Event not processed
}

Monochrome.updateMutCheckbox = function(mut, view, index, name) {
    let menuitem = $(view).find('.menuitem' + name)[0]
    if(mut[index]) {
        $(menuitem).find('img').css('display', 'inline-block')
    } else {
        $(menuitem).find('img').css('display', 'none')
    }
}

Monochrome.viewGainedFocus = function(session, view) {
    let mut = session.options.mut
    Monochrome.updateMutCheckbox(mut, view, 0, 'Segmentation')
    Monochrome.updateMutCheckbox(mut, view, 1, 'Gradient')
    Monochrome.updateMutCheckbox(mut, view, 2, 'Asymmetry')
    Monochrome.updateMutCheckbox(mut, view, 3, 'RadialSym')
    Monochrome.updateMutCheckbox(mut, view, 4, 'ScalingFactor')
    Monochrome.updateMutCheckbox(mut, view, 5, 'MutationSize')
    Monochrome.updateMutCheckbox(mut, view, 6, 'MutationRate')
    Monochrome.updateMutCheckbox(mut, view, 7, 'TaperingTwigs')
    Monochrome.updateMutCheckbox(mut, view, 8, 'Gene9Gradient')
}

