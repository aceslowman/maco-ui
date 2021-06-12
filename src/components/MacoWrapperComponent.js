import React, { useState, useContext, useRef, useLayoutEffect } from 'react';
import styles from './MacoWrapperComponent.module.css';
import ThemeContext from '../ThemeContext';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {observer} from 'mobx-react';
import ToolbarComponent from './ToolbarComponent';
import ContextMenuComponent from './ContextMenuComponent';

const MacoWrapper = observer((props) => {
	const store = props.store;

	const handleContextMenu = () => {
	  // prevents context menu anywhere that hasn't been
	  // explicitly allowed
	  store.ui.context.setContextmenu(props.contextmenu);
	};

	return (
		<div className={styles.wrapper}>
			<ThemeContext.Provider value={store.ui.theme}>
				<ToolbarComponent items={props.titlebar} />
				<ContextMenuComponent items={store.ui.context.contextmenu} />

				<div 
					style={{
						width:'100%',
						height: '100%',
						position: 'absolute',
						backgroundColor: store.ui.theme.tertiary_color
					}}
					onContextMenu={() => handleContextMenu()}
				></div>

				{props.children}
			</ThemeContext.Provider>
		</div>
	);
});

MacoWrapper.defaultProps = {
	contextmenu: {},
	titlebar: {}
}

export default MacoWrapper;