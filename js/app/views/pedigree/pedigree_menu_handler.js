
function PedigreeMenuHandler() {
}

PedigreeMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'DrawOutOffspring':
    case 'Move':
    case 'Detach':
    case 'Kill':
        $(target).closest('.pedigreeView').pedigreeView('updatePedigreeModeCheckboxes', menuid)
        return false
    case 'NoMirrors':
    case 'SingleMirror':
    case 'DoubleMirror':
        $(target).closest('.pedigreeView').pedigreeView('updateMirrorCheckboxes', menuid)
        return false
    case 'HelpWithCurrentOperation':
        switch($(target).closest('.pedigreeView').pedigreeView('option', 'theMode')) {
        case Mode.Phyloging:
            $("<div>").helpDialog({helpkey: 'PEDIGREE_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Moving:
            $("<div>").helpDialog({helpkey: 'MOVING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Detaching:
            $("<div>").helpDialog({helpkey: 'DETACHING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        case Mode.Killing:
            $("<div>").helpDialog({helpkey: 'KILLING_HELP', appendTo: $(target).closest('.watchmakerView')})
            return false;
        }
        return false
    }
    return true;
}
