Monochrome.buildMenus = function(menu) {
    $("<li>").monochrome_genesmenu().insertBefore($(menu).find('.menuPedigree')[0])
    $("<li>").monochrome_mutationsmenu().insertBefore($(menu).find('.menuPedigree')[0])
}
