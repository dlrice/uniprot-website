import {
  UniProtkbUIModel,
  UniProtKBUIInactiveEntryModel,
} from '../../model/uniprotkb/UniProtkbConverter';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { Facet } from '../../types/responseTypes';

export type EntryState = {
  accession: string | null;
  isFetching: boolean;
  data: UniProtkbUIModel | UniProtKBUIInactiveEntryModel | null;
  publicationsData: {
    isFetching: boolean;
    data: LiteratureForProteinAPI[];
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
};

const entryInitialState = {
  accession: null,
  isFetching: false,
  data: null,
  publicationsData: {
    isFetching: false,
    data: [],
    facets: [],
    nextUrl: '',
    total: 0,
  },
};

export default entryInitialState;
