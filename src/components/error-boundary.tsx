'use client';

import React, { Component, ReactNode } from 'react';

type FallbackRenderFunction = (props: {
  error: Error | undefined;
}) => React.ReactNode;

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  fallbackRender?: FallbackRenderFunction;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { hasError: false, error: undefined };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        // clone the component and pass the error as a prop
        return React.cloneElement(this.props.fallback, {
          error: this.state.error,
        });
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
