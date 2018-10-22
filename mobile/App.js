import React from 'react';
import { UIManager, AsyncStorage } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

import { store, client } from './src/store';
import { colors } from './src/utils/constants';

import AppNavigation from './src/navigations';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends React.Component {

  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <ActionSheetProvider>
          <ThemeProvider theme={colors}>
            <AppNavigation />
          </ThemeProvider>
        </ActionSheetProvider>
      </ApolloProvider>
    );
  }
}
