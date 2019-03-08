ColourBiomorph.buildMenus = function(menu) {
    $("<li>").colour_biomorph_genesmenu().insertBefore($(menu).find('.menuPedigree')[0])
    $("<li>").colour_biomorph_mutationsmenu().insertBefore($(menu).find('.menuPedigree')[0])
}
