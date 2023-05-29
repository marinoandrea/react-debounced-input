# react-debounced-input

Simple React input component that debounces calls to onChange.

## Install

With npm:

```bash
npm i --save @marinoandrea/react-debounced-input
```

With Yarn:

```bash
yarn add @marinoandrea/react-debounced-input
```

## Usage

Search bar using `@tanstack/react-query`:

```JSX
import { DebouncedInput } from "@marinoandrea/react-debounced-input";
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

## Authors

- **Andrea Marino** - ([marinoandrea](https://github.com/marinoandrea))

See also the list of [contributors](https://github.com/marinoandrea/reactome-graph/contributors) who participated in this project.
