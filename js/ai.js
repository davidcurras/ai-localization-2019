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

  SetPosterior: (measurement) => {
    LAI.AI.Prior = LAI.AI.Normalized.slice()
    LAI.AI.Posterior = []
    for (let i = 0; i < LAI.World.Positions.length; i++) {
      if(LAI.World.Positions[i] === measurement) {
        LAI.AI.Posterior.push(LAI.AI.Prior[i] * LAI.World.Sense.PHit)
      } else {
        LAI.AI.Posterior.push(LAI.AI.Prior[i] * LAI.World.Sense.PMiss)
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

  Move: (steps) => {
    LAI.AI.Prior = LAI.AI.Normalized.slice()
    const prior = LAI.AI.Prior.slice()
    LAI.AI.Posterior = []
    for (let i = 0; i < prior.length; i++) {
      // (i+prior.length) makes sure "i" is great enough to avoid negatives
      // (steps % prior.length) makes sure "steps" is lower than prior length
      // "j" is the position next to "i" assuming a circular world
      const j = ((i+prior.length) - (steps % prior.length)) % prior.length
      const jNext = ((i+prior.length-1) - (steps % prior.length)) % prior.length
      const jPrev = ((i+prior.length+1) - (steps % prior.length)) % prior.length
      const exact = LAI.World.Move.PExact * prior[j]
      const overshoot = LAI.World.Move.POvershoot * prior[jNext]
      const undershoot = LAI.World.Move.PUndershoot * prior[jPrev]
      LAI.AI.Posterior[i] = exact + overshoot + undershoot
    }
    LAI.AI.SetNormalized()
  }

}

LAI.AI.Prior = []
LAI.AI.Posterior = []
LAI.AI.Normalized = []
