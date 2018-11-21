import urljoin from 'url-join';

const prefix = '//wwwdev.ebi.ac.uk/';

export default {
  // uniprotkb advanced search terms
  advanced_search_terms: urljoin(prefix, '/uniprot/api/configure/uniprotkb/search_terms'),
  // Annotation evidence used by advanced search
  annotation_evidences: urljoin(prefix, '/uniprot/api/configure/uniprotkb/annotation_evidences'),
  // Go evidences used by advanced go search
  // "itemType": "goterm",
  go_evidences: urljoin(prefix, '/uniprot/api/configure/uniprotkb/go_evidences'),
  // Database cross references used by advanced search
  database_xefs: urljoin(prefix, '/uniprot/api/configure/uniprotkb/databases'),
  // Database cross reference fields in result column configure
  // "itemType": "database",
  database_fields: urljoin(prefix, '/uniprot/api/configure/uniprotkb/databasefields'),
  // All result fields except database cross reference fields
  results_fields: urljoin(prefix, '/uniprot/api/configure/uniprotkb/resultfields'),
};

const RE_QUERY = /\?$/;

export const getSuggesterUrl = (url, value) => urljoin(prefix, url.replace(RE_QUERY, value));
