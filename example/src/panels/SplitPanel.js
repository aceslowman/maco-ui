import React from 'react';

import {
  TextComponent,
  PagesContainer,
  SplitContainer,
  GenericPanel,
} from 'maco-ui';

const SplitPanel = (props) => {
    return (
        <GenericPanel panel={props.panel}>                  
            <SplitContainer auto>
                <TextComponent>Area number one</TextComponent>                
                <TextComponent>Area number two</TextComponent>
            </SplitContainer>              
        </GenericPanel>
    )
}

export default SplitPanel;