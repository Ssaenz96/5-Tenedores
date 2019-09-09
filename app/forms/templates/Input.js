import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Icon } from 'react-native-elements'

export default (InputTemplate = locals => {
    return(
        <View style={styles.viewContainer}>
            <Input placeholder={locals.config.placeholder}
                   password={locals.config.password}
                   secureTextEntry={locals.config.secureTextEntry}
                   rightIcon={{
                       name: locals.config.iconName,
                       type: locals.config.iconType,
                       size: 21,
                       color: '#B3B3B3'
                   }}
                   onChangeText={value => locals.onChange(value)}/>
        </View>
    )
});

const styles = StyleSheet.create({
    viewContainer: {
        marginTop: 12,
        marginBottom: 12
    },
    icon: {
        paddingRight: 10
    }
});