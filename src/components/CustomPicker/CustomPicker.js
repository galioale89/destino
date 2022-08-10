import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller } from 'react-hook-form';


const CustomPicker = ({ name, control, style, fields, title }) => {

  // const pickerRef = useRef()

  // open = () => {
  //   pickerRef.current.focus();
  // }

  // close = () =>{
  //   pickerRef.current.blur();
  // }

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange, onBlur}}) => (
        <>
          <View style={style}>
            <Text style={{left: 10, color: 'rgba(124,124,124,0.7)',position: 'absolute' }}>{title}</Text>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue,itemIndex) => onChange(itemValue)}
              onBlur={onBlur}
            >
              {fields.map(item => 
                  <Picker.Item key={item.id} label={item.name} value={item.id} style={{ fontSize: 20 }} />
              )}
            </Picker>
          </View>
        </>
      )}
    />
  );
};

export default CustomPicker;