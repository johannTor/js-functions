// Contact object that stores each contact's information
function Contact(name, email, phone, company) {
    this.name = name;
    this.email = email;
    // Using ternary operator to give phone and company default values of "n/a" if they are undefined or empty strings
    this.phone = (phone === undefined || phone === "") ? "n/a" : phone;
    this.company = (company === undefined || company === "") ? "n/a" : company;
}

// Array of contacts
var contactList = [];

// Returns the first index of an email if it finds one
// Otherwise return -1;
function getContactIndex(list, newEmail) {
    for(var i = 0; i < list.length; i++) {
        if(list[i].email == newEmail) {
            return i;
        }
    }
    return -1;
}

// Checks if contact's new email is the same as another contact's email 
function isEmailTaken(list, newEmail, oldEmail) {
    for(var i = 0; i < list.length; i++) {
        // If the new email is currently in the list AND the new email is not the old email, i.e. the contact is trying to change his email to another contact's email then return true.
        if(list[i].email == newEmail && newEmail != oldEmail) {
            console.log("Comparing new: " + newEmail + " and old: " + oldEmail);
            return true;
        }
    }
    return false;
}

// Function that accepts a contact object and adds it to the contact list
function add(newContact) {
    // Checking if email is already in the list
    if(getContactIndex(contactList, newContact.email) != -1) {
        console.log("Duplicates were found!");
        document.getElementById("used-email-label").style.display = "inline";
    } else if(newContact.name == "" || newContact.name == undefined || newContact.email == "" || newContact.email == undefined) {
        console.log("Missing fields!");
    } else {
        contactList.push(newContact);
        console.log(newContact.name + " was added!");
        // Resetting the new contact form elements
        document.getElementById("name-label").style.display = "none";
        document.getElementById("email-label").style.display = "none";
        document.getElementById("used-email-label").style.display = "none";
        document.getElementById("new-name").value = "";
        document.getElementById("new-email").value = "";
        document.getElementById("new-phone").value = "";
        document.getElementById("new-company").value = "";
        hideAddContactBox();
        // Display the list again for the new contact to show up
        displayListInHtml(contactList);
    }
}

// Function that removes a contact with the email passed in
function remove(email) {
    var foundIndex = getContactIndex(contactList, email);
    if(foundIndex != -1) {
        console.log(contactList[foundIndex].name + " was removed!");
        contactList.splice(foundIndex, 1);
        clearListInHtml();
        displayListInHtml(contactList);
    } else {
        console.log("Contact not found!");
    }
}

// Takes in the email and newInfo object and verifies if email is taken or if there is missing information
// Returns true if edit is successful, otherwise false
function edit(email, newInfo) {
    // Getting the index of the contact with the email given
    var foundIndex = getContactIndex(contactList, email);
    // Checking if the new email is being used by another contact
    if(!isEmailTaken(contactList, newInfo.email, email)) {
        // If foundIndex is -1 then the contact isn't in the list
        if(foundIndex != -1) {
            if(newInfo.name == "" || newInfo.name == undefined || newInfo.email == "" || newInfo.email == undefined) {
                console.log("Missing fields!");
                return false;
            } else {
                contactList[foundIndex] = newInfo;
                console.log(newInfo.name + " was updated!");
                return true;
            }
        } else {
            console.log("Contact " + email + " not found!");
            return false;
        }
    } else {
        console.log("Email is already in use!");
        return false;
    }
}

// Searches for a contact via email and returns the contact object containing that person if it finds a match
function get(email) {
    var foundIndex = getContactIndex(contactList, email);
    if(foundIndex != -1) {
        return contactList[foundIndex];
    } else {
        console.log("Contact not found!");
        return false;
    }
}

// Outputs every contact that's currently in the list
function listAll() {
    for(var i = 0; i < contactList.length; i++) {
        console.log(contactList[i].name + " " + contactList[i].email + " " + contactList[i].phone + " " + contactList[i].company);
    }
}

// Removes every item in the contact list
function clear() {
    console.log("Removing every contact...");
    contactList.splice(0, contactList.length);
}

// Removes every DOM element in the contact list
function clearListInHtml() {
    var contactListElement = document.querySelector(".the-list");
    while(contactListElement.childElementCount > 0) {
        contactListElement.removeChild(contactListElement.firstChild);
    }
}

// Loops through a given contact array and creates DOM elements for each item
function displayListInHtml(theList) {
    // Clear the list so elements won't be repeated
    clearListInHtml();
    var ul = document.querySelector(".the-list");
    // Looping through the given contact list
    for(var i = 0; i < theList.length; i++) {
        // Creating html elements for every item in the list
        var li = document.createElement("li");
        var button = document.createElement("button");
        // Giving the elements values
        button.innerHTML = theList[i].name;
        // Every button gets the contact email as an id
        button.setAttribute("id", theList[i].email);
        // Event listener for each button
        button.addEventListener("click", function(e) {
            var btn = e.target;
            var displayedContact = get(btn.id);
            console.log(displayedContact.name + " clicked!");
            displayInfoInHtml(displayedContact);
            hideEditBox();  
        });
        // Parent elements appending child elements
        li.appendChild(button);
        ul.appendChild(li);
    }
}

function showInfoBox() {
    var contactInfoBox = document.querySelector(".contact-info");
    contactInfoBox.style.display = "block";
}

function hideInfoBox() {
    var contactInfoBox = document.querySelector(".contact-info");
    contactInfoBox.style.display = "none";
}

// Clearing every element within the information box
function clearInfoInHtml() {
    var contactInfoBox = document.querySelector(".contact-info");
    while(contactInfoBox.childElementCount > 0) {
        contactInfoBox.removeChild(contactInfoBox.firstChild);
    }
}

// Function that takes a contact as a parameter, shows the information box, creates the html elements and fills them with the contact info  
function displayInfoInHtml(displayedContact) {
    // Fetching the contactInfo box to add elements into
    var contactInfoBox = document.querySelector(".contact-info");

    // Creating the html elements
    var contactName = document.createElement("h1");
    var infoList = document.createElement("ul");
    var emailField = document.createElement("li");
    var phoneField = document.createElement("li");
    var companyField = document.createElement("li");
    var editButton = document.createElement("button");
    var removeButton = document.createElement("button");

    // Clear any info that was previously displayed
    clearInfoInHtml();

    // Show the information box
    showInfoBox();

    // Add event listener for the edit button
    editButton.addEventListener("click", function() {
        showEditBox(displayedContact);
    });

    // Add event listener for the remove button
    removeButton.addEventListener("click", function() {
        remove(displayedContact.email);
        clearInfoInHtml();
        hideEditBox();
        hideInfoBox();
    });

    // Filling the elements with information fron the contact
    contactName.innerHTML = displayedContact.name;
    emailField.innerHTML = "Email: " + displayedContact.email;
    phoneField.innerHTML = "Phone: " + displayedContact.phone;
    companyField.innerHTML = "Company: " + displayedContact.company;
    editButton.innerHTML = "Edit";
    removeButton.innerHTML = "Remove";
    
    // Appending the elements to it´s parents
    infoList.appendChild(emailField);
    infoList.appendChild(phoneField);
    infoList.appendChild(companyField);
    contactInfoBox.appendChild(contactName);
    contactInfoBox.appendChild(infoList);
    contactInfoBox.appendChild(editButton);
    contactInfoBox.appendChild(removeButton);
}

// Shows the edit box and fills it with information from given contact
function showEditBox(currContact) {
    var editBox = document.querySelector(".contact-edit");
    editBox.style.display = "block";
    // Giving the edit box new html elements to be filled out every time this function is called
    editBox.innerHTML = `
        <form>
            <label id="edit-name-label" for="name">Please provide a name</label>
            <input type="text" name="name" id="edit-name" placeholder="Name*" required>
            <label id="edit-email-label" for="email">Please provide an email</label>
            <label id="edit-used-email-label" for="email">Email already in use</label>
            <input type="text" name="email" id="edit-email" placeholder="Email*" required>
            <input type="text" id="edit-phone" placeholder="Phone">
            <input type="text" id="edit-company" placeholder="Company">
            <input type="button" id="save-button" value="Save changes">
        </form>
    `;
    // Filling the edit form with the current contact info
    document.getElementById("edit-name").value = currContact.name;
    document.getElementById("edit-email").value = currContact.email;
    document.getElementById("edit-phone").value = currContact.phone;
    document.getElementById("edit-company").value = currContact.company;

    // Accessing the save button and adding the event listener
    var saveBtn = document.getElementById("save-button");
    saveBtn.addEventListener("click", function() {
        var oldInfo = get(currContact.email);
        processEditInfo(currContact);
    });
}

// Hide the edit box
function hideEditBox() {
    var editBox = document.querySelector(".contact-edit");
    editBox.style.display = "none";
}

// Function that creates a new contact out of the textbox information and passes it to the edit() function
function processEditInfo(oldInfo) {
    var editName = document.getElementById("edit-name").value;
    // If name is missing show a message
    if(editName == "") {
        document.getElementById("edit-name-label").style.display = "inline";
        return;
    }

    var editEmail = document.getElementById("edit-email").value;
    // If email is missing show a message
    if(editEmail == "") {
        document.getElementById("edit-email-label").style.display = "inline";
        document.getElementById("edit-used-email-label").style.display = "none";
    }

    var editPhone = document.getElementById("edit-phone").value;
    var editCompany = document.getElementById("edit-company").value;
    var updatedContact = new Contact(editName, editEmail, editPhone, editCompany);

    // If edit is 
    if(edit(oldInfo.email, updatedContact)) {
        hideInfoBox();
        hideEditBox();
        clearInfoInHtml();
        displayInfoInHtml(updatedContact);
        clearListInHtml();
        displayListInHtml(contactList);
    }
}

function showAddContactBox() {
    var addContactBox = document.querySelector(".new-contact");
    addContactBox.style.display = "block";
}

function hideAddContactBox() {
    var addContactBox = document.querySelector(".new-contact");
    addContactBox.style.display = "none";
}

// Function that creates a new contact object with values from the html elements and passes it into the add() function
function processNewContact() {
    var newName = document.getElementById("new-name").value;
    // If name is missing show a message
    if(newName == "") {
        document.getElementById("name-label").style.display = "inline";
    }
    
    var newEmail = document.getElementById("new-email").value;
    // If email is missing show a message
    if(newEmail == "") {
        document.getElementById("email-label").style.display = "inline";
        document.getElementById("used-email-label").style.display = "none";
    }
    var newPhone = document.getElementById("new-phone").value;
    var newCompany = document.getElementById("new-company").value;
    var newContact = new Contact(newName, newEmail, newPhone, newCompany);
    add(newContact);
}

var newPerson = new Contact("John Johnson", "john@gmail.com", "1234455", "IBM")
var newPerson2 = new Contact("Sarah Samsonite", "sarh@sam.com", "", "Samsung");
var newPerson3 = new Contact("Bobby Smith", "bob@smith.com", "2223334");
add(newPerson);
add(newPerson2);
add(newPerson3);
displayListInHtml(contactList);