interface Image {
    reference: string
    captionText: string
    original: {
        format: string
        reference: string
    }
}

interface Publication {
    _self: string
    id: string
    kind: string
    status: string
    source: string
    publicationDate: string
    lastUpdated: string
    created: string
    primaryTopic: string
    secondaryTopics: string[]
    heading: string
    byline: string
    headKicker: string
    homepageHead: string
    mainImage?: Image
    videoDescription?: string
    mainVideoId?: string
    posterImage?: Image
    slug: string
    isSponsored: boolean
    redirectUrl: string | null
    blogState: string | null
}