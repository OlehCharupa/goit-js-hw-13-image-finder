import apiService from "./apiService.js"
import refs from "./refs.js"
import template from "../templates/template.hbs"
import debounce from "lodash.debounce"
// console.log(refs);

const loadMoreButton = document.createElement("button")
loadMoreButton.textContent = "Load More ..."
loadMoreButton.classList.add("loadmore-button")

refs.form.addEventListener("input", debounce(e => {
    e.preventDefault();
    console.dir(e.target.value);
    apiService.query = e.target.value
    rengeApi()
    refs.input.value = ""
    // if (apiService.query.length >= 3) {
    // }

}, 1000),

)



function rengeApi() {
    apiService.fetchImage().then(({ hits }) => rengeImage(hits))
    refs.body.insertAdjacentElement("beforeend", loadMoreButton)

}
function rengeImage(data) {
    const item = template(data)
    refs.galleryList.insertAdjacentHTML("beforeend", item)
}


// if (!refs.galleryList) {

// } else {
// }