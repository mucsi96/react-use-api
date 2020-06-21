# react-use-api

React hook for fetching data.

## Usage with ErrorBoundary
```typescript
import { useApi } from "./useApi";

function useSearchByName({
  name
}: {
  name: string;
}) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`
  });
}

const [names, search, loading] = useSearchByName({
  name: searchString
});
```

## Usage without ErrorBoundary
```typescript
import { useApi } from "./useApi";

function useSearchByName({
  name
}: {
  name: string;
}) {
  return useApi<string[]>({
    method: "GET",
    url: `/api/search/${name}`,
    noErrorPropagationBoundary: true
  });
}

const [names, search, loading, error] = useSearchByName({
  name: searchString
});
```

## Features
- Fetching data using fetchAPI
- Returning data, load function, loading state, error state
- Error handling for server and network errors
- Support for error boundaries
- Request cancelling on component unmount
- Request cancelling on prop change

## Fetching data using fetchAPI

![Animated GIF-downsized](https://user-images.githubusercontent.com/3163392/85226355-6f9b2300-b3d7-11ea-8ccf-0b2bb29bc0c5.gif)

## Error handling for server errors

![Animated GIF-downsized (1)](https://user-images.githubusercontent.com/3163392/85226365-7e81d580-b3d7-11ea-80cc-122f7996cbfa.gif)

## Error handling for network errors

![Animated GIF-downsized (2)](https://user-images.githubusercontent.com/3163392/85226383-8e011e80-b3d7-11ea-8d37-2fe2d102ba45.gif)

## Support for error boundaries

![Animated GIF-downsized (3)](https://user-images.githubusercontent.com/3163392/85226406-978a8680-b3d7-11ea-8c45-3f9e914162e9.gif)

## Request cancelling on component unmount

![Animated GIF-downsized (4)](https://user-images.githubusercontent.com/3163392/85226416-9fe2c180-b3d7-11ea-90a3-d0bedd47617c.gif)

## Request cancelling on prop change

![Animated GIF-downsized (5)](https://user-images.githubusercontent.com/3163392/85226424-ab35ed00-b3d7-11ea-92e1-ee0b41b3731b.gif)
