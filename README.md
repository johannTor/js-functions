# js-functions

Link to live version: sore-finger.surge.sh

In this exercise we were supposed to get familiar with functions in javascript and I decided to implement the suggested idea of creating a list of contacts and writing functions that could manipulate that list.
## A small app
I started out doing a console version of this app but decided to try manipulating DOM elements somewhere along the way. The end result is a small app inspired by the coding sessions we have had in the course so far and it allows you to view a contact list, add a new contact to the list, display more detailed information about a contact, edit the contact and remove him. There are no form validations implemented besides requiring a name and an email for the contact. The main functions that I implemented and are being used in relation to the DOM elements (and are also usable in the console) are:

* add() - Adds a contact to the contact list.
* remove() - Removes a contact from the contact list.
* edit() - Edit information of a given contact in the list.
* get() - Returns a contact from the list with the given email.

A short description about the rest of the functions implemented:

* getContactIndex(list, newEmail) - Looks for a contact in a list with the given email and returns the index of the contact if found, if not found return -1.
* isEmailTaken(list, newEmail, oldEmail) - Basically checks if the contact is trying to change his email to another contact's email, returns true if that's the case.
* listAll() - Can be used in the console to list all contacts in the list.
* clear() - Removes every contact in the list, can currently only be used in the console but I probably should have added a button at the bottom of the contact list that calls it.
* clearListInHtml() - Removes every item in the contact list so it can be filled with an updated list.
* displayListInHtml(theList) - Takes a contact list as a parameter and creates new DOM elements from each item. Each item is represented by a button tag that's given the id of the email of the contact. That id is then passed on to get the correct contact from the list to display his info.
* showInfoBox() - Displays the information box DOM element.
* hideInfoBox() - Hides the information box DOM element.
* clearInfoInHtml() - Clears the DOM elements in the information box in order to update the info.
* displayInfoInHtml(displayedContact) - Creates DOM elements and fills them with information from the passed in contact.
* showEditBox() - Displays the edit box element and fills it with a form where the contact can change his information.
* hideEditBox() - Hides the edit box DOM element.
* processEditInfo(oldInfo) - Gets called by the save button in the edit box. It creates a new contact with the information from the DOM elements in the form and passes it into the edit() function.
* showAddContactBox() - Displays the form to add a new contact.
* hideAddContactBox() - Hides the new contact form.
* processNewContact() - Creates a new contact from the information recieved from the DOM elements and passes it into the add() function.

## Weird behaviour
I initially had the form elements for the edit window placed inside the html file and added an event listener to the save button inside the showEditBox() function but that ended up adding multiple event listeners to that button causing it to execute the same amount of times it had been clicked. That's when Smári came to the rescue and we decided to add the form elements inside the showEditBox() function. 

## The end
All in all I'm happy I got it to work but disappointed at how many lines of code it took me to get the functionality it has. I'm sure I can improve the code structure, readability and perhaps give each function more of a focused and simpler purpose in future projects.