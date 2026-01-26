import express from "express"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/api/catfact", async (req, res) => {
  try {
    const response = await fetch("https://catfact.ninja/fact")
    const data = await response.json()

    res.json({ fact: data.fact })
  } catch (err) {
    res.status(500).json({ error: "cant fetch fact" })
  }
})

app.listen(3000, () => {
  console.log("Backend listening on http://localhost:3000")
})
