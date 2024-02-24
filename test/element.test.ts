import { beforeAll, describe, it, expect } from '@jest/globals';
import { appendHtjsProp as htjs, testCreateElement } from './util';

import { _ } from '../src';
import { bind, div, p } from '../src/elems';

describe('Element factory factory', () => {
    beforeAll(() => {
        bind(testCreateElement);
    });

    it('should use property accessed as element tag', () => {
        const realNode = _.h2();
        expect(realNode).toEqual(expect.objectContaining(htjs({ tag: 'h2' })));
        // @ts-expect-error
        const fakeNode = _.test123();
        expect(fakeNode).toEqual(
            expect.objectContaining(htjs({ tag: 'test123' }))
        );
    });
});

describe('Element factory', () => {
    beforeAll(() => {
        bind(testCreateElement);
    });

    it('should produce expected tree: single parenthesis, no args', () => {
        const node = div();
        expect(node).toEqual(
            htjs({
                tag: 'div',
                props: null,
                children: [],
            })
        );
    });

    it('should produce expected factory: single parenthesis, props arg', () => {
        const node = div({ className: 'test' });
        expect(typeof node).toEqual('function');
        expect(node()).toEqual(
            htjs({
                tag: 'div',
                props: { className: 'test' },
                children: [],
            })
        );
    });

    it('should throw: Double parentheses, no args', () => {
        // @ts-expect-error
        const fn = () => div()();
        expect(fn).toThrow();
    });

    it('should throw: Double parentheses, children arg only', () => {
        // @ts-expect-error
        const fn = () => div()(div());
        expect(fn).toThrow();
    });

    it('should produce expected tree: double parentheses, props arg only', () => {
        const node = div({ hidden: 'hidden' })();
        expect(node).toEqual(
            htjs({
                tag: 'div',
                props: { hidden: 'hidden' },
                children: [],
            })
        );
    });

    it('should produce expected tree: double parentheses, props and children args', () => {
        const node = div({ id: 'parent' })(
            //
            p({ id: 'child' })('Hello world')
        );
        expect(node).toEqual(
            htjs({
                tag: 'div',
                props: { id: 'parent' },
                children: [
                    htjs({
                        tag: 'p',
                        props: { id: 'child' },
                        children: ['Hello world'],
                    }),
                ],
            })
        );
    });
});
