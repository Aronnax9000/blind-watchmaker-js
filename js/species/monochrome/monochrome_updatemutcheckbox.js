
Monochrome.updateMutCheckbox = function(mut, view, index, name) {
    let menuitem = $(view).find('.menuitem' + name)[0]
    if(mut[index]) {
        $(menuitem).find('img').css('display', 'inline-block')
    } else {
        $(menuitem).find('img').css('display', 'none')
    }
}
