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

    box.innerHTML = `<input type="checkbox"><span>${habitText}</span>`; // add a checkbox and the text on the space
    document.querySelector(".habits-list").appendChild(box); // appendChild adds the card to the habit list

    document.getElementById("habit-name").value = ""; // clears the textbox after submitting
    document.querySelector(".habit-form").style.display = "none";
});

// Cancel button closes the form
document.querySelector(".can-btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(".habit-form").style.display = "none";
});
