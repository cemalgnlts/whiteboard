import React from "react";
import ReactDOM from "react-dom/client";

import "@tldraw/tldraw/tldraw.css";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Editor from "./components/editor/Editor";
import ProjectManager from "./components/projectManager";
import CanvasView from "./components/canvasView";

import hljs from "./assets/highlightjs/highlight.js";
import javascript from "./assets/highlightjs/javascript.js";
import css from "./assets/highlightjs/css.js";
import xml from "./assets/highlightjs/xml.js";
import "./assets/highlightjs/atom-one-dark.css";
import "./assets/highlightjs/atom-one-light.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectManager />
  },
  {
    path: "/edit/:id",
    element: <Editor />
  },
  {
    path: "/view/:id",
    element: <CanvasView />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
