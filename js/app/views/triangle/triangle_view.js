$.widget( "dawk.triangleView", $.dawk.watchmakerView, {
    options: { 
        theMode: Mode.Triangling,
        species: null,
        biomorph: null,
        topOfTriangle: null,
        leftOfTriangle: null,
        rightOfTriangle: null,
        liveOne: null,
        inhibitspawn: false
    },
    viewGainedFocus: function(event) {
        let session = $(this).triangleView("option", "session")
        $(this).triangleView("updateMenus", session, this)
        session.updateMenus(session, this)
    },
    _create: function (options) {
        this._super()

        $(this.element).addClass('triangleView')
        var geneboxes_options = {
            engineering: false,
            session: this.options.session
        }
        var geneboxes = $("<div>");
        _speciesFactorySingleton.geneboxes(this.options.session.species, geneboxes, geneboxes_options)
        this.element.append(geneboxes);

        this.options.menuHandler.nextMenuHandler = new TriangleMenuHandler()
        let container = $("<div class='container'>")
        container.appendTo(this.element)

        // Draw triangle here
        let triangleDiv = $('<div class="triangleLineDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        triangleDiv = $('<div class="triangleDiv"><canvas class="triangleLineCanvas" width="1000" height="600"></canvas></div>')
        triangleDiv.appendTo(container)
        this._on(triangleDiv, {
            mousedown: function(event) { this.mousedown(event) },
            mouseup: function(event) { this.mouseup(event) },
            mousemove: function(event) { this.mousemove(event) },
        })
        this.drawTriangle()
        let sessionoptions = this.options.session.options
        this.options.topOfTriangle = sessionoptions.topOfTriangle
        this.addone(this.options.topOfTriangle, this.options.a)
        this.options.leftOfTriangle = sessionoptions.leftOfTriangle
        this.addone(this.options.leftOfTriangle, this.options.b)
        this.options.rightOfTriangle = sessionoptions.rightOfTriangle
        this.addone(this.options.rightOfTriangle, this.options.c)
        this.options.liveone = null
    },
    buildMenus: function(menu) {
        this._super('buildMenus')
    },
    bumper:  function(current, here) {
        let surround = current.surround
        let height = surround.bottom - surround.top;
        let width = surround.right - surround.left;
        let triangleDiv = $(this.element).find('.triangleDiv')[0]
        let pRect = new Rect(0, 0, $(triangleDiv).width(), $(triangleDiv).height())
        let error = here.v - (height / 2)
        if(error < 0) {
            here.v -= error
        } 
        error = here.v + (height / 2) 
        if(error > pRect.bottom) {
            here.v -= error - pRect.bottom
        }
        error = here.h - (width / 2)
        if(error < 0) {
            here.h -= error
        } 
        error = here.h + (width / 2) 
        if(error > pRect.right) {
            here.h -= error - pRect.right
        }
    },
    mousedown: function(event) {
        $(event.target).closest('.watchmakerView').find('canvas').removeClass('midBox')
        $(this.options.liveone).addClass('midBox')
        this.options.liveone = null
        this.options.inhibitspawn = false
    },
    mouseup: function(event) {
    },
    mousemove: function(event) {
        let canvas = this.options.liveone
        if(canvas != null) {
            let triangleDiv = $(this.element).find('.triangleDiv')
            let biomorph = $(canvas).data('genotype')
            let biomorphWidth = $(canvas).width()
            let biomorphHeight = $(canvas).height()
            let x = event.pageX - triangleDiv.offset().left 
            let y = event.pageY - triangleDiv.offset().top 
            if (x < triangleDiv.width() && y < triangleDiv.height() && x > 0 && y > 0) {
                let r = Triangle.triangle(
                        triangleDiv.width(),
                        triangleDiv.height(), 
                        this.options.b, new Point(x,y));
                let options = this.options.session.options
                biomorph.concoct(r, 
                        options.topOfTriangle, 
                        options.leftOfTriangle, 
                        options.rightOfTriangle);
                biomorph.develop()
                let surround = biomorph.getRect()
                $(canvas).attr('width', surround.right - surround.left)
                $(canvas).attr('height', surround.bottom - surround.top)
                biomorph.develop()
                let left = x - biomorphWidth / 2
                let top = y - biomorphHeight / 2
                $(canvas).css('left', left)
                $(canvas).css('top', top)
            }
        } else {
            if(! this.options.inhibitspawn) {
                this.options.inhibitspawn = true
                let triangleDiv = $(this.element).find('.triangleDiv')
                let triangleDivOffset = triangleDiv.offset()
                let x = event.pageX - triangleDivOffset.left
                let y = event.pageY - triangleDivOffset.top
                if(x < triangleDiv.width() && y < triangleDiv.height()
                        && x > 0 && y > 0) {
                    let m = new Point(x,y)
                    let triangleContext = triangleDiv.find('canvas')[0].getContext('2d')
                    let session = this.options.session
                    let biomorph = _speciesFactorySingleton.getSpecies(session.species, session, 
                            document.createElement('canvas'));
    
                    let options = this.options
                    let r = Triangle.triangle(
                            triangleDiv.width(),
                            triangleDiv.height(), 
                            this.options.b, m);
                    biomorph.concoct(r, options.topOfTriangle, options.leftOfTriangle, options.rightOfTriangle)
                    this.addone(biomorph, m)
                }
            }
        }
        var geneboxes = this.element.closest('.watchmakerView').find('.geneboxes').get(0);
        _speciesFactorySingleton.updateFromCanvas(
                this.options.session.species,
                geneboxes, this.options.liveone)

    },
    addone: function(biomorph, point) {
        let surround = biomorph.getRect()
        let biomorphWidth = surround.right - surround.left
        let biomorphHeight = surround.bottom - surround.top
        let left = point.h - biomorphWidth / 2
        let top = point.v - biomorphHeight / 2
        let canvas = $("<canvas class='triangleMorphCanvas'>")
        canvas.attr('height', Math.trunc(biomorphHeight))
        canvas.attr('width', Math.trunc(biomorphWidth))
        canvas.css('left', left)
        canvas.css('top', top)
        canvas.addClass('triangleBox')
        biomorph.drawer = canvas
        $(canvas).data('genotype', biomorph)
        this.options.liveone = canvas
        let triangleDiv = $(this.element).find('.triangleDiv')
        triangleDiv.append(canvas)
        biomorph.drawer = canvas[0]
        $(canvas).data('genotype', biomorph)
        biomorph.develop()
    },
    drawTriangle: function() {
        let triangleCanvas = $(this.element).find('.triangleLineCanvas')
        let screenWidth = triangleCanvas.width()
        let screenHeight = triangleCanvas.height()
        let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
        let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));
        this.options.a = a
        this.options.b = b
        this.options.c = c
        let ctx = triangleCanvas[0].getContext('2d')
        ctx.strokeStyle = 'Black';
        ctx.lineWidth = 1;
        ctx.beginPath()
        ctx.moveTo(a.h, a.v);
        ctx.lineTo(b.h, b.v);
        ctx.lineTo(c.h, c.v);
        ctx.lineTo(a.h, a.v);
        ctx.closePath()
        ctx.stroke()
    }

})
