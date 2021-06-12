import React, {useState} from 'react';
import {observer} from 'mobx-react'

import {
  PanelComponent,
  ToolbarComponent,
  InputBool,
  InputFloat,
  InputSlider,
  ControlGroupComponent,
  GenericPanel,
} from 'maco-ui';

const InputsPanel = observer((props) => {
    const [floatOne, setFloatOne] = useState(4);
    const [floatTwo, setFloatTwo] = useState(2);
    const [floatThree, setFloatThree] = useState(2);

    return (
        <GenericPanel 
            panel={props.panel}
            subtitle={(
            <InputBool 
                hLabel
                label="bypass"
                // value={node.bypass}  
                // onChange={(e) => node.setBypass(!node.bypass)}
            />
            )}
            toolbar={ 
                <ToolbarComponent 
                    items = {{
                        'one': {
                            id: 'one',
                            label: floatOne, // this updates fine!
                            dropDown: {
                                'one': {
                                    id: 'one',
                                    label: floatOne, // this doesn't!,
                                    dropDown: {
                                        'one': {
                                            id: 'one',
                                            label: floatOne // this doesn't!,
                                        }
                                    }
                                }
                            }
                        }
                    }}
                />
            }
        >

            <PanelComponent 
                title="Vectors" 
                collapsible 
                expanded={true}
                gutters
                subtitle={(
                    <InputBool 
                        hLabel
                        label="bypass"
                        // value={node.bypass}  
                        onChange={(e) => {}}
                    />
                )}
            >
            <ControlGroupComponent name="input group">
                <InputFloat 
                value={floatTwo}
                step={0.1}
                onChange={(value)=>{
                    setFloatTwo(value)
                }}           
                />
                <InputFloat 
                value={floatOne}
                step={1}
                onChange={(value)=>{
                    setFloatOne(value)
                }}           
                />
                <InputFloat 
                value={floatThree}
                step={0.001}
                onChange={(value)=>{
                    setFloatThree(value)
                }}           
                />
                <InputBool
                  // value={node.bypass}  
                  // onChange={(e) => node.setBypass(!node.bypass)}
                />
            </ControlGroupComponent> 
            </PanelComponent>

            <PanelComponent 
            title="Vectors"
            expanded={false} 
            collapsible 
            gutters
            >
            <ControlGroupComponent name="vector2">
                <InputFloat 
                // label="one"
                // value={this.state.float_one}
                // step={1}
                // onDoubleClick={()=>console.log('doubleclick')}
                // inputStyle={{
                //     color: 'green',
                //     backgroundColor: 'orange'
                // }}
                // onChange={(value)=>{
                //     this.setState(prevState=>({
                //     ...prevState,
                //     float_one: value
                //     }))
                // }}           
                />
                <InputFloat 
                // label="two"
                // value={this.state.float_one}
                // step={1}
                // onChange={(value)=>{
                //     this.setState(prevState=>({
                //     ...prevState,
                //     float_one: value
                //     }))
                // }}           
                />
            </ControlGroupComponent>
            <ControlGroupComponent name="vector3">
                <InputFloat 
                label="x"
                // value={this.state.float_one}
                step={1}
                focused
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
                <InputFloat 
                label="y"
                // value={this.state.float_one}
                step={1}
                focused
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
                <InputFloat 
                label="z"
                // value={this.state.float_one}
                step={1}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
            </ControlGroupComponent>
            <ControlGroupComponent name="vector4">
                <InputFloat 
                label="r"
                // value={this.state.float_one}
                step={1}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
                <InputFloat 
                label="g"
                // value={this.state.float_one}
                step={1}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
                <InputFloat 
                label="b"
                // value={this.state.float_one}
                step={1}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
                <InputFloat 
                label="a"
                // value={this.state.float_one}
                step={1}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // float_one: value
                    // }))
                }}           
                />
            </ControlGroupComponent>
            </PanelComponent>

            <PanelComponent 
            title="Panel" 
            gutters 
            collapsible
            expanded={true}
            >
            <ControlGroupComponent name="slider">
                <InputSlider 
                // value={this.state.slider_two}
                // step={1}
                // min={1999}
                // max={2008}
                // onChange={(value)=>{
                //     this.setState(prevState=>({
                //     ...prevState,
                //     slider_two: value
                //     }))
                // }}           
                />
            </ControlGroupComponent>

            <ControlGroupComponent name="slider">
                <InputSlider 
                // value={this.state.slider_one}
                step={0.1}
                min={-2}
                max={100}
                onChange={(value)=>{
                    // this.setState(prevState=>({
                    // ...prevState,
                    // slider_one: value
                    // }))
                }}           
                />
            </ControlGroupComponent>

            <ControlGroupComponent name="color">
                    {/* <InputColor 
                    // value={this.state.color_one}
                    onChange={(value)=>{
                        // this.setState(prevState => ({
                        // ...prevState,
                        // color_one: value
                        // }))
                    }}
                    /> */}
                </ControlGroupComponent>
            </PanelComponent>
                        
        </GenericPanel> 
                
    )
})

export default InputsPanel;