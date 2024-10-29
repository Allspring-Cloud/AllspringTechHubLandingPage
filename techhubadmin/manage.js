let csvData = [];
let selectedNeed = "";

// Load and parse the CSV file using PapaParse
window.onload = function () {

    // Add event listeners to the "Need" buttons
    document.getElementById("newNeed").addEventListener("click", function() {
        handleNeedSelection("I need something new", "newNeed", "issueNeed");
    });

    document.getElementById("issueNeed").addEventListener("click", function() {
        handleNeedSelection("I have an issue", "issueNeed", "newNeed");
    });

    // Add event listener for the submit button
    document.getElementById("submitBtn").addEventListener("click", handleSubmit);
};

// Handle need selection and style the buttons accordingly
function handleNeedSelection(need, clickedBtnId, otherBtnId) {
    selectedNeed = need; // Update global selectedNeed variable

    // Update button styles to show which is selected
    document.getElementById(clickedBtnId).classList.add("btn-primary");
    document.getElementById(clickedBtnId).classList.remove("btn-outline-primary", "btn-outline-secondary");
    document.getElementById(otherBtnId).classList.add("btn-outline-secondary");
    document.getElementById(otherBtnId).classList.remove("btn-primary");

    // Reset and populate the Category dropdown based on the need
    resetDropdowns();
    populateCategoryDropdown(csvData, need);
}

// Handle submit button click, open the selected item link in a new tab, and send data to server
function handleSubmit() {
    const selectedItemLink = document.getElementById("item").value;
    const selectedCategory = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
    const selectedType = document.getElementById("type").options[document.getElementById("type").selectedIndex].text;
    const selectedItem = document.getElementById("item").options[document.getElementById("item").selectedIndex].text;

    if (selectedItemLink) {
        // Open the link in a new tab
        window.open(selectedItemLink, '_blank');

        // Create data object to send to the server
        const data = {
            need: selectedNeed,
            category: selectedCategory,
            type: selectedType,
            item: selectedItem,
            timestamp: new Date().toISOString()
        };

        // Send data to the server using AJAX
        fetch('log.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.text())
        .then(data => {
            console.log('Data successfully logged:', data);
        })
        .catch((error) => {
            console.error('Error logging data:', error);
        });
    }
}