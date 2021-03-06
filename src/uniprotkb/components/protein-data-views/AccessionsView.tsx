import React from 'react';
import { InfoList, ExpandableList } from 'franklin-sites';
import { NamesAndTaxonomyUIModel } from '../../adapters/namesAndTaxonomyConverter';

const AccessionsView: React.FC<{ data: NamesAndTaxonomyUIModel }> = ({
  data,
}) => (
  <InfoList
    infoData={[
      {
        title: `Primary accession`,
        content: data.primaryAccession,
      },
      {
        title: `Secondary accessions`,
        content: data.secondaryAccessions && (
          <ExpandableList descriptionString="accessions">
            {data.secondaryAccessions.map((accession) => ({
              id: accession,
              content: accession,
            }))}
          </ExpandableList>
        ),
      },
    ]}
  />
);
export default AccessionsView;
