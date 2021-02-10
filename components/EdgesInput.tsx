import * as React from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import ComponentContainer from './ComponentContainer';
import Edge from './Edge';

export interface EdgesInputProps {
  edges: Edge[];
  onAddEdge: () => void;
  onRemoveEdge: (id: string) => void;
  onInputChange: (
    id: string,
    node: 'source' | 'weight' | 'dest',
    value: string
  ) => void;
}

const EdgesInput: React.FunctionComponent<EdgesInputProps> = ({
  edges,
  onAddEdge,
  onRemoveEdge,
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
              keyboardType={'numeric'}
              maxLength={2}
              value={edge.source.toString()}
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
              keyboardType={'numeric'}
              value={edge.dest.toString()}
            />
            <TouchableNativeFeedback onPress={() => onRemoveEdge(edge.id)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={28}
                color="white"
              />
            </TouchableNativeFeedback>
          </View>
        ))}
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
    marginRight: '10%',
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
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
