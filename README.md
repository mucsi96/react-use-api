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

## Usage of ApiContextProvider

```typescript
export default function App() {
  const apiContext = useMemo<ApiContext>(
    () => ({
      enhanceRequest(request) {
        request.headers.append(
          "x-this-header",
          "was-added-on-application-level"
        );
        return Promise.resolve(request);
      },
      postFetch(response, error) {
        console.log("this log was made on application level", {
          response,
          error,
        });
        return Promise.resolve();
      },
    }),
    []
  );
  return (
    <ApiContextProvider {...apiContext}>
      <ErrorBoundary>
        <SearchForm />
      </ErrorBoundary>
    </ApiContextProvider>
  );
}
```

## Features
- Fetching data using fetchAPI
- Returning data, load function, loading state, error state
- Error handling for server and network errors
- Support for error boundaries
- Request cancelling on component unmount
- Request cancelling on prop change
- Request enhacing on application / context level. For example adding some headers
- Response processing on application / context level. For example logging errors.

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

## Request enhacing on application / context level

![Animated GIF-downsized (8)](https://user-images.githubusercontent.com/3163392/85233355-d6cfcc00-b405-11ea-97e1-da4af116512a.gif)

## Response processing on application / context level

![Animated GIF-downsized (9)](https://user-images.githubusercontent.com/3163392/85233410-329a5500-b406-11ea-9dde-82ddb568c3f1.gif)
