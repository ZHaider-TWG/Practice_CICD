import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

app.use(cors())
app.use(express.json())

// ===== FIX __dirname FOR ES MODULES =====
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ===== API ROUTE =====
app.get("/api/catfact", async (req, res) => {
  try {
    const response = await fetch("https://catfact.ninja/fact")
    const data = await response.json()
    res.json({ fact: data.fact })
  } catch (err) {
    res.status(500).json({ error: "cant fetch fact" })
  }
})

// ===== SERVE FRONTEND BUILD =====
const frontendPath = path.join(__dirname, "../frontend/dist")

app.use(express.static(frontendPath))

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"))
})

// ===== START SERVER =====
app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000")
})
