import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    alignSelf: 'center',
    height: height * 0.4,
    marginLeft: width * 0.06,
    marginBottom: height * 0.03,
  },
  loginName: {
    fontSize: width * 0.07,
    fontWeight: '500',
    marginLeft: width * 0.1,
    color: 'darkblue',
  },
  inputCont1: {
    borderBottomColor: 'gray',
    marginBottom: 20,
    width: width * 0.8,
    marginLeft: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  inputCont2: {
    borderBottomColor: 'gray',
    marginBottom: 20,
    width: width * 0.8,
    marginLeft: width * 0.1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailInput: {
    width: width * 0.7,
    fontSize: width * 0.04,
    color: 'black',
    paddingBottom: 5,
    marginLeft: width * 0.04,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  passwordInput: {
    width: width * 0.7,
    fontSize: width * 0.04,
    color: 'black',
    paddingBottom: 5,
    marginLeft: width * 0.04,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  forgotpass: {
    alignItems: 'flex-end',
    marginTop: height * 0.001,
  },
  forgotText: {
    fontWeight: '600',
    fontSize: width * 0.035,
    marginRight: width * 0.1,
    color: 'darkblue',
  },
  loginbox: {
    justifyContent: 'center',
    backgroundColor: '#3b5998',
    alignSelf: 'center',
    borderRadius: 15,
    width: width * 0.85,
    height: height * 0.06,
    marginTop: width * 0.07,
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginRight: width * 0.04,
  },
  login: {
    color: 'white',
    textAlign: 'center',
    width: width * 0.2,
    fontSize: 20,
  },
  loginBox1: {
    width: width * 0.85,
    backgroundColor: '#F0F0F0',
    alignSelf: 'center',
    borderRadius: 15,
    height: height * 0.06,
    marginTop: width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    justifyContent: 'center',
  },
  googleimage: {
    width: width * 0.08,
    height: height * 0.04,
    marginRight: width * 0.05,
  },
  googleText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    flex: 1,
    marginRight: width * 0.1,
  },
});
