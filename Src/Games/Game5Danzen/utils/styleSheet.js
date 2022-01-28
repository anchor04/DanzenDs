// It determines screen ratio for different screen sizes for proper display of contents
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
// const heightRatio = height / 667;
const heightRatio = height / 700;
// const widthRatio = width / 375;
const widthRatio = width / 280;

export {height, width, heightRatio, widthRatio};
