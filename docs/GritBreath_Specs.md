# GritBreath Web App Specifications

## Project Overview
**App Name:** GritBreath  
**Tagline:** "Breathe Deep. Build Resilience."  
**Description:** A web-based breath-hold training application that helps users master their breathing to boost focus, performance, and overall well-being.

## ⚠️ CRITICAL MEDICAL & SAFETY REQUIREMENTS

### PRIMARY MEDICAL DISCLAIMER
**FOR INFORMATIONAL PURPOSES ONLY - NOT MEDICAL ADVICE**

This application is intended for informational and educational purposes only and is NOT intended to replace professional medical advice, diagnosis, or treatment. The breath-hold assessment and breathing exercise recommendations provided herein should not be considered medical advice or used as a substitute for consultation with a qualified healthcare provider.

**ALWAYS consult with your physician or other qualified healthcare provider before beginning any breathing exercises or breath-hold activities, especially if you have any pre-existing medical conditions.**

Source: FDA Mobile Medical Applications Guidance (2022)

### CONTRAINDICATIONS - DO NOT USE THIS APP IF YOU HAVE:
- **Cardiovascular disease or heart attack history**
- **Uncontrolled high blood pressure** 
- **Epilepsy or seizure disorders**
- **Severe asthma or COPD**
- **Pregnancy**
- **Panic disorder or severe anxiety**
- **Glaucoma or retinal conditions**
- **Recent surgery or eye problems**

### DANGEROUS ACTIVITIES - NEVER ATTEMPT:
- **Breath-holding underwater or while driving** - Risk of hypoxic blackout and drowning
- **Extended breath-holds (3-5+ minutes) without professional training**
- **Hyperventilation before breath-holding** - Increases blackout risk
- **Wim Hof Method without proper supervision** - Multiple documented drowning deaths

Source: "Gambling with your life": Experts weigh in on dangers of the Wim Hof Method

## Core Features

### 1. Breath-Hold Timer & Testing
- Large timer display with start/stop functionality
- Circular progress indicator (2-minute max)
- Pulsing animation during breath-hold
- Millisecond-accurate timing
- **MANDATORY safety warnings modal before first use**

### 2. Performance Assessment 
- **CORRECTED Assessment Logic** based on medical evidence:
  - Below Average: < 30s (Red #F72585) - May indicate respiratory limitations
  - Average: 30-60s (Yellow #FFC53D) - Healthy adult range (49±10 seconds average)
  - Good: 60-120s (Green #24880C) - Trained individual level
  - Excellent: > 120s (Teal #20E3B2) - Elite performance requiring training
- **Evidence-based recommendations** with medical citations
- **NO percentile claims** (removed for medical accuracy)

### 3. Progress Tracking
- Historical data storage
- Interactive line chart with reference lines
- Statistics dashboard
- Export functionality

### 4. Educational Content
- 5-step tutorial slideshow:
  1. Set the Stage
  2. Fill Your Lungs
  3. Start the Clock
  4. Stop When Done
  5. Check Results
- **Comprehensive safety information and medical disclaimers**

## Evidence-Based Breathing Exercise Recommendations

### For Below Average (< 30s):
1. **Diaphragmatic Breathing** (10 mins daily)
   - Source: PMC Review: Effects of Diaphragmatic Breathing on Health
2. **Pursed Lip Breathing** (5-10 mins, 2-3 times daily)
   - Source: Systematic Review: The use of Pursed Lips Breathing in stable COPD
3. **Box Breathing (4-4-4-4)** (5 mins, morning/evening)
   - Source: Journal of Pharmaceutical Research Int: Effect of Box Breathing

### For Average (30-60s):
- All above exercises plus:
4. **Alternate Nostril Breathing** (5 mins daily)
   - Source: Mendeley Dataset: Efficacy of alternate nostril breathing
5. **Moderate Cardio Exercise** (with doctor clearance)

### For Good (60-120s):
6. **4-7-8 Breathing Technique** (with caution)
   - Source: Int. Journal of Health Sciences: Effect of 4-7-8 Breathing
7. **Pranayama Yoga Techniques** (qualified instructor required)
   - Source: PMC Systematic Review: Therapeutic Benefits of Pranayama

### For Excellent (>120s):
8. **Consistent Aerobic Training** (with medical clearance)
9. **⚠️ Wim Hof Method (HIGH RISK)** - NOT recommended for general use
   - Warning: Multiple documented drowning deaths
   - Source: Live Science: Dangers of the Wim Hof Method

## Design System

### Colors
```css
--primary: #24880C    (Green - main brand)
--secondary: #F72585  (Pink - warnings)
--success: #20E3B2    (Teal - excellent)
--warning: #FFC53D    (Yellow - average)
--dark: #171B4D       (Text)
--gray: #6B7280       (Secondary text)
--light: #F9FAFF      (Background)
```

### Navigation
- 5-tab bottom navigation (mobile) / top (desktop)
- Tabs: How It Works, Test, Assessment, History, Safety
- Glassmorphism blur effects

## Technical Stack
- React with TypeScript
- Tailwind CSS or Styled Components
- Chart.js or Recharts for graphs
- Lucide React icons
- LocalStorage for data persistence
- PWA capabilities

## Key Interfaces
```typescript
interface TestResult {
  id: string;
  date: string;
  duration: number; // seconds
  performanceLevel: 'below' | 'average' | 'good' | 'excellent';
}
```

## Detailed Page Specifications

### Test Page (Main Timer)
```
LAYOUT: Centered timer with controls
COMPONENTS:
- Circular SVG progress ring (200px diameter)
- Digital timer display (48px font, monospace)
- Large start/stop button (primary color)
- Status text ("Hold your breath..." / "Great job!")
- Safety info icon (top-right corner)
- Breathing animation (pulsing circle overlay)

TIMER LOGIC:
- Update every 50ms for smooth animation
- Handle browser tab visibility changes
- Automatic redirect to assessment after stop
- MANDATORY safety modal on first use (stored in localStorage)
```

### Assessment Page
```
LAYOUT: Scrollable results with cards
COMPONENTS:
- Performance score card with color-coded badge
- Duration display in M:SS format
- MEDICAL DISCLAIMER prominently displayed
- Evidence-based feedback text with medical sources
- Recommendation cards with breathing exercises
- Clickable citation links to medical sources
- "Take Another Test" button
- Navigation to history

ASSESSMENT LOGIC:
- Calculate performance level based on CORRECTED medical thresholds
- Display appropriate evidence-based recommendations
- Save result to localStorage with timestamp
- Include medical disclaimers with each recommendation
```

### History Page
```
LAYOUT: Chart at top, list below
COMPONENTS:
- Line chart showing last 10 tests
- Dashed reference lines for performance thresholds
- Scrollable list of all test results
- Clear history button with confirmation
- Export data as CSV option
- Empty state for new users

CHART CONFIG:
- X-axis: Test dates (MM/DD format)
- Y-axis: Duration in seconds
- Green line for user progress
- Reference lines for 30s, 60s, 120s thresholds (CORRECTED)
```

### How It Works Page
```
LAYOUT: Full-screen carousel
COMPONENTS:
- 5 slides with icons, titles, and descriptions
- Pagination dots at bottom
- Swipe navigation (touch and mouse)
- Background images for each step
- Large icons (Lucide React): Settings, Target, Play, Stop, Award

SLIDE CONTENT:
1. "Set the Stage" - Find quiet space, no distractions
2. "Fill Your Lungs" - Take deep, steady breath
3. "Start the Clock" - Begin timing your breath-hold
4. "Stop When Done" - End when you need to breathe
5. "Check Results" - View assessment and recommendations
```

### Safety Page
```
LAYOUT: Scrollable information
CONTENT:
- EMERGENCY WARNING SECTION (when to seek immediate help)
- Complete list of contraindications
- Medical consultation guidelines
- Resource links to medical authorities (FDA, Cleveland Clinic, etc.)
- App disclaimer and legal text
- Emergency contact information

REQUIRED WARNINGS:
- Never practice underwater or while driving
- Complete contraindications list from medical sources
- Stop if experiencing discomfort
- Links to medical studies and resources
```

## Emergency Information Requirements

### WHEN TO SEEK IMMEDIATE MEDICAL ATTENTION
Display prominently: Contact emergency services immediately if experiencing:
- Chest pain or pressure
- Severe shortness of breath
- Dizziness or fainting
- Rapid or irregular heartbeat
- Severe anxiety or panic

### HEALTHCARE PROVIDER CONSULTATION RECOMMENDED
Users should consult healthcare providers before using breathing exercises if they have:
- Any chronic medical conditions
- History of respiratory problems
- Cardiovascular disease
- Mental health conditions
- Current medications that may be affected

## User Flow & Interactions

### First-Time User (MANDATORY SAFETY FLOW)
1. Load app → How It Works tutorial (auto-start)
2. Complete 5-slide walkthrough
3. Navigate to Test page
4. **MANDATORY safety warning modal with medical disclaimers**
5. **User must acknowledge all contraindications and risks**
6. Complete first breath-hold test
7. View assessment results **with medical disclaimers**
8. Explore history (empty state)

### Returning User
1. Load app → Last visited page or Test page
2. Quick access to timer (safety acknowledgment remembered)
3. Easy access to safety info
4. Complete tests and view progress
5. Compare with previous results

## Safety & Compliance

### Required Warnings (MUST IMPLEMENT)
- Pre-test safety modal with medical contraindications checklist
- Medical disclaimer on every assessment page
- Emergency contact information prominently displayed
- Links to medical resources (FDA, Cleveland Clinic, PMC studies)
- Age restrictions and contraindications clearly stated

### Data Privacy
- All data stored locally (no server)
- No personal information collected
- Optional data export for user backup
- Clear data deletion functionality

## FDA Compliance Requirements

### Mobile Health App Compliance
1. **Avoiding medical device classification** - App provides general wellness information rather than diagnostic tools
2. **Including comprehensive disclaimers** - Clear statements that app is not for medical diagnosis or treatment
3. **Eliminating unsupported medical claims** - No CO₂ tolerance assessments or percentile claims lacking scientific validation

Source: FDA: Device Software Functions Including Mobile Medical Applications

## Advanced Features (Future)

### Gamification
- Achievement badges for milestones
- Streak tracking for consecutive days
- Personal record celebrations
- Progress sharing (optional)

### Enhanced Analytics
- Trend analysis and predictions
- Improvement rate calculations
- Performance comparisons with population
- Custom goal setting

## Implementation Prompt for AI Tools

**For lovable.ai/bolt.new:**

"Create a React TypeScript breath-hold training web app called 'GritBreath' with:

1. 5-tab navigation (How It Works, Test, Assessment, History, Safety)
2. Main timer with circular progress ring and precise timing
3. Performance assessment with 4 color-coded levels based on medical evidence
4. Progress history with line charts
5. Educational tutorial carousel
6. Comprehensive safety information and medical disclaimers

**CRITICAL SAFETY REQUIREMENTS:**
- MANDATORY safety warning modal before first use with medical contraindications
- Medical disclaimers on all assessment pages
- Evidence-based breathing exercise recommendations with medical citations
- Emergency contact information prominently displayed
- Complete contraindications list from medical sources
- Links to medical authorities (FDA, Cleveland Clinic, PMC studies)

Primary color: #24880C (green). Include FDA-compliant medical disclaimers, mobile-responsive design, and localStorage data persistence."

## Detailed Implementation Requirements

### Safety Modal Implementation (CRITICAL)
```typescript
const SafetyModal = () => {
  // MUST include all contraindications from medical sources
  // User must acknowledge each risk before proceeding
  // Store acknowledgment in localStorage
  // Include links to medical sources
};
```

### Timer Implementation
```typescript
const useBreathHoldTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  // Handle visibility change for background timing
  // Update every 50ms for smooth animation
  // Return formatted time and control functions
};
```

### Assessment Logic (CORRECTED)
```typescript
const getAssessmentDetails = (duration: number) => {
  if (duration < 30) return {
    level: 'below',
    color: '#F72585',
    feedback: 'Duration below 30 seconds may indicate respiratory limitations...',
    recommendations: [
      {
        title: 'Diaphragmatic Breathing',
        source: 'PMC Review: Effects of Diaphragmatic Breathing on Health',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7602530/'
      }
    ]
  };
  // ... other levels with medical sources
};
```

### Chart Configuration
```typescript
const chartData = {
  labels: history.map(h => formatDate(h.date)),
  datasets: [{
    data: history.map(h => h.duration),
    borderColor: '#24880C',
    backgroundColor: 'rgba(36, 136, 12, 0.1)'
  }]
};
```

## Medical Citations to Include

**The app MUST include these medical sources with clickable links:**

- PMC Review: Effects of Diaphragmatic Breathing on Health
- Cleveland Clinic: Diaphragmatic Breathing Exercises & Benefits  
- Systematic Review: The use of Pursed Lips Breathing in stable COPD
- Journal of Pharmaceutical Research Int: Effect of Box Breathing
- Medical News Today: How long can the average person hold their breath
- FDA: Device Software Functions Including Mobile Medical Applications
- Live Science: Dangers of the Wim Hof Method
- PMC Systematic Review: Therapeutic Benefits of Pranayama

This comprehensive specification provides all the details needed to recreate the GritBreath mobile app as a medically-compliant web application with proper safety warnings and evidence-based recommendations. 