function make_canvas(canvasId) {
    canvas = document.createElement('canvas');
    var drawer = _drawerFactorySingleton.getDrawer('canvas2d', canvas);
    //console.log(drawer);
    jQuery.data(canvas, 'drawer', drawer);
    canvas.width = 200;
    canvas.height = 200;
    canvas.onclick = function() {
        doCanvasClicked(this.id)
    };
    canvas.id = canvasId;
    canvas.className = "breedingCanvas";
    return canvas;
}