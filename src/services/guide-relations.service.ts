import { GuideRelationsModelRepository as GuideRelationsRepository } from '../models/guide-relations.model';

export class GuideRelationsService {
  static async specialties(guideId: number) {
    return GuideRelationsRepository.specialtiesForGuide(guideId);
  }

  static async languages(guideId: number) {
    return GuideRelationsRepository.languagesForGuide(guideId);
  }

  static async zones(guideId: number) {
    return GuideRelationsRepository.zonesForGuide(guideId);
  }

  static async touristPlaces(guideId: number) {
    return GuideRelationsRepository.touristPlacesForGuide(guideId);
  }
}
