import { API_SPECS, mockCreateElement, appendHtjsProp as htjs } from './util';

import { $, bind, div, p } from '../src/elems';

describe('htjs', () => {
    describe('Component factory', () => {
        beforeAll(() => {
            bind(mockCreateElement);
        });

        function fc<T>(obj: T): T & { type: any } {
            return htjs({ ...obj, type: expect.any(Function) });
        }

        const TestComponent = $((_props: any) => div());

        test(API_SPECS.SINGLE_PAREN_NO_ARGS, () => {
            const node = TestComponent();
            expect(node).toEqual(
                fc({
                    props: null,
                    children: undefined,
                })
            );
        });

        test(API_SPECS.SINGLE_PAREN_PROPS_ARG, () => {
            const node = TestComponent({ className: 'test' });
            expect(typeof node).toEqual('function');
            expect(node()).toEqual(
                fc({
                    props: { className: 'test' },
                    children: undefined,
                })
            );
        });

        test(API_SPECS.DOUBLE_PAREN_NO_ARGS, () => {
            // @ts-expect-error
            const fn = () => TestComponent()();
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_CHILDREN_ARG, () => {
            // @ts-expect-error
            const fn = () => TestComponent()(div());
            expect(fn).toThrow();
        });

        test(API_SPECS.DOUBLE_PAREN_PROPS_ARG, () => {
            const node = TestComponent({ hidden: 'hidden' })();
            expect(node).toEqual(
                fc({
                    props: { hidden: 'hidden' },
                    children: undefined,
                })
            );
        });

        test(API_SPECS.DOUBLE_PAREN_BOTH_ARGS, () => {
            const node = TestComponent({ id: 'parent' })(
                //
                p({ id: 'child' })('Hello world')
            );
            expect(node).toEqual(
                fc({
                    props: { id: 'parent' },
                    children: htjs({
                        type: 'p',
                        props: { id: 'child' },
                        children: 'Hello world',
                    }),
                })
            );
        });
    });
});
