import React, {
  cloneElement,
  ElementType,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";


type SpindriftProps<E extends ElementType = "div"> = {
  as?: E;
  /** Anything you would normally nest inside a component */
  children?: ReactNode;
  /** Start spindrift from this element */
  from?: boolean;
  /** Stop spindrift at this element */
  to?: boolean;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "children">;

/* ------------------------------------------------------------------
 * Internal implementation — kept separate so we can wrap it with a
 * properly typed forwardRef while preserving the polymorphic `as` prop
 * -----------------------------------------------------------------*/
function SpindriftBase<E extends ElementType = "div">(
  {
    as,
    children,
    from,
    to,
    ...rest
  }: SpindriftProps<E>,
  ref: React.Ref<any>
) {
  const Component = (as || "div") as E;

  const attach = (node: ReactNode, shouldApplyBorder: boolean = false): ReactNode => {
    if (Array.isArray(node)) return node.map(child => attach(child, shouldApplyBorder));

    if (isValidElement(node)) {
      const nodeProps = node.props as any;
      
      // Check if this element has from or to props
      const hasFrom = nodeProps.from === true;
      const hasTo = nodeProps.to === true;
      
      // Update border application state
      let newShouldApplyBorder = shouldApplyBorder;
      if (hasFrom) {
        newShouldApplyBorder = true;
      }
      if (hasTo) {
        newShouldApplyBorder = false;
      }
      
      // Apply border if we should
      const combined = newShouldApplyBorder 
        ? [nodeProps.className, "border border-dashed"]
            .filter(Boolean)
            .join(" ")
        : nodeProps.className;
      
      const clonedChildren = attach(nodeProps.children, newShouldApplyBorder);
      
      return cloneElement(
        node as ReactElement<any>,
        combined ? { className: combined } : {},
        clonedChildren
      );
    }
    return node;
  };

  // Start with border application if this root element has from=true
  const initialShouldApplyBorder = from === true;

  const componentProps = { ref, ...rest } as any;
  
  // Apply border to root component if from=true
  if (from === true) {
    const existingClassName = componentProps.className || '';
    componentProps.className = [existingClassName, "border border-dashed"]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <Component {...componentProps}>
      {attach(children, initialShouldApplyBorder)}
    </Component>
  );
}

/** Polymorphic component type with correct `ref` inference */
type SpindriftComponent = <E extends ElementType = "div">(
  props: SpindriftProps<E> & { ref?: React.Ref<any> }
) => React.ReactElement | null;

// Wrap the impl with forwardRef and cast so callers get good typing
const Spindrift = React.forwardRef(SpindriftBase) as SpindriftComponent;

(Spindrift as any).displayName = "Spindrift";

export interface DivProps extends React.ComponentPropsWithoutRef<"div"> {
  from?: boolean;
  to?: boolean;
}
export interface SpanProps extends React.ComponentPropsWithoutRef<"span"> {
  from?: boolean;
  to?: boolean;
}

export const Div = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => (
  <Spindrift as="div" ref={ref} {...props} />
));

export const Span = React.forwardRef<HTMLSpanElement, SpanProps>(
  (props, ref) => <Spindrift as="span" ref={ref} {...props} />
);

Div.displayName = "Div";
Span.displayName = "Span";

export default Spindrift;
