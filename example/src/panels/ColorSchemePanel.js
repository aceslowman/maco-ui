import React, {
  useContext
} from 'react';

import {
  TextComponent,
  InputSelect,
  InputColor,
  ControlGroupComponent,
  Themes,
  GenericPanel,
} from 'maco-ui';

import MainContext from '../MainContext';

const ColorSchemePanel = (props) => {
    const store = useContext(MainContext).store;
    const { theme } = store.ui;

    return (
        < GenericPanel panel = {
          props.panel
        }
tooltip={(
        <React.Fragment>
          <p>
            Here you can combine your effects into a graph of inputs and
            outputs.
          </p>

          <p>Keyboard Shortcuts:</p>

          <ul>
            <li>Arrow keys to navigate</li>
            <li>Delete key to remove selected node</li>
            <li>'B' key to bypass selected node</li>
          </ul>
        </React.Fragment>
      )} >
            <TextComponent>
                <p>
                This library allows for theming through React context.
                </p>
            </TextComponent>

            <ControlGroupComponent>
                <InputSelect
                label="theme name"
                options={[
                    {label: 'weyland', value: 'weyland'},
                    {label: 'yutani', value: 'yutani'},
                    {label: 'powershell', value: 'powershell'},
                    {label: 'sarah', value: 'sarah'},
                ]}
                onChange={(t)=> theme.setTheme(Themes[t]) }
                />
            </ControlGroupComponent>

            <ControlGroupComponent name="color">
                <InputColor 
                // showValue
                label="primary"
                value={theme.primary_color}
                onChange={ v => theme.setPrimaryColor(v) }
                />
                <InputColor 
                // showValue
                label="secondary"
                value={theme.secondary_color}
                onChange={ v => theme.setSecondaryColor(v) }
                />
                <InputColor 
                // showValue
                label="tertiary"
                value={theme.tertiary_color}
                onChange={ v => theme.setTertiaryColor(v) }
                />
                <InputColor 
                // showValue
                label="text"
                value={theme.text_color}
                onChange={ v => theme.setTextColor(v) }
                />
                <InputColor 
                // showValue
                label="accent"
                value={theme.accent_color}
                onChange={ v => theme.setAccentColor(v) }
                />
                <InputColor 
                // showValue
                label="outline"
                value={theme.outline_color}
                onChange={ v => theme.setOutlineColor(v) }
                />
            </ControlGroupComponent>
            </GenericPanel>          
    )
}

export default ColorSchemePanel;