import { getImagesByQuery } from "./js/pixabay-api.js";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showEndMessage,
} from "./js/render-functions.js";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const input = form.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector(".load-more");
const endMessageContainer = document.querySelector(".end-message");

let currentPage = 1;
let currentQuery = "";
let totalHits = 0;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.error({ message: "Please enter a search query!" });
    return;
  }

  resetGallery(query);
  await loadImages(false); 
});

loadMoreBtn.addEventListener("click", async () => {
  currentPage++;
  await loadImages(true); 
});

function resetGallery(query) {
  clearGallery();
  showLoader();
  loadMoreBtn.classList.add("hidden");
  endMessageContainer.classList.add("hidden");
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
}

async function loadImages(scrollOnLoad) {
  showLoader();
  try {
    const { images, total } = await getImagesByQuery(currentQuery, currentPage);
    hideLoader();
    totalHits = total;

    if (!images.length) {
      iziToast.info({
        message:
     "Sorry, there are no images matching your search query. Please try again!"
      });
      loadMoreBtn.classList.add("hidden");
      return;
    }

    createGallery(images, currentPage === 1);

    if (totalHits <= currentPage * 15) {
      loadMoreBtn.classList.add("hidden");
      showEndMessage();
    } else {
      loadMoreBtn.classList.remove("hidden");
    }

    if (scrollOnLoad) {
      smoothScrollToNext();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({ message: "Something went wrong while loading images." });
    console.error(error);
  } finally {
    form.reset();
  }
}

function smoothScrollToNext() {
  const firstCard = document.querySelector(".gallery .gallery-item");

  if (firstCard) {
    const { height: cardHeight } = firstCard.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 3,
      behavior: "smooth",
    });
  }
}
