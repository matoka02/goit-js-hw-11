async function fetchImages (inputValue, pageNr) {
    return await fetch(`https://pixabay.com/api/?key=29588079-fbc492831fdad231bf7222b96&q=${inputValue}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNr}`)
    .then(async resp =>{
        if (!resp.ok) {
            if (resp.status === 404) {
                return []
            }
            throw new Error(resp.status);
        }
        return await resp.json();
    })
    .catch(err => console.error(err))
}

export {fetchImages}