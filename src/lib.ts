import type React from 'react';
import type { JSXInternal } from './preact-types';

type HtjsNode = { _htjs?: true };

type IsAny<T> = 0 extends 1 & T ? true : false;

type IntrinsicElementType = keyof JSXInternal.IntrinsicElements;
type IntrinsicElementProps<TType extends IntrinsicElementType> =
    JSXInternal.IntrinsicElements[TType];

type ElementType = IntrinsicElementType | HtjsNode | ComponentType<any>;
type ElementPropsWithChildren<
    TType extends ElementType,
    TProps
> = (TType extends IntrinsicElementType
    ? IntrinsicElementProps<TType>
    : TProps) & { children?: ChildNode[] };
type ElementProps<TType extends ElementType, TProps> = Omit<
    ElementPropsWithChildren<TType, TProps>,
    'children'
> & { key?: any };
type HtjsElement = HtjsNode & {
    type: any;
    key: any;
    props: any;
    children: any;
};
type ChildNode =
    | HtjsNode
    | string
    | number
    | boolean
    | null
    | undefined
    | ChildNode[];

type PropsOrChildren<TType extends ElementType, TProps> =
    | ChildNode[]
    | [ElementProps<TType, TProps>];

type ElementWithPropsFactory = (...children: ChildNode[]) => HtjsElement;

let createElement: (<TType extends ElementType, TProps>(
    type: TType,
    props: ElementProps<typeof type, TProps>,
    ...children: ChildNode[]
) => HtjsElement) &
    HtjsNode;

function isChildren(args: any): args is ChildNode[] {
    return (
        args.length != 1 ||
        typeof args[0] == 'string' ||
        (args[0] as HtjsNode)?._htjs == true
    );
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
): HtjsElement =>
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
        return withOrWithoutProps(type, propsOrChildren as any);
    }
    return elementFactory;
}

type ComponentType<TProps> =
    | ((props: ElementPropsWithChildren<HtjsNode, TProps>) => HtjsNode)
    | React.ExoticComponent<TProps>;
export function componentFactoryFactory<TProps>(
    component: ComponentType<TProps>
) {
    type PropsWithoutChildren = Omit<TProps, 'children'>;
    type HasRequiredProps =
        Partial<PropsWithoutChildren> extends PropsWithoutChildren
            ? false
            : true;

    type ComponentWithoutPropsFactory = {
        (...children: ChildNode[]): ReturnType<typeof withoutProps<HtjsNode>>;
    };
    type ComponentWithPropsFactory = {
        (props: PropsWithoutChildren): ReturnType<
            typeof withProps<
                HtjsNode,
                ElementProps<HtjsNode, PropsWithoutChildren>
            >
        >;
    };
    type ComponentFactory = ComponentWithoutPropsFactory &
        ComponentWithPropsFactory;
    type Component = HasRequiredProps extends true
        ? ComponentWithPropsFactory
        : ComponentFactory;

    return elementFactoryFactory(component) as Component;
}

export function bind(factory: (tag: any, props: any, ...children: any) => any) {
    createElement = (type, props, ...children) => {
        const res = factory(type, props, ...children) as typeof createElement;
        return { ...res, _htjs: true } as any;
    };
}
