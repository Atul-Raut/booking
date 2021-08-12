//FormButton.js
import React from 'react'
import { Button } from 'react-native-elements'

const FormButton = ({ title, buttonType, buttonColor, onPressAction,...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    onPress={onPressAction}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{ color: buttonColor }}
  />
)

export default FormButton