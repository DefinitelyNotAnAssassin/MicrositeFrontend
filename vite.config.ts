import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const basenameProd = "/react-shadcn-starter"

export default defineConfig(({ command }) => {
  const isProd = command === "build"

  return {
    base: "https://programmicrosite.vercel.app/",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: isProd ? basenameProd : "",
      },
    },
  }
})
