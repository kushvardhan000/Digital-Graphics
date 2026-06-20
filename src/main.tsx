import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Navbar } from "./components/layout/Navbar.tsx"
import { Footer } from "./components/layout/Footer.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Navbar />
        <main className="relative">
          <App />
        </main>
        <Footer />
    </ThemeProvider>
  </StrictMode>
)
