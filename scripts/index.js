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

const editProfileBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close-btn");

const newPostBtn = document.querySelector(".profile__new-post-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Selecting profileForm element from modal profileModal
// and then using profileForm to select inputs
const profileForm = profileModal.querySelector(".modal__form");
const nameInput = profileForm.querySelector("#name");
const descriptionInput = profileForm.querySelector("#description");
// Selecting addCardForm element from modal newPostModal
// and then using addCardForm to select inputs
const addCardForm = newPostModal.querySelector(".modal__form");
const postLinkInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

// The following two functions are reusable and their sole
// function is to close and open modals:

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const newInput = {
    name: postCaptionInput.value,
    link: postLinkInput.value,
  };
  // console.log(postLinkInput.value);
  // console.log(postCaptionInput.value);
  const newCard = getCardElement(newInput);
  cardContainer.prepend(newCard);
  closeModal(newPostModal);
}

// When adding NEW IMAGE, hitting submit it will call handleAddCardSubmit above
addCardForm.addEventListener("submit", handleAddCardSubmit);

editProfileBtn.addEventListener("click", function () {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileCloseBtn.addEventListener("click", function () {
  closeModal(profileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

// Sprint 5 Stage 8:

const cardTemplate = document.querySelector("#cards-template").content;
const cardContainer = document.querySelector(".cards__list");

function getCardElement(data) {
  //For debugging purposes I am using console.log:
  console.log("Data received in getCardElement:", data);
  console.log("data.name:", data.name);
  console.log("data.link:", data.link);
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  return cardElement;
}

initialCards.forEach((card) => {
  const newCard = getCardElement(card);
  cardContainer.prepend(newCard);
});
