import { useEffect, useRef } from "react";
import { FabricEngine } from "./fabric";
import "./styles.css";

const numberOfRects = [
  500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 128000, 256000, 512000,
  1024000,
];

export default function App() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const engine = new FabricEngine();
    engine.render();
  });

  return (
    <div>
      <main>
        <div>
          <p>
            <a href="https://github.com/slaylines/canvas-engines-comparison">
              slaylines/canvas-engines-comparison
            </a>
          </p>
        </div>
        <div className="count-selector">
          <div>Count</div>
          {numberOfRects.map((rects) => (
            <a href="">{rects}</a>
          ))}
        </div>
      </main>
      <footer>
        Thanks to{" "}
        <a href="https://slaylines.io" target="_blank">
          <img src="/logo.svg" />
        </a>
        <span>©&nbsp;#{new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
