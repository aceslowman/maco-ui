import React, { useEffect, useState } from 'react'
import { getSnapshot } from 'mobx-state-tree'
import { MainProvider } from './MainContext'
import { observer } from 'mobx-react'

import {
  ToolbarComponent,
  LayoutContainer,
  ThemeContext,
  UIProvider,
  ContextMenuComponent,
  MacoWrapperComponent,
  GenericPanel
} from 'maco-ui'
import 'maco-ui/dist/index.css'

import ColorSchemePanel from './panels/ColorSchemePanel'
import InputsPanel from './panels/InputsPanel'
import AboutPanel from './panels/AboutPanel'
import SplitPanel from './panels/SplitPanel'

import './index.css'

const App = observer((props) => {
  const { store } = props

  const [expandedTest, setExpandedTest] = useState(true)

  const mainPanel = store.ui.getPanel('MAIN')
  const mainLayout = mainPanel.layout

  const main_footbar = (
    <ToolbarComponent
      items={{
        expand: {
          id: 'expand',
          label: 'expand',
          onClick: () => setExpandedTest(!expandedTest)
        },
        one: {
          id: 'one',
          label: 'item 1',
          dropDown: {
            one: {
              id: 'one',
              label: 'dropdown 1',
              buttons: {
                button_one: {
                  id: 'button_one',
                  label: 'r',
                  title: 'rename',
                  onClick: () => console.log('r!')
                },
                button_two: {
                  id: 'button_two',
                  label: 'g',
                  title: 'grab',
                  onClick: () => console.log('g!')
                }
              }
            }
          }
        }
      }}
    />
  )

  const handleLayoutContextMenu = (e, layout) => {
    console.log('e', e)
    console.log('layout', layout)

    // props.store.ui.context.setContextmenu({
    //   one: {
    //     id: 'one',
    //     label: 'add panel',
    //     dropDown: panelVariantToolbar()
    //   }
    // })
  }

  /*
      switch statement can help map panels to their 
      respective components
    */
  const getPanel = (panel) => {
    switch (panel.component_type) {
      case 'ABOUT':
        return <AboutPanel key={panel.id} panel={panel} />
      case 'COLORSCHEME':
        return <ColorSchemePanel key={panel.id} panel={panel} />
      case 'INPUTS':
        return <InputsPanel key={panel.id} panel={panel} />
      case 'SPLIT':
        return <SplitPanel key={panel.id} panel={panel} />
      default:
        break
    }
  }

  const setPanel = (panel_id) => {
    console.log('panel ID', panel_id)
  }

  const setLayout = (layout_id) => {
    let variant = store.ui.getLayoutVariant(layout_id)
    mainPanel.setLayout(variant)
  }

  const panelVariantToolbar = () => {
    let result = {}

    Object.keys(store.ui.panelVariants).forEach((_e) => {
      let e = store.ui.panelVariants[_e]
      result = {
        ...result,
        [e.id]: {
          id: e.id,
          label: e.title,
          onClick: () => setPanel(e.id)
        }
      }
    })

    return result
  }

  const layoutVariantToolbar = () => {
    let result = {}

    Object.keys(store.ui.layoutVariants).forEach((_e) => {
      let e = store.ui.layoutVariants[_e]
      result = {
        ...result,
        [e.id]: {
          id: e.id,
          label: e.title,
          onClick: () => setLayout(e.id)
        }
      }
    })

    return result
  }

  useEffect(() => {
    setInterval(() => {
      store.incrementTest()
    }, 1000)
  }, [])

  return (
    <MacoWrapperComponent
      className='patterned'
      store={store}
      titlebar={{
        addPanel: {
          id: 'addPanel',
          label: 'Add Panel',
          dropDown: panelVariantToolbar()
        },
        setLayout: {
          id: 'setLayout',
          label: 'Set Layout',
          dropDown: layoutVariantToolbar()
        }
      }}
    >
      <MainProvider value={{ store: store }}>
        <GenericPanel
          panel={mainPanel}
          toolbar={
            <ToolbarComponent
              items={{
                addPanel: {
                  id: 'addPanel',
                  label: 'Add Panel',
                  dropDown: panelVariantToolbar()
                },
                setLayout: {
                  id: 'setLayout',
                  label: 'Set Layout',
                  dropDown: layoutVariantToolbar()
                }
              }}
            />
          }
          footbar={main_footbar}
          expanded={expandedTest}
          // onContextMenu={() => {
          //   props.store.ui.context.setContextmenu(
          //     {
          //       'one': {
          //         id: 'one',
          //         label: store.testFloat,
          //         dropDown: {
          //           'one': {
          //             id: 'one',
          //             label: 'dropdown 1',
          //             buttons: {
          //               'button_one': {
          //                 id: 'button_one',
          //                 label: store.testFloat,
          //                 title: 'rename',
          //                 onClick: () => console.log('r!')
          //               },
          //               'button_two': {
          //                 id: 'button_two',
          //                 label: 'g',
          //                 title: 'grab',
          //                 onClick: () => console.log('g!')
          //               },
          //               'button_three': {
          //                 id: 'button_three',
          //                 label: 'x',
          //                 title: 'remove',
          //                 onClick: () => console.log('g!')
          //               },
          //             }
          //           }
          //         }
          //       }
          //     }
          //   )
          // }}
        >
          <LayoutContainer
            layout={mainLayout}
            onContextMenu={handleLayoutContextMenu}
          >
            {Object.values(store.ui.panelVariants).map((e) => {
              return getPanel(e)
            })}
          </LayoutContainer>
        </GenericPanel>
      </MainProvider>
    </MacoWrapperComponent>
  )
})

export default App
