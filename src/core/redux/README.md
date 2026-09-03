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

The old `Actions/`, `ActionTypes/`, and root `slices/` folders have been removed. `Sagas/` contains only `RootSaga`; each domain owns its actions, slice, and saga.

Data requests that can be superseded by a newer tab, date, or plant selection use `takeLatest`. `auth`, `documents`, `maintenance`, and `modules` keep `takeEvery` where each event is independent.

The store intentionally keeps `serializableCheck: false` for compatibility with existing fact-detail callback actions.
