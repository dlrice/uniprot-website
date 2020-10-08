import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import SequenceView from '../../../shared/components/entry/SequenceView';

import { hasContent } from '../../../shared/utils/utils';

import EntrySection, { EntrySectionIDs } from '../../types/entrySection';

import { SequenceUIModel } from '../../../uniprotkb/adapters/sequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySectionIDs[EntrySection.Sequence]} data-entry-section>
      <Card title={EntrySection.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
      </Card>
    </div>
  );
};

export default SequenceSection;