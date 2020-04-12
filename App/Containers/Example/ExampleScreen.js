import React from 'react'
import { Platform, Text, View, Button, ActivityIndicator, Image,TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import ExampleActions from 'App/Stores/Example/Actions'
import { liveInEurope } from 'App/Stores/Example/Selectors'
import Style from './ExampleScreenStyle'
import { ApplicationStyles, Helpers, Images, Metrics } from 'App/Theme'
import Video from 'react-native-video';
import {NativeModules} from 'react-native';
const {RNAndroidPip} = NativeModules;
import {BackHandler} from 'react-native';
import { DeviceEventEmitter } from 'react-native'


class ExampleScreen extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      RNAndroidPip.enterPictureInPictureMode()
      return true;
    });

    DeviceEventEmitter.addListener(
     'ON_HOME_BUTTON_PRESSED',
     () => {
       console.log('ON_HOME_BUTTON_PRESSED')
       RNAndroidPip.enterPictureInPictureMode()
    })

    DeviceEventEmitter.addListener(
     'ON_RECENT_APP_BUTTON_PRESSED',
     () => {
       console.log('ON_RECENT_APP_BUTTON_PRESSED')
       RNAndroidPip.enterPictureInPictureMode()
    })


    
  }
  render() {
    return (
      <View
        style={{flex: 1}}
      >
      <Video source={{uri:"https://static.getinpix.com/public/videos/v1/variants/original/2020/04_apr/7_tue/img_1586267491200_132.mp4"}}   //Can be a URL or a local file.
         ref={(ref) => {
           this.player = ref
         }}                                      // Store reference
         onBuffer={this.onBuffer} 
         pictureInPicture={true}
         playInBackground={true}
         controls={true}
         fullscreen={true}
         repeat={true}               
         onError={this.videoError}               // Callback when video cannot be loaded
         style={Style.backgroundVideo} />
      </View>
    )
  }
}

ExampleScreen.propTypes = {
  user: PropTypes.object,
  userIsLoading: PropTypes.bool,
  userErrorMessage: PropTypes.string,
  fetchUser: PropTypes.func,
  liveInEurope: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.example.user,
  userIsLoading: state.example.userIsLoading,
  userErrorMessage: state.example.userErrorMessage,
  liveInEurope: liveInEurope(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(ExampleActions.fetchUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExampleScreen)
