import React, { FC } from 'react';
import { Card } from 'franklin-sites';

import EntrySection from '../../types/entrySection';
import FeaturesView from '../protein-data-views/FeaturesView';
import KeywordView from '../protein-data-views/KeywordView';
import XRefView from '../protein-data-views/XRefView';
import SequenceView, {
  SequenceCautionView,
  MassSpectrometryView,
  RNAEditingView,
} from '../../../shared/components/entry/SequenceView';
import FreeTextView from '../protein-data-views/FreeTextView';

import { hasContent } from '../../../shared/utils/utils';

import { SequenceUIModel } from '../../adapters/sequenceConverter';

const SequenceSection: FC<{
  data: SequenceUIModel;
  primaryAccession: string;
}> = ({ data, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Sequence}>
      <Card title={EntrySection.Sequence}>
        <SequenceView data={data} accession={primaryAccession} />
        <FeaturesView
          features={data.featuresData}
          sequence={data.sequence.value}
        />
        {data.sequenceCaution && data.sequenceCaution.length > 0 && (
          <>
            <h3>Sequence caution</h3>
            <SequenceCautionView data={data.sequenceCaution} />
          </>
        )}
        {data.massSpectrometry && data.massSpectrometry.length > 0 && (
          <>
            <h3>Mass Spectrometry</h3>
            <MassSpectrometryView data={data.massSpectrometry} />
          </>
        )}
        {data.polymorphysm && data.polymorphysm.length > 0 && (
          <>
            <h3>Polymorphysm</h3>
            <FreeTextView comments={data.polymorphysm} />
          </>
        )}
        {data.rnaEditing && data.rnaEditing.length > 0 && (
          <>
            <h3>RNA Editing</h3>
            <RNAEditingView data={data.rnaEditing} />
          </>
        )}
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default SequenceSection;
