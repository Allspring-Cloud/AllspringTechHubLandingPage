let csvData = [];
let selectedNeed = "";
let csvVer = 0;
let categoryNeed = '';
let categoryBroken = '';

// Load and parse the CSV file using PapaParse
window.onload = function () {
    Papa.parse("data/data.csv", {
        download: true,
        header: true,
        complete: function(results) {
            csvData = results.data;
            
            testCategory = csvData[1]['Need'];
            if (testCategory === 'I need Something New' || csvData[1]['Need'] === 'Something is Broken' ) {
                csvVer = 1;
                categoryNeed = 'I need Something New'
                categoryBroken = 'Something is Broken'
            } else {
                csvVer = 0;
                categoryNeed = 'I need something new'
                categoryBroken = 'I have an issue'
            }
            let tbody = document.getElementById("searchResultsData");

            for (let i = 0; i < csvData.length; i++) {
                let row = tbody.insertRow(i);
       
                // loop through each column and create a cell
                for (const key in csvData[i]) {
                    const cell = document.createElement('td');
                    cell.textContent = csvData[i][key];
                    if (cell.textContent.length > 50) {
                        cell.style = "white-space: nowrap;"
                    }
                    row.appendChild(cell);
                }
            }
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

    // hide selction and seach div
    selectionDiv.style.display = 'none';
    searchDiv.style.display = 'none';

    // Add event listeners to the "Need" buttons
    document.getElementById("newNeed").addEventListener("click", function() {
        handleNeedSelection(categoryNeed, "newNeed", "issueNeed");
    });

    document.getElementById("issueNeed").addEventListener("click", function() {
        handleNeedSelection(categoryBroken, "issueNeed", "newNeed");
    });

    document.getElementById("searchCTIs").addEventListener("click", function() {
        // clear select item message popup
        const itemMessageDiv = document.getElementById("item-message");
        itemMessageDiv.innerHTML = ''; 
        showSearchCTIs();
    });

    // Add event listener for the submit button
    document.getElementById("submitBtn").addEventListener("click", handleSubmit);

    // add search trigger
    document.getElementById("searchField").addEventListener('input', function() {
        let searchTerm = this.value.toLowerCase();
        let tbody = document.getElementById("searchResults");
        searchTable(tbody, searchTerm);
    });

    document.getElementById("searchField").addEventListener("focus", function() {
        showLinkMessage("");
    });

    // add onclick event to table
    document.getElementById("searchResults").addEventListener('click', function(event) {
        handleSearchRowClick(event);
    });
};

// Handle searchCTis click - table display and setup
function showSearchCTIs() {
    // show/hide selction and seach div
    selectionDiv.style.display = 'none';
    searchDiv.style.display = 'block';

    // Update button styles to show which is selected
    document.getElementById("searchCTIs").classList.add("btn-primary");
    document.getElementById("searchCTIs").classList.remove("btn-outline-primary", "btn-outline-secondary");
    document.getElementById("newNeed").classList.add("btn-outline-secondary");
    document.getElementById("newNeed").classList.remove("btn-primary");
    document.getElementById("issueNeed").classList.add("btn-outline-secondary");
    document.getElementById("issueNeed").classList.remove("btn-primary");
}

// Handle need selection and style the buttons accordingly
function handleNeedSelection(need, clickedBtnId, otherBtnId) {
    // show/hide selction and seach div
    selectionDiv.style.display = 'block';
    searchDiv.style.display = 'none';

    selectedNeed = need; // Update global selectedNeed variable

    // Update button styles to show which is selected
    document.getElementById(clickedBtnId).classList.add("btn-primary");
    document.getElementById(clickedBtnId).classList.remove("btn-outline-primary", "btn-outline-secondary");
    document.getElementById(otherBtnId).classList.add("btn-outline-secondary");
    document.getElementById(otherBtnId).classList.remove("btn-primary");
    document.getElementById("searchCTIs").classList.add("btn-outline-secondary");
    document.getElementById("searchCTIs").classList.remove("btn-primary");

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
        if (document.getElementById("submitBtn").disabled === false) {
            LinkMessageDIVContent = "";
        }
        const itemMessageDiv = document.getElementById("item-message");
        itemMessageDiv.innerHTML = LinkMessageDIVContent;            
    }

}

// Handle submit button click, open the selected item link in a new tab, and send data to server
function handleSubmit() {
    const uniqueid = document.getElementById("UniquID").value;
    const selectedItemLink = document.getElementById("itemLink").value + "?customfield_10487=" + uniqueid;
    const selectedCategory = document.getElementById("category").options[document.getElementById("category").selectedIndex].text;
    const selectedType = document.getElementById("type").options[document.getElementById("type").selectedIndex].text;
    const selectedItem = document.getElementById("item").options[document.getElementById("item").selectedIndex].text;
    

    if (selectedItemLink) {
        // Open the link in a new tab
        window.open(selectedItemLink, '_blank');

        // Create data object to send to the server
        const data = {
            click: 'selected',
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

function searchTable(table, searchTerm) {
    for (var i = 1; i < table.rows.length; i++) {
        rowStyle = 'none';
        row = table.rows[i];
        row.style.display = 'none';
        for (var j = 0; j < row.children.length; j++) {
            let cell = row.children[j];
            if (cell) {
                if (cell.textContent.toLowerCase().includes(searchTerm)) {
                    rowStyle = '';
                }
            }
        }
        row.style.display = rowStyle;
    }
}

function handleSearchRowClick(event) {
    // Check if the clicked element is a table row
    if (event.target.tagName === "TD") {
        // Code to execute when the row is clicked

        // get the header values in order to ffind the right columns
        // Get the table element
        const table = document.getElementById("searchResults"); 
        // Get all header cells within the table
        const headerCells = table.querySelectorAll("th");
        // Iterate over header cells and extract their values
        const headerValues = [];
        headerCells.forEach(headerCell => {
            headerValues.push(headerCell.textContent);
        });

        selectedNeed = event.target.parentNode.childNodes[headerValues.indexOf("Need")].textContent;
        selectedCategory = event.target.parentNode.childNodes[headerValues.indexOf("Category")].textContent;
        selectedType = event.target.parentNode.childNodes[headerValues.indexOf("Type")].textContent;
        selectedItem= event.target.parentNode.childNodes[headerValues.indexOf("Item")].textContent;
        uniqueid = event.target.parentNode.childNodes[headerValues.indexOf("UniqueID")].textContent;
        selectedItemLink = event.target.parentNode.childNodes[headerValues.indexOf("Link")].textContent;        
        LinkMessage = event.target.parentNode.childNodes[headerValues.indexOf("LinkMessage")].textContent;

        if (selectedItemLink.length === 0) {
            showLinkMessage(LinkMessage);
        } else if (selectedItemLink === null) {
            showLinkMessage(LinkMessage);
        } else {
            // go to link
            showLinkMessage("");
            gotoLink = selectedItemLink + "?customfield_10487=" + uniqueid;
            console.log(gotoLink);
            window.open(gotoLink, '_blank');

            // Create data object to send to the server
            const data = {
                click: 'searched',
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
}

function showLinkMessage(LinkMessage) {
    if (LinkMessage.length === 0) {
        LinkMessageDIVContent = "";
    } else if (LinkMessage === null) {
        LinkMessageDIVContent = "";
    } else {
        LinkMessageDIVContent = '<div class="alert alert-primary">' + LinkMessage + '</div>';
    }        
    const itemMessageDiv = document.getElementById("searched-item-message");
    itemMessageDiv.innerHTML = LinkMessageDIVContent;  

}