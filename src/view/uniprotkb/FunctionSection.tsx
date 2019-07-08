import React, { Fragment, FC } from 'react';
import { Card } from 'franklin-sites';
import FreeTextView from '../uniprotkb/components/FreeTextView';
import CatalyticActivityView from '../uniprotkb/components/CatalyticActivityView';
import KeywordView from '../uniprotkb/components/KeywordView';
import XRefView from '../uniprotkb/components/XRefView';
import FeaturesView from '../uniprotkb/components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import { hasContent } from '../../model/utils/utils';
import Comment from '../../model/types/Comment';
import { UIModel } from '../../model/uniprotkb/SectionConverter';
import GORibbon from '../uniprotkb/components/GORibbon';

const subject = 'MGI:MGI:97490';
const mode = undefined;
const entityLabel = 2;
const colorBy = 0;
const binaryColor = false;

const FunctionSection: FC<{
  data: UIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }) => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <Fragment>
      <Card title={EntrySection.Function}>
        <FreeTextView comments={data.commentsData.get(Comment.FUNCTION)} />
        <CatalyticActivityView
          comments={data.commentsData.get(Comment.CATALYTIC_ACTIVITY)}
        />
        <FreeTextView
          comments={data.commentsData.get(Comment.PATHWAY)}
          includeTitle={true}
        />
        <FreeTextView
          comments={data.commentsData.get(Comment.MISCELLANEOUS)}
          includeTitle={true}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <GORibbon primaryAccession={primaryAccession} />
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </Fragment>
  );
};

export default FunctionSection;
