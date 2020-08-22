var zones = {
    "zSteps1": 6,
    "zSteps2": 4,
    "zSteps3": 2
};
const cProgressB = new CircleProgress(".progressB",{max: 306,value: 0,});
const cProgressG = new CircleProgress(".progressG",{max: 130,value: 0,});
const cProgressY = new CircleProgress(".progressY",{max: 120,value: 0,});
const cProgressR = new CircleProgress(".progressR",{max: 56,value: 0,});

var activeZoneTabs = 1;
var currentTab = 0; // Current tab is set to be the first tab (0)

$("#quiz-game-btn").on("click", function () {
    $("#credits").hide();
    $('#main-box').fade("out", () => {
        document.body.style.setProperty("--c1", "#22bf73");
        $('#checks-box').fade("in")
    });
    $("#trapez").css("height","95%");
    $("#trapez").css("background","linear-gradient(#216b5b,#21bf73)");
    createSteps(1);
    showTab(currentTab); // Display the current tab
});

function createSteps(n) {
    var str = "";
    for (let index = 0; index < zones["zSteps" + n]; index++)
        str += '<span class="step"></span>';
    $('#steps').html(str);
}

function showTab(n) {
    var x = document.querySelectorAll("#zone_" + activeZoneTabs + ">.tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        if (activeZoneTabs == 3)
            document.getElementById("nextBtn").innerHTML = "Results";
        else
            document.getElementById("nextBtn").innerHTML = "Zone " + (activeZoneTabs + 1);
    } else {
        document.getElementById("nextBtn").innerHTML = 'Next <i class="fas fa-angle-right"></i>';
    }
    activeStep(n);
}

function nextPrev(n) {
    var x = document.querySelectorAll("#zone_" + activeZoneTabs + ">.tab");
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        if (activeZoneTabs == 3){
            showResults();return;
        }
        else {
            $("#zone_" + activeZoneTabs).hide();
            activeZoneTabs += 1;
            $("#zone_" + activeZoneTabs).show();
            currentTab = 0;
            createSteps(activeZoneTabs);
        }
        if(activeZoneTabs == 1){document.body.style.setProperty("--c1", "#22bf73");}
        if(activeZoneTabs == 2){document.body.style.setProperty("--c1", "#ffcd38");$("#trapez").css("background","linear-gradient(#e4ab00, #ffcd38)");}
        if(activeZoneTabs == 3){document.body.style.setProperty("--c1", "#ff3838");$("#trapez").css("background","linear-gradient(#610909, #ff3838)");}

    }
    showTab(currentTab);
}
function showResults(){
    $('#checks-box').fade("out", () => {
        $('#result-box').fade("in");
        $("#credits").fade("in");
        $("#trapez").css("background","linear-gradient(#1126becc, #05c7adcc)");
    });
    wait(1000);
    var totalP =0;
    var pGreen = 0;
    var pYellow = 0;
    var pRed = 0;
    $(".ans:checked").each(element => {
        var val =parseInt(element.value);
        if(val == 5)
            pGreen+=val;
        else if (val == 6)
            pYellow+=val;
        else
            pRed+=val;
        totalP+= val;
    });
    cProgressB.value = totalP;
    cProgressG.value = pGreen;
    cProgressY.value = pYellow;
    cProgressR.value = pRed;
    console.log(totalP);
    if(totalP < 50)
        $("#rs1").fade("in");
    else if ( totalP < 150)
        $("#rs2").fade("in");
    else if (totalP < 220)
        $("#rs3").fade("in");
    else if ( toalP < 300)
        $("#rs4").fade("in");
    else $("#rs5").fade("in");
}

function activeStep(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}
