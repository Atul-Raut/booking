import React from 'react'
import { Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const FormInput = ({
  iconNameLeft,
  iconColorLeft,
  returnKeyType,
  keyboardType,
  name,
  onChangeAction,
  placeholder,
  value,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      leftIcon={<Ionicons name={iconNameLeft} size={28} color={iconColorLeft} />}
      leftIconContainerStyle={styles.iconStyle}
      placeholderTextColor='grey'
      name={name}
      onChange={onChangeAction}
      value={value}
      placeholder={placeholder}
      style={styles.input}
    />
  </View>
)

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15
  },
  iconStyle: {
    marginRight: 10
  }
})

export default FormInput