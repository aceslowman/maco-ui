import React from 'react'
import styles from './TextComponent.module.css'

const Text = (props) => {
  return (
    <div className={styles.text} style={props.style}>
      {props.children}
    </div>
  )
}

export default Text
