import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { CloudSun } from "lucide-react";
import { useEffect } from 'react';

export const LandingPage = ({ onAnimationComplete }) => {


  const loadingProgress = useMotionValue(0);
  const loadingWidth = useTransform(loadingProgress, [0, 100], ['0%', '100%']);

  useEffect(() => {
    const animation = animate(loadingProgress, 100, {
      duration: 3,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(onAnimationComplete, 300);
      }
    });

    return () => {
      animation.stop();
    };
  }, [loadingProgress, onAnimationComplete]);

  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center overflow-hidden font-sans">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-xl w-11/12 p-6 text-center flex flex-col items-center"
      >
        
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            filter: "drop-shadow(0 0 8px rgba(57, 255, 20, 0.8))"
          }}
          transition={{ delay: 0.5, duration: 2, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          >
            <CloudSun className="w-20 h-20 text-green-400" />
          </motion.div>
        </motion.div>

        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1,
            y: 0,
            textShadow: [
              "0 0 10px rgba(57, 255, 20, 0.3)",
              "0 0 25px rgba(57, 255, 20, 1)",
              "0 0 10px rgba(57, 255, 20, 0.3)"
            ]
          }}
          transition={{
            delay: 1.5,
            opacity: { duration: 2 },
            y: { duration: 1.5, ease: "backOut" },
            textShadow: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
          className="text-5xl font-bold tracking-tight text-green-400 mb-20"
        >
          WEATHER<span className="text-white">DASH</span>
        </motion.h1>

       
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <motion.div
            style={{
              width: loadingWidth,
              height: '100%',
              background: 'linear-gradient(90deg, #39ff14, #a2ff80)',
              boxShadow: '0 0 10px rgba(57, 255, 20, 0.6)',
              borderRadius: '9999px',
            }}
            initial={{ width: '0%' }}
          />
        </div>
      </motion.div>
    </div>
  );
};