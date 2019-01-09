import React, { Fragment } from 'react';
import { FieldType } from './types/searchTypes';

interface RangeFieldProps {
  field: FieldType;
  type: string;
  handleChange: (value: string, isFrom: boolean) => void;
  rangeFrom?: string;
  rangeTo?: string;
}

const RangeField = ({
  field,
  type,
  handleChange,
  rangeFrom = '',
  rangeTo = '',
}: RangeFieldProps) => (
  <Fragment>
    <label htmlFor={`from_input_${field.id}`}>
      From
      <input
        id={`from_input_${field.id}`}
        type={type}
        onChange={e => handleChange(e.target.value, true)}
        placeholder="0"
        value={rangeFrom}
      />
    </label>
    <label htmlFor={`to_input_${field.id}`}>
      To
      <input
        id={`to_input_${field.id}`}
        type={type}
        onChange={e => handleChange(e.target.value, false)}
        placeholder="100"
        value={rangeTo}
      />
    </label>
  </Fragment>
);

export default RangeField;