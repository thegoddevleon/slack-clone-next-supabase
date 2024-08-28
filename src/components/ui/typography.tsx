import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extra-bold tracking-tight lg:text-5xl",
      h2: "scroll-m-16 text-3xl font-bold tracking-tight lg:text-4xl",
      h3: "scroll-m-12 text-2xl font-semi-bold tracking-tight lg:text-3xl",
      h4: "scroll-m-10 text-xl font-medium tracking-tight lg:text-2xl",
      h5: "scroll-m-8 text-lg font-normal tracking-tight lg:text-xl",
      h6: "scroll-m-6 text-base font-normal tracking-tight lg:text-xl",
      p: "scroll-m-4 text-sm font-normal tracking-tight lg:text-base",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { typographyVariants, Typography };
