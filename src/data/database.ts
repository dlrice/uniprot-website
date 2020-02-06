import EntrySection from '../model/types/EntrySection';
import { DatabaseCategory, DatabaseInfo } from '../model/types/DatabaseTypes';
import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../utils/database';
import databaseInfoJson from './databaseInfo.json';

const databaseInfo: DatabaseInfo = databaseInfoJson;

export const databaseCategoryToString = {
  [DatabaseCategory.CHEMISTRY]: 'Chemistry',
  [DatabaseCategory.DOMAIN]: 'Family and domain databases',
  [DatabaseCategory.EXPRESSION]: 'Gene expression databases',
  [DatabaseCategory.FAMILY]: 'Protein family/group databases',
  [DatabaseCategory.GEL]: '2D gel databases',
  [DatabaseCategory.GENOME]: 'Genome annotation databases',
  [DatabaseCategory.INTERACTION]: 'Protein-protein interaction databases',
  [DatabaseCategory.ORGANISM]: 'Organism-specific databases',
  [DatabaseCategory.OTHER]: 'Other',
  [DatabaseCategory.PATHWAY]: 'Enzyme and pathway databases',
  [DatabaseCategory.PHYLOGENOMIC]: 'Phylogenomic databases',
  [DatabaseCategory.POLYMORPHISM]: 'Polymorphism and mutation databases',
  [DatabaseCategory.PROTEOMIC]: 'Proteomic databases',
  [DatabaseCategory.PROTOCOL]: 'Protocols and materials databases',
  [DatabaseCategory.PTM]: 'PTM databases',
  [DatabaseCategory.SEQUENCE]: 'Sequence databases',
  [DatabaseCategory.STRUCTURE]: '3D structure databases',
};

export const {
  databaseCategoryToNames,
  databaseNameToCategory,
  databaseToDatabaseInfo,
  implicitDatabaseXRefs,
} = getDatabaseInfoMaps(databaseInfo);

const databaseSelector = selectDatabases(databaseCategoryToNames);

export const entrySectionToDatabaseNames = new Map<EntrySection, string[]>();
entrySectionToDatabaseNames.set(
  EntrySection.Expression,
  databaseSelector({
    categories: [DatabaseCategory.EXPRESSION],
    whitelist: ['HPA'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.FamilyAndDomains,
  databaseSelector({
    categories: [DatabaseCategory.PHYLOGENOMIC, DatabaseCategory.DOMAIN],
    whitelist: [
      'MobiDB', // Implicit
      'ProtoNet', // Implicit
      'GPCRDB', // Implicit
    ],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Function,
  databaseSelector({
    categories: [DatabaseCategory.PATHWAY, DatabaseCategory.FAMILY],
    whitelist: ['SwissLipids'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Interaction,
  databaseSelector({
    categories: [DatabaseCategory.INTERACTION],
    whitelist: ['BindingDB'],
  })
);
entrySectionToDatabaseNames.set(EntrySection.NamesAndTaxonomy, [
  'ArachnoServer',
  'Araport',
  'CGD',
  'ConoServer',
  'dictyBase',
  'EcoGene',
  'EuPathDB',
  'FlyBase',
  'Gramene',
  'HGNC',
  'LegioList',
  'Leproma',
  'MaizeGDB',
  'MGI',
  'MIM',
  'neXtProt',
  'PomBase',
  'PseudoCAP',
  'RGD',
  'SGD',
  'TAIR',
  'TubercuList',
  'VGNC',
  'WormBase',
  'Xenbase',
  'ZFIN',
]);
entrySectionToDatabaseNames.set(EntrySection.PathologyAndBioTech, [
  'DisGeNET',
  'GeneReviews',
  'MalaCards',
  'MIM',
  'OpenTargets',
  'Orphanet',
  'PharmGKB',
  'ChEMBL',
  'DrugBank',
  'GuidetoPHARMACOLOGY',
  'BioMuta',
  'DMDM',
  'Allergome',
  'ChiTaRS', // temp
]);
entrySectionToDatabaseNames.set(
  EntrySection.ProteinProcessing,
  databaseSelector({
    categories: [
      DatabaseCategory.PROTEOMIC,
      DatabaseCategory.GEL,
      DatabaseCategory.PTM,
    ],
    whitelist: ['PMAP-CutDB'],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Sequence,
  databaseSelector({
    categories: [DatabaseCategory.SEQUENCE, DatabaseCategory.GENOME],
  })
);
entrySectionToDatabaseNames.set(
  EntrySection.Structure,
  databaseSelector({
    categories: [DatabaseCategory.STRUCTURE],
    whitelist: [
      'EvolutionaryTrace',
      'ModBase', // Implicit
      'PDBe-KB', // Implicit
    ],
    blacklist: ['PDB', 'PDBsum'],
  })
);

// This is used to catch those that aren't listed in the page sections
entrySectionToDatabaseNames.set(
  EntrySection.ExternalLinks,
  databaseSelector({
    categories: [DatabaseCategory.OTHER],
  })
);

export const getDatabaseNameToEntrySection = (
  databaseName: string
): EntrySection | undefined => {
  let entrySection;
  entrySectionToDatabaseNames.forEach((value, key) => {
    if (value.includes(databaseName)) {
      entrySection = key;
    }
  });
  return entrySection;
};

export const entrySectionToDatabaseCategoryOrder = getEntrySectionToDatabaseCategoryOrder(
  entrySectionToDatabaseNames,
  databaseNameToCategory
);

export const getDatabaseInfoByName = (dbName: string) =>
  databaseInfo.find(
    dbInfo => dbInfo.name.toLowerCase() === dbName.toLowerCase()
  );

// If each of the keys are present then show the values
export const implicitDatabaseDRPresence = {
  EMBL: ['GenBank', 'DDBJ'],
  PDB: ['PDBe-KB', 'PDBj', 'RCSB-PDB'],
  MIM: ['SOURCE_MIM'],
  MGI: ['SOURCE_MGI'],
  HGNC: ['GenAtlas'],
};

// If each of the keys are not present then show the value
export const implicitDatabaseDRAbsence = {
  SMR: ['SWISS-MODEL-Workspace'],
};

export const implicitDatabaseAlwaysInclude = ['ModBase', 'MobiDB', 'ProtoNet'];

export const implicitDatabaseGenePatternOrganism = {
  pattern: /KIAA\d{4}/,
  organism: { Human: 'HUGE', Mouse: 'ROUGE' },
};

export const implicitDatabaseSimilarityComment = {
  GPCRDB: 'Belongs to the G-protein coupled receptor',
};

export const implicitDatabasesEC = ['ENZYME'];
