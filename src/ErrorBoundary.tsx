import React, { Component } from "react";
import { ApiError } from "./api/ApiError";

export class ErrorBoundary extends Component<{}, { error?: ApiError | Error }> {
  public readonly state: { error?: ApiError | Error } = {};

  static getDerivedStateFromError(error: ApiError | Error) {
    return { error };
  }

  render() {
    const { children } = this.props;
    const { error } = this.state;

    if (error instanceof ApiError) {
      return (
        <h2 id="error">{`Caught by error boundary: ${error.message} (${error.status})`}</h2>
      );
    } else if (error) {
      return <h2 id="error">{`Caught by error boundary: ${error.message}`}</h2>;
    }

    return children;
  }
}
