
Monochrome.menuclick = function(event) {
    let options = this.options
    let target = event.target
    let menuid = $(target).data('menuid')
    let mut = options.mut
    switch(menuid) {
    case 'Segmentation':
        Monochrome.toggleMut(mut, 0, target)
        return false 
    case 'Gradient':
        Monochrome.toggleMut(mut, 1, target)
        return false 
    case 'Asymmetry':
        Monochrome.toggleMut(mut, 2, target)
        return false 
    case 'RadialSym':
        Monochrome.toggleMut(mut, 3, target)
        return false 
    case 'ScalingFactor':
        Monochrome.toggleMut(mut, 4, target)
        return false 
    case 'MutationSize':
        Monochrome.toggleMut(mut, 5, target)
        return false 
    case 'MutationRate':
        Monochrome.toggleMut(mut, 6, target)
        return false 
    case 'TaperingTwigs':
        Monochrome.toggleMut(mut, 7, target)
        return false 
    case 'Gene9Gradient':
        Monochrome.toggleMut(mut, 8, target)
        return false 
    }
    return true // Event not processed
}

