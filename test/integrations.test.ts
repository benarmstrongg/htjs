import { API_SPECS } from './util';

import { h } from 'preact';
import { createElement, StrictMode } from 'react';
import { $, bind, div, p } from '../src/elems';

describe('preact', () => {
    beforeAll(() => {
        bind(h);
    });

    function stripElemCounter(node: any) {
        delete node.__v;
        return node;
    }

    function elem(node: any) {
        if (node.props?.children) {
            node.props.children = elem(node.props.children);
        }
        return stripElemCounter(node);
    }

    describe('Element factory', () => {
        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = div();
            const preactNode = h('div', null);
            expect(elem(node)).toEqual(elem(preactNode));
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = div({ className: 'test' });
            const preactNode = h('div', { className: 'test' });
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
            const preactNode = h('div', { hidden: true });
            expect(elem(node)).toEqual(elem(preactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = div({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            const preactNode = h(
                'div',
                { id: 'parent' },
                h('p', { id: 'child' }, 'Hello world')
            );
            expect(elem(node)).toEqual(elem(preactNode));
        });
    });
});

describe('react', () => {
    beforeAll(() => {
        bind(createElement);
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
        return node;
    }

    describe('Element factory', () => {
        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = div();
            const reactNode = createElement('div', null);
            expect(elem(node)).toEqual(elem(reactNode));
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = div({ className: 'test' });
            const reactNode = createElement('div', { className: 'test' });
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
            const reactNode = createElement('div', { hidden: true });
            expect(elem(node)).toEqual(elem(reactNode));
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = div({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            const reactNode = createElement(
                'div',
                { id: 'parent' },
                createElement('p', { id: 'child' }, 'Hello world')
            );
            expect(elem(node)).toEqual(elem(reactNode));
        });
    });

    describe('Component factory', () => {
        test('React.StrictMode', () => {
            const node = $(StrictMode)(div('hello world'), 'hello');
            const reactNode = createElement(StrictMode, {
                children: [createElement('div', null, 'hello world'), 'hello'],
            });
            expect(node).toEqual(reactNode);
        });
    });
});
