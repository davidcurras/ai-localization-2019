'use strict'

window.LAI = window.LAI || {}

LAI.Handlers = {

  Init: () => {
    LAI.AI.SetUniform()
    LAI.Handlers.Render()
  },

  Attach: () => {
    document.getElementById('run').onclick = LAI.Handlers.Run
    document.getElementById('add-position').onclick = LAI.Handlers.AddPosition
    const removeBtns = document.getElementsByClassName('remove-position')
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].onclick = LAI.Handlers.RemovePosition
    }
  },

  AddPosition: (evt) => {
    const selected = document.getElementById('position-type').value
    LAI.World.Positions.push(selected)
    LAI.Handlers.Init()
    const removeBtns = document.getElementsByClassName('remove-position')
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].onclick = LAI.Handlers.RemovePosition
    }
  },

  RemovePosition: (evt) => {
    const index = parseInt(evt.target.parentElement.id.slice(1))
    LAI.World.Positions.splice(index, 1)
    LAI.Handlers.Init()
  },

  Run: () => {
    // Set Uniform for initialization
    if(!LAI.AI.Posterior.length) {
      LAI.Handlers.Init()
      return
    }
    // return if measurements list is empty
    if(!LAI.World.Measurements.length) return
    const measurement = LAI.World.Measurements.shift()
    if(!measurement) return
    // Process
    LAI.AI.SetPrior()
    LAI.AI.SetPosterior(measurement)
    LAI.AI.SetNormalized()
    LAI.Handlers.Render()
  },

  Render: () => {
    LAI.Render.World()
    LAI.Render.Prior()
    LAI.Render.Posterior()
    LAI.Render.Normalized()
    LAI.Render.Robot()
    LAI.Render.Measurements()
    LAI.Handlers.Attach()
  }

}
