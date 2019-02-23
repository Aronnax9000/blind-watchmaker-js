
function TriangleMenuHandler() {
}

TriangleMenuHandler.prototype.menuclick = function(menuid, target) {
    switch(menuid) {
    case 'HelpWithCurrentOperation':
        $("<div>").helpDialog({helpkey: 'TRIANGLE_HELP', appendTo: $(target).closest('.watchmakerView')})
        return false
        default:
    }
    return true;
}

