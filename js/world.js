'use strict'

window.LAI = window.LAI || {}

LAI.World = {
  Sense: {
    PHit: 0.6,
    PMiss: 0.2
  },
  Move: {
    PExact: 0.8,
    POvershoot: 0.1,
    PUndershoot: 0.1
  },
  Measurements: [],
  Movements: [],
  Positions: ['green', 'red', 'red', 'green', 'green']
}
