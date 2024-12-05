import { ID, Permission, Query, Role } from 'react-native-appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { DATABASE_ID, databases, SITE_COLLECTION_ID } from '@/libs/appwrite';
import { toast } from '@/libs/toast';

// Define the shape of the site context
interface SiteContextType {
  current: any[];
  add: (site: any) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const SitesContext = createContext<SiteContextType|undefined>(undefined);

export function SitesProvider(props) {
  const [sites, setSites] = useState([]);

  async function add(site) {
    const response = await databases.createDocument(
      DATABASE_ID,
      SITE_COLLECTION_ID,
      ID.unique(),
      site,
      [Permission.write(Role.user(site.userId))]
    );
    toast('Site added');
    setSites((sites) => [response, ...sites].slice(0, 10));
  }

  async function remove(id) {
    await databases.deleteDocument(DATABASE_ID,SITE_COLLECTION_ID, id);
    toast('Site removed');
    setSites((sites) => sites.filter((site) => site.$id !== id));
    await init(); // Refetch sites to ensure we have 10 items
  }

  async function init() {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SITE_COLLECTION_ID,
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
export const useSites = () => {
  const context = useContext(SitesContext);
  if (!context) {
    throw new Error('useSites must be used within a SitesProvider');
  }
  return context;
}
