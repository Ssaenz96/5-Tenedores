import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native'
import { ListItem } from 'react-native-elements'
import toast, {DURATION} from 'react-native-easy-toast'
import OverlayOneInput from '../../Elements/OverlayOneInput'
import OverlayTwoInputs from '../../Elements/OverlayTwoInputs'
import OverlayThreeInputs from '../../Elements/OverlayThreeInputs'
import Toast from 'react-native-easy-toast';
export default class UpdateUserInfo extends Component {
    constructor (props) {
        super(props);
        this.state = {
            ...props,
            menuItems: [
                {
                    title: 'Cambiar nombre y apellidos',
                    iconType: 'material-community',
                    iconNameRight: 'chevron-right',
                    iconColorRight: '#CCC',
                    iconNameLeft: 'account-circle',
                    iconColorLeft: '#CCC',
                    onPress: () => {
                        this.openOverlay('Nombre y Apellido', 
                                         this.updateUserDisplayName,
                                         props.userInfo.displayName)
                    }
                },
                {
                    title: 'Cambiar email',
                    iconType: 'material-community',
                    iconNameRight: 'chevron-right',
                    iconColorRight: '#CCC',
                    iconNameLeft: 'at',
                    iconColorLeft: '#CCC',
                    onPress: () => {
                        this.openOverlayTwoInputs('Email',
                                                  'Password',
                                                  props.userInfo.email,
                                                  this.updateUserEmail)
                    }
                },
                {
                    title: 'Cambiar contraseña',
                    iconType: 'material-community',
                    iconNameRight: 'chevron-right',
                    iconColorRight: '#CCC',
                    iconNameLeft: 'lock-reset',
                    iconColorLeft: '#CCC',
                    onPress: () => {
                        this.openOverlayThreeInputs('Tu contraseña', 
                                                    'Nueva Contraseña',
                                                    'Repetir Contraseña',
                                                    this.updateUserPassword)
                    }
                },
            ],
            overlayComponent: null
        }
    }

    openOverlay = (placeholder, updateFunction, valueInput) => {
        this.setState({
            overlayComponent: (<OverlayOneInput isVisibleOverlay={true}
                                                placeholder={placeholder}
                                                updateFunction={updateFunction}
                                                valueInput={valueInput} />)
        })
    }

    openOverlayTwoInputs = (placeholderOne, placeholderTwo, valueInputOne, updateFunction) => {
        this.setState({
            overlayComponent: (<OverlayTwoInputs isVisibleOverlay={true}
                                                 placeholderOne={placeholderOne}
                                                 placeholderTwo={placeholderTwo}
                                                 updateFunction={updateFunction}
                                                 isPassword={true}
                                                 valueInputOne={valueInputOne}
                                                 valueInputTwo="" />)
        })
    }

    openOverlayThreeInputs = (placeholderOne, placeholderTwo, placeholderThree, updateFunction) => { 
        this.setState({
            overlayComponent: (<OverlayThreeInputs isVisibleOverlay={true}
                                                   placeholderOne={placeholderOne}
                                                   placeholderTwo={placeholderTwo}
                                                   placeholderThree={placeholderThree}
                                                   valueInputOne=""
                                                   valueInputTwo=""
                                                   valueInputThree="" 
                                                   isPassword={true}
                                                   updateFunction={updateFunction}  />)
        })
    }

    updateUserDisplayName = async (newUserDisplayNade) => {
        if (newUserDisplayNade) {
            this.state.updateUserDisplayName(newUserDisplayNade);
        }
        
        this.setState({
            overlayComponent: null
        });
    }

    updateUserEmail = async (newEmail, password) => {
        const emailOld = this.props.userInfo.email;

        if (emailOld != newEmail && password) {
            this.state.updateUserEmail(newEmail, password)
        }
        this.setState({
            overlayComponent: null
        })
    }

    updateUserPassword = async (currentPassword, newPassword, verifyPassword) => {
        if (currentPassword && newPassword && verifyPassword) {
            if (newPassword === verifyPassword) {
                if (currentPassword === newPassword) {
                    this.refs.toast.show('La nueva contraseña no puede ser igual a la anterior')
                } else {
                    this.state.updateUserPassword(currentPassword, newPassword)
                }
            } else {
                this.refs.toast.show('Verifique las nuevas contraseñas sean iguales')
            }
        } else {
            this.refs.toast.show('Todos los campos son obligatorio')
        }

        this.setState({
            overlayComponent: null
        })
    }

    render() {
        const { overlayComponent, menuItems } = this.state
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
                <Toast ref="toast"
                       position="center"
                       positionValue={0}
                       fadeInDuration={1000}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color: '#fff'}} />
                {overlayComponent}
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