import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector(".gallery");
let lightbox = null;
const endMessageContainer = document.querySelector(".end-message");
const loadMoreBtn = document.querySelector(".load-more");

export function createGallery(images, isNewGallery) {
  const markup = images.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
      `<a href="${largeImageURL}" class="gallery-item">
        <img src="${webformatURL}" alt="${tags}" />
        <div class="info">
          <p>👍 ${likes}</p>
          <p>👀 ${views}</p>
          <p>💬 ${comments}</p>
          <p>⬇️ ${downloads}</p>
        </div>
      </a>`
  ).join("");

  if (isNewGallery) {
    galleryContainer.innerHTML = markup;
  } else {
    galleryContainer.insertAdjacentHTML("beforeend", markup);
  }

  if (!lightbox) {
    lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = "";
  if (lightbox) {
    lightbox.destroy();
    lightbox = null;
  }
}

export function showLoader() {
  document.querySelector(".loader").classList.add("visible");
}

export function hideLoader() {
  document.querySelector(".loader").classList.remove("visible");
}

export function showEndMessage() {
  endMessageContainer.classList.remove("hidden");
  endMessageContainer.textContent = "We're sorry, but you've reached the end of search results.";
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove("hidden");
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add("hidden");
}
