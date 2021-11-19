import React, {
    Children,
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
      cloneElement,
  } from 'react'
  import s from './TabCommon.module.scss'
  
  import TabItem from  './components/TabItem/TabItem'
  import { TabPaneProps } from './components/TabPane/TabPane'
  import classNames from 'classnames'
  
  interface TabCommonProps {
    defaultActiveTab?: number
    children?: React.ReactNode
    center?:boolean
  }
  
  const TabCommon = ({
    defaultActiveTab = 0,
    children,
    center
  }: TabCommonProps) => {
    const [active, setActive] = useState(0)
    const slider = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLUListElement>(null)
    useEffect(() => {
      setActive(defaultActiveTab)
    }, [defaultActiveTab])
  
    useEffect(() => {
      slide(active)
    }, [active])
  
    function slide(index: number) {
      const active = headerRef.current?.children
        .item(index)
        ?.getBoundingClientRect()
          const header = headerRef.current?.getBoundingClientRect()
      const current = slider.current
      if (current && active && header) {
        let width = active.width - 24 <= 0 ? 24 : active.width - 24
        let left = active.left - header.left
        current.style.width = width.toString() + 'px'
        current.style.left = left.toString() + 'px'
      }
    }
    const onTabClick = (index: number) => {
      setActive(index)
    }
    return (
      <section className={s.tabWapper}>
        <div className={s.tabHeader}>
          <ul className={classNames(s.tabList,{[s.center]:center})} ref={headerRef}>
            {Children.map(children, (tab, index) => {
              let item = tab as ReactElement<PropsWithChildren<TabPaneProps>>
              return (
                <li key={item?.props.tabName}>
                  <TabItem
                    active={active === index}
                    onClick={onTabClick}
                    tabIndex={index}
                  >
                    {item?.props.tabName}
                  </TabItem>
                </li>
              )
            })}
          <div ref={slider} className={s.slider}></div>
          </ul>
        </div>
        <div className={s.tabBody}>
                  {Children.map(children, (tab, index) => {
                      let item = tab as ReactElement<PropsWithChildren<TabPaneProps>>
                      return cloneElement(item, { active:index===active });
                  })
              }</div>
      </section>
    )
  }
  
  export default TabCommon
