import React from 'react';
import t from 'tcomb-form-native';
import formValidation from '../utils/Validation';
import InputTemplate from '../forms/templates/Input'

// Declaración de campos del formulario
export const RegisterStruct = t.struct({
    name:                 t.String,
    email:                formValidation.email,
    password:             formValidation.password,
    passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
    fields: {
        name: {
            template: InputTemplate,
            config: {
                placeholder: 'Nombre(s)',
                iconName: 'account-outline',
                iconType: 'material-community'
            }
        },
        email: {
            template: InputTemplate,
            config: {
                iconType: 'material-community',
                iconName: 'at',
                placeholder: 'ejemplo@mail.com',
            }
        },
        password: {
            template: InputTemplate,
            config: {
                placeholder: '********',
                password: true,
                secureTextEntry: true,
                iconType: 'material-community',
                iconName: 'lock-outline',
            }
        },
        passwordConfirmation: {
            template: InputTemplate,
            config: {
                placeholder: '********',
                password: true,
                secureTextEntry: true,
                iconType: 'material-community',
                iconName: 'lock-reset',
            }
        }
    }
}

