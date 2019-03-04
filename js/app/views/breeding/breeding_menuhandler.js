function BreedingMenuHandler(breedingView) {
    this.breedingView = breedingView
}

BreedingMenuHandler.prototype.menuclick = function(menuid, target) {
    let highlighting = $(this.breedingView.element).breedingView('option', 'highlighting')
    switch(menuid) {
    case 'Timing':
        this.breedingView.options.timingDialog.dialog('open') 
        return false
    case 'HelpWithCurrentOperation':
        if(highlighting) {
            $("<div>").helpDialog({helpkey: 'HIGHLIGHTING_HELP', appendTo: $(target).closest('.watchmakerView')})
        } else {
            $("<div>").helpDialog({helpkey: 'BREEDING_HELP', appendTo: $(target).closest('.watchmakerView')})
        }
        return false    
    case 'HighlightBiomorph':
        highlighting = ! highlighting
        $(this.breedingView.element).breedingView('option', 'highlighting', highlighting)
        let li = $(target).closest('li')
        if(highlighting) {
            $(li).addClass('checked')
            $(li).find('img').css('display', 'inline-block')
        } else {
            $(this.breedingView.element).find('.highlighted').removeClass('highlighted')
            $(li).removeClass('checked')
            $(li).find('img').css('display', 'none')
        }
        return false    
    }
    return true
}
