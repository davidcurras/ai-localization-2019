'use strict'

window.LAI = window.LAI || {}

LAI.AI = {

  SetUniform: () => {
    LAI.AI.Prior = []
    for (let i = 0; i < LAI.World.Positions.length; i++) {
      LAI.AI.Prior[i] = 1 / LAI.World.Positions.length
    }
    LAI.AI.Posterior = LAI.AI.Prior.slice()
    LAI.AI.Normalized = LAI.AI.Prior.slice()
  },

  SetPrior: () => {
    LAI.AI.Prior = LAI.AI.Normalized.slice()
  },

  SetPosterior: (measurement) => {
    LAI.AI.Posterior = []
    for (let i = 0; i < LAI.World.Positions.length; i++) {
      if(LAI.World.Positions[i] === measurement) {
        LAI.AI.Posterior.push(LAI.AI.Prior[i] * LAI.World.PHit)
      } else {
        LAI.AI.Posterior.push(LAI.AI.Prior[i] * LAI.World.PMiss)
      }
    }
  },

  SetNormalized: () => {
    LAI.AI.Normalized = []
    let total = 0
    for (let i = 0; i < LAI.AI.Posterior.length; i++) {
      total += LAI.AI.Posterior[i]
    }
    for (let i = 0; i < LAI.AI.Posterior.length; i++) {
      LAI.AI.Normalized.push(LAI.AI.Posterior[i] / total)
    }
  },

}

LAI.AI.Prior = []
LAI.AI.Posterior = []
LAI.AI.Normalized = []
