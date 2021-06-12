import { createContext } from 'react';

import { themes } from "./stores/Theme";

const ThemeContext = createContext(themes.weyland)

export default ThemeContext