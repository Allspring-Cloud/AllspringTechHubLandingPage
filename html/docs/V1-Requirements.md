V1 Requirements:
•	Hosted site (Lightsail LAMP server.  Networking routes need to be determined) – see Infrastructure section.
•	Pulls data from a CSV file on the webserver *
•	Displays a message at the top pulled from a text file on the webserver *
•	Open the link in a new tab allowing the user to return to the CTI selector page without having to start the process over *
•	If the user changes a previous selected NEED or Dropdown, the dropdowns below are reset and repopulated based on the selection change *
•	Log the selected CTI information back to the webserver **
•	Edit the message displayed at the top **
•	Upload a new data.csv file **
•	Maintain the CTI options in the master Excel and export from there to ‘data.csv’ file (currently in development)
* DEV code complete
** PHP required.

CTI Selector User Workflow:
•	User selects  a NEED: either "I need something new" or "I have an issue"
•	The "Category" dropdown is populated based upon the NEED selected.
•	The user selects a CATEGORY from the dropdown
•	The "Type" dropdown is populated based upon the CATEGORY selected.
•	The user selects a TYPE from the dropdown
•	The "Item" dropdown is populated based upon the TYPE selected.
•	The user selects a ITEM from the dropdown
•	The Submit button is enabled
•	The user clicks the SUBMIT button
o	selected CTI info sent back to webserver for logging
o	a new tab is opened going to the LINK

Infrastructure:
•	Hosted in Lightsail LAMP
•	Firewall to prevent access from public internet
•	Requires VPC connection to Allspring AWS network to access over private network

