import React from 'react';
import { Namespace } from '../search/types/searchTypes';
import UniProtKBInfo from './UniProtKBInfo';

const infoMappings: {
  [index in Namespace]: {
    name: string;
    info: JSX.Element;
    links: Array<{ title: string; destination: string }>;
  }
} = {
  uniprotkb: {
    name: 'UniProtKB',
    info: <UniProtKBInfo />,
    links: [
      { title: 'Help', destination: '' },
      { title: 'Video', destination: '' },
    ],
  },
};

export default infoMappings;