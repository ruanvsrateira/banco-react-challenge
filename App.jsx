import React, {Component} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Slider, {SliderBase} from '@react-native-community/slider';
import {Picker} from '@react-native-community/picker';
import {ButtonRegister} from './src/ButtonAnimated';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      idade: 0,
      sexo: 'F',
      limite: 0,
      estudante: false,
    };

    this.handlePressRegisterButton = this.handlePressRegisterButton.bind(this);
  }

  handlePressRegisterButton() {
    if (!this.validateData()) {
      Alert.alert(
        'Error',
        'Por favor preencha todas as informações necessárias',
      );
    } else {
      this.showData();
    }
  }

  showData() {
    Alert.alert(
      'Dados Preenchidos',
      JSON.stringify(this.state)
        .replace('{', '')
        .replace('}', '')
        .replace(/"/g, '')
        .replace(/,/g, '\n'),
    );
  }

  validateData() {
    if (
      !this.state.idade ||
      !this.state.nome ||
      !this.state.limite ||
      !this.state.sexo
    ) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/64px-React-icon.svg.png',
            width: 72,
            height: 64,
          }}
        />
        <Text style={styles.title}>Banco React</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            underlineColorAndroid="transparent"
            value={this.state.nome}
            onChangeText={value => this.setState({...this.state, nome: value})}
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            value={this.state.idade}
            onChangeText={value => this.setState({...this.state, idade: value})}
          />
          <Picker
            mode="dialog"
            style={{color: '#FFF'}}
            selectedValue={this.state.sexo}
            onValueChange={value =>
              this.setState({...this.state, sexo: value})
            }>
            <Picker.Item value="F" label="Feminino" />
            <Picker.Item value="M" label="Masculino" />
          </Picker>
          <View style={styles.sliderContainer}>
            <View>
              <Slider
                value={this.state.limite}
                minimumValue={0}
                maximumValue={2000}
                minimumTrackTintColor="royalblue"
                thumbTintColor="royalblue"
                onValueChange={value =>
                  this.setState({...this.state, limite: Math.floor(value)})
                }
              />
              <Text style={styles.sliderLabel}>
                Valor do limite: {this.state.limite}
              </Text>
            </View>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.switchText}>Estudante?</Text>
            <Switch
              value={this.state.estudante}
              thumbColor="royalblue"
              color
              onValueChange={value =>
                this.setState({...this.state, estudante: value})
              }
            />
          </View>
          <ButtonRegister
            onPress={this.handlePressRegisterButton}
            title="CRIAR CONTA"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: '#FFF',
  },
  input: {
    width: 350,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 3,
    paddingLeft: 10,
  },
  formContainer: {
    flexDirection: 'column',
    gap: 10,
    width: 350,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  switchText: {
    color: '#DDD',
  },

  sliderContainer: {
    flexDirection: 'column',
    gap: 5,
    marginVertical: 15,
  },
  sliderLabel: {
    color: '#DDD',
    textAlign: 'right',
  },
});

export default App;
