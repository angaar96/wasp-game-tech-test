var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var allWaspsHealth = document.querySelectorAll(".wasp-health");
var allWaspTypes = document.querySelectorAll(".wasp-name");
var hitWaspButton = document.querySelector(".hit-btn");
var hitLog = document.querySelector(".hit-log");
var deathLog = document.querySelector(".death-log");
var indexesArray = [];
for (var i = 0; i < 14; i++) {
    indexesArray.push(i);
}
hitWaspButton.addEventListener("click", function () {
    // generate random index
    var randomIndex = indexesArray[Math.floor(Math.random() * indexesArray.length)];
    console.log(randomIndex);
    var randomWaspHealth = allWaspsHealth[randomIndex];
    var randomWaspHealthValue = parseInt(randomWaspHealth.innerHTML);
    var currentWaspType = allWaspTypes[randomIndex].innerHTML;
    if (currentWaspType.match("Queen")) {
        randomWaspHealth.innerHTML = (randomWaspHealthValue - 7).toString();
        hitLog.innerHTML = "You hit the " + currentWaspType;
    }
    else if (currentWaspType.match("Drone")) {
        randomWaspHealth.innerHTML = (randomWaspHealthValue - 12).toString();
        hitLog.innerHTML = "You hit " + currentWaspType;
    }
    else {
        randomWaspHealth.innerHTML = (randomWaspHealthValue - 10).toString();
        hitLog.innerHTML = "You hit " + currentWaspType;
    }
    // check if queen is dead 
    if (currentWaspType.match("Queen") && parseInt(randomWaspHealth.innerHTML) <= 0) {
        allWaspsHealth.forEach(function (wasphealth) {
            wasphealth.innerHTML = "0";
            hitLog.innerHTML = "The Queen Wasp is dead! All the other wasps die automatically. End of game.";
        });
        hitWaspButton.style.visibility = "hidden";
        // check if any other wasps are dead 
    }
    else if (parseInt(randomWaspHealth.innerHTML) < 0) {
        console.log(currentWaspType + " is dead");
        randomWaspHealth.innerHTML = "0";
        deathLog.innerHTML = currentWaspType + " is dead";
        indexesArray.splice(randomIndex, 1);
    }
    // check if ALL wasps are dead - note spread operator is required as we are using a node list. 
    // get allWaspsHealth again as its been updated. 
    allWaspsHealth = document.querySelectorAll(".wasp-health");
    var aliveWasps = __spreadArrays(allWaspsHealth).filter(function (wasphealth) {
        return parseInt(wasphealth.innerHTML) > 0;
    });
    if (aliveWasps.length == 0) {
        hitLog.innerHTML = "All the wasps are dead! End of game.";
        hitWaspButton.style.visibility = "hidden";
    }
});
