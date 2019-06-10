import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import EntrySection from '../../model/types/EntrySection';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import XRefView from '../uniprotkb/components/XRefView';
import { InteractionUIModel } from '../../model/uniprotkb/sections/InteractionConverter';

const InteractionSection: FC<{
  data: InteractionUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.Interaction}>
        <FreeTextView comments={data.commentsData} includeTitle={true} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default InteractionSection;
