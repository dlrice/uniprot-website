import urljoin from 'url-join';
import queryString from 'query-string';

export const joinUrl = (...args) => urljoin(args);

const prefix = '//wwwdev.ebi.ac.uk';

const apiUrls = {
  // uniprotkb advanced search terms
  advanced_search_terms: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/search_terms'),
  // Annotation evidence used by advanced search
  evidences: {
    annotation: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/annotation_evidences'),
    // Go evidences used by advanced go search
    // "itemType": "goterm",
    go: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  },
  // Database cross references used by advanced search
  database_xefs: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/databases'),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/databasefields'),
  // All result fields except database cross reference fields
  results_fields: joinUrl(prefix, '/uniprot/api/configure/uniprotkb/resultfields'),
  // Retrieve results
  advanced_search: joinUrl(prefix, '/uniprot/api/uniprotkb/search'),
};

export default apiUrls;

const RE_QUERY = /\?$/;

export const getSuggesterUrl = (url, value) => joinUrl(prefix, url.replace(RE_QUERY, value));

export const getUniProtQueryUrl = (encodedUniprotQueryString, columns, filters, cursor) => `${apiUrls.advanced_search}?${queryString.stringify({
  query: encodedUniprotQueryString,
  fields: columns.join(','),
})}`;

const findTopLevelParenthesisIndices = (query) => {
  console.log(query);
  let balance = 0;
  let parenthesisIndices = [0, 0];
  const topLevelParenthesisIndices = [];
  for (let i = 0; i < query.length; i += 1) {
    const c = query[i];
    if (c === '(') {
      balance += 1;
      if (balance === 1) {
        parenthesisIndices = [i, 0];
      }
    } else if (c === ')') {
      balance -= 1;
      if (balance === 0) {
        parenthesisIndices[1] = i;
        topLevelParenthesisIndices.push(parenthesisIndices);
      }
    }
  }
  return topLevelParenthesisIndices;
};

const ALLOWED_CONJUNCTIONS = ['and', 'or', 'not'];

const parseClause = (conjunction, fieldValue) => {
  const conjunctionLower = conjunction ? conjunction.toLowerCase() : 'and';
  const [field, value] = fieldValue.split(':');
  if (!ALLOWED_CONJUNCTIONS.includes(conjunctionLower)) {
    throw new Error(`conjunction is not part of ${ALLOWED_CONJUNCTIONS}`);
  }
  return [conjunctionLower, field, value];
};

export const unpackQueryUrl = (queryFromUrl) => {
  const query = queryFromUrl.replace('?query=', '');
  const parenthesisIndices = findTopLevelParenthesisIndices(query);
  let conjunctionIndex = 0;
  parenthesisIndices.forEach((parenthesis) => {
    const conjunction = query.slice(conjunctionIndex, parenthesis[0]);
    const fieldValue = query.slice(parenthesis[0] + 1, parenthesis[1]);
    conjunctionIndex = parenthesis[1] + 1;
    const [conjunctionLower, field, value] = parseClause(conjunction, fieldValue);
    console.log(conjunctionLower, field, value);
  });
};
