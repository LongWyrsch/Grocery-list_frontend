// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


// Address the following test error: "Failed to create the resize observer in the ParallaxContoller"
// Install as dev dependency: npm install -D resize-observer-polyfill
// This will ensure that the ResizeObserver API is available in your test environment and that the ParallaxController component will work as expected.
global.ResizeObserver = require('resize-observer-polyfill')




// This takes care of the error "ReferenceError: IntersectionObserver is not defined"
// https://stackoverflow.com/questions/57008341/jest-testing-react-component-with-react-intersection-observer
// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 
// Mock IntersectionObserver
class IntersectionObserver {
    observe = jest.fn()
    disconnect = jest.fn()
    unobserve = jest.fn()
  }
  
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })
  
  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserver,
  })