const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const historyDiv = document.querySelector(".history");
const themeToggle = document.querySelector(".theme-toggle");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";
let historyList = [];
let memoryValue = null;  // Stores memory value

// Function to perform calculations
const calculate = (btnValue) => {
    if (btnValue === "=" && output !== "") {
        try {
            let result = eval(output.replace("%", "/100"));
            let historyEntry = `${output} = ${result}`;
            historyList.unshift(historyEntry); // Add to history (latest at the top)
            updateHistory();
            output = result.toString();
        } catch (error) {
            output = "Error";
        }
    } else if (btnValue === "AC") {
        output = "";
        historyList = [];
        updateHistory();
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } 
    // Memory Functions
    else if (btnValue === "M+") {
        memoryValue = parseFloat(output) || 0;
        historyList.unshift(`Stored in Memory: ${memoryValue}`);
        updateHistory();
    } else if (btnValue === "M-") {
        historyList.unshift(`Cleared Memory (Previous: ${memoryValue})`);
        memoryValue = null;
        updateHistory();
    } else if (btnValue === "MR") {
        if (memoryValue !== null) {
            output = memoryValue.toString();
            historyList.unshift(`Recalled Memory: ${memoryValue}`);
            updateHistory();
        }
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }

    display.value = output;
};

// Function to update history display
const updateHistory = () => {
    historyDiv.innerHTML = historyList.map(entry => `<p>${entry}</p>`).join("");
};

// Dark mode toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
