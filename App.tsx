import React, { FunctionComponent, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  useFonts,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/dev';
import ComponentContainer from './components/ComponentContainer';
import EdgesInput from './components/EdgesInput';
import Edges from './components/Edge';
import { v4 as uuid } from 'uuid';
import Edge from './components/Edge';

const App: FunctionComponent = () => {
  const [noOfNodes, setNoOfNodes] = useState(0);
  const [edges, SetEdges] = useState([new Edge(uuid(), '', '', 1)]);
  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
  });

  const onAddEdge = () => {
    const newEdge = new Edge(uuid(), '', '', 0);
    console.log('Pressed button');
    SetEdges([...edges, newEdge]);
  };

  const onInputChange = (
    id: string,
    node: 'source' | 'weight' | 'dest',
    value: string
  ) => {
    const newEdges = edges.map((edge) => {
      if (edge.id === id) {
        if (node === 'source') edge.source = value;
        else if (node === 'dest') edge.dest = value;
        if (node === 'weight') edge.weight = +value;
      }
      return edge;
    });

    SetEdges(newEdges);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>
            Kruskal&rsquo;s Algorithm Solver!
          </Text>
        </View>
        <ComponentContainer borderRadius={8}>
          <Text style={styles.detailsText}>No of Nodes: {noOfNodes}</Text>
        </ComponentContainer>

        <EdgesInput
          onInputChange={onInputChange}
          onAddEdge={onAddEdge}
          edges={edges}
        />

        <View style={styles.buttonContainer}>
          <Button
            color="#ff4e4e"
            title="Calculate MST"
            onPress={() => console.log('Calculating MST')}
          />
        </View>
      </View>
    );
};

export default App;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'Lato_700Bold',
    color: '#fff',
    textAlign: 'left',
    fontSize: 36,
  },
  detailsText: {
    fontFamily: 'Lato_400Regular',
    color: '#fff',
    fontSize: 18,
  },
  container: {
    minHeight: '100%',
    minWidth: '100%',
    paddingTop: 50,
    paddingHorizontal: 25,
    backgroundColor: '#161C36',
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonContainer: {
    width: '100%',
  },
});
