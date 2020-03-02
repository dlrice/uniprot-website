import convertFamilyAndDomains from '../FamilyAndDomainsConverter';
import modelDataJson from '../../../__mocks__/entryModelData.json';
import { convertXrefProperties } from '../../UniProtkbConverter';

describe('Family and Domains data converter', () => {
  beforeAll(() => {
    modelDataJson.databaseCrossReferences = convertXrefProperties(
      modelDataJson.databaseCrossReferences
    );
  });

  test('should convert the data', () => {
    const convertedData = convertFamilyAndDomains(modelDataJson);
    expect(convertedData).toEqual({
      commentsData: new Map([
        ['DOMAIN', []],
        ['SIMILARITY', []],
      ]),
      featuresData: [],
      keywordData: [
        {
          category: 'Domain',
          keywords: [
            {
              category: 'Domain',
              evidences: [
                {
                  evidenceCode: 'ECO:0000255',
                  id: 'PRU10025',
                  source: 'PROSITE-ProRule',
                },
              ],
              id: 'KW-11111',
              value: 'keyword value',
            },
          ],
        },
      ],
      xrefData: [
        {
          category: 'FMD',
          databases: [
            {
              database: 'MobiDB',
              xrefs: [{ databaseType: 'MobiDB', implicit: true }],
            },
            {
              database: 'ProtoNet',
              xrefs: [{ databaseType: 'ProtoNet', implicit: true }],
            },
          ],
        },
      ],
    });
  });
});
