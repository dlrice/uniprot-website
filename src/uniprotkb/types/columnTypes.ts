export enum Column {
  threeD = '3d',
  absorption = 'absorption',
  accession = 'accession',
  ccAllergen = 'cc_allergen',
  ccAlternativeProducts = 'cc_alternative_products',
  ccBiotechnology = 'cc_biotechnology',
  ccCatalyticActivity = 'cc_catalytic_activity',
  ccCaution = 'cc_caution',
  ccCofactor = 'cc_cofactor',
  ccDevelopmentalStage = 'cc_developmental_stage',
  ccDisease = 'cc_disease',
  ccDisruptionPhenotype = 'cc_disruption_phenotype',
  ccDomain = 'cc_domain',
  ccActivityRegulation = 'cc_activity_regulation',
  ccFunction = 'cc_function',
  ccInduction = 'cc_induction',
  ccInteraction = 'cc_interaction',
  ccMassSpectrometry = 'cc_mass_spectrometry',
  ccMiscellaneous = 'cc_miscellaneous',
  ccPathway = 'cc_pathway',
  ccPharmaceutical = 'cc_pharmaceutical',
  ccPolymorphism = 'cc_polymorphism',
  ccPtm = 'cc_ptm',
  ccRnaEditing = 'cc_rna_editing',
  ccSequenceCaution = 'cc_sequence_caution',
  ccSimilarity = 'cc_similarity',
  ccSubcellularLocation = 'cc_subcellular_location',
  ccSubunit = 'cc_subunit',
  ccTissueSpecificity = 'cc_tissue_specificity',
  ccToxicDose = 'cc_toxic_dose',
  dateCreate = 'date_create',
  dateMod = 'date_mod',
  dateSeqMod = 'date_seq_mod',
  drAbcd = 'dr_abcd',
  drAllergome = 'dr_allergome',
  drArachnoserver = 'dr_arachnoserver',
  drAraport = 'dr_araport',
  drBgee = 'dr_bgee',
  drBindingdb = 'dr_bindingdb',
  drBiocyc = 'dr_biocyc',
  drBiogrid = 'dr_biogrid',
  drBiomuta = 'dr_biomuta',
  drBrenda = 'dr_brenda',
  drCarbonyldb = 'dr_carbonyldb',
  drCazy = 'dr_cazy',
  drCcds = 'dr_ccds',
  drCdd = 'dr_cdd',
  drCgd = 'dr_cgd',
  drChembl = 'dr_chembl',
  drChitars = 'dr_chitars',
  drCleanex = 'dr_cleanex',
  drCollectf = 'dr_collectf',
  drComplexportal = 'dr_complexportal',
  drCompluyeast2Dpage = 'dr_compluyeast-2dpage',
  drConoserver = 'dr_conoserver',
  drCorum = 'dr_corum',
  drCptac = 'dr_cptac',
  drCtd = 'dr_ctd',
  drDbsnp = 'dr_dbsnp',
  drDepod = 'dr_depod',
  drDictybase = 'dr_dictybase',
  drDip = 'dr_dip',
  drDisgenet = 'dr_disgenet',
  drDisprot = 'dr_disprot',
  drDmdm = 'dr_dmdm',
  drDnasu = 'dr_dnasu',
  drDosacCobs2Dpage = 'dr_dosac-cobs-2dpage',
  drDrugbank = 'dr_drugbank',
  drEchobase = 'dr_echobase',
  drEggnog = 'dr_eggnog',
  drElm = 'dr_elm',
  drEmbl = 'dr_embl',
  drEnsembl = 'dr_ensembl',
  drEnsemblbacteria = 'dr_ensemblbacteria',
  drEnsemblfungi = 'dr_ensemblfungi',
  drEnsemblmetazoa = 'dr_ensemblmetazoa',
  drEnsemblplants = 'dr_ensemblplants',
  drEnsemblprotists = 'dr_ensemblprotists',
  drEpd = 'dr_epd',
  drEsther = 'dr_esther',
  drEuhcvdb = 'dr_euhcvdb',
  drEupathdb = 'dr_eupathdb',
  drEvolutionarytrace = 'dr_evolutionarytrace',
  drExpressionatlas = 'dr_expressionatlas',
  drFlybase = 'dr_flybase',
  drGene3D = 'dr_gene3d',
  drGenecards = 'dr_genecards',
  drGenedb = 'dr_genedb',
  drGeneid = 'dr_geneid',
  drGenereviews = 'dr_genereviews',
  drGenetree = 'dr_genetree',
  drGenevisible = 'dr_genevisible',
  drGenewiki = 'dr_genewiki',
  drGenomernai = 'dr_genomernai',
  drGlyconnect = 'dr_glyconnect',
  drGo = 'dr_go',
  drGramene = 'dr_gramene',
  drGuidetopharmacology = 'dr_guidetopharmacology',
  drHamap = 'dr_hamap',
  drHgnc = 'dr_hgnc',
  drHogenom = 'dr_hogenom',
  drHpa = 'dr_hpa',
  drImgtGeneDb = 'dr_imgt_gene-db',
  drInparanoid = 'dr_inparanoid',
  drIntact = 'dr_intact',
  drInterpro = 'dr_interpro',
  drIptmnet = 'dr_iptmnet',
  drJpost = 'dr_jpost',
  drKegg = 'dr_kegg',
  drKo = 'dr_ko',
  drLegiolist = 'dr_legiolist',
  drLeproma = 'dr_leproma',
  drMaizegdb = 'dr_maizegdb',
  drMalacards = 'dr_malacards',
  drMassive = 'dr_massive',
  drMaxqb = 'dr_maxqb',
  drMerops = 'dr_merops',
  drMgi = 'dr_mgi',
  drMim = 'dr_mim',
  drMint = 'dr_mint',
  drMoondb = 'dr_moondb',
  drMoonprot = 'dr_moonprot',
  drMycoclap = 'dr_mycoclap',
  drNextprot = 'dr_nextprot',
  drNiagads = 'dr_niagads',
  drOgp = 'dr_ogp',
  drOma = 'dr_oma',
  drOpentargets = 'dr_opentargets',
  drOrphanet = 'dr_orphanet',
  drOrthodb = 'dr_orthodb',
  drPanther = 'dr_panther',
  drPatric = 'dr_patric',
  drPaxdb = 'dr_paxdb',
  drPdb = 'dr_pdb',
  drPdbsum = 'dr_pdbsum',
  drPeptideatlas = 'dr_peptideatlas',
  drPeroxibase = 'dr_peroxibase',
  drPfam = 'dr_pfam',
  drPharmgkb = 'dr_pharmgkb',
  drPhosphositeplus = 'dr_phosphositeplus',
  drPhylomedb = 'dr_phylomedb',
  drPir = 'dr_pir',
  drPirsf = 'dr_pirsf',
  drPlantreactome = 'dr_plantreactome',
  drPombase = 'dr_pombase',
  drPride = 'dr_pride',
  drPrints = 'dr_prints',
  drPro = 'dr_pro',
  drProdom = 'dr_prodom',
  drPromex = 'dr_promex',
  drProsite = 'dr_prosite',
  drProteomes = 'dr_proteomes',
  drProteomicsdb = 'dr_proteomicsdb',
  drPseudocap = 'dr_pseudocap',
  drReactome = 'dr_reactome',
  drRebase = 'dr_rebase',
  drRefseq = 'dr_refseq',
  drReproduction2Dpage = 'dr_reproduction-2dpage',
  drRgd = 'dr_rgd',
  drSabioRk = 'dr_sabio-rk',
  drSfld = 'dr_sfld',
  drSgd = 'dr_sgd',
  drSignalink = 'dr_signalink',
  drSignor = 'dr_signor',
  drSmart = 'dr_smart',
  drSmr = 'dr_smr',
  drString = 'dr_string',
  drSupfam = 'dr_supfam',
  drSwiss2Dpage = 'dr_swiss-2dpage',
  drSwisslipids = 'dr_swisslipids',
  drSwisspalm = 'dr_swisspalm',
  drTair = 'dr_tair',
  drTcdb = 'dr_tcdb',
  drTigrfams = 'dr_tigrfams',
  drTopdownproteomics = 'dr_topdownproteomics',
  drTreefam = 'dr_treefam',
  drTuberculist = 'dr_tuberculist',
  drUcd2Dpage = 'dr_ucd-2dpage',
  drUcsc = 'dr_ucsc',
  drUnicarbkb = 'dr_unicarbkb',
  drUnilectin = 'dr_unilectin',
  drUnipathway = 'dr_unipathway',
  drVectorbase = 'dr_vectorbase',
  drVgnc = 'dr_vgnc',
  drWbparasite = 'dr_wbparasite',
  drWorld2Dpage = 'dr_world-2dpage',
  drWormbase = 'dr_wormbase',
  drXenbase = 'dr_xenbase',
  drZfin = 'dr_zfin',
  ec = 'ec',
  errorGmodelPred = 'error_gmodel_pred',
  feature = 'feature',
  fragment = 'fragment',
  ftActSite = 'ft_act_site',
  ftBinding = 'ft_binding',
  ftCaBind = 'ft_ca_bind',
  ftCarbohyd = 'ft_carbohyd',
  ftChain = 'ft_chain',
  ftCoiled = 'ft_coiled',
  ftCompbias = 'ft_compbias',
  ftConflict = 'ft_conflict',
  ftCrosslnk = 'ft_crosslnk',
  ftDisulfide = 'ft_disulfide',
  ftDnaBind = 'ft_dna_bind',
  ftDomain = 'ft_domain',
  ftHelix = 'ft_helix',
  ftInitMet = 'ft_init_met',
  ftIntramem = 'ft_intramem',
  ftLipid = 'ft_lipid',
  ftMetal = 'ft_metal',
  ftModRes = 'ft_mod_res',
  ftMotif = 'ft_motif',
  ftMutagen = 'ft_mutagen',
  ftNonCon = 'ft_non_con',
  ftNonStd = 'ft_non_std',
  ftNonTer = 'ft_non_ter',
  ftNpBind = 'ft_np_bind',
  ftPeptide = 'ft_peptide',
  ftPropep = 'ft_propep',
  ftRegion = 'ft_region',
  ftRepeat = 'ft_repeat',
  ftSignal = 'ft_signal',
  ftSite = 'ft_site',
  ftStrand = 'ft_strand',
  ftTopDom = 'ft_top_dom',
  ftTransit = 'ft_transit',
  ftTransmem = 'ft_transmem',
  ftTurn = 'ft_turn',
  ftUnsure = 'ft_unsure',
  ftVarSeq = 'ft_var_seq',
  ftVariant = 'ft_variant',
  ftZnFing = 'ft_zn_fing',
  organelle = 'organelle',
  geneNames = 'gene_names',
  geneOln = 'gene_oln',
  geneOrf = 'gene_orf',
  genePrimary = 'gene_primary',
  geneSynonym = 'gene_synonym',
  go = 'go',
  goC = 'go_c',
  goF = 'go_f',
  goId = 'go_id',
  goP = 'go_p',
  id = 'id',
  keyword = 'keyword',
  keywordid = 'keywordid',
  kinetics = 'kinetics',
  length = 'length',
  lineage = 'lineage',
  mappedPmId = 'mapped_pm_id',
  mass = 'mass',
  matchedText = 'matched_text',
  mnemonic = 'mnemonic',
  organismName = 'organism_name',
  organismHost = 'organism_host',
  organismId = 'organism_id',
  phDependence = 'ph_dependence',
  pmId = 'pm_id',
  proteinExistence = 'protein_existence',
  proteinFamilies = 'family',
  proteinName = 'protein_name',
  redoxPotential = 'redox_potential',
  reviewed = 'reviewed',
  score = 'score',
  sequence = 'sequence',
  sequenceVersion = 'sequence_version',
  tempDependence = 'temp_dependence',
  tlAll = 'tl_all',
  tlClass = 'tl_class',
  tlCohort = 'tl_cohort',
  tlFamily = 'tl_family',
  tlForma = 'tl_forma',
  tlGenus = 'tl_genus',
  tlInfraclass = 'tl_infraclass',
  tlInfraorder = 'tl_infraorder',
  tlKingdom = 'tl_kingdom',
  tlOrder = 'tl_order',
  tlParvorder = 'tl_parvorder',
  tlPhylum = 'tl_phylum',
  tlSpecies = 'tl_species',
  tlSpeciesGroup = 'tl_species_group',
  tlSpeciesSubgroup = 'tl_species_subgroup',
  tlSubclass = 'tl_subclass',
  tlSubcohort = 'tl_subcohort',
  tlSubfamily = 'tl_subfamily',
  tlSubgenus = 'tl_subgenus',
  tlSubkingdom = 'tl_subkingdom',
  tlSuborder = 'tl_suborder',
  tlSubphylum = 'tl_subphylum',
  tlSubspecies = 'tl_subspecies',
  tlSubtribe = 'tl_subtribe',
  tlSuperclass = 'tl_superclass',
  tlSuperfamily = 'tl_superfamily',
  tlSuperkingdom = 'tl_superkingdom',
  tlSuperorder = 'tl_superorder',
  tlSuperphylum = 'tl_superphylum',
  tlTribe = 'tl_tribe',
  tlVarietas = 'tl_varietas',
  tools = 'tools',
  uniparcId = 'uniparc_id',
  version = 'version',
}

export type SortableColumn =
  | Column.accession
  | Column.score
  | Column.geneNames
  | Column.length
  | Column.mass
  | Column.mnemonic
  | Column.proteinName
  | Column.organismName;
