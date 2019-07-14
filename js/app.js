const world = ['green', 'red', 'red', 'green', 'green']

const pHit = 0.6
const pMiss = 0.2
const sensed = 'red'

let prior = []
let posterior = []
let normalized = []

const setUniformPrior = () => {
  for (let i = 0; i < world.length; i++) {
    prior[i] = 1 / world.length
  }
}

const setPrior = () => {
  prior = posterior.slice()
  if(!posterior.length) {
    setUniformPrior()
  }
}

const setPosterior = () => {
  posterior = []
  for (let i = 0; i < world.length; i++) {
    if(world[i] === sensed) {
      posterior.push(prior[i] * pHit)
    } else {
      posterior.push(prior[i] * pMiss)
    }
  }
}

const setNormalized = () => {
  normalized = []
  let total = 0
  for (let i = 0; i < posterior.length; i++) {
    total += posterior[i]
  }
  for (let i = 0; i < posterior.length; i++) {
    normalized.push(posterior[i] / total)
  }
}

const renderWorld = () => {
  let html = ''
  for (let i = 0; i < world.length; i++) {
    html += '<div class="tile '+world[i]+'"></div>'
  }
  document.getElementById('world').innerHTML = html
}

const renderPrior = () => {
  let html = ''
  for (let i = 0; i < prior.length; i++) {
    const value = prior[i].toFixed(2)
    html += '<div class="tile grey">'+value+'</div>'
  }
  document.getElementById('prior').innerHTML = html
}

const renderPosterior = () => {
  let html = ''
  for (let i = 0; i < posterior.length; i++) {
    const value = posterior[i].toFixed(2)
    html += '<div class="tile grey">'+value+'</div>'
  }
  document.getElementById('posterior').innerHTML = html
}

const renderNormalized = () => {
  let html = ''
  for (let i = 0; i < normalized.length; i++) {
    const value = normalized[i].toFixed(2)
    html += '<div class="tile grey">'+value+'</div>'
  }
  document.getElementById('normalized').innerHTML = html
}

const renderRobot = () => {
  const worldEl = document.getElementById('world')
  const worldTiles = worldEl.getElementsByClassName('tile')
  for (let i = 0; i < worldTiles.length; i++) {
    worldTiles[i].innerHTML = '' +
      '<img src="images/robot.png" alt="ROBOT">' +
      '<span>'+normalized[i].toFixed(2)+'</span>'
  }
  const worldTilesImg = worldEl.getElementsByTagName('img')
  for (let i = 0; i < worldTilesImg.length; i++) {
    worldTilesImg[i].style.opacity = normalized[i] * 2
  }
}

const render = () => {
  renderWorld()
  renderPrior()
  renderPosterior()
  renderNormalized()
  renderRobot()
}

const run = () => {
  setPrior()
  setPosterior()
  setNormalized()
  render()
}

const init = () => {
  run()
  document.getElementById('run').onclick = run
}

window.onload = init
