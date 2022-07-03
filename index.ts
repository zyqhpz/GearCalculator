/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Require cycle: node_modules/victory-vendor']);
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);
