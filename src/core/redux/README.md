# Redux architecture

Redux is organized around domain entry points under `domains/`.

```text
redux/
  store.ts
  hooks.ts
  index.ts
  domains/
    auth/
    documents/
    hydrology/
    maintenance/
    modules/
    power/
    production-output/
    refresh/
    revenue-profit/
    technology/
```

Use the typed hooks and domain entry points in new code:

```ts
import { useAppDispatch, useAppSelector } from '@/core/redux'
import { getHydrologyflowChart } from '@/core/redux/domains/hydrology'
```

The old `Actions/`, `ActionTypes/`, and root `slices/` folders have been removed. Saga orchestration remains in `Sagas/`, while each domain owns its slice and action creators.
