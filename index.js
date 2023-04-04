/**
 * @format
 */
import 'intl-pluralrules';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {AppHeadlessCheck} from '@app/app';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppHeadlessCheck);
