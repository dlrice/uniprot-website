/* eslint-disable react/no-unused-prop-types */
import React, { useCallback, useMemo, useState } from 'react';
import { DataTable, DENSITY_COMPACT } from 'franklin-sites';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';

import apiUrls from '../../../shared/config/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import { ReviewedUnreviewed } from '../../../shared/components/entry/EntryTitle';
import { EntryType } from '../../adapters/uniProtkbConverter';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { addMessage } from '../../../messages/state/messagesActions';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import AlignButton from '../../../shared/components/action-buttons/Align';
import { Location, LocationToPath } from '../../../app/config/urls';

// NOTE: Jie told me this would be replaced by a different
// format he called "FASTA" entry
type ProteinEntryLight = {
  accession: string;
  entryType: string;
  sequenceLength: number;
  geneName: string;
  geneNameType: string;
};

type GeneCentricData = {
  canonicalProtein: ProteinEntryLight;
  relatedProteins: ProteinEntryLight[];
};

const ComputationalyMappedSequences: React.FC<{ primaryAccession: string }> = ({
  primaryAccession,
}) => {
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);

  const columns = [
    {
      label: 'Accession',
      name: 'accession',
      render: ({ accession, entryType }: ProteinEntryLight) => {
        return (
          <Link to={`/uniprotkb/${accession}`}>
            <ReviewedUnreviewed
              entryType={
                entryType.match(/TrEMBL/i)
                  ? EntryType.UNREVIEWED
                  : EntryType.REVIEWED
              }
            />
            {accession}
          </Link>
        );
      },
    },
    {
      label: 'Gene name',
      name: 'gene_name',
      render: ({ geneName }: ProteinEntryLight) => geneName,
    },
    {
      label: 'Gene name type',
      name: 'gene_name_type',
      render: ({ geneNameType }: ProteinEntryLight) => geneNameType,
    },
    {
      label: 'Length',
      name: 'length',
      render: ({ sequenceLength }: ProteinEntryLight) => sequenceLength,
    },
  ];

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, loading, error, status } = useDataApi<GeneCentricData>(
    apiUrls.genecentric(primaryAccession)
  );

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = useCallback((rowId: string) => {
    setSelectedEntries((selectedEntries) => {
      const filtered = selectedEntries.filter((id) => id !== rowId);
      return filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered;
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!data) {
      return null;
    }
    return data.relatedProteins.filter(
      ({ accession, geneNameType }) =>
        geneNameType === 'Gene name' && !accession.startsWith(primaryAccession)
    );
  }, [primaryAccession, data]);

  const handleViewAll = useCallback(() => {
    const queryString = filteredData
      ?.map(({ accession }) => `accession:${accession}`)
      .join(' OR ');
    history.push(
      `${LocationToPath[Location.UniProtKBResults]}?query=(${queryString})`
    );
  }, [history, filteredData]);

  if (error) {
    if (status === 404) {
      // Fail silently, this just means there's no data
      return null;
    }
    dispatch(
      addMessage({
        id: v1(),
        content: `Could not load computationally mapped sequences: ${error.message}`,
        format: MessageFormat.POP_UP,
        level: MessageLevel.FAILURE,
      })
    );
  }

  if (loading || !filteredData) {
    return null;
  }

  return (
    <>
      <h3>Computationally mapped potential isoform sequences</h3>
      <p>
        There are {filteredData.length} potential isoforms mapped to this entry
      </p>
      <div className="button-group">
        <BlastButton selectedEntries={selectedEntries} />
        <AlignButton selectedEntries={selectedEntries} />
        <AddToBasketButton selectedEntries={selectedEntries} />
        <button
          type="button"
          className="button tertiary"
          onClick={handleViewAll}
        >
          View all
        </button>
      </div>

      <div data-loader-scroll="computationaly-mapped">
        <DataTable
          getIdKey={({ accession }: { accession: string }) => accession}
          density={DENSITY_COMPACT}
          columns={columns}
          data={filteredData}
          selectable
          selected={selectedEntries}
          onSelect={handleSelectedEntries}
          scrollDataAttribute="computationaly-mapped"
        />
      </div>
    </>
  );
};

export default ComputationalyMappedSequences;
