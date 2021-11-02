import { MigrationModule } from '@kentico/kontent-cli';

import input from "./input.json"
import { getAllContentItems, getAllContentTypes } from "./kontentHelper"

/**
 * Loads typesToRemove from input.json
 * Removes referenced content types (is possible)
 */
const migration: MigrationModule = {
    order: 2,
    run: async (apiClient) => {
        const typesToRemove = input.typesToRemove

        if (!Array.isArray(typesToRemove)){
            console.log('No content types to remove...');
            return
        }

        // get all content items
        const allContentItems = (await getAllContentItems(apiClient))

        // get all content types
        const allContentTypes = (await getAllContentTypes(apiClient))

        for (let i=0; i<typesToRemove.length; i++){
            try {
                const currentType = typesToRemove[i]

                // get current type ID
                const typeId = allContentTypes.find(type => type.codename == currentType)?.id
                if (!typeId){
                    console.log(`Content type '${currentType}' does not exist.`)
                    continue
                }

                // find all content items of the type
                const contentItems = allContentItems.filter(item => item.type.id == typeId)

                // remove all content items
                if (contentItems.length > 0){
                    for (let j=0; j<contentItems.length; j++){
                        try {
                            await apiClient
                                .deleteContentItem()
                                .byItemCodename(contentItems[j].codename)
                                .toPromise()
                            console.log(`Removed item '${contentItems[j].codename}'`)
                        } catch (error) {
                            console.log(`Error trying to remove content item '${contentItems[j].codename}':`)
                            console.log(error)
                        }
                    }
                } else {
                    console.log(`Content type '${currentType}' is not used by any content item.`)
                }

                // remove the type
                await apiClient
                    .deleteContentType()
                    .byTypeCodename(currentType)
                    .toPromise()
                
                console.log(`Removed content type '${currentType}'`)
            } catch (error) {
                console.log(`Error trying to remove content type '${typesToRemove[i]}':`)
                console.log(error)
            }
        }
    },
};

export default migration;
