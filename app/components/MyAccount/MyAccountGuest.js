import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Button, Image } from 'react-native-elements'

export default class MyAccountGuest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { goToScreen } = this.props;

        return (
            <View style={styles.viewBody}>
                <Image source={require('../../../assets/img/image-my-account-guest-01.jpg')}
                       style={styles.image}
                       PlaceholderContent={<ActivityIndicator />}
                       resizeMode='contain'/>
                <Text style={styles.textContent}>Consulta tu perfil de 5 tenedores</Text>
                <Text style={styles.description}>
                    ¿Cómo describirías tu mejor restaurante? Busca y utiliza 
                    los mejores restaurantes de una forma sencilla, vota cual
                    te ha gustado más y comenta como ha sido tu experiencia.
                </Text>
                <Button buttonStyle={styles.btnVerPerfil}
                        title='Ver perfil'
                        onPress={() => goToScreen('Login')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        paddingLeft: 30,
        paddingRight: 30
    },
    image: {
        height: 300,
        marginBottom: 40
    },
    textContent: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 10
    },
    description: {
        textAlign: 'center',
        marginBottom: 20
    },
    btnVerPerfil: {
        width: '100%',
        backgroundColor: '#00A680'
    }
})