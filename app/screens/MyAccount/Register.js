import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RegisterStruct, RegisterOptions } from '../../forms/Register';
import { Button, Text } from 'react-native-elements';
import Toast, { DURATION } from 'react-native-easy-toast'
import t from 'tcomb-form-native';
import * as firebase from 'firebase';

const Form = t.form.Form;


export default class Register extends Component {

    constructor() {
        super();

        this.state = {
            registerStruct:  RegisterStruct,
            registerOptions: RegisterOptions,
            formData: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            },
            formErrorMessage: ''
        }
    }

    register = () => {
        const { password, passwordConfirmation } = this.state.formData;
        
        if (password === passwordConfirmation) {
            const validate = this.refs.registerForm.getValue();
            
            if (validate) {
                this.setState({
                    formErrorMessage: ''
                })
                firebase.auth()
                        .createUserWithEmailAndPassword(validate.email, validate.password)
                        .then(resolve => {
                            this.refs.toast.show('Registro Correcto', 200, () => {
                                this.props.navigation.goBack();
                            })
                        })
                        .catch(error => {
                            this.refs.toast.show('El email ya esta en uso', 2500);
                        })
            } else {
                this.setState({
                    formErrorMessage: 'Formulario Invalido'
                })
            }
        } else {
            this.setState({
                formErrorMessage: 'Las contraseñas no son iguales'
            })
        }
    }

    onChangeFormRegister = (formValue) => {
        this.setState({
            formData: formValue
        })
    }

    render() {
        const { registerStruct, registerOptions, formErrorMessage } = this.state;

        return (
            <View style={styles.viewBody}>
                <Form ref='registerForm'
                      type={registerStruct}
                      options={registerOptions} 
                      value={this.state.formData}
                      onChange={formValue => this.onChangeFormRegister(formValue)}/>
                <Button title='Unirse'
                        onPress={() => this.register()}
                        // onChange={(formValue) => this.onChangeFormRegister(formValue)}
                        buttonStyle={styles.buttonRegister}/>
                <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
                <Toast ref='toast'
                       position='bottom'
                       positionValue={200}
                       fadeInDuration={750}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{
                           color: '#fff'
                       }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 40,
        marginRight: 40
    },
    buttonRegister: {
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