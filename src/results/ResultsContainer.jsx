import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchResults } from './state/actions';

export class Results extends Component {
  componentDidMount() {
    const { query, dispatchFetchResults } = this.props;
    dispatchFetchResults(query);
  }

  render() {
    return <ResultsTable {...this.props} />;
  }
}

const mapStateToProps = state => ({
  query: state.query,
  results: state.results,
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchResults: query => dispatch(fetchResults(query)),
});

const ResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Results);

export default ResultsContainer;
