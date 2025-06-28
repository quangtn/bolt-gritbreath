import { SafetyContradiction } from '../types';

export const contraindications: SafetyContradiction[] = [
  {
    condition: 'Cardiovascular disease or heart attack history',
    reason: 'Breath-holding can significantly increase blood pressure and strain the cardiovascular system',
    severity: 'high'
  },
  {
    condition: 'Uncontrolled high blood pressure',
    reason: 'Blood pressure can exceed 180 mmHg during breath-holding exercises',
    severity: 'high'
  },
  {
    condition: 'Epilepsy or seizure disorders',
    reason: 'Hypoxia from breath-holding may trigger seizures',
    severity: 'high'
  },
  {
    condition: 'Severe asthma or COPD',
    reason: 'May worsen respiratory distress; inhaler must be available if attempting',
    severity: 'high'
  },
  {
    condition: 'Pregnancy',
    reason: 'Breath-holding can affect fetal blood oxygen levels',
    severity: 'high'
  },
  {
    condition: 'Panic disorder or severe anxiety',
    reason: 'May trigger panic attacks during breath-holding',
    severity: 'high'
  },
  {
    condition: 'Glaucoma or retinal conditions',
    reason: 'Increased intraocular pressure during breath-holding',
    severity: 'medium'
  },
  {
    condition: 'Recent surgery or eye problems',
    reason: 'Increased internal pressure may cause complications',
    severity: 'medium'
  }
];

export const dangerousActivities = [
  'Never practice breath-holding underwater or while swimming - Risk of hypoxic blackout and drowning',
  'Never attempt breath-holds while driving or operating machinery',
  'Do not practice extended breath-holds (3-5+ minutes) without professional supervision',
  'Avoid hyperventilation before breath-holding - Increases blackout risk',
  'Never practice Wim Hof Method without qualified supervision - Multiple documented drowning deaths'
];

export const emergencyWarnings = [
  'Chest pain or pressure',
  'Severe shortness of breath',
  'Dizziness or fainting',
  'Rapid or irregular heartbeat',
  'Severe anxiety or panic',
  'Loss of consciousness'
];

export const medicalConsultationRecommended = [
  'Any chronic medical conditions',
  'History of respiratory problems',
  'Cardiovascular disease',
  'Mental health conditions',
  'Current medications that may be affected by breathing exercises'
];