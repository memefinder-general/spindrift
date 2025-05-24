import React, { forwardRef, useEffect, ElementType } from "react";
import clsx from "clsx";
import { useSpindriftConfig, useBorderDepth } from "./context";
import { DivProps, SpanProps } from "./types";

// Simplified props interface
interface BaseSpindriftProps {
  as?: ElementType;
  from?: boolean;
  to?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Base implementation using the new CSS-only approach
const SpindriftBase = forwardRef<any, BaseSpindriftProps & Record<string, any>>(
  ({ as = "div", from, to, className, children, ...rest }, ref) => {
    const Component = as;
    const config = useSpindriftConfig();
    const { depth, push, pop } = useBorderDepth();

    // Handle depth changes based on from/to props
    useEffect(() => {
      if (from) {
        push();
      }

      // Cleanup function to handle component unmount or prop changes
      return () => {
        if (from && !to) {
          pop();
        }
      };
    }, [from, to, push, pop]);

    // Handle 'to' prop separately to immediately stop borders
    useEffect(() => {
      if (to) {
        pop();
      }
    }, [to, pop]);

    // Determine if borders should be applied
    const shouldApplyBorder = config.enabled && (depth > 0 || from);
    const shouldStopBorders = config.enabled && to;

    // Merge classes using clsx
    const mergedClassName = clsx(
      className,
      shouldApplyBorder && config.className,
      shouldStopBorders && "spindrift-stop",
    );

    return React.createElement(
      Component,
      {
        ref,
        className: mergedClassName,
        ...rest,
      },
      children,
    );
  },
);

SpindriftBase.displayName = "Spindrift";

// Convenience components with proper typing
export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <SpindriftBase as="div" ref={ref} {...props} />
));

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <SpindriftBase as="span" ref={ref} {...props} />
));

Div.displayName = "Div";
Span.displayName = "Span";

export default SpindriftBase;
