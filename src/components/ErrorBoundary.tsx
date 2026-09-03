import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from './Skeleton'

type State = { error: Error | null }

/** Catches render errors so a single broken screen never takes down the whole app. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) console.error('Screen crashed', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <ErrorState
            title="Something broke on this screen"
            sub="We’ve logged it. Reloading usually fixes it."
            action="Reload"
            onAction={() => {
              this.setState({ error: null })
              window.location.reload()
            }}
          />
        </main>
      )
    }
    return this.props.children
  }
}
