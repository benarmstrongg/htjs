import { API_SPECS, appendHtjsProp as htjs } from './util';

import preact from 'preact';
import React from 'react';
import { $, bind, div, p } from '../src/elems';

describe('preact', () => {
    beforeAll(() => {
        bind(preact.h);
    });

    function stripElemCounter(node: any) {
        delete node.__v;
        return node;
    }

    function elem(node: any) {
        if (node.props?.children) {
            node.props.children = elem(node.props.children);
        }
        return stripElemCounter(htjs(node));
    }

    describe('Element factory', () => {
        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = div();
            const preactNode = preact.h('div', null);
            expect(elem(node)).toEqual(elem(preactNode));
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = div({ className: 'test' });
            const preactNode = preact.h('div', { className: 'test' });
            expect(typeof node).toEqual('function');
            expect(elem(node())).toEqual(elem(preactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_NO_ARGS, () => {
            // @ts-expect-error
            const fn = () => div()();
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_CHILDREN_ARG, () => {
            // @ts-expect-error
            const fn = () => div()(div());
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_PROPS_ARG, () => {
            const node = div({ hidden: true })();
            const preactNode = preact.h('div', { hidden: true });
            expect(elem(node)).toEqual(elem(preactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = div({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            const preactNode = preact.h(
                'div',
                { id: 'parent' },
                preact.h('p', { id: 'child' }, 'Hello world')
            );
            expect(elem(node)).toEqual(elem(preactNode));
        });
    });
});

describe('react', () => {
    beforeAll(() => {
        bind(React.createElement);
    });

    function elem(node: any) {
        if (node.props?.children) {
            node = {
                ...node,
                props: {
                    ...node.props,
                    children: elem(node.props.children),
                },
            };
        }
        return htjs(node);
    }

    describe('Element factory', () => {
        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = div();
            const reactNode = React.createElement('div', null);
            expect(elem(node)).toEqual(elem(reactNode));
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = div({ className: 'test' });
            const reactNode = React.createElement('div', { className: 'test' });
            expect(typeof node).toEqual('function');
            expect(elem(node())).toEqual(elem(reactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_NO_ARGS, () => {
            // @ts-expect-error
            const fn = () => div()();
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_CHILDREN_ARG, () => {
            // @ts-expect-error
            const fn = () => div()(div());
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_PROPS_ARG, () => {
            const node = div({ hidden: true })();
            const reactNode = React.createElement('div', { hidden: true });
            expect(elem(node)).toEqual(elem(reactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = div({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            const reactNode = React.createElement(
                'div',
                { id: 'parent' },
                React.createElement('p', { id: 'child' }, 'Hello world')
            );
            expect(elem(node)).toEqual(elem(reactNode));
        });
    });

    describe('Component factory', () => {
        xit('React.StrictMode', () => {
            const node = $(React.StrictMode)(div('hello world'));
            const reactNode = React.createElement(
                React.StrictMode,
                null,
                React.createElement('div', null, 'hello world')
            );
            expect(node).toEqual(reactNode);
        });
    });
});
