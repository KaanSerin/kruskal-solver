import React, { FunctionComponent, useState } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {
  useFonts,
  Lato_700Bold,
  Lato_400Regular,
} from '@expo-google-fonts/dev';
import { FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ComponentContainer from './components/ComponentContainer';
import EdgesInput from './components/EdgesInput';
import { v4 as uuid } from 'uuid';
import Edge from './components/Edge';
import CalculateMST from './CalculateMST';

const App: FunctionComponent = () => {
  const [noOfNodes, setNoOfNodes] = useState(0);
  const [mst, setMST] = useState([] as Edge[]);
  const [showMST, setShowMST] = useState(false);
  const [edges, SetEdges] = useState([new Edge(uuid(), '', '', 1)]);
  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
  });

  const onRemoveEdge = (id: string) => {
    const newEdges = edges.filter((edge) => edge.id !== id);
    SetEdges(newEdges);
    console.log('Edge removed');
  };

  const onAddEdge = () => {
    const newEdge = new Edge(uuid(), '', '', 1);
    console.log('Pressed button');
    SetEdges([...edges, newEdge]);
  };

  const onCalculateMST = () => {
    const mst = CalculateMST(edges, noOfNodes);
    setMST(mst);
    setShowMST(true);
    console.log('Calculated MST');
  };

  const onInputChange = (
    id: string,
    node: 'source' | 'weight' | 'dest',
    value: string
  ) => {
    const newEdges = edges.map((edge) => {
      if (edge.id === id) {
        if (node === 'source') edge.source = +value;
        else if (node === 'dest') edge.dest = +value;
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
        <KeyboardAwareScrollView
          extraHeight={90}
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <View>
            <Text style={styles.titleText}>
              Kruskal&rsquo;s Algorithm Solver!
            </Text>
          </View>
          <ComponentContainer width="50%" borderRadius={8}>
            <View style={styles.noOfNodes}>
              <Text style={styles.detailsText}>No of Nodes:</Text>
              <TextInput
                style={styles.noOfNodesInput}
                value={noOfNodes.toString()}
                onChangeText={(text) => setNoOfNodes(+text)}
                keyboardType="numeric"
              ></TextInput>
            </View>
          </ComponentContainer>

          <EdgesInput
            onRemoveEdge={onRemoveEdge}
            onInputChange={onInputChange}
            onAddEdge={onAddEdge}
            edges={edges}
          />

          <View style={styles.buttonContainer}>
            <Button
              color="#ff4e4e"
              title="Calculate MST"
              onPress={() => onCalculateMST()}
            />
          </View>

          <ComponentContainer width="100%">
            <View>
              <Text style={styles.mstTitle}>Minimum Spanning Tree</Text>
              {showMST
                ? mst.map((edge) => (
                    <View style={styles.edgeContainer} key={edge.id}>
                      <Text style={styles.mstNode}>
                        {edge.source.toString()}
                      </Text>
                      <View style={styles.weightArrow}>
                        <Text style={styles.mstNode}>
                          {edge.weight.toString()}{' '}
                        </Text>
                        <FontAwesome name="arrows-h" size={42} color="white" />
                      </View>
                      <Text style={styles.mstNode}>
                        {edge.dest.toString()}{' '}
                      </Text>
                    </View>
                  ))
                : null}
            </View>
          </ComponentContainer>
        </KeyboardAwareScrollView>
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
  noOfNodes: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  noOfNodesInput: {
    fontFamily: 'Lato_400Regular',
    color: '#fff',
    fontSize: 18,
    marginLeft: 6,
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
    marginBottom: 30,
  },
  mstTitle: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '700',
  },
  edgeContainer: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mstNode: {
    color: '#fff',
    textAlign: 'center',
    width: 40,
    paddingVertical: 10,
    marginRight: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#0084ff',
  },
  weightArrow: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
  },
});
