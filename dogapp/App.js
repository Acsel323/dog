//
// B.RF Group, dmalex
//
import { StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
// import { Platform } from 'react-native'
// дл€ тестировани€ на эмул€торах (разные ip-адреса localhost)
// const ip_address = Platform.OS === 'android' ?
//                   'http://10.0.2.2:8080/' : 'http://localhost:8080/'

const apiUrl = 'https://brf.su/api/team/list?page=0'

export default App = () => {
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const response = await fetch(
                apiUrl,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            )

            const json = await response.json()
            setData(json.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <Text>Team</Text>
            <Text></Text>
            {isLoading ? <ActivityIndicator /> : (
                <FlatList
                    data={data}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Text>{item.fullName}</Text>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
    },
})

