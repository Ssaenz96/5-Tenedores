import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements'

import UserInfo from './UserInfo'

export default class MyAccountUser extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { logout } = this.props;
        return (
            <View style={styles.viewBody}>
                <UserInfo />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody: {
        height: '100%',
        backgroundColor: '#f2f2f2'
    }
})