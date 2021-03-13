
var charEl = document.getElementById("inputCharacter");
var submitEl = document.getElementById("submitBtn");
let movieBtnEl = document.getElementById("movieBtn");
var movieInputEl = document.getElementById("inputMovie");
var charArr = [];

secretKey = prompt("Please enter the secret key");


function marvelChar(){
  var character = charEl.value;
  if (character) {
    charArr.push(character);
    localStorage.setItem("search", JSON.stringify(charArr));
    getCharacter(character);
    renderSearchHistory();
  } else {
    alert('Please enter a character');
  }
}

function getCharacter(charEl) {
  var requestUrl = 'https://gateway.marvel.com:443/v1/public/characters?name=' + charEl + "&ts=1" + "&apikey=" + key + "&hash=e2a858abc628bf93fb6ac66501d70db5";
  let charInfo = $(".char-info");
  charInfo.empty();
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      //Getting the character name
      let charName = data.data.results[0].name;
      //Getting the character description
      let charDesc = data.data.results[0].description;
      //Getting the image path from results
      let charImage = data.data.results[0].thumbnail.path;
      //Getting the image extension from results
      let charImageExt = data.data.results[0].thumbnail.extension;
      //Constructing the image path
      let image = charImage + "/portrait_medium." + charImageExt
      //setting the character name, description and image
      $("#charName").text(charName);
      $("#charDesc").text(charDesc);
      $(".char-image").attr("src", image);
      let x = data.data.results[0].urls;
      $.each(x, function (i, item) {
        $("<li/>").html($("<a>").attr("href", item.url).text(charName + " " + item.type)).appendTo(charInfo);
      });

    })
}
submitEl.addEventListener("click", marvelChar);
var key = cryptedKey(secretKey);
function cryptedKey(secretKey) {
  var bytes = CryptoJS.AES.decrypt("U2FsdGVkX1+e5165l/K6go5vrvAMZlD+BURW1Nj4RUlmkl8sNkj4IiODCzBkJlniNHUdQNjfyVfBCPeyh/isAQ==", secretKey.toString());
  plaintext = bytes.toString(CryptoJS.enc.Utf8);
  console.log(plaintext);
  return plaintext;
}

movieBtnEl.addEventListener("click",  movieSubmitForm);

function movieSubmitForm(){
  var movieInputEl = $("#inputMovie").val();
  window.location.assign('./index2.html?repo=' + movieInputEl + "?key=" + secretKey)

}


//Function to display the list of search history accessing it from localStorage.
function renderSearchHistory() {
  var storedInitials = JSON.parse(localStorage.getItem("search"));
  charArr = storedInitials;
  var locationEl = $(".history-search-results");
  var searchHistory = document.createElement("ul");
  searchHistory.setAttribute("class", "list-group");
  for (var i = 0; i < charArr.length; i++) {
    var searchHistoryList = document.createElement("li");
    searchHistoryList.setAttribute("class", "list-group-item");
    searchHistoryList.textContent = charArr[i];
    locationEl.append(searchHistory);
  }
  searchHistory.append(searchHistoryList);
}