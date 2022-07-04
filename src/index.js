let gameListNav = document.querySelector(".game-list")
let gameImg = document.getElementById("detail-image")
let gameTitle = document.getElementById("detail-title")
let gameHighScore = document.getElementById("detail-high-score")
let highScoreForm = document.getElementById("high-score-form")
let gamesArray = []
let currentGameId

const URL = "http://localhost:3000/games"

function renderNav(game) {
  let gameItem = document.createElement("h5")
  gameItem.textContent = `${game.name} (${game.manufacturer_name})`
  gameItem.addEventListener("click", () => showGame(game.id))
  gameListNav.append(gameItem)
}

function showGame(id) {
  let game = gamesArray.find(g => g.id === id)
  currentGameId = game.id
  gameImg.src = game.image
  gameTitle.textContent = game.name
  gameHighScore.textContent = game.high_score
}

function submitForm(e) {
  e.preventDefault()
  let high_score = e.target["score-input"].value
  if (high_score) updateHighScore(parseInt(high_score))
  e.target.reset()
}

function updateHighScore(high_score) {
    let idx = gamesArray.findIndex(game => game.id === currentGameId )
    let newGameObj = {...gamesArray[idx], high_score: high_score}
    gamesArray.splice(idx, 1, newGameObj)
    gameHighScore.textContent = high_score
}

function app() {
  fetch(URL)
    .then(r => r.json())
    .then(games => {
      games.forEach(game => {
        gamesArray.push(game)
        renderNav(game)
      })
      showGame(gamesArray[0].id)
    })
  highScoreForm.addEventListener("submit", submitForm)
}

app()
