import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

let db = openDatabase({ name: 'students.db' });

const AddStudentScreen = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        db.transaction(txn => {
          txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
            [],
            (tx, res) => {
              console.log('item:', res.rows.length);
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS users', []);
                txn.executeSql(
                  'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), email VARCHAR(50), password VARCHAR(100))',
                  [],
                );
              }
            },
            error => {
              console.log(error);
            },
          );
        });
      }, []);

    const submit = async () => {
        if (name && email && password) {
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO users (name, email, password) VALUES (?,?,?)',
                    [name, email, password],
                    (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected > 0) {
                            Alert.alert(
                                'Success',
                                'You are Registered Successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () => navigation.navigate('HomeScreen'),
                                    },
                                ],
                                { cancelable: false },
                            );
                        } else alert('Registration Failed');
                    },
                    error => {
                        console.log(error);
                    },
                );
            });
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

            <TouchableOpacity style={styles.btnStyle} onPress={submit}>
                <Text style={{ color: 'white', padding: 12, alignSelf: 'center', fontSize: 16 }}>Submit</Text>
            </TouchableOpacity>


        </View>
    )
}

export default AddStudentScreen

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 8,
        width: '90%',
        color: 'black',
        marginBottom: 16,
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