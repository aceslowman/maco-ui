import React from 'react'

import {
  TextComponent,
  PagesContainer,
  SplitContainer,
  GenericPanel
} from 'maco-ui'

const SplitPanel = (props) => {
  return (
    <SplitContainer auto>
      <TextComponent>Area number one</TextComponent>
      <TextComponent>Area number two</TextComponent>
    </SplitContainer>
  )
}

export default SplitPanel
