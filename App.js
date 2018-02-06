//Imports
import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Image, Dimensions, Button, TouchableHighlight, ToastAndroid, BackHandler } from 'react-native';
var SoundPlayer = require('react-native-sound');
var song = new SoundPlayer('rip.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
  if(error)//If can't laod toasts error.
    ToastAndroid.show('Error when init SoundPlayer', ToastAndroid.SHORT);
  else {
    //Plays song on startup
    song.play((success) => {
      if(!success)//If can't play toasts error.
        ToastAndroid.show('Error when play SoundPlayer', ToastAndroid.SHORT);
    });
    song.setNumberOfLoops(-1);//Sets infinite loop
  }
});
var playingM = true;//Song playing state

class FButton extends React.Component{ 
  constructor(props){
    super(props);
    this.state  = {
      respects: 0,//Inits respect count
    };
  }
  onButtonPress = () => {
      this.setState({respects: this.state.respects+1});//Button pressed respects increases by 1
      let rando = Math.floor(Math.random() *(18-1)+1);//Selects random number betweeen 1 and 17.99.. Math.floor so that only whole numbers from 1 to 17
      var sfx = new SoundPlayer('sfx'+rando, SoundPlayer.MAIN_BUNDLE, (error) => {//Adds sfx to number so it picks a random sound file since they're all 'sfx#'
        if(error)
          ToastAndroid.show('Error when init SoundPlayer', ToastAndroid.SHORT);//Same concept as above but for each sfx file.
        else {
          sfx.play((success) => {
            if(!success)
              ToastAndroid.show('Error when play SoundPlayer', ToastAndroid.SHORT);
          });
          setTimeout(function(){
            //Releases sound effect resource after sound file is done.
            sfx.release();
          }, sfx.getDuration()*1000);//Gets total time of sfx duration and converts to seconds. How it knows when to release.
        }
      });
  }
  render (){
    return(
      <View style={styles.respectH}>{/*F button*/}
        <Text style={styles.respectText}>Respects: {this.state.respects}</Text>
        <TouchableHighlight onPress={this.onButtonPress} underlayColor={'#000000'}>
          <Image source={require('./assets/F.png')} style={styles.img}/>
        </TouchableHighlight>
      </View> 
    );
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);//Handles back click
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    if(playingM === true) song.play();//If song was playing when exiting app song will unpause when opening app again.
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    song.pause();//Song pauses when exiting app with back button.
  }
  onPressButtonPlay() {//Plays and pauses song.
    playingM ? song.pause() : song.play();
    playingM = !playingM;
  }
  render() {
    return (
      <View style={styles.container}>{/*Main imagse and view*/}
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <TouchableHighlight onPress={this.onPressButtonPlay.bind(this)} underlayColor={'#000000'}>
          <Image style={styles.imgHussein} source={require('./assets/hussein_2.png')} resizeMode='contain' />
        </TouchableHighlight>
        <Text style={styles.title}>Hussein LASTNAME</Text>
        <Text style={styles.year}>1997 - 2017</Text>
        <FButton />
      </View>
    );
  }
}

const win = Dimensions.get('window');//Viewport
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',

    height: win.height,
  },
  logo:{
    marginTop: 5, 
    alignSelf: 'center', 
    width:win.width/1.5,
    height:win.width/1.5/16*3.5,
  },
  imgHussein: {
    alignSelf:  'center',   
    height: win.height/2,
    width: win.height/2,
  },
  title: {
    fontSize: win.width/15,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
    fontFamily: 'Roboto',
    marginBottom: 0,
    marginTop: 0,
  },
  year: {
    fontSize: win.width/15,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: 'white',
    fontFamily: 'Roboto',
    marginBottom: 0,
    marginTop: 0,
  },
  respectH: {
    margin:0,
  },
  respectText: {
    textAlign:  'center',
    marginTop: 5, 
    marginBottom: 0, 
    color: '#FFFFFF',
    fontSize: win.width/20,
  },
  img: {
    marginTop: 0,
    width:win.height/5,
    height:win.height/5,
    alignSelf:  'center', 
  },
});
