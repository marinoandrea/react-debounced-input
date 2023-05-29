# react-form-utils

Simple collection of React form related componenents that support commonly used UI/UX patterns.

## Install

With npm:

```bash
npm install @marinoandrea/react-form-utils
```

With Yarn:

```bash
yarn install @marinoandrea/react-form-utils
```

## Usage

### `DebouncedInput`

Search bar using `@tanstack/react-query`:

```JSX
import { DebouncedInput } from "@marinoandrea/react-form-utils";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'


export default function App() {
  const [query, setQuery] = useState("");

  const query = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
        // perform some network request using the query
    }
  });

  return (
    <div>
      <DebouncedInput
        debounceMs={300}
        onChange={(e) => setQuery(e.currentTarget.value)}
       />
    </div>
  );
}
```

_Note: The call to `setQuery` is gonna be debounced by `300` milliseconds but the input value is still gonna change immediately as it's not controlled here._
