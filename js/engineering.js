
$.widget('dawk.engineeringWindow', {
    options: {},
    _create: function() {
        var div = $("<div></div>")
        var geneboxes = initGeneboxes(div, {
            engineering : true
        });
        var boxes = $("<div></div>").engineeringBoxes({
            numBoxes : 1,
            cols : 1
        }).appendTo(div);
        this.element.append(div);
        var midCanvasDiv = $(boxes).engineeringBoxes("option", "midCanvasDiv");
        console.log(midCanvasDiv);
        var canvas = $(midCanvasDiv).find('canvas').get(0);
        console.log(canvas);
        console.log(canvas.height);
        doPerson("BasicTree", canvas);
    }
});