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
