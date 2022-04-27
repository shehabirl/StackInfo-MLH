import { useState, useEffect } from 'react';
import './ScrollToTop.css';
import { goUpBtnText } from '../../utils/constants';
const ScrollToTopBtn = () => {
    const [showGoTop, setShowGoTop] = useState(false);

    const handleVisibleButton = () => {
        setShowGoTop(window.pageYOffset > 50)
    }

    const handleScrollUp = () => {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton)
        return () => {
            window.removeEventListener('scroll', handleVisibleButton);
        };
    }, [])

    return (
        <div className={showGoTop ? '' : 'goTopHidden'} onClick={handleScrollUp}>
            <button type={'button'} className={'goTop goTop__Btn'}>
                <span>{goUpBtnText.message}</span>
            </button>
        </div>
    )
}
export default ScrollToTopBtn;