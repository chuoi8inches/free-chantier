import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
    //List all documents in a list view
  const user = useAuth()
  console.log(user.user)
    return (
        <View style={styles.container}>
            <Text>Welcome {user.user.email} to your home screen</Text>
            <Text>If is a chef, see assigned project, if a responsable, see everything</Text>
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