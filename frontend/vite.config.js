import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode }) => {

  const env = loadEnv(mode, process.cwd(), ""); // empty prefix => include all
  console.log("VITE_DEBUG:", env.VITE_DEBUG);

  return {
    plugins: [react()],

    server: {

      ...(env.VITE_DEBUG === "true"
        ? {
            proxy: {
              "/api": {
                target: "https://adventure-ai-backend.onrender.com",
                changeOrigin: true,
                secure: false,
              },
            },
          }
        : {}),
    },
  };
});
