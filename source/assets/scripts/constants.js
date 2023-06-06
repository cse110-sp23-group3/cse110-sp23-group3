const heartFortuneMap = new Map([
  ['wavy', 'many relationships and lovers, absence of serious'],
  ['long and curvy', 'freely expresses emotions and feelings'],
  ['straight and parallel to the head line', 'good handle on emotions'],
  ['begins below the index finger', 'content with love life'],
  ['begins below the middle finger', 'selfish when it comes to love'],
  ['begins in the middle', 'falls in love easily'],
  ['broken line', 'emotional trauma'],
  ['circles on the line', 'sadness or depression'],
  ['smaller lines crossing through heart line', 'emotional trauma'],
  ['no abnormal patterns', 'emotionally stable'],
]);

const heartChoicesMap = new Map([
  [
    'shapeChoices',
    new Set([
      'wavy',
      'long and curvy',
      'straight and parallel to the head line',
    ]),
  ],
  [
    'positionChoices',
    new Set([
      'begins below the index finger',
      'begins below the middle finger',
      'begins in the middle',
    ]),
  ],
  [
    'abnormalChoices',
    new Set([
      'broken line',
      'circles on the line',
      'smaller lines crossing through heart line',
      'no abnormal patterns',
    ]),
  ],
]);

// fortune for head line
const headFortuneMap = new Map([
  ['wavy', 'short attention span'],
  ['short', 'prefers physical achievements over mental ones'],
  [
    'long and straight',
    'thinkings are clear and focused with realistic mindset',
  ],
  ['curved and sloping', 'full of creativity and spontaneity'],
  [
    'separated from life line',
    'independence and self-reliance in thinking and decision-making',
  ],
  [
    'overlap with life line',
    'strong connection between the intellectual and physical aspects',
  ],
  [
    'crossed with life line',
    'conflict or tension between rationality and physical well-being or vitality',
  ],
  ['donuts on the line', 'emotional crisis'],
  ['broken', 'inconsistencies in thought'],
  [
    'multiple crosses through the line',
    'fragmented focus and interruptions in thinking',
  ],
  ['no abnormal patterns', 'clear and focused thinking'],
]);

const headChoicesMap = new Map([
  [
    'shapeChoices',
    new Set(['wavy', 'short', 'long and straight', 'curved and sloping']),
  ],
  [
    'positionChoices',
    new Set([
      'separated from life line',
      'overlap with life line',
      'crossed with life line',
    ]),
  ],
  [
    'abnormalChoices',
    new Set([
      'donuts on the line',
      'broken',
      'multiple crosses through the line',
      'no abnormal patterns',
    ]),
  ],
]);

// fortune for life line
const lifeFortuneMap = new Map([
  ['long and deep', 'vitality and strength'],
  ['short and shallow', 'live to the fullest and willing to take risks'],
  ['curvy', 'well-balanced life and adaptability'],
  ['runs close to thumb', 'get tired easily'],
  [
    'crossing or overlap with head line',
    'strong connection between thoughts and actions',
  ],
  ['connecting to heart line', 'emotional well-being and physical vitality'],
  ['multiple parallel lines', 'extra vitality and resilience'],
  ['islands or breaks', 'health issues, setbacks, or disruptions in life'],
  [
    'forked into branches',
    'versatility and the potential for significant life changes',
  ],
  ['no abnormal patterns', 'stable and balanced life'],
]);

const lifeChoicesMap = new Map([
  ['shapeChoices', new Set(['long and deep', 'short and shallow', 'curvy'])],
  [
    'positionChoices',
    new Set([
      'runs close to thumb',
      'crossing or overlap with head line',
      'connecting to heart line',
    ]),
  ],
  [
    'abnormalChoices',
    new Set([
      'multiple parallel lines',
      'islands or breaks',
      'forked into branches',
      'no abnormal patterns',
    ]),
  ],
]);

const fateFortuneMap = new Map([
  [
    'long and straight',
    'clear career path and a focused approach to achieving goals',
  ],
  ['curvy or wavy', 'less predictable or more flexible career path'],
  ['shallow or fainted', 'less prominent influence of caree'],
  [
    'starts from the base of the palm',
    'has a clear sense of ambition and aspirations',
  ],
  [
    'connecting to life line',
    'strives to maintain a healthy equilibrium between work and life',
  ],
  [
    'terminates in the middle of the palm',
    'significant career transition or change of direction',
  ],
  [
    'broken or fragmented',
    'significant setbacks or obstacles that impact professional journey',
  ],
  [
    'branches and changes of directions',
    'significant events or opportunities that impact the career path',
  ],
  ['absent or fainted', 'prioritizes other aspects of life over their career'],
  ['no abnormal patterns', ''],
]);

const fateChoicesMap = new Map([
  [
    'shapeChoices',
    new Set(['long and straight', 'curvy or wavy', 'shallow or fainted']),
  ],
  [
    'positionChoices',
    new Set([
      'starts from the base of the palm',
      'connecting to life line',
      'terminates in the middle of the palm',
    ]),
  ],
  [
    'abnormalChoices',
    new Set([
      'broken or fragmented',
      'branches and changes of directions',
      'absent or fainted',
      'no abnormal patterns',
    ]),
  ],
]);

export const fortuneDescMap = new Map([
  ['Heart Line', heartFortuneMap],
  ['Head Line', headFortuneMap],
  ['Life Line', lifeFortuneMap],
  ['Fate Line', fateFortuneMap],
]);

export const lineChoicesMap = new Map([
  ['heart', heartChoicesMap],
  ['head', headChoicesMap],
  ['life', lifeChoicesMap],
  ['fate', fateChoicesMap],
]);

export const palmLines = new Set([
  'Heart Line',
  'Head Line',
  'Life Line',
  'Fate Line',
]);

// description of each palm line
export const palmLineDesc = {
  'Heart Line':
    "runs horizontally across your palm and is the topmost line you'll see. It begins at the edge of your palm on the pinkie side, and runs to just underneath your index or middle finger.",
  'Head Line':
    'begins under your index finger along the edge of your palm and extends part-way across your palm in a graceful curve flowing in a slightly downward direction.',
  'Life Line':
    'begins between your thumb and index finger and travels down your palm through the middle.',
  'Fate Line':
    'is a vertical line running up the palm towards the base of the middle finger.',
};

export const basicChoices = new Set(['Yes', 'No']);
