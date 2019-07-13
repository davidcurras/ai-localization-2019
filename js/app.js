const world = ['green', 'red', 'red', 'green', 'green']

const pHit = 0.6
const pMiss = 0.2
const sensed = 'red'

const current = []
const prior = []
const posterior = []

const setUniformCurrent = () => {
  for (let i = 0; i < world.length; i++) {
    current[i] = 1 / world.length
  }
}

const setPrior = () => {
  for (let i = 0; i < world.length; i++) {
    if(world[i] === sensed) {
      prior.push(current[i] * pHit)
    } else {
      prior.push(current[i] * pMiss)
    }
  }
}

const setPosterior = () => {
  let total = 0
  for (let i = 0; i < prior.length; i++) {
    total += prior[i]
  }
  for (let i = 0; i < prior.length; i++) {
    posterior.push(prior[i] / total)
  }
}

const renderWorld = () => {
  let html = ''
  for (let i = 0; i < world.length; i++) {
    html += '<div class="tile '+world[i]+'"></div>'
  }
  document.getElementById('world').innerHTML = html
}

const renderCurrent = () => {
  let html = ''
  for (let i = 0; i < current.length; i++) {
    const value = current[i].toFixed(2)
    html += '<div class="tile grey">'+value+'</div>'
  }
  document.getElementById('current').innerHTML = html
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

const renderRobot = () => {
  const worldEl = document.getElementById('world')
  const worldTiles = worldEl.getElementsByClassName('tile')
  for (let i = 0; i < worldTiles.length; i++) {
    worldTiles[i].innerHTML = '' +
      '<img src="images/robot.png" alt="ROBOT">' +
      '<span>'+posterior[i].toFixed(2)+'</span>'
  }
  const worldTilesImg = worldEl.getElementsByTagName('img')
  for (let i = 0; i < worldTilesImg.length; i++) {
    worldTilesImg[i].style.opacity = posterior[i] * 2
  }
}

const init = () => {
  setUniformCurrent()
  setPrior()
  setPosterior()
  renderWorld()
  renderCurrent()
  renderPrior()
  renderPosterior()
  renderRobot()
}

window.onload = init
