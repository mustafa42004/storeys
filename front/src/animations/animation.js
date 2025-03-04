import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const startRowAnimation = (element, direction) => {
    const startX = direction === 'left' ? '0%' : '-50%';
    const endX = direction === 'left' ? '-50%' : '0%';
  
    return gsap.fromTo(element,
        { x: startX },
        {
            x: endX,
            duration: 15,
            ease: "none",
            repeat: -1,
            runBackwards: false
        }
    );
};

export const startCardAnimation = (element, index) => {
    gsap.registerPlugin(ScrollTrigger);

        // Different y offset based on index
        const yOffset = 100 + (index * 15);
        const yOffsetNormal = -0 + (index * 5);

        gsap.fromTo(element, {
            y: yOffset,
        }, {
            y: yOffsetNormal,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
                toggleActions: "play none none reverse"
            }
        });
};
