import { Component, type ReactNode } from 'react';
import { RouterProvider } from 'react-router';
import { MediaAssetsProvider } from './lib/mediaAssets';
import { router } from './routes';

/** Catches render errors so the app shows a fallback instead of a blank page. */
class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'system-ui',
          textAlign: 'center',
        }}>
          <h1 style={{ marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            The page failed to load. Check the console for errors, or try reloading.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '1rem',
              cursor: 'pointer',
              background: '#fecc00',
              border: 'none',
              borderRadius: 6,
            }}
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <AppErrorBoundary>
      <MediaAssetsProvider>
        <RouterProvider router={router} />
      </MediaAssetsProvider>
    </AppErrorBoundary>
  );
}
