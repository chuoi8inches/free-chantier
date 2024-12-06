import { createContext, useContext, useEffect, useState } from 'react';
import { DATABASE_ID, databases, TEAM_COLLECTION_ID } from '@/libs/appwrite';
import { toast } from '@/libs/toast';
import { useAuth } from '@/context/AuthContext';

interface TeamContextType {
  current: any[];
  add: (team: any) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
const TeamContext = createContext<TeamContextType|undefined>(undefined);
export function TeamProvider(props) {
  const {user} = useAuth();
  const [teams, setTeams] = useState([]);
  async function add(team) {
    console.log("Adding team", team);
    setTeams((teams) => [team, ...teams].slice(0, 10));
  }
  async function remove(id) {
    setTeams((teams) => teams.filter((team) => team.$id !== id));
  }
  async function init() {
    const response = await databases.listDocuments(
      DATABASE_ID,
      TEAM_COLLECTION_ID,
    ).catch((error) => {
        console.error(error);
        toast('Failed to fetch ');
      }
    ).finally(() => {
      console.log("Fetching done");
    });
    setTeams(response.documents);
  }
  useEffect(() => {
    if (user) {
      console.log("User authenticated:", user);
      console.log("Initializing TeamProvider");
      init();
    } else {
      console.log("User not authenticated yet");
    }
  }, [user]);
  return (
    <TeamContext.Provider value={{ current: teams, add, remove}}>
      {props.children}
    </TeamContext.Provider>
  );
}
export function useTeams() {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
}