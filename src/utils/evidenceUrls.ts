const evidenceUrls: { [key: string]: string } = {
  Araport: 'https://apps.araport.org/thalemine/portal.do?externalids=%value',
  CGD: 'http://www.candidagenome.org/cgi-bin/locus.pl?dbid=%value',
  EMBL: 'https://www.ebi.ac.uk/ena/data/view/%value',
  EPD:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  Ensembl: 'https://www.ensembl.org/id/%value',
  EnsemblBacteria: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblFungi: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblMetazoa: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblPlants: 'http://www.ensemblgenomes.org/id/%value',
  EnsemblProtists: 'http://www.ensemblgenomes.org/id/%value',
  FlyBase: 'http://flybase.org/reports/%value.html',
  'HAMAP-Rule': 'https://www.uniprot.org/unirule/%value',
  HGNC: 'https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=%value',
  MGI: 'http://www.informatics.jax.org/marker/%value',
  MaxQB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  PDB: 'https://www.ebi.ac.uk/pdbe-srv/view/entry/%value',
  PIR: 'http://pir.georgetown.edu/cgi-bin/nbrfget?uid=%value',
  PIRNR: 'https://www.uniprot.org/unirule/%value',
  PIRSR: 'https://www.uniprot.org/unirule/%value',
  PROSITE: 'https://prosite.expasy.org/doc/%value',
  'PROSITE-ProRule': 'https://prosite.expasy.org/unirule/%value',
  PeptideAtlas:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
  Pfam: 'http://pfam.xfam.org/family/%value',
  PomBase: 'https://www.pombase.org/spombe/result/%value',
  Proteomes: 'https://www.uniprot.org/proteomes/%value',
  PubMed: 'https://www.uniprot.org/citations/%value',
  RGD: 'http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=%value',
  RefSeq: 'https://www.ncbi.nlm.nih.gov/protein/%value',
  RuleBase: 'https://www.uniprot.org/unirule/%value',
  SAAS: 'https://www.uniprot.org/saas/%value',
  SAM: 'https://www.uniprot.org/help/sam',
  SGD: 'https://www.yeastgenome.org/locus/%value',
  SMART: 'http://smart.embl.de/smart/do_annotation.pl?DOMAIN=%value',
  UniRule: 'https://www.uniprot.org/unirule/%value',
  VGNC:
    'https://vertebrate.genenames.org/data/gene-symbol-report/#!/vgnc_id/%value',
  VectorBase: 'https://www.vectorbase.org/id/%value',
  WBParaSite: 'http://parasite.wormbase.org/id/%value',
  WormBase: 'https://wormbase.org/species/c_elegans/cds/%value',
  Xenbase:
    'http://www.xenbase.org/gene/showgene.do?method=display&geneId=value',
  ZFIN: 'http://zfin.org/cgi-bin/webdriver?MIval=aa-markerview.apg&OID=%value',
  UniProtKB: 'https://www.uniprot.org/uniprot/%value',
  Reference: '',
  dictyBase: 'http://dictybase.org/gene/%value',
  MIM: 'http://www.omim.org/entry/%value',
  EcoGene: 'http://www.ecogene.org/geneInfo.php?eg_id=%value',
  TubercuList: 'https://mycobrowser.epfl.ch/genes/%value',
  'MobiDB-lite': 'https://www.uniprot.org/help/MobiDB-lite',
  ProteomicsDB:
    'ftp://ftp.uniprot.org/pub/databases/uniprot/current_release/knowledgebase/proteomics_mapping/README',
};

export default evidenceUrls;
