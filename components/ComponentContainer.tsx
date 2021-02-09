import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface ComponentContainerProps {
  children: React.ReactElement;
  width?: string;
  height?: string;
  borderRadius?: number;
}

const ComponentContainer: React.FunctionComponent<ComponentContainerProps> = ({
  children,
  width,
  height,
  borderRadius,
}: ComponentContainerProps) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginVertical: 15,
      borderRadius: borderRadius || 24,
      width: width || 'auto',
      height: height || 'auto',
      textAlign: 'center',
      color: '#fff',
      backgroundColor: '#2D3148',
    },
  });

  return <View style={styles.container}>{children}</View>;
};

export default ComponentContainer;
