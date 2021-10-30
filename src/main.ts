let allWaspsHealth = document.querySelectorAll(".wasp-health");
let allWaspTypes = document.querySelectorAll(".wasp-name"); 
let hitWaspButton = document.querySelector(".hit-btn") as HTMLButtonElement; 
let hitLog = document.querySelector(".hit-log") as HTMLDivElement; 
let deathLog = document.querySelector(".death-log") as HTMLDivElement; 

let indexesArray: number[] = [];
for (let i=0; i<14; i++) {
  indexesArray.push(i); 
}
hitWaspButton.addEventListener("click", ()=> {
  // generate random index
  let randomIndex = indexesArray[Math.floor(Math.random()*indexesArray.length)]; 
  console.log(randomIndex); 
  let randomWaspHealth = allWaspsHealth[randomIndex]; 
  let randomWaspHealthValue = parseInt(randomWaspHealth.innerHTML); 
  let currentWaspType = allWaspTypes[randomIndex].innerHTML; 
  if (currentWaspType.match("Queen")) {
    randomWaspHealth.innerHTML = (randomWaspHealthValue - 7).toString(); 
    hitLog.innerHTML = `You hit the ${currentWaspType}`; 
  } else if (currentWaspType.match("Drone")) {
    randomWaspHealth.innerHTML = (randomWaspHealthValue -12).toString(); 
    hitLog.innerHTML = `You hit ${currentWaspType}`
  } else {
    randomWaspHealth.innerHTML = (randomWaspHealthValue - 10).toString(); 
    hitLog.innerHTML = `You hit ${currentWaspType}`
  }
  // check if queen is dead 
  if (currentWaspType.match("Queen") && parseInt(randomWaspHealth.innerHTML) <= 0) {
    allWaspsHealth.forEach(wasphealth => {
      wasphealth.innerHTML = "0"; 
      hitLog.innerHTML = "The Queen Wasp is dead! All the other wasps die automatically. End of game." 
    })
    hitWaspButton.style.visibility = "hidden";
    // check if any other wasps are dead 
  } else if (parseInt(randomWaspHealth.innerHTML)<0) {
    console.log(`${currentWaspType} is dead`);
    randomWaspHealth.innerHTML = "0"; 
    deathLog.innerHTML = `${currentWaspType} is dead`; 
    indexesArray.splice(randomIndex, 1);
  }
// check if ALL wasps are dead - note spread operator is required as we are using a node list. 
// get allWaspsHealth again as its been updated. 
  allWaspsHealth = document.querySelectorAll(".wasp-health");
  let aliveWasps = [...allWaspsHealth].filter(wasphealth =>{
    return parseInt(wasphealth.innerHTML) > 0; 
  }) 
  if (aliveWasps.length == 0) {
    hitLog.innerHTML = "All the wasps are dead! End of game."; 
    hitWaspButton.style.visibility = "hidden"; 
  } 
})