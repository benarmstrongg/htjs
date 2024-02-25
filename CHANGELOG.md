# @barndev/htjs

## 1.0.1

### Patch Changes

- 121d720: Improve bundle size

## 1.0.0

### Major Changes

- 64ff80b: First major release. Improved types, reduced bundle size, added tests.

## 0.0.9

### Patch Changes

- 0abf0de: Update publish script to run prepublish script.

## 0.0.8

### Patch Changes

- db3f229: Add prepublish step to copy elems entry point to root.

## 0.0.7

### Patch Changes

- 9b5e5b6: Update `main` in package.json hoping for /elems export. If not reverting to root dir dist.

## 0.0.6

### Patch Changes

- a64f0dd: Updated package.json "exports", going to consider moving build artifacts to root if this doesn't work. + cleanup changes xd

## 0.0.5

### Patch Changes

- 11b4c45: Fix issue with elems exports initializing before bind call. Elems is now a mutually exclusive entry point; i.e. @barndev/htjs `bind()` won't work for @barndev/htjs/elems `div()` function, @barndev/htjs/elems `bind()` must be used.

## 0.0.4

### Patch Changes

- 8c0a029: Updated to ship preact JSX types

## 0.0.3

### Patch Changes

- df1fde0: Full typedefs exported for /elems

## 0.0.2

### Patch Changes

- 68feb71: 0.0.2
