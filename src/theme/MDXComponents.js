import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Color from '@site/src/components/Color';
import Image from '@site/src/components/Image';
import DecToHex from '@site/src/components/DecToHex';
import ColorPicker from '@site/src/components/ColorPicker';

export default {
  ...MDXComponents,
  Color,
  Image: Image,
  DecToHex: DecToHex,
  ColorPicker: ColorPicker
};