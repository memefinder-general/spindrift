import {
  ElementType,
  ReactElement,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

// Polymorphic ref type following Radix pattern
export type PolymorphicRef<E extends ElementType> =
  React.ComponentPropsWithRef<E>["ref"];

// Base props for Spindrift components
export type SpindriftProps<E extends ElementType> = {
  as?: E;
  from?: boolean;
  to?: boolean;
} & React.ComponentPropsWithoutRef<E>;

// Polymorphic component type with correct ref inference
export type SpindriftComponent = <E extends ElementType = "div">(
  props: SpindriftProps<E> & { ref?: PolymorphicRef<E> },
) => ReactElement | null;

// Forward ref component type with display name
export type SpindriftForwardRefComponent = ForwardRefExoticComponent<any> & {
  displayName?: string;
} & SpindriftComponent;

// Specific component prop types
export interface DivProps extends React.ComponentPropsWithoutRef<"div"> {
  from?: boolean;
  to?: boolean;
}

export interface SpanProps extends React.ComponentPropsWithoutRef<"span"> {
  from?: boolean;
  to?: boolean;
}
