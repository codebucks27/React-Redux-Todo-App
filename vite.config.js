import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import browserslistToEsbuild from "browserslist-to-esbuild";

export default defineConfig(({ command, mode, isPreview }) => {
  // CRA only exposed these public variables to the browser.
  const env = loadEnv(mode, process.cwd(), ["REACT_APP_", "PUBLIC_URL"]);
  const isDevelopment = command === "serve" && !isPreview && mode !== "test";
  // Match CRA's getPublicUrlOrPath: development serves assets locally, while
  // production may use a CDN URL or relative asset paths.
  const requestedBase = env.PUBLIC_URL
    ? `${env.PUBLIC_URL.replace(/\/$/, "")}/`
    : "/";
  const base = isDevelopment
    ? requestedBase.startsWith(".")
      ? "/"
      : new URL(requestedBase, "https://create-react-app.dev").pathname
    : requestedBase;
  const publicUrl = base.slice(0, -1);
  const clientEnv = {
    NODE_ENV:
      mode === "test"
        ? "test"
        : isDevelopment
          ? "development"
          : "production",
    PUBLIC_URL: publicUrl,
    ...Object.fromEntries(
      Object.entries(env).filter(([name]) => name.startsWith("REACT_APP_"))
    ),
  };

  return {
    appType: "spa",
    base,
    envPrefix: ["VITE_", "REACT_APP_"],
    define: {
      "process.env": JSON.stringify(clientEnv),
      "process.env.NODE_ENV": JSON.stringify(clientEnv.NODE_ENV),
    },
    plugins: [
      react(),
      {
        name: "cra-public-url",
        transformIndexHtml: {
          order: "pre",
          handler: (html) => html.replaceAll("%PUBLIC_URL%", publicUrl),
        },
      },
    ],
    server: { port: 3000 },
    build: {
      outDir: "build",
      target: browserslistToEsbuild(undefined, { env: "production" }),
      license: { fileName: "third-party-licenses.md" },
      rolldownOptions: {
        output: {
          postBanner:
            "/*! For bundled third-party licenses, see ../third-party-licenses.md. */",
        },
      },
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
      clearMocks: true,
    },
  };
});
