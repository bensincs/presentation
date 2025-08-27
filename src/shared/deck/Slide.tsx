import { motion } from "framer-motion";
import { variants } from "../motion/presets";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  transition?: keyof typeof variants;
  className?: string;
}>;

export default function Slide({
  children,
  transition = "fade",
  className = "",
}: Props) {
  const v = variants[transition] || variants.fade;
  return (
    <div className="w-full h-full px-4 pt-15">
      <motion.div
        className={`h-full grid items-center ${className} overflow-scroll pb-20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={v}
        transition={
          (v as any).transition || { duration: 0.45, ease: "easeOut" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
