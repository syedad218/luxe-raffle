'use client';

import React, { Component, ReactNode } from 'react';
import type { ErrorPageProps } from '@/components/error';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.FC<ErrorPageProps>;
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

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: FallbackComponent } = this.props;
      if (FallbackComponent) {
        return (
          <FallbackComponent
            error={this.state.error || new Error('Unknown error')}
            reset={this.resetErrorBoundary}
          />
        );
      }
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
