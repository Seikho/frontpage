import * as http from 'http'
import * as express from 'express'
import * as path from 'path'

const app = express()

const router = express.Router()

const staticPath = path.resolve(__dirname, '..', 'front')

app.use(express.static(staticPath))
app.use(router)

const server = http.createServer(app)

const port = process.env.PORT || 3141
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})