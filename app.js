const addContactFormBtn = document.querySelector(".add-form-btn");
const clearListBtn = document.querySelector(".clear-list-btn");
const addContactForm = document.querySelector(".add-form");
const addContactBtn = document.querySelector("#add-contact-btn");
const contentBox = document.querySelector(".content-box");
const detailsBox = document.querySelector(".details-box");
const closeFormBtn = document.getElementById("close-form-btn");
const searchBox = document.querySelector(".search-box");

let nameInput = document.getElementById("name");
let telInput = document.getElementById("tel");
let contacts = [];

addContactFormBtn.addEventListener("click", formOpen);
clearListBtn.addEventListener("click", clearContacts);
addContactBtn.addEventListener("click", addContact);
contentBox.addEventListener("click", showDetails);
closeFormBtn.addEventListener("click", closeForm);
searchBox.addEventListener("keyup", searchFunc);
let selectContactIndex;

// open form for add contact
function formOpen() {
  addContactForm.classList.add("form-open");
}
// close the form add contact
function closeForm() {
  nameInput.value = telInput.value = "";
  addContactForm.classList.remove("form-open");
  selectContactIndex = "";
}
// close details card
function closeDetailCard() {
  selectContactIndex = "";
  detailsBox.innerHTML = "";
}

function deleteContact() {
  contacts.splice(selectContactIndex, selectContactIndex + 1);
  updateLocalStorage();
  renderContacts(contacts);
  closeDetailCard();
  selectContactIndex = "";
}

function editContact() {
  closeDetailCard();
  formOpen();
  nameInput.value = contacts[selectContactIndex].name;
  telInput.value = contacts[selectContactIndex].tel;
}
// show details contact by click
function showDetails(e) {
  const selectContact = e.target.closest(".contact-list");
  // show index selected child from parent node in DOM
  if (!selectContact) return;

  closeForm();
  selectContactIndex = Array.prototype.indexOf.call(
    contentBox.children,
    selectContact
  );
  const nameSelected = selectContact.firstElementChild.innerText;
  const telSelected = selectContact.lastElementChild.innerText;

  const DetailsHTML = `
    <div class="contact-details form-open">
      <div class="detail-up-div">
        <p>${nameSelected}</p>
        <p>${telSelected}</p>
      </div>
      <div class="detail-down-div">
        <button onclick="deleteContact()">
           <i class="fas fa-trash-alt detail__icon"></i>
        </button>
        <button onclick="editContact()">
           <i class="fas fa-user-edit detail__icon"></i>
        </button>
        <button onclick="closeDetailCard()">
           <i class="fas fa-window-close close__icon"></i>
        </button>
      </div>
    </div>
  `;
  detailsBox.insertAdjacentHTML("beforeend", DetailsHTML);
}
// show contacs list on display
function renderContacts(contactsArr) {
  contentBox.innerHTML = "";
  contactsArr.forEach((contact) => {
    let contactHtml = `
        <div class="contact-list">
        <p>${contact.name}</p>
        <p>${contact.tel}</p>
      </div>
        `;
    contentBox.insertAdjacentHTML("beforeend", contactHtml);
  });
}
// add contacts to contacts list
function addContact() {
  if (!nameInput.value || !telInput.value) {
    alert("هر دو مورد خواسته شده را وارد کنید.");
    return;
  }

  selectContactIndex
    ? (contacts[selectContactIndex] = {
        name: nameInput.value,
        tel: telInput.value,
      })
    : contacts.push({ name: nameInput.value, tel: telInput.value });

  updateLocalStorage();
  renderContacts(contacts);
  closeForm();
}

function clearContacts() {
  localStorage.clear("localContacts");
  contacts = [];
  renderContacts(contacts);
}

function searchFunc() {
  let searchContacs = [];
  contacts.forEach((contact) => {
    if (contact.name.toLowerCase().includes(searchBox.value.toLowerCase())) {
      searchContacs.push(contact);
    }
  });
  renderContacts(searchContacs);
}

function getLocalContacts() {
  const storage = JSON.parse(localStorage.getItem("localContacts"));
  if (!storage) return;
  contacts = storage;
  renderContacts(contacts);
}

function updateLocalStorage() {
  localStorage.setItem("localContacts", JSON.stringify(contacts));
}

getLocalContacts();
