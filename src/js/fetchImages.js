const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37972717-70d116d5c7dba3fcb6f3ce7e2';

async function fetchImages (inputValue, pageNr) {
    return await fetch(`${BASE_URL}?key=${API_KEY}=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`)
    .then(async resp =>{
        if (!resp.ok) {
            if (resp.status === 404) {
                return []
            }
            throw new Error(resp.status);
        }
        console.log(resp);
        return await resp.json();
    })
    .catch(err => console.error(err))
}

export {fetchImages}