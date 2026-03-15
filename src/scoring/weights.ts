export interface ScoringWeights {
  dateFit: number;
  orbitFit: number;
  dataCompleteness: number;
}

export const defaultScoringWeights: ScoringWeights = {
  dateFit: 0.4,
  orbitFit: 0.4,
  dataCompleteness: 0.2
};
