import { testCreateElement, appendHtjsProp as htjs } from './util';

import { $, bind, div, p } from '../src/elems';

describe('Component factory', () => {
    beforeAll(() => {
        bind(testCreateElement);
    });

    function fc<T>(obj: T): T & { type: any } {
        return htjs({ ...obj, type: expect.any(Function) });
    }

    const TestComponent = $((_props) => div());

    it('should produce expected tree: single parenthesis, no args', () => {
        const node = TestComponent();
        expect(node).toEqual(
            fc({
                props: null,
                children: [],
            })
        );
    });

    it('should produce expected factory: single parenthesis, props arg', () => {
        const node = TestComponent({ className: 'test' });
        expect(typeof node).toEqual('function');
        expect(node()).toEqual(
            fc({
                props: { className: 'test' },
                children: [],
            })
        );
    });

    it('should throw: double parentheses, no args', () => {
        // @ts-expect-error
        const fn = () => TestComponent()();
        expect(fn).toThrow();
    });

    it('should throw: double parentheses, children arg only', () => {
        // @ts-expect-error
        const fn = () => TestComponent()(div());
        expect(fn).toThrow();
    });

    it('should produce expected tree: double parentheses, props arg only', () => {
        const node = TestComponent({ hidden: 'hidden' })();
        expect(node).toEqual(
            fc({
                props: { hidden: 'hidden' },
                children: [],
            })
        );
    });

    it('should produce expected tree: double parentheses, props and children args', () => {
        const node = TestComponent({ id: 'parent' })(
            //
            p({ id: 'child' })('Hello world')
        );
        expect(node).toEqual(
            fc({
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
