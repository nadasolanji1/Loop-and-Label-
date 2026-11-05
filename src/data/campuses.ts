/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Campus } from '../types';

export const CAMPUSES: Campus[] = [
  {
    id: 'iu-bloomington',
    name: 'Indiana University Bloomington',
    shortName: 'IU Bloomington',
    city: 'Bloomington',
    state: 'IN',
    primaryColor: '#743C4A', // Crimson / Muted Burgundy
    safeMeetupSpots: [
      'Indiana Memorial Union (IMU) — Starbucks Commons',
      'Herman B Wells Library — Main Entrance Plaza',
      'Student Recreational Sports Center (SRSC) — Front Lobby',
      'Hodge Hall (Kelley School) — Atrium',
      'Sample Gates / Kirkwood Ave Crossroads',
    ],
  },
  {
    id: 'purdue',
    name: 'Purdue University',
    shortName: 'Purdue',
    city: 'West Lafayette',
    state: 'IN',
    primaryColor: '#CFB991', // Old Gold & Black
    safeMeetupSpots: [
      'Purdue Memorial Union (PMU) — Great Hall',
      'Wilmeth Active Learning Center (WALC) — Main Floor',
      'France A. Córdova Recreational Sports Center (Co-Rec)',
      'Engineering Mall Fountain Plaza',
    ],
  },
  {
    id: 'ut-austin',
    name: 'University of Texas at Austin',
    shortName: 'UT Austin',
    city: 'Austin',
    state: 'TX',
    primaryColor: '#BF5700', // Burnt Orange
    safeMeetupSpots: [
      'Texas Union — Main Patio & Starbucks',
      'Perry-Castañeda Library (PCL) — Front Plaza',
      'Gregory Gymnasium — South Plaza',
      'Speedway Mall & Jester Center Breezeway',
    ],
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    shortName: 'Michigan',
    city: 'Ann Arbor',
    state: 'MI',
    primaryColor: '#00274C', // Maize & Blue
    safeMeetupSpots: [
      'Michigan Union — Courtyard Lounge',
      'Shapiro Undergraduate Library (UGLi) — Cafe Area',
      'Intramural Sports Building (IMSB)',
      'Ross School of Business — Winter Garden',
    ],
  },
  {
    id: 'ohio-state',
    name: 'The Ohio State University',
    shortName: 'Ohio State',
    city: 'Columbus',
    state: 'OH',
    primaryColor: '#BB0000', // Scarlet & Gray
    safeMeetupSpots: [
      'Ohio Union — Performance Hall Lobby',
      'William Oxley Thompson Memorial Library — Ground Floor',
      'RPAC (Recreation and Physical Activity Center)',
      'The Oval — South Plaza Walkway',
    ],
  },
];

export const DEFAULT_CAMPUS = CAMPUSES[0];
