import React, { useCallback, FC } from 'react';
import { Loader } from 'franklin-sites';
import { html } from 'lit-html';
import joinUrl from 'url-join';

import { transformData } from 'protvista-variation-adapter';

import { UniProtProtvistaEvidenceTag } from './UniProtKBEvidenceTag';
import FeaturesTableView, { FeaturesTableCallback } from './FeaturesTableView';

import useDataApi from '../../../shared/hooks/useDataApi';
import useCustomElement from '../../../shared/hooks/useCustomElement';

import { UniProtkbAPIModel } from '../../adapters/uniProtkbConverter';

import apiUrls from '../../../shared/config/apiUrls';
import filterConfig, { colorConfig } from '../../config/variationFiltersConfig';

import FeatureType from '../../types/featureType';
import { Evidence } from '../../types/modelTypes';
import { ProcessedFeature } from './FeaturesView';

import './styles/variation-view.scss';

export type ProtvistaVariant = {
  begin: number;
  end: number;
  type: FeatureType.VARIANT;
  wildType: string;
  alternativeSequence: string;
  polyphenPrediction?: string;
  polyphenScore?: number;
  siftPrediction?: string;
  siftScore?: number;
  description?: string;
  consequenceType: string;
  cytogeneticBand?: string;
  genomicLocation?: string;
  somaticStatus?: number;
  sourceType: string;
  clinicalSignificances?: string;
  association?: {
    description: string;
    disease: boolean;
    name: string;
    evidences: { code: string; source: { name: string; id: string } }[];
  }[];
  xrefs: {
    alternativeUrl?: string;
    id: string;
    name: string;
    url: string;
  }[];
};

export type TransformedProtvistaVariant = ProtvistaVariant & {
  accession: string;
  start: string;
  tooltipContent: string;
  sourceType: string;
  variant: string;
  protvistaFeatureId: string;
  xrefNames: string[];
};

export type TransformedVariantsResponse = {
  sequence: string;
  variants: TransformedProtvistaVariant[];
};

const formatVariantDescription = (description: string) => {
  /* eslint-disable no-useless-escape */
  const pattern = /\[(\w+)\]: ([^\[]+)/g;
  const match = description.match(pattern);
  return match;
};

const getColumnConfig = (evidenceTagCallback: FeaturesTableCallback) => {
  return {
    positions: {
      label: 'Position(s)',
      resolver: (d: ProtvistaVariant) =>
        d.begin === d.end ? d.begin : `${d.begin}-${d.end}`,
    },
    change: {
      label: 'Change',
      resolver: (d: ProtvistaVariant) =>
        `${d.wildType}>${d.alternativeSequence}`,
    },
    consequence: {
      label: 'Consequence',
      child: true,
      resolver: (d: ProtvistaVariant) => d.consequenceType,
    },
    sift: {
      label: 'SIFT prediction',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        d.siftPrediction ? `${d.siftPrediction} (${d.siftScore})` : '',
    },
    polyphen: {
      label: 'Polyphen prediction',
      child: true,
      resolver: (d: ProtvistaVariant) =>
        d.polyphenPrediction
          ? `${d.polyphenPrediction} (${d.polyphenScore})`
          : '',
    },
    description: {
      label: 'Description',
      resolver: (d: ProtvistaVariant) => {
        if (!d.description) {
          return '';
        }
        const formatedDescription = formatVariantDescription(d.description);
        return formatedDescription
          ? formatedDescription.map(
              (descriptionLine) => html` <p>${descriptionLine}</p> `
            )
          : '';
      },
    },
    somaticStatus: {
      label: 'Somatic',
      child: true,
      resolver: (d: ProtvistaVariant) => (d.somaticStatus === 1 ? 'Y' : 'N'),
    },
    hasDisease: {
      label: 'Disease association',
      resolver: (d: ProtvistaVariant) =>
        d.association && d.association.length > 0 ? 'Y' : 'N',
    },
    association: {
      label: 'Disease association',
      child: true,
      resolver: (d: ProtvistaVariant) => {
        if (!d.association) {
          return '';
        }
        return d.association.map((association) => {
          return html`
            <p>
              ${association.name}
              ${association.evidences &&
              UniProtProtvistaEvidenceTag(
                association.evidences.map((evidence) => {
                  return {
                    evidenceCode: evidence.code,
                    source: evidence.source.name,
                    id: evidence.source.id,
                  } as Evidence;
                }),
                evidenceTagCallback
              )}
            </p>
          `;
        });
      },
    },
  };
};

const VariationView: FC<{
  primaryAccession: string;
  title?: string;
  hasTable?: boolean;
}> = ({ primaryAccession, title, hasTable = true }) => {
  const { loading, data, error, status } = useDataApi<UniProtkbAPIModel>(
    joinUrl(apiUrls.variation, primaryAccession)
  );

  const filterDefined = useCustomElement(
    () => import(/* webpackChunkName: "protvista-filter" */ 'protvista-filter'),
    'protvista-filter'
  );

  const protvistaFilterRef = useCallback(
    (node) => {
      if (node && filterDefined) {
        // eslint-disable-next-line no-param-reassign
        node.filters = filterConfig;
      }
    },
    [filterDefined]
  );

  const variationDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-variation" */ 'protvista-variation'
      ),
    'protvista-variation'
  );

  const protvistaVariationRef = useCallback(
    (node) => {
      if (node && variationDefined && data && data.features) {
        const transformedData: TransformedVariantsResponse = transformData(
          data
        );
        // eslint-disable-next-line no-param-reassign
        node.colorConfig = colorConfig;
        // eslint-disable-next-line no-param-reassign
        node.data = transformedData;
        // eslint-disable-next-line no-param-reassign
        node.length = transformedData.sequence.length;
      }
    },
    [variationDefined, data]
  );

  const navigationDefined = useCustomElement(
    () =>
      import(
        /* webpackChunkName: "protvista-navigation" */ 'protvista-navigation'
      ),
    'protvista-navigation'
  );
  const sequenceDefined = useCustomElement(
    () =>
      import(/* webpackChunkName: "protvista-sequence" */ 'protvista-sequence'),
    'protvista-sequence'
  );
  const managerDefined = useCustomElement(
    () =>
      import(/* webpackChunkName: "protvista-manager" */ 'protvista-manager'),
    'protvista-manager'
  );
  const ceDefined =
    filterDefined &&
    variationDefined &&
    navigationDefined &&
    sequenceDefined &&
    managerDefined;

  if (loading || !ceDefined) return <Loader />;

  if (error && status !== 404) {
    // TODO: use in-page error message
    return <div>An error happened</div>;
  }

  if (
    status === 404 ||
    !data ||
    !data.sequence ||
    !data.features ||
    data.features.length <= 0
  ) {
    return null;
  }

  return (
    <div>
      {title && <h3>{title}</h3>}
      <protvista-manager attributes="highlight displaystart displayend activefilters filters">
        {hasTable && (
          <div className="variation-view">
            <protvista-navigation length={data.sequence.length} />
            <protvista-sequence
              length={data.sequence.length}
              sequence={data.sequence}
              height="20"
              filter-scroll
            />
            <protvista-filter
              for="variation-component"
              ref={protvistaFilterRef}
            />
            <protvista-variation
              id="variation-component"
              length={data.sequence.length}
              ref={protvistaVariationRef}
            />
          </div>
        )}
        {/* TODO: check models, because I have no idea what I'm doing here 🤷🏽‍♂️ */}
        <FeaturesTableView
          data={(data.features as unknown) as ProcessedFeature[]}
          getColumnConfig={getColumnConfig}
        />
      </protvista-manager>
    </div>
  );
};

export default VariationView;
