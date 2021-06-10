Shells.prototype.copyBiomorph = function(child) {
    child.shell = new Shell (child.drawer.getContext('2d'), child.drawer.width, child.drawer.height, this.shell)
}

