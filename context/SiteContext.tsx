import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { databases } from '@/libs/appwrite';
import { toast } from '@/libs/toast';

export const IDEAS_DATABASE_ID = "67406116002f1b725118";
export const IDEAS_COLLECTION_ID = "67421ba3003a0b2b1759";

const SitesContext = createContext(undefined);

export function useSites() {
  return useContext(SitesContext);
}

export function SitesProvider(props) {
  const [sites, setSites] = useState([]);

  async function add(site) {
    const response = await databases.createDocument(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      ID.unique(),
      site,
      [Permission.write(Role.user(site.userId))]
    );
    toast('Site added');
    setSites((sites) => [response, ...sites].slice(0, 10));
  }

  async function remove(id) {
    await databases.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id);
    toast('Site removed');
    setSites((sites) => sites.filter((site) => site.$id !== id));
    await init(); // Refetch sites to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      IDEAS_DATABASE_ID,
      IDEAS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    setSites(response.documents);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <SitesContext.Provider value={{ current: sites, add, remove }}>
      {props.children}
    </SitesContext.Provider>
  );
}
