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
            shell.coarsegraininess--
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

