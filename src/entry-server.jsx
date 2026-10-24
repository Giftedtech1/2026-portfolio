import React from 'react';
import { prerenderToNodeStream } from 'react-dom/static';
import App from './App.jsx';

/** Render the full page to static HTML at build time (waits for lazy sections). */
export async function render() {
  const { prelude } = await prerenderToNodeStream(<App />);
  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}
