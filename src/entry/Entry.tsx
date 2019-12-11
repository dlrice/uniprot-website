import React, { Fragment, memo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Card, InPageNav, DownloadIcon, Loader } from 'franklin-sites';
import useDataApi from '../utils/useDataApi';
import UniProtKBEntryConfig from '../view/uniprotkb/UniProtEntryConfig';
import apiUrls from '../utils/apiUrls';
import { ProteinOverview } from '../view/uniprotkb/components/ProteinOverviewView';
import uniProtKbConverter, {
  UniProtkbUIModel,
} from '../model/uniprotkb/UniProtkbConverter';
import { hasContent, hasExternalLinks } from '../model/utils/utils';
import SideBarLayout from '../layout/SideBarLayout';
import UniProtTitle from '../view/uniprotkb/components/UniProtTitle';
import EntrySection from '../model/types/EntrySection';
import Main from './Main';

type MatchParams = {
  accession: string;
};

type EntryProps = RouteComponentProps<MatchParams>;

const Entry: React.FC<EntryProps> = ({ match }) => {
  const url = apiUrls.entry(match.params.accession);
  const entryData = useDataApi(url);
  if (Object.keys(entryData).length === 0) {
    return <Loader />;
  }

  const transformedData: UniProtkbUIModel = uniProtKbConverter(entryData);

  const sections = UniProtKBEntryConfig.map(section => ({
    label: section.name,
    id: section.name,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    disabled:
      section.name === EntrySection.ExternalLinks
        ? !hasExternalLinks(transformedData)
        : !hasContent((transformedData as any)[section.name]),
  }));

  return (
    <SideBarLayout sidebar={<InPageNav sections={sections} />}>
      <Main transformedData={transformedData} />
    </SideBarLayout>
  );
};

export default withRouter(Entry);
