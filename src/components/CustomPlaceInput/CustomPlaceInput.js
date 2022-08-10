import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import config from '../../../config/'

const CustomPlaceInput = ({placeholder, onPress}) => {

    return (
        <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={onPress}
        query={{
            key: 'AIzaSyAzc8kwRAPuNvZp9e7PRG_cS3laCPwuyVU',
            language: 'pt-br'
        }}
        enablePoweredByContainer={false}
        fetchDetails={true}
        styles={{
            container: {
                flex: 0,
                width: '100%',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                elevation: 2,                
            },
            textInput: {
                flex: 0,
                width: '100%',
                borderRadius: 20,
                shadowColor: '#000',
                shadowOpacity: 0.25,
                elevation: 2,             
            },
            listView: {
                height: '50%',
            }
        }}
    />
    )
}

export default CustomPlaceInput;