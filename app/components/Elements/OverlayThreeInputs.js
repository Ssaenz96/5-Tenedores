import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Overlay, Input, Button, Icon } from 'react-native-elements'

export default class OverlayThreeInputs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props
        }
    }

    onChangeInputOne = inputData => {
        this.setState({
            valueInputOne: inputData
        })
    }

    onChangeInputTwo = inputData => {
        this.setState({
            valueInputTwo: inputData
        })
    }

    onChangeInputThree = inputData => {
        this.setState({
            valueInputThree: inputData
        })
    }
    
    update = () => {
        const newValueOne = this.state.valueInputOne;
        const newValueTwo = this.state.valueInputTwo;
        const newValueThree = this.state.valueInputThree;
        
        this.state.updateFunction(newValueOne, newValueTwo, newValueThree)
        
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
        const { isVisibleOverlay, placeholderOne, placeholderTwo, placeholderThree, valueInputOne, valueInputTwo,  valueInputThree, isPassword, } = this.state;
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
                    <Input placeholder={placeholderOne}
                           containerStyle={styles.inputStyle}
                           onChangeText={(value) => this.onChangeInputOne(value)}
                           isPassword={isPassword}
                           secureTextEntry={isPassword}
                           value={valueInputOne} />
                    <Input placeholder={placeholderTwo}
                           containerStyle={styles.inputStyle}
                           onChangeText={(value) => this.onChangeInputTwo(value)}
                           isPassword={isPassword}
                           secureTextEntry={isPassword}
                           value={valueInputTwo} />
                    <Input placeholder={placeholderThree}
                           containerStyle={styles.inputStyle}
                           onChangeText={(value) => this.onChangeInputThree(value)}
                           isPassword={isPassword}
                           secureTextEntry={isPassword}
                           value={valueInputThree} />
                    <Button title='Actualizar Contraseña'
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