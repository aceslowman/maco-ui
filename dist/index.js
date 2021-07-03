function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var mobxReact = require('mobx-react');
var classNames = _interopDefault(require('classnames'));
var PropTypes = _interopDefault(require('prop-types'));
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var mobxStateTree = require('mobx-state-tree');
var tinykeys = _interopDefault(require('tinykeys'));
var nanoid = require('nanoid');

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var styles = {"wrapper":"_MacoWrapperComponent-module__wrapper__2QN4S"};

var styles$1 = {"toolbar":"_ToolbarComponent-module__toolbar__3H9OD","activeButton":"_ToolbarComponent-module__activeButton__nBqTk","button":"_ToolbarComponent-module__button__11AN1","itemDecoration":"_ToolbarComponent-module__itemDecoration__2AS8M","disableHover":"_ToolbarComponent-module__disableHover__3mDwQ"};

var UIContext = React__default.createContext({});

var styles$2 = {"drawer":"_DropDownComponent-module__drawer__HZEnU","activeButton":"_DropDownComponent-module__activeButton__3TP9j","subDropDown":"_DropDownComponent-module__subDropDown__dUGHr","openUp":"_DropDownComponent-module__openUp__3ixui","openLeft":"_DropDownComponent-module__openLeft__1Nafv","disableHover":"_DropDownComponent-module__disableHover__2YRIx"};

var style = {
  drawer: {
    width: '0px',
    top: '0px',
    left: '0px'
  }
};
var DropDown = mobxReact.observer(function (props) {
  var context = React.useContext(UIContext).theme;
  var mainRef = React.useRef(null);

  var _useState = React.useState(null),
      activeItem = _useState[0],
      setActiveItem = _useState[1];

  var _useState2 = React.useState(false),
      subDropDownOpen = _useState2[0],
      setSubDropDownOpen = _useState2[1];

  var _useState3 = React.useState(null),
      subDropDownId = _useState3[0],
      setSubDropDownId = _useState3[1];

  var _useState4 = React.useState({
    top: 0,
    left: 0
  }),
      subDropDownPosition = _useState4[0],
      setSubDropDownPosition = _useState4[1];

  var handleSubDropDown = function handleSubDropDown(e, index, item) {
    if (item.onClick) item.onClick();
    var toggle = index === activeItem ? !subDropDownOpen : true;
    var bounds = e.currentTarget.getBoundingClientRect();
    setActiveItem(toggle ? index : false);
    setSubDropDownId(item.id);
    setSubDropDownOpen(toggle);
    setSubDropDownPosition({
      top: !props.openUp ? -bounds.height : 'auto',
      bottom: props.openUp ? 0 : 'auto',
      left: props.openLeft ? -bounds.width : bounds.width
    });
  };

  var handleClickAway = function handleClickAway(e) {
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

  React.useLayoutEffect(function () {
    document.addEventListener('click', function (e) {
      return handleClickAway(e);
    });
    document.addEventListener('contextmenu', function (e) {
      return handleContextMenu();
    });
    return function () {
      document.removeEventListener('click', function (e) {
        return handleClickAway(e);
      });
      document.addEventListener('contextmenu', function (e) {
        return handleContextMenu();
      });
    };
  }, []);
  style = _extends({}, style, {
    drawer: _extends({
      width: props.open ? '150px' : '0px'
    }, props.position)
  });
  return /*#__PURE__*/React__default.createElement("div", {
    className: classNames(styles$2.drawer, {}),
    ref: function ref(e) {
      return handleRef(e);
    },
    style: _extends({}, style.drawer, {
      backgroundColor: context.secondary_color,
      color: context.text_color
    })
  }, props.items && Object.keys(props.items).map(function (k, i) {
    var item = props.items[k];

    if (item.dropDown) {
      var _classNames;

      return /*#__PURE__*/React__default.createElement("div", {
        key: item.id,
        className: styles$2.subDropDown,
        style: _extends({}, style.drawer, {
          backgroundColor: context.secondary_color,
          color: context.text_color
        })
      }, /*#__PURE__*/React__default.createElement("button", {
        key: 'sub' + item.id,
        onClick: function onClick(e) {
          return handleSubDropDown(e, i, item);
        },
        className: classNames((_classNames = {}, _classNames[styles$2.activeButton] = i === activeItem, _classNames[styles$2.openLeft] = props.openLeft, _classNames[styles$2.openUp] = props.openUp, _classNames))
      }, item.label, /*#__PURE__*/React__default.createElement("span", null, props.openLeft ? '<' : '>')), i === activeItem && subDropDownId && /*#__PURE__*/React__default.createElement("div", {
        key: item.id,
        style: {
          position: 'fixed'
        }
      }, /*#__PURE__*/React__default.createElement(DropDown, {
        key: item.id + 'dd',
        open: props.open && subDropDownOpen,
        items: _extends({}, props.items[subDropDownId].dropDown),
        position: subDropDownPosition,
        openLeft: props.openLeft,
        openUp: props.openUp
      })));
    } else {
      var _classNames2;

      return /*#__PURE__*/React__default.createElement("div", {
        key: item.id,
        className: classNames((_classNames2 = {}, _classNames2[styles$2.activeButton] = i === activeItem, _classNames2[styles$2.disableHover] = item.disableHover, _classNames2[styles$2.openLeft] = props.openLeft, _classNames2[styles$2.openUp] = props.openUp, _classNames2)),
        style: {
          display: 'flex',
          width: '100%'
        }
      }, /*#__PURE__*/React__default.createElement("button", {
        key: 'normal' + item.id,
        title: item.title,
        onClick: item.onClick
      }, item.label), item.buttons && Object.keys(item.buttons).map(function (k) {
        var b = item.buttons[k];
        return /*#__PURE__*/React__default.createElement("button", {
          key: 'button' + b.id,
          onClick: b.onClick,
          title: b.title,
          style: {
            border: "1px solid " + context.outline_color,
            borderTop: 'none',
            borderBottom: 'none',
            borderLeftStyle: !props.openLeft ? 'solid' : 'none',
            borderRightStyle: props.openLeft ? 'solid' : 'none',
            flexShrink: 10,
            padding: 3
          }
        }, /*#__PURE__*/React__default.createElement("small", null, b.label));
      }));
    }
  }));
});
DropDown.defaultProps = {
  openLeft: false,
  openUp: false
};
DropDown.propTypes = {};

var Toolbar = mobxReact.observer(function (props) {
  var context = React.useContext(UIContext).theme;
  var mainRef = React.useRef(null);

  var _useState = React.useState(null),
      activeItem = _useState[0],
      setActiveItem = _useState[1];

  var _useState2 = React.useState(false),
      dropDownOpen = _useState2[0],
      setDropDownOpen = _useState2[1];

  var _useState3 = React.useState(null),
      dropDownId = _useState3[0],
      setDropDownId = _useState3[1];

  var _useState4 = React.useState({
    top: 0,
    left: 0
  }),
      dropDownPosition = _useState4[0],
      setDropDownPosition = _useState4[1];

  var _useState5 = React.useState(false),
      openUp = _useState5[0],
      setOpenUp = _useState5[1];

  var handleClickAway = function handleClickAway(e) {
    if (mainRef.current && !mainRef.current.contains(e.target)) {
      setActiveItem(null);
      setDropDownOpen(false);
    }
  };

  var handleWheel = function handleWheel(e) {
    var offset = Math.sign(e.deltaY) * 5;
    mainRef.current.scroll(mainRef.current.scrollLeft + offset, 0);
    var at_start = mainRef.current.scrollLeft === 0;
    var at_end = mainRef.current.offsetWidth + mainRef.current.scrollLeft >= mainRef.current.scrollWidth;

    if (!at_start && !at_end && dropDownOpen) {
      setDropDownPosition({
        top: dropDownPosition.top,
        left: dropDownPosition.left - offset
      });
    }
  };

  React.useEffect(function () {
    document.addEventListener('click', function (e) {
      return handleClickAway(e);
    });
    var bounds = mainRef.current.getBoundingClientRect();
    setOpenUp(bounds.y > window.innerHeight - window.innerHeight / 3);
    return document.removeEventListener('click', function (e) {
      return handleClickAway(e);
    });
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$1.toolbar,
    ref: mainRef,
    style: _extends({}, props.style, {
      backgroundColor: context.secondary_color || 'black',
      color: context.text_color || 'white'
    }),
    onWheel: handleWheel
  }, props.items && Object.keys(props.items).map(function (k, i) {
    var _classNames;

    var item = props.items[k];
    return /*#__PURE__*/React__default.createElement("button", {
      key: item.id,
      title: item.title,
      style: _extends({}, item.style, {
        borderColor: context.text_color
      }),
      className: classNames(styles$1.button, (_classNames = {}, _classNames[styles$1.activeButton] = item === activeItem || item.highlight, _classNames[styles$1.disableHover] = item.disableHover, _classNames)),
      onClick: function onClick(e) {
        if (item.dropDown) {
          var toggle = item === activeItem ? !dropDownOpen : true;
          var parent_bounds = mainRef.current.getBoundingClientRect();
          var bounds = e.currentTarget.getBoundingClientRect();

          var _openUp = bounds.y > window.innerHeight - window.innerHeight / 3;

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
    }, item.label, item.dropDown && /*#__PURE__*/React__default.createElement("span", {
      className: styles$1.itemDecoration
    }, openUp ? '▲' : '▼'));
  }), /*#__PURE__*/React__default.createElement("div", {
    style: {
      position: 'fixed'
    }
  }, props.items[dropDownId] && /*#__PURE__*/React__default.createElement(DropDown, {
    open: dropDownOpen,
    items: _extends({}, props.items[dropDownId].dropDown),
    position: dropDownPosition,
    openUp: openUp
  })));
});

var ContextMenu = mobxReact.observer(function (props) {
  var mainRef = React.useRef(null);
  var dropRef = React.useRef(null);

  var _useState = React.useState(false),
      dropDownOpen = _useState[0],
      setDropDownOpen = _useState[1];

  var _useState2 = React.useState({
    top: 0,
    left: 0
  }),
      dropDownPosition = _useState2[0],
      setDropDownPosition = _useState2[1];

  var _useState3 = React.useState(false),
      dropDownOpenLeft = _useState3[0],
      setDropDownOpenLeft = _useState3[1];

  var _useState4 = React.useState(false),
      dropDownOpenUp = _useState4[0],
      setDropDownOpenUp = _useState4[1];

  var handleClickAway = function handleClickAway(e) {
    if (mainRef.current && !mainRef.current.contains(e.target)) {
      setDropDownOpen(false);
    }
  };

  var handleClick = function handleClick(e) {
    e.preventDefault();
    setDropDownOpen(true);
    var x = e.pageX;
    var y = e.pageY;
    if (e.pageX + 150 > window.innerWidth) x -= 150;

    var _openUp = y > window.innerHeight - window.innerHeight / 3;

    setDropDownOpenUp(_openUp);
    setDropDownOpenLeft(e.pageX > window.innerWidth / 2);
    setDropDownPosition({
      top: !_openUp ? y : 'auto',
      bottom: _openUp ? window.innerHeight - y : 'auto',
      left: x
    });
    return false;
  };

  var handleRef = function handleRef(e) {
    dropRef = e;
  };

  React.useLayoutEffect(function () {
    document.addEventListener('click', function (e) {
      return handleClickAway(e);
    }, true);
    document.addEventListener('contextmenu', function (e) {
      return handleClick(e);
    }, true);
    return function () {
      document.removeEventListener('click', function (e) {
        return handleClickAway(e);
      }, true);
      document.removeEventListener('contextmenu', function (e) {
        return handleClick(e);
      }, true);
    };
  }, []);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: mainRef
  }, /*#__PURE__*/React__default.createElement(DropDown, {
    open: dropDownOpen,
    items: props.items,
    position: dropDownPosition,
    onRef: handleRef,
    openLeft: dropDownOpenLeft,
    openUp: dropDownOpenUp
  }));
});

var MacoWrapper = mobxReact.observer(function (props) {
  var store = props.store;

  var handleContextMenu = function handleContextMenu() {
    store.ui.context.setContextmenu(props.contextmenu);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React__default.createElement(UIContext.Provider, {
    value: store.ui
  }, /*#__PURE__*/React__default.createElement(Toolbar, {
    items: props.titlebar
  }), /*#__PURE__*/React__default.createElement(ContextMenu, {
    items: store.ui.context.contextmenu
  }), /*#__PURE__*/React__default.createElement("div", {
    className: props.className,
    style: _extends({
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: store.ui.theme.tertiary_color
    }, props.style),
    onContextMenu: function onContextMenu() {
      return handleContextMenu();
    }
  }), props.children));
});
MacoWrapper.defaultProps = {
  contextmenu: {},
  titlebar: {}
};

var styles$3 = {"panel":"_PanelComponent-module__panel__2yteA","panelSelect":"_PanelComponent-module__panelSelect__7Ulh3","title_bar":"_PanelComponent-module__title_bar__2bArp","subtitle":"_PanelComponent-module__subtitle__Mh0_d","panel_content":"_PanelComponent-module__panel_content__2tcNH","fullscreen":"_PanelComponent-module__fullscreen__1HmTw","collapsed":"_PanelComponent-module__collapsed__qKCgk","horizontal":"_PanelComponent-module__horizontal__3ExTZ","vertical":"_PanelComponent-module__vertical__1MHdL","floating":"_PanelComponent-module__floating__3aE5b","resizeHandle":"_PanelComponent-module__resizeHandle__2cemD","resizeSE":"_PanelComponent-module__resizeSE__25SKY","resizeE":"_PanelComponent-module__resizeE__3lwm2","resizeS":"_PanelComponent-module__resizeS__p_Skn","resizeN":"_PanelComponent-module__resizeN__UmDS3","resizeNW":"_PanelComponent-module__resizeNW__3RvlH","resizeNE":"_PanelComponent-module__resizeNE__37vdB","resizeSW":"_PanelComponent-module__resizeSW__1FPl3","resizeW":"_PanelComponent-module__resizeW__3ey4p","moveHandle":"_PanelComponent-module__moveHandle__2RvpC","dragContainer":"_PanelComponent-module__dragContainer__1DDNn","indicators":"_PanelComponent-module__indicators__NiV_D","indicator":"_PanelComponent-module__indicator__1kQjp","tooltip":"_PanelComponent-module__tooltip__2H2yT","tooltip_symbol":"_PanelComponent-module__tooltip_symbol__1fFBX","tooltip_content":"_PanelComponent-module__tooltip_content__3wcYC"};

var Tooltip = mobxReact.observer(function (props) {
  var context = React.useContext(UIContext).theme;

  var _useState = React.useState(false),
      show = _useState[0],
      setShow = _useState[1];

  var _useState2 = React.useState([0, 0, 0, 0]),
      position = _useState2[0],
      setPosition = _useState2[1];

  var handleToggle = function handleToggle(e) {
    var x = e.pageX;
    var y = e.pageY;
    if (x > window.innerWidth - 150) x = e.pageX - 150;
    if (y > window.innerHeight - 150) y = e.pageY - 150;
    setPosition([x, y]);
    setShow(!show);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.tooltip
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.tooltip_symbol,
    onClick: function onClick(e) {
      return handleToggle(e);
    }
  }, "\u2139"), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.tooltip_content,
    style: {
      backgroundColor: context.primary_color,
      border: "1px solid " + context.outline_color,
      display: show ? 'block' : 'none',
      left: position[0],
      top: position[1]
    }
  }, props.content));
});
var Panel = mobxReact.observer(function (props) {
  var _classNames, _classNames2;

  var context = React.useContext(UIContext).theme;
  var ui = React.useContext(UIContext);
  var wrapperElement = React.useRef(null);

  var _useState3 = React.useState(props.expanded),
      expanded = _useState3[0],
      setExpanded = _useState3[1];

  var _useState4 = React.useState(props.focused),
      focused = _useState4[0],
      setFocused = _useState4[1];

  var _useState5 = React.useState(false),
      hover = _useState5[0],
      setHover = _useState5[1];

  var handleResize = function handleResize(e, direction) {
    if (direction === void 0) {
      direction = 'xy';
    }

    var dragging = true;
    var pBounds = wrapperElement.current.getBoundingClientRect();
    var initialDimensions = [pBounds.width, pBounds.height];
    var initialPosition = [pBounds.x, pBounds.y];

    var handleMove = function handleMove(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageY && dragging) {
        var _pBounds = wrapperElement.current.getBoundingClientRect();

        var w, h;
        var x, y;

        switch (direction) {
          case 'se':
            w = e.pageX - _pBounds.x;
            h = e.pageY - _pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'e':
            w = e.pageX - _pBounds.x;
            h = props.dimensions[1];
            props.onDimensionsChange([w, h]);
            break;

          case 's':
            w = props.dimensions[0];
            h = e.pageY - _pBounds.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'sw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = e.pageY - _pBounds.y;
            x = e.pageX;
            y = _pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'w':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = props.dimensions[1];
            x = e.pageX;
            y = _pBounds.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'n':
            w = props.dimensions[0];
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = _pBounds.x;
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
            w = e.pageX - _pBounds.x;
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = _pBounds.x;
            y = e.pageY;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;
        }
      }
    };

    var handleMoveEnd = function handleMoveEnd(e) {
      dragging = false;
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageY) {
        var _pBounds2 = wrapperElement.current.getBoundingClientRect();

        var w, h;
        var x, y;

        switch (direction) {
          case 'se':
            w = e.pageX - _pBounds2.x;
            h = e.pageY - _pBounds2.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'e':
            w = e.pageX - _pBounds2.x;
            h = props.dimensions[1];
            props.onDimensionsChange([w, h]);
            break;

          case 's':
            w = props.dimensions[0];
            h = e.pageY - _pBounds2.y;
            props.onDimensionsChange([w, h]);
            break;

          case 'sw':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = e.pageY - _pBounds2.y;
            x = e.pageX;
            y = _pBounds2.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'w':
            w = initialDimensions[0] + (initialPosition[0] - e.pageX);
            h = props.dimensions[1];
            x = e.pageX;
            y = _pBounds2.y;
            props.onPositionChange([x, y]);
            props.onDimensionsChange([w, h]);
            break;

          case 'n':
            w = props.dimensions[0];
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = _pBounds2.x;
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
            w = e.pageX - _pBounds2.x;
            h = initialDimensions[1] + (initialPosition[1] - e.pageY);
            x = _pBounds2.x;
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

  var handleMoveStart = function handleMoveStart(e) {
    function handleMove(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageY) {
        var x = e.pageX - dragOff[0];
        var y = e.pageY - dragOff[1];
        props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageY) {
        var x = e.pageX - dragOff[0];
        var y = e.pageY - dragOff[1];
        props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
      }

      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleMoveEnd);
    }

    if (e.touches) e = e.touches[0];
    var pBounds = wrapperElement.current.getBoundingClientRect();
    var offset = {
      x: pBounds.left,
      y: pBounds.top
    };
    var dragOff = [e.pageX - offset.x, e.pageY - offset.y];
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('touchend', handleMoveEnd);
  };

  var handleCenter = function handleCenter() {
    if (!props.onPositionChange) return;
    var pBounds = wrapperElement.current.getBoundingClientRect();
    var x = window.innerWidth / 2 - pBounds.width / 2;
    var y = window.innerHeight / 2 - pBounds.height / 2;
    props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0]);
  };

  var handleFullscreen = function handleFullscreen() {
    if (!props.fullscreen) handleCenter();
    props.onFullscreen(!props.fullscreen);
    props.onFloat(props.fullscreen);
  };

  var handleFloat = function handleFloat() {
    if (props.floating === null) {
      var pBounds = wrapperElement.current.getBoundingClientRect();
      if (props.onDimensionsChange) props.onDimensionsChange([pBounds.width, pBounds.height]);
    }

    if (props.onFloat) props.onFloat(!props.floating);
  };

  var handleFocus = function handleFocus(e) {
    setHover(true);
    setFocused(true);
    if (props.onFocus) props.onFocus(e);
  };

  var handleBlur = function handleBlur() {
    wrapperElement.current.blur();
    setHover(false);
    setFocused(false);
    if (props.onBlur) props.onBlur(false);
  };

  var mainStyling = {};

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

  var hasTitle = props.showTitle && (props.title || props.onRemove || props.collapsible || props.floating);
  var borderColor = focused ? context.accent_color : context.outline_color;
  React.useLayoutEffect(function () {
    setExpanded(props.expanded);
  }, [props.expanded]);
  return /*#__PURE__*/React__default.createElement("div", {
    ref: wrapperElement,
    className: classNames(styles$3.panel, (_classNames = {}, _classNames[styles$3.fullscreen] = props.fullscreen, _classNames[styles$3.floating] = props.floating, _classNames[styles$3.collapsed] = !expanded, _classNames)),
    style: _extends({
      backgroundColor: !props.fullscreen ? context.primary_color : 'transparent',
      color: context.text_color || 'white',
      border: props.border && !props.fullscreen ? '1px solid ' + borderColor : 'none',
      height: props.collapsible ? 'auto' : '100%',
      margin: props.gutters ? props.gutterSize : 0,
      zIndex: hover ? 5 : 2
    }, mainStyling, props.style),
    onFocus: handleFocus,
    onBlur: handleBlur,
    onContextMenu: props.onContextMenu,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave,
    onMouseOver: props.onMouseOver,
    onMouseOut: props.onMouseOut,
    tabIndex: "-1"
  }, hasTitle && /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.title_bar,
    style: _extends({
      backgroundColor: context.primary_color || 'black'
    }, props.titleStyle)
  }, props.canFullscreen && /*#__PURE__*/React__default.createElement("button", {
    title: "fullscreen",
    onClick: handleFullscreen,
    style: {
      fontSize: '0.9em'
    }
  }, "\u2733"), props.canRemove && /*#__PURE__*/React__default.createElement("button", {
    title: "close",
    onClick: props.onRemove
  }, "x"), props.canFloat && /*#__PURE__*/React__default.createElement("button", {
    title: props.floating ? 'snap' : 'float',
    onClick: handleFloat,
    style: {
      fontSize: '0.9em'
    }
  }, props.floating ? '◧' : '❏'), props.collapsible && /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return setExpanded(!expanded);
    }
  }, expanded ? '▾' : '▸'), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.dragContainer,
    onClick: props.collapsible && !props.canFullscreen ? function () {
      return setExpanded(!expanded);
    } : null
  }, props.floating && /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.moveHandle,
    onTouchStart: handleMoveStart,
    onMouseDown: handleMoveStart
  }), props.onPanelSelect !== undefined ? /*#__PURE__*/React__default.createElement("select", {
    title: "select the panel to display",
    className: styles$3.panelSelect,
    onChange: props.onPanelSelect,
    defaultValue: props.uuid
  }, Object.values(ui.panelVariants).map(function (e) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: e.id,
      value: e.id
    }, e.title);
  })) : /*#__PURE__*/React__default.createElement("legend", null, /*#__PURE__*/React__default.createElement("strong", null, props.title))), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.subtitle
  }, props.subtitle), props.indicators && /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.indicators
  }, props.indicators.map(function (e, i) {
    return /*#__PURE__*/React__default.createElement("div", {
      key: i,
      className: styles$3.indicator,
      title: e.title,
      style: {
        color: context.primary_color,
        backgroundColor: e.color
      }
    }, e.label);
  })), props.tooltip && /*#__PURE__*/React__default.createElement(Tooltip, {
    content: props.tooltip
  })), expanded && props.toolbar, expanded && /*#__PURE__*/React__default.createElement("div", {
    style: {
      borderColor: context.text_color,
      flexBasis: props.fullscreen ? '0px' : 'auto'
    },
    className: classNames(styles$3.panel_content, (_classNames2 = {}, _classNames2[styles$3.horizontal] = props.horizontal, _classNames2[styles$3.vertical] = props.vertical, _classNames2)),
    ref: props.onRef
  }, props.children), expanded && props.footbar, props.floating && !props.fullscreen && expanded && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeSE,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'se');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'se');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeE,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'e');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'e');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeS,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 's');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 's');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeSW,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'sw');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'sw');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeW,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'w');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'w');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeN,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'n');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'n');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeNE,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'ne');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'ne');
    },
    style: {
      borderColor: context.text_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
    className: styles$3.resizeHandle + " " + styles$3.resizeNW,
    onTouchStart: function onTouchStart(e) {
      return handleResize(e, 'nw');
    },
    onMouseDown: function onMouseDown(e) {
      return handleResize(e, 'nw');
    },
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
  onContextMenu: function onContextMenu() {}
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
var GenericPanel = mobxReact.observer(function (props) {
  var _props$title, _props$subtitle, _props$collapsible, _props$showTitle, _props$onRemove, _props$canRemove;

  return /*#__PURE__*/React__default.createElement(Panel, {
    uuid: props.panel.id,
    title: (_props$title = props.title) != null ? _props$title : props.panel.title,
    subtitle: (_props$subtitle = props.subtitle) != null ? _props$subtitle : props.panel.subtitle,
    collapsible: (_props$collapsible = props.collapsible) != null ? _props$collapsible : props.panel.collapsible,
    fullscreen: props.panel.fullscreen,
    canFullscreen: props.panel.canFullscreen,
    floating: props.panel.floating,
    expanded: props.expanded,
    showTitle: (_props$showTitle = props.showTitle) != null ? _props$showTitle : props.panel.showTitle,
    canFloat: props.panel.canFloat,
    defaultWidth: props.panel.defaultWidth,
    defaultHeight: props.panel.defaultWidth,
    position: props.panel.position,
    dimensions: props.panel.dimensions,
    toolbar: props.toolbar,
    footbar: props.footbar,
    indicators: props.indicators,
    tooltip: props.tooltip,
    onRemove: (_props$onRemove = props.onRemove) != null ? _props$onRemove : props.panel.onRemove,
    canRemove: (_props$canRemove = props.canRemove) != null ? _props$canRemove : props.panel.canRemove,
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
  }, props.children);
});

var styles$4 = {"text":"_TextComponent-module__text__1oiY2"};

var Text = function Text(props) {
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$4.text,
    style: props.style
  }, props.children);
};

var styles$5 = {"wrapper":"_ControlGroupComponent-module__wrapper__1mSUC"};

var ControlGroup = function ControlGroup(props) {
  var context = React.useContext(UIContext).theme;
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$5.wrapper
  }, /*#__PURE__*/React__default.createElement("fieldset", {
    style: {
      borderColor: context.outline_color
    }
  }, props.name && /*#__PURE__*/React__default.createElement("legend", {
    style: {
      padding: '2px 4px',
      backgroundColor: context.text_color,
      color: context.primary_color
    }
  }, /*#__PURE__*/React__default.createElement("strong", null, props.name)), /*#__PURE__*/React__default.createElement("div", null, React__default.Children.map(props.children, function (child) {
    var inputWidth = 100.0;

    if (props.children.length) {
      inputWidth = 100.0 / props.children.length;
    }

    if (React__default.isValidElement(child)) {
      return React__default.cloneElement(child, {
        style: {
          width: inputWidth + "%"
        }
      });
    }

    return child;
  }))));
};

var useObserver = function useObserver(callback, element, dependencies) {
  if (dependencies === void 0) {
    dependencies = [];
  }

  var observer = React.useRef(null);
  React.useLayoutEffect(function () {
    var observe = function observe() {
      if (element && element.current && observer.current) {
        observer.current.observe(element.current);
      }
    };

    var current = element.current;

    if (observer && observer.current && current) {
      observer.current.unobserve(current);
    }

    var resizeObserverOrPolyfill = ResizeObserver;
    observer.current = new resizeObserverOrPolyfill(callback);
    observe();
    return function () {
      if (observer && observer.current && current) {
        observer.current.unobserve(current);
      }
    };
  }, [callback, element, observer].concat(dependencies));
};

useObserver.propTypes = {
  element: PropTypes.object,
  callback: PropTypes.func
};

var styles$6 = {"wrapper":"_SplitContainer-module__wrapper__1CWdl","horizontal":"_SplitContainer-module__horizontal__Bk5vO","vertical":"_SplitContainer-module__vertical__2PDvd","drag_container":"_SplitContainer-module__drag_container__H0gkt","drag_handle_visible":"_SplitContainer-module__drag_handle_visible__1f5SD","drag_handle":"_SplitContainer-module__drag_handle__2--MZ","panel_container":"_SplitContainer-module__panel_container__HNP-M","split_container":"_SplitContainer-module__split_container__2lgi-","split_detached":"_SplitContainer-module__split_detached__3QIeQ","debug":"_SplitContainer-module__debug__1CADw","empty":"_SplitContainer-module__empty__2JebP","panel_content":"_SplitContainer-module__panel_content__2Gxvh"};

var Split = function Split(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? 0 : _ref$id,
      _ref$floating = _ref.floating,
      floating = _ref$floating === void 0 ? false : _ref$floating,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 100 : _ref$size;
  this.id = id;
  this.floating = floating;
  this.size = size;
};

var SplitContainer = function SplitContainer(props) {
  var _classNames;

  var context = React.useContext(UIContext).theme;

  var distributeSplits = function distributeSplits() {
    var count = props.children.length;
    if (count <= 1) return [new Split({
      id: 0,
      floating: false,
      size: 100
    })];
    var defaultSplits = props.children.filter(function (e) {
      return e.props.defaultsize;
    }).map(function (e, i) {
      return new Split({
        id: i,
        floating: false,
        size: e.props.defaultsize * 100.0
      });
    });

    if (defaultSplits.length) {
      var defaultSum = defaultSplits.filter(function (s) {
        return !s.floating;
      }).reduce(function (a, b) {
        return a + b.size;
      }, 0);
      return props.children.map(function (e, i) {
        return new Split({
          id: i,
          size: e.props.defaultsize ? e.props.defaultsize * 100.0 : (100.0 - defaultSum) / (count - 1),
          floating: false
        });
      });
    } else {
      return props.children.map(function (e, i) {
        return new Split({
          id: i,
          floating: false,
          size: 100.0 / count
        });
      });
    }
  };

  var _useState = React.useState(distributeSplits()),
      split = _useState[0],
      setSplit = _useState[1];

  var _useState2 = React.useState(false),
      isEmpty = _useState2[0],
      setEmpty = _useState2[1];

  var wrapperElement = React.useRef(null);

  var _useState3 = React.useState(props.vertical || !props.horizontal),
      isVertical = _useState3[0],
      setIsVertical = _useState3[1];

  var handleContainerResize = function handleContainerResize(e) {
    if (props.auto) {
      var bounds = wrapperElement.current.getBoundingClientRect();
      setIsVertical(bounds.width < bounds.height);
    }
  };

  useObserver(handleContainerResize, wrapperElement, [props.auto, isVertical]);

  var handlePanelResize = function handlePanelResize(e, i) {
    function handleMove(e) {
      if (e.pageX) {
        var pBounds = wrapperElement.current.getBoundingClientRect();
        var s;

        if (isVertical) {
          s = (e.pageY - pBounds.y) / pBounds.height;
        } else {
          s = (e.pageX - pBounds.x) / pBounds.width;
        }

        var splitSum = i > 0 ? split.slice(0, i).filter(function (s) {
          return !s.floating;
        }).reduce(function (a, b) {
          return a + b.size;
        }, 0) : 0;
        split[i].size = s * 100 - splitSum;
        if (split[i].size > 100) split[i].size = 100;
        if (split[i].size < 0) split[i].size = 0;
        setSplit([].concat(split));
      }
    }

    function handleMoveEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];

      if (e.pageX) {
        var pBounds = wrapperElement.current.getBoundingClientRect();
        var s;

        if (isVertical) {
          s = (e.pageY - pBounds.y) / pBounds.height;
        } else {
          s = (e.pageX - pBounds.x) / pBounds.width;
        }

        var splitSum = i > 0 ? split.slice(0, i).filter(function (s) {
          return !s.floating;
        }).reduce(function (a, b) {
          return a + b.size;
        }, 0) : 0;
        split[i].size = s * 100 - splitSum;
        if (split[i].size > 100) split[i].size = 100;
        if (split[i].size < 0) split[i].size = 0;
        setSplit([].concat(split));
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

  var handleDetach = function handleDetach(i, detachBool) {
    if (i === split.length) return;
    split[i].floating = detachBool;
    setSplit([].concat(split));
  };

  React.useLayoutEffect(function (e) {
    setSplit(distributeSplits());
  }, [props.children.length, props.updateFlag]);
  React.useEffect(function (e) {
    if (!split.filter(function (s) {
      return !s.floating;
    }).length && !isEmpty) {
      setEmpty(true);
      if (props.onEmpty) props.onEmpty(true);
    }

    if (isEmpty) {
      setEmpty(false);
      if (props.onEmpty) props.onEmpty(false);
    }
  }, [split]);
  var wrapperClass = classNames(styles$6.wrapper, (_classNames = {}, _classNames[styles$6.vertical] = isVertical, _classNames[styles$6.horizontal] = !isVertical, _classNames[styles$6.empty] = isEmpty, _classNames));
  return /*#__PURE__*/React__default.createElement("div", {
    className: wrapperClass,
    ref: wrapperElement,
    style: {
      backgroundColor: context.tertiary_color
    }
  }, props.children && React__default.Children.map(props.children, function (child, i) {
    var _classNames2, _classNames3, _classNames4, _classNames5, _classNames6;

    var isSplit = child.type.name === 'SplitContainer';
    if (props.children.length === 1) return /*#__PURE__*/React__default.createElement("div", {
      style: isVertical ? {
        height: '100%'
      } : {
        width: '100%'
      },
      className: classNames((_classNames2 = {}, _classNames2[styles$6.split_container] = isSplit, _classNames2[styles$6.panel_container] = !isSplit, _classNames2))
    }, child);
    var hasHandle = i < props.children.length - 1;
    var w;

    if (i < props.children.length - 1) {
      w = split[i] ? split[i].size : 0;
      w = split[i].floating ? 0 : w;
      if (split[i].floating) hasHandle = false;
    } else {
      if (split[i] && split[i].floating) {
        hasHandle = false;
        w = 0;
      } else {
        w = 100 - split.slice(0, -1).filter(function (s) {
          return !s.floating;
        }).reduce(function (a, b) {
          return a + b.size;
        }, 0);
      }
    }

    if (split[i + 1] && split[i + 1].floating && i === split.length - 2) {
      w = 100 - split.slice(0, i).filter(function (s) {
        return !s.floating;
      }).reduce(function (a, b) {
        return a + b.size;
      }, 0);
    }

    if (split[i] && !split[i].floating && split.filter(function (s) {
      return !s.floating;
    }).length === 1) {
      w = 100;
      hasHandle = false;
    }

    if (child.props.detachable) {
      child = React__default.cloneElement(child, _extends({}, child.props, {
        onDetach: function onDetach(b) {
          return handleDetach(i, b);
        }
      }));
    }

    if (isSplit) {
      child = React__default.cloneElement(child, _extends({}, child.props, {
        onEmpty: function onEmpty(b) {
          return handleDetach(i, b);
        }
      }));
    }

    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
      style: isVertical ? {
        height: w + '%'
      } : {
        width: w + '%'
      },
      className: classNames(styles$6.panel_content, (_classNames3 = {}, _classNames3[styles$6.split_container] = isSplit, _classNames3[styles$6.panel_container] = !isSplit, _classNames3[styles$6.split_floating] = split[i] ? split[i].floating : false, _classNames3))
    }, child), hasHandle && /*#__PURE__*/React__default.createElement("div", {
      className: classNames(styles$6.drag_container, (_classNames4 = {}, _classNames4[styles$6.vertical] = isVertical, _classNames4[styles$6.horizontal] = !isVertical, _classNames4))
    }, /*#__PURE__*/React__default.createElement("div", {
      className: classNames(styles$6.drag_handle_visible, (_classNames5 = {}, _classNames5[styles$6.vertical] = isVertical, _classNames5[styles$6.horizontal] = !isVertical, _classNames5)),
      style: {
        borderColor: context.accent_color
      },
      onTouchStart: function onTouchStart(e) {
        return handlePanelResize(e, i);
      },
      onMouseDown: function onMouseDown(e) {
        return handlePanelResize(e, i);
      }
    }, /*#__PURE__*/React__default.createElement("div", {
      className: classNames(styles$6.drag_handle, (_classNames6 = {}, _classNames6[styles$6.vertical] = isVertical, _classNames6[styles$6.horizontal] = !isVertical, _classNames6)),
      style: {
        borderColor: context.outline_color
      }
    }))));
  }), props.children.length === 0 && /*#__PURE__*/React__default.createElement("p", {
    style: {
      alignSelf: 'center',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React__default.createElement("small", null, "no panel in split!")));
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

var LayoutContainer = mobxReact.observer(function (props) {
  var _classNames4;

  var context = React.useContext(UIContext).theme;
  var ui = React.useContext(UIContext);
  var isVertical = props.layout.direction === 'VERTICAL';
  var isEmpty = props.layout.isEmpty;
  var wrapperElement = React.useRef(null);

  var handleResize = function handleResize(e, layout) {
    function handleMove(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageX) {
        var bounds = wrapperElement.current.getBoundingClientRect();
        var pos;

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
        var bounds = wrapperElement.current.getBoundingClientRect();
        var pos;

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

  var handleContextMenu = function handleContextMenu(e, layout) {
    var result = {};
    Object.values(ui.panelVariants).forEach(function (panel) {
      var _extends2;

      result = _extends({}, result, (_extends2 = {}, _extends2[panel.id] = {
        id: panel.id,
        label: panel.title,
        onClick: function onClick() {
          props.layout.addPanel(panel, layout);
        }
      }, _extends2));
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

  var handlePanelSelect = function handlePanelSelect(e, sibling) {
    sibling.setPanel(e.target.value);
  };

  var handlePanelRemove = function handlePanelRemove(layout) {
    props.layout.removePanel(layout);
  };

  var generateLayout = function generateLayout() {
    var elements = [];
    elements = props.layout.children.map(function (sibling, i) {
      var _classNames, _classNames2, _classNames3;

      var siblings = props.layout.children;
      var childIsLayout = sibling.children.length;
      var hasHandle = i < props.layout.children.length - 1;
      var size = 0;

      var filterOutFloats = function filterOutFloats(s) {
        return !s.panel || s.panel && !s.panel.floating;
      };

      var isEmpty = function isEmpty(layout) {
        return layout.children.length && layout.children.filter(filterOutFloats).length === 0;
      };

      var isFloating = function isFloating(layout) {
        return isEmpty(layout) || layout.panel && layout.panel.floating;
      };

      if (isFloating(sibling)) {
        console.log(sibling.id + ' is floating');
        hasHandle = false;
        size = 0;
      } else {
        size = sibling.size;

        for (var j = i - 1; j >= 0; j--) {
          if (isFloating(siblings[j])) {
            size += siblings[j].size;
          } else {
            break;
          }
        }

        var tSum = 0;

        for (var _j = i + 1; _j < siblings.length; _j++) {
          if (isFloating(siblings[_j])) {
            tSum += siblings[_j].size;
            if (_j === siblings.length - 1) size += tSum;
          } else {
            break;
          }
        }
      }

      size *= 100;
      return /*#__PURE__*/React__default.createElement(React__default.Fragment, {
        key: sibling.id
      }, /*#__PURE__*/React__default.createElement("div", {
        style: isVertical ? {
          height: size + '%'
        } : {
          width: size + '%'
        },
        className: classNames(styles$7.panel_content, (_classNames = {}, _classNames[styles$7.layout_container] = childIsLayout, _classNames[styles$7.panel_container] = !childIsLayout, _classNames[styles$7.float_container] = isFloating(sibling), _classNames))
      }, /*#__PURE__*/React__default.createElement("div", {
        className: styles$7.debug
      }, size), sibling.children.length ? /*#__PURE__*/React__default.createElement(LayoutContainer, {
        layout: sibling
      }, props.children) : /*#__PURE__*/React__default.createElement(GenericPanel, {
        panel: sibling.panel,
        onPanelSelect: function onPanelSelect(e) {
          return handlePanelSelect(e, sibling);
        },
        onRemove: function onRemove() {
          return handlePanelRemove(sibling);
        }
      }, props.children.filter(function (child) {
        if (child.props.panel) {
          return child.props.panel.id === sibling.panel.id;
        }
      }))), hasHandle && /*#__PURE__*/React__default.createElement("div", {
        onContextMenu: function onContextMenu(e) {
          return handleContextMenu(e, sibling);
        },
        className: classNames(styles$7.drag_container, (_classNames2 = {}, _classNames2[styles$7.vertical] = isVertical, _classNames2[styles$7.horizontal] = !isVertical, _classNames2)),
        onTouchStart: function onTouchStart(e) {
          return handleResize(e, sibling);
        },
        onMouseDown: function onMouseDown(e) {
          return handleResize(e, sibling);
        }
      }, /*#__PURE__*/React__default.createElement("div", {
        className: classNames(styles$7.drag_handle, (_classNames3 = {}, _classNames3[styles$7.vertical] = isVertical, _classNames3[styles$7.horizontal] = !isVertical, _classNames3)),
        style: {
          backgroundColor: context.accent_color,
          borderColor: context.primary_color
        }
      })));
    });
    return elements;
  };

  return /*#__PURE__*/React__default.createElement("div", {
    ref: wrapperElement,
    style: {
      backgroundColor: context.tertiary_color
    },
    className: classNames(styles$7.wrapper, (_classNames4 = {}, _classNames4[styles$7.vertical] = isVertical, _classNames4[styles$7.horizontal] = !isVertical, _classNames4[styles$7.empty] = isEmpty, _classNames4))
  }, generateLayout());
});
LayoutContainer.defaultProps = {
  size: 100,
  order: 0
};
LayoutContainer.propTypes = {};

var styles$8 = {"wrapper":"_PagesContainer-module__wrapper__3YMIz","pagecontent":"_PagesContainer-module__pagecontent__2QZA5","pagenav":"_PagesContainer-module__pagenav__1nlPP"};

var Pages = function Pages(props) {
  var _useState = React.useState(0),
      currentPage = _useState[0],
      setCurrentPage = _useState[1];

  var context = React.useContext(UIContext).theme;

  var handlePreviousPage = function handlePreviousPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  var handleNextPage = function handleNextPage() {
    if (currentPage + 1 < props.children.length) setCurrentPage(currentPage + 1);
  };

  var buttonStyle = {
    backgroundColor: context.secondary_color,
    color: context.text_color
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$8.wrapper,
    style: props.style
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$8.pagecontent
  }, props.children[currentPage]), /*#__PURE__*/React__default.createElement("div", {
    className: styles$8.pagenav
  }, /*#__PURE__*/React__default.createElement("button", {
    style: buttonStyle,
    onClick: handlePreviousPage
  }, '<'), /*#__PURE__*/React__default.createElement("button", {
    style: buttonStyle,
    onClick: handleNextPage
  }, '>'), /*#__PURE__*/React__default.createElement("span", null, currentPage + 1 + " of " + props.children.length)));
};

var styles$9 = {"wrapper":"_InputBool-module__wrapper__38eCI","wrapper_inner":"_InputBool-module__wrapper_inner__2obra"};

var InputBool = mobxReact.observer(function (props) {
  var context = React.useContext(UIContext).theme;

  var updateValue = function updateValue(e) {
    return props.onChange(e.target.checked, e.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.wrapper,
    style: _extends({}, props.style, {
      backgroundColor: props.focused ? context.accent_color : context.secondary_color,
      flexFlow: props.hLabel && props.label ? 'row' : 'column'
    })
  }, props.label && /*#__PURE__*/React__default.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React__default.createElement("div", {
    className: styles$9.wrapper_inner
  }, /*#__PURE__*/React__default.createElement("input", {
    style: props.style,
    type: "checkbox",
    value: props.value,
    checked: props.checked,
    onChange: updateValue,
    onContextMenu: props.onContextMenu
  })));
});

var styles$a = {"wrapper":"_InputFloat-module__wrapper__2vWWU","wrapper_inner":"_InputFloat-module__wrapper_inner__1KItv","dragOverlay":"_InputFloat-module__dragOverlay__2-zBM"};

var position = [0, 0];
var base_value = 0;
var InputFloat = mobxReact.observer(function (props) {
  var context = React.useContext(UIContext).theme;

  var handleChange = function handleChange(e) {
    return props.onChange(Number(e.target.value));
  };

  var handleDragStart = function handleDragStart(e) {
    var dragging = false;

    function handleDrag(e) {
      e.preventDefault();
      dragging = true;

      if (e.pageY) {
        var scalar = e.ctrlKey ? 100 : e.shiftKey ? 20000 : 1000;
        var x_offset = e.pageX - position[0];
        var y_offset = position[1] - e.pageY;
        x_offset = Math.min(Math.max(x_offset, 1), 100);
        var output_value = base_value + y_offset * x_offset / scalar;

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
        var scalar = e.ctrlKey ? 100 : e.shiftKey ? 20000 : 1000;
        var x_offset = e.pageX - position[0];
        var y_offset = position[1] - e.pageY;
        x_offset = Math.min(Math.max(x_offset, 1), 100);
        var output_value = base_value + y_offset * x_offset / scalar;

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

  var value = parseFloat(props.value).toFixed(2);
  var defaultInputStyle = {
    backgroundColor: context.secondary_color,
    color: context.text_color
  };
  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$a.wrapper,
    style: _extends({}, props.style, {
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    })
  }, props.label && /*#__PURE__*/React__default.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React__default.createElement("div", {
    className: styles$a.wrapper_inner
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "number",
    step: props.step,
    value: Number(value),
    onChange: handleChange,
    onClick: props.onClick,
    onTouchStart: handleDragStart,
    onMouseDown: handleDragStart,
    onDoubleClick: props.onDoubleClick,
    onContextMenu: props.onContextMenu,
    style: _extends({}, defaultInputStyle, props.inputStyle)
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

var InputSelect = function InputSelect(props) {
  var context = React.useContext(UIContext).theme;

  var handleChange = function handleChange(e) {
    return props.onChange(e.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$b.wrapper,
    style: _extends({}, props.style, {
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    })
  }, props.label && /*#__PURE__*/React__default.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React__default.createElement("div", {
    className: styles$b.wrapper_inner
  }, /*#__PURE__*/React__default.createElement("select", {
    defaultValue: props.selectedOption,
    onChange: handleChange,
    onContextMenu: props.onContextMenu,
    style: {
      backgroundColor: context.secondary_color,
      color: context.text_color
    }
  }, props.options.map(function (opt, i) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: i,
      value: opt.value
    }, opt.label);
  }))));
};

var styles$c = {"wrapper":"_InputSlider-module__wrapper__3sg2E","slider_track":"_InputSlider-module__slider_track__1S-tO","handle":"_InputSlider-module__handle__BhBAn","vertical":"_InputSlider-module__vertical__2cOVj","horizontal":"_InputSlider-module__horizontal__MEKW8","sleeve":"_InputSlider-module__sleeve__3EORW"};

var slider_bounds = null;

var InputSlider = function InputSlider(props) {
  var context = React.useContext(UIContext).theme;
  var slider_element = React.useRef(null);

  var handleDragStart = function handleDragStart(e) {
    function handleDrag(e) {
      if (e.touches) e = e.touches[0];

      if (e.pageY) {
        var _x = e.pageX + 2;

        var _position = (_x - slider_bounds.x) / slider_bounds.width;

        var _value = _position * (props.max - props.min) + props.min;

        if (_position <= 0.0) _value = props.min;
        if (_position >= 1.0) _value = props.max;
        props.onChange(Math.floor(_value / props.step) * props.step);
      }
    }

    function handleDragEnd(e) {
      if (e.touches && e.touches[0]) e = e.touches[0];
      var x = e.pageX + 2;
      var position = (x - slider_bounds.x) / slider_bounds.width;
      var value = position * (props.max - props.min) + props.min;

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
    var x = e.pageX + 2;
    var position = (x - slider_bounds.x) / slider_bounds.width;
    var value = position * (props.max - props.min) + props.min;
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

  var handleFloatDrag = function handleFloatDrag(v) {
    props.onChange(v);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$c.wrapper + ' ' + styles$c.horizontal,
    style: props.style,
    onContextMenu: props.onContextMenu
  }, /*#__PURE__*/React__default.createElement(InputFloat, {
    value: props.value,
    onChange: handleFloatDrag,
    step: props.step || 0.1
  }), /*#__PURE__*/React__default.createElement("div", {
    ref: slider_element,
    className: styles$c.slider_track,
    onTouchStart: handleDragStart,
    onMouseDown: handleDragStart,
    style: {
      backgroundColor: context.secondary_color
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: styles$c.sleeve,
    style: {
      width: (props.value - props.min) / (props.max - props.min) * 100 + '%',
      backgroundColor: context.accent_color
    }
  }), /*#__PURE__*/React__default.createElement("div", {
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

var InputColor = function InputColor(props) {
  var context = React.useContext(UIContext).theme;

  var handleChange = function handleChange(e) {
    return props.onChange(e.target.value);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: styles$d.wrapper,
    style: _extends({}, props.style, {
      backgroundColor: props.focused ? context.accent_color : context.secondary_color
    })
  }, props.label && /*#__PURE__*/React__default.createElement("label", {
    style: {
      backgroundColor: props.focused ? context.accent_color : context.text_color,
      color: context.primary_color
    }
  }, props.label, ":"), /*#__PURE__*/React__default.createElement("div", {
    className: styles$d.wrapper_inner
  }, props.showValue && /*#__PURE__*/React__default.createElement("input", {
    type: "string",
    className: styles$d.textInput,
    value: props.value,
    onChange: handleChange,
    style: {
      backgroundColor: context.text_color,
      color: context.secondary_color
    }
  }), /*#__PURE__*/React__default.createElement("input", {
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

var ContextMenuItem = mobxStateTree.types.model('ContextMenuItem', {
  id: mobxStateTree.types.identifier,
  label: mobxStateTree.types.frozen(),
  buttons: mobxStateTree.types.frozen(),
  dropDown: mobxStateTree.types.map(mobxStateTree.types.late(function () {
    return ContextMenuItem;
  }))
})["volatile"](function (self) {
  return {
    onClick: function onClick() {}
  };
});
var Context = mobxStateTree.types.model('Context', {})["volatile"](function (self) {
  return {
    contextmenu: {},
    keylistener: tinykeys(window, {}),
    keymap: null
  };
}).actions(function (self) {
  return {
    setKeymap: function setKeymap(keymap) {
      if (self.keylistener) self.keylistener();
      self.keymap = keymap;
      self.keylistener = tinykeys(window, self.keymap);
    },
    removeKeymap: function removeKeymap() {
      return self.keylistener();
    },
    setContextmenu: function setContextmenu(c) {
      self.contextmenu = c;
    }
  };
});

var Panel$1 = mobxStateTree.types.model('Panel', {
  id: mobxStateTree.types.identifier,
  component_type: '',
  title: mobxStateTree.types.maybe(mobxStateTree.types.string),
  subtitle: mobxStateTree.types.maybe(mobxStateTree.types.string),
  showTitle: true,
  floating: false,
  fullscreen: false,
  canFloat: false,
  canRemove: false,
  canFullscreen: false,
  dimensions: mobxStateTree.types.array(mobxStateTree.types.number),
  position: mobxStateTree.types.array(mobxStateTree.types.number),
  layout: mobxStateTree.types.maybe(mobxStateTree.types.late(function () {
    return Layout;
  }))
})["volatile"](function (self) {
  return {
    parent_layout: null
  };
}).actions(function (self) {
  return {
    setLayout: function setLayout(layout) {
      self.layout = layout;
    },
    setFloating: function setFloating(f) {
      self.floating = f;
    },
    toggleFloating: function toggleFloating() {
      self.floating = !self.floating;
    },
    toggleFullscreen: function toggleFullscreen() {
      self.fullscreen = !self.fullscreen;
    },
    setPosition: function setPosition(p) {
      if (p[1] < 24) p[1] = 24;
      self.position = p;
      if (p[0] + self.dimensions[0] > window.innerWidth) self.position[0] = window.innerWidth - self.dimensions[0];
      if (p[1] + self.dimensions[1] > window.innerHeight) self.position[1] = window.innerHeight - self.dimensions[1];
    },
    setDimensions: function setDimensions(d) {
      self.dimensions = d;
      if (d[0] + self.position[0] > window.innerWidth) self.dimensions[0] = window.innerWidth - self.position[0];
      if (d[1] + self.position[1] > window.innerHeight) self.dimensions[1] = window.innerHeight - self.position[1];
    },
    setFullscreen: function setFullscreen(f) {
      self.fullscreen = f;
    },
    onRemove: function onRemove() {
      self.parent_layout = mobxStateTree.getParent(self, 2);
      self.parent_layout.removePanel(self);
    },
    center: function center() {
      self.position[0] = window.innerWidth / 2 - self.dimensions[0] / 2;
      self.position[1] = window.innerHeight / 2 - self.dimensions[1] / 2;
    },
    fitScreen: function fitScreen() {
      if (self.position[0] <= 0) self.position[0] = 0;
      if (self.position[1] <= 0) self.position[1] = 0;
    }
  };
});

var Layout = mobxStateTree.types.model('Layout', {
  id: mobxStateTree.types.identifier,
  title: 'Layout',
  size: 0,
  panel: mobxStateTree.types.maybe(Panel$1),
  children: mobxStateTree.types.array(mobxStateTree.types.late(function () {
    return Layout;
  })),
  direction: mobxStateTree.types.optional(mobxStateTree.types.enumeration(['VERTICAL', 'HORIZONTAL']), 'HORIZONTAL')
}).views(function (self) {
  return {
    get isEmpty() {
      var result = self.children.length && self.children.filter(function (s) {
        return !s.panel && !s.isEmpty || s.panel && !s.panel.floating;
      }).length === 0;
      return result;
    }

  };
})["volatile"](function (self) {
  return {
    siblings: null,
    rootStore: null
  };
}).actions(function (self) {
  return {
    afterAttach: function afterAttach() {
      self.siblings = mobxStateTree.getParent(self);
      self.rootStore = mobxStateTree.getRoot(self);
    },
    adjust: function adjust(position) {
      var selfIndex = self.siblings.indexOf(self);
      var sum = 0;

      for (var i = 0; i < selfIndex; i++) {
        sum += self.siblings[i].size;
      }

      var previousSize = self.size;
      var adjustedSize = position - sum;
      self.setSize(adjustedSize);
      var nextSibling = self.siblings[selfIndex + 1];
      nextSibling.setSize(nextSibling.size + (previousSize - adjustedSize));
    },
    distributeChildren: function distributeChildren() {
      self.children.forEach(function (e, i) {
        console.log(i, (i + 1) / self.children.length);
        e.setSize(1 / self.children.length);
      });
    },
    setSize: function setSize(size) {
      self.size = size;
    },
    setPanel: function setPanel(panelId) {
      var newpanel = _extends({}, self.rootStore.ui.panelVariants[panelId], {
        floating: self.panel.floating,
        dimensions: [].concat(self.panel.dimensions),
        position: [].concat(self.panel.position)
      });

      self.panel = newpanel;
      self.title = self.rootStore.ui.panelVariants[panelId].title;
    },
    addPanel: function addPanel(panel, after) {
      var insertAfter = self.children.indexOf(after);
      self.children.splice(insertAfter + 1, 0, Layout.create({
        id: nanoid.nanoid(),
        panel: panel,
        size: 1 / self.children.length
      }));
      self.distributeChildren();
    },
    removePanel: function removePanel(panel) {
      if (self.children) {
        self.children = self.children.filter(function (child) {
          return child !== panel;
        });

        if (self.children.length === 0) {
          if (mobxStateTree.getParent(self, 2).removePanel) mobxStateTree.getParent(self, 2).removePanel(self);
        }
      }

      self.distributeChildren();
    },
    clear: function clear() {
      if (self.panels && self.children) {
        self.panels.clear();
        self.children = [];
      }
    }
  };
});

var themes = {
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
var Theme = mobxStateTree.types.model("Theme", _extends({}, themes.weyland)).actions(function (self) {
  return {
    setTheme: function setTheme(theme) {
      self.primary_color = theme.primary_color;
      self.secondary_color = theme.secondary_color;
      self.tertiary_color = theme.tertiary_color;
      self.text_color = theme.text_color;
      self.outline_color = theme.outline_color;
      self.accent_color = theme.accent_color;
    },
    setPrimaryColor: function setPrimaryColor(color) {
      return self.primary_color = color;
    },
    setSecondaryColor: function setSecondaryColor(color) {
      return self.secondary_color = color;
    },
    setTertiaryColor: function setTertiaryColor(color) {
      return self.tertiary_color = color;
    },
    setTextColor: function setTextColor(color) {
      return self.text_color = color;
    },
    setOutlineColor: function setOutlineColor(color) {
      return self.outline_color = color;
    },
    setAccentColor: function setAccentColor(color) {
      return self.accent_color = color;
    }
  };
});

var UI = mobxStateTree.types.model('UI', {
  panels: mobxStateTree.types.map(Panel$1),
  theme: Theme,
  context: mobxStateTree.types.maybe(Context)
})["volatile"](function (self) {
  return {
    panelVariants: null,
    layoutVariants: null
  };
}).actions(function (self) {
  return {
    afterAttach: function afterAttach() {
      self.context = Context.create();
    },
    setPanelVariants: function setPanelVariants(panels) {
      self.panelVariants = panels;
    },
    setLayoutVariants: function setLayoutVariants(layouts) {
      self.layoutVariants = layouts;
    },
    getPanelVariant: function getPanelVariant(id) {
      return self.panelVariants[id];
    },
    getLayoutVariant: function getLayoutVariant(id) {
      if (self.layoutVariants[id]) {
        return self.layoutVariants[id];
      } else {
        if (self.panelVariants) {
          console.error("variant (" + id + ") could not be found. should be one of the following: (" + Object.keys(self.panelVariants) + ")");
        } else {
          console.error("no variants found!");
        }
      }
    },
    getPanel: function getPanel(id) {
      return self.panels.get(id);
    }
  };
});

var MacoWrapperComponent = MacoWrapper;
var TextComponent = Text;
var PanelComponent = Panel;
var GenericPanel$1 = GenericPanel;
var ToolbarComponent = Toolbar;
var ContextMenuComponent = ContextMenu;
var ControlGroupComponent = ControlGroup;
var SplitContainer$1 = SplitContainer;
var LayoutContainer$1 = LayoutContainer;
var PagesContainer = Pages;
var InputBool$1 = InputBool;
var InputFloat$1 = InputFloat;
var InputSelect$1 = InputSelect;
var InputSlider$1 = InputSlider;
var InputColor$1 = InputColor;
var UIContext$1 = UIContext;
var Themes = themes;
var ContextStore = Context;
var LayoutStore = Layout;
var PanelStore = Panel$1;
var UIStore = UI;

exports.ContextMenuComponent = ContextMenuComponent;
exports.ContextStore = ContextStore;
exports.ControlGroupComponent = ControlGroupComponent;
exports.GenericPanel = GenericPanel$1;
exports.InputBool = InputBool$1;
exports.InputColor = InputColor$1;
exports.InputFloat = InputFloat$1;
exports.InputSelect = InputSelect$1;
exports.InputSlider = InputSlider$1;
exports.LayoutContainer = LayoutContainer$1;
exports.LayoutStore = LayoutStore;
exports.MacoWrapperComponent = MacoWrapperComponent;
exports.PagesContainer = PagesContainer;
exports.PanelComponent = PanelComponent;
exports.PanelStore = PanelStore;
exports.SplitContainer = SplitContainer$1;
exports.TextComponent = TextComponent;
exports.Themes = Themes;
exports.ToolbarComponent = ToolbarComponent;
exports.UIContext = UIContext$1;
exports.UIStore = UIStore;
//# sourceMappingURL=index.js.map
