import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

const app = express()

app.use(cors())
app.use(express.json())


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.get("/api/catfact", async (req, res) => {
  try {
    const response = await fetch("https://catfact.ninja/fact")
    const data = await response.json()
    res.json({ fact: data.fact })
  } catch {
    res.status(500).json({ error: "cant fetch fact" })
  }
})

// frontend static serving
const frontendPath = path.join(
  __dirname,
  "../Practice_ec2_frontend/dist"
)

app.use(express.static(frontendPath))

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"))
})


app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000")
})
