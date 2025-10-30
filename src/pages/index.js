import {
  settings,
  enableValidation,
  disableBtn,
  resetValidation,
} from "../scripts/validation.js";

import "./index.css";

import Api from "../utils/Api.js";

import { setButtonText } from "../utils/helpers.js";

// --- 1. CONSTANTS ---

// Instantiating an new api with parameters
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "6d7c669f-6037-4631-ac77-1be386021f0b",
    "Content-Type": "application/json",
  },
});

// Select cards-template and cards__list card container
const cardTemplate = document.querySelector("#cards-template").content;
const cardContainer = document.querySelector(".cards__list");

// Profile Avatar
const profileAvatar = document.querySelector(".profile__avatar");

// Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

// Profile buttons and Profile Modal
const profileModal = document.querySelector("#edit-profile-modal");
const editProfileBtn = document.querySelector(".profile__edit-btn");

// Profile name and description selectors
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Profile modal form inputs
const profileForm = document.forms["profile-form"];
const nameInput = profileForm.querySelector("#profile-name");
const descriptionInput = profileForm.querySelector("#profile-description");

// New Post buttons and New Post Modal
const newPostModal = document.querySelector("#new-post-modal");
const newPostBtn = document.querySelector(".profile__new-post-btn");

// New Post modal form inputs
const addCardForm = document.forms["card-form"];
const formSubmitButton = addCardForm.querySelector(".modal__save-btn");
const postLinkInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

// Select modal image preview
const previewImageModal = document.querySelector("#preview-modal");
const modalImage = previewImageModal.querySelector(".modal__image");
const modalCaption = previewImageModal.querySelector(".modal__caption");

// Const array for all modals
const allModals = Array.from(document.querySelectorAll(".modal"));

// Const for all close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

// Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__delete-form");

// Cancel button when user deletes a post
const cancelButton = document.querySelector(".modal__cancel-btn");

// Let variables for 'selected card' and 'selected card ID'
let selectedCard, selectedCardId;

// --- 2. FUNCTIONS ---

// Calling getAppInfo() method to get new card and user info
api
  .getAppInfo()
  //distructuring cards, userInfo, ...etc into an array
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      renderCard(card);
    });
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// Universal function for adding a card into the section using
// any method eg. 'prepend', 'append' etc.
function renderCard(card, method = "prepend") {
  const cardElement = getCardElement(card);
  cardContainer[method](cardElement);
}
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

// Function called when clicking the PROFILE 'save' submit button
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);
  api
    .editUserInfo({ name: nameInput.value, about: descriptionInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profileModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

// Function called when clicking the NEW POST 'save' submit button
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .postNewImage({ name: postCaptionInput.value, link: postLinkInput.value })
    .then((data) => {
      renderCard(data);
      evt.target.reset(); // Clears form inputs after submissions
      disableBtn(formSubmitButton, settings); //disables submit botton
      closeModal(newPostModal); // closes modal after card is added
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

// Function to handle Avatar submit
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatarInfo({ avatar: avatarInput.value })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

// Handle delete submit function
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const deleteBtn = evt.submitter;
  setButtonText(deleteBtn, true, "Delete", "Deleting...");
  api
    .deleteCard({ id: selectedCardId })
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteBtn, false, "Delete", "Deleting...");
    });
}

// Delete card function
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  // open the delete confirmation modal here
  openModal(deleteModal);
}
// Like/unlike function
function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_active");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      if (isLiked) {
        evt.target.classList.remove("card__like-btn_active");
      } else {
        evt.target.classList.add("card__like-btn_active");
      }
    })
    .catch(console.error);
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
  // Check if data.isLiked is true, then add class if so
  if (data.isLiked) {
    likeButton.classList.add("card__like-btn_active");
  }

  // Event listeners INSIDE getCardElement() -> Like button, delete card, preview card:
  likeButton.addEventListener("click", (evt) => handleLike(evt, data._id));

  deleteCardBtn.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id)
  );

  cardImage.addEventListener("click", function () {
    modalCaption.textContent = data.name;
    modalImage.src = data.link;
    modalImage.alt = data.name;
    openModal(previewImageModal);
  });
  return cardElement;
}

// Universal handler for any close button
closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
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

// New Post open handler:
newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

// Cancel button handler when deleting an image
cancelButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

// Edit avatar modal handler
avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

// Feature to close modals when clicking outside the modal
allModals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
});

// Submit event handlers for forms
addCardForm.addEventListener("submit", handleAddCardSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);
deleteForm.addEventListener("submit", handleDeleteSubmit);
// Form validation call
enableValidation(settings);
