import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { SlackLogin } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(
      <SlackLogin
        clientId=''
        onFailure={(error) => console.log(error)}
        onSuccess={(data) => console.log(data)}
        scopes={['chat:write']}
      />,
    )
  })
})
