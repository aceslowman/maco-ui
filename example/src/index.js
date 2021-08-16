import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import RootStore from './stores/RootStore'
import { UIStore, Themes } from 'maco-ui'

const panels = {
  about: {
    id: 'about',
    canRemove: true,
    component_type: 'ABOUT',
    title: 'About',
    floating: false,
    canFloat: true,
    defaultWidth: 100,
    defaultHeight: 200,
    dimensions: [100, 100],
    position: [100, 150]
  },

  inputs: {
    id: 'inputs',
    canRemove: true,
    component_type: 'INPUTS',
    title: 'Inputs',
    floating: false,
    canFloat: true,
    defaultWidth: 100,
    defaultHeight: 200,
    dimensions: [100, 100],
    position: [100, 150]
  },

  colorscheme: {
    id: 'colorscheme',
    canRemove: true,
    component_type: 'COLORSCHEME',
    title: 'Colorscheme',
    floating: false,
    canFloat: true,
    defaultWidth: 100,
    defaultHeight: 200,
    dimensions: [100, 100],
    position: [100, 150]
  },

  split: {
    id: 'split',
    canRemove: true,
    component_type: 'SPLIT',
    title: 'Split',
    floating: false,
    canFloat: true,
    defaultWidth: 100,
    defaultHeight: 200,
    dimensions: [100, 100],
    position: [100, 150]
  }
}

const layouts = {
  main: {
    id: 'main',
    title: 'Main',
    direction: 'HORIZONTAL',
    size: 1,
    children: [
      {
        id: 'about',
        panel: panels['about'],
        size: 1 / 3
      },
      {
        id: 'split',
        panel: panels['split'],
        size: 1 / 6
      },
      {
        id: 'split2',
        panel: panels['split'],
        size: 1 / 6
      },
      {
        id: 'innerpanel',
        direction: 'VERTICAL',
        children: [
          {
            id: 'colorscheme',
            panel: panels['colorscheme'],
            size: 2 / 3
          },
          {
            id: 'inputs',
            panel: panels['inputs'],
            size: 1 / 3
          }
        ],
        size: 1 / 3
      }
    ]
  }
}

const mainPanel = {
  id: 'MAIN',
  type: 'MAIN',
  title: 'maco-ui',
  subtitle: 'subtitle',
  floating: true,
  canFloat: false,
  fullscreen: false,
  collapsible: false, // temp disabled
  canFullscreen: true, // temp disabled
  defaultWidth: 250,
  defaultHeight: 250,
  dimensions: [700, 500],
  position: [window.innerWidth / 2 - 350, window.innerHeight / 2 - 250],
  layout: layouts['main'] // change default layout
}

const root = RootStore.create({
  ui: UIStore.create({
    panels: {
      MAIN: mainPanel
    },
    theme: Themes.weyland
  })
})

root.ui.setPanelVariants(panels)
root.ui.setCustomLayouts({'WELCOME': {...mainPanel, id: 'WELCOME', title: 'Welcome'}})

ReactDOM.render(
  <App store={root} allPanels={panels} />,
  document.getElementById('root')
)
