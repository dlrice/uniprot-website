import { FeatureData } from '../../FeaturesView';
import { KeywordCategory, KeywordData } from '../../Keyword';
import { DiseaseCommentData } from '../../DiseaseInvolvement';
import CommentType from '../../types/commentType';
import { getCategoryKeywords } from '../../utils/KeywordsUtil';
import KeywordTypes from '../../types/keywordTypes';
import FeatureTypes from '../../types/featureTypes';

type data = {
  primaryAccession: string;
  features?: FeatureData;
  comments?: DiseaseCommentData;
  keywords?: KeywordData;
  sequence: { value: string };
};

const pathologyAndBiotechConverter = (data: data) => {
  const pathologyAndBiotechData: {
    featuresData?: FeatureData;
    keywordData?: KeywordCategory[];
    diseaseInvolvementData?: DiseaseCommentData;
  } = {};
  if (data.comments) {
    pathologyAndBiotechData.diseaseInvolvementData = data.comments.filter(
      comment => comment.commentType === CommentType.DISEASE
    );
  }
  if (data.keywords) {
    const categoryKeywords = getCategoryKeywords(data.keywords, [
      KeywordTypes.DISEASE,
    ]);
    if (categoryKeywords && Object.keys(categoryKeywords).length > 0) {
      pathologyAndBiotechData.keywordData = categoryKeywords;
    }
  }
  if (data.features) {
    const features = data.features.filter(feature => {
      return [FeatureTypes.MUTAGEN].includes(feature.type);
    });
    pathologyAndBiotechData.featuresData = features;
  }
  return pathologyAndBiotechData;
};

export default pathologyAndBiotechConverter;
