$( function() {
    $.widget( "dawk.modeToolbar", {
        options: {
            parentView: null,
            session: null,
            species: null
        },
        _create: function() {
            $(this.element).addClass('breedingControl');
            var button 
            $('<span>Clone in new window:</span>').appendTo(this.element)
            
            button = $('<button>Breed</button>')
            this._on($(button), {'click': this.breedInNewWindow})
            $(this.element).append(button)

            button = $('<button>Engineer</button>')
            this._on($(button), {'click': this.engineer})
            $(this.element).append(button)
            
            button = $('<button></button>')
            $(button).text(this.options.session.options.hopefulMonsterBasicType)
            this._on($(button), {'click': this.hopefulMonster})
            $(this.element).append(button)
            
            var str = '<span><form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">\
<input type="hidden" name="cmd" value="_s-xclick" />\
<input type="hidden" name="hosted_button_id" value="DMY3SE245BZRQ" />\
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />\
<img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />\
</form><span>';
//            button = $(str)
//            $(this.element).append(button)
                

            
            let basicTypes = this.options.session.options.basicTypes
            var basicTypeSelect = $("<select></select>");
            $(this.element).append(basicTypeSelect)
            this._on(basicTypeSelect, {change: 'doPerson'})
            let option = $("<option>Animal</option>")
            $(basicTypeSelect).append(option)
            for(basicType in basicTypes) {
                option = $("<option>" + basicTypes[basicType] + "</option>")
                option.attr("value", basicTypes[basicType])
                $(basicTypeSelect).append(option)
            }
        },
        doPerson: function(event) {
            var midCanvas = $(this.element).parents('.watchmakerView').find('.midBox').eq(0)
            var basicTypeSelect = event.target
            var selectedValue = basicTypeSelect.options[basicTypeSelect.selectedIndex].value
            basicTypeSelect.selectedIndex = 0
            var biomorph = $(midCanvas).data('genotype')
            biomorph.doPerson(selectedValue)
            biomorph.develop()
        },
        hopefulMonster: function(event) {
            var midCanvas = $(this.element).parents('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            biomorph.doPerson($(event.target).text())
            biomorph.develop()
        },
        breedInNewWindow: function() {
            var midCanvas = $(this.element).parents('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(this.element).parents('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newBreedingView", biomorph)
        },
        engineer: function() {
            var midCanvas = $(this.element).parents('.watchmakerView').find('.midBox').eq(0)
            var biomorph = $(midCanvas).data('genotype')
            var watchmakerSessionTab = $(this.element).parents('.watchmakerSessionTab').eq(0)
            $(watchmakerSessionTab).watchmakerSessionTab(
                    "newEngineeringView", biomorph)
        }
    });
});