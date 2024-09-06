function MenuHandler(session) {
    this.session = session
    this.nextMenuHandler = null
}
MenuHandler.prototype.getBiomorph = function(target) {
    let midCanvas = $(target).closest('.watchmakerView').find('.highlighted canvas')
    
    if(midCanvas.length == 0) {
        midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
    } else {
        midCanvas = midCanvas.eq(0)
    }
    let biomorph = $(midCanvas).data('genotype')
	return biomorph
    /*let newBiomorph = _speciesFactorySingleton.getSpecies(
        this.session.species, this.session, null);
    biomorph.copyBiomorph(newBiomorph)

    return newBiomorph*/
}

MenuHandler.prototype.menuclick = function(event) {
    let result = this.session.menuclick(event)
    if(result) {
        let menuid = $(event.target).data('menuid')
        let target = event.target
        if(menuid.startsWith('Animal')) {
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox')[0]
            let ctx = midCanvas.getContext('2d')
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0,0, midCanvas.width, midCanvas.height)
            let biomorph = $(midCanvas).data('genotype')
            biomorph.doPerson(menuid.substring(6))
            biomorph.develop()
            return false
        }
        return this.handleMenu(menuid, target)
    }
}

MenuHandler.prototype.handleMenu = function(menuid, target) {
    switch(menuid) {
    case 'AddBiomorphToAlbum':
        let biomorphs = this.session.album.biomorphs
        if(biomorphs.length < 60) {
            biomorphs.push(this.getBiomorph(target))
            let watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", this.session.album, false);
        } else {
            var audio = new Audio('sounds/newbip.mp3');
            audio.play();
        }
        return false
    case 'Copy':
        this.session.clipboard = this.getBiomorph(target)
        return false
    case 'Cut': 
        this.session.clipboard = this.getBiomorph(target)
        this.handleMenu('Clear', target)
        return false
    case 'LoadToAlbum':
        $("<div>").fileDialog({session:this.session, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'ShowAlbum':
        if(this.session.album.length != 0) {
            let watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newAlbumView", this.session.album, true);
            
        } else {
            alert('Add Biomorph to Album first.')
        }
        return false
    case 'Breed': 
    case 'NewRandomStart':
         $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newBreedingView", this.getBiomorph(target), menuid == 'NewRandomStart');        
        return false
    case 'Engineering':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newEngineeringView", this.getBiomorph(target));
        return false
    case 'InitializeFossilRecord':
        this.session.fossilrecord = []
        this.session.fossilizing = true
        let recordingFossils = $(target).closest('.watchmakerMenuBar').find('.menuitemRecordingFossils').eq(0)
        $(recordingFossils).addClass('checked')
        $(recordingFossils).find('img').css('display', 'inline-block')
        return false
    case 'MakeTopOfTriangle':
        this.session.options.topOfTriangle = this.getBiomorph(target)
        return false
    case 'MakeLeftOfTriangle':
        this.session.options.leftOfTriangle = this.getBiomorph(target)
        return false
    case 'MakeRightOfTriangle':
        this.session.options.rightOfTriangle = this.getBiomorph(target)
        return false            
    case 'DisplayPedigree':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newPedigreeView", this.getBiomorph(target));
        return false
    case 'Triangle':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newTriangleView");
        return false
    case 'Drift':
        $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                "newDriftView");
        return false
    case 'PlayBackFossils':
        let fossilrecord = this.session.fossilrecord
        if(fossilrecord != null && fossilrecord.length != 0) {
        
            $(target).closest('.watchmakerSessionTab').watchmakerSessionTab(
                    "newPlayBackFossils");
        }
        return false
    case 'DriftSweep':
        let options = this.session.options
        options.driftsweep = ! options.driftsweep
        let li = $(target).closest('li')
        if(options.driftsweep) {
            $(li).addClass('checked')
            $(li).find('img').css('display', 'inline-block')
        } else {
            $(li).removeClass('checked')
            $(li).find('img').css('display', 'none')
        }
        return false
    case 'HopefulMonster':
        var biomorph = this.getBiomorph(target)
        biomorph.doPerson(this.session.options.hopefulMonsterBasicType)
        biomorph.develop()
        return false
    case 'AboutClassicBlindWatchmaker':
        $("<div>").about({index:0, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutClassicExhibitionColour':
        $("<div>").about({index:1, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutClassicArthromorphs':
        $("<div>").about({index:2, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'AboutWatchmakerJS':
        $("<div>").about({index:3, appendTo: $(target).closest('.watchmakerView')[0]})
        return false
    case 'Donate':
        document.location = 'https://alancanon.net/donate' 
        return false
    case 'Quit':
        document.location = 'https://richarddawkins.net/' 
        return false
    case 'MiscellaneousHelp':
        $("<div>").helpDialog({helpkey: 'MISCELLANEOUS_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
    }
    // Do generic stuff here
    // Then call view-specific handler
    if(this.nextMenuHandler) {
        this.nextMenuHandler.menuclick(menuid, target)
    }
    return true;

}
