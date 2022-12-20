import { motion } from "framer-motion";
import { FC } from "react";

interface AnimationProps {
  duration: number;
  delay?: number;
  style?: any;
  children?: React.ReactNode;
}

const TextAnimationWrapper: FC<AnimationProps> = ({
  duration,
  delay = 0,
  children,
  style,
}) => (
  <motion.div
    transition={{ type: "spring", duration: duration, delay: delay }}
    style={{
      marginLeft: -40,
      opacity: 0,
      ...style,
    }}
    animate={{
      x: 40,
      opacity: 1,
    }}
  >
    {children}
  </motion.div>
);

export default TextAnimationWrapper;
