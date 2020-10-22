import React from 'react'
import MessageForm from '../components/MessageForm/messageForm'

import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow } from 'enzyme'

Enzyme.configure({ adapter: new Adapter() })

describe('Form', () => {
  const component = mount(<MessageForm/>)
  it('renders without crashing', () => {
    expect(component).toMatchSnapshot()
  })

  it('has textbox', () => {
    expect(component.exists('textarea#message_box')).toBe(true)
  })

  it('has submit button', () => {
    expect(component.exists('button#submit')).toBe(true)
  })

  it("should update state message when text entered", () => {
    const component = shallow(<MessageForm/>)
    component.find('textarea#message_box').simulate('change', {
      target: {
        value: "Hello"
      }
    })
    expect(component.state('currentMessage')).toEqual("Hello")
  })

  it("clears message box on submit", () => {
    const component = mount(<MessageForm
      submitMessage={function(item){
        return true
      }}
    />)
    component.find('textarea#message_box').simulate('change', {
      target: {
        value: "Hello"
      }
    })
    expect(component.state('currentMessage')).toEqual("Hello")
    component.find('form').simulate('submit')
    expect(component.find('textarea#message_box').props().value).toEqual('')
    expect(component.state('currentMessage')).toEqual('')
  })
})