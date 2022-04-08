const express = require("express")
const imagesRouter = require("./routes/imagesRouter")

require("dotenv").config()

app = express()

app.use("/images", express.static(__dirname  + "/images"))
app.use("/images", imagesRouter)

app.listen(port=process.env.PORT || 8080, () => {
    console.log(`server listen on localhost:${port}`)
})