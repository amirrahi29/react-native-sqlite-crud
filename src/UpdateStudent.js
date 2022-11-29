import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
let db = openDatabase({ name: 'students.db' });

const UpdateStudent = ({ route }) => {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log(route.params.data);
        setName(route.params.data.name);
        setEmail(route.params.data.email);
        setPassword(route.params.data.password);
    }, []);

    const updateUser = () => {
        if (name && email && password) {
            db.transaction(tx => {
                tx.executeSql(
                    'UPDATE users set name=?, email=? , password=? where user_id=?',
                    [name, email, password, route.params.data.user_id],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Success',
                                'User updated successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('HomeScreen'),
                                    },
                                ],
                                { cancelable: false },
                            );
                        } else alert('Updation Failed');
                    },
                );
            });
        } else {
            alert("Validation error!");
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 24, marginBottom: 16 }}></View>

            <TextInput
                onChangeText={(e) => setName(e)}
                value={name}
                placeholderTextColor='black'
                placeholder='Enter name...'
                style={styles.inputStyle}
            />
            <TextInput
                onChangeText={(e) => setEmail(e)}
                value={email}
                placeholderTextColor='black'
                placeholder='Enter email...'
                style={styles.inputStyle}
            />
            <TextInput
                onChangeText={(e) => setPassword(e)}
                value={password}
                placeholderTextColor='black'
                placeholder='Enter password...'
                style={styles.inputStyle}
            />

            <TouchableOpacity style={styles.btnStyle} onPress={updateUser}>
                <Text style={{ color: 'white', padding: 12, alignSelf: 'center', fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>


        </View>
    )
}

export default UpdateStudent

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 8,
        width: '90%',
        marginBottom: 16,
        color: 'black',
        alignSelf: 'center',
    },
    btnStyle: {
        backgroundColor: 'black',
        width: '90%',
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 16
    }
});