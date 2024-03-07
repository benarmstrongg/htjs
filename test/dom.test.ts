/**
 * @jest-environment jsdom
 */

// patch jsdom
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// @ts-ignore setup react
global.IS_REACT_ACT_ENVIRONMENT = true;

import PreactTestUtils from 'preact/test-utils';
import ReactTestUtils from 'react-dom/test-utils';
import React from 'react';
import ReactDOM from 'react-dom/client';
import * as preact from 'preact';
import { $, _, bind } from '../src';

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

describe('DOM Render', () => {
    beforeEach(() => {
        document.write(PAGE_HTML);
    });

    const App = $((props: { lib: 'preact' | 'react' }) =>
        _.div({ id: 'app' })(
            _.p(`hello from ${props.lib}`),
            _.a({ href: 'https://test.com' })('test')
        )
    );

    test('ReactDOM.createRoot.render', () => {
        bind(React.createElement);
        ReactTestUtils.act(() => {
            ReactDOM.createRoot(document.getElementById('root')!).render(
                $(React.StrictMode)(App({ lib: 'react' })())
            );
        });
        const root = document.getElementById('root')!;
        expect(root.innerHTML).toBe(
            '<div id="app"><p>hello from react</p><a href="https://test.com">test</a></div>'
        );
    });

    test('preact.render', () => {
        bind(preact.h);
        PreactTestUtils.act(() => {
            preact.render(
                App({ lib: 'preact' })(),
                document.getElementById('root')!
            );
        });
        const root = document.getElementById('root')!;
        expect(root.innerHTML).toBe(
            '<div id="app"><p>hello from preact</p><a href="https://test.com">test</a></div>'
        );
    });
});
