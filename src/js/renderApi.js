import apiService from "./apiService.js";
import refs from "./refs.js";
import template from "../templates/template.hbs";
import debounce from "lodash.debounce";
import * as basicLightbox from 'basiclightbox';
import "basiclightbox/dist/basicLightbox.min.css"

const loadMoreButton = document.createElement("button")
loadMoreButton.textContent = "Load More ..."
loadMoreButton.classList.add("loadmore-button")

refs.galleryList.addEventListener("click", (e) => {
    if (e.target.nodeName === "IMG") {
        const instance = basicLightbox.create(`
        <div class="modal">
        <img class="lightBoxImage" src="${e.target.dataset.src}" width="800" height="600">
        </div>`);
        instance.show()
    }
    // const imgModal = document.querySelector(".lightBoxImage")
})

refs.form.addEventListener("input", debounce(e => {
    e.preventDefault();
    refs.galleryList.innerHTML = ""
    apiService.resetPage()
    apiService.query = e.target.value
    rengeApi()
    refs.input.value = ""
}, 1000),
)

loadMoreButton.addEventListener("click", loadMore)

function rengeApi() {
    apiService.fetchImage().then(({ hits }) => rengeImage(hits))
    refs.body.insertAdjacentElement("beforeend", loadMoreButton)
}
function rengeImage(data) {
    const item = template(data)
    refs.galleryList.insertAdjacentHTML("beforeend", item)
}
function loadMore() {
    apiService.setPage();
    apiService.fetchImage().then(({ hits }) => {
        rengeImage(hits)
    })
    setTimeout(() => {
        window.scrollTo({
            top: document.documentElement.offsetHeight - 1500,
            behavior: "smooth"
        })
    }, 500);
}

