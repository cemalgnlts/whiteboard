import { useState, useLayoutEffect, useEffect } from "react";

import { useParams } from "react-router-dom";

import {
  Canvas,
  TldrawEditor,
  createTLStore,
  defaultShapeUtils,
  defaultTools
} from "@tldraw/tldraw";

import { customShapeUtils, customTools } from "../../shapes";

import ViewUI from "./ViewUI";
import { usePreloadAssets } from "../../hooks/usePreloadAssets";

const shapeUtils = [...defaultShapeUtils, ...customShapeUtils];
const tools = [...defaultTools, ...customTools];

const assetUrls = {
  fonts: {
    draw: `/assets/fonts/Shantell_Sans-Normal-SemiBold.woff2`,
    serif: `/assets/fonts/IBMPlexSerif-Medium.woff2`,
    sansSerif: `/assets/fonts/IBMPlexSans-Medium.woff2`,
    monospace: `/assets/fonts/IBMPlexMono-Medium.woff2`
  }
};

function CanvasView() {
  const { id: projectId } = useParams();
  const [store] = useState(() => createTLStore({ shapeUtils }));
  const [editor, setEditor] = useState(null);
  const [status, setStatus] = useState({
    loading: true,
    error: false,
    message: ""
  });
  usePreloadAssets(assetUrls);

  useLayoutEffect(() => {
    const loadSnapshot = async () => {
      setStatus({
        ...status,
        loading: true
      });

      const req = await fetch(`/api/loadSnapshot/${projectId}`);

      if (!req.ok) {
        setStatus({
          ...status,
          loading: false,
          error: true,
          message: `${req.status}:${req.statusText}`
        });

        return;
      }

      const res = await req.json();

      if (!res.status) {
        setStatus({
          ...status,
          loading: false,
          error: true,
          message: res.message
        });

        return;
      }

      if (res.data.store) store.loadSnapshot(res.data);

      setStatus({
        ...status,
        loading: false
      });
    };

    loadSnapshot();
  }, [store]);

  useEffect(() => {
    if (editor === null || status.loading === true) return;

    editor.updateViewportScreenBounds(true);
    editor.zoomToFit();

    if (editor.zoomLevel > 1) editor.resetZoom();
  }, [status]);

  const onMount = (editor) => {
    setEditor(editor);
  };

  if (status.loading === true) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (status.loading === false && status.error) {
    return (
      <div className="center">
        <h2>Error!</h2>
        <p>{status.message}</p>
      </div>
    );
  }

  return (
    <div className="canvas-view tldraw__editor">
      <TldrawEditor
        shapeUtils={shapeUtils}
        tools={tools}
        store={store}
        initialState="hand"
        onMount={onMount}
        autoFocus
      >
        <Canvas />
        <ViewUI />
      </TldrawEditor>
    </div>
  );
}

export default CanvasView;
