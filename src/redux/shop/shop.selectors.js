import memoize from 'lodash.memoize'
import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector([selectShop], shop => shop.collections);

export const selectCollectionsForPreview = createSelector([selectCollections], collections => {
    return Object.keys(collections).map(key => collections[key])
});

export const selectCollection = memoize(collectionUrlParam => {
    return createSelector([selectCollections], collections => collections[collectionUrlParam])
});