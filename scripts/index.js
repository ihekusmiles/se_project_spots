// --- 1. CONSTANTS ---
const initialCards = [
  {
    name: "Seceda mountains in Italy",
    link: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Rydal Water in United Kingdom",
    link: "https://plus.unsplash.com/premium_photo-1719943510871-7831aeef9ab6?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Bridge over a green waterfall",
    link: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Himeji Castle in Japan",
    link: "https://images.unsplash.com/photo-1491884662610-dfcd28f30cfb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Chichén Itzá in Mexico",
    link: "https://images.unsplash.com/photo-1568402102990-bc541580b59f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "The Empire State Building in New York City",
    link: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "South Korean women in Hanbok",
    link: "https://images.unsplash.com/photo-1602479185195-32f5cd203559?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Japanese temple in Japan",
    link: "https://images.unsplash.com/photo-1574236170880-fbbca132d83d?q=80&w=626&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Independence Angel in Mexico",
    link: "https://images.unsplash.com/photo-1677682579313-5bfee6dd05a5?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Profile buttons and Profile Modal
const editProfileBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");

// New Post buttons and New Post Modal
const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");

// Profile name and description selectors
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Profile modal inputs
const profileForm = document.forms["profile-form"];

const nameInput = profileForm.querySelector("#profile-name");
const descriptionInput = profileForm.querySelector("#profile-description");

// New Post modal inputs
const addCardForm = document.forms["card-form"];
const formSubmitButton = addCardForm.querySelector(".modal__save-btn");
const postLinkInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

// Select cards-template and cards__list card container
const cardTemplate = document.querySelector("#cards-template").content;
const cardContainer = document.querySelector(".cards__list");

// Select modal image preview
const previewImageModal = document.querySelector("#preview-modal");
const modalImage = previewImageModal.querySelector(".modal__image");
const modalCaption = previewImageModal.querySelector(".modal__caption");

// Const array for all modals
const allModals = Array.from(document.querySelectorAll(".modal"));

// Const for all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

// --- 2. FUNCTIONS ---

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
}

// Defining handler function for Escape button
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

// Universal handler for any close button
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

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
  // Using universal function to render card
  renderCard(newInput);
  closeModal(newPostModal);
  evt.target.reset(); // or addCardForm.reset()
  disableBtn(formSubmitButton, settings);
}

// Function that creates a new card element, card name, card link and card alt
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-btn");
  const deleteCardBtn = cardElement.querySelector(".card__delete-btn");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  // Event listeners inside function -> Like button, delete card, preview card:
  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-btn_active");
  });
  deleteCardBtn.addEventListener("click", function () {
    cardElement.remove();
  });
  cardImage.addEventListener("click", function () {
    modalCaption.textContent = data.name;
    modalImage.src = data.link;
    modalImage.alt = data.name;
    openModal(previewImageModal);
  });
  return cardElement;
}

// Universal function for adding a card into the section using
// any method eg. 'prepend', 'append' etc.
function renderCard(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardContainer[method](cardElement);
}
// For each card render card using function renderCard()
initialCards.forEach((card) => {
  renderCard(card);
});

// --- 3. EVENT HANDLERS ---
// Profile edit open and close handlers:
editProfileBtn.addEventListener("click", function () {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(
    profileForm,
    [nameInput, descriptionInput],
    formSubmitButton,
    settings
  );
  disableBtn(formSubmitButton, settings);
});

// New Post open and close handlers:
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Feature to close modals when clicking outside the modal
allModals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
});
