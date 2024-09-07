
//A shell is a set of genes which control roughly what Dawkins called
//flare, spire and verm, as discussed in Climbing Mount Improbable. 
//There are other genes which modify the behaviour of these.
//It's modeled around the idea of a spiraling tube. The genes determine how the 
//spiral unfolds, and at each stop, draws a given pattern (circle, or others).
//The naming comes from the original code
//- pattern: string which says what shape will be repeated and distorted
//- opening: called "flare" in the book, determines the speed at which the tube's diameter expands
//- displacement: called "verm" in the book, determines how close together the tube's whorls are
//- translation: called "spire" in the book, determines how much the tube piles on itself (the height)
//- coarsegraininess: how often is the pattern repeated along the spiral
//- reach: how much the spiral coils
//- handedness: wether the shells faces left or right
//- shape: how much the shell pattern gets distorted
//- translationGradient: modifies the translation's "easing"
//Additionally, we pass in an HTML5 canvas context, and width and height of the canvas
//The genes are optional (you'll get a random shell). 

function Shell (genes) {
	this.children = []


    this.mutProbGene = 50
    this.mutSize = {
            displacement: 0.01,
            translation: 0.1,
            shape: 1,
            reach: 1
    }

    this.segments = []
    this.nbSegments = 0

    this.type = 'shell';

    if (genes) {
        this.opening = genes.opening
        this.displacement = genes.displacement
        this.shape = genes.shape
        this.translation = genes.translation
        this.coarsegraininess = genes.coarsegraininess
        this.reach = genes.reach
        this.pattern = genes.pattern
        this.handedness = genes.handedness
        this.translationGradient = genes.translationGradient
        if(genes.mutSize) {
            this.mutSize = {
                    displacement: genes.mutSize.displacement,
                    translation: genes.mutSize.translation,
                    shape: genes.mutSize.shape,
                    reach: genes.mutSize.reach
            }
        }
        this.mutProbGene = genes.mutProbGene
    }
    else {
        this.randomize()
    }
}

Shell.prototype.randomize = function () {
    var genes = Shell.randomGenes()
    this.opening = genes.opening
    this.displacement = genes.displacement
    this.shape = genes.shape
    this.translation = genes.translation
    this.coarsegraininess = genes.coarsegraininess
    this.reach = genes.reach
    this.pattern = genes.pattern
    this.handedness = genes.handedness
    this.mutProbGene = 50
    this.translationGradient = genes.translationGradient
}

Shell.prototype.resetCentre = function () {
    this.centre = { x: this.origin.x, y: this.origin.y }

}

Shell.random = function(lower, upper) {
    return Math.random() * (upper - lower) + lower
}

Shell.randInt = function(lower, upper) {
    return Math.trunc(Math.random() * (upper - lower + 1)) + lower
}

Shell.randomSign = function() {
    if(Math.random() < 0.5) return -1
    else return 1;
}

//This produces a random set of genes which have visually
//pleasing characteristics (most of the time)
//Each shape has a different set of boundaries to make them look better
Shell.randomGenes = function () {
    var hardcodedAnimals = new ShellHardcodedAnimals()
    var choices = [
        hardcodedAnimals['Snail'], 
        hardcodedAnimals['Turitella'], 
        hardcodedAnimals['Bivalve'], 
        hardcodedAnimals['Ammonite'], 
        hardcodedAnimals['Nautilus'],
        hardcodedAnimals['Brachiopod'],
        hardcodedAnimals['Cone'],
        hardcodedAnimals['Whelk'],
        hardcodedAnimals['Scallop'],
        hardcodedAnimals['Eloise'], 
        hardcodedAnimals['Gallaghers'], 
        hardcodedAnimals['Rapa'], 
        hardcodedAnimals['Lightning'], 
        hardcodedAnimals['Sundial'], 
        hardcodedAnimals['Fig'],
        hardcodedAnimals['Tun'],
        hardcodedAnimals['RazorShell'],
        hardcodedAnimals['JapaneseWonder']]
    //Babylon and Angel aren't used because they're very similar to Bivalves
    return choices[Math.trunc(Math.random() * choices.length)]
}

//This is a hash of patterns. Each shape is a set of 2D coordinates relative to the first point.
//There are also w and h which are the original height and width of the shape (to allow scaling)
//These patterns can be used instead of circles to draw the shells.
Shell.patterns = {
        whelk: {points:[[0.22100000000000364,793.123],[79.92,-101.91],[103.64,-230.23],[61.47,-328.6],[91.36,-484.13],[132.64,-522.82],[132.64,-530.73],[169.55,-565.84],[175.71,-565.84],[264.44,-655.47],[361.13,-708.19],[415.59,-793.44],[492.93,-774.98],[499.94,-718.73],[558.82,-637.91],[624.73,-571.11],[637.91,-565.84],[673.02,-445.48],[649.29,-302.24],[594.84,-224.05],[552.66,-180.99],[545.65,-180.15],[504.31,-138.81],[235.44,3.53],[216.99,52.72],[181.88,-8.8],[97.53,-31.63]],w:673.02,h:846.16},
        wonder: {points:[[318.977,-0.3160000000000025],[-59.25,58.5],[-119.25,123.75],[-185.25,245.25],[-209.25,287.25],[-244.5,390],[-269.25,576],[-276,739.5],[-288,779.25],[-318.75,845.25],[-194.25,836.25],[-142.5,821.25],[-120.75,804],[-98.25,776.25],[-53.25,704.25],[15,615.75],[75,537.75],[135,440.25],[195.75,333.75],[249.75,243.75],[284.25,177],[307.5,144],[307.5,134.25],[294,121.5]],w:626.25,h:845.25},
        rapa: {points:[[215.622,22.551000000000002],[30.43,12.48],[83.49,60.09],[83.49,91.3],[72.57,120.95],[29.65,185.72],[-35.89,262.97],[-71.79,355.82],[-88.95,378.45],[-88.95,480.67],[-83.49,493.15],[-88.95,535.29],[-131.87,618],[-144.36,636.73],[-161.52,666.38],[-186.5,726.46],[-209.9,797.48],[-216.93,810.74],[-184.93,822.38],[-120.17,815.42],[-95.98,781.09],[-88.96,741.29],[-66.71,720.23],[-35.12,640.63],[-17.94,624.25],[-17.94,593.03],[-30.43,575.87],[7.02,564.16],[32.77,545.44],[52.28,554.01],[62.42,527.49],[97.54,515.78],[125.63,536.07],[125.63,505.64],[159.96,490.81],[191.95,504.08],[187.14,476.38],[221.61,460.38],[252.04,475.21],[247.36,447.12],[277.79,419.81],[301.98,426.83],[288.71,411.19],[319.14,380.79],[344.11,378.45],[330.44,366.56],[354.26,335.53],[372.99,343.34],[361.28,326.17],[372.99,269.99],[398.74,271.55],[378.45,240.34],[379.23,228.63],[404.2,230.97],[381.57,205.22],[379.23,188.05],[404.2,185.72],[373.77,170.89],[368.3,151.38],[386.25,142.8],[362.06,135.77],[348.02,120.95],[360.5,99.1],[340.21,110.8],[323.05,95.98],[330.85,71.01],[308.22,81.94],[296.52,49.94],[263.74,53.06],[246.58,47.6],[244.24,30.44],[217.7,36.68],[198.98,25.75],[197.42,4.69],[181.81,12.49],[161.52,11.71],[131.09,0],[115.49,-22.87],[100.66,-11.7]],w:621.12,h:845.25},
        tun: {points:[[130.995,-0.3160000000000025],[27.8,22.93],[52.02,40.59],[66.37,65.98],[66.37,134.14],[47.53,191.55],[10.76,247.16],[-24.22,282.13],[-52.92,318.91],[-63.69,339.54],[-71.75,348.51],[-66.38,498.29],[-66.38,696.51],[-85.21,750.32],[-97.77,787.1],[-113.02,807.73],[-119.29,824.77],[-130.95,839.12],[-130.95,845.25],[-109.42,837.32],[-98.66,829.25],[-47.54,819.39],[-32.29,809.52],[-1.8,786.2],[33.18,754.81],[90.59,702.79],[161.44,622.96],[198.22,579.91],[229.6,544.93],[286.11,447.17],[314.81,361.06],[324.68,296.49],[310.33,194.24],[291.49,139.53],[254.72,101.85],[241.27,96.48],[214.36,71.36],[166.82,47.14],[96.87,17.55],[50.23,4.99]],w:455.63,h:845.25},
        gallaghers: {points:[[294.727,-0.0660000000000025],[-60.75,60],[-95.25,122.25],[-109.5,163.5],[-138.75,192],[-157.5,237],[-177,259.5],[-181.5,317.25],[-169.5,409.5],[-174,553.5],[-194.25,615],[-229.5,648],[-243,674.25],[-261.75,717],[-277.5,775.5],[-295.5,796.5],[-295.5,806.25],[-270.75,798],[-219.75,818.25],[-193.5,840.75],[-177,840.75],[-127.5,787.5],[-122.25,774.75],[-102.75,756.75],[-60,733.5],[-30,725.25],[-17.25,719.25],[18.75,684.75],[66,666.75],[83.25,649.5],[127.5,501.75],[143.25,486.75],[143.25,473.25],[135.75,462.75],[162,445.5],[162,413.25],[149.25,402],[150,354],[167.25,337.5],[167.25,312.75],[155.25,299.25],[155.25,288],[167.25,264],[161.25,233.25],[144.75,223.5],[117.75,184.5],[113.25,164.25],[97.5,153],[75.75,84],[69,71.25],[48,49.5],[39.75,23.25],[24,6.75]],w:462.75,h:840.75},
        eloise: {points:[[353.773,-0.09300000000001774],[18.16,70.68],[5.19,211.68],[-19.9,284.34],[-58.82,345.76],[-143.6,455.62],[-226.64,516.17],[-298.44,586.24],[-323.52,642.46],[-341.69,658.9],[-354.66,690.91],[-340.82,740.55],[-269.03,816.34],[-183.39,838.83],[-141,844.29],[-83.91,826.71],[0,780],[49.3,741.72],[132.34,639],[167.81,534.34],[185.11,412.37],[185.11,359.6],[172.13,254.07],[150.51,154.59],[130.62,104.41],[111.59,74.14],[64.01,25.69],[29.41,10.13]],w:539.78,h:844.29},
        scallop: {points:[[-0.35900000000000887,293.629],[22.83,-34.26],[110.72,-58.88],[123.89,-71.16],[163.43,-161.69],[186.26,-185.41],[205.61,-209.14],[251.26,-232.86],[314.53,-267.13],[337.41,-278.56],[427.88,-292.59],[463.93,-293.49],[601.01,-266.23],[695.9,-202.13],[737.18,-165.22],[779.36,-114.24],[846.15,31.64],[846.15,212.62],[791.64,374.32],[715.2,452.5],[702.02,470.05],[568.48,548.29],[504.32,554.41],[417.33,554.41],[285.54,541.23],[241.62,513.13],[204.72,475.33],[159.9,412.96],[126.53,354.97],[109.82,337.41],[28.1,300.51],[22.83,288.17],[0,265.34]],w:846.15,h:847.89},
        lightning: {points:[[144.80399999999997,-0.8640000000000043],[11.7,22.63],[15.61,37.45],[0,87.39],[-24.97,107.68],[-49.16,150.6],[-67.1,181.03],[-84.27,197.41],[-84.27,216.93],[-79.59,235.65],[-97.53,260.62],[-104.56,314.45],[-104.56,337.09],[-80.37,379.22],[-80.37,433.84],[-117.82,551.66],[-132.65,614.87],[-145.13,789.66],[-145.13,847.39],[-133.43,835.7],[-112.36,841.16],[-87.39,832.57],[-78.81,815.4],[-71.78,717.87],[-43.69,604.72],[5.47,479.09],[23.41,448.66],[101.44,371.41],[124.85,329.27],[161.53,281.68],[179.47,189.6],[190.4,122.5],[190.4,79.58],[166.99,60.07],[153.72,65.53],[138.9,49.93],[93.64,35.88],[28.09,0]],w:335.53,h:847.39},
        razor: {points:[[175.09900000000005,-0.09500000000001307],[23.72,19.82],[47.45,106.81],[69.8,233.34],[81.72,358.49],[93.53,582.55],[93.53,781.63],[82.66,799.39],[63.89,816.84],[51.34,823.8],[15.82,836.29],[-20.77,846.52],[-63.27,846.15],[-79.08,832.96],[-93.63,813.57],[-110.4,779.94],[-123.26,748.31],[-134.81,706.13],[-145.98,652.46],[-157.53,574.33],[-166.07,519.29],[-175.35,431.04],[-175.66,251.42],[-169.39,202.34],[-156.53,142.02],[-143.34,104.8],[-128.22,86.04],[-122.94,73.49],[-110.4,67.9],[-104.81,61.31],[-54.09,54.72],[-29.37,42.17],[-8.59,20.77],[-2.32,9.28]],w:269.19,h:846.52},
        babylon: {points:[[261.341,17.070999999999984],[-21.07,23.41],[-34.33,28.09],[-148.26,245.8],[-224.73,407.32],[-243.45,444.77],[-262.18,500.18],[-262.18,531.39],[-252.04,648.43],[-218.49,715.54],[-172.45,763.14],[-117.05,799.03],[43.69,827.13],[81.15,827.13],[170.1,802.16],[321.48,699.93],[409.66,613.32],[455.7,494.71],[462.72,390.93],[451.01,335.53],[403.42,239.55],[351.14,169.33],[280.13,96.76],[266.08,89.73],[240.34,70.23],[213.8,47.6],[146.7,7.02],[109.24,-11.7],[84.27,-17.16],[60.09,-10.14]],w:724.9,h:844.29},
        oyster: {points:[[-0.46699999999998454,42.03999999999998],[39.01,41.36],[73.34,71.01],[81.93,92.07],[110.8,120.17],[137.33,135.77],[175.57,172.44],[205.22,201.32],[231.75,245.8],[240.33,275.44],[236.43,328.51],[203.66,432.29],[175.57,470.52],[145.13,528.26],[126.41,548.55],[101.44,578.98],[71.79,658.58],[88.95,681.2],[95.98,715.53],[84.27,767.82],[66.33,789.66],[66.33,799.03],[108.46,802.16],[230.97,778.74],[317.58,690.57],[348.8,643.75],[414.34,522.8],[442.43,419.8],[461.16,327.72],[451.02,245.01],[419.02,177.91],[390.15,137.34],[354.26,111.58],[295.74,53.84],[177.91,0],[103.78,-29.65],[60.86,-42.13],[34.33,-35.11],[14.04,-18.72]],w:461.16,h:844.29},
        angel: {points:[[582.789,-0.09300000000001774],[-24.22,23.09],[-57.09,47.32],[-179.06,119.98],[-246.53,161.5],[-286.32,185.72],[-377.16,252.32],[-447.22,318.07],[-508.64,375.16],[-519.02,379.48],[-559.68,468.58],[-583.03,530.86],[-576.11,630.34],[-532.86,708.19],[-438.57,804.21],[-352.07,844.29],[-136.68,844.29],[-6.06,820.64],[84.77,765.29],[162.62,686.57],[229.23,610.44],[262.97,506.64],[262.97,400.24],[237.88,303.36],[184.25,207.34],[132.34,139.01],[101.21,104.4]],w:846,h:844.29},
        sundial: {points:[[131,0],[134,0],[135,1],[141,1],[142,2],[145,2],[146,3],[146,5],[147,6],[147,7],[154,7],[155,6],[161,6],[162,7],[165,7],[166,8],[170,8],[171,9],[174,9],[175,10],[177,10],[178,11],[180,11],[181,12],[183,12],[184,13],[185,13],[186,14],[188,14],[189,15],[191,15],[192,16],[193,16],[194,17],[195,17],[196,18],[197,18],[199,20],[200,20],[201,21],[202,21],[203,22],[204,22],[205,23],[206,23],[212,29],[213,29],[218,34],[219,34],[223,38],[223,39],[227,43],[227,44],[231,48],[231,49],[232,50],[232,51],[233,52],[233,53],[234,54],[234,55],[235,56],[235,57],[239,61],[239,62],[240,63],[240,64],[241,65],[241,66],[242,67],[242,69],[243,70],[243,71],[244,72],[244,74],[245,75],[245,76],[246,77],[246,79],[247,80],[247,82],[248,83],[248,84],[249,85],[249,87],[250,88],[250,89],[251,90],[251,92],[252,93],[252,96],[250,98],[250,103],[249,104],[249,110],[248,111],[248,114],[250,116],[250,117],[252,119],[252,120],[253,121],[253,122],[255,124],[255,125],[256,126],[256,127],[258,129],[258,130],[257,130],[256,131],[252,131],[251,130],[248,130],[247,129],[243,129],[242,128],[238,128],[237,127],[234,127],[233,128],[231,128],[230,129],[228,129],[227,130],[225,130],[220,135],[220,136],[217,139],[217,140],[216,140],[215,139],[213,139],[212,138],[211,138],[210,137],[209,137],[208,138],[204,138],[203,139],[201,139],[198,142],[197,142],[195,144],[194,144],[191,147],[190,147],[188,149],[187,149],[186,150],[185,150],[184,151],[183,151],[182,152],[181,152],[180,153],[179,153],[178,154],[177,154],[176,155],[175,155],[174,156],[173,156],[172,157],[171,157],[170,158],[169,158],[168,159],[166,159],[165,160],[164,160],[163,161],[162,161],[161,162],[159,162],[158,163],[157,163],[156,164],[154,164],[153,165],[151,165],[150,166],[146,166],[145,167],[137,167],[136,168],[129,168],[128,169],[123,169],[122,170],[116,170],[115,169],[109,169],[108,168],[98,168],[97,167],[89,167],[87,165],[86,165],[83,162],[82,162],[80,160],[79,160],[78,159],[77,159],[75,157],[74,157],[73,156],[72,156],[71,155],[70,155],[68,153],[67,153],[66,152],[65,152],[64,151],[63,151],[62,150],[60,150],[59,149],[58,149],[57,148],[56,148],[54,146],[53,146],[51,144],[50,144],[48,142],[47,142],[45,140],[44,140],[41,137],[40,138],[39,138],[38,139],[37,139],[36,140],[35,140],[33,142],[32,142],[31,143],[29,143],[28,142],[27,142],[25,140],[25,139],[23,137],[23,136],[21,134],[21,133],[22,132],[22,131],[17,131],[16,132],[13,132],[11,130],[11,129],[14,126],[14,124],[13,123],[13,121],[12,120],[12,118],[4,110],[4,108],[3,107],[3,105],[2,104],[2,101],[1,100],[1,60],[2,60],[2,59],[4,57],[4,56],[3,55],[3,53],[2,52],[2,51],[3,50],[3,49],[4,48],[4,47],[5,46],[5,44],[6,43],[6,42],[7,41],[7,40],[8,39],[8,38],[9,37],[9,36],[10,35],[10,33],[11,32],[11,31],[12,30],[12,29],[21,20],[22,20],[28,14],[31,14],[32,13],[37,13],[38,12],[43,12],[44,11],[49,11],[50,10],[55,10],[56,9],[61,9],[62,8],[68,8],[69,7],[74,7],[75,6],[80,6],[81,5],[86,5],[87,4],[92,4],[93,3],[98,3],[99,2],[103,2],[104,3],[110,3],[111,4],[116,4],[117,3],[121,3],[122,2],[125,2],[126,1],[130,1],[131,0],[131,0]],w:259,h:171},
}


//To draw the shell, we first have to generate all the bounding boxes along
//the spiral. The pattern is then scaled to fit these boxes and drawn
//Width and height are optional and useful if the canvas has changed size
Shell.prototype.generate = function (canvas) {
	this.ctx = canvas.getContext("2d");
	this.canvasWidth =  canvas.width
	this.canvasHeight =  canvas.height
	this.centre = { x: Math.round(canvas.width/2), y: Math.round(canvas.height/2) }
	this.origin = { x: this.centre.x, y: this.centre.y }
	
    this.resetCentre()

    this.segments = []

    // The variable naming comes from the original problem
    // Must admit, not everything is clear to me at the moment
    var size = 0.8
    var denom = 136 * size
    var r = 3
    var rad = 100
    var mnx = Math.round(-(100 / denom) * this.centre.x * 1.088)
    var mny = Math.round(-(100 / denom) * this.centre.y * 1.088)
    var rad1 = 1.088 * (rad + rad * this.displacement) / 2
    var rad2 = 1.088 * (rad - rad * this.displacement) / 2
    var start = this.reach * 360 // constant
    var m = start // gets altered on every turn of the loop

    var p, fw, t, i, grunge, xc, yc, xr, yr, h, g, f, k
    var lastH, lastG, lastF, lastK

    // Overview: m is based on the reach, so the number of rotation the spiral will do
    // m is altered on every turn of the loop by removing the coarsegraininess
    // This basically defines how many points we're covering on the spiral
    // This loop builds all the boxes along the spiral with the right amount of
    // distortion and sizing to produce the nice depth effect

    while (m >= 0) {

        p = (start - (start - m) * (1 - this.translationGradient)) / start
        t = this.translation * p

        i = m / 360
        fw = Math.exp(-i * Math.log(this.opening))
        grunge = fw * Math.cos(2 * Math.PI * i)

        xc = this.handedness * (rad1 * grunge)
        yc = -rad1 * t * (1 - fw)
        xr = this.handedness * (rad2 * grunge)
        yr = -rad2 * fw * this.shape // the minus signs are to invert the whole snail

        // We use rounded coordinates to make canvas happier
        h = Math.round(yc - yr - mny)
        g = Math.round(xc - xr - mnx)
        f = Math.round(yc + yr - mny)
        k = Math.round(xc + xr - mnx)

        // There seem to be a lot of repetition at the beginning of the algorithm
        // This skips the same boxes which would be drawn over
        // TODO: ensuite the surface is worth drawing at all!
        if (lastH !== h || lastG !== g || lastF !== f || lastK !== k) {
            this.segments.push({ startX: g, startY: f, endX: k, endY: h })
			    
            lastH = h
            lastG = g
            lastF = f
            lastK = k
        }

        m = m - this.coarsegraininess
    }

    this.nbSegments = this.segments.length

    this.setBoundingBox() // Calculate top/bottom

    this.translate(this.horizontalOffset(), this.verticalOffset()) // recentre shell
	this.setBoundingBox() // Calculate top/bottom again
    this.rect = new Rect(this.box.left, this.box.top, this.box.right, this.box.bottom)
    this.scaleToBox(0.8) // Make sure the shell fits in the box
}

//Stretches a shape to make it fit in a rectangle of w x h
//invert = -1 or 1 to invert the coordinates (handedness)
Shell.scaleToRect = function (shape, w, h, invert) {

    // Calculate ratios of sizeWeWant/sizeItWas
    var wRatio = w/shape.w
    var hRatio = h/shape.h

    // Scale every point in the shape by the the ratios (creates a new array)
    var scaled = []

    for(let i = 0; i < shape.points.length; i++) 
        scaled.push([shape.points[i][0] * wRatio * invert, shape.points[i][1] * hRatio])
        return scaled
}

Shell.prototype.verticalOffset = function () {

    var top = this.centre.y - this.box.top
    var bottom = this.box.bottom - this.centre.y

    return (top - bottom)/2
}

Shell.prototype.horizontalOffset = function () {

    var left = this.centre.x - this.box.left
    var right = this.box.right - this.centre.x

    return (left - right)/2
}

Shell.prototype.scaleToBox = function (ratio) {

    if (this.box.width > this.canvasWidth * ratio || this.box.height > this.canvasHeight * ratio) {
        var scale = Math.min((this.canvasWidth * ratio)/this.box.width, (this.canvasHeight * ratio)/this.box.height)
        this.scale(scale)
        this.translate(this.origin.x * (1 - scale), this.origin.y * (1 - scale))

        this.setBoundingBox()
    }
}

Shell.prototype.scale = function (scale) {

    this.centre.x = this.centre.x * scale
    this.centre.y = this.centre.y * scale

    var segment

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX = segment.startX * scale
        segment.startY = segment.startY * scale
        segment.endX = segment.endX * scale
        segment.endY = segment.endY * scale
    }
}

Shell.prototype.translate = function (offsetX, offsetY) {

    var segment

    this.centre.x += offsetX
    this.centre.y += offsetY

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        segment.startX += offsetX
        segment.startY += offsetY
        segment.endX += offsetX
        segment.endY += offsetY
    }
}

//Calculates the width/height and corner coordinates of the shell
//Useful to place multiple shells on a single canvas
Shell.prototype.setBoundingBox = function () {

    var segment
    var box = {
            left: Math.min(this.segments[0].startX, this.segments[0].endX),
            top: Math.min(this.segments[0].startY, this.segments[0].endY),
            right: Math.max(this.segments[0].startX, this.segments[0].endX),
            bottom: Math.max(this.segments[0].startY, this.segments[0].endY),
    }

    for (var i = 0; i < this.segments.length; i++) {
        segment = this.segments[i]

        if (segment.startX < box.left) {
            box.left = segment.startX
        }
        if (segment.startY < box.top) {
            box.top = segment.startY
        }
        if (segment.startX > box.right) {
            box.right = segment.startX
        }
        if (segment.startY > box.bottom) {
            box.bottom = segment.startY
        }

        if (segment.endX < box.left) {
            box.left = segment.endX
        }
        if (segment.endY < box.top) {
            box.top = segment.endY
        }
        if (segment.endX > box.right) {
            box.right = segment.endX
        }
        if (segment.endY > box.bottom) {
            box.bottom = segment.endY
        }
    }

    box.width = box.right - box.left
    box.height = box.bottom - box.top

    this.halfWidth = box.width/2
    this.halfHeight = box.height/2

    this.box = box
}

//For each box generated, this has to be called to draw the pattern
//with the right dimensions
Shell.prototype.drawPattern = function (segment, index) {

    // Height and width for the box
    // Generates a box and center coord of that box
    var w = Math.abs(segment.endX - segment.startX)
    var h = Math.abs(segment.endY - segment.startY)
    var rX = w/2
    var rY = h/2

    var thinThreshold = Math.floor(this.segments.length * 7 / 8)
    var thin = (w < 20 || h < 20)

    // If the box is too small we're going to draw an ellipse or a line
    // whatever the original pattern we've decided (it would be too small to tell)

    if (this.pattern === "circle" || (index < thinThreshold && thin)) {

        // If there's no width, let's draw a line!
        if (w === 0) {
            this.ctx.moveTo(segment.startX, segment.startY)
            this.ctx.lineTo(segment.endX, segment.endY)
        }
        else {

            // From http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
            var x = Math.min(segment.startX, segment.endX)
            var y = Math.min(segment.startY, segment.endY)
            var kappa = .5522848,
            ox = rX * kappa, // control point offset horizontal
            oy = rY * kappa, // control point offset vertical
            xe = x + w, // x-end
            ye = y + h, // y-end
            xm = x + w / 2, // x-middle
            ym = y + h / 2; // y-middle

            this.ctx.moveTo(x, ym)
            this.ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
            this.ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
            this.ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
            this.ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
        }
    }
    else {

        // Getting the scaled pattern points
        var invert = segment.endX < segment.startX ? -1 : 1
                var points = Shell.scaleToRect(Shell.patterns[this.pattern], w, h, invert)

                // We're drawing the chosen pattern stretched to fit a box point to point

                points[0] = [segment.startX + points[0][0], segment.startY + points[0][1]]

        this.ctx.moveTo(points[0][0], points[0][1])

        for (var i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[0][0] + points[i][0], points[0][1] + points[i][1])
        }

        this.ctx.closePath()
    }
}

Shell.prototype.draw = function () {

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

 

            this.ctx.beginPath()

            for (var i = 0; i < this.nbSegments; i++) {

                this.drawPattern(this.segments[i], i)
            }

    this.ctx.stroke()
}

//Opening is a logarithmic value so it has its own
//function to mutate it which converts it to meaningful values
Shell.mutateOpening = function (opening) {

    var wMutSize = 0.1
    var logged = Math.log(opening)
    var logchanged = logged + wMutSize * Shell.randomSign()

    if (logchanged > 20) {
        logchanged = 20
    }

    var m = Math.exp(logchanged)

    if (m < 1) {
        m = 1
    }

    return m
}

Shell.prototype.getGenes = function () {
    return {
        'pattern': this.pattern, 
        'shape': this.shape, 
        'displacement': this.displacement, 
        'translation': this.translation, 
        'translationGradient': this.translationGradient, 
        'opening': this.opening, 
        'handedness': this.handedness, 
        'reach': this.reach, 
        'coarsegraininess': this.coarsegraininess, 
        'mutSize': this.mutSize, 
        'mutProbGene': this.mutProbGene
    }
}

Shell.rand100 = function() {
    return Math.trunc(Math.random() * 100)
}


//Shell.randInt = function(lower, upper) {
//return Math.trunc(Math.random() * (upper - lower) + lower)
//}

//The breeding process is relatively straighforward compared to the rest
//It looks at each gene and rolls a D100. If it's under the probability, then
//the gene will mutate by a factor of the mutSize
//The original program's mutations were pretty limited, so to accentuate them
//we've added more parameters and a higher size mutation
Shell.prototype.breed = function () {
    var child = this.getGenes()
    if (Shell.rand100() < child.mutProbGene) {
        child.opening = Shell.mutateOpening(child.opening)
    }

    if (Shell.rand100() < child.mutProbGene) {
        child.displacement += Shell.randInt(-2, 2) * child.displacement * child.mutSize.displacement
        child.displacement = Math.min(Math.max(child.displacement, 0), 1)
    }

    if (Shell.rand100() < child.mutProbGene) {
        child.translation += Shell.randInt(-2, 2) * child.translation * child.mutSize.translation
    }

    if (Shell.rand100() < 1) {
        child.handedness = -child.handedness
    }


    if (Shell.rand100() < 5) {
        var patternKeys = Object.keys(Shell.patterns);
        child.pattern = patternKeys[Math.trunc(Math.random() * patternKeys.length)]
    }

    this.children.push(new Shell(child))

    return this.children[this.children.length - 1]

}
Shells.prototype.copyBiomorph = function(child) {
	console.log(child)
    child.shell = new Shell(this.shell)	
}

function ShellHardcodedAnimals() {

    return {
        'Snail': {
            mutProbGene: 50,
            opening: 1.66,
            displacement: 0,
            shape: 1.2,
            translation: 2,
            coarsegraininess: 4,
            reach: 5,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,
        },
        'Turitella': {
            mutProbGene: 50,
            opening: 1.30,
            displacement: 0,
            shape: 1,
            translation: 8.2,
            coarsegraininess: 8,
            reach: 10,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,  
        },
        'Bivalve': {
            mutProbGene: 50,
            opening: 1000,
            displacement: 0,
            shape: 1.2,
            translation: 0.5,
            mutProb: 50,
            coarsegraininess: 2,
            reach: 1,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,
        },
        Ammonite: {
            mutProbGene: 50,
            opening: 2,
            displacement: 0,
            shape: 1,
            translation: 0,
            coarsegraininess: 8,
            reach: 3,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,
        },
        Nautilus: {
            mutProbGene: 50,
            opening: 3.4,
            displacement: 0,
            shape: 1.2,
            translation: 0,
            coarsegraininess: 8,
            reach: 3,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,
        },
        Brachiopod: {
            mutProbGene: 50,
            opening: 10000,
            displacement: 0,
            shape: 1,
            translation: 0,
            coarsegraininess: 2,
            reach: 3,
            pattern: "circle",
            handedness: 1,
            translationGradient: 1,
        },
        Cone: {
            mutProbGene: 50,
            opening: 1.66,
            displacement: 0,
            shape: 3,
            translation: 3.5,
            coarsegraininess: 2,
            reach: 3,
            pattern: "whelk",
            handedness: 1,
            translationGradient: 1,
        },
        Whelk: {
            mutProbGene: 50,
            opening: 1.7,
            displacement: 0,
            shape: 2,
            translation: 4,
            coarsegraininess: 2,
            reach: 6,
            pattern: "whelk",
            handedness: 1,
            translationGradient: 1,

        },
        Scallop: {
            mutProbGene: 50,
            opening: 10000,
            displacement: 0,
            shape: 1,
            translation: 0,
            coarsegraininess: 2,
            reach: 3,
            pattern: "scallop",
            handedness: 1,
            translationGradient: 1,
        },
        Eloise: {
            mutProbGene: 50,
            opening: 1.4,
            displacement: 0,
            shape: 1.7,
            translation: 3.5,
            coarsegraininess: 4,
            reach: 6,
            pattern: "eloise",
            handedness: 1,
            translationGradient: 1,
        },
        Gallaghers: {
            mutProbGene: 50,
            opening: 1.66,
            displacement: 0,
            shape: 1.8,
            translation: 5,
            coarsegraininess: 4,
            reach: 6,
            pattern: "gallaghers",
            handedness: -1,
            translationGradient: 1,
        },
        Rapa: {
            mutProbGene: 50,
            opening: 1.66,
            displacement: 0,
            shape: 2,
            translation: 2.2,
            coarsegraininess: 4,
            reach: 9,
            pattern: "rapa",
            handedness: 1,
            translationGradient: 1,
        }, 
        Lightning: {
            mutProbGene: 50,
            opening: 1.66,
            displacement: 0,
            shape: 3.5,
            translation: 4,
            coarsegraininess: 4,
            reach: 6,
            pattern: "lightning",
            handedness: -1,
            translationGradient: 0.9,
        }, 
        Sundial: {
            mutProbGene: 50,
            opening: 1.384,
            displacement: 0.261,
            shape: 0.618,
            translation: 1.055,
            coarsegraininess: 2,
            reach: 10,
            pattern: "sundial", // pattern 152
            handedness: 1,
            translationGradient: 1,
        },
        Fig: {
            mutProbGene: 50,
            opening: 2,
            displacement: 0,
            shape: 3,
            translation: 3.5,
            coarsegraininess: 2,
            reach: 8,
            pattern: "tun", 
            handedness: 1,
            translationGradient: 0.95,
        }, 
        Tun: {
            mutProbGene: 50,
            opening: 2,
            displacement: 0,
            shape: 2,
            translation: 2.8,
            coarsegraininess: 2,
            reach: 8,
            pattern: "tun",
            handedness: 1,
            translationGradient: 1,
        },
        RazorShell: {
            mutProbGene: 50,
            opening: 1000,
            displacement: 0,
            shape: 8,
            translation: 6,
            coarsegraininess: 2,
            reach: 1,
            pattern: "razor",
            handedness: 1,
            translationGradient: 1,
        },
        JapaneseWonder: {
            mutProbGene: 50,
            opening: 1.7,
            displacement: 0,
            shape: 1.3,
            translation: 4.2,
            coarsegraininess: 2,
            reach: 8,
            pattern: "wonder",
            handedness: 1,
            translationGradient: 1,
        }
    }
}

Shells.force3 = function(r) {
    var i = Math.round(r)
    if(i > 3) { 
        i = 3
    }
    if(i < 1) {
        i = 1
    }
    return i
}

Shells.force2 = function(r) {
    var i = Math.round(r)
    if(i > 2) { 
        i = 2
    }
    if(i < 1) {
        i = 1
    }
    if(i == 1) 
        return CompletenessType.Single
    else 
        return CompletenessType.Double
}


// b.h := round(134 * ScreenWidth / 512);
// b.v := round(250 * ScreenHeight / 342);



//// 470 x 116
//// top of triangle
//let a = new Point(Math.round(234 * screenWidth / 512), Math.round(51 * screenHeight / 342));
//// 268 x 560 
//// left of triangle
//let b = new Point(Math.round(134 * screenWidth / 512), Math.round(250 * screenHeight / 342));
//// 666 x 560 
//// right of triangle
//let c = new Point(Math.round(333 * screenWidth / 512), Math.round(250 * screenHeight / 342));


Shells.prototype.concoct = function(r, a, b, c) {
    let r1 = r[0]
    let r2 = r[1]
    let r3 = r[2]
	
	let ashell = a.shell;
	let bshell = b.shell;
	let cshell = c.shell;
	let genes = new Object();
	genes.opening = r1 * ashell.opening + r2 * bshell.opening + r3 * cshell.opening
	genes.displacement = r1 * ashell.displacement + r2 * bshell.displacement + r3 * cshell.displacement
    genes.shape = r1 * ashell.shape + r2 * bshell.shape + r3 * cshell.shape
	genes.translation = r1 * ashell.translation + r2 * bshell.translation + r3 * cshell.translation
	genes.coarsegraininess = Math.round(r1 * ashell.coarsegraininess + r2 * bshell.coarsegraininess + r3 * cshell.coarsegraininess)
    genes.reach = Math.round(r1 * ashell.reach + r2 * bshell.reach + r3 * cshell.reach)
    if(r1 > r2)
		if(r1 > r3) 
			genes.pattern = ashell.pattern
		else
		    genes.pattern = cshell.pattern
	else
	    if(r2 > r3)
			genes.pattern = bshell.pattern
		else
		    genes.pattern = cshell.pattern
	
    genes.handedness = (r1 * ashell.handedness 
		+ r2 * bshell.handedness 
		+ r3 * cshell.handedness) < 0 ? -1 : 1
    genes.translationGradient = r1 * ashell.translationGradient + r2 * bshell.translationGradient + r3 * cshell.translationGradient
    if(genes.mutSize) {
        genes.mutSize = {
                displacement: r1 * ashell.mutSize.displacement + r2 * bshell.mutSize.displacement + r3 * cshell.mutSize.displacement,
                translation: r1 * ashell.mutSize.translation + r2 * bshell.mutSize.translation + r3 * cshell.mutSize.translation,
                shape: r1 * ashell.mutSize.shape + r2 * bshell.mutSize.shape + r3 * cshell.mutSize.shape,
                reach: Math.round(r1 * ashell.mutSize.reach + r2 * bshell.mutSize.reach + r3 * cshell.mutSize.reach)
        }
    }
    genes.mutProbGene = r1 * ashell.mutProbGene + r2 * bshell.mutProbGene + r3 * cshell.mutProbGene
	this.shell = new Shell(genes)
}


/*
 * Constructor for the Triay Shell biomorph species.
 * 
 * A biomorph is associated with a watchmaker session, and a drawing object.
 * 
 * From the watchmaker session, the biomorph may draw global rules such as
 * the settings for allowed mutations, and what sort of drawing context should
 * be used to render images. The biomorph may also report changes
 * in its state to the session. The supplied session object must include a property of
 * 'species', a string containing the name of the registered species.
 * 
 * The drawing object is the document element representing the drawing surface
 * for the biomorph's body. In the original implementation, this is an HTML canvas
 * element, but support is contemplated for other drawing contexts, such as a SVG 
 * Scalable Vector Graphic. 
 * 
 */

function Shells(session, drawer) {
    this.session = session
    this.drawer = drawer
}

Shells.initializeSession = function(session) {
    session.options['sessionIcon'] = 'img/SnailLogoBlackBackground_icl4_17669_16x16.png'
    session.options.basicTypes = [
        "Snail",
        "Turitella",
        "Bivalve",
        "Ammonite",
        "Nautilus",
        "Brachiopod",
        "Cone",
        "Whelk",
        "Scallop",
        "Eloise",
        "Gallaghers",
        "Rapa",
        "Lightning",
        "Sundial",
        "Fig",
        "Tun",
        "RazorShell",
        "JapaneseWonder"]
    session.options.defaultView = 'Engineering'
    session.options.defaultBasicType = "Snail"
    session.options.hopefulMonsterBasicType = "Hopeful Monster"
    session.options.mut = [true, true, true, true, true, false, false]
    session.options.wDetails = {
            start: 1.2,
            by: 1.5,
            till: 10
    }
    session.options.dDetails = {
            start: 0,
            by: 0.2,
            till: 0.6
}
    session.options.tDetails = {
            start: 0,
            by: 2,
            till: 8
    }    
    session.options.threshold = 20
	session.trianglable = true
	//    Topan := snail;
	//    Leftan := Turritella;
	//    Rightan := bivalve;
	session.options.topOfTriangle = new Shells(session, null).doPerson('Snail')
	session.options.leftOfTriangle = new Shells(session, null).doPerson('Eloise')
	session.options.rightOfTriangle = new Shells(session, null).doPerson('Gallaghers')

}

//initializes the biomorph's genotype as one of a named set of types.
Shells.prototype.doPerson = function(morphType) {
    var genes = null
    if(morphType) {
        genes = (new ShellHardcodedAnimals())[morphType]
    }
//    var drawer = this.drawer
    this.shell = new Shell(genes)
    // Artificially jacked up for demonstration purposes. Normal value is 10. -- ABC
//  this.shell.mutProbGene = 100
    return this

} 
Shells.prototype.doSaltation = function() {
    this.shell.randomize()
}
//initializes the biomorph's genotype to a random set of values
//causes the biomorph's genotype to undergo a random mutation
Shells.prototype.mutate = function() {
}
//creates and returns a new, mutated copy of the biomorph.
Shells.prototype.reproduce = function(element) {
    var child = new Shells(this.session, element)
    child.shell = this.shell.breed()
    return child
}
//called when it is time for the biomorph to draw itself. 
Shells.prototype.develop = function() {
//    alert('Shells.develop')
    this.shell.generate(this.drawer)
    this.shell.draw()
}

Shells.margarine = function (w, direction) {
    // {we want to change by large amounts when low, small amounts when large}
    var wMutSize = 0.1
    var logged = Math.log(w)
    var logchanged = logged + wMutSize * direction
    if(logchanged > 20) {
        logchanged = 20
    }
    var m = Math.exp(logchanged)

    if(m < 1) {
        m = 1
    }
    return m
}


Shells.prototype.dummydraw = Biomorphs.prototype.dummydraw 
Shells.prototype.getWidth = function() {
	this.dummydraw()
	return this.shell.rect.right - this.shell.rect.left
}
Shells.prototype.getHeight = function() {
	this.dummydraw()
	return this.shell.rect.bottom - this.shell.rect.top
}
Shells.prototype.getRect = function() {
	this.dummydraw()
	return this.shell.rect
}

//Register the species with the SpeciesFactory.
_speciesFactorySingleton.registerSpeciesType("Snails", 
        (function(session, drawer) { return new Shells(session, drawer)}),
        (function(session) { Shells.initializeSession(session)}),
        (function(geneboxes, geneboxes_options) { 
            $.fn.shells_geneboxes.call(geneboxes, geneboxes_options) }),
            (function(geneboxes, canvas) { 
                $(geneboxes).shells_geneboxes('updateFromCanvas', canvas)}));
Shells.prototype.manipulation = function(geneboxIndex, leftRightPos, rung) {
    // geneboxIndex is one-based
    var str = "Manipulation one-based geneBoxIndex:" + geneboxIndex;

    var leftRightPosProperties = HorizPos.properties[leftRightPos];
    if(leftRightPosProperties != null) {
        str += ',' + leftRightPosProperties.name;
    }
    str += ' v:' + rung
    var rungProperties = VertPos.properties[rung];
    if(rungProperties != null) {
        str += ',' + rungProperties.name;
    }
    var shell = this.shell
    switch(geneboxIndex) {
    case 1:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.opening = Shells.margarine(shell.opening, -1)
            break;
        case HorizPos.RightThird: 
            shell.opening = Shells.margarine(shell.opening, 1)
            break;
        }
        break;;
    case 2:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.displacement -= shell.mutSize.displacement
            break;
        case HorizPos.RightThird: 
            shell.displacement += shell.mutSize.displacement
            break;
        }
        break;;
    case 3:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.shape -= shell.mutSize.shape
            break;
        case HorizPos.RightThird: 
            shell.shape += shell.mutSize.shape
            break;
        }
        break;;
    case 4:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translation -= shell.mutSize.translation
            break;
        case HorizPos.RightThird: 
            shell.translation += shell.mutSize.translation
            break;
        }
        break;
    case 5:
        shell.handedness = -shell.handedness
        break;
    case 6:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.displacement -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.displacement += 0.1
            break;
        }
        break;
    case 7:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.mutSize.translation -= 0.1
            break;
        case HorizPos.RightThird: 
            shell.mutSize.translation += 0.1
            break;
        }
        break;
    case 8:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
			if(shell.coarsegraininess > 1) {
            	shell.coarsegraininess--
			}
            break;
        case HorizPos.RightThird: 
            shell.coarsegraininess++
            break;
        }
        break;
    case 9:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.reach > 1) {
                shell.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.reach++
            break;
        }
        break;
    case 10:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, -1)
            break;
        case HorizPos.RightThird: 
            shell.translationGradient = Shells.margarine(shell.translationGradient, 1)
            break;
        }
        break;
    case 11:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.shape > 0) {
                shell.mutSize.shape--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.shape++
            break;
        }
        break;
    case 12:
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(shell.mutSize.reach > 1) {
                shell.mutSize.reach--
            }
            break;
        case HorizPos.RightThird: 
            shell.mutSize.reach++
            break;
        }
        break;
    case 13:
        switch(leftRightPos) {
        case HorizPos.LeftThird:
            if(shell.mutProbGene > 1) {
                shell.mutProbGene--
            }
            break;
        case HorizPos.RightThird:
            if(shell.mutProbGene < 100) {
                shell.mutProbGene++
            }
            break;
        }
        break;
    case 14:
        var keys = Object.keys(Shell.patterns)
        keys.push('circle')
        var pattern
        for(let i = 0; i < keys.length; i++) {
            if(keys[i] == shell.pattern) {
                pattern = i
                break
            }
        }
        switch(leftRightPos) {
        case HorizPos.LeftThird: 
            if(pattern > -1) {
                pattern--
                if(pattern < 0) {
                    pattern = keys.length - 1
                }
            }
            break;
        case HorizPos.RightThird: 
            if(pattern < keys.length - 1) { 
                pattern++
            } else {
                pattern = 0
            }
            break;
        }
        shell.pattern = keys[pattern]
//        alert("Pattern " + pattern + ":" + shell.pattern)
        break;
    }
    
    if(shell.displacement < 0) {
        shell.displacement = 0
    } else if(shell.displacement > 100) {
        shell.displacement = 100
    }
    
}

// Number.parseFloat(x).toFixed(2);
$.widget( "dawk.floatGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(String(Number.parseFloat(this.options.value).toFixed(2)));
    },    

} );

$.widget( "dawk.handednessGenebox", $.dawk.biomorph_genebox, {
    _create: function(options) {
        this._super(options)
    },
    _init : function() {
        this.options.hasLeftRight = true;
        this.options.hasMid = false;
        this.options.hasGradient = false;
        this.options.hasColor = false;
        this._super();
    },
    _setOption : function(key, value) {
        this._super(key, value);
    },
    refresh: function() {
        this.element.find('.geneValue')
        .text(this.options.value == -1 ? 'Left' : 'Right');
    },    
} );/*
 * Geneboxes for Matthieu Triay's implementation of Blind Watchmaker Shells.
 */
$.widget('dawk.shells_geneboxes', $.dawk.geneboxes, {
    options : {
        engineering: true,
        biomorph: null,
    },
    _create : function(options) {
        this._super(options)
        this._setOptions(options);
        this.element.addClass("shellGeneboxes");
        let template = '<div></div>';

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 1,
            title: 'Opening'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 2,
            title: 'Displacement'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 3,
            title: 'Shape'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 4,
            title: 'Translation (per outline, in the direction orthogonal to that of the parent spirtal)'}).appendTo(this.element);

        $(template).handednessGenebox({
            geneboxCollection: this,
            geneboxIndex: 5,
            title: 'Handedness'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 6,
            title: 'Displacement Mutation Size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 7,
            title: 'Translation Mutation Size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 8,
            title: 'Coarsegraininess'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 9,
            title: 'Reach'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 10,
            title: 'Translation gradient'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 11,
            title: 'Shape mutation size'}).appendTo(this.element);

        $(template).floatGenebox({
            geneboxCollection: this,
            geneboxIndex: 12,
            title: 'Reach mutation size'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 13,
            title: 'Mutation Probability'}).appendTo(this.element);

        $(template).biomorph_genebox({
            geneboxCollection: this,
            geneboxIndex: 14,
            title: 'Pattern'}).appendTo(this.element);
    },

    updateFromCanvas: function(canvas) {
        var biomorph = $(canvas).data('genotype');
        if(biomorph === undefined) {
            return;
        }
        this.options.biomorph = biomorph;
        geneboxes = $(this.element).find('.genebox');
        var shell = biomorph.shell
        var genebox 
        // Opening
        genebox = geneboxes.eq(0); 
        genebox.floatGenebox("updateValue", shell.opening);
        // Displacement
        genebox = geneboxes.eq(1); 
        genebox.floatGenebox("updateValue", shell.displacement);
        // Shape
        genebox = geneboxes.eq(2); 
        genebox.floatGenebox("updateValue", shell.shape);
        // Translation
        genebox = geneboxes.eq(3); 
        genebox.floatGenebox("updateValue", shell.translation);
        // Handedness
        genebox = geneboxes.eq(4); 
        genebox.handednessGenebox("updateValue", shell.handedness);
        // Displacement mutation size
        genebox = geneboxes.eq(5); 
        genebox.floatGenebox("updateValue", shell.mutSize.displacement);
        // Translation mutation size
        genebox = geneboxes.eq(6); 
        genebox.floatGenebox("updateValue", shell.mutSize.translation);
        // Coarsegraniness
        genebox = geneboxes.eq(7); 
        genebox.biomorph_genebox("updateValue", shell.coarsegraininess);
        // Reach
        genebox = geneboxes.eq(8); 
        genebox.biomorph_genebox("updateValue", shell.reach);
        // Translation gradient
        genebox = geneboxes.eq(9); 
        genebox.floatGenebox("updateValue", shell.translationGradient);
        // Shape mutation size
        genebox = geneboxes.eq(10); 
        genebox.floatGenebox("updateValue", shell.mutSize.shape);
        // Reach mutation size
        genebox = geneboxes.eq(11); 
        genebox.floatGenebox("updateValue", shell.mutSize.reach);
        // Mutation probability
        genebox = geneboxes.eq(12); 
        genebox.biomorph_genebox("updateValue", shell.mutProbGene);
        // Pattern
        genebox = geneboxes.eq(13); 
        genebox.biomorph_genebox("updateValue", shell.pattern);
    },
});
