/* const url = `https://proxy-itunes-api.glitch.me/search?term=${mediaInput.value}`;
*/

console.log('JavaScript will drive you insane!');
// To test if the code is responding and logging in the console

const search = document.createElement('div');

// a constant search variable, a constant cannot to be reassigned


let input = document.createElement('input');
input.type = 'text';
//the input is the search box we created on HTML, the 'text' is what is tyed inside the box
search.appendChild(input);
// the text(input) inside the search box is added via appendChild to the base URL below

let searchBaseUrl = 'https://itunes.apple.com/search?term=';

// the base search URL is the URL we got from the API data. After the = sign the name of the artist is entered to allow for the search, otherwise the rest of the url above is the same for every search

let searchForm = document.querySelector('#search-form') 
searchForm.addEventListener('submit', (event) => {
    // event listener to allow javascript to let the user to submit the search
    event.preventDefault() 
    //prevent default settings 
    
    let searchBox = document.querySelector('#search-box')

    let searchUrl = `${searchBaseUrl}${searchBox.value}`
//this adds the term the user enters in the search box to the base URL which created above with the letSearchBaseUrl = url
    console.log('search url', searchUrl)
    getSearchResults(searchUrl)
//telling JS to get the search results

})

function getSearchResults(url) {
fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    //method and headers are fetch options. The GET method requests data, a representation of a specific resource
})
// fetch is used to make a request to a server and load the API data onto the page using JSON, though I have heard there are other ways to do this like XML

.then(response => {
    if(!response.ok){

        // ! is the not operator, so if the response is not ok, it gives an error in response
        throw Error(response.status);
    } else {
        console.log(response);
        return response.json();
    }
})
// the return response.json returning data , the if else sets conditions for the data to be returned, either an error the the API data via JSON

.then(data => {
    let songs = data.results;
    showResults(songs);



}).catch(error => {
    console.log(error);
    alert(`ERROR${error}`);
    // this code tells the user there was a search error if they enter something is wrong with the code or search terms
})
}

let resultsDiv = document.querySelector('#results');
console.log('results div', resultsDiv);

function showResults(songArray) {
    resultsDiv.innerHTML = ('')
    console.log(songArray);
    if (songArray.length === 0) {
        resultsDiv.innerText = `No results found`;
        // if no search results are found
    } else {
    for (let song of songArray){
        
        let recordDiv = document.createElement('div');
        recordDiv.classList.add('record');
        // records are the individual results displayed in the search results, similar to the customer 
        // database project, adding classlist and creating div
        resultsDiv.appendChild(recordDiv);

        let imageDiv = document.createElement('img');
        imageDiv.classList.add('image');
        imageDiv.src = song.artworkUrl100;
        recordDiv.appendChild(imageDiv);

        //this adds the image for the song or album displayed in the search results, creating an element and providing the source

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('div');
        titleDiv.innerText = `${song.trackName}`;
        recordDiv.appendChild(titleDiv);

        // this creates the title for each song on the results, again similar to the customer database exercise

        let artistDiv = document.createElement('div');
        artistDiv.classList.add('div');
        artistDiv.innerText = `${song.artistName}`;
        // showing the artist name for each song
        recordDiv.appendChild(artistDiv);

        
        
        
        

        let audio = document.querySelector('#audio-preview')
        // selecting the audio preview from the iTunes api 
        let currentSong = document.querySelector('.current-song')

        // selecting the current song to be displayed on the page
        function playAudio() {
            audio.src = song.previewUrl
            currentSong.innerText = `🏛️Playing Now:🏛️ ${song.trackName} by ${song.artistName}`
            audio.play();
        
        }
        recordDiv.addEventListener('click', e =>
        // eventListener that tells the code to wait for a click in order to play a song
        setTimeout(playAudio, 1800)
    )}
    }
    }

