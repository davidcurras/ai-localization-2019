'use strict'

window.LAI = window.LAI || {}

LAI.Handlers = {

  Init: () => {
    LAI.Handlers.Run()
    LAI.Handlers.Attach()
  },

  Attach: () => {
    document.getElementById('run').onclick = LAI.Handlers.Run
  },

  Run: () => {
    // Set Uniform for initialization
    if(!LAI.AI.Posterior.length) {
      LAI.AI.SetUniform()
      LAI.Handlers.Render()
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
  }

}
