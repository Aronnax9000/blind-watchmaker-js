


function fitness(biomorph, targetWidth, targetHeight) {
    var margin = biomorph.pic.margin;
    var marginWidth = margin.right - margin.left;
    var marginHeight = margin.bottom - margin.top;
    var widthError = Math.abs(targetWidth - marginWidth) / targetWidth;
    var heightError = Math.abs(targetHeight - marginHeight) / targetHeight;
    var averageError = (widthError + heightError) / 2;
    return averageError;
}

function getBiomorphFromCanvas(canvas) {

    var biomorph = jQuery.data(canvas, 'genotype');
    return biomorph;
}


$( function() {
    $.widget( "dawk.breedingControl", {
        _create: function() {
            $(this.element).addClass('breedingControl');
            var string = '<span>\
                <input type="checkbox" class="useFitness" /> <span>Use Fitness\
                (Breed based on how well biomorph fits its box)\
                </span> <input type="checkbox" id="explosiveBreeding" /> <span>Explosive\
                Breeding </span>\
                </span>';
            var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});
$( function() {
    $.widget( "dawk.breedingOffspringCounter", {

        _create: function() {
            $(this.element).addClass('breedingOffspringCounter');
            var string = '<span>Offspring count: <input type="number" value="0" class="generations" />\
                Offspring per second: <input type="number" value="0"\
                class="generationRate" />\
                </span>'
                var div = $.parseHTML(string);
            this.element.append(div);
        }
    });
});


$( function() {
    // the widget definition, where "custom" is the namespace,
    // "colorize" the widget name
    $.widget( "dawk.breedingWindow", {
        _create: function () {
            $(this.element).addClass('breedingWindow');
            $("<div></div>").breedingAutoReproduceControl().appendTo(this.element);
            $("<div></div>").breedingControl().appendTo(this.element);
            $("<div></div>").breedingOffspringCounter().appendTo(this.element);
            var geneboxes = $("<div></div>").monochrome_geneboxes({
                numBoxes : 15,
                cols : 5,
                engineering : false
            });
            this.element.append(geneboxes);
            var container = $("<div></div>");
            container.addClass('container');
            var boxes = $("<div></div>").breedingBoxes();
            var overlay = $("<div></div>");
            overlay.addClass("overlay");
            container.append(overlay);
            container.append(boxes);
            var overlayCanvas = $('<canvas></canvas>');
            overlayCanvas.attr('id', 'overlayCanvas');
            overlayCanvas.attr('width', 1000);
            overlayCanvas.attr('height', 600);
            overlayCanvas.addClass('overlayCanvas');
            overlay.append(overlayCanvas);
            this.element.append(container);
            var numBoxes = boxes.breedingBoxes("option", 'numBoxes');
            var cols = boxes.breedingBoxes("option", 'cols');

            var midCanvas = $(this.element).find('.midBox').get(0);
            doPerson("BasicTree", midCanvas);
            $(midCanvas).trigger('mouseover');
            $(midCanvas).trigger('click');
        }})});

