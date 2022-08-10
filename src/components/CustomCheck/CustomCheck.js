import React, {useState} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'

const CustomCheck = ({style, title, id}) =>{

    const [isCheck, setIsCheck] = useState(false)

    const onPressCheck = () => {
        setIsCheck(!isCheck)
    }
    return (
        <TouchableOpacity 
            style={[style, {backgroundColor: isCheck ? '#ffa500' : '#fff'}]} 
            key={id}
            onPress={onPressCheck()}
        ><Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomCheck