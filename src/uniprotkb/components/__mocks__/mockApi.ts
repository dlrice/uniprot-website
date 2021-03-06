import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import results from './results.json';
import noResults from './noResults.json';
import entry from './swissprotEntry.json';
import resultFields from '../../__mocks__/resultFields.json';
import mockFasta from './fasta.json';

const mock = new MockAdapter(axios);
mock.onGet(/.+noresult/).reply(200, noResults, { 'x-totalrecords': 0 });
mock.onGet(/\/uniprotkb\/search/).reply(200, results, { 'x-totalrecords': 25 });
mock.onGet(/\/uniprotkb\/result-fields/).reply(200, resultFields);
mock
  .onGet(/\/uniprotkb\/stream/)
  .reply(200, mockFasta, { 'content-type': 'text/fasta' });
mock.onGet(/\/uniprotkb\//).reply(200, entry);

export default mock;
