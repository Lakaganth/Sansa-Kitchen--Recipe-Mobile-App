class Recipe {
  constructor(name, ingredients, photo, sum) {
    this.name = name;
    this.ingredients = ingredients;
    this.photo = photo;
    this.sum = sum;
  }
}

export default Recipe;

import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: [],
      inputData: []
    };
  }

  //function to add TextInput dynamically
  addTextInput = index => {
    let textInput = this.state.textInput;
    textInput.push(
      <TextInput
        style={styles.textInput}
        onChangeText={text => this.addValues(text, index)}
      />
    );
    this.setState({ textInput });
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput, inputData });
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputData: dataArray
      });
    }
  };

  //function to console the output
  getValues = () => {
    console.log("Data", this.state.inputData);
  };

  render() {
    return (
      <View>
        <View style={styles.row}>
          <View style={{ margin: 10 }}>
            <Button
              title="Add"
              onPress={() => this.addTextInput(this.state.textInput.length)}
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button title="Remove" onPress={() => this.removeTextInput()} />
          </View>
        </View>
        {this.state.textInput.map(value => {
          return value;
        })}
        <Button title="Get Values" onPress={() => this.getValues()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  buttonView: {
    flexDirection: "row"
  },
  textInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 20
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  }
});

export default MyClass;
