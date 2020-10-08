import refs from "./refs.js"

const apiKey = "18623369-889f6d1cb3a21a0bcc2be87ce";
const baseUrl = `https://pixabay.com/api/`
// let query = ""
// let page = 1
// let perPage = 12

export default {
    _query: "",
    page: 1,
    perPage: 12,

    fetchImage() {
        let url = `${baseUrl}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=${this.perPage}&key=${apiKey}`;
        return fetch(url)
            .then(res => res.json())
            .catch(error => displayError(error))
    },
    setPage() {
        return this.page++;
    },
    get query() {
        return this._query;
    },
    set query(newQuery) {
        this._query = newQuery;
    },
}




function displayError(error) {
    const errorH2 = document.createElement("h2");
    errorH2.textContent = error;
    refs.body.prepend(errorH2)
}