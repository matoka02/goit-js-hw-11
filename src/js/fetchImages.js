const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '37972717-70d116d5c7dba3fcb6f3ce7e2';

async function fetchImages(inputValue, pageNumber) {
    return await fetch(
        `${BASE_URL}?key=${API_KEY}&q=${inputValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageNumber}`
    )
        .then(async resp => {
            if (!resp.ok) {
                if (resp.status === 404) {
                    return [];
                }
                throw new Error(resp.status);
            }
            // console.log(resp);      
            return await resp.json();
        })
        .catch(error => {
            console.error(error);
        });
};

export {fetchImages};