import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  searchText: {
    fontSize: 14,
    color: 'black',
    width: width * 0.65,
    height: height * 0.05,
    paddingLeft: width * 0.03,
    marginTop: height * 0.05,
    marginLeft: width * 0.03,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    height: height * 0.05,
    width: width * 0.1,
    marginTop: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: width * 0.05,
    borderRadius: 10,
  },
  searchButton: {
    backgroundColor: 'white',
    borderColor: 'lightgray',
    height: height * 0.05,
    width: width * 0.1,
    marginTop: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: width * 0.04,
    borderRadius: 10,
    borderWidth: 1,
  },
  shop: {
    color: 'black',
    fontSize:28,
    marginLeft: width * 0.05,
    marginTop: height * 0.06,
    fontWeight: '600',

  },
  heading1: {
    color: 'darkgray',
    // fontSize:13,
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
    fontWeight: '400',

  },

  heading2: {
    color: 'darkgray',
    marginLeft: width * 0.05,
    marginTop: height * 0.01,
    fontWeight: '400',

  },

  FirstBox: {
    flexDirection: 'row',
    marginLeft: width * 0.05,
    marginTop: height * 0.03,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  products: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20,

  },
  length: {
    color: 'lightgray',
    fontSize: 20,
    marginRight:width*0.5,
    color: 'darkgray',

  },
  showAll: {
    color: 'blue',
    fontWeight: '600',
    fontSize: 13,
    marginRight: width * 0.04,
  },
  noProduct: {
    color: 'black',
    fontSize: width * 0.04,
    marginVertical: height * 0.1,
  },
  addBox: {
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
    marginTop: height * 0.001,
    marginRight: width * 0.04,
    width: width*0.95,
    // backgroundColor:'red'
  },
});
