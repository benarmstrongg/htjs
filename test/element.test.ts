import { appendHtjsProp as htjs, testCreateElement } from './util';
import {
    SINGLE_PAREN_NO_ARGS,
    SINGLE_PAREN_PROPS_ARG,
    DOUBLE_PAREN_NO_ARGS,
    DOUBLE_PAREN_CHILDREN_ARG,
    DOUBLE_PAREN_PROPS_ARG,
    DOUBLE_PAREN_BOTH_ARGS,
} from './apiTestSpecs';

import { _ } from '../src';
import { bind, div, p } from '../src/elems';

describe('Element factory factory', () => {
    beforeAll(() => {
        bind(testCreateElement);
    });

    it('should use property accessed as element type', () => {
        const realNode = _.h2();
        expect(realNode).toEqual(expect.objectContaining(htjs({ type: 'h2' })));
        // @ts-expect-error
        const fakeNode = _.test123();
        expect(fakeNode).toEqual(
            expect.objectContaining(htjs({ type: 'test123' }))
        );
    });
});

describe('Element factory', () => {
    beforeAll(() => {
        bind(testCreateElement);
    });

    test(SINGLE_PAREN_NO_ARGS, () => {
        const node = div();
        expect(node).toEqual(
            htjs({
                type: 'div',
                props: null,
                children: [],
            })
        );
    });

    test(SINGLE_PAREN_PROPS_ARG, () => {
        const node = div({ className: 'test' });
        expect(typeof node).toEqual('function');
        expect(node()).toEqual(
            htjs({
                type: 'div',
                props: { className: 'test' },
                children: [],
            })
        );
    });

    test(DOUBLE_PAREN_NO_ARGS, () => {
        // @ts-expect-error
        const fn = () => div()();
        expect(fn).toThrow();
    });

    test(DOUBLE_PAREN_CHILDREN_ARG, () => {
        // @ts-expect-error
        const fn = () => div()(div());
        expect(fn).toThrow();
    });

    test(DOUBLE_PAREN_PROPS_ARG, () => {
        const node = div({ hidden: 'hidden' })();
        expect(node).toEqual(
            htjs({
                type: 'div',
                props: { hidden: 'hidden' },
                children: [],
            })
        );
    });

    test(DOUBLE_PAREN_BOTH_ARGS, () => {
        const node = div({ id: 'parent' })(
            //
            p({ id: 'child' })('Hello world')
        );
        expect(node).toEqual(
            htjs({
                type: 'div',
                props: { id: 'parent' },
                children: [
                    htjs({
                        type: 'p',
                        props: { id: 'child' },
                        children: ['Hello world'],
                    }),
                ],
            })
        );
    });
});
