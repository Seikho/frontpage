import { RequestHandler } from 'express'
import fetch from 'node-fetch'

const handler: RequestHandler = async (req, res) => {
    const topics: string[] = Array.isArray(req.query.topics)
        ? req.query.topics
        : [req.query.topics]

    const query = '?' + topics.map(topic => `topics=${topic}`).join('&')
    const content = await fetch('https://content.thewest.com.au/publication?' + query)
        .then(res => res.json()) as Response
    
    res.json(content.documents)
}

interface Response {
    page_size: number
    page: number
    total: number
    documents: Publication[]
}

export default handler