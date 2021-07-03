import { types } from 'mobx-state-tree'
import Context from './Context'

import Panel from './Panel'
import Theme from './Theme'

const UI = types
  .model('UI', {
    panels: types.map(Panel),
    theme: Theme,
    context: types.maybe(Context)
  })
  .volatile((self) => ({
    panelVariants: null,
    layoutVariants: null
  }))
  .actions((self) => ({
    afterAttach: () => {
      self.context = Context.create()
    },

    setPanelVariants: (panels) => {
      self.panelVariants = panels
    },

    setLayoutVariants: (layouts) => {
      self.layoutVariants = layouts
    },

    getPanelVariant: (id) => {
      return self.panelVariants[id]
    },

    getLayoutVariant: (id) => {
      if (self.layoutVariants[id]) {
        return self.layoutVariants[id]
      } else {
        if (self.panelVariants) {
          console.error(
            `variant (${id}) could not be found. should be one of the following: (${Object.keys(
              self.panelVariants
            )})`
          )
        } else {
          console.error(`no variants found!`)
        }
      }
    },

    getPanel: (id) => {
      return self.panels.get(id)
    }
  }))

export default UI
