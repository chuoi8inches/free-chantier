import { Account, Client, Databases } from 'react-native-appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('673fb35f00308b078cf5')
    .setPlatform('fr.istic.freechantier');

export const account = new Account(client);
export const databases = new Databases(client);
export const DATABASE_ID="67406116002f1b725118"
export const SITE_COLLECTION_ID="67421ba3003a0b2b1759"
export const TEAM_COLLECTION_ID="6742206b0023d95cd635"
export const RESOURCE_COLLECTION_ID="6742200d0035464d2ebe"
export const USER_COLLECTION_ID="6740612f0023ed3750bd"
