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