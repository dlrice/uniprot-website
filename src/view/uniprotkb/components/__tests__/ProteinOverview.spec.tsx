import React from 'react';
import { render } from 'react-testing-library';
import ProteinOverview from '../ProteinOverviewView';
import ProteinNamesUIDataJson from '../__mocks__/ProteinNamesUIData.json';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <ProteinOverview
        data={ProteinNamesUIDataJson}
        primaryAccession="P05067"
        proteinExistence="Exists"
        uniProtId="Some nameu"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
