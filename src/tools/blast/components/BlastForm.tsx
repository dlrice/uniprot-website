import React, {
  FC,
  Fragment,
  useState,
  FormEvent,
  MouseEvent,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import {
  CloseIcon,
  Chip,
  RefreshIcon,
  WarningIcon,
  PageIntro,
} from 'franklin-sites';
import queryString from 'query-string';
import { throttle } from 'lodash-es';
import { useHistory } from 'react-router-dom';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import { FormParameters } from '../types/blastFormParameters';
import { Job } from '../types/blastJob';

import * as actions from '../../state/toolsActions';
import { LocationToPath, Location } from '../../../app/config/urls';
import initialFormValues, {
  BlastFormValues,
  BlastFields,
  SelectedTaxon,
} from '../config/BlastFormData';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import fetchData from '../../../shared/utils/fetchData';
import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

import './styles/BlastForm.scss';
import {
  SType,
  Program,
  Sequence,
  Matrix,
  GapAlign,
  Database,
  Exp,
  Filter,
  Scores,
  TaxIDs,
} from '../types/blastServerParameters';
import infoMappings from '../../../shared/config/InfoMappings';
import { Tool } from '../../types';

const FormSelect: FC<{
  formValues: BlastFormValues;
  type: BlastFields;
  updateFormValues: (type: BlastFields, value: string) => void;
}> = ({ formValues, type, updateFormValues }) => {
  const formObject = formValues[type];
  if (!formObject) {
    return null;
  }
  return (
    <section className="blast-form-section__item">
      <label htmlFor={type}>
        {type}
        <select
          id={type}
          value={formValues[type].selected as string}
          onChange={(e) => updateFormValues(type, e.target.value)}
        >
          {formObject.values &&
            formObject.values.map((formValue) => (
              <option
                value={String(formValue.value)}
                key={String(formValue.value)}
              >
                {formValue.label ? formValue.label : formValue.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

interface CustomLocationState {
  parameters?: Job['parameters'];
}

const BlastForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [displayAdvanced, setDisplayAdvanced] = useState(false);
  const [formValues, setFormValues] = useState<BlastFormValues>(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState: FormParameters | undefined = (history
      .location?.state as CustomLocationState)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const output = {};
      for (const [key, field] of Object.entries(
        initialFormValues as BlastFormValues
      )) {
        output[key] = {
          ...field,
          selected: parametersFromHistoryState[field.fieldName],
        };
      }
      return output as BlastFormValues;
    }
    // otherwise, pass the default values
    return initialFormValues;
  });

  const [searchByIDValue, setSearchByIDValue] = useState('');
  const [sequenceData, setSequenceData] = useState(null);
  const [sequenceImportFeedback, setSequenceImportFeedback] = useState('');

  const updateFormValue = (type: BlastFields, value: string) => {
    setFormValues({
      ...formValues,
      [type]: { ...formValues[type], selected: value },
    });
  };

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const taxonFormValues = formValues[BlastFields.taxons];
    const { selected = [] } = taxonFormValues;

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) return;

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');

    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: [{ id, label }, ...selected],
      },
    });
  };

  const removeTaxonFormValue = (id: string | number) => {
    const taxonFormValues = formValues[BlastFields.taxons];
    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: taxonFormValues.selected.filter(
          (taxon: SelectedTaxon) => taxon.id !== id
        ),
      },
    });
  };

  const getTaxIDs = (taxons: SelectedTaxon[] = []) =>
    taxons.map(({ id }) => id).join(',');

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    const sequence = formValues[BlastFields.sequence].selected as Sequence;
    // TODO: validate sequence

    const parameters: FormParameters = {
      stype: formValues[BlastFields.stype].selected as SType,
      program: formValues[BlastFields.program].selected as Program,
      sequence,
      database: formValues[BlastFields.targetDb].selected as Database,
      taxIDs: getTaxIDs(
        formValues[BlastFields.taxons].selected as SelectedTaxon[]
      ) as TaxIDs,
      threshold: formValues[BlastFields.threshold].selected as Exp,
      matrix: formValues[BlastFields.matrix].selected as Matrix,
      filter: formValues[BlastFields.filter].selected as Filter,
      gapped: (formValues[BlastFields.gapped].selected === 'true') as GapAlign,
      hits: parseInt(
        formValues[BlastFields.hits].selected as string,
        10
      ) as Scores,
    };

    const jobName = formValues[BlastFields.name].selected as string;

    // TODO: need to cast the values to the right types
    // e.g. hits 50 gets stored as a string somehow...

    // we emit an action containing only the parameters and the type of job
    // the reducer will be in charge of generating a proper job object for
    // internal state
    dispatch(actions.createJob(parameters, 'blast', jobName));
    // navigate to the dashboard
    history.push(LocationToPath[Location.Dashboard], { parameters });
  };

  const resetSequenceData = () => {
    setSequenceData(null);
    updateFormValue(BlastFields.sequence, '');
  };

  const updateImportSequenceFeedback = throttle((feedback: string) => {
    setSequenceImportFeedback(feedback);
  }, 500);

  const getSequenceByAccessionOrID = (input: string) => {
    if (!input) {
      resetSequenceData();
      return;
    }

    const clearInput = input.replace(/\s/g, '');

    if (!clearInput.length < 0) {
      resetSequenceData();
      return;
    }

    const query = queryString.stringify({
      query: uniProtKBAccessionRegEx.test(clearInput)
        ? `accession:${clearInput}`
        : `id:${clearInput}`,
      fields: 'sequence, id',
    });

    // setSequenceImportFeedback('loading');
    updateImportSequenceFeedback('loading');

    const fetchUrl = fetchData(`${uniProtKBApiUrls.search}?${query}`)
      .then(({ data }) => {
        const { results } = data;
        if (results) {
          if (results.length > 0) {
            setSequenceData(results[0]);
            updateFormValue(BlastFields.sequence, results[0].sequence.value);
            setSequenceImportFeedback('success');
            return;
          } else {
            // setSequenceImportFeedback('no-results');
            updateImportSequenceFeedback('no-results');
          }
        } else {
          // setSequenceImportFeedback('invalid');
          updateImportSequenceFeedback('invalid');
        }

        resetSequenceData();
      })
      .catch((e) => {
        console.error("can't get the sequence:", e);
      });
  };

  const sequenceMetaData =
    sequenceData &&
    `(${sequenceData.uniProtkbId}:${sequenceData.primaryAccession})`;

  useEffect(() => {
    getSequenceByAccessionOrID(searchByIDValue);
  }, [searchByIDValue]);

  const { name, links, info } = infoMappings[Tool.blast];

  return (
    <SingleColumnLayout>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitBlastJob}>
        <fieldset>
          <section>
            <legend>
              Find a protein to BLAST by UniProtID or keyword (examples).
            </legend>
            <div className="import-sequence-section">
              <input
                type="text"
                onChange={({ target }) => setSearchByIDValue(target.value)}
                value={searchByIDValue}
              />
              <span className="import-sequence-section_feedback">
                {sequenceImportFeedback === 'loading' && (
                  <RefreshIcon width="32" height="32" />
                )}
                {sequenceImportFeedback === 'no-results' &&
                  searchByIDValue !== '' && (
                    <CloseIcon width="32" height="32" />
                  )}
                {/* sequenceImportFeedback === 'invalid' && <CloseIcon width="32" height="32" /> */}
              </span>
            </div>
          </section>
        </fieldset>
        <fieldset>
          <section>
            <legend>Sequence {sequenceData && sequenceMetaData}</legend>
            <textarea
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={(e) =>
                updateFormValue(BlastFields.sequence, e.target.value)
              }
              className="blast-form-textarea"
              value={formValues[BlastFields.sequence].selected}
            />
          </section>
          <section className="blast-form-section">
            <FormSelect
              formValues={formValues}
              type={BlastFields.targetDb}
              updateFormValues={updateFormValue}
            />
            <section className="blast-form-section__item blast-form-section__item--taxon-select">
              <AutocompleteWrapper
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict to taxonomy"
                clearOnSelect={true}
              />
            </section>
            <section className="blast-form-section__item blast-form-section__item--selected-taxon">
              {(
                (formValues[BlastFields.taxons].selected as SelectedTaxon[]) ||
                []
              ).map(({ label, id }: SelectedTaxon) => (
                <div key={label}>
                  <Chip
                    onRemove={() => removeTaxonFormValue(id)}
                    className="secondary"
                  >
                    {label}
                  </Chip>
                </div>
              ))}
            </section>
          </section>
          <section>
            <section className="blast-form-section__item">
              <label>
                Name your BLAST job
                <input
                  name="title"
                  type="text"
                  placeholder="my job title"
                  onChange={(e) =>
                    updateFormValue(BlastFields.name, e.target.value)
                  }
                />
              </label>
            </section>
            <section className="blast-form-section__item blast-form-section__submit">
              <input
                className="button primary"
                type="submit"
                onClick={submitBlastJob}
                value="Submit"
              />
            </section>
          </section>
          <button
            type="button"
            className="button tertiary"
            onClick={() => setDisplayAdvanced((display) => !display)}
          >
            Advanced {displayAdvanced ? '▾' : '▸'}
          </button>
          {displayAdvanced && (
            <>
              <section className="blast-form-section">
                {[
                  BlastFields.stype,
                  BlastFields.program,
                  BlastFields.threshold,
                  BlastFields.matrix,
                  BlastFields.filter,
                  BlastFields.gapped,
                  BlastFields.hits,
                ].map((blastField) => (
                  <FormSelect
                    key={blastField}
                    formValues={formValues}
                    type={blastField}
                    updateFormValues={updateFormValue}
                  />
                ))}
              </section>
              <section>
                <input className="button secondary" type="reset" />
              </section>
            </>
          )}
        </fieldset>
      </form>
    </SingleColumnLayout>
  );
};

export default BlastForm;
