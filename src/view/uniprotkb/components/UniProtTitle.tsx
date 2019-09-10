import React, { Fragment, FC } from 'react';
import { EntryType } from '../../../model/uniprotkb/UniProtkbConverter';
import { SwissProtIcon, TremblIcon } from 'franklin-sites';
import { Link } from 'react-router-dom';
import './styles/UniProtTitle.scss';

const UniProtTitle: FC<{
  primaryAccession: string;
  entryType: EntryType;
  uniProtId: string;
}> = ({ primaryAccession, entryType, uniProtId }) => (
  <Fragment>
    {entryType === EntryType.SWISSPROT ? (
      <span className="uniprot-title__status icon--reviewed">
        <SwissProtIcon />
      </span>
    ) : (
      <span className="uniprot-title__status icon--unreviewed">
        <TremblIcon />
      </span>
    )}
    <Link to={`/uniprotkb/${primaryAccession}`}>{primaryAccession}</Link>{' '}
    {` · `}
    {uniProtId}
  </Fragment>
);

export default UniProtTitle;
