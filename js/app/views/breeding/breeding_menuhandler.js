function BreedingMenuHandler(breedingView) {
    this.breedingView = breedingView
}

BreedingMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'Timing':
        this.breedingView.options.timingDialog.dialog('open') 
        return false    
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'BREEDING_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false    
    case 'HighlightBiomorph':
        let highlighting = ! $(this.breedingView.element).breedingView('option', 'highlighting')
        $(this.breedingView.element).breedingView('option', 'highlighting', highlighting)
        let li = $(target).closest('li')
        if(highlighting) {
            $(li).addClass('checked')
            $(li).find('img').css('display', 'inline-block')
        } else {
            $(li).removeClass('checked')
            $(li).find('img').css('display', 'none')
        }
        return false    
    }
    return true
}
