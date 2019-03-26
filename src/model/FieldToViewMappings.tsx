import React from 'react';
import SimpleView from './SimpleView';
import { ProteinNames, ProteinNamesData } from './ProteinNames';
import { GeneNames, GeneNamesData } from './GeneNames';
import { Organism, OrganismData } from './Organism';

const small = 200;
const medium = 400;
const large = 600;

const ColumnConfiguration: {
  [index: string]: {
    width: number;
    label: string;
    render: (data: any) => JSX.Element | undefined;
  };
} = {
  accession: {
    width: small,
    label: 'Entry',
    render: (data: { primaryAccession: string }) => (
      <SimpleView
        termValue={data.primaryAccession}
        linkTo={`/uniprotkb/${data.primaryAccession}`}
      />
    ),
  },
  id: {
    width: small,
    label: 'Entry Name',
    render: (data: { uniProtId: string }) => (
      <SimpleView termValue={data.uniProtId} />
    ),
  },
  protein_name: {
    width: large,
    label: 'Protein names',
    render: (data: ProteinNamesData) => <ProteinNames data={data} />,
  },
  gene_names: {
    width: medium,
    label: 'Gene Names',
    render: (data: GeneNamesData) => <GeneNames data={data} />,
  },
  organism: {
    width: large,
    label: 'Organism',
    render: (data: OrganismData) => <Organism data={data} />,
  },
};

export default ColumnConfiguration;
