import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, {useEffect, useState} from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { openDatabase } from 'react-native-sqlite-storage';
let db = openDatabase({ name: 'students.db' });

const HomeScreen = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getData();
  }, [isFocused]);
  
  const getData =() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM users', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
           setUserList(temp);
           console.log(userList);
      });
    });
  };

  let deleteUser=(userId)=>{
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  users where user_id=?',
        [userId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    getData();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  }

  return (
    <View style={styles.container}>

      <FlatList
        data={userList}
        renderItem={({item, index}) => {
          return (
            <View style={styles.card}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 8 }}>
                  <Text style={{ color: 'black', fontSize: 20 }}>{item.name}</Text>
                  <Text style={{ color: 'grey', fontSize: 14 }}>{item.email}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => navigation.navigate('UpdateStudent',{data:item})}>
                  <Text style={{ color: 'blue', textAlign: 'right', fontSize: 24, padding: 8 }}>/</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1 }} onPress={()=>deleteUser(item.user_id)}>
                  <Text style={{ color: 'red', textAlign: 'right', fontSize: 24, padding: 8 }}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      />

      <TouchableOpacity style={styles.floatingBtn} onPress={() => navigation.navigate('AddStudentScreen')}>
        <Text style={{ color: 'white', padding: 12 }}>+</Text>
        <Text style={{ color: 'white', padding: 12 }}>Add Student</Text>
      </TouchableOpacity>

    </View>
  )
}

export default HomeScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingBtn: {
    backgroundColor: 'purple',
    borderRadius: 24,
    position: 'absolute',
    bottom: 8,
    right: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    margin: 8,
  }
});