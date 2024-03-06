# @barndev/htjs

![npm bundle size](https://img.shields.io/bundlephobia/min/@barndev/htjs)
![npm bundle size minzip](https://img.shields.io/bundlephobia/minzip/@barndev/htjs)
[![npm version](https://badge.fury.io/js/@barndev%2Fhtjs.svg)](https://www.npmjs.com/package/@barndev/htjs)

Lightweight, no build, plain JS alternative to JSX

```html
<script type="module">
    import { h, render } from 'https://esm.sh/preact';
    import { useState } from 'https://esm.sh/preact/hooks';
    import { $, _, bind } from 'https://esm.sh/@barndev/htjs';

    bind(h);

    const Counter = $(({ initialCount = 0 }) => {
        const [count, setCount] = useState(initialCount);
        const increment = () => setCount((currentCount) => currentCount + 1);
        const decrement = () => setCount((currentCount) => currentCount - 1);

        return _.div(
            _.p(`The count is ${count}`),
            _.button({ onClick: increment })('Increment'),
            _.button({ onClick: decrement })('Decrement')
        );
    });

    render(Counter({ initialCount: 3 })(), document.body);
</script>
```

JSX is great, but there are certain scenarios where it feels like more pain than it's worth. For example, many applications aim to be zero-build. This can come in many forms, including vanilla-JS-only applications, applications that opt for JSDoc over Typescript, or applications that only use reactivity for small pieces of web pages in individual `<script>` tags. Zero-build apps cannot use JSX. An additional reason to opt for a JSX-alternative is found in applications that are not bootstrapped with JSX support out of the box. For example, a backend application that just wants to serve some HTML with client side reactivity. Instead of creating an entire build pipeline for 4 JS components and one HTML file, or re-learning how to setup babel for JSX, Typscript, and my-one-project-specific-case every time you need to use it, it may be time to ditch JSX or reach for a JSX alternative. `@barndev/htjs` provides an intuative API for describing UI with natural indentation.

For an alternative JSX alternative, try [htm](https://github.com/developit/htm).

## Installation

`@barndev/htjs` is available on npm and [esm.sh](https://esm.sh/) CDN.

### Install via npm

```sh
npm i @barndev/htjs
```

### Import from esm.sh

```sh
import { _, $, bind } from 'https://esm.sh/@barndev/htjs';
```

## Usage

### Binding

`@barndev/htjs` provides an API for describing the UI - the actual creation of UI elements is handled by an external `createElement` function that you provide. React's `createElement` and Preact's `h` functions work out of the box, but `createElement` can be any function that takes in `type`, `props` and `...children` as args and returns an element object. Before any HTJS elements can be used, the `bind` function must be called to set `createElement`:

```js
import { h } from 'preact';
import { bind } from '@barndev/htjs';

bind(h);
```

### Creating Elements

HTJS elements and components are expressed with factory functions that have 2 overloads:

#### with props

```js
_.div({ className: 'p-4' })(
    _.h1({ className: 'text-black' })('Title'),
    _.a({ href: 'https://github.com/benarmstrongg/htjs' })('Link'),
    _.input({ type: 'text', onChange: handleChange })()
);
```

#### without props

```js
_.div(_.h1('Title'), _.p('Description'));
```

If props are provided, `_.<elem>` returns a factory-factory, or a function that returns a function that returns a `createElement`. If props are omitted, a normal `createElement` factory function is returned with props set to `null`.

### Creating Components

The `$` function creates a component given a function. The usage is the same as the `_.<elem>` function, using the with-or-without-props approach.

```js
const Card = $({ children } =>
    div({ className: 'p-2' })(children)
);
const Button = $((props) => {
    return button({
        className: 'btn btn-primary'
        onClick: props.onClick
    })(props.text);
});

Card(Button({ text: 'Click Me', onClick: alert('Clicked!') })());
```

The `$` method is required to opt in to the with-or-without-props API, and only objects created with this function will be treated as components. While regular JS functions can be used to group elements, it's important to note that these are _not_ components. The element returned by `createElement` will be that of the root element in the return statement, not that of a component. This means things like React/Preact hooks will not work inside these functions.

```js
// ok
const Form = ({ initialState, onChange }) => _.form(
    _.input({
        value: initialState.name,
        placeholder: 'Name',
        onChange
    })(),
    _.input({
        value: initialState.address,
        placeholder: 'Address',
        onChange
    })(),
);

// if it needs state, it must be wrapped in $
// not ok
const Form = () => {
    const [state, setState] = useState({});
    // ...
}
// ok
const Form = $(() = => {
    const [state, setState] = useState({});
    // ...
});
```

### `/elems`

The alternate `@barndev/htjs/elems` entrypoint exports elements as individual functions such as `h1`, `select`, and `dialog`. This adds over 5 KB to the bundle size. This entrypoint also reexports the `$` function and exports its own `bind` function that must be used instead of the root `bind`.

```js
import { h } from 'https://esm.sh/preact';
// bind() from /elems must be used
import { bind, $, select, options } from 'https://esm.sh/@barndev/htjs/elems';

bind(h);

const MyDropdown = $(({ handleChange }) =>
    select({ onChange: handleChange })(option('None'), option('Some'));
);
```

### Integrations

As previously mentioned, `@barndev/htjs` is built to work with React and Preact by default Initial render of virtual DOM nodes is slightly different between these libraries:

#### Preact

```js
import { h, render } from 'preact';
import { bind } from '@barndev/htjs';
import App from './App';

bind(h);
render(App(), document.body);
```

#### React

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { $, bind } from '@barndev/htjs';
import App from './App';

bind(React.createElement);
ReactDOM.createRoot(document.getElementById('root')).render(
    $(React.StrictMode)(App())
);
```

Additionally, any `createElement` function that adheres to the following signature can be passed to `bind` and used:

```js
function createElement(type, props, ...children) {
    // ...
    return element;
}
```
