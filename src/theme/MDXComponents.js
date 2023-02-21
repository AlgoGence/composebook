import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Color from '@site/src/components/Color';
import Image from '@site/src/components/Image';
import DecToHex from '@site/src/components/DecToHex';
import MyColorPicker from '@site/src/components/MyColorPicker';
import Preview from '@site/src/components/colorPicker/Preview';
import ColorPicker from '@site/src/components/colorPicker/ColorPicker';

export default {
  ...MDXComponents,
  Color,
  Image: Image,
  DecToHex: DecToHex,
  ColorPicker: ColorPicker,
  MyColorPicker: MyColorPicker,
  Preview: Preview
};