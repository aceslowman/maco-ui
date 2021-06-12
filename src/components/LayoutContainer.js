import React, { useContext, useRef } from 'react';
import classNames from 'classnames';
import styles from './LayoutContainer.module.css';
import ThemeContext from '../ThemeContext';
import { observer } from 'mobx-react';

const LayoutContainer = observer((props) => {
    const context = useContext(ThemeContext);

    let isVertical = props.layout.direction === 'VERTICAL';
    
    let isEmpty = props.layout.isEmpty;

    const wrapper_element = useRef(null);

    const handleResize = (e, layout) => {
      function handleMove(e) {
        if (e.touches) e = e.touches[0]

        if (e.pageX) {
          const bounds = wrapper_element.current.getBoundingClientRect();

          let pos;
          if (isVertical) {
            pos = (e.pageY - bounds.y) / (bounds.height);
          } else {
            pos = (e.pageX - bounds.x) / (bounds.width);
          }

          layout.adjust(pos);
        }
      }

      function handleMoveEnd(e) {
        if (e.touches && e.touches[0]) e = e.touches[0]

        if (e.pageX) {
          const bounds = wrapper_element.current.getBoundingClientRect();

          let pos;
          if (isVertical) {
            pos = (e.pageY - bounds.y) / (bounds.height);
          } else {
            pos = (e.pageX - bounds.x) / (bounds.width);
          }

          layout.adjust(pos);
        }

        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleMoveEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleMoveEnd);
      }

      if (e.touches && e.touches[0]) e = e.touches[0]

      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleMoveEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleMoveEnd);
    }

    const handleContextMenu = (e, layout) => {
        if(props.onContextMenu) props.onContextMenu(e,layout)
    }

    return (
        <div 
            ref={wrapper_element}  
            style={{
                backgroundColor: context.tertiary_color,
            }}  
            className={
                classNames(styles.wrapper, {
                    [styles.vertical]: isVertical,
                    [styles.horizontal]: !isVertical,
                    [styles.empty]: isEmpty
                })
            }
        >
            {props.layout.children.map((sibling,i) => {
                let siblings = props.layout.children;
                let hasHandle = i < props.layout.children.length - 1;
                let childIsLayout = sibling.children.length;
                let size = 0; 

                let filterOutFloats = s => !s.panel || (s.panel && !s.panel.floating);
                let filterOutEmptyLayouts = s => !s.isEmpty;           
                let empty = sibling.children.length && (sibling.children.filter(filterOutFloats).length === 0);  

                /*
                    the benefit of applying the size calculations here
                    is that floating panels will retain their width. 
                */
                let isFloating = sibling.panel && sibling.panel.floating;

                // for all panels up to the last
                if (i < siblings.length - 1) {
                    size = sibling ? sibling.size : 0;                    
                    
                    // if the next panel is floating, absorb it
                    if (siblings[i + 1].panel && siblings[i + 1].panel.floating) {
                        // while right sibling is floating... TODO: might still need to finish this
                        // let _i = i;
                        // while (siblings[_i + 1] && siblings[_i + 1].panel.floating) {
                        //     size += props.layout.children[_i + 1].size;
                        //     _i++;
                        // }
                        size += props.layout.children[i + 1].size;
                        // removes handle (and fixes overflow issue)
                        if(i===siblings.length-2) hasHandle = false;
                    }

                    if(isFloating) {
                        hasHandle = false;
                        size = 0;
                    }
                } else {
                    // sum all splits and get the final panel width
                    if (isFloating || empty) {
                        hasHandle = false;
                        size = 0;
                    } else {
                        size = 1 - siblings.slice(0, -1)
                            .filter(filterOutFloats)
                            .filter(filterOutEmptyLayouts)
                            .reduce((a, b) => a + b.size, 0);
                    }
                }

                if (i < siblings.length - 1 && siblings[i + 1].floating && i === siblings.length - 2) {
                    size = 1 - siblings.slice(0, i)
                        .filter(filterOutFloats)
                        .filter(filterOutEmptyLayouts)
                        .reduce((a, b) => a + b.size, 0);
                }

                if (sibling && !isFloating && !empty &&
                    siblings
                        .filter(filterOutFloats).filter(filterOutEmptyLayouts).length === 1) {
                    size = 1;
                    hasHandle = false;
                }

                size *= 100;

                return (
                    <React.Fragment key={sibling.id}>                        
                        <div 
                            style={isVertical ? {height: size + '%'} : {width: size + '%'}} 
                            className={
                                classNames(styles.panel_content, {
                                    [styles.layout_container]: childIsLayout,
                                    [styles.panel_container]: !childIsLayout,
                                    [styles.float_container]: isFloating
                                })
                            }
                        >
                            {/* <div className={styles.debug}>
                                {size}
                            </div> */}
                            {sibling.children.length ? (
                                <LayoutContainer layout={sibling}>
                                    {props.children}
                                </LayoutContainer>
                            ) : props.children.filter(child => {
                                
                                if(child.props.panel) {
                                    return child.props.panel.id === sibling.id;
                                } else {
                                    return child.props.id === sibling.id;
                                }
                            })
                        }                            
                        </div>                        
                        {hasHandle && (
                            <div               
                                onContextMenu={handleContextMenu}                                
                                className = {
                                    classNames( styles.drag_container, {
                                        [styles.vertical]: isVertical,
                                        [styles.horizontal]: !isVertical
                                    })
                                }
                            >
                                <div 
                                    className = {
                                        classNames(styles.drag_handle, {
                                            [styles.vertical]: isVertical,
                                            [styles.horizontal]: !isVertical
                                        })
                                    }
                                    style={{
                                        backgroundColor: context.accent_color,
                                        borderColor: context.primary_color,
                                    }}
                                    onTouchStart={(e) => handleResize(e,sibling)}
                                    onMouseDown={(e) => handleResize(e,sibling)}
                                >
                                </div>                                
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    );
})

LayoutContainer.defaultProps = {
    size: 100,
    order: 0
}

LayoutContainer.propTypes = {

}

export default LayoutContainer;

