// ====== Habit Form Show/Hide ======
document.querySelector(".add-btn").addEventListener("click", function() {
    document.querySelector(".habit-form").style.display = "block";
});

document.querySelector(".can-btn").addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(".habit-form").style.display = "none";
});

// ====== Habits Data ======
let habits = [];

// ====== Load habits from localStorage ======
function loadhabitdata() {
    const stored = localStorage.getItem("habitlists");
    if (stored) {
        habits = JSON.parse(stored);
    }
}

// ====== Save habits to localStorage ======
function savehabitdata() {
    localStorage.setItem("habitlists", JSON.stringify(habits));
}

// ====== Render Habits on page ======
function renderHabits() {
    const list = document.querySelector(".habits-list");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const box = document.createElement("div");
        box.classList.add("habits-card");

        box.innerHTML = `
            <input type="checkbox" class="habit-checkbox" ${habit.completed ? "checked" : ""}>
            <span>${habit.name}</span>
        `;

        const checkbox = box.querySelector(".habit-checkbox");
        checkbox.addEventListener("change", () => {
            habits[index].completed = checkbox.checked;
            savehabitdata();
            mothlydata(); // keep monthly progress working
        });

        list.appendChild(box);
    });

    attachCheckboxListeners(); // keep your existing function working
}

// ====== Submit New Habit ======
document.querySelector(".sub-btn").addEventListener("click", function(e) {
    e.preventDefault();

    let habitText = document.getElementById("habit-name").value;
    if (habitText.trim() === "") return;

    // Add habit to data array
    habits.push({
        id: Date.now(),
        name: habitText,
        completed: false
    });

    // Save to localStorage
    savehabitdata();

    // Render updated list
    renderHabits();

    // Reset form
    document.getElementById("habit-name").value = "";
    document.querySelector(".habit-form").style.display = "none";
});

// ====== Habit Count & Checkbox Functions (unchanged) ======
function habitCount(){
    return document.querySelectorAll(".habits-card").length;
}

function checkcount(){
    let checkboxs = document.querySelectorAll(".habit-checkbox");
    let checkedCount = 0;
    checkboxs.forEach(checkbox => {
        if(checkbox.checked) checkedCount++;
    });
    return checkedCount;
}

function dailyhabitcomplete(){
    return habitCount() > 0 && habitCount() === checkcount();
}

// ====== Monthly Data ======
function mothlydata() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    if(dailyhabitcomplete()){
        let key = `${year}-${String(month + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        localStorage.setItem(key, "true");
    }

    let lastday;
    if([0,2,4,6,7,9,11].includes(month)){
        lastday = 31;
    } else if(month === 1){
        lastday = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 29 : 28;
    } else {
        lastday = 30;
    }

    let completedday = 0;
    for(let i = 1; i <= lastday; i++){
        let key = `${year}-${String(month + 1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
        if(localStorage.getItem(key) === "true"){
            completedday++;
        }
    }

    let percent = Math.round((completedday / lastday) * 100);

    let monthCards = document.querySelectorAll(".month-card");
    let progressbar = monthCards[month].querySelector(".dots"); 
    let percentText = monthCards[month].querySelector(".percent");    
    let dots = progressbar.querySelectorAll("span");
    let dotsToFill = Math.round(percent / 10); 

    dots.forEach((dot, index) => {
        if(index < dotsToFill){
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });

    percentText.textContent = percent + "%";
}

// ====== Attach checkbox listeners ======
function attachCheckboxListeners(){
    let checkboxs = document.querySelectorAll(".habit-checkbox");
    checkboxs.forEach(checkbox => {
        checkbox.addEventListener("change", function(){
            mothlydata();
        });
    });
}

// ====== Initialize ======
window.addEventListener("DOMContentLoaded", () => {
    loadhabitdata();
    renderHabits();
    mothlydata();
});
