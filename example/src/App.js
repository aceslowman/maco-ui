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

  let mainPanel = store.ui.getPanel('MAIN')
  let mainLayout = mainPanel.layout

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
        return <AboutPanel key={panel.id} id={panel.id} />
      case 'COLORSCHEME':
        return <ColorSchemePanel key={panel.id} id={panel.id} />
      case 'INPUTS':
        return <InputsPanel key={panel.id} id={panel.id} />
      case 'SPLIT':
        return <SplitPanel key={panel.id} id={panel.id} />
      default:
        break
    }
  }

  const setPanel = (panel_id) => {
    console.log('panel ID', panel_id)
  }

  const setCustomLayout = (panel) => {
    store.ui.applyLayoutToMainPanel(panel);
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

    Array.from(store.ui.layouts.values()).forEach((e) => {
      result = {
        ...result,
        [e.id]: {
          id: e.id,
          label: e.title,
          onClick: () => setCustomLayout(e),
          highlight: mainLayout.id === e.id,
          buttons: {
            button_one: {
              id: 'button_one',
              label: 'x',
              title: 'remove',
              onClick: () => {
                // can't remove WELCOME
                if (e.id !== 'WELCOME') {
                  store.ui.removeLayout(e)
                }
              }
            }
          }
        }
      }
    })

    result = {
      ...result,
      newLayout: {
        id: 'newLayout',
        label: '+ Save New Layout',
        // onClick: () => store.ui.addLayout(getSnapshot(mainPanel.layout))
        /* TODO this needs to save the outer panel data along with everything else
        
        SO now I am actually saving the whole main panel*/
        onClick: () => {
          store.ui.addNewMainLayout(getSnapshot(mainPanel))
        }
      }
    }

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
          label: 'Set Custom Layout',
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
                  label: 'Set Custom Layout',
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
