'use strict'

window.LAI = window.LAI || {}

LAI.Handlers = {

  Init: () => {
    LAI.AI.SetUniform()
    LAI.Handlers.Render()
  },

  Attach: () => {
    document.getElementById('sense').onclick = LAI.Handlers.Sense
    document.getElementById('move').onclick = LAI.Handlers.Move
    LAI.Handlers.AttachPosition()
    LAI.Handlers.AttachMeasurement()
    LAI.Handlers.AttachMovement()
  },

  AttachPosition: () => {
    document.getElementById('add-position').onclick = LAI.Handlers.AddPosition
    const remPosBtns = document.getElementsByClassName('remove-position')
    for (let i = 0; i < remPosBtns.length; i++) {
      remPosBtns[i].onclick = LAI.Handlers.RemovePosition
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

  AttachMeasurement: () => {
    document.getElementById('add-measurement').onclick = LAI.Handlers.AddMeasurement
    const remMeasureBtns = document.getElementsByClassName('remove-measurement')
    for (let i = 0; i < remMeasureBtns.length; i++) {
      remMeasureBtns[i].onclick = LAI.Handlers.RemoveMeasurement
    }
  },

  AddMeasurement: (evt) => {
    const selected = document.getElementById('measurement-type').value
    LAI.World.Measurements.push(selected)
    LAI.Handlers.Render()
    const removeBtns = document.getElementsByClassName('remove-measurement')
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].onclick = LAI.Handlers.RemoveMeasurement
    }
  },

  RemoveMeasurement: (evt) => {
    const index = parseInt(evt.target.parentElement.id.slice(1))
    LAI.World.Measurements.splice(index, 1)
    LAI.Handlers.Render()
  },

  AttachMovement: () => {
    document.getElementById('add-movement').onclick = LAI.Handlers.AddMovement
    const remMeasureBtns = document.getElementsByClassName('remove-movement')
    for (let i = 0; i < remMeasureBtns.length; i++) {
      remMeasureBtns[i].onclick = LAI.Handlers.RemoveMovement
    }
  },

  AddMovement: (evt) => {
    const selected = document.getElementById('movement-type').value
    LAI.World.Movements.push(parseInt(selected))
    LAI.Handlers.Render()
    const removeBtns = document.getElementsByClassName('remove-movement')
    for (let i = 0; i < removeBtns.length; i++) {
      removeBtns[i].onclick = LAI.Handlers.RemoveMovement
    }
  },

  RemoveMovement: (evt) => {
    const index = parseInt(evt.target.parentElement.id.slice(1))
    LAI.World.Movements.splice(index, 1)
    LAI.Handlers.Render()
  },

  Sense: () => {
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
    LAI.AI.SetPosterior(measurement)
    LAI.AI.SetNormalized()
    LAI.Handlers.Render()
  },

  Move: () => {
    // return if measurements list is empty
    if(!LAI.World.Movements.length) return
    const step = LAI.World.Movements.shift()
    if(!step) return
    // Process
    LAI.AI.Move(step)
    LAI.Handlers.Render()
  },

  Render: () => {
    LAI.Render.World()
    LAI.Render.Prior()
    LAI.Render.Posterior()
    LAI.Render.Normalized()
    LAI.Render.Robot()
    LAI.Render.Measurements()
    LAI.Render.Movements()
    LAI.Render.Actions()
    LAI.Handlers.Attach()
  }

}
