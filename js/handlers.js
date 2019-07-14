'use strict'

window.LAI = window.LAI || {}

LAI.Handlers = {

  Init:() => {
    LAI.Handlers.Run()
    document.getElementById('run').onclick = LAI.Handlers.Run
  },

  Run: () => {
    // Process
    LAI.AI.SetPrior()
    LAI.AI.SetPosterior()
    LAI.AI.SetNormalized()
    // Render
    LAI.Render.World()
    LAI.Render.Prior()
    LAI.Render.Posterior()
    LAI.Render.Normalized()
    LAI.Render.Robot()
  }

}
