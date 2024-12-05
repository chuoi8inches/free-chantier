import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useSites } from '@/context/SiteContext';
import { Resource, Status, Team, User } from '@/utils/type';


export default function HomeScreen() {
  const user = useAuth();
  const sites = useSites();

  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("notstarted");
  const [client, setClient] = useState("");
  const [start, setStart] = useState(new Date());
  const [duration, setDuration] = useState(0);
  const [resources, setResources] = useState<Resource[]>([]);
  const [team, setTeam] = useState<Team>(null);
  const [medias, setMedias] = useState<URL[]>([]);
  const [chef, setChef] = useState<User>(null);

  const [description, setDescription] = useState("");
  return (
    <ScrollView>
      {user.account ? (
        <View style={styles.section}>
          <Text style={styles.header}>Add site</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={status}
              onChangeText={(text) => setStatus(text)}
            />
            <Button
              title="Submit"
              onPress={() =>
                sites.add({
                  name,
                  status,
                  client,
                  start,
                  duration,
                  resources,
                  team,
                  medias,
                  chef,
                })
              }
            />
          </View>
        </View>
      ) : (
        <View style={styles.section}>
          <Text>Please login to submit an idea.</Text>
        </View>
      )}
      {/*<View style={styles.section}>
        <Text style={styles.header}>Latest Ideas</Text>
        <View>
          {sites.current.map((idea) => (
            <View key={idea.$id} style={styles.card}>
              <Text style={styles.cardTitle}>{idea.title}</Text>
              <Text style={styles.cardDescription}>{idea.description}</Text>
               Show the remove button to idea owner.
              {user.account && user.account.$id === idea.userId && (
                <Button
                  title="Remove"
                  onPress={() => sites.remove(idea.$id)}
                />
              )}
            </View>
          ))}
        </View>
      </View>*/}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 8,
  },
});
