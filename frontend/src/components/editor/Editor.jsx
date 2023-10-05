import { useState, useLayoutEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import {
  Tldraw,
  createTLStore,
  defaultShapeUtils,
  throttle
} from "@tldraw/tldraw";

import { getAssetUrls } from "@tldraw/assets/selfHosted";

import { isStoreUpdateEmpty, uploadAsset } from "../../libs/utils";

import { customShapeUtils, customTools } from "../../shapes";

import CustomUI from "./CustomUI";

const assetUrls = getAssetUrls({
  baseUrl: "/assets/"
});

const allShapeUtils = [...defaultShapeUtils, ...customShapeUtils];

export default function Editor() {
  const { id: projectId } = useParams();
  const [store] = useState(() => createTLStore({ shapeUtils: allShapeUtils }));
  const [status, setStatus] = useState({
    loading: true,
    error: false,
    message: ""
  });

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

    const saveSnapshot = async () => {
      let snapshot = JSON.stringify(store.getSnapshot());

      const req = await fetch(`/api/snapshot/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: snapshot
      });

      if (!req.ok) {
        alert("Changes could not be saved! (Check developer console).");
        console.error(req.status, req.statusText);

        return;
      }

      const res = await req.json();

      if (!res.status) {
        alert(`Changes could not be saved! (${res.message}).`);
        console.error(res.message);
      }
    };

    const unlisten = store.listen(
      throttle((res) => {
        if (isStoreUpdateEmpty(res)) return;

        saveSnapshot();
      }, 500)
    );

    loadSnapshot();

    return () => unlisten();
  }, [store]);

  const onMount = useCallback((editor) => {
    // When a user uploads a file, create an asset from it
    editor.registerExternalAssetHandler("file", async ({ file }) => {
      let asset = null;

      try {
        asset = uploadAsset(projectId, file);
      } catch (err) {
        console.error(err);
      }

      return asset;
    });
  }, []);

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
    <Tldraw
      assetUrls={assetUrls}
      shapeUtils={customShapeUtils}
      tools={customTools}
      onMount={onMount}
      store={store}
      autoFocus
      hideUi
    >
      <CustomUI />
    </Tldraw>
  );
}
