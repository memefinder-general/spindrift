import React, { forwardRef, ElementType } from "react";
import clsx from "clsx";
import { useSpindriftConfig, useBorderDepth } from "./context";
import { DivProps, SpanProps } from "./types";

interface BaseSpindriftProps {
  as?: ElementType;
  from?: boolean;
  to?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Stateless, server-safe implementation.
 *
 * Algorithm:
 *   parentDepth = depth value from context
 *   currentApplies = enabled && (parentDepth > 0 || from)
 *   nextDepth =
 *     • if `to`   → 0   (stop borders for descendants)
 *     • else      → parentDepth + (from ? 1 : 0)
 */
const SpindriftBase = forwardRef<any, BaseSpindriftProps & Record<string, any>>(
  ({ as = "div", from, to, className, children, ...rest }, ref) => {
    const Component = as;
    const config = useSpindriftConfig();
    const parentDepth = useBorderDepth();

    const currentApplies = config.enabled && (parentDepth > 0 || !!from); // Ensure 'from' is treated as boolean
    const nextDepth = to ? 0 : parentDepth + (from ? 1 : 0);
    const currentDepth = from ? parentDepth + 1 : parentDepth;

    const mergedClassName = clsx(
      className,
      currentApplies && config.className,
      to && "spindrift-stop",
    );

    return (
      <Component
        ref={ref}
        {...(currentApplies && { "data-spd-depth": currentDepth })}
        className={mergedClassName}
        {...rest}
      >
        {/* Descendants read the updated depth synchronously */}
        <BorderDepthProvider value={nextDepth}>{children}</BorderDepthProvider>
      </Component>
    );
  },
);

SpindriftBase.displayName = "Spindrift";

/* Helper so we can reuse the provider inline without exporting it */
const BorderDepthProvider = React.createContext(0).Provider;

/* Convenience wrappers */
export const Div = forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <SpindriftBase as="div" ref={ref} {...props} />
));
Div.displayName = "Div";

export const Span = forwardRef<HTMLSpanElement, SpanProps>((props, ref) => (
  <SpindriftBase as="span" ref={ref} {...props} />
));
Span.displayName = "Span";

export default SpindriftBase;
