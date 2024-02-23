---
'@barndev/htjs': patch
---

Fix issue with elems exports initializing before bind call. Elems is now a mutually exclusive entry point; i.e. @barndev/htjs `bind()` won't work for @barndev/htjs/elems `div()` function, @barndev/htjs/elems `bind()` must be used.
