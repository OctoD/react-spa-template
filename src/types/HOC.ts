import { ComponentType } from 'react';

export type UnaryHOC = <T>(component: ComponentType<T>) => ComponentType<T>;
export type NullaryHOC = <T>(component: ComponentType<T>) => () => ComponentType<T>;
