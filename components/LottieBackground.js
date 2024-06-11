// LottieBackground.js
import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const LottieBackground = ({ animationData }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const animationInstance = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData,
        });

        return () => {
            animationInstance.destroy();
        };
    }, [animationData]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: -10,
                left: -10,
                width: '120%',
                height: '120%',
                zIndex: -1,
                transform: 'scale(1.4)', // Adjust the scale value as needed
                transformOrigin: 'center center',
            }}
        />
    );
};

export default LottieBackground;
