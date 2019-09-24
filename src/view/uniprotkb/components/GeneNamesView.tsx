import React from 'react';
import { InfoList } from 'franklin-sites';
import NameView from './NameView';

type GeneNamesDataProps = {
  name?: string;
  alternativeNames?: string[];
};

const GeneNamesView: React.FC<GeneNamesDataProps> = ({
  name,
  alternativeNames = [],
}) => {
  if (!name) {
    return null;
  }
  const props = { name, alternativeNames };
  return <NameView {...props} />;
};

export const GeneNamesViewFlat = ({
  name,
  alternativeNames = [],
}: GeneNamesDataProps): string => {
  const geneNames = [];
  if (name) {
    geneNames.push(name);
  }
  if (alternativeNames.length) {
    geneNames.push(...alternativeNames);
  }
  return geneNames.join(', ');
};

export const GeneNamesListView: React.FC<GeneNamesDataProps> = ({
  name,
  alternativeNames = [],
}) => {
  if (!name) {
    return null;
  }

  const infoData = [
    {
      title: 'Name',
      content: name,
    },
    {
      title: 'Alternative names',
      content: alternativeNames,
    },
  ];
  return <InfoList infoData={infoData} />;
};

export default GeneNamesView;
