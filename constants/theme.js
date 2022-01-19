import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#335CAB',
  transparentPrimray: 'rgba(51, 92, 171, 0.4)',
  transparentWhite4: 'rgba(255, 255, 255, 0.4)',
  link: '#7293D5',
  darkBlue: '#1C335E',
  lightBlue: '#7293D5',
  ocean: '#0BCAD4',
  green: '#27AE60',
  red: '#DC4645',
  blue: '#4285F4',
  darkGray: '#3C3A36',
  gray: '#6B7075',
  gray2: '#C4C4C4',
  gray3: '#D5D4D4',
  gray4: '#CFD4D8',
  lightGray: '#EFF0F0',
  lightGray2: '#FAF5F5',
  white2: '#EFF0F0',
  white: '#FFF',
  black2: '#282828',
  black: '#000',

  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack9: 'rgba(0, 0, 0, 0.9)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: {fontFamily: 'Poppins-Black', fontSize: SIZES.largeTitle},
  h1: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'Poppins-Bold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h3, lineHeight: 24},
  h4: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h4, lineHeight: 24},
  h5: {fontFamily: 'Poppins-SemiBold', fontSize: SIZES.h5, lineHeight: 24},
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body3,
    lineHeight: 24,
  },
  body4: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body4,
    lineHeight: 24,
  },
  body5: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.body5,
    lineHeight: 24,
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
