import React from 'react';
import { createAppContainer }       from 'react-navigation';
import { createStackNavigator }     from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'

// Screens
import HomeScreen      from '../screens/Home'
import SearchScreen    from '../screens/Search'
import TopFiveScreen   from '../screens/TopFive'

// MyAccount Screen
import MyAccountScreen from '../screens/MyAccount/MyAccount'
import RegisterScreen from '../screens/MyAccount/Register'
import LoginScreen from '../screens/MyAccount/Login';

const homeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Home'
        })
    }
});

const myAccountStack = createStackNavigator({
    MyAccount: {
        screen: MyAccountScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Mi Cuenta'
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Registro'
        })
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Login'
        })
    }
});

const searchStack = createStackNavigator({
    Search: {
        screen: SearchScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Search'
        })
    }
});

const topFiveStack = createStackNavigator({
    TopFive: {
        screen: TopFiveScreen,
        navigationOptions: ({ navigation }) => ({
            title: 'Top Five'
        })
    }
}); 


const RootStack = createBottomTabNavigator(
    {
        Home: {
            screen: homeStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='compass-outline'
                            type='material-community'
                            size={25}
                            color={tintColor}></Icon>
                )
            })
        },
        TopFive: {
            screen: topFiveStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Top Five',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='star-outline'
                            type='material-community'
                            size={25}
                            color={tintColor}></Icon>
                )
            })
        },
        Search: {
            screen: searchStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Buscar',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='magnify'
                            type='material-community'
                            size={25}
                            color={tintColor}/>
                )

            })
        },
        MyAccount:{
            screen: myAccountStack,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: 'Mi Cuenta',
                tabBarIcon: ({ tintColor }) => (
                    <Icon name='home-outline'
                            type='material-community'
                            size={22}
                            color={tintColor} />
                )
            })
        }
    },
    {
        initialRouteName: 'MyAccount',
        order: ['Search', 'Home', 'MyAccount', 'TopFive'],
        tabBarOptions: {
            inactiveTintColor: '#646464',
            activeTintColor: '#00a680'
        }
    }
);

export default createAppContainer(RootStack);