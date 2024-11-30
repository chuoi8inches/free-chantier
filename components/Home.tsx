import {View,StyleSheet,Text} from "react-native";

export default function Home() {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
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