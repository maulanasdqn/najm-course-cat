import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@protected": path.resolve(__dirname, "./src/app/(protected)"),
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("@ant-design/icons/es")) {
            const match = id.match(/@ant-design\/icons\/es\/([^/]+)/);
            if (match) {
              return `ant-design-icon-${match[1]}`;
            }
          }
          if (id.includes("@ant-design/icons")) {
            return "ant-design-icons";
          }
          if (id.includes("lodash-es")) {
            const match = id.match(/lodash-es\/([^/]+)/);
            if (match) {
              return `lodash-${match[1]}`;
            }
          }
          if (id.includes("admiral")) {
            return "admiral";
          }
          if (id.includes("lodash")) {
            return "lodash";
          }
          if (id.includes("moment")) {
            return "moment";
          }
          if (id.includes("axios")) {
            return "axios";
          }
          if (id.includes("react-router-dom") || id.includes("react-router")) {
            return "@react-router";
          }
        },
      },
    },
  },
});
