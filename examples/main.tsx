import React from "react";
import { createRoot } from "react-dom/client";
import { SpindriftProvider, Div, Span } from "../src";
import "./tailwind.css";

function App() {
  return (
    <SpindriftProvider enabled={true} className="spindrift">
      <div className="p-8 space-y-8">
        <h1 className="text-3xl font-bold">Spindrift Example</h1>

        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Usage</h2>
          <Div from className="p-4 bg-gray-100">
            <p>This div and all its children will have borders</p>
            <div className="mt-2 p-2 bg-white">
              <span>Regular span with border</span>
            </div>
            <Span className="block mt-2 p-2 bg-blue-100">
              Spindrift span with border
            </Span>
          </Div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Nested Control</h2>
          <Div from className="p-4 bg-gray-100">
            <p>This has borders</p>
            <Div to className="mt-2 p-2 bg-white">
              <p>This section has no borders</p>
              <div className="mt-1 p-1 bg-yellow-100">
                Regular div without border
              </div>
              <Div from className="mt-2 p-2 bg-green-100">
                <p>Borders start again here</p>
                <span>And continue to children</span>
              </Div>
            </Div>
            <div className="mt-2 p-2 bg-purple-100">Back to having borders</div>
          </Div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Without Spindrift</h2>
          <div className="p-4 bg-gray-100">
            <p>Regular div without any borders</p>
            <div className="mt-2 p-2 bg-white">
              <span>Regular span without borders</span>
            </div>
          </div>
        </section>
      </div>
    </SpindriftProvider>
  );
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
