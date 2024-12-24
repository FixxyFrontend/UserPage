import React from 'react';
import styles from './Marquee.module.css';

interface MarqueeProps {
  text: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({
  text,
  speed = 'normal',
  className = ''
}) => {
  const speedValues = {
    slow: 40,
    normal: 30,
    fast: 20
  };

  const animationDuration = `${text.length * speedValues[speed]}s`;
  const scrollingText = `${text} • `.repeat(20);

  return (
    <div className={`${styles.marqueeContainer} ${className}`}>
      <div
        className={styles.marqueeContent}
        style={{
          animationDuration,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {scrollingText}
      </div>
    </div>
  );
};

export { Marquee };