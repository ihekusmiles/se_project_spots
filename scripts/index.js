// --- 1. CONSTANTS ---
const initialCards = [
  {
    name: "Mount Fuji in a clear sky",
    link: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Japanese people walking at night in Tokyo",
    link: "https://images.unsplash.com/photo-1501560379-05951a742668?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Architectural photo of Tokyo Tower",
    link: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lighted Chinese lantern by an alley",
    link: "https://images.unsplash.com/photo-1534214526114-0ea4d47b04f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Himeji Castle",
    link: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Two women in purple and pink kimono",
    link: "https://images.unsplash.com/photo-1494588024300-e9df7ff98d78?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Profile buttons and Profile Modal
const editProfileBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close-btn");

// New Post buttons and New Post Modal
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

// Profile name and description selectors
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Profile modal inputs
const profileForm = profileModal.querySelector(".modal__form");
const nameInput = profileForm.querySelector("#name");
const descriptionInput = profileForm.querySelector("#description");

// New Post modal inputs
const addCardForm = newPostModal.querySelector(".modal__form");
const postLinkInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

// Select cards-template and cards__list card container
const cardTemplate = document.querySelector("#cards-template").content;
const cardContainer = document.querySelector(".cards__list");

// --- 2. FUNCTIONS ---

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Function called when clicking the PROFILE 'save' submit button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileModal);
}

// Function called when clicking the NEW POST 'save' submit button
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newInput = {
    name: postCaptionInput.value,
    link: postLinkInput.value,
  };
  const newCard = getCardElement(newInput);
  cardContainer.prepend(newCard);
  closeModal(newPostModal);
}

// Function that creates a new card element, card name, card link and card alt
function getCardElement(data) {
  //For debugging purposes I am using console.log for this data:
  // console.log("Data received in getCardElement:", data);
  // console.log("data.name:", data.name);
  // console.log("data.link:", data.link);

  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-btn_active");
  });
  return cardElement;
}

// --- 3. EVENT HANDLERS ---
// Profile edit open and close handlers:
editProfileBtn.addEventListener("click", function () {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileCloseBtn.addEventListener("click", function () {
  closeModal(profileModal);
});

// New Post open and close handlers:
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Clicking "submit" save button will call the handleAddCardSubmit function
addCardForm.addEventListener("submit", handleAddCardSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Loops through each item in the array, creates a new card
// and prepends it to cardContainer.
// This code is only here to grab the "hard-coded" 6 cards
initialCards.forEach((card) => {
  const newCard = getCardElement(card);
  cardContainer.prepend(newCard);
});
