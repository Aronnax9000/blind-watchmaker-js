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
        $("<div>").helpDialog({helpkey: 'BREEDING_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false    
    }
    return true
}
