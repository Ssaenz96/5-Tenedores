import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Input, Button, Icon } from 'react-native-elements'

export default class OverlayOneInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        }
    }

    onChangeInput = inputData => {
        this.setState({
            valueInput: inputData
        })
    }
    
    update = () => {
        const newValue = this.state.valueInput;
        
        this.state.updateFunction(newValue);
        
        this.setState({
            isVisibleOverlay: true
        })
    }

    close = () => {
        this.setState({
            isVisibleOverlay: false
        })

        this.state.updateFunction(null)
    }
    render() {
        const { isVisibleOverlay, placeholder, valueInput } = this.state;
        return (
            <Overlay isVisible={isVisibleOverlay}
                    //  width="auto"
                    //  height="auto"
                     fullScreen={true}
                     overlayBackgroundColor='transparent'
                     overlayStyle={styles.overlayStyle} >
                <View style={styles.viewOverlay}>
                    <Icon type='material-community'
                          name='close-circle-outline'
                          color='#b6b6b6'
                          size={30}
                          onPress={() => this.close()}
                          containerStyle={styles.iconContainer}/>
                    <Input placeholder={placeholder}
                           containerStyle={styles.inputStyle}
                           onChangeText={(value) => this.onChangeInput(value)}
                           value={valueInput} />
                    <Button title='Actualizar'
                            buttonStyle={styles.btnUpdate}
                            onPress={() => this.update()} />
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    overlayStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 
    },
    viewOverlay: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 20,
        borderColor: '#00A680',
        borderWidth: 2
    },
    inputStyle: {
        marginBottom: 20
    },
    btnUpdate: {
        backgroundColor: '#00A680'
    },
    iconContainer: {
        position: 'absolute',
        right: 6,
        top: 6
    }
})