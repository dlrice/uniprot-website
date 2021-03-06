import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/components/App';

import store from './app/state/store';

import { addMessage } from './messages/state/messagesActions';

import {
  CHANNEL_NAME,
  MessageTypes,
  SWMessage,
} from './service-worker/cross-env-constants';
import { MessageFormat, MessageLevel } from './messages/types/messagesTypes';

let dateRendered: number;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
  () => {
    dateRendered = Date.now();
  }
);

const MAX_TIME_AUTO_RELOAD = 2 * 1000; // 2 seconds

import(
  /* webpackChunkName: "service-worker-client" */ './service-worker/client'
).then((serviceWorker) => {
  serviceWorker.register({
    onUpdate() {
      // when there is an update to the codebase
      const updatedTime = Date.now() - dateRendered;
      if (updatedTime < MAX_TIME_AUTO_RELOAD) {
        // only reload automatically the page if we know that within reasonable
        // time after page load, to not disrupt the user too much
        window.location.reload();
      } else {
        // otherwise display a message to the user to have them do the reload
        // whenever that is convenient for them
        store.dispatch(
          addMessage({
            id: 'new-version-website',
            content: (
              <>
                A newer version of this website is available.
                <br />
                <button
                  type="button"
                  className="button secondary tiny"
                  onClick={() => window.location.reload()}
                >
                  Refresh page
                </button>
              </>
            ),
            format: MessageFormat.POP_UP,
            level: MessageLevel.INFO,
          })
        );
      }
    },
  });
  // switch commented line if we want to enable/disable service worker
  // if that implies a change from what is currently deployed ( -> if an issue)
  // serviceWorker.unregister();

  interface CustomMessageEvent<T> extends MessageEvent {
    data: T;
  }

  const channel = new BroadcastChannel(CHANNEL_NAME);
  channel.addEventListener(
    'message',
    (message: CustomMessageEvent<SWMessage>) => {
      if (message.data.type === MessageTypes.UPDATED_DATA) {
        // new data available, we decided to not do anything special for now
      }
    }
  );
});
