import React, { useContext, useRef } from 'react'
import classNames from 'classnames'
import styles from './LayoutContainer.module.css'
import UIContext from '../UIContext'
import { GenericPanel } from './PanelComponent'
import { observer } from 'mobx-react'

const LayoutContainer = observer((props) => {
  const context = useContext(UIContext).theme
  const ui = useContext(UIContext)

  const isVertical = props.layout.direction === 'VERTICAL'

  const isEmpty = props.layout.isEmpty

  const wrapperElement = useRef(null)

  const handleResize = (e, layout) => {
    function handleMove(e) {
      if (e.touches) e = e.touches[0]

      if (e.pageX) {
        const bounds = wrapperElement.current.getBoundingClientRect()

        let pos
        if (isVertical) {
          pos = (e.pageY - bounds.y) / bounds.height
        } else {
          pos = (e.pageX - bounds.x) / bounds.width
        }

        layout.adjust(pos)
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0]

      if (e.pageX) {
        const bounds = wrapperElement.current.getBoundingClientRect()

        let pos
        if (isVertical) {
          pos = (e.pageY - bounds.y) / bounds.height
        } else {
          pos = (e.pageX - bounds.x) / bounds.width
        }

        layout.adjust(pos)
      }

      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleMoveEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleMoveEnd)
    }

    if (e.touches && e.touches[0]) e = e.touches[0]

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleMoveEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleMoveEnd)
  }

  const handleContextMenu = (e, layout) => {
    let result = {}

    Object.values(ui.panelVariants).forEach((panel) => {
      result = {
        ...result,
        [panel.id]: {
          id: panel.id,
          label: panel.title,
          onClick: () => {
            props.layout.addPanel(panel, layout)
          }
        }
      }
    })

    ui.context.setContextmenu({
      addPanel: {
        id: 'addPanel',
        label: 'add panel',
        dropDown: result
      },
      distributeLayout: {
        id: 'DistributeLayout',
        label: 'distribute layout',
        onClick: props.layout.distributeChildren
      }
      /* TODO reset layout */
    })

    if (props.onContextMenu) props.onContextMenu(e, layout)
  }

  const handlePanelSelect = (e, sibling) => {
    sibling.setPanel(e.target.value)
  }

  const handlePanelRemove = (layout) => {
    props.layout.removePanel(layout)
  }

  const generateLayout = () => {
    let elements = []
    elements = props.layout.children.map((sibling, i) => {
      /* 
          this will loop through all of the components passed as
          children, and if it is another layout, it will nest another 
          layout inside
        */
      const siblings = props.layout.children
      const childIsLayout = sibling.children.length
      // TODO should remove the '- 1' but it causes an overflow issue
      let hasHandle = i < props.layout.children.length - 1
      let size = 0

      const filterOutFloats = (s) => !s.panel || (s.panel && !s.panel.floating)

      const isEmpty = (layout) => {
        return (
          layout.children.length &&
          layout.children.filter(filterOutFloats).length === 0
        )
      }
      /*
          the benefit of applying the size calculations here
          is that floating panels will retain their width. 

          this is for the most part why there is resizing 
          logic here AND in Layout.js. The layout holds on
          to the width even when something is floating, and
          then it can restore to it's original dimensions.
      */
      const isFloating = (layout) => {
        return isEmpty(layout) || (layout.panel && layout.panel.floating)
      }

      if (isFloating(sibling)) {
        console.log(sibling.id + ' is floating')
        hasHandle = false
        size = 0
      } else {
        size = sibling.size

        /*  
            scan to the left for any floats to absorb
          */
        for (let j = i - 1; j >= 0; j--) {
          if (isFloating(siblings[j])) {
            size += siblings[j].size
          } else {
            break
          }
        }

        /*
          check to see if there are floats that extend all of the
          way to the right
        */
        let tSum = 0
        for (let j = i + 1; j < siblings.length; j++) {
          if (isFloating(siblings[j])) {
            tSum += siblings[j].size
            // if we make it to the end, absorb all.
            // otherwise, another panel will take care of it
            if (j === siblings.length - 1) size += tSum
          } else {
            break
          }
        }
      }

      size *= 100

      console.log('sibprop', sibling)

      const matchingChild = !sibling.children.length
        ? props.children.filter((child) => {
            /* 
          this grabs the id that corresponds with the 
          panel.id
        */
            if (child.props.panel) {
              return child.props.panel.id === sibling.panel.id
            } else {
              // return child.props.id === sibling.id
            }
          })[0]
        : undefined

      console.log('match', matchingChild)

      return (
        <React.Fragment key={sibling.id}>
          {/* this div element contains each individual frame */}
          <div
            style={isVertical ? { height: size + '%' } : { width: size + '%' }}
            className={classNames(styles.panel_content, {
              [styles.layout_container]: childIsLayout,
              [styles.panel_container]: !childIsLayout,
              [styles.float_container]: isFloating(sibling)
            })}
          >
            <div className={styles.debug}>{size}</div>
            {/*  
                if the current sibling has children, render layout,
                otherwise display panel
              */}
            {sibling.children.length ? (
              <LayoutContainer layout={sibling}>
                {props.children}
              </LayoutContainer>
            ) : (
              <GenericPanel
                panel={sibling.panel}
                onPanelSelect={(e) => handlePanelSelect(e, sibling)}
                onRemove={() => handlePanelRemove(sibling)}
              >
                {/* 
                    this is the main panel that surrounds the child
                    it scans through the props.children for matching
                    components

                    TODO: IMPORTANT: 

                      this needs to also clone and pass along the 'sibling.panel'
                      at the moment the child only gets the uninitialized 
                      panel object, so if they tried to, for example, call
                      setDimensions on the panel, it fails.
                  */}
                {React.cloneElement(matchingChild, [
                  { panel: sibling.panel } // trying this as a fix to setDimensions problem
                ])}
              </GenericPanel>
            )}
          </div>
          {hasHandle && (
            <div
              onContextMenu={(e) => handleContextMenu(e, sibling)}
              className={classNames(styles.drag_container, {
                [styles.vertical]: isVertical,
                [styles.horizontal]: !isVertical
              })}
              onTouchStart={(e) => handleResize(e, sibling)}
              onMouseDown={(e) => handleResize(e, sibling)}
            >
              <div
                className={classNames(styles.drag_handle, {
                  [styles.vertical]: isVertical,
                  [styles.horizontal]: !isVertical
                })}
                style={{
                  backgroundColor: context.accent_color,
                  borderColor: context.primary_color
                }}
              />
            </div>
          )}
        </React.Fragment>
      )
    })

    return elements
  }

  return (
    <div
      ref={wrapperElement}
      style={{
        backgroundColor: context.tertiary_color
      }}
      className={classNames(styles.wrapper, {
        [styles.vertical]: isVertical,
        [styles.horizontal]: !isVertical,
        [styles.empty]: isEmpty
      })}
    >
      {generateLayout()}
    </div>
  )
})

LayoutContainer.defaultProps = {
  size: 100,
  order: 0
}

LayoutContainer.propTypes = {}

export default LayoutContainer
