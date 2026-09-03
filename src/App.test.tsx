import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import App from './App'
import { AppProvider } from './store/AppContext'
import { ToastProvider } from './components/Toast'

function mount(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AppProvider>
    </MemoryRouter>,
  )
}

const seed = (role: 'brand' | 'creator') =>
  localStorage.setItem('salon.state.v1', JSON.stringify({ session: { role, email: 'x@y.co', name: role === 'brand' ? 'Noura Beauty Co.' : 'Mira Alia', company: 'Noura Beauty Co.' }, onboardingComplete: true }))

describe('App routing', () => {
  it('shows the welcome screen to signed-out users and guards app routes', async () => {
    mount('/home')
    expect(await screen.findByText(/The room where brands and creators meet/)).toBeInTheDocument()
  })

  it('lets a user pick a role and reach brand signup', async () => {
    mount('/role')
    const user = userEvent.setup()
    expect(await screen.findByText('Choose your role')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Continue/ }))
    expect(await screen.findByRole('heading', { name: /Create.*brand account/s })).toBeInTheDocument()
  })

  it('renders the brand home with its bottom navigation', async () => {
    seed('brand')
    mount('/home')
    expect(await screen.findByText(/Top priority/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Campaigns' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Create' })).toBeInTheDocument()
  })

  it('renders the creator home with the creator navigation', async () => {
    seed('creator')
    mount('/creator/home')
    expect(await screen.findByText(/brand deals/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Deals' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pitch' })).toBeInTheDocument()
  })

  it('keeps a brand user out of creator routes', async () => {
    seed('brand')
    mount('/creator/deals')
    await waitFor(() => expect(screen.queryByText('Curated brand opportunities for you')).not.toBeInTheDocument())
    expect(await screen.findByText(/Top priority/i)).toBeInTheDocument()
  })

  it('shows the not-found screen for unknown routes', async () => {
    seed('creator')
    mount('/definitely/not/here')
    expect(await screen.findByText(/This room doesn’t exist/)).toBeInTheDocument()
  })

  it('renders the forced error state with a retry action', async () => {
    seed('brand')
    mount('/home?state=error')
    expect(await screen.findByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument()
  })
})
