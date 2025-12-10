// Show the habit form
document.querySelector(".add-btn").addEventListener("click", function() {
    document.querySelector(".habit-form").style.display = "block";
});

// Submit new habit
document.querySelector(".sub-btn").addEventListener("click", function(e) {
    e.preventDefault(); // prevent it from reloading after the btn is clicked as it is inside form

    let habitText = document.getElementById("habit-name").value; // gets the text from the textbox

    let box = document.createElement("div"); // creates a div dynamically 
    box.classList.add("habits-card");// class list is the list of css class to the div and add it add them to the element

    box.innerHTML = `<input type="checkbox" class = "habit-checkbox"><span>${habitText}</span>`; // add a checkbox and the text on the space
    document.querySelector(".habits-list").appendChild(box); // appendChild adds the card to the habit list

    document.getElementById("habit-name").value = ""; // clears the textbox after submitting
    document.querySelector(".habit-form").style.display = "none";
});

// Cancel button closes the form
document.querySelector(".can-btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(".habit-form").style.display = "none";
});
//counting the number of habits
let cardCount = 0;
function habitCount(){
cardCount = document.querySelectorAll(".habits-card").length;

return cardCount;
}

//count checked habits
let checkboxs = document.querySelectorAll(".habit-checkbox");
checkboxs.forEach(function checkcount(checkbox){
    checkbox.addEventListener("change",function(){
        let checkboxs = document.querySelectorAll(".habit-checkbox");
        let checkedCount = 0;
        for(let i=0;i<checkboxs.length;i++){
            if(checkboxs[i].checked == true){
                checkedCount++;
            }
        }
    });
});

//converting to progress bar
function updatreprogressbar(){
    let progressbar =document.getElementsByClassName("dots");
    let percentno = document.getElementsByClassName("percent");
    let totalhabit = habitCount();
    let checkerbox = checkcount();
    let percentage = (totalhabit / checkerbox) * 100;
    percentno = percentage + "%"
    progressbar.style.width = percentage;
}