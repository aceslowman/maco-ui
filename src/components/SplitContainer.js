import React, { useState, useContext, useRef, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import styles from './SplitContainer.module.css';
import ThemeContext from '../ThemeContext';
import PropTypes from 'prop-types';

class Split {
    constructor({
        id = 0,
        floating = false,
        size = 100,
    }) {
        this.id = id;
        this.floating = floating;
        this.size = size;
    } 
}

const SplitContainer = (props) => {
    const context = useContext(ThemeContext);

    const distributeSplits = () => {
        let count = props.children.length;

        // make a full length split if there is only one child
        if(count <= 1) return [
            new Split({
                id: 0, 
                floating: false, 
                size: 100
            })
        ]; 
        
        // get all splits with default size values
        let default_splits = props.children
            .filter((e) => e.props.defaultsize)
            .map((e, i) => (
                new Split({
                    id: i,
                    floating: false,
                    size: e.props.defaultsize * 100.0
                })
            ));

        // if defaults are defined, take them into account
        if(default_splits.length) {
            let default_sum = default_splits.filter(s => !s.floating).reduce((a, b) => a + b.size, 0);

            // get default split sum
            return props.children.map((e, i) => (
                new Split({
                    id: i,
                    size: e.props.defaultsize ? 
                        e.props.defaultsize * 100.0 : 
                        (100.0 - default_sum) / (count - 1),      
                    floating: false
                })
            ));
        } else {
            return props.children.map((e, i) => (
              new Split({
                id: i,
                floating: false,
                size: 100.0 / count
              })
            ));
        }
    }

    const [split, setSplit] = useState(distributeSplits());
    const [isEmpty, setEmpty] = useState(false);

    const wrapper_element = useRef(null);

    const handleResize = (e,i) => {
        function handleMove(e) {
          if (e.pageX) {
            const p_bounds = wrapper_element.current.getBoundingClientRect();

            let s;

            if (props.vertical) {
              s = (e.pageY - p_bounds.y) / (p_bounds.height);
            } else {
              s = (e.pageX - p_bounds.x) / (p_bounds.width);
            }

            let split_sum = i > 0 ? split.slice(0, i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0) : 0;
            split[i].size = s * 100 - (split_sum);

            if (split[i].size > 100) split[i].size = 100;
            if (split[i].size < 0) split[i].size = 0;

            setSplit([...split]);
          }
        }

        function handleMoveEnd(e) {
          if (e.touches && e.touches[0]) e = e.touches[0]

          if (e.pageX) {
            const p_bounds = wrapper_element.current.getBoundingClientRect();

            let s;

            if (props.vertical) {
              s = (e.pageY - p_bounds.y) / (p_bounds.height);
            } else {
              s = (e.pageX - p_bounds.x) / (p_bounds.width);
            }

            let split_sum = i > 0 ? split.slice(0, i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0) : 0;
            split[i].size = s * 100 - (split_sum);

            if (split[i].size > 100) split[i].size = 100;
            if (split[i].size < 0) split[i].size = 0;

            setSplit([...split]);
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

    const handleDetach = (i,detach_bool) => {
        if(i === split.length) return
        split[i].floating = detach_bool;
        setSplit([...split]);
    }

    useLayoutEffect((e)=>{
        setSplit(distributeSplits())
    }, [
        props.children.length,
        props.updateFlag
    ]);

    useEffect((e) => {
        // if all empty
        if (!split.filter(s => !s.floating).length && !isEmpty) {
            setEmpty(true);
            if (props.onEmpty) props.onEmpty(true)
        }

        // if empty and a new split has been changed
        if (isEmpty) {
          setEmpty(false)
          if (props.onEmpty) props.onEmpty(false)
        }
    }, [split]);

    const wrapper_class = classNames(
        styles.wrapper, 
        {
            [styles.vertical]: props.vertical,
            [styles.horizontal]: !props.vertical,
            [styles.empty]: isEmpty
        }
    );

    return (
        <div 
            className={wrapper_class}
            style={{
                backgroundColor: context.tertiary_color,
            }}
            ref={wrapper_element}
        >
            {props.children && React.Children.map(props.children, (child,i) => {
                let isSplit = child.type.name === 'SplitContainer';

                // if there is only one panel, make it full width and height
                if(props.children.length === 1) return (
                    <div 
                        style={props.vertical ? {height: '100%'} : {width: '100%'}} 
                        className={classNames({
                            [styles.split_container]: isSplit,
                            [styles.panel_container]: !isSplit
                        })}
                    >
                        {child}                        
                    </div>
                );

                let has_handle = i < props.children.length - 1;
                
                let w;
                // for all panels up to the last
                if (i < props.children.length - 1) {
                    w = split[i] ? split[i].size : 0;
                    w = split[i].floating ? 0 : w;
                    if (split[i].floating) has_handle = false;    
                } else { // sum all splits and get the final panel width
                    // if last split is floating, remove handle
                    if(split[i] && split[i].floating) {
                        has_handle = false
                        w = 0;                        
                    } else {
                        w = 100 - split.slice(0, -1).filter(s => !s.floating).reduce((a, b) => a + b.size, 0);
                    }                    
                }

                if (split[i + 1] && split[i + 1].floating && i === split.length - 2) {
                    w = 100 - split.slice(0,i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0);
                }

                if (split[i] && !split[i].floating 
                     && split.filter(s => !s.floating).length === 1) {
                    w = 100;
                    has_handle = false; 
                }

                /* 
                    attaches hook that watches for float
                    (hopefully this isn't a performance hit)
                */
                if(child.props.detachable) {
                    child = React.cloneElement(child, {
                        ...child.props, 
                        onDetach: (b)=>handleDetach(i,b)
                    })
                }             
                
                /*
                    if the child is a split, and the split is empty, make it shrink
                */
                if(isSplit) {
                    child = React.cloneElement(child, {
                        ...child.props, 
                        onEmpty: (b)=>handleDetach(i,b)
                    })   
                }

                return (
                    <React.Fragment>                        
                        <div 
                            style={props.vertical ? {height: w + '%'} : {width: w + '%'}} 
                            className = {
                                classNames(styles.panel_content, {
                                    [styles.split_container]: isSplit,
                                    [styles.panel_container]: !isSplit,
                                    [styles.split_floating]: split[i] ? split[i].floating : false
                                })
                            }
                        >
                            {/* {`w: ${w}`} */}
                            {child}                        
                        </div>
                        {has_handle && (
                            <div                                 
                                className = {
                                    classNames( styles.drag_container, {
                                        [styles.vertical]: props.vertical,
                                        [styles.horizontal]: !props.vertical
                                    })
                                }
                            >
                                <div 
                                    className = {
                                        classNames(styles.drag_handle_visible, {
                                            [styles.vertical]: props.vertical,
                                            [styles.horizontal]: !props.vertical
                                        })
                                    }
                                    style={{
                                        backgroundColor: context.accent_color,
                                        borderColor: context.primary_color,
                                    }}
                                >
                                    <div 
                                        className = {
                                            classNames(styles.drag_handle, {
                                                [styles.vertical]: props.vertical,
                                                [styles.horizontal]: !props.vertical
                                            })
                                        }
                                        onTouchStart={(e) => handleResize(e,i)}
                                        onMouseDown={(e) => handleResize(e,i)}
                                    ></div>
                                </div>                                
                            </div>
                        )}
                    </React.Fragment>                    
                );
            })}

            {props.children.length === 0  && (
                <p style={{
                    alignSelf: 'center',
                    textAlign: 'center'
                }}><small>no panel in split!</small></p>
            )}
        </div>
    );
}

SplitContainer.defaultProps = {
    updateFlag: false
}

// the children can have a defaultsize prop

SplitContainer.propTypes = {
    children: PropTypes.any.isRequired,
    horizontal: PropTypes.bool,
    vertical: PropTypes.bool,
    split: PropTypes.array,
    updateFlag: PropTypes.bool
}

export default SplitContainer;