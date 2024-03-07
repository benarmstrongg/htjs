import React from 'react';

type HtjsNode = { _htjs?: true };

type IsAny<T> = 0 extends 1 & T ? true : false;

type IntrinsicElementType = keyof React.JSX.IntrinsicElements;
type IntrinsicElementProps<TType extends IntrinsicElementType> =
    React.JSX.IntrinsicElements[TType];

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
>;
type Element = HtjsNode & React.ReactElement;

type ChildNode =
    | HtjsNode
    | string
    | number
    | boolean
    | null
    | undefined
    | ChildNode[]
    // integrations
    | React.ReactNode;
type PropsOrChildren<TType extends ElementType, TProps> =
    | ChildNode[]
    | [ElementProps<TType, TProps>];

type ElementWithPropsFactory = (...children: ChildNode[]) => Element;

let createElement: (<TType extends ElementType, TProps>(
    type: TType,
    props: ElementProps<typeof type, TProps>,
    ...children: ChildNode[]
) => Element) &
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
): Element =>
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
    type HasOnlyChildren = IsAny<TProps> extends true
        ? false
        : { children: any } extends Required<TProps>
        ? true
        : false;

    type ComponentWithoutPropsFactory = {
        (...children: ChildNode[]): ReturnType<typeof withoutProps<HtjsNode>>;
    };
    type ComponentWithPropsFactory = {
        (props: PropsWithoutChildren): ReturnType<
            typeof withProps<HtjsNode, PropsWithoutChildren>
        >;
    };
    type ComponentFactory = ComponentWithoutPropsFactory &
        ComponentWithPropsFactory;
    type Component = HasOnlyChildren extends true
        ? ComponentWithoutPropsFactory
        : HasRequiredProps extends true
        ? ComponentWithPropsFactory
        : ComponentFactory;

    return elementFactoryFactory(component) as Component;
}

export function bind(factory: (tag: any, props: any, ...children: any) => any) {
    createElement = ((type, props, ...children) =>
        factory(type, props, ...children)) as typeof createElement;
}
