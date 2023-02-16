import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import Color from '@site/src/components/Color';
import Image from '@site/src/components/Image';
import NameForma from '@site/src/components/NameForma';

export default {
  ...MDXComponents,
  Color,
  Image: Image,
  NameForma: NameForma
};