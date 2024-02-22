import { JSXInternal } from './preact-types';

type HtjsElement = { _htjs: true };

type IntrinsicElementTag = keyof JSXInternal.IntrinsicElements;
type IntrinsicElementProps<TTag extends IntrinsicElementTag> =
    JSXInternal.IntrinsicElements[TTag];

type ElementTag = IntrinsicElementTag | HtjsElement;
type ElementPropsWithChildren<
    TTag extends IntrinsicElementTag | HtjsElement,
    TProps
> = TTag extends IntrinsicElementTag ? IntrinsicElementProps<TTag> : TProps;
type ElementProps<
    TTag extends IntrinsicElementTag | HtjsElement,
    TProps
> = Omit<ElementPropsWithChildren<TTag, TProps>, 'children'>;

type ChildNode =
    | HtjsElement
    | string
    | number
    | boolean
    | null
    | undefined
    | ChildNode[];
type PropsOrChildren<TTag extends IntrinsicElementTag | HtjsElement, TProps> =
    | ChildNode[]
    | [ElementProps<TTag, TProps>];

type ElementFactory = typeof createElement;

type ElementWithPropsFactory = (...children: ChildNode[]) => HtjsElement;

let createElement: (<TTag extends ElementTag, TProps>(
    tag: TTag,
    props: ElementProps<typeof tag, TProps>,
    ...children: ChildNode[]
) => HtjsElement) &
    HtjsElement;

function isChildren(args: any): args is ChildNode[] {
    return (
        args.length > 1 ||
        typeof args[0] === 'string' ||
        (args[0] as HtjsElement)._htjs === true
    );
}

export function withOrWithoutProps<TTag extends ElementTag, TProps>(
    tag: TTag,
    props: ElementProps<typeof tag, TProps>
): ReturnType<typeof withProps>;
export function withOrWithoutProps<TTag extends ElementTag, TProps>(
    tag: TTag,
    ...children: ChildNode[]
): ReturnType<typeof withoutProps>;
export function withOrWithoutProps<TTag extends ElementTag, TProps>(
    tag: TTag,
    ...propsOrChildren: PropsOrChildren<typeof tag, TProps>
): HtjsElement | ElementWithPropsFactory {
    if (isChildren(propsOrChildren)) {
        return withoutProps(tag, ...propsOrChildren);
    }
    const props = propsOrChildren[0] as ElementProps<typeof tag, TProps>;
    return withProps(tag, props);
}

function withProps<TTag extends ElementTag, TProps>(
    tag: TTag,
    props: ElementProps<typeof tag, TProps>
): ElementWithPropsFactory {
    return (...children: ChildNode[]) => createElement(tag, props, ...children);
}

function withoutProps<TTag extends ElementTag>(
    tag: TTag,
    ...children: ChildNode[]
): HtjsElement {
    // @ts-expect-error
    return createElement(tag, null, ...children);
}

export function elementFactoryFactory<TTag extends ElementTag, TProps>(
    tag: TTag
) {
    function elementFactory(
        props: ElementProps<typeof tag, TProps>
    ): ReturnType<typeof withProps<typeof tag, any>>;
    function elementFactory(
        ...children: ChildNode[]
    ): ReturnType<typeof withoutProps<typeof tag>>;
    function elementFactory(
        ...propsOrChildren: PropsOrChildren<typeof tag, TProps>
    ): HtjsElement | ElementWithPropsFactory {
        return withOrWithoutProps(tag, ...(propsOrChildren as any));
    }
    return elementFactory;
}

export function componentFactoryFactory<TProps>(
    fn: (props: ElementPropsWithChildren<HtjsElement, TProps>) => HtjsElement
) {
    type TPropsNoChildren = Omit<TProps, 'children'>;
    function componentFactory(
        props: ElementProps<HtjsElement, TProps>
    ): ReturnType<typeof withProps<HtjsElement, TProps>>;
    function componentFactory(
        ...children: Partial<TPropsNoChildren> extends TPropsNoChildren
            ? ChildNode[]
            : [ElementProps<HtjsElement, TProps>]
    ): Partial<TPropsNoChildren> extends TPropsNoChildren
        ? ReturnType<typeof withoutProps<HtjsElement>>
        : ReturnType<typeof withProps<HtjsElement, TProps>>;
    function componentFactory(
        ...propsOrChildren: Partial<TPropsNoChildren> extends TPropsNoChildren
            ? PropsOrChildren<HtjsElement, TProps>
            : [ElementProps<HtjsElement, TProps>]
    ): HtjsElement | ElementWithPropsFactory {
        if (isChildren(propsOrChildren)) {
            return withoutProps(
                fn({ children: propsOrChildren } as ElementPropsWithChildren<
                    HtjsElement,
                    TProps
                >),
                ...(propsOrChildren as ChildNode[])
            );
        }
        return withProps(fn(propsOrChildren as TProps), propsOrChildren);
    }
    return componentFactory;
}

export function bind(factory: ElementFactory) {
    factory._htjs = true;
    createElement = ((tag, props, children) => {
        const res = factory(tag, props, children);
        res._htjs = true;
        return res;
    }) as typeof createElement;
    createElement._htjs = true;
}
