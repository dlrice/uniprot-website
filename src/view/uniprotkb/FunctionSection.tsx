import React, { FC, Fragment } from 'react';
import { v1 } from 'uuid';
import { Card } from 'franklin-sites';
import { hasContent } from '../../model/utils/utils';
import FreeTextView, { TextView } from './components/FreeTextView';
import CatalyticActivityView from './components/CatalyticActivityView';
import KeywordView from './components/KeywordView';
import XRefView from './components/XRefView';
import FeaturesView from './components/FeaturesView';
import EntrySection from '../../model/types/EntrySection';
import {
  CommentType,
  CatalyticActivityComment,
  FreeTextComment,
} from '../../model/types/CommentTypes';
import GoRibbon from './components/GoRibbon';
import UniProtEvidenceTag from '../../components/UniProtEvidenceTag';
import {
  FunctionUIModel,
  BioPhysicoChemicalProperties,
  Absorption,
  KineticParameters,
  CofactorComment,
} from '../../model/uniprotkb/sections/FunctionConverter';
import GOView from './components/GOView';

export const AbsorptionView: FC<{ data: Absorption }> = ({ data }) => {
  return (
    <Fragment>
      <section className="text-block">
        {`Abs(max) = ${data.approximate && '~'}${data.max}nm`}
      </section>
      <section className="text-block">
        {data.note && <TextView comments={data.note.texts} />}
        {data.evidences && <UniProtEvidenceTag evidences={data.evidences} />}
      </section>
    </Fragment>
  );
};

export const KineticsView: FC<{ data: KineticParameters }> = ({ data }) => {
  return (
    <Fragment>
      <section className="text-block">
        {data.michaelisConstants && (
          <ul className="no-bullet">
            {data.michaelisConstants.map(km => (
              <li key={km.constant}>
                K<sub>M</sub>
                {`=${km.constant}${km.unit} for ${km.substrate} `}
                <UniProtEvidenceTag evidences={km.evidences} />
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="text-block">
        {data.note && <TextView comments={data.note.texts} />}
      </section>
    </Fragment>
  );
};

const BioPhysicoChemicalPropertiesView: FC<{
  data: BioPhysicoChemicalProperties;
}> = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      {data.absorption && (
        <Fragment>
          <h4>Absorption</h4>
          <AbsorptionView data={data.absorption} />
        </Fragment>
      )}
      {data.kinetics && (
        <Fragment>
          <h4>Kinetics</h4>
          <KineticsView data={data.kinetics} />
        </Fragment>
      )}
      {data.pHDependence && (
        <Fragment>
          <h4>pH Dependence</h4>
          <TextView comments={data.pHDependence} />
        </Fragment>
      )}
      {data.redoxPotential && (
        <Fragment>
          <h4>Redox Potential</h4>
          <TextView comments={data.redoxPotential} />
        </Fragment>
      )}
      {data.temperatureDependence && (
        <Fragment>
          <h4>Temperature Dependence</h4>
          <TextView comments={data.temperatureDependence} />
        </Fragment>
      )}
    </Fragment>
  );
};

export const CofactorView: FC<{
  cofactors?: CofactorComment[];
  title?: string;
}> = ({ cofactors, title }) => {
  if (!cofactors || !cofactors.length) {
    return null;
  }
  return (
    <Fragment>
      {title && <h3>{title}</h3>}
      {cofactors.map(cofactorComment => (
        <section className="text-block" key={v1()}>
          {cofactorComment.cofactors &&
            cofactorComment.cofactors.map(cofactor => (
              <span key={cofactor.name}>
                {cofactor.name}{' '}
                {cofactor.evidences && (
                  <UniProtEvidenceTag evidences={cofactor.evidences} />
                )}
              </span>
            ))}
          {cofactorComment.note && (
            <TextView comments={cofactorComment.note.texts} />
          )}
        </section>
      ))}
    </Fragment>
  );
};

const FunctionSection: FC<{
  data: FunctionUIModel;
  sequence: string;
  primaryAccession: string;
}> = ({ data, sequence, primaryAccession }): JSX.Element | null => {
  if (!hasContent(data)) {
    return null;
  }
  return (
    <div id={EntrySection.Function}>
      <Card title={EntrySection.Function}>
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.FUNCTION) as FreeTextComment[]
          }
        />
        <CatalyticActivityView
          comments={
            data.commentsData.get(
              CommentType.CATALYTIC_ACTIVITY
            ) as CatalyticActivityComment[]
          }
          title={CommentType.CATALYTIC_ACTIVITY.toLocaleLowerCase()}
        />
        <CofactorView
          cofactors={
            data.commentsData.get(CommentType.COFACTOR) as CofactorComment[]
          }
          title={CommentType.COFACTOR.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.PATHWAY) as FreeTextComment[]
          }
          title={CommentType.PATHWAY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.MISCELLANEOUS
            ) as FreeTextComment[]
          }
          title={CommentType.MISCELLANEOUS.toLowerCase()}
        />
        <BioPhysicoChemicalPropertiesView
          data={data.bioPhysicoChemicalProperties}
        />
        <FreeTextView
          comments={
            data.commentsData.get(CommentType.PATHWAY) as FreeTextComment[]
          }
          title={CommentType.PATHWAY.toLowerCase()}
        />
        <FreeTextView
          comments={
            data.commentsData.get(
              CommentType.ACTIVITY_REGULATION
            ) as FreeTextComment[]
          }
          title={CommentType.ACTIVITY_REGULATION.toLowerCase()}
        />
        <FeaturesView features={data.featuresData} sequence={sequence} />
        <GoRibbon primaryAccession={primaryAccession} />
        {data.goTerms && <GOView data={data.goTerms} />}
        <KeywordView keywords={data.keywordData} />
        <XRefView xrefs={data.xrefData} primaryAccession={primaryAccession} />
      </Card>
    </div>
  );
};

export default FunctionSection;
