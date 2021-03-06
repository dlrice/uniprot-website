import React, { Fragment } from 'react';
import { Card, ExpandableList, ExternalLink } from 'franklin-sites';
import { v1 } from 'uuid';
import { groupBy } from 'lodash-es';
import { UniProtkbUIModel } from '../../adapters/uniProtkbConverter';
import XRefView from '../protein-data-views/XRefView';
import EntrySection, { EntrySectionIDs } from '../../types/entrySection';
import { XrefUIModel, XrefsGoupedByDatabase } from '../../utils/xrefUtils';
import { CommentType, WebResourceComment } from '../../types/commentTypes';
import { DatabaseCategory } from '../../types/databaseRefs';

type EntryExternalLinksProps = {
  transformedData: UniProtkbUIModel;
};

export type EntryExternalLinks = {
  xrefData: XrefUIModel[];
};

type WebResourceLinkProps = {
  comment: WebResourceComment;
};

const WebResourceLink: React.FC<WebResourceLinkProps> = ({ comment }) => {
  const { note, resourceName, resourceUrl } = comment;
  const noteNode = note && ` (${note})`;
  return (
    <ExternalLink url={resourceUrl}>
      {resourceName}
      {noteNode}
    </ExternalLink>
  );
};

const EntryExternalLinks: React.FC<EntryExternalLinksProps> = ({
  transformedData,
}) => {
  const {
    [EntrySection.ExternalLinks]: data,
    primaryAccession,
    [EntrySection.Sequence]: { sequence },
  } = transformedData;
  // Needed for SMR implicit xref
  const crc64 = sequence && sequence.crc64;
  const webResourceComments = data.commentsData.get(CommentType.WEB_RESOURCE);

  // Merge all of the external links from the entry page sections
  const databaseCategoryToXrefsGoupedByDatabase = new Map<
    DatabaseCategory,
    XrefsGoupedByDatabase[]
  >();
  Object.values(EntrySection).forEach((entrySection) => {
    transformedData[entrySection as EntrySection].xrefData?.forEach(
      ({ category, databases }) => {
        const currentDatabases = databaseCategoryToXrefsGoupedByDatabase.get(
          category
        );
        const newDatabases = currentDatabases
          ? [...currentDatabases, ...databases]
          : databases;
        databaseCategoryToXrefsGoupedByDatabase.set(category, newDatabases);
      }
    );
  });

  const xrefData = Array.from(
    databaseCategoryToXrefsGoupedByDatabase.entries()
  ).map(([category, xrefsGoupedByDatabase]) => ({
    category,
    databases: Object.values(
      groupBy(
        xrefsGoupedByDatabase,
        (xrefs: XrefsGoupedByDatabase) => xrefs.database
      )
      // Only need the first entry as it assumed that each database
      // list is the same across all of the sections
    ).map((v) => v[0]),
  }));

  return (
    <div id={EntrySectionIDs[EntrySection.ExternalLinks]} data-entry-section>
      <Card title={EntrySection.ExternalLinks}>
        {webResourceComments && (
          <Fragment>
            <h3>Web resources</h3>
            <ExpandableList descriptionString="alternative names">
              {webResourceComments.map((comment) => ({
                id: v1(),
                content: (
                  <WebResourceLink comment={comment as WebResourceComment} />
                ),
              }))}
            </ExpandableList>
          </Fragment>
        )}
        <XRefView
          xrefs={xrefData}
          primaryAccession={primaryAccession}
          crc64={crc64}
        />
      </Card>
    </div>
  );
};

export default EntryExternalLinks;
