import { invert } from 'lodash-es';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniProtKBDownload = 'UniProtKBDownload',
  Blast = 'Blast',
  BlastResult = 'BlastResult',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  UniProtKBQueryBuilder = 'UniProtKBQueryBuilder',
  Dashboard = 'Dashboard',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.UniProtKBDownload]: '/download',
  [Location.BlastResult]: '/blast/:id',
  [Location.Blast]: '/blast',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.UniProtKBQueryBuilder]: '/advanced-search',
  [Location.Dashboard]: '/tool-dashboard',
};

export const PathToLocation = invert(LocationToPath);