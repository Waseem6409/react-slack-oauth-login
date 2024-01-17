import React from 'react'
import SlackLogo from './SlackLogo'

interface Props {
  clientId: string
  scopes: Array<string>
  onSuccess: (code: string) => void
  onFailure: (error: string) => void
}

function SlackLogin({ clientId, scopes = [], onSuccess, onFailure }: Props) {
  function openPopup(): WindowProxy | null {
    const width = 400
    const height = 600
    const left = screen.width / 2 - width / 2
    const top = screen.height / 2 - height / 2

    const url = `https://slack.com/oauth/v2/authorize?scope=${scopes?.join(',')}&client_id=${clientId}`

    return window.open(
      url,
      '',
      'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
        width +
        ', height=' +
        height +
        ', top=' +
        top +
        ', left=' +
        left,
    )
  }

  function handleClick() {
    polling(openPopup())
  }

  function polling(popup: WindowProxy | null) {
    const polling: NodeJS.Timeout = setInterval(() => {
      try {
        if (!popup || popup?.closed || popup?.closed === undefined) {
          clearInterval(polling)
          onFailure('Popup has been closed by user')
        }

        const closeDialog = () => {
          clearInterval(polling)
          if (popup) {
            popup.close()
          }
        }
        if (!popup?.location?.hostname?.includes('slack.com')) {
          if (popup?.location?.search) {
            const query = new URLSearchParams(popup?.location?.search)
            const slackCode: string | null = query?.get('code')
            const error: string | null = query?.get('code')

            closeDialog()
            if (slackCode !== null) {
              return onSuccess(slackCode)
            } else if (error !== null) {
              return onFailure(error)
            }
          }
        }
      } catch (error) {
        // console.error(error)
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in IE.
      }
    }, 500)
  }

  return (
    <button
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        padding: '10px',
        outline: 'none',
        border: 'none',
        borderRadius: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <SlackLogo width={30} height={30} />
      <h4 style={{ fontWeight: 'normal', marginLeft: '10px' }}>
        Sign in with <span style={{ fontWeight: 'bolder' }}>Slack</span>
      </h4>
    </button>
  )
}

export default SlackLogin
