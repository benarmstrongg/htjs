import type { bind } from '../src';

export const testCreateElement: Parameters<typeof bind>[0] = (
    tag,
    props,
    children
) => {
    return { tag, props, children };
};

export function appendHtjsProp<T>(obj: T): T & { _htjs: true } {
    return { ...obj, _htjs: true };
}
