import { useState, useEffect } from "react";

const SMALL_MOBILE_BREAKPOINT = 360;
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1280;

export default function useIsMobile(){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);
    const [isTablet, setIsTablet] = useState(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT);
    const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= SMALL_MOBILE_BREAKPOINT);

    useEffect(()=>{
        const handleResize = () => {
            setIsSmallMobile(window.innerWidth <= SMALL_MOBILE_BREAKPOINT);
            setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
            setIsTablet(window.innerWidth > MOBILE_BREAKPOINT && window.innerWidth <= TABLET_BREAKPOINT);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet, isSmallMobile };
}