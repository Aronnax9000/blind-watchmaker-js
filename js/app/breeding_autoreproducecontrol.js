$( function() { 
    $.widget( "dawk.breedingAutoReproduceControl", {
        options: {
            startButton: null,
            generationsPreviousSecond: 0,
        },
        _create: function() {
            $(this.element).addClass('autoReproduceControl');
            var div = $('<span></span>');
            this.element.append(div);
            var button = $('<button class="startAutoReproduce">Start</button>');
            this.options.startButton = button;
            div.append(button);
            this._on(button, {'click': this.startAutoBreeding});
            var string = '<span> autobreeding every <input type="text"\
                class="autoReproduceInterval" size="5" maxlength="10" value="5000" />\
                ms.</span>'
                
            $(string).appendTo(div)
            var useFitness = $('<span><input type="checkbox" class="useFitness" /> Use Fitness</span>')
            $(useFitness).tooltip();
            $(useFitness).attr('title', 'Breed based on how well biomorph fits its box');
            $(useFitness).appendTo(div)
            var explosiveBreeding = $('<span><input type="checkbox" checked class="explosiveBreeding" /> Explosive\
                Breeding</span>')

            this.element.append(explosiveBreeding);
            $(explosiveBreeding).tooltip();
            $(explosiveBreeding).attr('title', 'Whether breeding happens all-at-once or one-at-a time. Uncheck for classic Blind Watchmaker breeding animation');

            
            
        },
        startAutoBreeding: function(event) {
            var startButton = $(this.element).find('.startAutoReproduce').get(0);
            var text = $(startButton).text()
            if(text == 'Stop') {
                this.options.autoRunning = false;
                $(startButton).text('Start');
            } else {
                $(startButton).text('Stop');
                this.options.autoRunning = true;
                this.autoBreed();
                var generations = $(this.element).parents('.breedingView').find('.generations').get(0);
                this.measureGenerationRate(Number(generations.value));
            }
        },
        autoBreed: function() {
            var breedingView = $(this.element).parent();
            var breedingBoxes = $(this.element).parent().find('.boxes').get(0);
            if (this.options.autoRunning) {
                var useFitnessCheckbox = $(breedingView).find('.useFitness').get(0)
                var useFitness = false
                if(useFitnessCheckbox) {
                    useFitness = useFitnessCheckbox.checked;
                }
                var numBoxes = $(boxes).breedingBoxes("option", "numBoxes");
                if (useFitness) {
                    var canvas = $(breedingBoxes).find('.box').get(0);
                    var biomorph = getBiomorphFromCanvas(canvas);
                    var bestSoFar = canvas;
                    
                    var errorToBeat = biomorph.fitness(canvas);
                    $(breedingBoxes).find('.box').each( function(index) {
                        canvas = this;
                        var currentError = getBiomorphFromCanvas(canvas).fitness(canvas);
                        if (currentError < errorToBeat) {
                            bestSoFar = canvas;
                            errorToBeat = currentError;
                        }
                    });
                    $(bestSoFar).trigger('click');
                } else {
                    var luckyParent = Math.trunc(Math.random() * numBoxes);
                    var luckyCanvas = $(breedingBoxes).find('.box').get(luckyParent);
                    $(luckyCanvas).trigger('click');
                }
                var interval = Number($(this.element).parents('.breedingView')
                        .find('.autoReproduceInterval').get(0).value);
                this._delay(this.autoBreed, interval);
                
            }            
        },
        measureGenerationRate: function() {
            var generationCounter = $(this.element).parent().find('.generations').get(0);
            var newGenerationValue = Number(generationCounter.value) + 1;
            generationCounter.value = newGenerationValue;
            var generationRate = $(this.element).parent().find('.generationRate').get(0);
            generationRate.value = newGenerationValue - this.options.generationsPreviousSecond;
            this.options.generationsPreviousSecond = newGenerationValue;
            if(this.options.autoRunning)
                this._delay(this.measureGenerationRate, 1000);
        }
    });
});