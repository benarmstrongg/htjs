---
"@barndev/htjs": patch
---

Fix issue with elems exports initializing before bind call. Elems is now a mutually exclusive entry point; i.e. index bind() won't work for elems div() export, elems bind() must be used.
