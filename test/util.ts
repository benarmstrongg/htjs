import type { bind } from '../src';

export const mockCreateElement: Parameters<typeof bind>[0] = (
    type,
    props,
    children
) => {
    return { type, props, children };
};

export const API_SPECS = {
    SINGLE_PAREN_NO_ARGS:
        'should produce expected tree: single parenthesis, no args',

    SINGLE_PAREN_PROPS_ARG:
        'should produce expected factory: single parenthesis, props arg',

    DOUBLE_PAREN_NO_ARGS: 'should throw: double parentheses, no args',

    DOUBLE_PAREN_CHILDREN_ARG:
        'should throw: double parentheses, children arg only',

    DOUBLE_PAREN_PROPS_ARG:
        'should produce expected tree: double parentheses, props arg only',

    DOUBLE_PAREN_BOTH_ARGS:
        'should produce expected tree: double parentheses, props and children args',
};
