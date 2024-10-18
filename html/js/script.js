let csvData = [];
let selectedNeed = "";

// Load and parse the CSV file using PapaParse
window.onload = function () {
    Papa.parse("data/data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            csvData = results.data;
        }
    });

    fetch('data/message.txt')
    .then(response => response.text())
    .then(text => {
      // Store the text in a variable
      const messageText = text;
      const messageDiv = document.getElementById("message");
      messageDiv.innerHTML = messageText;
    })
    .catch(error => console.error('Error:', error));    

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

// Reset all dropdowns and the submit button
function resetDropdowns() {
    document.getElementById("category").innerHTML = '<option value="">Select Category</option>';
    document.getElementById("type").innerHTML = '<option value="">Select Type</option>';
    document.getElementById("item").innerHTML = '<option value="">Select Item</option>';
    document.getElementById("item-message").innerHTML = '';
    
    document.getElementById("category").disabled = false;
    document.getElementById("type").disabled = true;
    document.getElementById("item").disabled = true;
    
    document.getElementById("submitBtn").disabled = true;
}

// Populate the Category dropdown based on the selected Need
function populateCategoryDropdown(data, selectedNeed) {
    const categoryDropdown = document.getElementById("category");
    const categories = [...new Set(data.filter(item => item.Need === selectedNeed).map(item => item.Category))];

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryDropdown.appendChild(option);
    });

    categoryDropdown.disabled = false;

    categoryDropdown.addEventListener('change', function() {
        populateTypeDropdown(data, categoryDropdown.value);
    });
}

// Populate the Type dropdown based on the Category selection
function populateTypeDropdown(data, selectedCategory) {
    const typeDropdown = document.getElementById("type");
    const itemDropdown = document.getElementById("item");
    
    document.getElementById("item-message").innerHTML = '';
    typeDropdown.innerHTML = '<option value="">Select Type</option>';
    itemDropdown.innerHTML = '<option value="">Select Item</option>';
    itemDropdown.disabled = true;

    const types = [...new Set(data.filter(item => item.Category === selectedCategory && item.Need === selectedNeed).map(item => item.Type))];

    types.forEach(type => {
        const option = document.createElement("option");
        option.value = type;
        option.textContent = type;
        typeDropdown.appendChild(option);
    });

    typeDropdown.disabled = false;

    typeDropdown.addEventListener('change', function() {
        populateItemDropdown(data, selectedCategory, typeDropdown.value);
    });
}

// Populate the Item dropdown based on Type selection
function populateItemDropdown(data, selectedCategory, selectedType) {
    document.getElementById("item-message").innerHTML = '';
    
    const itemDropdown = document.getElementById("item");
    itemDropdown.innerHTML = '<option value="">Select Item</option>';

    const items = data.filter(item => item.Category === selectedCategory && item.Type === selectedType && item.Need === selectedNeed);

    items.forEach(item => {
        if (item.Item.trim !== "") {
            const option = document.createElement("option");
            option.value = item.RowID;
            option.textContent = item.Item;
            itemDropdown.appendChild(option);
        }
    });

    itemDropdown.disabled = false;

    itemDropdown.addEventListener('change', function() {
        if (itemDropdown.value) {
            itemSelected(data, itemDropdown.value);
        }
    });
}

// handle item select
function itemSelected(data, itemValue) {
    if (itemValue) {
        const itemMessages = data.filter(item => item.RowID === itemValue);
        /*
        itemMessages.forEach(item => {
            console.log(item);
        });        
        */

        // check if the link field is populated
        thisLink = itemMessages[0].Link;
        if (thisLink.length === 0) {
            document.getElementById("submitBtn").disabled = true; // Disable submit button
        } else if (thisLink === null) {
            document.getElementById("submitBtn").disabled = true; // Disable submit button
        } else {
            document.getElementById("submitBtn").disabled = false; // Enable submit button
        }
        
        document.getElementById("itemLink").value = itemMessages[0].Link;
        document.getElementById("UniquID").value = itemMessages[0].UniqueID;

        thisLinkMessage = itemMessages[0].LinkMessage
        if (thisLinkMessage.length === 0) {
            LinkMessageDIVContent = "";
        } else if (thisLinkMessage === null) {
            LinkMessageDIVContent = "";
        } else {
            LinkMessageDIVContent = '<div class="alert alert-primary">' + itemMessages[0].LinkMessage + '</div>';
        }        
        const itemMessageDiv = document.getElementById("item-message");
        itemMessageDiv.innerHTML = LinkMessageDIVContent;            
    }

}

// Handle submit button click, open the selected item link in a new tab, and send data to server
function handleSubmit() {
    const uniqueid = document.getElementById("UniquID").value;
    const selectedItemLink = document.getElementById("itemLink").value + "?uniqueid=" + uniqueid;
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
            link: selectedItemLink,
            uniqueid: uniqueid,
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