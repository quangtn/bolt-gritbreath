export interface TestResult {
  id: string;
  date: string;
  duration: number; // in seconds
  performanceLevel: 'below' | 'average' | 'good' | 'excellent';
}

export interface PerformanceAssessment {
  level: 'below' | 'average' | 'good' | 'excellent';
  color: string;
  title: string;
  description: string;
  feedback: string;
  recommendations: BreathingExercise[];
  medicalNote: string;
}

export interface BreathingExercise {
  title: string;
  description: string;
  technique: string[];
  duration: string;
  frequency: string;
  source: string;
  url: string;
  caution?: string;
}

export interface SafetyContradiction {
  condition: string;
  reason: string;
  severity: 'high' | 'medium';
}