'use strict'

window.LAI = window.LAI || {}

LAI.Render = {

  World: () => {
    let html = ''
    for (let i = 0; i < LAI.World.Positions.length; i++) {
      html += '<div class="tile flex-col-a shadow '+LAI.World.Positions[i]+'"></div>'
    }
    document.getElementById('world').innerHTML = html
  },

  Prior: () => {
    let html = ''
    for (let i = 0; i < LAI.AI.Prior.length; i++) {
      const value = LAI.AI.Prior[i].toFixed(2)
      html += '<div class="tile flex-col-a shadow grey">'+value+'</div>'
    }
    document.getElementById('prior').innerHTML = html
  },

  Posterior: () => {
    let html = ''
    for (let i = 0; i < LAI.AI.Posterior.length; i++) {
      const value = LAI.AI.Posterior[i].toFixed(2)
      html += '<div class="tile flex-col-a shadow grey">'+value+'</div>'
    }
    document.getElementById('posterior').innerHTML = html
  },

  Normalized: () => {
    let html = ''
    for (let i = 0; i < LAI.AI.Normalized.length; i++) {
      const value = LAI.AI.Normalized[i].toFixed(2)
      html += '<div class="tile flex-col-a shadow grey">'+value+'</div>'
    }
    document.getElementById('normalized').innerHTML = html
  },

  Robot: () => {
    const worldEl = document.getElementById('world')
    const worldTiles = worldEl.getElementsByClassName('tile')
    for (let i = 0; i < worldTiles.length; i++) {
      worldTiles[i].innerHTML = '' +
        '<img src="images/robot.png" alt="ROBOT">' +
        '<span>'+LAI.AI.Normalized[i].toFixed(2)+'</span>'
    }
    const worldTilesImg = worldEl.getElementsByTagName('img')
    for (let i = 0; i < worldTilesImg.length; i++) {
      worldTilesImg[i].style.opacity = LAI.AI.Normalized[i] * 2
    }
  }

}
