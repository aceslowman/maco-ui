import React, { useState, useContext, useRef, useLayoutEffect } from 'react';
import styles from './PanelComponent.module.css';
import ThemeContext from '../ThemeContext';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {observer} from 'mobx-react';

const Tooltip = observer((props) => {
	const context = useContext(ThemeContext);
	const [show, setShow] = useState(false);
	const [position, setPosition] = useState([0,0,0,0]);

	const handleToggle = (e) => {		
		let x = e.pageX;
		let y = e.pageY;

		if(x > (window.innerWidth-150))	
			x = e.pageX - 150;		

		if(y > (window.innerHeight-150))
			y = e.pageY - 150;		

		setPosition([x, y]);
		setShow(!show);
	}

	return (
		<div 
			className={styles.tooltip}			
		>
			<div 
				className={styles.tooltip_symbol}
				onClick={(e)=>handleToggle(e)}
			>ℹ</div>
			<div 
				className={styles.tooltip_content}
				style={{
					backgroundColor: context.primary_color,
					border: `1px solid ${context.outline_color}`,					
					display: show ? 'block' : 'none',
					left: position[0],
					top: position[1]
				}}
			>
				{props.content}
			</div>
		</div>
	)
})

const Panel = observer((props) => {
	const context = useContext(ThemeContext);

	const wrapper_element = useRef(null);

	const [expanded, setExpanded] 	  = useState(props.expanded);
	const [focused, setFocused] 	  = useState(props.focused);
	const [hover, setHover]			  = useState(false);

	const handleResize = (e, axis = 'xy') => {

		function handleMove(e) {
			if (e.touches) e = e.touches[0]

			if (e.pageY) {
				const p_bounds = wrapper_element.current.getBoundingClientRect();

				const w = e.pageX - p_bounds.x + 10;
				const h = e.pageY - p_bounds.y + 10;

				switch (axis) {
					case 'xy':
						props.onDimensionsChange([w, h]);
						break;
					case 'x': 
						props.onDimensionsChange([w, props.dimensions[1]]);
						break;
					case 'y':
						props.onDimensionsChange([props.dimensions[0], h]);
						break;
					default:
						break;
				}				
			}
		}

		function handleMoveEnd(e) {
			if (e.touches && e.touches[0]) e = e.touches[0]

			if (e.pageY) {
			  const p_bounds = wrapper_element.current.getBoundingClientRect();

			  const w = e.pageX - p_bounds.x + 10;
				const h = e.pageY - p_bounds.y + 10;

				switch (axis) {
					case 'xy':
						props.onDimensionsChange([w, h]);
						break;
					case 'x': 
						props.onDimensionsChange([w, props.dimensions[1]]);
						break;
					case 'y':
						props.onDimensionsChange([props.dimensions[0], h]);
						break;
					default:
						break;
				}				
			}

			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleMoveEnd);
			document.removeEventListener("touchmove", handleMove);
			document.removeEventListener("touchend", handleMoveEnd);
		}

		if (e.touches && e.touches[0]) e = e.touches[0]

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMoveEnd);
		document.addEventListener("touchmove", handleMove);
		document.addEventListener("touchend", handleMoveEnd);
	}

	const handleMoveStart = (e) => {	
		/*
			there are issues with drag events in firefox that make
			the native 'drag' events less useful for this case. my 
			alternative was to use mouseEvents and create listeners 
			on the document
		*/

		function handleMove(e) {
		  if(e.touches) e = e.touches[0]
			
		  if (e.pageY) {
		    const x = e.pageX - dragOff[0];
		    const y = e.pageY - dragOff[1];

		    // limits to upper left
		    props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0])
		  }
		}

		function handleMoveEnd(e) {
		  if (e.touches && e.touches[0]) e = e.touches[0]

		  if (e.pageY) {
		    const x = e.pageX - dragOff[0];
		    const y = e.pageY - dragOff[1];

		    // limits to upper left
		    props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0])
		  }

		  document.removeEventListener("mousemove", handleMove);
		  document.removeEventListener("mouseup", handleMoveEnd);
		  document.removeEventListener("touchmove", handleMove);
		  document.removeEventListener("touchend", handleMoveEnd);
		}

		// use first touch event if on mobile device
		if (e.touches) e = e.touches[0]

		const p_bounds = wrapper_element.current.getBoundingClientRect();
		let offset = { x: p_bounds.left, y: p_bounds.top };

		let dragOff = [e.pageX - offset.x, e.pageY - offset.y];

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleMoveEnd);
		document.addEventListener("touchmove", handleMove);
		document.addEventListener("touchend", handleMoveEnd);
	}

	const handleCenter = () => {
		if(!props.onPositionChange) return
		const p_bounds = wrapper_element.current.getBoundingClientRect();

		const x = (window.innerWidth/2) - (p_bounds.width/2);
		const y = (window.innerHeight/2) - (p_bounds.height/2);
		
		// limits to upper left
		props.onPositionChange([x >= 0 ? x : 0, y >= 0 ? y : 0])
	}

	const handleFullscreen = () => {
		if (!props.fullscreen) handleCenter()

		props.onFullscreen(!props.fullscreen);
		props.onFloat(props.fullscreen)
	}

	const handleFloat = () => {
		if(props.floating === null) {
			// get current width/height if it hasn't been detached before
			const p_bounds = wrapper_element.current.getBoundingClientRect();
			if (props.onDimensionsChange) props.onDimensionsChange([p_bounds.width, p_bounds.height]);
		}

		if (props.onFloat) props.onFloat(!props.floating);
	}

	/*
		positions the panel on top when hovered over
	*/
	const handleFocus = (e) => {
		setHover(true);
		setFocused(true);
		if(props.onFocus) props.onFocus(e);
	}

	const handleBlur = () => {
		wrapper_element.current.blur();
		setHover(false);
		setFocused(false);
		if(props.onBlur) props.onBlur(false);
	}
	
	let main_styling = {};

	if(props.floating && !props.fullscreen) {
		main_styling = {
			width: props.dimensions[0],
			height: expanded ? props.dimensions[1] : 'min-content',
			left: props.position[0],
			top: props.position[1],		  
		}
	} else if(props.fullscreen) {
		main_styling = {
		  width: '100%',
		  height: '100%',
		  left: 0,
		  top: 0,
		}
	}

	const hasTitle = props.showTitle && (props.title || props.onRemove || props.collapsible || props.floating);
	const borderColor = focused ? context.accent_color : context.outline_color;
	
	let dblClickTitle = null;

	if(props.canFullscreen) {
		dblClickTitle = handleFullscreen;
	} else if(props.collapsible) {
		dblClickTitle = () => setExpanded(!expanded);
	} else if(props.canFloat) {
		dblClickTitle = handleFloat;
	}

	// questionable mix of controlled/uncontrolled
	useLayoutEffect(() => {
		setExpanded(props.expanded);
	}, [props.expanded])

	return (
		<div 	
			ref={wrapper_element}						
			className={classNames(
				styles.panel, 
				{ 
					[styles.fullscreen]: props.fullscreen,
					[styles.floating]: props.floating,
					[styles.collapsed]: !expanded,
				}
			)}
			style={{
				backgroundColor: !props.fullscreen ? context.primary_color : 'transparent',
				color: context.text_color || 'white',
				border: props.border && !props.fullscreen ? '1px solid '+borderColor : 'none',
				height: props.collapsible ? 'auto' : '100%',
				margin: props.gutters ? props.gutterSize : 0,
				zIndex: hover ? 5 : 2,
				...main_styling,
				...props.style
			}}			
			onFocus={handleFocus}
			onBlur={handleBlur}
			onContextMenu={props.onContextMenu}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onMouseOver={props.onMouseOver}
			onMouseOut={props.onMouseOut}
			tabIndex="-1"
		>
			{ hasTitle && (
				<div 
					className={styles.title_bar} 
					style={{
						backgroundColor: context.primary_color || 'black',
						...props.titleStyle
					}}
				>

					{props.canFullscreen && (						 
						<button 
							title="fullscreen"
							onClick={handleFullscreen}
							style={{fontSize:'0.9em'}}
						>
							✳
						</button>					
					)}

					{ props.canRemove && (
						<button 
							title="close" 
							onClick={props.onRemove}
						>
							x
						</button>
					) }

					{ props.canFloat && (
						<button 
							title={props.floating ? "snap" : "float"} 
							onClick={handleFloat}
							style={{fontSize:'0.9em'}}
						>
							{
							  props.floating ? '◧' : '❏'
							}
						</button>
					) }

					{ props.collapsible && (
						<button onClick={()=>setExpanded(!expanded)}>
							{expanded ? '▾' : '▸'}
						</button>
					) }

					<div 
						className={styles.dragContainer}
						
					onDoubleClick={dblClickTitle}
					onClick={props.collapsible && !props.canFullscreen ? () => setExpanded(!expanded) : null}
					>
						{ props.floating && (
							<div 
								className={styles.moveHandle}
								onTouchStart={handleMoveStart}
								onMouseDown={handleMoveStart}							
							></div>
						)}

						<legend> 
							<strong>{props.title}</strong>
						</legend>

					</div>

					<div className={styles.subtitle}>{props.subtitle}</div>
					
					{props.indicators && (
						<div className={styles.indicators}>
							{props.indicators.map((e,i)=>{
								return (
									<div 
										key={i}
										className={styles.indicator}
										title={e.title}
										style={{
											color: context.primary_color,
											backgroundColor: e.color
										}}
									>
										{ e.label }
									</div>
								)
							})}
						</div>		
					)}	

					{props.tooltip && (
						<Tooltip content={props.tooltip}/>		
					)}							
				</div>
			)}
			                    
			{expanded && props.toolbar}

			{expanded && (			
				<div 
					style={{
						borderColor: context.text_color,
						flexBasis: props.fullscreen ? "0px" : "auto"
					}} 					
					className = {
					  classNames(
					    styles.panel_content, {
					      [styles.horizontal]: props.horizontal,
						  [styles.vertical]: props.vertical
					    }
					  )
					}
					ref={props.onRef}
				>
					{props.children}
				</div>
			)}

			{expanded && props.footbar}

			{/* resize handles */}
			{(props.floating && !props.fullscreen && expanded)  && (
				<React.Fragment>
					<div 
						className={`${styles.resizeHandle} ${styles.resizeSE}`}
						onTouchStart={handleResize}
						onMouseDown={handleResize}
						style={{
							borderColor: context.text_color,
						}} 
					></div>
					<div 
						className={`${styles.resizeHandle} ${styles.resizeE}`}
						onTouchStart={(e) => handleResize(e,'x')}
						onMouseDown={(e) => handleResize(e,'x')}
						style={{
							borderColor: context.text_color,
						}} 
					></div>
					<div 
						className={`${styles.resizeHandle} ${styles.resizeS}`}
						onTouchStart={(e) => handleResize(e,'y')}
						onMouseDown={(e) => handleResize(e,'y')}
						style={{
							borderColor: context.text_color,
						}} 
					></div>
				</React.Fragment>				
			)}
		
		</div>
	);
});

Panel.defaultProps = {
	fullscreen: false,
	expanded: true,	
	border: true,
	focused: false,
	floating: false,
	position: [100,100],
	dimensions: [100,100],
	gutterSize: 5,
	showTitle: true,
	onContextMenu: () => {}
}

Panel.propTypes = {
	onRemove: PropTypes.func,
	onFocus: PropTypes.func,
	toolbar: PropTypes.object,
	children: PropTypes.any,
	style: PropTypes.object,

	titleStyle: PropTypes.object,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	indicators: PropTypes.array,

	//tooltip: PropTypes.string

	horizontal: PropTypes.bool,
	vertical: PropTypes.bool,

	collapsible: PropTypes.bool,
	fullscreen: PropTypes.bool,
	floating: PropTypes.bool,
	
	showTitle: PropTypes.bool,

	// adds space around the panel, off by default
	gutters: PropTypes.bool,
	gutterSize: PropTypes.number,

	border: PropTypes.bool,

	onFocus: PropTypes.func,
}

export const GenericPanel = observer(props => (
  <Panel
    uuid={props.panel.id}
	title={props.title ?? props.panel.title}        
	subtitle={props.subtitle ?? props.panel.subtitle}   
	collapsible={props.collapsible ?? props.panel.collapsible} 
	fullscreen={props.panel.fullscreen} 
	canFullscreen={props.panel.canFullscreen}
	floating={props.panel.floating}
	expanded={props.expanded}

	showTitle={props.showTitle ?? props.panel.showTitle}
	
	canFloat={props.panel.canFloat}
    defaultWidth={props.panel.defaultWidth}
    defaultHeight={props.panel.defaultWidth}
    position={props.panel.position}
    dimensions={props.panel.dimensions}
	toolbar={props.toolbar}
	footbar={props.footbar}
	indicators={props.indicators}
	tooltip={props.tooltip}

	onRemove={props.onRemove ?? props.panel.onRemove}
	canRemove={props.canRemove ?? props.panel.canRemove}
	style={props.style}
	
	onContextMenu={props.onContextMenu}
	onContextMenuCapture={props.onContextMenuCapture}
	onFocus={props.onFocus}
	onBlur={props.onBlur}
	onRef={props.onRef}
	onFloat={props.panel.setFloating}
    onPositionChange={props.panel.setPosition}
	onDimensionsChange={props.panel.setDimensions}
	onFullscreen={props.panel.setFullscreen}
  >
    {props.children}
  </Panel>
));

export default Panel;