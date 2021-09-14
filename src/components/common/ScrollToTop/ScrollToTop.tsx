import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import ArrowUp from '../../icons/IconArrowUp'
import s from './ScrollToTop.module.scss'


interface ScrollToTopProps {
    visibilityHeight?: number;
}

const ScrollToTop = ({ visibilityHeight = 450 }: ScrollToTopProps) => {
    const [showScrollToTop, setShowScrollToTop] = useState<boolean>();

    function handleVisibleButton() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > visibilityHeight) {
            setShowScrollToTop(true)
        } else {
            setShowScrollToTop(false)
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
        return () => {
            window.removeEventListener("scroll", handleVisibleButton);
        }
    }, []);


    function handleScrollUp() {
        window.scrollTo(0, 0);
    }

    return (
        <div className={classNames(s.scrollToTop, {
            [s.show]: showScrollToTop
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
