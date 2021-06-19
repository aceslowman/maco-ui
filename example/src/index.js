import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import RootStore from './stores/RootStore';
import { UIStore, Themes } from 'maco-ui';

const panels = {
    'about': {
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

    'inputs': {
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

    'colorscheme': {
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

    'split': {
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
    },
};

const layouts = {
  'main': {
    id: 'main',
    title: 'Main',
    direction: 'HORIZONTAL',
    size: 1,
    children: [{
        id: "about",
        panel: "about",
        size: 1 / 3,
      },
      {
        id: "innerpanel",
        direction: 'VERTICAL',
        children: [{
            id: "colorscheme",
            panel: "colorscheme",
            size: 1 / 2,
          },
          {
            id: "inputs",
            panel: "inputs",
            size: 1 / 3
          }
        ],
        size: 1 / 3,
      },
    ],
    panels: panels
  },
  'more_inputs': {
    id: 'more_inputs',
    title: 'More Inputs',
    direction: 'HORIZONTAL',
    size: 1,
    children: [
      {
        id: "about",
        panel: "about",
        size: 1 / 3,
      },
      {
        id: "colorscheme",
        panel: "colorscheme",
        size: 1 / 3,
      },
    ],
    panels: panels
  },
  'split_containers': {
    id: 'split_containers',
    title: 'Split Containers',
    direction: 'HORIZONTAL',
    size: 1,
    children: [
      {
        id: "split",
        panel: "split",
        size: 1,
      }
    ],
    panels: {'split':panels.split}
  },
};

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
  dimensions: [400, 400],
  position: [100, 100],
  layout: layouts['split_containers'] // change default layout
};

const root = RootStore.create({
    ui: UIStore.create({
        panels: {
          MAIN: mainPanel
        },
        theme: Themes.weyland,
    })
});

root.ui.setPanelVariants(panels);
root.ui.setLayoutVariants(layouts);

ReactDOM.render(<App store={root}/>, document.getElementById('root'))
