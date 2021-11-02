import { ContentItemModels, ContentTypeModels, ManagementClient } from "@kentico/kontent-management";

export async function getAllContentItems(apiClient: ManagementClient) : Promise<ContentItemModels.ContentItem[]>{
    let allContentItems: ContentItemModels.ContentItem[] = []
    let continuationToken = "";

    console.log('Fetching all content items, this may take a while...')

    do {
        let req = apiClient
            .listContentItems()
        
        if (continuationToken){
            req.xContinuationToken(continuationToken)
        }

        const data = (await req.toPromise()).data

        allContentItems = allContentItems.concat(data.items)
        continuationToken = data.pagination?.continuationToken ?? ""
    }
    while (continuationToken != "")

    console.log(`Fetched ${allContentItems.length} content items.`)

    return allContentItems
}

export async function getAllContentTypes(apiClient: ManagementClient) : Promise<ContentTypeModels.ContentType[]>{
    let allContentTypes: ContentTypeModels.ContentType[] = []
    let continuationToken = "";

    console.log('Fetching all content types, this may take a while...')

    do {
        let req = apiClient
            .listContentTypes()
        
        if (continuationToken){
            req.xContinuationToken(continuationToken)
        }

        const data = (await req.toPromise()).data

        allContentTypes = allContentTypes.concat(data.items)
        continuationToken = data.pagination?.continuationToken ?? ""
    }
    while (continuationToken != "")

    console.log(`Fetched ${allContentTypes.length} content types.`)

    return allContentTypes
}