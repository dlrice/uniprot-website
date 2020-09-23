import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import { Clause } from '../types/searchTypes';

import AdvancedSearch from './AdvancedSearch';

import { RootAction } from '../../app/state/rootInitialState';
import * as searchActions from '../../uniprotkb/state/searchActions';

import '../../uniprotkb/components/search/styles/search-container.scss';

type Props = {
  dispatchUpdateQueryString: (type: string) => void;
  dispatchUpdateClauses: (clauses: Clause[]) => void;
  handleEvidenceChange: (clauseId: string, value: string) => void;
  handleRangeInputChange: (
    clauseId: string,
    value: string,
    from?: boolean
  ) => void;
  handleRemoveClause: (clauseId: string) => void;
} & RouteComponentProps;

type State = {
  queryString: string;
};

export class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // const { queryString } = props;
    // this.state = { queryString };
    this.state = { queryString: '' };
    this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
  }

  handleQueryStringChange(queryString: string) {
    this.setState({ queryString });
  }

  render() {
    const { queryString } = this.state;

    return (
      <>
        <PageIntro title="Advanced search" />
        <AdvancedSearch {...this.props} queryString={queryString} />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      handleEvidenceChange: (clauseId: string, value: string) =>
        searchActions.updateEvidence(clauseId, value),
      handleRangeInputChange: (
        clauseId: string,
        value: string,
        from?: boolean
      ) => searchActions.updateRangeValue(clauseId, value, from),
      handleRemoveClause: (clauseId: string) =>
        searchActions.removeClause(clauseId),
      dispatchUpdateClauses: (clauses) => searchActions.updateClauses(clauses),
      dispatchUpdateQueryString: (queryString) =>
        searchActions.updateQueryString(queryString),
    },
    dispatch
  );

const AdvancedSearchContainer = withRouter(connect(mapDispatchToProps)(Search));

export default AdvancedSearchContainer;
