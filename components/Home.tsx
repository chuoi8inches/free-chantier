import {View,StyleSheet,Text} from "react-native";
import {useAuth} from "@/context/AuthContext";
import {databases} from "@/libs/appwrite";

export default function Home() {
    const promise = databases.listDocuments(
        '67406116002f1b725118',
        '6742206b0023d95cd635'
    );
    promise.then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
    return (
        <View style={styles.container}>
            <Text>Welcome to your home screen</Text>
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