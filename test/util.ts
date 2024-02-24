import type { bind } from '../src';

export const testCreateElement: Parameters<typeof bind>[0] = (
    type,
    props,
    children
) => {
    return { type, props, children };
};

export function appendHtjsProp<T>(obj: T): T & { _htjs: true } {
    return { ...obj, _htjs: true };
}
