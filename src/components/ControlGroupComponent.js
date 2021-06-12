import React, { useContext } from 'react';
import styles from './ControlGroupComponent.module.css';
import ThemeContext from '../ThemeContext';

const ControlGroup = (props) => {
    const context = useContext(ThemeContext);

    return (
        <div className={styles.wrapper}>
            <fieldset
                style={{
                    borderColor: context.outline_color
                }}
            >                
                {props.name && (
                    <legend
                        style={{ 
                            padding: '2px 4px',
                            backgroundColor: context.text_color,
                            color: context.primary_color
                        }}
                    >
                        <strong>{props.name}</strong>
                    </legend>  
                )}
                                  
                <div>
                    {React.Children.map(props.children,(child)=>{
                        let input_width = 100.0;

                        if(props.children.length) {
                            input_width = 100.0 / props.children.length;
                        }
                        
                        if (React.isValidElement(child)) {
                            return React.cloneElement(child, { style: {width:`${input_width}%`} })
                        }

                        return child;
                    })}
                </div>                    
            </fieldset>  
        </div>          
    );
}

export default ControlGroup;