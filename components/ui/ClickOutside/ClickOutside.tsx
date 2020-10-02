import React, { FC, MutableRefObject, useEffect, useRef } from 'react'

import { Component } from 'react'
import PropTypes from 'prop-types'

export interface ClickOutsideProps {
  onClickOutside: (e?: MouseEvent) => void
  children: React.ReactNode | any
  render: () => void
}

export default class ClickOutside extends Component<ClickOutsideProps> {
  public domNode: Element | null = null

  handleRef = (element) => {
    this.domNode = element
  }

  public componentDidMount() {
    document.addEventListener('click', this.handleClick, true)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, true)
    document.removeEventListener('touchstart', this.handleClick, true)
  }

  public handleClick = (event) => {
    function hasParent(element, root) {
      return root && root.contains(element)
    }

    if (!hasParent(event.target, this.domNode)) {
      if (typeof this.props.onClickOutside === 'function') {
        this.props.onClickOutside(event)
      }
    }
  }

  render() {
    return null
    // return this.props.render({
    //   innerRef: this.handleRef,
    // });
  }
}
