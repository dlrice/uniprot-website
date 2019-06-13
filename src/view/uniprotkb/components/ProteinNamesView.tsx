import React from 'react';
import NameView from './NameView';
import { InfoList } from 'franklin-sites';
import { ProteinNamesDefault } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

type ProteinNamesDataProps = {
  recommendedName?: string;
  shortNames?: string;
  alternativeNames?: string[];
};

const processShortNames = (
  shortNameList: ProteinNamesDefault['shortNames']
) => {
  if (!shortNameList) {
    return;
  }
  return shortNameList.reduce((r, d) => `, ${d.value}`, '');
};

// TODO this should be split into 2 components, one for columns and one for entry
export const ProteinNames: React.FC<ProteinNamesDataProps> = ({
  recommendedName,
  shortNames,
  alternativeNames,
}) => {
  const props = {
    name: recommendedName,
    shortNames,
    alternativeNames,
  };
  return <NameView {...props} />;
};

export const EntryProteinNames: React.FC<ProteinNamesDataProps> = ({
  recommendedName,
  shortNames,
  alternativeNames,
}) => {
  const infoData = [
    {
      title: 'Recommended name',
      content: recommendedName,
    },
    {
      title: 'Short names',
      content: shortNames,
    },
    {
      title: 'Alternative names',
      content: alternativeNames,
    },
  ];
  return <InfoList infoData={infoData} />;
};