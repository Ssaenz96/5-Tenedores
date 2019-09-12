import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import * as firebase from 'firebase'
import UpdateUserInfo from './UpdateUserInfo'

export default class UserInfo extends Component {
    constructor(state) {
        super(state);

        this.state = {
            userInfo: { }
        }
    }
    componentDidMount = async () => {
        await this.getUserInfo()
    }

    getUserInfo = () => {
        const user = firebase.auth().currentUser;
        user.providerData.forEach(userInfo => {
            this.setState({
                userInfo
            })
        });
    }

    checkUserAvatar = (photoURL) => {
        return (photoURL) ? photoURL : 'https://api.adorable.io/avatars/285/abott@adorable.io.png';
    }

    render() {
        const { displayName, email, photoURL } = this.state.userInfo;
        return (
            <View>
                <View style={styles.viewUserInfo}>
                    <Avatar size='large'
                            rounded
                            source={{
                                uri: this.checkUserAvatar(photoURL)
                            }}
                            containerStyle={styles.avatarUserInfo} />
                    <Text style={styles.textDisplayNameUserInfo}>{displayName}</Text>
                    <Text>{email}</Text>
                </View>
                
                <UpdateUserInfo />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewUserInfo: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingTop: 20,
        paddingBottom: 20,
        // backgroundColor: '#f2f2f2'
    },
    avatarUserInfo: {
        marginRight: 20 
    },
    textDisplayNameUserInfo: {
        fontWeight: 'bold'
    }
})