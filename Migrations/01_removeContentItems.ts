import { MigrationModule } from '@kentico/kontent-cli';

import input from "./input.json"

/**
 * Loads itemsToRemove from input.json
 * Removes references content items (is possible)
 */
const migration: MigrationModule = {
    order: 1,
    run: async (apiClient) => {
        const itemsToRemove = input.itemsToRemove

        if (!Array.isArray(itemsToRemove)){
            console.log('No content items to remove...');
            return;
        }

        for (let i=0; i<itemsToRemove.length; i++){
            try {
                await apiClient
                    .deleteContentItem()
                    .byItemCodename(itemsToRemove[i])
                    .toPromise()
                console.log(`Removed item '${itemsToRemove[i]}'`)
            } catch (error) {
                console.log(`Error trying to remove content item '${itemsToRemove[i]}':`)
                console.log(error)
            }
        }
    },
};

export default migration;
