import React from 'react';
import ReactDOM, { Renderer } from 'react-dom';
import { preloadReady } from 'react-loadable';
import { App as AppComponent } from 'ui/App';
import { ConfigProvider } from 'UI/Components/Providers/ConfigProvider';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from './Components/Providers/ApolloProvider';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' });
    console.log('SW registered: ', worker);
  });
}

async function render(renderFunction: Renderer, App: typeof AppComponent) {
  renderFunction(
    <BrowserRouter>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <ApolloProvider>
          <App />
        </ApolloProvider>
      </ConfigProvider>
    </BrowserRouter>,
    document.getElementById('app')
  );
}

preloadReady().then(() => render(ReactDOM.hydrate, AppComponent));

const hot = (module as any).hot;
if (hot && hot.accept) {
  hot.accept(() => {
    console.log('Test');
    render(ReactDOM.render, require('ui/App').App);
  });
}
