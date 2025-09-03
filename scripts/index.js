// --- 1. CONSTANTS ---
const initialCards = [
  {
    name: "Moutain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "Val thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
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
const nameInput = profileForm.querySelector("#profile-name");
const descriptionInput = profileForm.querySelector("#profile-description");

// New Post modal inputs
const addCardForm = newPostModal.querySelector(".modal__form");
const postLinkInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

// Select cards-template and cards__list card container
const cardTemplate = document.querySelector("#cards-template").content;
const cardContainer = document.querySelector(".cards__list");

// Select modal image preview
const previewImageModal = document.querySelector("#preview-modal");
const closePreviewImage = previewImageModal.querySelector(
  ".modal__close-btn_type_preview"
);
const modalImage = previewImageModal.querySelector(".modal__image");
const modalCaption = previewImageModal.querySelector(".modal__caption");

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
  evt.target.reset(); // or addCardForm.reset()
}

// Close image preview modal
closePreviewImage.addEventListener("click", function () {
  closeModal(previewImageModal);
});

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
  // Event listeners inside function:
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
