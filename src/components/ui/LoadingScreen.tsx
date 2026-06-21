import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  text?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({ text = "Loading...", fullScreen = false }: LoadingScreenProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="w-32 h-32 md:w-48 md:h-48 relative">
        <Lottie 
          animationData={loadingAnimation} 
          loop={true} 
          autoplay={true} 
          className="w-full h-full drop-shadow-[0_0_15px_rgba(244,197,66,0.3)]"
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4C542]"
      >
        {text}
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
        <div className="absolute inset-0 bg-[#F4C542]/5 blur-[120px] -z-10" />
        {content}
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center p-8">
      {content}
    </div>
  );
}
