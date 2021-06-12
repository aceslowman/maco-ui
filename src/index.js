import _MacoWrapperComponent from './components/MacoWrapperComponent';

import _PanelComponent from './components/PanelComponent';
import { GenericPanel as _GenericPanel} from './components/PanelComponent';
import _TextComponent from './components/TextComponent';
import _ToolbarComponent from './components/ToolbarComponent';
import _ContextMenuComponent from './components/ContextMenuComponent';
import _ControlGroupComponent from './components/ControlGroupComponent';
import _SplitContainer from './components/SplitContainer';
import _LayoutContainer from './components/LayoutContainer';
import _PagesContainer from './components/PagesContainer';

import _InputBool from './components/input/InputBool';
import _InputFloat from './components/input/InputFloat';
import _InputSelect from './components/input/InputSelect';
import _InputSlider from './components/input/InputSlider';
import _InputColor from './components/input/InputColor';

import _ThemeContext from './ThemeContext';

// STORES
import _ContextStore from './stores/Context';
import _LayoutStore from './stores/Layout';
import _PanelStore from './stores/Panel';
import _ThemeStore, { themes } from './stores/Theme';
import _UIStore from './stores/UI';

export let MacoWrapperComponent = _MacoWrapperComponent;

export let TextComponent = _TextComponent;
export let PanelComponent = _PanelComponent;
export let GenericPanel = _GenericPanel;
export let ToolbarComponent = _ToolbarComponent;
export let ContextMenuComponent = _ContextMenuComponent;
export let ControlGroupComponent = _ControlGroupComponent;
export let SplitContainer = _SplitContainer;
export let LayoutContainer = _LayoutContainer;
export let PagesContainer = _PagesContainer;

export let InputBool = _InputBool;
export let InputFloat = _InputFloat;
export let InputSelect = _InputSelect;
export let InputSlider = _InputSlider;
export let InputColor = _InputColor;

export let ThemeContext = _ThemeContext;
export let ThemeStore = _ThemeStore;
export let Themes = themes;

// STORES
export let ContextStore = _ContextStore;
export let LayoutStore = _LayoutStore;
export let PanelStore = _PanelStore;
export let UIStore = _UIStore; // main store output
