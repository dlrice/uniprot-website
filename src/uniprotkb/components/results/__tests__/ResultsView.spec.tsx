import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import ResultsView from '../ResultsView';
import { ViewMode } from '../../../state/resultsInitialState';
import { render } from '@testing-library/react';
import { UniProtKBColumn } from '../../../types/columnTypes';
import '../../__mocks__/mockApi';

const props = {
  columns: [UniProtKBColumn.accession],
  handleEntrySelection: jest.fn(),
  selectedEntries: [],
};

// FIXME: none of this is testing the right thing, the snapshots are just
// FIXME: containing the <Loader /> component
describe.skip('ResultsView component', () => {
  it('should render table', async () => {
    await act(async () => {
      const { asFragment, rerender } = render(
        <Router>
          <ResultsView viewMode={ViewMode.TABLE} {...props} />
        </Router>
      );
      rerender(
        <Router>
          <ResultsView viewMode={ViewMode.TABLE} {...props} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('should render cards', async () => {
    await act(async () => {
      const { asFragment } = render(
        <Router>
          <ResultsView viewMode={ViewMode.CARD} {...props} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
