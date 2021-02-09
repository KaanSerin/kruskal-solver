import * as React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import ComponentContainer from './ComponentContainer';
import Edge from './Edge';

export interface EdgesInputProps {
  edges: Edge[];
  onAddEdge: () => void;
  onInputChange: (
    id: string,
    node: 'source' | 'weight' | 'dest',
    value: string
  ) => void;
}

const EdgesInput: React.FunctionComponent<EdgesInputProps> = ({
  edges,
  onAddEdge,
  onInputChange,
}: EdgesInputProps) => {
  return (
    <ComponentContainer width="100%" borderRadius={8}>
      <View>
        <Text style={styles.titleText}>Edges</Text>
        {edges.map((edge) => (
          <View style={styles.edgeContainer} key={edge.id}>
            <TextInput
              onChangeText={(text) => onInputChange(edge.id, 'source', text)}
              style={styles.weightInput}
              multiline={false}
              maxLength={2}
              value={edge.source}
            />
            <View style={styles.weightArrow}>
              <TextInput
                onChangeText={(text) => onInputChange(edge.id, 'weight', text)}
                multiline={false}
                //   maxLength={2}
                value={edge.weight.toString()}
                keyboardType="numeric"
                style={styles.weightInput}
              />
              <FontAwesome name="arrows-h" size={42} color="white" />
            </View>
            <TextInput
              onChangeText={(text) => onInputChange(edge.id, 'dest', text)}
              style={styles.weightInput}
              multiline={false}
              maxLength={2}
              value={edge.dest}
            />
          </View>
        ))}
        {/* <View style={styles.edgeContainer}>
          <TextInput multiline={false} maxLength={2} style={styles.edgeInput} />
          <View style={styles.weightArrow}>
            <TextInput
              multiline={false}
              //   maxLength={2}
              keyboardType="numeric"
              style={styles.weightInput}
            />
            <FontAwesome name="arrows-h" size={42} color="white" />
          </View>

          <TextInput multiline={false} maxLength={2} style={styles.edgeInput} />
        </View> */}
        <View style={styles.addEdgeArea}>
          <TouchableNativeFeedback onPress={onAddEdge}>
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={38}
              color="white"
            />
          </TouchableNativeFeedback>
        </View>
      </View>
    </ComponentContainer>
  );
};

const styles = StyleSheet.create({
  titleText: {
    width: '100%',
    color: '#fff',
    fontFamily: 'Lato_700Bold',
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 12,
  },
  weightInput: {
    color: '#fff',
    width: 40,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ff4e4e',
  },
  weightArrow: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
  edgeContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  edgeInput: {
    width: '30%',
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ff4e4e',
  },
  addEdgeArea: {
    width: '100%',
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default EdgesInput;
