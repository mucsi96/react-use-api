# react-use-api

React hook for fetching data.

## Usage with ErrorBoundary
```typescript
import { useApi } from "./useApi";

function useSearchByName(name: string) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`
  });
}

const [names, search, loading] = useSearchByName(searchString);
```

## Usage without ErrorBoundary
```typescript
import { useApi } from "./useApi";

function useSearchByName(name: string) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`,
    noErrorPropagationBoundary: true
  });
}

const [names, search, loading, error] = useSearchByName(searchString);
```

## Features
- Fetching data using fetchAPI
- Returning data, load function, loading state, error state
- Error handling for server and network errors
- Support for error boundaries
- Request cancelling on component unmount
- Request cancelling on prop change

## Fetching data using fetchAPI

![Animated GIF-downsized](https://user-images.githubusercontent.com/3163392/85226978-99a21480-b3da-11ea-8262-cc7163124b3b.gif)

## Error handling for server errors

![Animated GIF-downsized (1)](https://user-images.githubusercontent.com/3163392/85226980-9c9d0500-b3da-11ea-8998-c565d1dbc1ae.gif)

## Error handling for network errors

![Animated GIF-downsized (6)](https://user-images.githubusercontent.com/3163392/85227148-d0c4f580-b3db-11ea-827c-7ab23b8672a9.gif)

## Support for error boundaries

![Animated GIF-downsized (3)](https://user-images.githubusercontent.com/3163392/85226984-a161b900-b3da-11ea-8303-b38faabeb8f3.gif)

## Request cancelling on component unmount

![Animated GIF-downsized (4)](https://user-images.githubusercontent.com/3163392/85226987-a3c41300-b3da-11ea-956f-7836d5552611.gif)

## Request cancelling on prop change

![Animated GIF-downsized (7)](https://user-images.githubusercontent.com/3163392/85227149-d28eb900-b3db-11ea-8e50-28b6fac65ff7.gif)
