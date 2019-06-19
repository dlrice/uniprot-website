import React, { Fragment } from 'react';
import { InfoList } from 'franklin-sites';
import { Xref } from '../../../model/utils/XrefUtils';
import { Link } from 'react-router-dom';

export const ProteomesEntryView: React.FC<{ data?: Xref[] }> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.map(proteome => (
        <InfoList
          key={proteome.id}
          infoData={[
            {
              title: 'Identifier',
              content: (
                <Link to={`/proteomes/${proteome.id}`}>{proteome.id}</Link>
              ),
            },
            {
              title: 'Component',
              content:
                proteome.properties &&
                proteome.properties.reduce(
                  (accumulator, component) =>
                    !accumulator && component.value
                      ? component.value
                      : `${accumulator}, ${component.value}`,
                  ''
                ),
            },
          ]}
        />
      ))}
    </Fragment>
  );
};