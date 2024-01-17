import React, { useEffect, useState } from 'react'
import { SlackLogin } from 'react-slack-oauth-login'

function App() {
  return (
    <div>
      <SlackLogin
        onFailure={(data: string) => console.log('fail', data)}
        onSuccess={(data: string) => console.log('success', data)}
        clientId='xxxx.xxxxxxxxxxxxxxx.xxxxx'
        scopes={['chat:write', 'channels:read']}
      />
    </div>
  )
}

export default App
