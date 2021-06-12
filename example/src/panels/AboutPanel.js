import React from 'react';

import {
  TextComponent,
  PagesContainer,
  GenericPanel,
} from 'maco-ui';

const AboutPanel = (props) => {
    return (
        <GenericPanel panel={props.panel}>                  

                <GenericPanel panel={{id:"0"}}>
                    <PagesContainer>
                        <TextComponent>
                            <p>
                                <strong>maco-ui</strong> is a component library tailored towards easily adjustable user interfaces.
                                It includes the following:
                            </p>      

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul> 

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul> 

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul> 

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul>  
                        </TextComponent>
                        <TextComponent>
                            <p>
                                page 2
                            </p>      

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul>  
                        </TextComponent>
                        <TextComponent>
                            <p>
                                page 3
                            </p>      

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul>  
                        </TextComponent>
                        <TextComponent>
                            <p>
                                page 4
                            </p>      

                            <ul>
                                <li>adjustable split layout</li>
                                <li>resizable and movable panels</li>
                                <li>toolbars with dropdowns</li>
                                <li>custom input elements</li>
                            </ul>  
                        </TextComponent>
                    </PagesContainer>
                    
                </GenericPanel>
              
        </GenericPanel>
    )
}

export default AboutPanel;