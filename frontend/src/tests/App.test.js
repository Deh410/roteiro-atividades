import React from 'react';
import MessageApp from '../App';
import mockAxios from '../__mocks__/axios'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('MessageApp', () => {
  beforeEach(function() {
    mockAxios.post.mockImplementation(() => Promise.resolve({
      data: []
    }))
  })

  afterEach(function() {
    mockAxios.post.mockClear()
  })

  it('has message list', () => {
    const component = mount(<MessageApp/>)
    expect(component.exists('ul#message_list')).toBe(true)
  })

  it("posts data and clears message box on submit process", () => {
    const component = mount(<MessageApp/>)
    component.find('textarea#message_box').simulate('change', {
      target: {
        value: 'Hello'
      }
    })
    component.find('form').simulate('submit')

    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", {
      "content": "Hello"
    })

    expect(component.instance().refs.messageFormRef.state.currentMessage).toEqual('')
  })
})