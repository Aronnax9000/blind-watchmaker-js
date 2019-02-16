
$.widget('dawk.operationmenu', $.dawk.sub_menu, {
    options: {
        title: 'Operation'
    },
    _create: function() {
        this._super();
        this.appendmenuitem('Breed (B)', 'Breed', false, 'img/IconFlipBirdToBreedingGrid_ICON_00261_32x32.png')
        this.appendmenuitem('Drift (D)', 'Drift', false, 'img/IconDrift_ALAN_32x32.png')
        this.appendmenuitem('Engineering (E)', 'Engineering', false, 'img/Hypodermic_PICT_03937_32x32.png')
        this.appendmenuitem('New Random Start (N)', 'NewRandomStart', false, 'img/SixSidedDieShowsFiveIcon_ICON_00257_32x32.png')

        this.appendmenuitem('Hopeful Monster (M)', 'HopefulMonster')
        this.appendmenuitem('Initialize Fossil Record (I)', 'InitializeFossilRecord')
        this.appendmenuitem('Play Back Fossils', 'PlayBackFossils', false, 'img/IconFossilRecord_ALAN_32x32.png')
        this.appendcheckboxmenuitem('Recording Fossils (R)', 'RecordingFossils')
        if(this.options.session.trianglable) {
            this.appendmenuitem('Triangle (T)', 'Triangle', false, 'img/IconTriangle_ALAN_32x32.png')
        }
        if(this.options.session.arrayable) {
            this.appendmenuitem('Array', 'Array')
        }
    }
})
