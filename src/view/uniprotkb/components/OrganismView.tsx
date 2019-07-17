import React, { Fragment } from 'react';
import { InfoList, ExternalLink } from 'franklin-sites';
import { Link } from 'react-router-dom';
import SimpleView from './SimpleView';
import { OrganismData } from '../../../model/uniprotkb/sections/NamesAndTaxonomyConverter';

type OrganismDataProps = {
  data: OrganismData;
};

const OrganismView: React.FC<OrganismDataProps> = ({
  data,
}): JSX.Element | null => {
  if (!data) {
    return null;
  }

  const termValue = `${data.scientificName}${
    data.commonName ? ` (${data.commonName})` : ''
  } ${data.synonyms && data.synonyms.length > 0 ? ` (${data.synonyms})` : ''}`;

  return <SimpleView termValue={termValue} />;
};

export const OrganismEntryView: React.FC<{ data?: OrganismData }> = ({
  data,
}): JSX.Element | null => {
  if (!data) {
    return null;
  }
  const infoListData: { title: string; content: JSX.Element | string }[] = [];
  if (data.scientificName) {
    infoListData.push({
      title: 'Organism',
      content: (
        <Link to={`/taxonomy/${data.taxonId}`}>
          {data.scientificName}
          {' '}
(
          {data.commonName}
)
        </Link>
      ),
    });
  }
  if (data.taxonId) {
    infoListData.push({
      title: 'Taxonomic identifier',
      content: (
        <Fragment>
          {`${data.taxonId} `}
          <ExternalLink
            url={`https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${
              data.taxonId
            }`}
          >
            NCBI
          </ExternalLink>
        </Fragment>
      ),
    });
  }
  if (data.lineage) {
    infoListData.push({
      title: 'Taxonomic lineage',
      content: (
        <Fragment>
          {data.lineage.reduce(
            (accumulator, lineageItem): string =>
              accumulator === null
                ? lineageItem
                : `${accumulator} > ${lineageItem}`
          )}
        </Fragment>
      ),
    });
  }
  return <InfoList infoData={infoListData} />;
};

export default OrganismView;
