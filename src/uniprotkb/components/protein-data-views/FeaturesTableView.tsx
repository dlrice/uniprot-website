import React, { useCallback, useState, FC } from 'react';
import { TemplateResult } from 'lit-html';

import { UniProtEvidenceTagContent } from './UniProtKBEvidenceTag';
import { ProtvistaFeature, ProcessedFeature } from './FeaturesView';
import { ProtvistaVariant } from './VariationView';

import useCustomElement from '../../../shared/hooks/useCustomElement';

import { EvidenceData } from '../../config/evidenceCodes';
import { Evidence } from '../../types/modelTypes';

type FeatureColumns = {
  [name: string]: {
    label: string;
    resolver: (
      d: ProtvistaFeature & ProtvistaVariant
    ) => string | number | TemplateResult | TemplateResult[];
  };
};

export type FeaturesTableCallback = (
  evidenceData: EvidenceData,
  references: Evidence[] | undefined
) => void;

const FeaturesTableView: FC<{
  data: ProcessedFeature[] | ProtvistaVariant[];
  getColumnConfig: (
    callback: (
      evidenceData: EvidenceData,
      references: Evidence[] | undefined
    ) => void
  ) => FeatureColumns;
}> = ({ data, getColumnConfig }) => {
  const [showEvidenceTagData, setShowEvidenceTagData] = useState(false);
  const [selectedEvidenceData, setSelectedEvidenceData] = useState<
    EvidenceData
  >();
  const [selectedReferences, setSelectedReferences] = useState<Evidence[]>();

  const evidenceTagCallback: FeaturesTableCallback = (
    evidenceData,
    references
  ) => {
    setSelectedEvidenceData(evidenceData);
    setSelectedReferences(references);
    setShowEvidenceTagData(true);
  };

  const datatableDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-datatable" */ 'protvista-datatable'
      ),
    'protvista-datatable'
  );

  const setTableData = useCallback(
    (node): void => {
      if (node && datatableDefined) {
        // eslint-disable-next-line no-param-reassign
        node.data = data;
        // eslint-disable-next-line no-param-reassign
        node.columns = getColumnConfig(evidenceTagCallback);
      }
    },
    [datatableDefined, data, getColumnConfig]
  );

  return (
    <>
      <protvista-datatable ref={setTableData} filter-scroll />
      <div
        className={`evidence-tag-content ${
          showEvidenceTagData && 'evidence-tag-content--visible'
        }`}
      >
        {selectedEvidenceData && selectedReferences && (
          <UniProtEvidenceTagContent
            evidenceData={selectedEvidenceData}
            evidences={selectedReferences}
          />
        )}
      </div>
    </>
  );
};

export default FeaturesTableView;
