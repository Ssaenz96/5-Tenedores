import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native'
import { ListItem } from 'react-native-elements'
import { menuItems } from './MenuItems'
import OverlayOneInput from '../../Elements/OverlayOneInput'

export default class UpdateUserInfo extends Component {
    constructor () {
        super();

        this.state = {
            menuItems: menuItems
        }
    }

    render() {
        const { menuItems } = this.state;
        return (
            <View style={styles.viewUpdateUserInfo}>
                {
                    menuItems.map((item, index) => (
                        <ListItem key={index}
                                  title={item.title}
                                  leftIcon={{
                                      type: item.iconType,
                                      name: item.iconNameLeft,
                                      color: item.iconColorLeft
                                  }}
                                  rightIcon={{
                                    type: item.iconType,
                                    name: item.iconNameRight,
                                    color: item.iconColorRight
                                  }} 
                                  onPress={item.onPress}
                                  containerStyle={styles.containerListItem}/>
                    ))
                }
                <OverlayOneInput />
            </View>
        )
    } 
}

const styles = StyleSheet.create({
    viewUpdateUserInfo: {
        backgroundColor: '#fff'
    },
    containerListItem: {
        borderBottomWidth: 1,
        borderBottomColor: '#E3E3D3'
    }
})