import { ID, Permission, Role } from 'react-native-appwrite';
import { createContext, useContext, useEffect, useState } from 'react';
import { DATABASE_ID, databases, RESOURCE_COLLECTION_ID } from '@/libs/appwrite';
import { toast } from '@/libs/toast';
import { useAuth } from '@/context/AuthContext';

// Define the shape of the resource context
interface ResourceContextType {
  current: any[];
  add: (resource: any) => Promise<void>;
  remove: (id: string) => Promise<void>;
}

const ResourceContext = createContext<ResourceContextType|undefined>(undefined);

export function ResourceProvider(props) {
  const {user} = useAuth();
  const [resources, setResources] = useState([]);

  async function add(resource) {
    const response = await databases.createDocument(
      DATABASE_ID,
      RESOURCE_COLLECTION_ID,
      ID.unique(),
      {...resource},
      [Permission.write(Role.user(resource.userId))]
    )
    toast('Resource added');
    setResources((resource) => [response, ...resource].slice(0, 10));
  }

  async function remove(id) {
    await databases.deleteDocument(DATABASE_ID,RESOURCE_COLLECTION_ID, id);
    toast('Resource removed');
    setResources((resources) => resources.filter((resource) => resource.$id !== id));
    await init();
  }

  async function init() {
    const response = await databases.listDocuments(
      DATABASE_ID,
      RESOURCE_COLLECTION_ID,
    ).catch((error) => {
        console.error(error);
        toast('Failed to fetch ');
      }
    ).finally(() => {
      console.log("Fetching done");
    });
    setResources(response.documents);
  }

  useEffect(() => {
    console.log("useEffect called");
    if (user) {
      console.log("User authenticated:", user);
      console.log("Initializing ResourceProvider");
      init();
    } else {
      console.log("User not authenticated yet");
    }
  }, [user]);



  return (
    <ResourceContext.Provider value={{ current: resources, add, remove}}>
      {props.children}
    </ResourceContext.Provider>
  );
}
export const useResource = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error('useResource must be used within a ResourceProvider');
  }
  return context;
}
