import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, RootAction } from '../state/state-types';
import DownloadView from './DownloadView';
import { Column } from '../model/types/ColumnTypes';
import { FileFormat, fileFormatToContentType } from './types/resultsTypes';
import { getDownloadUrl } from '../utils/apiUrls';
import idx from 'idx';
import fetchData from '../utils/fetchData';
import content from '*.svg';

const replaceExcelWithTsv = (fileFormat: FileFormat) =>
  fileFormat === FileFormat.excel ? FileFormat.tsv : fileFormat;

const compareDownloadsUrlsDisregardSize = (url1: string, url2: string) => {
  const reSize = /&size=\d+/;
  return url1.replace(reSize, '') === url2.replace(reSize, '');
};

type DownloadTableProps = {
  tableColumns: Column[];
  updateTableColumns: (columnIds: Column[]) => void;
} & RouteComponentProps;

const Download: React.FC<DownloadTableProps> = ({
  tableColumns,
  history,
  location: {
    state: {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
      selectedEntries,
      nResults,
    },
  },
}) => {
  const [selectedColumns, setSelectedColumns] = useState(tableColumns);
  const [downloadAll, setDownloadAll] = useState(true);
  const [fileFormat, setFileFormat] = useState(FileFormat.fastaCanonical);
  const [compressed, setCompressed] = useState(true);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [preview, setPreview] = useState({
    url: '',
    contentType: '',
    data: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = getDownloadUrl({
      query,
      columns: selectedColumns,
      selectedFacets,
      sortColumn,
      sortDirection,
      fileFormat,
      compressed,
      selectedAccessions: downloadAll ? [] : selectedEntries,
    });
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    history.goBack();
  };

  const handleCancel = () => {
    history.goBack();
  };

  const handlePreview = (nPreview: number) => {
    const fileFormatExcelReplaced = replaceExcelWithTsv(fileFormat);
    const url = getDownloadUrl({
      query,
      columns: selectedColumns,
      selectedFacets,
      sortColumn,
      sortDirection,
      fileFormat: fileFormatExcelReplaced,
      compressed,
      size: nPreview,
      selectedAccessions: downloadAll ? [] : selectedEntries,
    });
    setLoadingPreview(true);
    fetchData(url, {
      Accept: fileFormatToContentType.get(fileFormatExcelReplaced),
    })
      .then(response => {
        const contentType = idx(
          response,
          o => o.headers['content-type']
        ) as FileFormat;
        setPreview({
          data:
            contentType === fileFormatToContentType.get(FileFormat.json)
              ? JSON.stringify(response.data, null, 2)
              : response.data,
          url: idx(response, o => o.config.url) || '',
          contentType,
        });
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
        setLoadingPreview(false);
      });
  };
  const downloadUrl = getDownloadUrl({
    query,
    columns: selectedColumns,
    selectedFacets,
    sortColumn,
    sortDirection,
    fileFormat,
    compressed,
    selectedAccessions: downloadAll ? [] : selectedEntries,
  });
  return (
    <DownloadView
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onPreview={handlePreview}
      selectedColumns={selectedColumns}
      downloadAll={downloadAll}
      fileFormat={fileFormat}
      compressed={compressed}
      onSelectedColumnsChange={setSelectedColumns}
      nSelectedEntries={selectedEntries.length}
      onDownloadAllChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setDownloadAll(e.target.value === 'true')
      }
      onFileFormatChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setFileFormat(e.target.value as FileFormat)
      }
      onCompressedChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setCompressed(e.target.value === 'true')
      }
      preview={
        compareDownloadsUrlsDisregardSize(preview.url, downloadUrl) &&
        preview.data &&
        preview.contentType ===
          fileFormatToContentType.get(replaceExcelWithTsv(fileFormat))
          ? preview.data
          : ''
      }
      loadingPreview={loadingPreview}
      nResults={nResults}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  tableColumns: state.results.tableColumns,
});

const DownloadContainer = withRouter(connect(mapStateToProps)(Download));

export default DownloadContainer;
