import React, { useContext, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ResizeObserver from 'resize-observer-polyfill';
import { types, getParent, getRoot } from 'mobx-state-tree';
import tinykeys from 'tinykeys';
import { nanoid } from 'nanoid';

var styles = {"wrapper":"_MacoWrapperComponent-module__wrapper__2QN4S"};

var styles$1 = {"toolbar":"_ToolbarComponent-module__toolbar__3H9OD","activeButton":"_ToolbarComponent-module__activeButton__nBqTk","button":"_ToolbarComponent-module__button__11AN1","itemDecoration":"_ToolbarComponent-module__itemDecoration__2AS8M","disableHover":"_ToolbarComponent-module__disableHover__3mDwQ"};

const UIContext = React.createContext({});

var styles$2 = {"drawer":"_DropDownComponent-module__drawer__HZEnU","activeButton":"_DropDownComponent-module__activeButton__3TP9j","subDropDown":"_DropDownComponent-module__subDropDown__dUGHr","openUp":"_DropDownComponent-module__openUp__3ixui","openLeft":"_DropDownComponent-module__openLeft__1Nafv","disableHover":"_DropDownComponent-module__disableHover__2YRIx"};

let style = {
  drawer: {
    width: '0px',
    top: '0px',
    left: '0px'
  }
};
const DropDown = observer(props => {
  const context = useContext(UIContext).theme;
  const mainRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [subDropDownOpen, setSubDropDownOpen] = useState(false);
  const [subDropDownId, setSubDropDownId] = useState(null);
  const [subDropDownPosition, setSubDropDownPosition] = useState({
    top: 0,
    left: 0
  });

  const handleSubDropDown = (e, index, item) => {
    if (item.onClick) item.onClick();
    const toggle = index === activeItem ? !subDropDownOpen : true;
    const bounds = e.currentTarget.getBoundingClientRect();
    setActiveItem(toggle ? index : false);
    setSubDropDownId(item.id);
    setSubDropDownOpen(toggle);
    setSubDropDownPosition({
      top: !props.openUp ? -bounds.height : 'auto',
      bottom: props.openUp ? 0 : 'auto',
      left: props.openLeft ? -bounds.width : bounds.width
    });
  };

  const handleClickAway = e => {
    if (mainRef.current && !mainRef.current.contains(e.target)) {
      setActiveItem(null);
      setSubDropDownOpen(false);
    }
  };

  function handleRef(e) {
    mainRef.current = e;
    if (props.onRef) props.onRef(mainRef);
  }

  function handleContextMenu(e) {
    setSubDropDownOpen(false);
  }

  useLayoutEffect(() => {
    document.addEventListener('click', e => handleClickAway(e));
    document.addEventListener('contextmenu', e => handleContextMenu());
    return () => {
      document.removeEventListener('click', e => handleClickAway(e));
      document.addEventListener('contextmenu', e => handleContextMenu());
    };
  }, []);
  style = { ...style,
    drawer: {
      width: props.open ? '150px' : '0px',
      ...props.position
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(styles$2.drawer, {}),
    ref: e => handleRef(e),
    style: { ...style.drawer,
      backgroundColor: context.secondary_color,
      color: context.text_color
    }
  }, props.items && Object.keys(props.items).map((k, i) => {
    const item = props.items[k];

    if (item.dropDown) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id,
        className: styles$2.subDropDown,
        style: { ...style.drawer,
          backgroundColor: context.secondary_color,
          color: context.text_color
        }
      }, /*#__PURE__*/React.createElement("button", {
        key: 'sub' + item.id,
        onClick: e => handleSubDropDown(e, i, item),
        className: classNames({
          [styles$2.activeButton]: i === activeItem,
          [styles$2.openLeft]: props.openLeft,
          [styles$2.openUp]: props.openUp
        })
      }, item.label, /*#__PURE__*/React.createElement("span", null, props.openLeft ? '<' : '>')), i === activeItem && subDropDownId && /*#__PURE__*/React.createElement("div", {
        key: item.id,
        style: {
          position: 'fixed'
        }
      }, /*#__PURE__*/React.createElement(DropDown, {
        key: item.id + 'dd',
        open: props.open && subDropDownOpen,
        items: { ...props.items[subDropDownId].dropDown
        },
        position: subDropDownPosition,
        openLeft: props.openLeft,
        openUp: props.openUp
      })));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id,
        className: classNames({
          [styles$2.activeButton]: i === activeItem,
          [styles$2.disableHover]: item.disableHover,
          [styles$2.openLeft]: props.openLeft,
          [styles$2.openUp]: props.openUp
        }),
        style: {
          display: 'flex',
          width: '100%'
        }
      }, /*#__PURE__*/React.createElement("button", {
        key: 'normal' + item.id,
        title: item.title,
        onClick: item.onClick
      }, item.label), item.buttons && Object.keys(item.buttons).map(k => {
        const b = item.buttons[k];
        return /*#__PURE__*/React.createElement("button", {
          key: 'button' + b.id,
          onClick: b.onClick,
          title: b.title,
          style: {
            border: `1px solid ${context.outline_color}`,
            borderTop: 'none',
            borderBottom: 'none',
            borderLeftStyle: !props.openLeft ? 'solid' : 'none',
            borderRightStyle: props.openLeft ? 'solid' : 'none',
            flexShrink: 10,
            padding: 3
          }
        }, /*#__PURE__*/React.createElement("small", null, b.label));
      }));
    }
  }));
});
DropDown.defaultProps = {
  openLeft: false,
  openUp: false
};
DropDown.propTypes = {};

const Toolbar = observer(props => {
  const context = useContext(UIContext).theme;
  const mainRef = useRef(null);
  const [activeItem, setActiveItem] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownId, setDropDownId] = useState(null);
  const [dropDownPosition, setDropDownPosition] = useState({
    top: 0,
    left: 0
  });
  const [openUp, setOpenUp] = useState(false);

  const handleClickAway = e => {
    if (mainRef.current && !mainRef.current.contains(e.target)) {
      setActiveItem(null);
      setDropDownOpen(false);
    }
  };

  const handleWheel = e => {
    let offset = Math.sign(e.deltaY) * 5;
    mainRef.current.scroll(mainRef.current.scrollLeft + offset, 0);
    let at_start = mainRef.current.scrollLeft === 0;
    let at_end = mainRef.current.offsetWidth + mainRef.current.scrollLeft >= mainRef.current.scrollWidth;

    if (!at_start && !at_end && dropDownOpen) {
      setDropDownPosition({
        top: dropDownPosition.top,
        left: dropDownPosition.left - offset
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', e => handleClickAway(e));
    let bounds = mainRef.current.getBoundingClientRect();
    setOpenUp(bounds.y > window.innerHeight - window.innerHeight / 3);
    return document.removeEventListener('click', e => handleClickAway(e));
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: styles$1.toolbar,
    ref: mainRef,
    style: { ...props.style,
      backgroundColor: context.secondary_color || 'black',
      color: context.text_color || 'white'
    },
    onWheel: handleWheel
  }, props.items && Object.keys(props.items).map((k, i) => {
    let item = props.items[k];
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      title: item.title,
      style: { ...item.style,
        borderColor: context.text_color
      },
      className: classNames(styles$1.button, {
        [styles$1.activeButton]: item === activeItem || item.highlight,
        [styles$1.disableHover]: item.disableHover
      }),
      onClick: e => {
        if (item.dropDown) {
          let toggle = item === activeItem ? !dropDownOpen : true;
          let parent_bounds = mainRef.current.getBoundingClientRect();
          let bounds = e.currentTarget.getBoundingClientRect();

          let _openUp = bounds.y > window.innerHeight - window.innerHeight / 3;

          setActiveItem(toggle ? item : null);
          setOpenUp(_openUp);
          setDropDownOpen(toggle);
          setDropDownId(item.id);
          setDropDownPosition({
            top: !openUp ? bounds.height : 'auto',
            bottom: openUp ? 0 : 'auto',
            left: bounds.left - parent_bounds.x
          });
        }

        if (item.onClick) item.onClick();
      }
    }, item.label, item.dropDown && /*#__PURE__*/React.createElement("span", {
      className: styles$1.itemDecoration
    }, openUp ? '▲' : '▼'));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed'
    }
  }, props.items[dropDownId] && /*#__PURE__*/React.createElement(DropDown, {
    open: dropDownOpen,
    items: { ...props.items[dropDownId].dropDown
    },
    position: dropDownPosition,
    openUp: openUp
  })));
});

const ContextMenu = observer(props => {
  const mainRef = useRef(null);
  let dropRef = useRef(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownPosition, setDropDownPosition] = useState({
    top: 0,
    left: 0
  });
  const [dropDownOpenLeft, setDropDownOpenLeft] = useState(false);
  const [dropDownOpenUp, setDropDownOpenUp] = useState(false);

  const handleClickAway = e => {
    if (mainRef.current && !mainRef.current.contains(e.target)) {
      setDropDownOpen(false);
    }
  };

  const handleClick = e => {
    e.preventDefault();
    setDropDownOpen(true);
    let x = e.pageX;
    let y = e.pageY;
    if (e.pageX + 150 > window.innerWidth) x -= 150;

    let _openUp = y > window.innerHeight - window.innerHeight / 3;

    setDropDownOpenUp(_openUp);
    setDropDownOpenLeft(e.pageX > window.innerWidth / 2);
    setDropDownPosition({
      top: !_openUp ? y : 'auto',
      bottom: _openUp ? window.innerHeight - y : 'auto',
      left: x
    });
    return false;
  };

  const handleRef = e => {
    dropRef = e;
  };

  useLayoutEffect(() => {
    document.addEventListener('click', e => handleClickAway(e), true);
    document.addEventListener('contextmenu', e => handleClick(e), true);
    return () => {
      document.removeEventListener('click', e => handleClickAway(e), true);
      document.removeEventListener('contextmenu', e => handleClick(e), true);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: mainRef
  }, /*#__PURE__*/React.createElement(DropDown, {
    open: dropDownOpen,
    items: props.items,
    position: dropDownPosition,
    onRef: handleRef,
    openLeft: dropDownOpenLeft,
    openUp: dropDownOpenUp
  }));
});

const MacoWrapper = observer(props => {
  const store = props.store;

  const handleContextMenu = () => {
    store.ui.context.setContextmenu(props.contextmenu);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(UIContext.Provider, {
    value: store.ui
  }, /*#__PURE__*/React.createElement(Toolbar, {
    items: props.titlebar
  }), /*#__PURE__*/React.createElement(ContextMenu, {
    items: store.ui.context.contextmenu
  }), /*#__PURE__*/React.createElement("div", {
    className: props.className,
    style: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: store.ui.theme.tertiary_color,
      ...props.style
    },
    onContextMenu: () => handleContextMenu()
  }), props.children));
});
MacoWrapper.defaultProps = {
  contextmenu: {},
  titlebar: {}
};

var styles$3 = {"panel":"_PanelComponent-module__panel__2yteA","panelSelect":"_PanelComponent-module__panelSelect__7Ulh3","title_bar":"_PanelComponent-module__title_bar__2bArp","subtitle":"_PanelComponent-module__subtitle__Mh0_d","panel_content":"_PanelComponent-module__panel_content__2tcNH","fullscreen":"_PanelComponent-module__fullscreen__1HmTw","collapsed":"_PanelComponent-module__collapsed__qKCgk","horizontal":"_PanelComponent-module__horizontal__3ExTZ","vertical":"_PanelComponent-module__vertical__1MHdL","floating":"_PanelComponent-module__floating__3aE5b","resizeHandle":"_PanelComponent-module__resizeHandle__2cemD","resizeSE":"_PanelComponent-module__resizeSE__25SKY","resizeE":"_PanelComponent-module__resizeE__3lwm2","resizeS":"_PanelComponent-module__resizeS__p_Skn","resizeN":"_PanelComponent-module__resizeN__UmDS3","resizeNW":"_PanelComponent-module__resizeNW__3RvlH","resizeNE":"_PanelComponent-module__resizeNE__37vdB","resizeSW":"_PanelComponent-module__resizeSW__1FPl3","resizeW":"_PanelComponent-module__resizeW__3ey4p","moveHandle":"_PanelComponent-module__moveHandle__2RvpC","dragContainer":"_PanelComponent-module__dragContainer__1DDNn","indicators":"_PanelComponent-module__indicators__NiV_D","indicator":"_PanelComponent-module__indicator__1kQjp","tooltip":"_PanelComponent-module__tooltip__2H2yT","tooltip_symbol":"_PanelComponent-module__tooltip_symbol__1fFBX","tooltip_content":"_PanelComponent-module__tooltip_content__3wcYC"};

const Tooltip = observer(props => {
  const context = useContext(UIContext).theme;
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState([0, 0, 0, 0]);

  const handleToggle = e => {
    let x = e.pageX;
    let y = e.pageY;
    if (x > window.innerWidth - 150) x = e.pageX - 150;
    if (y > window.innerHeight - 150) y = e.pageY - 150;
    setPosition([x, y]);
    setShow(!show);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$3.tooltip
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$3.tooltip_symbol,
    onClick: e => handleToggle(e)
  }, "\u2139"), /*#__PURE__*/React.createElement("div", {
    className: styles$3.tooltip_content,
    style: {
      backgroundColor: context.primary_color,
      border: `1px solid ${context.outline_color}`,
      display: show ? 'block' : 'none',
      left: position[0],
      top: position[1]
    }
  }, props.content));
});
const Panel = observer(props => {
  const context = useContext(UIContext).theme;
  const ui = useContext(UIContext);
  const wrapperElement = useRef(null);
  const [expanded, setExpanded] = useState(props.expanded);
  const [focused, setFocused] = useState(props.focused);
  const [hover, setHover] = useState(false);

  const handleResize = (e, direction = 'xy') => {
    let dragging = true;
    const pBounds = wrapperElement.current.getBoundingClientRect();
    const initialDimensions = [pBounds.width, pBounds.height];
    const initialPosition = [pBounds.x, pBounds.y];

    const handleMove = e => {
      if (e.touches) e = e.touches[0];

      if (e.pageY && dragging) {
        const pBounds = wrapperElement.current.getBoundingClientRect();
        let w, h;
        let x, y;

        switch (direction) {
          case 'se':
            w = e.pageX - pBounds.x;
            h = e.pageY - pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'e':
            w = e.pageX - pBounds.x;
            h = props.dimensions[1];
            props.onDimensionsChange([w, h]);
            break;

          case 's':
            w = props.dimensions[0];
            h = e.pageY - pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'sw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = e.pageY - pBounds.y;
            x = e.pageX;
            y = pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'w':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = props.dimensions[1];
            x = e.pageX;
            y = pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'n':
            w = props.dimensions[0];
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = pBounds.x;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'nw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = e.pageX;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'ne':
            w = e.pageX - pBounds.x;
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = pBounds.x;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;
        }
      }
    };

    const handleMoveEnd = e => {
      dragging = false;
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageY) {
        const pBounds = wrapperElement.current.getBoundingClientRect();
        let w, h;
        let x, y;

        switch (direction) {
          case 'se':
            w = e.pageX - pBounds.x;
            h = e.pageY - pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'e':
            w = e.pageX - pBounds.x;
            h = props.dimensions[1];
            props.onDimensionsChange([w, h]);
            break;

          case 's':
            w = props.dimensions[0];
            h = e.pageY - pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'sw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = e.pageY - pBounds.y;
            x = e.pageX;
            y = pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'w':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = props.dimensions[1];
            x = e.pageX;
            y = pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'n':
            w = props.dimensions[0];
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = pBounds.x;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'nw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = e.pageX;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'ne':
            w = e.pageX - pBounds.x;
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = pBounds.x;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;
        }
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleMoveEnd);
  };

  const handleMoveStart = e => {
    function handleMove(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageY) {
        const x = e.pageX - dragOff[0];
        const y = e.pageY - dragOff[1];
        props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageY) {
        const x = e.pageX - dragOff[0];
        const y = e.pageY - dragOff[1];
        props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    }

    if (e.touches) e = e.touches[0];
    const pBounds = wrapperElement.current.getBoundingClientRect();
    const offset = {
      x: pBounds.left,
      y: pBounds.top
    };
    const dragOff = [e.pageX - offset.x, e.pageY - offset.y];
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleMoveEnd);
  };

  const handleCenter = () => {
    if (!props.onPositionChange) return;
    const pBounds = wrapperElement.current.getBoundingClientRect();
    const x = window.innerWidth / 2 - pBounds.width / 2;
    const y = window.innerHeight / 2 - pBounds.height / 2;
    props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
  };

  const handleFullscreen = () => {
    if (!props.fullscreen) handleCenter();
    props.onFullscreen(!props.fullscreen);
    props.onFloat(props.fullscreen);
  };

  const handleFloat = () => {
    if (props.floating === null) {
      const pBounds = wrapperElement.current.getBoundingClientRect();
      if (props.onDimensionsChange) props.onDimensionsChange([pBounds.width, pBounds.height]);
    }

    if (props.onFloat) props.onFloat(!props.floating);
  };

  const handleFocus = e => {
    setHover(true);
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  const handleBlur = () => {
    wrapperElement.current.blur();
    setHover(false);
    setFocused(false);
    if (props.onBlur) props.onBlur(false);
  };

  let mainStyling = {};

  if (props.floating && !props.fullscreen) {
    mainStyling = {
      width: props.dimensions[0],
      height: expanded ? props.dimensions[1] : 'min-content',
      left: props.position[0],
      top: props.position[1]
    };
  } else if (props.fullscreen) {
    mainStyling = {
      width: '100%',
      height: '100%',
      left: 0,
      top: 0
    };
  }

  const hasTitle = props.showTitle && (props.title || props.onRemove || props.collapsible || props.floating);
  const borderColor = focused ? context.accent_color : context.outline_color;
  useLayoutEffect(() => {
    setExpanded(props.expanded);
  }, [props.expanded]);
  return /*#__PURE__*/React.createElement("div", {
    ref: wrapperElement,
    className: classNames(styles$3.panel, {
      [styles$3.fullscreen]: props.fullscreen,
      [styles$3.floating]: props.floating,
      [styles$3.collapsed]: !expanded
    }),
    style: {
      backgroundColor: !props.fullscreen ? context.primary_color : 'transparent',
      color: context.text_color || 'white',
      border: props.border && !props.fullscreen ? '1px solid ' + borderColor : 'none',
      height: props.collapsible ? 'auto' : '100%',
      margin: props.gutters ? props.gutterSize : 0,
      zIndex: hover ? 5 : 2,
      ...mainStyling,
      ...props.style
    },
    onFocus: handleFocus,
    onBlur: handleBlur,
    onContextMenu: props.onContextMenu,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onMouseOver: props.onMouseOver,
    onMouseOut: props.onMouseOut,
    tabIndex: "-1"
  }, hasTitle && /*#__PURE__*/React.createElement("div", {
    className: styles$3.title_bar,
    style: {
      backgroundColor: context.primary_color || 'black',
      ...props.titleStyle
    }
  }, props.canFullscreen && /*#__PURE__*/React.createElement("button", {
    title: "fullscreen",
    onClick: handleFullscreen,
    style: {
      fontSize: '0.9em'
    }
  }, "\u2733"), props.canRemove && /*#__PURE__*/React.createElement("button", {
    title: "close",
    onClick: props.onRemove
  }, "x"), props.canFloat && /*#__PURE__*/React.createElement("button", {
    title: props.floating ? 'snap' : 'float',
    onClick: handleFloat,
    style: {
      fontSize: '0.9em'
    }
  }, props.floating ? '◧' : '❏'), props.collapsible && /*#__PURE__*/React.createElement("button", {
    onClick: () => setExpanded(!expanded)
  }, expanded ? '▾' : '▸'), /*#__PURE__*/React.createElement("div", {
    className: styles$3.dragContainer,
    onClick: props.collapsible && !props.canFullscreen ? () => setExpanded(!expanded) : null
  }, props.floating && /*#__PURE__*/React.createElement("div", {
    className: styles$3.moveHandle,
    onTouchStart: handleMoveStart,
    onMouseDown: handleMoveStart
  }), props.onPanelSelect !== undefined ? /*#__PURE__*/React.createElement("select", {
    title: "select the panel to display",
    className: styles$3.panelSelect,
    onChange: props.onPanelSelect,
    defaultValue: props.uuid
  }, Object.values(ui.panelVariants).map(e => /*#__PURE__*/React.createElement("option", {
    key: e.id,
    value: e.id
  }, e.title))) : /*#__PURE__*/React.createElement("legend", null, /*#__PURE__*/React.createElement("strong", null, props.title))), /*#__PURE__*/React.createElement("div", {
    className: styles$3.subtitle
  }, props.subtitle), props.indicators && /*#__PURE__*/React.createElement("div", {
    className: styles$3.indicators
  }, props.indicators.map((e, i) => {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: styles$3.indicator,
      title: e.title,
      style: {
        color: context.primary_color,
        backgroundColor: e.color
      }
    }, e.label);
  })), props.tooltip && /*#__PURE__*/React.createElement(Tooltip, {
    content: props.tooltip
  })), expanded && props.toolbar, expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      borderColor: context.text_color,
      flexBasis: props.fullscreen ? '0px' : 'auto'
    },
    className: classNames(styles$3.panel_content, {
      [styles$3.horizontal]: props.horizontal,
      [styles$3.vertical]: props.vertical
    }),
    ref: props.onRef
  }, props.children), expanded && props.footbar, props.floating && !props.fullscreen && expanded && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeSE}`,
    onTouchStart: e => handleResize(e, 'se'),
    onMouseDown: e => handleResize(e, 'se'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeE}`,
    onTouchStart: e => handleResize(e, 'e'),
    onMouseDown: e => handleResize(e, 'e'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeS}`,
    onTouchStart: e => handleResize(e, 's'),
    onMouseDown: e => handleResize(e, 's'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeSW}`,
    onTouchStart: e => handleResize(e, 'sw'),
    onMouseDown: e => handleResize(e, 'sw'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeW}`,
    onTouchStart: e => handleResize(e, 'w'),
    onMouseDown: e => handleResize(e, 'w'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeN}`,
    onTouchStart: e => handleResize(e, 'n'),
    onMouseDown: e => handleResize(e, 'n'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeNE}`,
    onTouchStart: e => handleResize(e, 'ne'),
    onMouseDown: e => handleResize(e, 'ne'),
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${styles$3.resizeHandle} ${styles$3.resizeNW}`,
    onTouchStart: e => handleResize(e, 'nw'),
    onMouseDown: e => handleResize(e, 'nw'),
    style: {
      borderColor: context.text_color
    }
  })));
});
Panel.defaultProps = {
  fullscreen: false,
  expanded: true,
  border: true,
  focused: false,
  floating: false,
  position: [100, 100],
  dimensions: [100, 100],
  gutterSize: 5,
  showTitle: true,
  onContextMenu: () => {}
};
Panel.propTypes = {
  onRemove: PropTypes.func,
  onFocus: PropTypes.func,
  toolbar: PropTypes.object,
  children: PropTypes.any,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  indicators: PropTypes.array,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  collapsible: PropTypes.bool,
  fullscreen: PropTypes.bool,
  floating: PropTypes.bool,
  showTitle: PropTypes.bool,
  gutters: PropTypes.bool,
  gutterSize: PropTypes.number,
  border: PropTypes.bool
};
const GenericPanel = observer(props => /*#__PURE__*/React.createElement(Panel, {
  uuid: props.panel.id,
  title: props.title ?? props.panel.title,
  subtitle: props.subtitle ?? props.panel.subtitle,
  collapsible: props.collapsible ?? props.panel.collapsible,
  fullscreen: props.panel.fullscreen,
  canFullscreen: props.panel.canFullscreen,
  floating: props.panel.floating,
  expanded: props.expanded,
  showTitle: props.showTitle ?? props.panel.showTitle,
  canFloat: props.panel.canFloat,
  defaultWidth: props.panel.defaultWidth,
  defaultHeight: props.panel.defaultWidth,
  position: props.panel.position,
  dimensions: props.panel.dimensions,
  toolbar: props.toolbar,
  footbar: props.footbar,
  indicators: props.indicators,
  tooltip: props.tooltip,
  onRemove: props.onRemove ?? props.panel.onRemove,
  canRemove: props.canRemove ?? props.panel.canRemove,
  style: props.style,
  onContextMenu: props.onContextMenu,
  onContextMenuCapture: props.onContextMenuCapture,
  onFocus: props.onFocus,
  onBlur: props.onBlur,
  onRef: props.onRef,
  onFloat: props.panel.setFloating,
  onPositionChange: props.panel.setPosition,
  onDimensionsChange: props.panel.setDimensions,
  onFullscreen: props.panel.setFullscreen,
  onPanelSelect: props.onPanelSelect
}, props.children));

var styles$4 = {"text":"_TextComponent-module__text__1oiY2"};

const Text = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles$4.text,
    style: props.style
  }, props.children);
};

var styles$5 = {"wrapper":"_ControlGroupComponent-module__wrapper__1mSUC"};

const ControlGroup = props => {
  const context = useContext(UIContext).theme;
  return /*#__PURE__*/React.createElement("div", {
    className: styles$5.wrapper
  }, /*#__PURE__*/React.createElement("fieldset", {
    style: {
      borderColor: context.outline_color
    }
  }, props.name && /*#__PURE__*/React.createElement("legend", {
    style: {
      padding: '2px 4px',
      backgroundColor: context.text_color,
      color: context.primary_color
    }
  }, /*#__PURE__*/React.createElement("strong", null, props.name)), /*#__PURE__*/React.createElement("div", null, React.Children.map(props.children, child => {
    let inputWidth = 100.0;

    if (props.children.length) {
      inputWidth = 100.0 / props.children.length;
    }

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        style: {
          width: `${inputWidth}%`
        }
      });
    }

    return child;
  }))));
};

const useObserver = (callback, element, dependencies = []) => {
  const observer = useRef(null);
  useLayoutEffect(() => {
    const observe = () => {
      if (element && element.current && observer.current) {
        observer.current.observe(element.current);
      }
    };

    const current = element.current;

    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    const resizeObserverOrPolyfill = ResizeObserver;
    observer.current = new resizeObserverOrPolyfill(callback);
    observe();
    return () => {
      if (observer && observer.current && current) {
        observer.current.unobserve(current);
      }
    };
  }, [callback, element, observer, ...dependencies]);
};

useObserver.propTypes = {
  element: PropTypes.object,
  callback: PropTypes.func
};

var styles$6 = {"wrapper":"_SplitContainer-module__wrapper__1CWdl","horizontal":"_SplitContainer-module__horizontal__Bk5vO","vertical":"_SplitContainer-module__vertical__2PDvd","drag_container":"_SplitContainer-module__drag_container__H0gkt","drag_handle_visible":"_SplitContainer-module__drag_handle_visible__1f5SD","drag_handle":"_SplitContainer-module__drag_handle__2--MZ","panel_container":"_SplitContainer-module__panel_container__HNP-M","split_container":"_SplitContainer-module__split_container__2lgi-","split_detached":"_SplitContainer-module__split_detached__3QIeQ","debug":"_SplitContainer-module__debug__1CADw","empty":"_SplitContainer-module__empty__2JebP","panel_content":"_SplitContainer-module__panel_content__2Gxvh"};

class Split {
  constructor({
    id = 0,
    floating = false,
    size = 100
  }) {
    this.id = id;
    this.floating = floating;
    this.size = size;
  }

}

const SplitContainer = props => {
  const context = useContext(UIContext).theme;

  const distributeSplits = () => {
    const count = props.children.length;
    if (count <= 1) return [new Split({
      id: 0,
      floating: false,
      size: 100
    })];
    const defaultSplits = props.children.filter(e => e.props.defaultsize).map((e, i) => new Split({
      id: i,
      floating: false,
      size: e.props.defaultsize * 100.0
    }));

    if (defaultSplits.length) {
      const defaultSum = defaultSplits.filter(s => !s.floating).reduce((a, b) => a + b.size, 0);
      return props.children.map((e, i) => new Split({
        id: i,
        size: e.props.defaultsize ? e.props.defaultsize * 100.0 : (100.0 - defaultSum) / (count - 1),
        floating: false
      }));
    } else {
      return props.children.map((e, i) => new Split({
        id: i,
        floating: false,
        size: 100.0 / count
      }));
    }
  };

  const [split, setSplit] = useState(distributeSplits());
  const [isEmpty, setEmpty] = useState(false);
  const wrapperElement = useRef(null);
  const [isVertical, setIsVertical] = useState(props.vertical || !props.horizontal);

  const handleContainerResize = e => {
    if (props.auto) {
      const bounds = wrapperElement.current.getBoundingClientRect();
      setIsVertical(bounds.width < bounds.height);
    }
  };

  useObserver(handleContainerResize, wrapperElement, [props.auto, isVertical]);

  const handlePanelResize = (e, i) => {
    function handleMove(e) {
      if (e.pageX) {
        const pBounds = wrapperElement.current.getBoundingClientRect();
        let s;

        if (isVertical) {
          s = (e.pageY - pBounds.y) / pBounds.height;
        } else {
          s = (e.pageX - pBounds.x) / pBounds.width;
        }

        const splitSum = i > 0 ? split.slice(0, i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0) : 0;
        split[i].size = s * 100 - splitSum;
        if (split[i].size > 100) split[i].size = 100;
        if (split[i].size < 0) split[i].size = 0;
        setSplit([...split]);
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageX) {
        const pBounds = wrapperElement.current.getBoundingClientRect();
        let s;

        if (isVertical) {
          s = (e.pageY - pBounds.y) / pBounds.height;
        } else {
          s = (e.pageX - pBounds.x) / pBounds.width;
        }

        const splitSum = i > 0 ? split.slice(0, i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0) : 0;
        split[i].size = s * 100 - splitSum;
        if (split[i].size > 100) split[i].size = 100;
        if (split[i].size < 0) split[i].size = 0;
        setSplit([...split]);
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    }
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleMoveEnd);
  };

  const handleDetach = (i, detachBool) => {
    if (i === split.length) return;
    split[i].floating = detachBool;
    setSplit([...split]);
  };

  useLayoutEffect(e => {
    setSplit(distributeSplits());
  }, [props.children.length, props.updateFlag]);
  useEffect(e => {
    if (!split.filter(s => !s.floating).length && !isEmpty) {
      setEmpty(true);
      if (props.onEmpty) props.onEmpty(true);
    }

    if (isEmpty) {
      setEmpty(false);
      if (props.onEmpty) props.onEmpty(false);
    }
  }, [split]);
  const wrapperClass = classNames(styles$6.wrapper, {
    [styles$6.vertical]: isVertical,
    [styles$6.horizontal]: !isVertical,
    [styles$6.empty]: isEmpty
  });
  return /*#__PURE__*/React.createElement("div", {
    className: wrapperClass,
    ref: wrapperElement,
    style: {
      backgroundColor: context.tertiary_color
    }
  }, props.children && React.Children.map(props.children, (child, i) => {
    const isSplit = child.type.name === 'SplitContainer';
    if (props.children.length === 1) return /*#__PURE__*/React.createElement("div", {
      style: isVertical ? {
        height: '100%'
      } : {
        width: '100%'
      },
      className: classNames({
        [styles$6.split_container]: isSplit,
        [styles$6.panel_container]: !isSplit
      })
    }, child);
    let hasHandle = i < props.children.length - 1;
    let w;

    if (i < props.children.length - 1) {
      w = split[i] ? split[i].size : 0;
      w = split[i].floating ? 0 : w;
      if (split[i].floating) hasHandle = false;
    } else {
      if (split[i] && split[i].floating) {
        hasHandle = false;
        w = 0;
      } else {
        w = 100 - split.slice(0, -1).filter(s => !s.floating).reduce((a, b) => a + b.size, 0);
      }
    }

    if (split[i + 1] && split[i + 1].floating && i === split.length - 2) {
      w = 100 - split.slice(0, i).filter(s => !s.floating).reduce((a, b) => a + b.size, 0);
    }

    if (split[i] && !split[i].floating && split.filter(s => !s.floating).length === 1) {
      w = 100;
      hasHandle = false;
    }

    if (child.props.detachable) {
      child = React.cloneElement(child, { ...child.props,
        onDetach: b => handleDetach(i, b)
      });
    }

    if (isSplit) {
      child = React.cloneElement(child, { ...child.props,
        onEmpty: b => handleDetach(i, b)
      });
    }

    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: isVertical ? {
        height: w + '%'
      } : {
        width: w + '%'
      },
      className: classNames(styles$6.panel_content, {
        [styles$6.split_container]: isSplit,
        [styles$6.panel_container]: !isSplit,
        [styles$6.split_floating]: split[i] ? split[i].floating : false
      })
    }, child), hasHandle && /*#__PURE__*/React.createElement("div", {
      className: classNames(styles$6.drag_container, {
        [styles$6.vertical]: isVertical,
        [styles$6.horizontal]: !isVertical
      })
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames(styles$6.drag_handle_visible, {
        [styles$6.vertical]: isVertical,
        [styles$6.horizontal]: !isVertical
      }),
      style: {
        borderColor: context.accent_color
      },
      onTouchStart: e => handlePanelResize(e, i),
      onMouseDown: e => handlePanelResize(e, i)
    }, /*#__PURE__*/React.createElement("div", {
      className: classNames(styles$6.drag_handle, {
        [styles$6.vertical]: isVertical,
        [styles$6.horizontal]: !isVertical
      }),
      style: {
        borderColor: context.outline_color
      }
    }))));
  }), props.children.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      alignSelf: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("small", null, "no panel in split!")));
};

SplitContainer.defaultProps = {
  updateFlag: false
};
SplitContainer.propTypes = {
  children: PropTypes.any.isRequired,
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  auto: PropTypes.bool,
  split: PropTypes.array,
  updateFlag: PropTypes.bool
};

var styles$7 = {"wrapper":"_LayoutContainer-module__wrapper__wIgZx","panel_content":"_LayoutContainer-module__panel_content__jO4g0","vertical":"_LayoutContainer-module__vertical__V6QbL","horizontal":"_LayoutContainer-module__horizontal__2lf1N","drag_container":"_LayoutContainer-module__drag_container__3-f3R","drag_handle":"_LayoutContainer-module__drag_handle__3QuuK","panel_container":"_LayoutContainer-module__panel_container__2NjEi","layout_container":"_LayoutContainer-module__layout_container__3nmhc","float_container":"_LayoutContainer-module__float_container__2l4sw","debug":"_LayoutContainer-module__debug__2rD68","empty":"_LayoutContainer-module__empty__2YyYx"};

const LayoutContainer = observer(props => {
  const context = useContext(UIContext).theme;
  const ui = useContext(UIContext);
  const isVertical = props.layout.direction === 'VERTICAL';
  const isEmpty = props.layout.isEmpty;
  const wrapperElement = useRef(null);

  const handleResize = (e, layout) => {
    function handleMove(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageX) {
        const bounds = wrapperElement.current.getBoundingClientRect();
        let pos;

        if (isVertical) {
          pos = (e.pageY - bounds.y) / bounds.height;
        } else {
          pos = (e.pageX - bounds.x) / bounds.width;
        }

        layout.adjust(pos);
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageX) {
        const bounds = wrapperElement.current.getBoundingClientRect();
        let pos;

        if (isVertical) {
          pos = (e.pageY - bounds.y) / bounds.height;
        } else {
          pos = (e.pageX - bounds.x) / bounds.width;
        }

        layout.adjust(pos);
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    }
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleMoveEnd);
  };

  const handleContextMenu = (e, layout) => {
    let result = {};
    Object.values(ui.panelVariants).forEach(panel => {
      result = { ...result,
        [panel.id]: {
          id: panel.id,
          label: panel.title,
          onClick: () => {
            props.layout.addPanel(panel, layout);
          }
        }
      };
    });
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
    });
    if (props.onContextMenu) props.onContextMenu(e, layout);
  };

  const handlePanelSelect = (e, sibling) => {
    sibling.setPanel(e.target.value);
  };

  const handlePanelRemove = layout => {
    props.layout.removePanel(layout);
  };

  const generateLayout = () => {
    let elements = [];
    elements = props.layout.children.map((sibling, i) => {
      const siblings = props.layout.children;
      const childIsLayout = sibling.children.length;
      let hasHandle = i < props.layout.children.length - 1;
      let size = 0;

      const filterOutFloats = s => !s.panel || s.panel && !s.panel.floating;

      const isEmpty = layout => {
        return layout.children.length && layout.children.filter(filterOutFloats).length === 0;
      };

      const isFloating = layout => {
        return isEmpty(layout) || layout.panel && layout.panel.floating;
      };

      if (isFloating(sibling)) {
        console.log(sibling.id + ' is floating');
        hasHandle = false;
        size = 0;
      } else {
        size = sibling.size;

        for (let j = i - 1; j >= 0; j--) {
          if (isFloating(siblings[j])) {
            size += siblings[j].size;
          } else {
            break;
          }
        }

        let tSum = 0;

        for (let j = i + 1; j < siblings.length; j++) {
          if (isFloating(siblings[j])) {
            tSum += siblings[j].size;
            if (j === siblings.length - 1) size += tSum;
          } else {
            break;
          }
        }
      }

      size *= 100;
      console.log('sibprop', sibling);
      const matchingChild = !sibling.children.length ? props.children.filter(child => {
        if (child.props.panel) {
          return child.props.panel.id === sibling.panel.id;
        }
      })[0] : undefined;
      console.log('match', matchingChild);
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: sibling.id
      }, /*#__PURE__*/React.createElement("div", {
        style: isVertical ? {
          height: size + '%'
        } : {
          width: size + '%'
        },
        className: classNames(styles$7.panel_content, {
          [styles$7.layout_container]: childIsLayout,
          [styles$7.panel_container]: !childIsLayout,
          [styles$7.float_container]: isFloating(sibling)
        })
      }, /*#__PURE__*/React.createElement("div", {
        className: styles$7.debug
      }, size), sibling.children.length ? /*#__PURE__*/React.createElement(LayoutContainer, {
        layout: sibling
      }, props.children) : /*#__PURE__*/React.createElement(GenericPanel, {
        panel: sibling.panel,
        onPanelSelect: e => handlePanelSelect(e, sibling),
        onRemove: () => handlePanelRemove(sibling)
      }, React.cloneElement(matchingChild, [{
        panel: sibling.panel
      }]))), hasHandle && /*#__PURE__*/React.createElement("div", {
        onContextMenu: e => handleContextMenu(e, sibling),
        className: classNames(styles$7.drag_container, {
          [styles$7.vertical]: isVertical,
          [styles$7.horizontal]: !isVertical
        }),
        onTouchStart: e => handleResize(e, sibling),
        onMouseDown: e => handleResize(e, sibling)
      }, /*#__PURE__*/React.createElement("div", {
        className: classNames(styles$7.drag_handle, {
          [styles$7.vertical]: isVertical,
          [styles$7.horizontal]: !isVertical
        }),
        style: {
          backgroundColor: context.accent_color,
          borderColor: context.primary_color
        }
      })));
    });
    return elements;
  };

  return /*#__PURE__*/React.createElement("div", {
    ref: wrapperElement,
    style: {
      backgroundColor: context.tertiary_color
    },
    className: classNames(styles$7.wrapper, {
      [styles$7.vertical]: isVertical,
      [styles$7.horizontal]: !isVertical,
      [styles$7.empty]: isEmpty
    })
  }, generateLayout());
});
LayoutContainer.defaultProps = {
  size: 100,
  order: 0
};
LayoutContainer.propTypes = {};

var styles$8 = {"wrapper":"_PagesContainer-module__wrapper__3YMIz","pagecontent":"_PagesContainer-module__pagecontent__2QZA5","pagenav":"_PagesContainer-module__pagenav__1nlPP"};

const Pages = props => {
  const [currentPage, setCurrentPage] = useState(0);
  const context = useContext(UIContext).theme;

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage + 1 < props.children.length) setCurrentPage(currentPage + 1);
  };

  const buttonStyle = {
    backgroundColor: context.secondary_color,
    color: context.text_color
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles$8.wrapper,
    style: props.style
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$8.pagecontent
  }, props.children[currentPage]), /*#__PURE__*/React.createElement("div", {
    className: styles$8.pagenav
  }, /*#__PURE__*/React.createElement("button", {
    style: buttonStyle,
    onClick: handlePreviousPage
  }, '<'), /*#__PURE__*/React.createElement("button", {
    style: buttonStyle,
    onClick: handleNextPage
  }, '>'), /*#__PURE__*/React.createElement("span", null, `${currentPage + 1} of ${props.children.length}`)));
};

var styles$9 = {"wrapper":"_InputBool-module__wrapper__38eCI","wrapper_inner":"_InputBool-module__wrapper_inner__2obra"};

const InputBool = observer(props => {
  const context = useContext(UIContext).theme;

  const updateValue = e => props.onChange(e.target.checked, e.target.value);

  return /*#__PURE__*/React.createElement("div", {
    className: styles$9.wrapper,
    style: { ...props.style,
      backgroundColor: props.focused ? context.accent_color : context.secondary_color,
      flexFlow: props.hLabel && props.label ? 'row' : 'column'
    }
  }, props.label && /*#__PURE__*/React.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React.createElement("div", {
    className: styles$9.wrapper_inner
  }, /*#__PURE__*/React.createElement("input", {
    style: props.style,
    type: "checkbox",
    value: props.value,
    checked: props.checked,
    onChange: updateValue,
    onContextMenu: props.onContextMenu
  })));
});

var styles$a = {"wrapper":"_InputFloat-module__wrapper__2vWWU","wrapper_inner":"_InputFloat-module__wrapper_inner__1KItv","dragOverlay":"_InputFloat-module__dragOverlay__2-zBM"};

let position = [0, 0];
let base_value = 0;
const InputFloat = observer(props => {
  const context = useContext(UIContext).theme;

  const handleChange = e => props.onChange(Number(e.target.value));

  const handleDragStart = e => {
    let dragging = false;

    function handleDrag(e) {
      e.preventDefault();
      dragging = true;

      if (e.pageY) {
        let scalar = e.ctrlKey ? 100 : e.shiftKey ? 20000 : 1000;
        let x_offset = e.pageX - position[0];
        let y_offset = position[1] - e.pageY;
        x_offset = Math.min(Math.max(x_offset, 1), 100);
        let output_value = base_value + y_offset * x_offset / scalar;

        if (props.step) {
          output_value /= props.step;
          output_value = Math.floor(output_value);
          output_value *= props.step;
        }

        props.onChange(output_value);
      }
    }

    function handleDragEnd(e) {
      if (dragging) {
        let scalar = e.ctrlKey ? 100 : e.shiftKey ? 20000 : 1000;
        let x_offset = e.pageX - position[0];
        let y_offset = position[1] - e.pageY;
        x_offset = Math.min(Math.max(x_offset, 1), 100);
        let output_value = base_value + y_offset * x_offset / scalar;

        if (props.step) {
          output_value /= props.step;
          output_value = Math.floor(output_value);
          output_value *= props.step;
        }

        props.onChange(output_value);
      }

      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', handleDragEnd);
      dragging = false;
    }

    if (e.touches && e.touches[0]) e = e.touches[0];
    position = [e.pageX, e.pageY];
    base_value = props.value;
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  const value = parseFloat(props.value).toFixed(2);
  const defaultInputStyle = {
    backgroundColor: context.secondary_color,
    color: context.text_color
  };
  return /*#__PURE__*/React.createElement("div", {
    className: styles$a.wrapper,
    style: { ...props.style,
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    }
  }, props.label && /*#__PURE__*/React.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React.createElement("div", {
    className: styles$a.wrapper_inner
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: props.step,
    value: Number(value),
    onChange: handleChange,
    onClick: props.onClick,
    onTouchStart: handleDragStart,
    onMouseDown: handleDragStart,
    onDoubleClick: props.onDoubleClick,
    onContextMenu: props.onContextMenu,
    style: { ...defaultInputStyle,
      ...props.inputStyle
    }
  })));
});
InputFloat.defaultProps = {
  value: 0,
  step: 0.1,
  focused: false
};
InputFloat.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  step: PropTypes.number,
  focused: PropTypes.bool,
  onChange: PropTypes.func,
  onDoubleClick: PropTypes.func,
  inputStyle: PropTypes.object
};

var styles$b = {"wrapper":"_InputSelect-module__wrapper__1B9B8","wrapper_inner":"_InputSelect-module__wrapper_inner__2i8h4"};

const InputSelect = props => {
  const context = useContext(UIContext).theme;

  const handleChange = e => props.onChange(e.target.value);

  return /*#__PURE__*/React.createElement("div", {
    className: styles$b.wrapper,
    style: { ...props.style,
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    }
  }, props.label && /*#__PURE__*/React.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React.createElement("div", {
    className: styles$b.wrapper_inner
  }, /*#__PURE__*/React.createElement("select", {
    defaultValue: props.selectedOption,
    onChange: handleChange,
    onContextMenu: props.onContextMenu,
    style: {
      backgroundColor: context.secondary_color,
      color: context.text_color
    }
  }, props.options.map((opt, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: opt.value
  }, opt.label)))));
};

var styles$c = {"wrapper":"_InputSlider-module__wrapper__3sg2E","slider_track":"_InputSlider-module__slider_track__1S-tO","handle":"_InputSlider-module__handle__BhBAn","vertical":"_InputSlider-module__vertical__2cOVj","horizontal":"_InputSlider-module__horizontal__MEKW8","sleeve":"_InputSlider-module__sleeve__3EORW"};

let slider_bounds = null;

const InputSlider = props => {
  const context = useContext(UIContext).theme;
  const slider_element = useRef(null);

  const handleDragStart = e => {
    function handleDrag(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageY) {
        let x = e.pageX + 2;
        let position = (x - slider_bounds.x) / slider_bounds.width;
        let value = position * (props.max - props.min) + props.min;
        if (position <= 0.0) value = props.min;
        if (position >= 1.0) value = props.max;
        props.onChange(Math.floor(value / props.step) * props.step);
      }
    }

    function handleDragEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];
      let x = e.pageX + 2;
      let position = (x - slider_bounds.x) / slider_bounds.width;
      let value = position * (props.max - props.min) + props.min;

      if (position >= 0.0 && position <= 1.0) {
        props.onChange(Math.floor(value / props.step) * props.step);
      }

      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('touchend', handleDragEnd);
    }

    if (e.touches && e.touches[0]) e = e.touches[0];
    slider_bounds = slider_element.current.getBoundingClientRect();
    let x = e.pageX + 2;
    let position = (x - slider_bounds.x) / slider_bounds.width;
    let value = position * (props.max - props.min) + props.min;
    console.log([props.min, props.max]);
    console.log('position', position);
    console.log('value', value);

    if (position >= 0.0 && position <= 1.0) {
      props.onChange(Math.floor(value / props.step) * props.step);
    }

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleFloatDrag = v => {
    props.onChange(v);
  };

  return /*#__PURE__*/React.createElement("div", {
    className: styles$c.wrapper + ' ' + styles$c.horizontal,
    style: props.style,
    onContextMenu: props.onContextMenu
  }, /*#__PURE__*/React.createElement(InputFloat, {
    value: props.value,
    onChange: handleFloatDrag,
    step: props.step || 0.1
  }), /*#__PURE__*/React.createElement("div", {
    ref: slider_element,
    className: styles$c.slider_track,
    onTouchStart: handleDragStart,
    onMouseDown: handleDragStart,
    style: {
      backgroundColor: context.secondary_color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles$c.sleeve,
    style: {
      width: (props.value - props.min) / (props.max - props.min) * 100 + '%',
      backgroundColor: context.accent_color
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles$c.handle,
    style: {
      left: (props.value - props.min) / (props.max - props.min) * 100 + '%',
      backgroundColor: context.accent_color
    }
  })));
};

InputSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  style: PropTypes.object
};

var styles$d = {"wrapper":"_InputColor-module__wrapper__3e2_F","wrapper_inner":"_InputColor-module__wrapper_inner__2csGd"};

const InputColor = props => {
  const context = useContext(UIContext).theme;

  const handleChange = e => props.onChange(e.target.value);

  return /*#__PURE__*/React.createElement("div", {
    className: styles$d.wrapper,
    style: { ...props.style,
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    }
  }, props.label && /*#__PURE__*/React.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React.createElement("div", {
    className: styles$d.wrapper_inner
  }, props.showValue && /*#__PURE__*/React.createElement("input", {
    type: "string",
    className: styles$d.textInput,
    value: props.value,
    onChange: handleChange,
    style: {
      backgroundColor: context.text_color,
      color: context.secondary_color
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: props.value,
    onChange: handleChange,
    onContextMenu: props.onContextMenu,
    style: {
      backgroundColor: context.secondary_color,
      color: context.secondary_color
    }
  })));
};

const ContextMenuItem = types.model('ContextMenuItem', {
  id: types.identifier,
  label: types.frozen(),
  buttons: types.frozen(),
  dropDown: types.map(types.late(() => ContextMenuItem))
}).volatile(self => ({
  onClick: () => {}
}));
const Context = types.model('Context', {}).volatile(self => ({
  contextmenu: {},
  keylistener: tinykeys(window, {}),
  keymap: null
})).actions(self => ({
  setKeymap: keymap => {
    if (self.keylistener) self.keylistener();
    self.keymap = keymap;
    self.keylistener = tinykeys(window, self.keymap);
  },
  removeKeymap: () => self.keylistener(),
  setContextmenu: c => {
    self.contextmenu = c;
  }
}));

const Panel$1 = types.model('Panel', {
  id: types.identifier,
  component_type: '',
  title: types.maybe(types.string),
  subtitle: types.maybe(types.string),
  showTitle: true,
  floating: false,
  fullscreen: false,
  canFloat: false,
  canRemove: false,
  canFullscreen: false,
  dimensions: types.array(types.number),
  position: types.array(types.number),
  layout: types.maybe(types.late(() => Layout))
}).volatile(self => ({
  parent_layout: null
})).actions(self => ({
  setLayout: layout => {
    self.layout = layout;
  },
  setFloating: f => {
    self.floating = f;
  },
  toggleFloating: () => {
    self.floating = !self.floating;
  },
  toggleFullscreen: () => {
    self.fullscreen = !self.fullscreen;
  },
  setPosition: p => {
    if (p[1] < 24) p[1] = 24;
    self.position = p;
    if (p[0] + self.dimensions[0] > window.innerWidth) self.position[0] = window.innerWidth - self.dimensions[0];
    if (p[1] + self.dimensions[1] > window.innerHeight) self.position[1] = window.innerHeight - self.dimensions[1];
  },
  setDimensions: d => {
    self.dimensions = d;
    if (d[0] + self.position[0] > window.innerWidth) self.dimensions[0] = window.innerWidth - self.position[0];
    if (d[1] + self.position[1] > window.innerHeight) self.dimensions[1] = window.innerHeight - self.position[1];
  },
  setFullscreen: f => {
    self.fullscreen = f;
  },
  onRemove: () => {
    self.parent_layout = getParent(self, 2);
    self.parent_layout.removePanel(self);
  },
  center: () => {
    self.position[0] = window.innerWidth / 2 - self.dimensions[0] / 2;
    self.position[1] = window.innerHeight / 2 - self.dimensions[1] / 2;
  },
  fitScreen: () => {
    if (self.position[0] <= 0) self.position[0] = 0;
    if (self.position[1] <= 0) self.position[1] = 0;
  }
}));

const Layout = types.model('Layout', {
  id: types.identifier,
  title: 'Layout',
  size: 0,
  panel: types.maybe(Panel$1),
  children: types.array(types.late(() => Layout)),
  direction: types.optional(types.enumeration(['VERTICAL', 'HORIZONTAL']), 'HORIZONTAL')
}).views(self => ({
  get isEmpty() {
    const result = self.children.length && self.children.filter(s => !s.panel && !s.isEmpty || s.panel && !s.panel.floating).length === 0;
    return result;
  }

})).volatile(self => ({
  siblings: null,
  rootStore: null
})).actions(self => ({
  afterAttach: () => {
    self.siblings = getParent(self);
    self.rootStore = getRoot(self);
  },
  adjust: position => {
    const selfIndex = self.siblings.indexOf(self);
    let sum = 0;

    for (let i = 0; i < selfIndex; i++) {
      sum += self.siblings[i].size;
    }

    const previousSize = self.size;
    const adjustedSize = position - sum;
    self.setSize(adjustedSize);
    const nextSibling = self.siblings[selfIndex + 1];
    nextSibling.setSize(nextSibling.size + (previousSize - adjustedSize));
  },
  distributeChildren: () => {
    self.children.forEach((e, i) => {
      console.log(i, (i + 1) / self.children.length);
      e.setSize(1 / self.children.length);
    });
  },
  setSize: size => {
    self.size = size;
  },
  setPanel: panelId => {
    const newpanel = { ...self.rootStore.ui.panelVariants[panelId],
      floating: self.panel.floating,
      dimensions: [...self.panel.dimensions],
      position: [...self.panel.position]
    };
    self.panel = newpanel;
    self.title = self.rootStore.ui.panelVariants[panelId].title;
  },
  addPanel: (panel, after) => {
    const insertAfter = self.children.indexOf(after);
    self.children.splice(insertAfter + 1, 0, Layout.create({
      id: nanoid(),
      panel: panel,
      size: 1 / self.children.length
    }));
    self.distributeChildren();
  },
  removePanel: panel => {
    if (self.children) {
      self.children = self.children.filter(child => child !== panel);

      if (self.children.length === 0) {
        if (getParent(self, 2).removePanel) getParent(self, 2).removePanel(self);
      }
    }

    self.distributeChildren();
  },
  clear: () => {
    if (self.panels && self.children) {
      self.panels.clear();
      self.children = [];
    }
  }
}));

const themes = {
  'weyland': {
    primary_color: '#ffffff',
    secondary_color: '#C2C2C2',
    tertiary_color: '#e0e0e0',
    text_color: '#000000',
    outline_color: '#aaaaaa',
    accent_color: '#3fa3a3'
  },
  'yutani': {
    primary_color: '#000000',
    secondary_color: '#202020',
    tertiary_color: '#303030',
    text_color: '#ffffff',
    outline_color: '#474747',
    accent_color: '#3fa3a3'
  },
  'powershell': {
    primary_color: '#012456',
    secondary_color: '#304E78',
    tertiary_color: '#233767',
    text_color: '#ffffff',
    outline_color: '#51578B',
    accent_color: '#ffff00'
  },
  'sarah': {
    primary_color: '#0D5439',
    secondary_color: '#9D6C71',
    tertiary_color: '#5b6b5c',
    text_color: '#C9A6A6',
    outline_color: '#aaaaaa',
    accent_color: '#D3945A'
  }
};
const Theme = types.model("Theme", { ...themes.weyland
}).actions(self => ({
  setTheme: theme => {
    self.primary_color = theme.primary_color;
    self.secondary_color = theme.secondary_color;
    self.tertiary_color = theme.tertiary_color;
    self.text_color = theme.text_color;
    self.outline_color = theme.outline_color;
    self.accent_color = theme.accent_color;
  },
  setPrimaryColor: color => self.primary_color = color,
  setSecondaryColor: color => self.secondary_color = color,
  setTertiaryColor: color => self.tertiary_color = color,
  setTextColor: color => self.text_color = color,
  setOutlineColor: color => self.outline_color = color,
  setAccentColor: color => self.accent_color = color
}));

const UI = types.model('UI', {
  panels: types.map(Panel$1),
  theme: Theme,
  context: types.maybe(Context)
}).volatile(self => ({
  panelVariants: null,
  layoutVariants: null
})).actions(self => ({
  afterAttach: () => {
    self.context = Context.create();
  },
  setPanelVariants: panels => {
    self.panelVariants = panels;
  },
  setLayoutVariants: layouts => {
    self.layoutVariants = layouts;
  },
  getPanelVariant: id => {
    return self.panelVariants[id];
  },
  getLayoutVariant: id => {
    if (self.layoutVariants[id]) {
      return self.layoutVariants[id];
    } else {
      if (self.panelVariants) {
        console.error(`variant (${id}) could not be found. should be one of the following: (${Object.keys(self.panelVariants)})`);
      } else {
        console.error(`no variants found!`);
      }
    }
  },
  getPanel: id => {
    return self.panels.get(id);
  }
}));

let MacoWrapperComponent = MacoWrapper;
let TextComponent = Text;
let PanelComponent = Panel;
let GenericPanel$1 = GenericPanel;
let ToolbarComponent = Toolbar;
let ContextMenuComponent = ContextMenu;
let ControlGroupComponent = ControlGroup;
let SplitContainer$1 = SplitContainer;
let LayoutContainer$1 = LayoutContainer;
let PagesContainer = Pages;
let InputBool$1 = InputBool;
let InputFloat$1 = InputFloat;
let InputSelect$1 = InputSelect;
let InputSlider$1 = InputSlider;
let InputColor$1 = InputColor;
let UIContext$1 = UIContext;
let Themes = themes;
let ContextStore = Context;
let LayoutStore = Layout;
let PanelStore = Panel$1;
let UIStore = UI;

export { ContextMenuComponent, ContextStore, ControlGroupComponent, GenericPanel$1 as GenericPanel, InputBool$1 as InputBool, InputColor$1 as InputColor, InputFloat$1 as InputFloat, InputSelect$1 as InputSelect, InputSlider$1 as InputSlider, LayoutContainer$1 as LayoutContainer, LayoutStore, MacoWrapperComponent, PagesContainer, PanelComponent, PanelStore, SplitContainer$1 as SplitContainer, TextComponent, Themes, ToolbarComponent, UIContext$1 as UIContext, UIStore };
//# sourceMappingURL=index.modern.js.map
