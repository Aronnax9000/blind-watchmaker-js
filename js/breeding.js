
function initGeneboxes(container, options) {
    var geneboxes = $("<div></div>").monochrome_geneboxes(options);
    container.append(geneboxes);
    return geneboxes;
}




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

function autoBreed(breedingBoxes) {

}

$( function() { 
    $.widget( "dawk.breedingAutoReproduceControl", {
        options: {
            startButton: null

        },
        _create: function() {
            var div = $('<div></div>');
            this.element.append(div);
            var button = $('<button>AutoReproduce</button>');
            this.options.startButton = button;
            div.append(button);
            this._on(button, {'click': 'startAutoBreeding'});
            var string = '<span> with delay of <input type="text"\
                class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
                milliseconds.</span>';
            div.append($(string));
        },
        startAutoBreeding: function() {
            this.options.autoRunning = true;
            this.autoBreed();
            this.measureGenerationRate(Number(document.getElementById('generations').value));
        },
        autoBreed: function() {
            var breedingWindow = $(this.element).parent();
            var breedingBoxes = $(this.element).parent().find('.boxes').get(0);
            if (autoRunning) {
                var useFitness = $(breedingWindow).find('.useFitness').get(0).checked;
                var numBoxes = $(boxes).breedingBoxes("option", "numBoxes");
                if (useFitness) {
                    var canvas = $(breedingBoxes).find('.box').get(0);
                    var biomorph = getBiomorphFromCanvas(canvas);
                    var bestSoFar = canvas;
                    var errorToBeat = fitness(biomorph, canvas.width, canvas.height);
                    $(breedingBoxes).each( function(index) {
                        canvas = this;
                        var currentError = fitness(getBiomorphFromCanvas(canvas),
                                canvas.width, canvas.height);
                        if (currentError < errorToBeat) {
                            bestSoFar = canvas;
                            errorToBeat = currentError;
                        }
                    });
                    $(bestSoFar).trigger('click');
                } else {
                    var luckyParent = Math.trunc(Math.random() * numBoxes);
                    $(breedingBoxes).find('.box').get(luckyParent).trigger('click');
                }
                setTimeout(function() {
                    autoBreed()
                }, Number(document.getElementById("autoReproduceInterval").value));
            }            
        }
    });
});

$( function() {
    $.widget( "dawk.breedingControl", {
        _create: function() {
            var string = '<div>\
                <input type="checkbox" class="useFitness" /> <span>Use Fitness\
                (Breed based on how well biomorph fits its box) <a\
                href="engineering.html">Engineering</a>\
                </span> <input type="checkbox" id="explosiveBreeding" /> <span>Explosive\
                Breeding </span>\
                </div>';
            var div = $($.parseHTML(string));
            this.element.append(div);
        }
    });
});
$( function() {
    $.widget( "dawk.breedingOffspringCounter", {
        _create: function() {
            var string = '<div>\
                Offspring count: <input type="number" value="0" id="generations" />\
                Offspring per second: <input type="number" value="0"\
                id="generationRate" />\
                </div>'
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
            $(this.element).breedingAutoReproduceControl();
            $(this.element).breedingControl();
            $(this.element).breedingOffspringCounter();
            var geneboxes = initGeneboxes(this.element, {
                numBoxes : 15,
                cols : 5,
                engineering : false
            });
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
            console.log(midCanvas);
            doPerson("BasicTree", midCanvas);
            $(midCanvas).trigger('mouseover');
//            $(midCanvas).trigger('click');
        }})});

