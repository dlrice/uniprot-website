import {
  databaseCategoryToDatabases,
  entrySectionToDatabaseCategories,
} from '../../data/database';
import EntrySectionType from '../types/EntrySectionType';
import { Databases, DatabaseCategory } from '../types/DatabaseTypes';
import { Property } from '../types/modelTypes';

export type Xref = {
  databaseType?: Databases;
  id?: string;
  properties?: [Property];
  isoformId?: string;
};

export type XrefsGoupedByDatabase = {
  database: Databases;
  xrefs: Xref[];
};

export type XrefUIModel = {
  category: DatabaseCategory;
  databases: XrefsGoupedByDatabase[];
};

export const getXrefsForSection = (
  xrefs: Xref[],
  section: EntrySectionType
): XrefUIModel[] | null => {
  const xrefCategories: XrefUIModel[] = [];
  // Get the categories relevant to the given entry section
  const sectionCategories = entrySectionToDatabaseCategories.get(section);
  if (!sectionCategories) {
    return null;
  }
  sectionCategories.forEach(category => {
    // Get the database relevant to the given category
    const databases = databaseCategoryToDatabases.get(category);
    const categoryDatabases: XrefsGoupedByDatabase[] = [];
    if (databases) {
      databases.forEach(database => {
        // Filter the xref data to only return the ones for
        // the given database
        const databaseXrefs = xrefs.filter(
          xref => xref.databaseType === database
        );
        // If we have hits, add them too the array
        if (databaseXrefs && databaseXrefs.length > 0) {
          categoryDatabases.push({
            database: database,
            xrefs: databaseXrefs,
          });
        }
      });
    }
    // If we have hits, add them too the array
    if (categoryDatabases.length > 0) {
      xrefCategories.push({
        category: category,
        databases: categoryDatabases,
      });
    }
  });
  return xrefCategories;
};
