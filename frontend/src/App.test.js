import React from 'react';
import { render } from '@testing-library/react';
import MessageApp from './App';

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  const component = mount(<MessageApp/>)
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('has textbox', () => {
    expect(component.exists('textarea#message_box')).toBe(true)
  })

  it('has submit button', () => {
    expect(component.exists('button#submit')).toBe(true)
  })

  it('has message list', () => {
    expect(component.exists('ul#message_list')).toBe(true)
  })

  it("posts data and clears message box on submit process", () => {
    const component = mount(<MessageApp/>)
    component.find('textarea#message_id').simulate('change', {
      target: {
        value: 'Hello'
      }
    })
    component.find('form').simulate('submit')

    expect(mockAxios.post).tohaveBeenCalledWith("http://localhost:3001/message", {
      "content": "Hello"
    })

    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('')
  })
})