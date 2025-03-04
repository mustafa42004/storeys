import { useEffect, useRef } from 'react';
import { startRowAnimation } from '../../../../animations/animation';
import { SLIDER_ITEMS, ANIMATION_CONFIG } from '../../../../animations/contants';

const Slider = () => {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        // Create animations
        const row1Animation = startRowAnimation(row1Ref.current, 'left');
        const row2Animation = startRowAnimation(row2Ref.current, 'right');

        // Cleanup function
        return () => {
            row1Animation.kill();
            row2Animation.kill();
        };
    }, []);

  const renderRow = (rowPrefix, ref) => (
    <div 
        className={rowPrefix} 
        ref={ref} 
        style={{ display: 'flex', gap: ANIMATION_CONFIG.gap }}
    >
      {/* Original set */}
        {SLIDER_ITEMS.map((item) => (
            <div key={`${rowPrefix}-${item.id}`} className="item">
                <img src={item.imgSrc} alt="" />
            </div>
        ))}
        {/* Duplicate set for seamless loop */}
        {SLIDER_ITEMS.map((item) => (
            <div key={`${rowPrefix}-duplicate-${item.id}`} className="item">
                <img src={item.imgSrc} alt="" />
            </div>
        ))}
    </div>
  );

  return (
    <div className="slider mt-5 overflow-hidden">
        {renderRow('row1', row1Ref)}
        {renderRow('row2', row2Ref)}
    </div>
  );
};

export default Slider;