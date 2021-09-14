import React, { useState, useEffect, MutableRefObject } from 'react'
import classNames from 'classnames'
import s from './ScrollToTop.module.scss'

import ArrowUp from '../../icons/IconArrowUp'

interface ScrollToTopProps {
    visibilityHeight?: number;
}

const ScrollToTop = ({ visibilityHeight=450 }: ScrollToTopProps) => {

    const [scrollPosition, setSrollPosition] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState("hide");

    function handleVisibleButton() {
        const position = window.pageYOffset;
        setSrollPosition(position);
    
        if (scrollPosition > visibilityHeight) {
          return setShowScrollToTop("show")
        } else if (scrollPosition < visibilityHeight) {
          return setShowScrollToTop("hide");
        }
    };

    function handleScrollUp() {
        window.scrollTo(0, 0);
    }

    function addEventScroll() {
        window.addEventListener("scroll", handleVisibleButton);
    }

    useEffect(() => {
        addEventScroll();
    }, []);    

    return (
        <div className={classNames(s.scrollToTop, {
            [s[`${showScrollToTop}`]]: showScrollToTop
          })}
          onClick={handleScrollUp}
          >
            <button className={s.scrollToTopBtn}>
                <ArrowUp />
            </button>
        </div>
    )

}

export default ScrollToTop
