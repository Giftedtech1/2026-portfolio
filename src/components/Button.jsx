import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden";
  
  const variants = {
    primary: "bg-primary text-[#fdfaf5] shadow-lg shadow-primary/20 hover:shadow-primary/30",
    secondary: "bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20",
    outline: "border-2 border-primary/30 text-main hover:bg-primary/5 hover:border-primary/50",
    ghost: "text-sub hover:text-primary hover:bg-primary/5",
  };

  const sizes = {
    default: "h-12 px-8 py-3",
    sm: "h-10 px-5 text-sm",
    lg: "h-16 px-10 text-lg font-semibold tracking-tight",
    icon: "h-12 w-12",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
});

Button.displayName = "Button";
