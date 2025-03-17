"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Types for animation variants
export type CardAnimationVariant = "fade" | "scale" | "slide" | "none";

// Props interfaces
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  useFramerMotion?: boolean;
  animate?: boolean;
  animationVariant?: CardAnimationVariant;
  animationDuration?: "default" | "fast" | "slow";
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: "bottom" | "after-content";
}

// Animation variants
const animationVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  slide: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
};

// Main Card component
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    useFramerMotion = false, 
    animate = false, 
    animationVariant = "fade", 
    animationDuration = "default",
    ...props 
  }, ref) => {
    // Animation duration based on theme variables
    const getDurationClass = () => {
      switch (animationDuration) {
        case "fast": return "transition-fast";
        case "slow": return "transition-slow";
        default: return "transition-default";
      }
    };

    // CSS transition styles for CSS-based animation
    const getCssAnimationClasses = () => {
      if (!animate) return "";
      
      const durationClass = getDurationClass();
      
      switch (animationVariant) {
        case "fade":
          return `${durationClass} transition-opacity animate-in fade-in-0`;
        case "scale":
          return `${durationClass} transition-all animate-in fade-in-0 scale-in-95`;
        case "slide":
          return `${durationClass} transition-all animate-in fade-in-0 slide-in-from-bottom-4`;
        default:
          return "";
      }
    };

    // Card base styles
    const baseStyles = cn(
      "rounded-radius-lg border border-border bg-card text-card-foreground shadow-sm relative",
      animate && !useFramerMotion && getCssAnimationClasses(),
      className
    );

    // Render with Framer Motion if requested
    if (useFramerMotion && animate) {
      const { initial, animate: animateProps, exit } = animationVariants[animationVariant];
      
      const transitionProps = {
        duration: animationDuration === "fast" ? 0.1 : animationDuration === "slow" ? 0.3 : 0.15,
        ease: [0.4, 0, 0.2, 1],
      };
      
      // Extract Framer-specific event handlers to avoid conflicts with standard React handlers
      const { 
        onDrag, onDragStart, onDragEnd, onAnimationStart, onAnimationComplete, 
        ...otherProps 
      } = props as any;
      
      return (
        <AnimatePresence>
          <motion.div
            ref={ref}
            className={baseStyles}
            initial={initial}
            animate={animateProps}
            exit={exit}
            transition={transitionProps}
            {...otherProps}
          />
        </AnimatePresence>
      );
    }

    // Regular div for no animations or CSS-based animations
    return (
      <div
        ref={ref}
        className={baseStyles}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

// Card Header component
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// Card Title component
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

// Card Description component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// Card Content component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0 pb-16", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Card Footer component with positioning options
const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, position = "bottom", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6",
        position === "bottom" 
          ? "absolute bottom-0 left-0 right-0"
          : "pt-0", 
        className
      )}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};