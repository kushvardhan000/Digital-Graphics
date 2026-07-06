import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { Navbar } from "./components/layout/Navbar.tsx"
import { Footer } from "./components/layout/Footer.tsx"
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <main className="relative">
          <App />
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)