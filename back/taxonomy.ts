import fetch from 'node-fetch'

interface TaxonomyResponseItem {
    id: string
    topic: string
    parentId: string | null
    seoTitle: string
    seoDescription: string
    title: string
    lastModified: string
    metadata: { [key: string]: string }
}

interface TaxonomyResponse {
    firstLevel: TaxonomyResponseItem[]
    secondLevel: TaxonomyResponseItem[]
}

let cache: Taxonomy | null = null
let lastModified = Date.now()

export default async function getTaxonomy() {
    if (!isCacheOld()) {
        return cache
    }

    const res = await fetch('https://content.thewest.com.au/taxonomy')
    const json = await res.json() as TaxonomyResponse
    
    const taxonomy: Taxonomy = []

    for (const topic of json.firstLevel) {
        taxonomy.push(toTopic(topic))

        const secondLevels = json.secondLevel
            .filter(t => t.parentId === topic.id)
            .sort((left, right) => left.topic > right.topic ? 1 : -1)
        
        for (const subTopic of secondLevels) {
            taxonomy.push(toTopic(subTopic))
        }
    }

    cache = taxonomy
    return taxonomy
}

function toTopic(topic: TaxonomyResponseItem): TaxonomyItem {
    return {
        id: topic.id,
        topic: topic.topic,
        title: topic.title,
        parentId: topic.parentId
    }
}

function isCacheOld() {
    // Is the cache over an hour old or not yet defined
    return (Date.now() - lastModified) > 3600000 || cache === null
}