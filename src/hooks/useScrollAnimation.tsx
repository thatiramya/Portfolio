
import { useInView } from "react-intersection-observer";
import { useAnimation, Variant, Variants } from "framer-motion";
import { useEffect } from "react";

interface AnimationVariants extends Variants {
  hidden: Variant;
  visible: Variant;
}

export const useScrollAnimation = (threshold = 0.1, delay = 0) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return {
    ref,
    controls,
    variants: {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.6, ease: "easeOut", delay } 
      }
    } as AnimationVariants
  };
};
