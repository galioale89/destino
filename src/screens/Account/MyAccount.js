import React, { useContext, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Alert, Text, View } from 'react-native';
import { useForm } from 'react-hook-form';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

import { listUsers } from '../../graphql/queries';

import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context/auth';

const Account = ({ navigation }) => {

    const { saveSearch } = useContext(AuthContext);
    const [account, setAccount] = useState(undefined);
    
    const { control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        const account = navigation.addListener('tabPress', (e) => {
            saveSearch(false);
            return account;
        })
    }, [navigation]);

    useEffect(()=>{
        componentDidMounAccount();
    },[]);

    const componentDidMounAccount = async () => {
        try {
            const apiData = await API.graphql(graphqlOperation(listUsers));
            setAccount(apiData.data.listUsers.items);
        } catch (err) {
            console.log('error: ', err);
        }           
    };

    const handlePress = () => {
        Alert.alert('Click');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>My Account</Text>
            </View>
            <View style={styles.body}>
                <CustomInput
                    name='name'
                    placeholder='Full Name'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Name is required.' }}
                />
                <CustomInput
                    name='adress'
                    placeholder='Adress'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Adress is required' }}
                />
                <CustomInput
                    name='number'
                    placeholder='Number'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Number is required' }}
                />
                <CustomInput
                    name='cep'
                    placeholder='Postal Adress'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Postal Adress is required' }}
                />
                <CustomInput
                    name='phone'
                    placeholder='Phone Number'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Phone Number is required' }}
                />
                <CustomInput
                    name='document'
                    placeholder='Document Number'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'Document Number is required' }}
                />
                <CustomInput
                    name='license'
                    placeholder='Driver License'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'DocuDriver License is required' }}
                />
                <CustomInput
                    name='email'
                    placeholder='E-mail'
                    control={control}
                    style={styles.input}
                    rules={{ required: 'E-mail is required' }}
                />
                <CustomButton 
                    onPress={handleSubmit(handlePress)}
                    text='Salvar'
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
        marginTop: 30,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    input: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    header: {
        borderColor: '#e3e3e3',
        padding: 5,
        borderColor: '#e3e3e3',
        borderWidth: 1,
        borderRadius: 5,
    },
    body: {
        marginTop: 20,
        width: '100%'
    },
    titleHeader: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})

const style = StyleSheet.create({

})
export default Account