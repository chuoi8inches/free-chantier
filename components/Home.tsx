import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Home() {
    const user = useUser();
    //List all documents in a list view
    return (
        <View style={styles.container}>
            <Text>Welcome to your home screen</Text>
            <Text>If is a chef, see assigned project, if a responsable, see everything</Text>
            <FlatList
                data={promise}
                // for each item in the list, separate each item then get name
                renderItem={({ item }) => <Text>{item.name}</Text>}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    }
});