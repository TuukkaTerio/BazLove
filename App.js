import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import MessageScreen from './src/screens/MessageScreen';
import ReadMessagesScreen from './src/screens/ReadMessagesScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Message: { screen: MessageScreen },
  ReadMessages: { screen: ReadMessagesScreen },
  Confirmation: { screen: ConfirmationScreen },
});

export default RootNavigator;
