import { JSXInternal } from './preact-types';

type HtjsNode = { _htjs?: true };

type IntrinsicElementTag = keyof JSXInternal.IntrinsicElements;
type IntrinsicElementProps<TTag extends IntrinsicElementTag> =
    JSXInternal.IntrinsicElements[TTag];

type ElementTag = IntrinsicElementTag | HtjsNode;
type ElementPropsWithChildren<
    TTag extends IntrinsicElementTag | HtjsNode,
    TProps
> = (TTag extends IntrinsicElementTag
    ? IntrinsicElementProps<TTag>
    : TProps) & { children?: ChildNode[] };
type ElementProps<TTag extends IntrinsicElementTag | HtjsNode, TProps> = Omit<
    ElementPropsWithChildren<TTag, TProps>,
    'children'
>;

type ChildNode =
    | HtjsNode
    | string
    | number
    | boolean
    | null
    | undefined
    | ChildNode[];
type PropsOrChildren<TTag extends IntrinsicElementTag | HtjsNode, TProps> =
    | ChildNode[]
    | [ElementProps<TTag, TProps>];

type ElementFactory = typeof createElement;

type ElementWithPropsFactory = (...children: ChildNode[]) => ChildNode;

let createElement: (<TTag extends ElementTag, TProps>(
    tag: TTag,
    props: ElementProps<typeof tag, TProps>,
    ...children: ChildNode[]
) => HtjsNode) &
    HtjsNode;

function isChildren(args: any): args is ChildNode[] {
    return (
        args.length !== 1 ||
        typeof args[0] === 'string' ||
        (args[0] as HtjsNode)?._htjs === true
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
): HtjsNode | ElementWithPropsFactory {
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
    return (...children: ChildNode[]) => createElement(tag, props, children);
}

function withoutProps<TTag extends ElementTag>(
    tag: TTag,
    ...children: ChildNode[]
): HtjsNode {
    // @ts-expect-error
    return createElement(tag, null, children);
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
    ): HtjsNode | ElementWithPropsFactory {
        return withOrWithoutProps(tag, ...propsOrChildren);
    }
    return elementFactory;
}

export function componentFactoryFactory<TProps>(
    fn: ElementTag &
        ((props: ElementPropsWithChildren<HtjsNode, TProps>) => HtjsNode)
) {
    type TPropsNoChildren = Omit<TProps, 'children'>;
    function componentFactory(
        props: ElementProps<HtjsNode, TProps>
    ): ReturnType<typeof withProps<HtjsNode, TProps>>;
    function componentFactory(
        ...children: Partial<TPropsNoChildren> extends TPropsNoChildren
            ? ChildNode[]
            : [ElementProps<HtjsNode, TProps>]
    ): Partial<TPropsNoChildren> extends TPropsNoChildren
        ? ReturnType<typeof withoutProps<HtjsNode>>
        : ReturnType<typeof withProps<HtjsNode, TProps>>;
    function componentFactory(
        ...propsOrChildren: Partial<TPropsNoChildren> extends TPropsNoChildren
            ? PropsOrChildren<HtjsNode, TProps>
            : [ElementProps<HtjsNode, TProps>]
    ): ChildNode | ElementWithPropsFactory {
        if (isChildren(propsOrChildren)) {
            return withoutProps(fn, ...(propsOrChildren as ChildNode[]));
        }
        return withProps(fn, propsOrChildren[0]);
    }
    return componentFactory;
}

export function bind(factory: ElementFactory) {
    createElement = ((tag, props, children) => {
        const res = factory(tag, props, children);
        res._htjs = true;
        return res;
    }) as typeof createElement;
    createElement._htjs = true;
}
