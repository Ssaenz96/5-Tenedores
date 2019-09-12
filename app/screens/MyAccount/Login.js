import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Button, SocialIcon, Divider, Icon } from 'react-native-elements'
import Toaste, { DURATION } from 'react-native-easy-toast'
import t from 'tcomb-form-native';
import { LoginOptions, LoginStruct } from '../../forms/Login'
import * as firebase from 'firebase';
import { FacebookAPI } from '../../utils/Social'
import Toast from 'react-native-easy-toast';
import * as Facebook from 'expo-facebook';
const Form = t.form.Form;

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            loginStruct: LoginStruct,
            loginOptions: LoginOptions,
            loginData: {
                email: '',
                password: ''
            },
            formErrorMessage: ''
        }
    }

    login = () => {
        const validate = this.refs.loginForm.getValue();
        if (validate) {
            this.setState({
                formErrorMessage: ''
            });
            firebase.auth()
                    .signInWithEmailAndPassword(validate.email, validate.password)
                    .then(() => {
                        this.refs.toastLogin.show('Login Correcto', 2000, () => {
                            this.props.navigation.goBack();
                        });
                    })
                    .catch(error => {
                        console.log('Login Incorrecto')
                        this.refs.toastLogin.show('Login Incorrecto', 2000);
                    })
        } else {
            this.setState({
                formErrorMessage: 'Formulario incorrecto'
            })
        }
    }

    loginFacebook = async () => {
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(FacebookAPI.applicationId,
                                                                             {permissions: FacebookAPI.permissions})
        if (type == 'success') {
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            firebase.auth()
                    .signInWithCredential(credentials)
                    .then(() => {
                        this.refs.toastLogin.show('Login correcto', 100, () => {
                            this.props.navigation.goBack();
                        })  
                    })
                    .catch(error => {
                        console.log(error)
                        this.refs.toastLogin.show('Error accediendo con Facebook, intentelo mas tarde')
                    })
        } else if (type == 'cancel') {
            this.refs.toastLogin.show('Inicio de sesión cancelada', 300)
        } else {
            this.refs.toastLogin.show('Error desconocido, intentelo mas tarde')
        }
    }

    goToScreen = (nameScreen) => {
        this.props.navigation.navigate(nameScreen)
    }

    onChangeFormLogin = (formValue) => {
        this.setState({
            loginData: formValue
        })
    }

    render () {
        const { loginStruct, loginOptions, formErrorMessage } = this.state;

        return (
            <View style={styles.viewBody}>
                <Image source={require('../../../assets/img/5-tenedores-letras-icono-logo.png')}
                       style={styles.imageStyle}
                       PlaceholderContent={
                           <ActivityIndicator />
                       }
                       containerStyle={styles.containerLogo}
                       resizeMode='contain'/>
                <View style={styles.viewForm}>
                    <Form ref='loginForm'
                          type={loginStruct}
                          options={loginOptions}
                          value={this.state.loginData}
                          onChange={formValue => this.onChangeFormLogin(formValue)}/>
                    <Button title='Login'
                            onPress={() => this.login()}
                            // onChange
                            buttonStyle={styles.loginButton}/>
                    <Text style={styles.textRegister}>¿Aún no tienes cuenta?{' '}
                        <Text style={styles.btnRegister}
                              onPress={() => this.goToScreen('Register')}>
                            Registrate
                        </Text>
                    </Text>
                    <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
                </View>
                <Divider style={styles.divider}/>
                <SocialIcon title='Iniciar con Facebook'
                            button
                            type='facebook'
                            onPress={() => this.loginFacebook()}/>
                <Toast ref='toastLogin'
                       position='bottom'
                       positionValue={300}
                       fadeInDuration={1000}
                       fadeOutDuration={100}
                       opacity={0.8}
                       textStyle={{
                           color: '#fff'
                       }}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        // alignItems: 'center'
    },
    containerLogo: {
        alignItems: 'center'
    },
    viewForm: {
        marginTop: 20
    },
    imageStyle: {
        width: 300,
        height: 150,
        marginBottom: 30,
        // backgroundColor: '#000'
    },
    loginButton: {
        backgroundColor: '#00A680',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10
    },
    formErrorMessage: {
        color: '#F00',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    divider: {
        backgroundColor: '#00A680',
        marginBottom: 20
    },
    textRegister: {
        marginTop: 20,
        marginRight: 10,
        marginLeft: 10
    },
    btnRegister: {
        fontWeight: 'bold',
        color: '#00A680'
    }
})