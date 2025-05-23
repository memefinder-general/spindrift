import React from "react";
import { createRoot } from "react-dom/client";
import "../src/Spindrift";
import "./tailwind.css";

import { Div, Span } from "../src/index";

function App() {
  return (
    <div className="p-8 min-h-screen flex flex-col gap-8">
      <h1 className="text-2xl uppercase tracking-widest">Spindrift Examples</h1>

      <section>
        <h2 className="text-lg font-semibold mb-4">Basic Usage</h2>
        <Div>
          No border for this <code>Div</code>.
          <Span>
            Or this <code>Span</code>.
          </Span>
        </Div>
        <Div from>
          This <code>Div</code> does gets a border and...
          <Span>
            This <code>Span</code> within it does as well because it's nested
            within a spindrift <code>div</code> with <code>from</code> set.
          </Span>
        </Div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Nesting</h2>
        <Div from className="flex flex-col gap-4">
          This <code>Div</code> gets a border.
          <Div className="flex flex-col gap-4 p-4">
            <p>
              This is a <code>p</code> tag in a spindrift <code>div</code> that
              gets a border as it's nested within a spindrift <code>Div</code>{" "}
              with <code>from</code> set.
            </p>
            <div>
              This is a normal <code>div</code> that also gets a border because
              it's nested within a spindrift <code>Div</code>.
            </div>
          </Div>
        </Div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">
          <code>To</code> and <code>From</code>
        </h2>
        <Div from className="flex flex-col gap-4 p-4">
          <div>
            This container gets a border because it has <code>from</code> set on
            its immediate parent
          </div>
          <div className="m-4">
            So does this element
            <div className="m-4">
              and this element
              <Div to className="m-4">
                But it stops here because this container has <code>to</code>{" "}
                set.
              </Div>
            </div>
          </div>
        </Div>
      </section>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
