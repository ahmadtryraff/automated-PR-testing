'use client';

import React, { useEffect, useState } from 'react';
import CometChatBuilderApp from '../CometChat/CometChatBuilderApp';
import { BuilderSettingsProvider } from '../CometChat/context/BuilderSettingsContext';
import { setupLocalization } from '../CometChat/utils/utils';

const APP_ID = process.env.NEXT_PUBLIC_COMETCHAT_APP_ID!;
const REGION = process.env.NEXT_PUBLIC_COMETCHAT_REGION!;
const AUTH_KEY = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY!;

const CometChatNoSSR: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initCometChat = async () => {
        try {
          const { CometChatUIKit, UIKitSettingsBuilder } = await import(
            '@cometchat/chat-uikit-react'
          );
          
          const UIKitSettings = new UIKitSettingsBuilder()
            .setAppId(APP_ID)
            .setRegion(REGION)
            .setAuthKey(AUTH_KEY)
            .subscribePresenceForAllUsers()
            .build();
          
          await CometChatUIKit.init(UIKitSettings);
          setupLocalization();
          setIsInitialized(true);
          
          // Get the UID from localStorage (set by login page)
          const uid = localStorage.getItem('cometChatUID');
          if (uid) {
            try {
              const user = await CometChatUIKit.login(uid);
              setIsLoggedIn(true);
            } catch (loginError) {
              // Login failed silently
            }
          }
        } catch (error) {
          // Initialization failed silently
        } finally {
          setIsLoading(false);
        }
      };
      initCometChat();
    }
  }, []);

           if (isLoading) {
           return (
             <div className="flex items-center justify-center h-full w-full bg-gray-50">
               <div className="text-center">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
                 <div className="text-gray-600 font-medium">Connecting to chat...</div>
                 <div className="text-gray-400 text-sm mt-2">Establishing secure connection</div>
               </div>
             </div>
           );
         }

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-lg font-medium mb-2">Chat Initialization Failed</div>
          <div className="text-gray-600">Please refresh the page to try again</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '70vw', height: '80vh' }}>
      <BuilderSettingsProvider>
        <CometChatBuilderApp />
      </BuilderSettingsProvider>
    </div>
  );
};

export default CometChatNoSSR;
