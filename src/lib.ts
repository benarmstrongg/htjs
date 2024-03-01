import React from 'react';
import { JSXInternal } from './preact-types';

type HtjsNode = { _htjs?: true };

type IntrinsicElementType = keyof JSXInternal.IntrinsicElements;
type IntrinsicElementProps<TType extends IntrinsicElementType> =
    JSXInternal.IntrinsicElements[TType];

type ElementType = IntrinsicElementType | HtjsNode;
type ElementPropsWithChildren<
    TType extends IntrinsicElementType | HtjsNode,
    TProps
> = (TType extends IntrinsicElementType
    ? IntrinsicElementProps<TType>
    : TProps) & { children?: ChildNode[] };
type ElementProps<TType extends IntrinsicElementType | HtjsNode, TProps> = Omit<
    ElementPropsWithChildren<TType, TProps>,
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
type PropsOrChildren<TType extends IntrinsicElementType | HtjsNode, TProps> =
    | ChildNode[]
    | [ElementProps<TType, TProps>];

type ElementFactory = typeof createElement;

type ElementWithPropsFactory = (...children: ChildNode[]) => ChildNode;

let createElement: (<TType extends ElementType, TProps>(
    type: TType,
    props: ElementProps<typeof type, TProps>,
    ...children: ChildNode[]
) => HtjsNode) &
    HtjsNode;

function isChildren(args: any): args is ChildNode[] {
    return args.length != 1 || typeof args[0] == 'string';
}

function withOrWithoutProps<TType extends ElementType, TProps>(
    type: TType,
    props: [ElementProps<typeof type, TProps>]
): ReturnType<typeof withProps>;
function withOrWithoutProps<TType extends ElementType, TProps>(
    type: TType,
    children: ChildNode[]
): ReturnType<typeof withoutProps>;
function withOrWithoutProps<TType extends ElementType, TProps>(
    type: TType,
    propsOrChildren: PropsOrChildren<typeof type, TProps>
): HtjsNode | ElementWithPropsFactory {
    return isChildren(propsOrChildren)
        ? withoutProps(type, propsOrChildren)
        : withProps(type, propsOrChildren[0]);
}

const withProps =
    <TType extends ElementType, TProps>(
        type: TType,
        props: ElementProps<typeof type, TProps>
    ): ElementWithPropsFactory =>
    (...children: ChildNode[]) =>
        createElement(type, props, ...children);

const withoutProps = <TType extends ElementType>(
    type: TType,
    children: ChildNode[]
): HtjsNode =>
    // @ts-expect-error
    createElement(type, null, ...children);

export function elementFactoryFactory<TType extends ElementType, TProps>(
    type: TType
) {
    function elementFactory(
        props: ElementProps<typeof type, TProps>
    ): ReturnType<typeof withProps<typeof type, any>>;
    function elementFactory(
        ...children: ChildNode[]
    ): ReturnType<typeof withoutProps<typeof type>>;
    function elementFactory(
        ...propsOrChildren: PropsOrChildren<typeof type, TProps>
    ): HtjsNode | ElementWithPropsFactory {
        return withOrWithoutProps(type, propsOrChildren);
    }
    return elementFactory;
}

type ComponentType<TProps> = ElementType &
    (
        | ((props: ElementPropsWithChildren<HtjsNode, TProps>) => HtjsNode)
        | React.ExoticComponent<TProps>
    );
export function componentFactoryFactory<TProps>(
    component: ComponentType<TProps>
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
        return isChildren(propsOrChildren)
            ? withoutProps(component, propsOrChildren)
            : withProps(component, propsOrChildren[0]);
    }
    return componentFactory;
}

export function bind(factory: (tag: any, props: any, ...children: any) => any) {
    createElement = ((type, props, ...children) =>
        factory(type, props, ...children)) as typeof createElement;
}
