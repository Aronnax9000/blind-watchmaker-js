
Monochrome.viewGainedFocus = function(session, view) {
    let mut = session.options.mut
    Monochrome.updateMutCheckbox(mut, view, 0, 'Segmentation')
    Monochrome.updateMutCheckbox(mut, view, 1, 'Gradient')
    Monochrome.updateMutCheckbox(mut, view, 2, 'Asymmetry')
    Monochrome.updateMutCheckbox(mut, view, 3, 'RadialSym')
    Monochrome.updateMutCheckbox(mut, view, 4, 'ScalingFactor')
    Monochrome.updateMutCheckbox(mut, view, 5, 'MutationSize')
    Monochrome.updateMutCheckbox(mut, view, 6, 'MutationRate')
    Monochrome.updateMutCheckbox(mut, view, 7, 'TaperingTwigs')
    Monochrome.updateMutCheckbox(mut, view, 8, 'Gene9Gradient')
    let menuitem = $(view).find('.menuitemDriftSweep')[0]
    if(session.options.driftsweep) {
        $(menuitem).find('img').css('display', 'inline-block')
    } else {
        $(menuitem).find('img').css('display', 'none')
    }
}
