'use client';

import { Provider } from 'jotai';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <Provider>
        {children}
      </Provider>
    </ReduxProvider>
  );
}
