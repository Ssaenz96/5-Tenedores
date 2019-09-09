import React from 'react';
import t from 'tcomb-form-native';
import formValidation from '../utils/Validation'
import InputTemplate from '../forms/templates/Input';

export const LoginStruct = t.struct({
    email: formValidation.email,
    password: formValidation.password
});

export const LoginOptions = {
    fields: {
        email: {
            template: InputTemplate,
            config: {
                placeholder: 'Email',
                iconName: 'at',
                iconType: 'material-community'
            }
        },
        password: {
            template: InputTemplate,
            config: {
                placeholder: 'Contraseña',
                password: true,
                secureTextEntry: true,
                iconName: 'lock-outline',
                iconType: 'material-community'
            }
        }
    }
}