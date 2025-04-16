import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationFrom?: Record<string, any>;
  animationTo?: Record<string, any>;
  easing?: string;
  threshold?: number;
  rootMargin?: string;
  onLetterAnimationComplete?: () => void;
}

interface AnimatedLetterProps {
  letter: string;
  delay: number;
  inView: boolean;
  animationFrom: Record<string, any>;
  animationTo: Record<string, any>;
  easing: string;
  onAnimationComplete: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  animationFrom = { opacity: 0, transform: 'translate3d(0,50px,0)' },
  animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
  easing = 'easeOutCubic',
  threshold = 0.2,
  rootMargin = '0px',
  onLetterAnimationComplete = () => {},
}) => {
  const [ref, inView] = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  const letters = text.split('');
  const completedAnimations = useRef(0);
  
  const handleAnimationComplete = () => {
    completedAnimations.current += 1;
    if (completedAnimations.current === letters.length) {
      onLetterAnimationComplete();
    }
  };

  return (
    <span ref={ref} className={className}>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={`${letter}-${index}`}
          letter={letter}
          delay={delay * index}
          inView={inView}
          animationFrom={animationFrom}
          animationTo={animationTo}
          easing={easing}
          onAnimationComplete={handleAnimationComplete}
        />
      ))}
    </span>
  );
};

const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  letter,
  delay,
  inView,
  animationFrom,
  animationTo,
  easing,
  onAnimationComplete,
}) => {
  const config = {
    tension: 200,
    friction: 20,
    easing: easing === 'easeOutCubic' 
      ? (t: number) => 1 - Math.pow(1 - t, 3) 
      : undefined,
  };

  const styles = useSpring({
    from: animationFrom,
    to: inView ? animationTo : animationFrom,
    delay,
    config,
    onRest: onAnimationComplete,
  });

  return (
    <animated.span style={styles}>
      {letter === ' ' ? '\u00A0' : letter}
    </animated.span>
  );
};

export default SplitText; 