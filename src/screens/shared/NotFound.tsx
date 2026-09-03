import { useNavigate } from 'react-router-dom'
import { Compass01Icon } from '@hugeicons/core-free-icons'
import { Page } from '../../components/Page'
import { Wordmark } from '../../components/Wordmark'
import { ErrorState } from '../../components/Skeleton'
import { useApp } from '../../store/AppContext'

export default function NotFound() {
  const nav = useNavigate()
  const { state } = useApp()
  const home = !state.session ? '/welcome' : state.session.role === 'brand' ? '/home' : '/creator/home'
  return (
    <Page>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 60 }}>
        <Wordmark size={56} />
      </div>
      <div style={{ marginTop: 40 }}>
        <ErrorState icon={Compass01Icon} title="This room doesn’t exist" sub="The page you’re looking for has moved or was never here." action="Take me home" onAction={() => nav(home, { replace: true })} />
      </div>
    </Page>
  )
}
