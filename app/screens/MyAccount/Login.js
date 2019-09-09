import React, { Component } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Image, Button } from 'react-native-elements'
import t from 'tcomb-form-native';
import { LoginOptions, LoginStruct } from '../../forms/Login'

const Form = t.form.Form;

export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            loginStruct: LoginStruct,
            loginOptions: LoginOptions,
            formData: {
                email: '',
                password: ''
            },
            formErrorMessage: ''
        }
    }

    login = () => {
        const validate = this.refs.loginForm.getValue();
        if (validate) {
            console.log('todo chidito')
        } else {
            console.log('faltan campos')
        }
    }

    onChangeFormLogin = (formValue) => {
        this.setState({
            formData: formValue
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
                       resizeMode='contain'/>
                <Form ref='loginForm'
                      type={loginStruct}
                      options={loginOptions}
                      value={this.state.formData}
                      onChange={formValue => this.onChangeFormLogin(formValue)}/>
                <Button title='Login'
                        onPress={() => this.login()}
                        // onChange
                        buttonStyle={styles.loginButton}/>
                <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        marginTop: 40,
        // alignItems: 'center'
    },
    imageStyle: {
        width: 300,
        height: 150,
        marginBottom: 30
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
        marginTop: 30
    }
})