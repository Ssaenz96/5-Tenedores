import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Avatar, Button, Icon } from 'react-native-elements'
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker'
import Toast, { DURATION } from 'react-native-easy-toast'
import UpdateUserInfo from './UpdateUserInfo'

export default class UserInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props,
            userInfo: { }
        }
    }

    componentDidMount = async () => {
        await this.getUserInfo();        
    }

    getUserInfo = () => {
        const user = firebase.auth().currentUser;
        user.providerData.forEach(userInfo => {
            this.setState({
                userInfo
            })
        });
    }

    reauthenticate = currentPassword => {
        const user = firebase.auth().currentUser;
        const credentials = firebase.auth.EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        return user.reauthenticateWithCredential(credentials);
    }

    checkUserAvatar = (photoURL) => {
        return (photoURL) ? photoURL : 'https://api.adorable.io/avatars/285/abott@adorable.io.png';
    }

    updateUserDisplayName = async (newDisplayName) => {
        const update = {
            displayName: newDisplayName
        }
        
        await firebase.auth().currentUser.updateProfile(update);
        
        this.getUserInfo();
    }

    updateUserPassword = async (currentPassword, newPassword) => {
        this.reauthenticate(currentPassword)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updatePassword(newPassword)
                    .then(() => {
                        this.refs.toast.show('Tu contraseña se cambió correctamente', 500, () => {
                            firebase.auth().signOut()
                        })
                    })
                    .catch(err => {
                        this.refs.toast.show('Error de servidor, intentelo mas tarde', 1500)
                    })
            })
            .catch(err => {
                this.refs.toast.show('Tu contraseña es incorrecta', 1500)
            });
    }

    updateUserAvatar = async photoUri => {
        const update = {
            photoURL: photoUri
        }
        
        await firebase.auth().currentUser.updateProfile(update);
        
        this.getUserInfo();
    }

    updateUserEmail = async (newEmail, password) => {
        this.reauthenticate(password)
            .then(() => {
                const user = firebase.auth().currentUser;
                user.updateEmail(newEmail)
                    .then(() => {
                        this.refs.toast.show('Tu Email se cambió correctamente', 1000, () => {
                            firebase.auth().signOut()
                        })
                    })
                    .catch(err => {
                        console.log(error);
                    })
            })
            .catch(err => {
                this.refs.toast.show('Tu contraseña es incorrecta', 1500)
            });
    }

    uploadImage = async (uri, nameImage) => {
        return new Promise((resolve, reject) => {
            let xhr =  new XMLHttpRequest();
            
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response)
                }
            };

            xhr.open("GET", uri);
            xhr.responseType = "blob";
            xhr.send()
        }).then(async resolve => {
            let ref = firebase.storage().ref().child('Avatar/' + nameImage);
            return await ref.put(resolve)
        }).catch(err => {
            this.ref.toast.show("Error al subir la imagen al servidor, intentelo mas tarde", 1500)
        })
    }

    returnUpdateUserInfoComponent = userInfoData => {
        if(userInfoData.hasOwnProperty('uid')) {
            return (
                <UpdateUserInfo userInfo={this.state.userInfo}
                                updateUserDisplayName={this.updateUserDisplayName}
                                updateUserEmail={this.updateUserEmail}
                                updateUserPassword={this.updateUserPassword} />
            )
        }
    }

    changeAvatarUser = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (resultPermission.status === "denied") {
            this.refs.toast.show("Es necesario aceptar los permisos de la galeria")
        } else {
            const image = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true, // 
                aspect: [4,3]
            });
            if (image.cancelled) {
                this.refs.toast.show("Haz cerrado las imagenes", 1500)
            } else {
                const { uid } = this.state.userInfo;
                
                this.uploadImage(image.uri, uid)
                    .then(resolve => {
                        this.refs.toast.show("Avatar actualizado correctamente", 1500);

                        firebase.storage()
                                .ref("Avatar/" + uid)
                                .getDownloadURL()
                                .then(resolve => {
                                    this.updateUserAvatar(resolve)
                                })
                                .catch(err => {
                                    this.refs.toast.show("Error al obtener el avatar del servidor", 1500);
                                })
                    })
                    .catch(err => {
                        this.refs.toast.show("Error al actualizar el avatar, intentelo mas tarde", 1500);
                    })
            }
            
        }
        
    }

    render() {
        const { displayName, email, photoURL } = this.state.userInfo;
        return (
            <View style={styles.container}>
                <View style={styles.viewUserInfo}>
                    <Avatar size='large'
                            rounded
                            source={{
                                uri: this.checkUserAvatar(photoURL)
                            }}
                            containerStyle={styles.avatarUserInfo}
                            showEditButton
                            onEditPress={ () => this.changeAvatarUser() } />
                    <View>
                        <Text style={styles.textDisplayNameUserInfo}>{displayName}</Text>
                        <Text>{email}</Text>
                    </View>
                </View>
                {this.returnUpdateUserInfoComponent(this.state.userInfo)}
                <Button buttonStyle={styles.logout}
                        iconRight
                        title="Cerrar Sesión"
                        onPress={() => {firebase.auth().signOut()}}
                        />
                <Toast ref='toast'
                       position='bottom'
                       positionValue={250}
                       fadeInDuration={1000}
                       fadeOutDuration={1000}
                       opacity={0.8}
                       textStyle={{color: '#fff'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2'
    },
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
    },
    logout: {
        marginTop: 40,
        marginBottom:20,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#00A680',
    }
})