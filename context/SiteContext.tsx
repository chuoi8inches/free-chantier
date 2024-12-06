import { ID, Permission, Role } from 'react-native-appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { account, DATABASE_ID, databases, SITE_COLLECTION_ID } from '@/libs/appwrite';
import { toast } from '@/libs/toast';
import { useAuth } from '@/context/AuthContext';

// Define the shape of the site context
interface SiteContextType {
  current: any[];
  add: (site: any) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const SitesContext = createContext<SiteContextType|undefined>(undefined);

export function SitesProvider(props) {
  const {user} = useAuth();
  const [sites, setSites] = useState([]);

  async function add(site) {
    console.log("Adding site", site);
    const response = await databases.createDocument(
      DATABASE_ID,
      SITE_COLLECTION_ID,
      ID.unique(),
      {...site},
      [Permission.write(Role.user(site.userId))]
    )
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
    console.log("init called");
    const session = await account.get();
    console.log("Active session", session);
    const response = await databases.listDocuments(
      DATABASE_ID,
      SITE_COLLECTION_ID,
    ).catch((error) => {
      console.error(error);
      toast('Failed to fetch sites');
      }
    ).finally(() => {
      console.log("Fetching sites done");
    });
    console.log("response", response);
    setSites(response.documents);
    console.log("sites", sites);
  }

  useEffect(() => {
    console.log("useEffect called");
    if (user) {
      console.log("User authenticated:", user);
      console.log("Initializing SitesProvider");
      init();
    } else {
      console.log("User not authenticated yet");
    }
  }, [user]);



  return (
    <SitesContext.Provider value={{ current: sites, add, remove}}>
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
