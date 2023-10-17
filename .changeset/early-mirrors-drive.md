---
"@bryx-inc/ts-utils": minor
---

-   Make `WrappedMaybe<T>` methods chainable
    -   `value()` renamed to `take()`
    -   `takeIf` and `takeUnless` do not chain
    -   chainable `if` and `unless` methods introduced
