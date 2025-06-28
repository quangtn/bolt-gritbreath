import { PerformanceAssessment, BreathingExercise } from '../types';

const breathingExercises: Record<string, BreathingExercise[]> = {
  below: [
    {
      title: 'Diaphragmatic Breathing',
      description: 'Fundamental breathing technique to strengthen respiratory muscles and improve lung function.',
      technique: [
        'Place one hand on chest, one on abdomen',
        'Breathe through nose, expanding abdomen rather than chest',
        'Exhale slowly through pursed lips',
        'Focus on slow, controlled movements'
      ],
      duration: '10 minutes',
      frequency: 'Daily',
      source: 'PMC Review: Effects of Diaphragmatic Breathing on Health',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7602530/'
    },
    {
      title: 'Pursed Lip Breathing',
      description: 'Technique proven to increase oxygen saturation and reduce respiratory rate.',
      technique: [
        'Inhale through nose for 2 counts',
        'Purse lips as if blowing out a candle',
        'Exhale slowly through pursed lips for 4-6 counts',
        'Keep breathing rhythm steady and controlled'
      ],
      duration: '5-10 minutes',
      frequency: '2-3 times daily',
      source: 'Systematic Review: The use of Pursed Lips Breathing in stable COPD',
      url: 'https://uhra.herts.ac.uk/bitstream/handle/2299/4723/904207.pdf'
    }
  ],
  average: [
    {
      title: 'Box Breathing (4-4-4-4)',
      description: 'Military-grade technique for stress reduction and respiratory control.',
      technique: [
        'Inhale for 4 counts',
        'Hold breath for 4 counts',
        'Exhale for 4 counts',
        'Hold empty for 4 counts'
      ],
      duration: '5 minutes',
      frequency: 'Morning and evening',
      source: 'Journal of Pharmaceutical Research International: Effect of Box Breathing',
      url: 'https://journaljpri.com/index.php/JPRI/article/view/4857'
    },
    {
      title: 'Alternate Nostril Breathing',
      description: 'Yoga technique proven to improve lung function in healthy adults.',
      technique: [
        'Close right nostril with thumb, inhale through left',
        'Close left nostril with ring finger, exhale through right',
        'Inhale through right nostril',
        'Switch fingers and exhale through left'
      ],
      duration: '5 minutes',
      frequency: 'Daily',
      source: 'Mendeley Dataset: Efficacy of alternate nostril breathing',
      url: 'https://data.mendeley.com/datasets/y36zswkwxb/2'
    }
  ],
  good: [
    {
      title: '4-7-8 Breathing Technique',
      description: 'Advanced technique for anxiety reduction and respiratory training.',
      technique: [
        'Inhale through nose for 4 counts',
        'Hold breath for 7 counts',
        'Exhale through mouth for 8 counts',
        'Repeat 3-4 cycles only'
      ],
      duration: '2-4 minutes',
      frequency: 'Once daily',
      source: 'International Journal of Health Sciences: 4-7-8 Breathing',
      url: 'https://www.ijhsr.org/IJHSR_Vol.9_Issue.5_May2019/32.pdf',
      caution: 'May cause dizziness. Start slowly and stop if uncomfortable.'
    },
    {
      title: 'Pranayama Techniques',
      description: 'Traditional yoga breathing with documented physiological benefits.',
      technique: [
        'Begin with basic three-part breathing',
        'Progress to Ujjayi (ocean breath)',
        'Practice only under qualified instruction',
        'Focus on steady, controlled rhythm'
      ],
      duration: '10-15 minutes',
      frequency: '3-4 times weekly',
      source: 'PMC Systematic Review: Therapeutic Benefits of Pranayama',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7336946/',
      caution: 'Requires proper instruction. Do not attempt advanced techniques alone.'
    }
  ],
  excellent: [
    {
      title: 'Consistent Aerobic Training',
      description: 'Maintain and improve cardiovascular fitness for respiratory endurance.',
      technique: [
        'Regular cardiovascular exercise 150+ minutes weekly',
        'Include both steady-state and interval training',
        'Swimming particularly beneficial for breath control',
        'Monitor heart rate and breathing patterns'
      ],
      duration: '30-60 minutes',
      frequency: '4-6 times weekly',
      source: 'American Heart Association Exercise Guidelines',
      url: 'https://www.heart.org/en/healthy-living/fitness/fitness-basics/aha-recs-for-physical-activity-in-adults',
      caution: 'Obtain medical clearance before starting intensive exercise programs.'
    }
  ]
};

export const getAssessmentDetails = (duration: number): PerformanceAssessment => {
  if (duration < 30) {
    return {
      level: 'below',
      color: '#F72585',
      title: 'Below Average',
      description: 'Duration below 30 seconds may indicate respiratory limitations.',
      feedback: 'Your breath-hold duration suggests there\'s significant room for improvement in respiratory control. This is completely normal for beginners or those with respiratory challenges.',
      recommendations: breathingExercises.below,
      medicalNote: 'Durations under 30 seconds may indicate underlying respiratory limitations. Consider consulting a healthcare provider, especially if you experience shortness of breath during normal activities.'
    };
  } else if (duration >= 30 && duration < 60) {
    return {
      level: 'average',
      color: '#FFC53D',
      title: 'Average',
      description: 'Healthy adult range (30-60 seconds) - clinical average is 49±10 seconds.',
      feedback: 'You\'re within the normal range for healthy adults. Clinical research shows most people achieve 30-90 seconds, with an average of 49±10 seconds.',
      recommendations: [...breathingExercises.below, ...breathingExercises.average],
      medicalNote: 'This duration falls within normal parameters for healthy adults according to medical literature.'
    };
  } else if (duration >= 60 && duration < 120) {
    return {
      level: 'good',
      color: '#24880C',
      title: 'Good',
      description: 'Above average performance indicating good respiratory fitness.',
      feedback: 'Excellent performance! You demonstrate good respiratory control and lung capacity. This level typically requires some training or natural respiratory fitness.',
      recommendations: [...breathingExercises.average, ...breathingExercises.good],
      medicalNote: 'This performance level indicates good respiratory fitness and control, typically achieved through training or natural ability.'
    };
  } else {
    return {
      level: 'excellent',
      color: '#20E3B2',
      title: 'Excellent',
      description: 'Elite performance requiring dedicated training and practice.',
      feedback: 'Outstanding performance! You demonstrate elite-level respiratory control. This level typically requires dedicated training and practice.',
      recommendations: breathingExercises.excellent,
      medicalNote: 'This elite performance level indicates advanced respiratory training. Maintain your fitness with proper medical supervision for intensive training.'
    };
  }
};