const initialCards = [
  {
    name: "Mount Fuji in a clear sky",
    link: "https://unsplash.com/photos/mt-fuji-japan-9Qwbfa_RM94",
  },
  {
    name: "Japanese people walking at night in Tokyo",
    link: "https://unsplash.com/photos/people-walking-near-buildings-at-night-DpPutJwgyW8",
  },
  {
    name: "Architectural photo of Tokyo Tower",
    link: "https://unsplash.com/photos/architectural-photo-of-tower-between-buildings-7H77FWkK_x4",
  },
  {
    name: "Lighted Chinese lantern by an alley",
    link: "https://unsplash.com/photos/lighted-chinese-lantern-5-GNa303REg",
  },
  {
    name: "Himeji Castle",
    link: "https://unsplash.com/photos/photo-of-himeji-castle-wPMvPMD9KBI",
  },
  {
    name: "Two women in purple and pink kimono",
    link: "https://unsplash.com/photos/two-women-in-purple-and-pink-kimono-cATZ2eHu5ys",
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
const postNameInput = addCardForm.querySelector("#image-link");
const postCaptionInput = addCardForm.querySelector("#image-caption");

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
  console.log(postNameInput.value);
  console.log(postCaptionInput.value);
  closeModal(newPostModal);
}

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

initialCards.forEach(function (card) {
  console.log(card["name"]);
});
