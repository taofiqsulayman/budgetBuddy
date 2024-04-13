import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

type CardProps = {
    children: React.ReactNode;
    style?: ViewStyle;
    }

const Card = ({ children, style = {} }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      { children }
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 8,
        shadowOpacity: 0.15,
        textShadowOffset: { width: 0, height: 6 },
    }
})
