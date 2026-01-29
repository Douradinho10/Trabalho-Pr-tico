import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ClickButtonProps {
  id: string;
  label: string;
  colorVar: string;
  onClick: () => void;
  isLoading?: boolean;
}

export function ClickButton({ id, label, colorVar, onClick, isLoading }: ClickButtonProps) {
  // Map css var name to actual style for tailwind/framer
  const gradientStyle = {
    background: `linear-gradient(135deg, hsl(var(${colorVar})) 0%, hsl(var(${colorVar}) / 0.8) 100%)`,
    boxShadow: `0 10px 25px -5px hsl(var(${colorVar}) / 0.4), 0 8px 10px -6px hsl(var(${colorVar}) / 0.4)`
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96, y: 0 }}
      onClick={onClick}
      disabled={isLoading}
      style={gradientStyle}
      className={`
        relative overflow-hidden w-full aspect-square md:aspect-[4/3] rounded-2xl
        flex flex-col items-center justify-center
        text-white font-bold text-2xl md:text-3xl tracking-tight
        border border-white/10
        disabled:opacity-80 disabled:cursor-not-allowed
        transition-colors
      `}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {isLoading ? (
        <Loader2 className="w-8 h-8 md:w-10 md:h-10 animate-spin" />
      ) : (
        <>
          <span className="font-mono opacity-60 text-sm mb-1 uppercase tracking-widest">{id}</span>
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}
