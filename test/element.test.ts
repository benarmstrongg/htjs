import { API_SPECS, mockCreateElement } from './util';

import { _ } from '../src';
import { bind, div, p } from '../src/elems';

describe('htjs', () => {
    describe('Element factory factory', () => {
        beforeAll(() => {
            bind(mockCreateElement);
        });

        it('should use property accessed as element type', () => {
            const realNode = _.h2();
            expect(realNode).toEqual(expect.objectContaining({ type: 'h2' }));
            // @ts-expect-error
            const fakeNode = _.test123();
            expect(fakeNode).toEqual(
                expect.objectContaining({ type: 'test123' })
            );
        });
    });

    describe('Element factory', () => {
        beforeAll(() => {
            bind(mockCreateElement);
        });

        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = div();
            expect(node).toEqual({
                type: 'div',
                props: null,
                children: undefined,
            });
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = div({ className: 'test' });
            expect(typeof node).toEqual('function');
            expect(node()).toEqual({
                type: 'div',
                props: { className: 'test' },
                children: undefined,
            });
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
            expect(node).toEqual({
                type: 'div',
                props: { hidden: true },
                children: undefined,
            });
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = div({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            expect(node).toEqual({
                type: 'div',
                props: { id: 'parent' },
                children: {
                    type: 'p',
                    props: { id: 'child' },
                    children: 'Hello world',
                },
            });
        });
    });
});
