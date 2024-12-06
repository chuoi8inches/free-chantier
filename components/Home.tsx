import React, { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useSites } from '@/context/SiteContext';
import { Resource, Status, Team, User } from '@/utils/type';


export default function HomeScreen() {
  const user = useAuth();
  const {current:sites,add,remove} = useSites();
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
    <View style={styles.container}>
      <FlatList data={sites} renderItem={({ item }) => {
        return (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardDescription}>{item.status}</Text>
            <Button title="Remove" onPress={() => remove(item.$id)} />
          </View>
        )
      }}/>
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
                  add({name,status,client,start,duration,resources,team,medias,chef})
                }
              />
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <Text>Please login to submit an idea.</Text>
          </View>
        )}
      </ScrollView>
    </View>
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
