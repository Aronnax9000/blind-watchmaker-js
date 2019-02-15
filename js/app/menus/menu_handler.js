function MenuHandler(session) {
    this.session = session
    this.nextMenuHandler = null
}
MenuHandler.prototype.getBiomorph = function(event) {
    let midCanvas = $(event.target).closest('.watchmakerView').find('.midBox').eq(0)
    return $(midCanvas).data('genotype')
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
        switch(menuid) {
        case 'AddBiomorphToAlbum':
            let biomorphs = this.session.album.biomorphs
            if(biomorphs.length < 60) {
                biomorphs.push(this.getBiomorph(event))
            } else {
                // poop
            }
            return false
        case 'LoadToAlbum':
            $("<div>").fileDialog({session:this.session, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'ShowAlbum':
            if(this.session.album.length != 0) {
                var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
                $(watchmakerSessionTab).watchmakerSessionTab(
                        "newAlbumView", this.session.album);
                
            } else {
                alert('Add Biomorph to Album first.')
            }
            return false
        case 'Breed': 
            console.log('Breeding')
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            biomorph = this.getBiomorph(event)
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newBreedingView", biomorph);
            return false
        case 'Engineering':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newEngineeringView", biomorph);
            return false
        case 'InitializeFossilRecord':
            this.session.fossilrecord = []
            this.session.fossilizing = true
            let recordingFossils = $(target).closest('.watchmakerMenuBar').find('.menuitemRecordingFossils').eq(0)
            $(recordingFossils).addClass('checked')
            $(recordingFossils).find('img').css('display', 'inline-block')
            return false
        case 'MakeTopOfTriangle':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            this.session.options.topOfTriangle = biomorph
            return false
        case 'MakeLeftOfTriangle':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            this.session.options.leftOfTriangle = biomorph
            return false
        case 'MakeRightOfTriangle':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            this.session.options.rightOfTriangle = biomorph
            return false            
        case 'DisplayPedigree':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newPedigreeView", biomorph);
            return false
        case 'Triangle':
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newTriangleView");
            return false
        case 'Drift':
            console.log('new drift view')
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newDriftView");
            return false
        case 'PlayBackFossils':
            let fossilrecord = this.session.fossilrecord
            if(fossilrecord != null && fossilrecord.length != 0) {
            var watchmakerSessionTab = $(target).closest('.watchmakerSessionTab').eq(0)
                $(watchmakerSessionTab).watchmakerSessionTab(
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
            var midCanvas = $(target).closest('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            console.log(this.session.options.hopefulMonsterBasicType)
            biomorph.doPerson(this.session.options.hopefulMonsterBasicType)
            biomorph.develop()
            return false
        case 'AboutClassicBlindWatchmaker':
            $("<div>").about({index:0, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutClassicExhibitionColour':
            $("<div>").about({index:1, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutClassicArthromorphs':
            $("<div>").about({index:2, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'AboutWatchmakerJS':
            $("<div>").about({index:3, appendTo: $(event.target).closest('.watchmakerView')[0]})
            return false
        case 'Donate':
            document.location = 'https://alancanon.net/donate' 
            return false
        case 'Quit':
            document.location = 'https://richarddawkins.net/' 
            return false
        }
        // Do generic stuff here
        // Then call view-specific handler
        if(this.nextMenuHandler) {
            this.nextMenuHandler.menuclick(event)
        }
        return true;
    }
}

