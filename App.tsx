import React, { FunctionComponent, useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Button } from 'react-native';
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
import * as ScreenOrientation from 'expo-screen-orientation';

const App: FunctionComponent = () => {
  const [noOfNodes, setNoOfNodes] = useState(0);
  const [mst, setMST] = useState([] as Edge[]);
  const [showMST, setShowMST] = useState(false);
  const [showMSTError, setShowMSTError] = useState(false);
  const [edges, SetEdges] = useState([new Edge(uuid(), 0, 0, 1)]);
  const [fontsLoaded] = useFonts({
    Lato_700Bold,
    Lato_400Regular,
  });

  useEffect(() => {
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    }
    changeScreenOrientation();
    console.log('dahadsghads');
  });

  const onRemoveEdge = (id: string) => {
    const newEdges = edges.filter((edge) => edge.id !== id);
    SetEdges(newEdges);
    console.log('Edge removed');
  };

  const onAddEdge = () => {
    const newEdge = new Edge(uuid(), 0, 0, 1);
    console.log('Pressed button');
    SetEdges([...edges, newEdge]);
  };

  const onCalculateMST = () => {
    try {
      const [mst, noOfVertices] = CalculateMST(edges);
      setMST(mst);
      setNoOfNodes(noOfVertices);
      setShowMSTError(false);
      setShowMST(true);
    } catch (error) {
      console.error(error);
      setMST([]);
      setShowMST(false);
      setShowMSTError(true);
    }
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
          showsVerticalScrollIndicator={false}
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
              <Text style={styles.detailsText}>No of Nodes: {noOfNodes}</Text>
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

          {showMST ? (
            <ComponentContainer width="100%">
              <View>
                <Text style={styles.mstTitle}>Minimum Spanning Tree</Text>
                {showMSTError ? (
                  <Text style={styles.errorMessage}>
                    Please enter a valid tree!
                  </Text>
                ) : null}
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
                          <FontAwesome
                            name="arrows-h"
                            size={42}
                            color="white"
                          />
                        </View>
                        <Text style={styles.mstNode}>
                          {edge.dest.toString()}{' '}
                        </Text>
                      </View>
                    ))
                  : null}
              </View>
            </ComponentContainer>
          ) : null}
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
  errorMessage: {
    color: '#ff4e4e',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
});
