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
    mockAxios.get.mockImplementation(() => Promise.resolve({
      data: [{
        id: 1,
        content: 'hello',
        date: '2000'
      }]
    }))
  })


  afterEach(function() {
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
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

  it("Loads data from api", () => {
    mount(<MessageApp/>)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })
})