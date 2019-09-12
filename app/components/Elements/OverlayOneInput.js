import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Overlay, Input, Button } from 'react-native-elements'

export default class OverlayOneInput extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Overlay isVisible={true}
                    //  width="auto"
                    //  height="auto"
                     fullScreen={true}
                     overlayBackgroundColor='transparent'
                     overlayStyle={styles.overlayStyle} >
                <View style={styles.viewOverlay}>
                    <Input placeholder='Texto Prueba'
                           containerStyle={styles.inputStyle}
                           onChange={(value) => console.log(value)} />
                    <Button title='Actualizar'
                            buttonStyle={styles.btnUpdate} />
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
    }
})