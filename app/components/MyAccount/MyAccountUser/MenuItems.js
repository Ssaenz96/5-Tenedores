import React from 'react';

export const menuItems = [
    {
        title: 'Cambiar nombre y apellidos',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#CCC',
        iconNameLeft: 'account-circle',
        iconColorLeft: '#CCC',
        onPress: () => {console.log('cambio nombre')}
    },
    {
        title: 'Cambiar email',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#CCC',
        iconNameLeft: 'at',
        iconColorLeft: '#CCC',
        onPress: () => {console.log('cambio email')}
    },
    {
        title: 'Cambiar contraseñña',
        iconType: 'material-community',
        iconNameRight: 'chevron-right',
        iconColorRight: '#CCC',
        iconNameLeft: 'lock-reset',
        iconColorLeft: '#CCC',
        onPress: () => {console.log('cambio contraseña')}
    },
];