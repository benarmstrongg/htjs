/**
 * @jest-environment jsdom
 */

// patch jsdom
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import { JSDOM } from 'jsdom';
const PAGE_HTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
`;
global.window.document.write(PAGE_HTML);
const { window } = new JSDOM(PAGE_HTML);
const { document } = window;

import PreactTestUtils from 'preact/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;

import React from 'react';
import ReactDOM from 'react-dom/client';
import * as preact from 'preact';
import { $, _, bind } from '../src';

describe('DOM Render', () => {
    const App = () =>
        _.div({ id: 'app' })(
            _.p('hello'),
            _.a({ href: 'https://test.com' })('test')
        );

    test('ReactDOM.createRoot.render', () => {
        bind(React.createElement);
        ReactTestUtils.act(() => {
            ReactDOM.createRoot(document.getElementById('root')!).render(
                $(React.StrictMode)(App())
            );
        });
        const root = document.getElementById('root')!;
        expect(root.innerHTML).toBe(
            '<div id="app"><p>hello</p><a href="https://test.com">test</a></div>'
        );
    });

    test('preact.render', () => {
        bind(preact.h);
        PreactTestUtils.act(() => {
            preact.render(App(), global.document.getElementById('root')!);
        });
        const root = global.document.getElementById('root')!;
        expect(root.innerHTML).toBe(
            '<div id="app"><p>hello</p><a href="https://test.com">test</a></div>'
        );
    });
});
