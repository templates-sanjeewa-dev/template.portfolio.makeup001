import type {
  About,
  JournalPost,
  Media,
  Navigation,
  PortfolioCategory,
  PortfolioProject,
  Service,
  SiteSetting,
  Testimonial,
} from '@/payload-types'

const now = '2026-11-06T00:00:00.000Z'

const pexels = (
  id: number,
  photoId: number,
  alt: string,
  width = 1600,
  height = 2400,
  credit = 'Demo photography via Pexels',
): Media => ({
  id,
  alt,
  caption: alt,
  credit,
  createdAt: now,
  updatedAt: now,
  url:
    'https://images.pexels.com/photos/' +
    photoId +
    '/pexels-photo-' +
    photoId +
    '.jpeg?auto=compress&cs=tinysrgb&w=1800',
  width,
  height,
  mimeType: 'image/jpeg',
})

const textNode = (text: string) => ({
  type: 'text',
  text,
  version: 1,
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const headingNode = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  tag,
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const quoteNode = (text: string) => ({
  type: 'quote',
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
})

const richText = (
  ...nodes: Array<
    ReturnType<typeof paragraphNode> | ReturnType<typeof headingNode> | ReturnType<typeof quoteNode>
  >
) => ({
  root: {
    type: 'root',
    children: nodes,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const demoImages = {
  homeHero: pexels(
    -100,
    39974656,
    'Warm bridal beauty portrait in soft afternoon light with a lace veil',
    4024,
    6048,
  ),
  hero: pexels(
    -101,
    29352013,
    'Elegant bridal beauty portrait with refined makeup and jewelry',
    4000,
    6000,
  ),
  bridalVeil: pexels(
    -102,
    38765825,
    'Close bridal portrait with pearl veil and polished makeup',
    6336,
    9504,
  ),
  bridalCandle: pexels(
    -103,
    34607174,
    'Bridal portrait with lace veil and soft candlelit atmosphere',
    7559,
    4252,
  ),
  bridalTraditional: pexels(
    -104,
    5767917,
    'Traditional bridal portrait with intricate veil and elegant makeup',
    2656,
    3984,
  ),
  bridalBengali: pexels(
    -105,
    35808599,
    'Traditional Bengali bridal portrait with gold jewelry and makeup',
    4672,
    7008,
  ),
  bridalClose: pexels(
    -106,
    18478116,
    'Warm close-up bridal portrait with vibrant makeup and accessories',
    6000,
    4000,
  ),
  bridalSoft: pexels(
    -107,
    7289123,
    'Soft close-up bridal portrait with understated makeup',
    2333,
    3500,
  ),
  bridalLace: pexels(
    -108,
    39974652,
    'Elegant bridal portrait with lace veil in soft warm sunlight',
    4024,
    6048,
  ),
  bridalIndian: pexels(
    -109,
    15789321,
    'Traditional Indian bridal beauty portrait with jewelry and makeup',
    4024,
    6048,
  ),
  bridalStudio: pexels(
    -110,
    39904285,
    'Soft bridal portrait with veil and natural window light',
    4000,
    6000,
  ),
  bridalDark: pexels(
    -111,
    16123932,
    'High-angle bridal portrait with dramatic makeup and veil',
    4672,
    7008,
  ),
  bridalMonochrome: pexels(
    -112,
    40525078,
    'Black and white bridal portrait in soft interior light',
    4000,
    6000,
  ),
  bridalMirror: pexels(
    -113,
    19345732,
    'Bride preparing makeup beside a mirror in monochrome light',
    3362,
    5053,
  ),
  bridalPrepSoft: pexels(
    -114,
    32427370,
    'Bride receiving makeup in soft natural window light',
    4160,
    6240,
  ),
  bridalPrepRoom: pexels(
    -115,
    37710473,
    'Bride in a white robe receiving makeup in soft natural light',
    4000,
    6000,
  ),
  bridalPrepJoy: pexels(
    -116,
    29569638,
    'Joyful bride being prepared by professional stylists',
    6240,
    4160,
  ),
  bridalApplication: pexels(
    -117,
    34025162,
    'Close-up bridal makeup application focused on the eyes',
    2718,
    4074,
  ),
  bridalApplicationWarm: pexels(
    -118,
    37710475,
    'Professional makeup artist applying bridal eye makeup',
    4000,
    6000,
  ),
  bridalHappy: pexels(
    -119,
    33951059,
    'Smiling bride having makeup applied during wedding preparation',
    4752,
    3168,
  ),
  bridalArtist: pexels(
    -120,
    12957390,
    'Makeup artist applying cosmetics during wedding preparation',
    4128,
    2752,
  ),
  artistStudio: pexels(
    -121,
    35983901,
    'Makeup artist working with a bride in an elegant studio setting',
    4000,
    6000,
  ),
  artistEyeliner: pexels(
    -122,
    12055326,
    'Close studio beauty application by a professional makeup artist',
    4000,
    6000,
  ),
  artistSmile: pexels(
    -123,
    15670451,
    'Smiling model during professional makeup application',
    3648,
    5472,
  ),
  eyeDetail: pexels(
    -124,
    6954217,
    'Close-up detail of professional eye makeup application',
    1600,
    2400,
  ),
  editorialGloss: pexels(
    -125,
    15579920,
    'Editorial beauty portrait with glossy modern makeup',
    1600,
    2400,
  ),
  editorialBlue: pexels(
    -126,
    13918628,
    'Studio portrait with bold blue eye makeup and glossy lips',
    2624,
    3280,
  ),
  editorialIntricate: pexels(
    -127,
    29721721,
    'Close beauty portrait with intricate makeup and sculpted hair',
    2982,
    4473,
  ),
  editorialMono: pexels(
    -128,
    19832289,
    'Monochrome editorial portrait with makeup and jewelry',
    2688,
    4033,
  ),
  editorialShimmer: pexels(
    -129,
    18435619,
    'Studio beauty portrait with shimmering editorial makeup',
    3024,
    4032,
  ),
  editorialCurl: pexels(
    -130,
    8173248,
    'Glamour beauty portrait with expressive makeup and curly hair',
    3648,
    5472,
  ),
  editorialNatural: pexels(
    -131,
    7582123,
    'Close beauty portrait highlighting natural skin texture and refined makeup',
    4000,
    6000,
  ),
  editorialSquare: pexels(
    -132,
    20820147,
    'Modern studio beauty portrait with styled hair and makeup',
    4000,
    4000,
  ),
  editorialGlam: pexels(
    -133,
    14016182,
    'Glamour studio portrait with refined makeup and long hair',
    6017,
    7521,
  ),
  editorialMinimal: pexels(
    -134,
    8639177,
    'Soft neutral beauty portrait with understated makeup and gentle light',
    4000,
    6000,
  ),
  editorialDark: pexels(
    -135,
    20459105,
    'Sophisticated dark-background beauty portrait',
    3869,
    6000,
  ),
  editorialCreative: pexels(
    -136,
    29528108,
    'Creative fashion beauty portrait with expressive studio makeup',
    3376,
    6000,
  ),
  editorialWarm: pexels(
    -137,
    36078897,
    'Warm close-up studio portrait with elegant makeup',
    4672,
    7008,
  ),
  artisticBridal: pexels(
    -138,
    30825631,
    'Artistic bridal fashion portrait with vibrant makeup',
    4480,
    6720,
  ),
  fantasyBridal: pexels(
    -139,
    29815593,
    'Surreal bridal portrait with creative fantasy makeup',
    4000,
    6000,
  ),
  brushesJar: pexels(
    -140,
    1438065,
    'Makeup brushes arranged in a beauty workspace',
    5667,
    3376,
  ),
  paletteFlatlay: pexels(
    -141,
    8394923,
    'Makeup palette and brushes in an artistic flat lay',
    4272,
    2848,
  ),
  productsWhite: pexels(
    -142,
    37356602,
    'Minimal makeup products and brushes on a white background',
    4000,
    6000,
  ),
  accessoriesFlatlay: pexels(
    -143,
    37575397,
    'Elegant makeup brushes, lipstick and beauty accessories',
    4236,
    2640,
  ),
  brushesPink: pexels(
    -144,
    15898033,
    'Close-up makeup brushes with a soft pink editorial background',
    3456,
    4608,
  ),
  serviceBridal: pexels(
    -145,
    38765476,
    'Professional makeup artist preparing a bride beside a softly lit window',
    5346,
    9504,
  ),
  serviceEngagement: pexels(
    -146,
    39070340,
    'Smiling polished bridal portrait with soft makeup and a white veil',
    4160,
    6240,
  ),
  serviceEditorial: pexels(
    -147,
    8031803,
    'Professional makeup artist applying cosmetics to a client in a studio',
    4000,
    6000,
  ),
  serviceBridalParty: pexels(
    -148,
    28861519,
    'Bride receiving makeup in soft indoor light during wedding preparation',
    4000,
    6000,
  ),
  artistPortrait: pexels(
    -149,
    26616194,
    'Professional makeup artist portrait holding brushes in a neutral studio',
    4000,
    6000,
  ),
  journalBridalDetail: pexels(
    -150,
    35538643,
    'Close-up bridal lipstick application before the wedding ceremony',
    4160,
    6240,
  ),
  journalEditorialProcess: pexels(
    -151,
    3894537,
    'Makeup artist working with a model in a professional beauty studio',
    4000,
    6000,
  ),
} as const

export const demoHeroImage = demoImages.homeHero

export const demoPortfolioCategories: PortfolioCategory[] = [
  {
    id: -201,
    title: 'Bridal',
    slug: 'bridal',
    description: 'Soft, refined bridal beauty and complete wedding-day stories.',
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: -202,
    title: 'Editorial',
    slug: 'editorial',
    description: 'Beauty studies, campaigns, portraits, and creative studio work.',
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: -203,
    title: 'Occasion',
    slug: 'occasion',
    description: 'Evening, celebration, and event-focused makeup.',
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: -204,
    title: 'Engagement',
    slug: 'engagement',
    description: 'Polished engagement and pre-wedding beauty.',
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
  },
]

const category = (slug: string) =>
  demoPortfolioCategories.find((item) => item.slug === slug) || demoPortfolioCategories[0]

export const demoPortfolioProjects: PortfolioProject[] = [
  {
    id: -301,
    title: 'Soft Ceremony Light',
    slug: 'soft-ceremony-light',
    category: category('bridal'),
    clientName: 'Bridal Study I',
    excerpt:
      'Luminous skin, softened definition, and a finish designed to remain effortless from ceremony light through evening.',
    heroImage: demoImages.hero,
    story: richText(
      headingNode('A bridal look built around light, not coverage.'),
      paragraphNode(
        'The complexion stays fresh and dimensional while the eyes are softly structured. The intention is polish without losing the small details that make the face recognisable.',
      ),
      paragraphNode(
        'Every choice—from skin preparation to lash weight—was kept quiet enough to work in close photographs and natural enough to feel comfortable in person.',
      ),
      quoteNode(
        'The best bridal makeup should still feel like your own face when the photographs come back.',
      ),
    ),
    gallery: [
      {
        image: demoImages.bridalPrepSoft,
        caption: 'Preparation / soft window light',
        presentation: 'portrait',
        id: 'sc1',
      },
      {
        image: demoImages.bridalApplicationWarm,
        caption: 'Eye definition in progress',
        presentation: 'portrait',
        id: 'sc2',
      },
      {
        image: demoImages.bridalVeil,
        caption: 'Veil, pearl and finished complexion',
        presentation: 'wide',
        id: 'sc3',
      },
      {
        image: demoImages.bridalClose,
        caption: 'Skin texture and warm detail',
        presentation: 'landscape',
        id: 'sc4',
      },
      {
        image: demoImages.bridalPrepRoom,
        caption: 'The getting-ready atmosphere',
        presentation: 'wide',
        id: 'sc5',
      },
    ],
    eventDate: '2026-02-14T00:00:00.000Z',
    location: 'Colombo',
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -302,
    title: 'Veil & Pearl',
    slug: 'veil-and-pearl',
    category: category('bridal'),
    clientName: 'Bridal Study II',
    excerpt:
      'A clean bridal portrait direction built around soft luminosity, pearl detail, and a calm classic finish.',
    heroImage: demoImages.bridalVeil,
    story: richText(
      headingNode('Classic bridal beauty, edited with restraint.'),
      paragraphNode(
        'The look is intentionally refined rather than trend-heavy. Skin remains luminous, eyes stay softly framed, and the finishing details are designed to sit quietly beside the veil and jewelry.',
      ),
      quoteNode('The makeup should complete the styling, never compete with it.'),
    ),
    gallery: [
      {
        image: demoImages.bridalCandle,
        caption: 'Lace and candlelight',
        presentation: 'landscape',
        id: 'vp1',
      },
      {
        image: demoImages.bridalSoft,
        caption: 'Soft close beauty portrait',
        presentation: 'portrait',
        id: 'vp2',
      },
      {
        image: demoImages.bridalLace,
        caption: 'Veil and lace detail',
        presentation: 'portrait',
        id: 'vp3',
      },
      {
        image: demoImages.bridalTraditional,
        caption: 'A more ornate bridal styling study',
        presentation: 'wide',
        id: 'vp4',
      },
    ],
    eventDate: '2026-03-08T00:00:00.000Z',
    location: 'Kandy',
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -303,
    title: 'Golden Hour Vows',
    slug: 'golden-hour-vows',
    category: category('bridal'),
    clientName: 'Wedding Study III',
    excerpt:
      'Warm bridal beauty with sculpted softness, luminous skin, and enough definition to carry through a long wedding day.',
    heroImage: demoImages.bridalBengali,
    story: richText(
      headingNode('Warmth, structure, and a little more ceremony.'),
      paragraphNode(
        'This direction allows the jewelry and wardrobe to feel rich while the makeup stays balanced. The complexion remains dimensional and the eye work carries enough definition to hold in both daylight and flash.',
      ),
    ),
    gallery: [
      {
        image: demoImages.bridalHappy,
        caption: 'Preparation with a lighter mood',
        presentation: 'landscape',
        id: 'gh1',
      },
      {
        image: demoImages.bridalPrepJoy,
        caption: 'Final styling and finishing touches',
        presentation: 'wide',
        id: 'gh2',
      },
      {
        image: demoImages.bridalIndian,
        caption: 'Traditional detail and complexion finish',
        presentation: 'portrait',
        id: 'gh3',
      },
      {
        image: demoImages.bridalMirror,
        caption: 'A quieter getting-ready frame',
        presentation: 'portrait',
        id: 'gh4',
      },
    ],
    eventDate: '2026-04-18T00:00:00.000Z',
    location: 'Galle',
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -304,
    title: 'Modern Restraint',
    slug: 'modern-restraint',
    category: category('editorial'),
    clientName: 'Beauty Editorial I',
    excerpt:
      'Clean skin, controlled shine, and a quiet editorial finish shaped for close camera work.',
    heroImage: demoImages.editorialGloss,
    story: richText(
      headingNode('A study in skin, shape, and restraint.'),
      paragraphNode(
        'Editorial makeup can be expressive without becoming loud. Here the finish is deliberate, glossy in the right places, and controlled enough for a close beauty frame.',
      ),
      quoteNode('One clear idea usually photographs stronger than ten competing ones.'),
    ),
    gallery: [
      {
        image: demoImages.editorialNatural,
        caption: 'Natural complexion study',
        presentation: 'portrait',
        id: 'mr1',
      },
      {
        image: demoImages.editorialMono,
        caption: 'Monochrome jewelry and skin detail',
        presentation: 'portrait',
        id: 'mr2',
      },
      {
        image: demoImages.editorialShimmer,
        caption: 'Shimmer and texture in studio light',
        presentation: 'landscape',
        id: 'mr3',
      },
      {
        image: demoImages.artistStudio,
        caption: 'Behind the beauty frame',
        presentation: 'wide',
        id: 'mr4',
      },
      {
        image: demoImages.artistEyeliner,
        caption: 'Precision application',
        presentation: 'portrait',
        id: 'mr5',
      },
    ],
    eventDate: '2026-05-08T00:00:00.000Z',
    location: 'Studio',
    featured: true,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -305,
    title: 'Midnight Gloss',
    slug: 'midnight-gloss',
    category: category('editorial'),
    clientName: 'Beauty Editorial II',
    excerpt:
      'A darker beauty direction with polished skin, expressive eyes, and restrained gloss.',
    heroImage: demoImages.editorialDark,
    story: richText(
      headingNode('Beauty after dark.'),
      paragraphNode(
        'The mood is deeper but the makeup remains edited. Contrast is concentrated around the eyes while complexion and lip texture stay clean enough to preserve a modern finish.',
      ),
    ),
    gallery: [
      {
        image: demoImages.editorialBlue,
        caption: 'Saturated eye color and gloss',
        presentation: 'portrait',
        id: 'mg1',
      },
      {
        image: demoImages.editorialCurl,
        caption: 'Hair, shape, and complexion contrast',
        presentation: 'portrait',
        id: 'mg2',
      },
      {
        image: demoImages.editorialWarm,
        caption: 'Warm close beauty frame',
        presentation: 'landscape',
        id: 'mg3',
      },
      {
        image: demoImages.editorialCreative,
        caption: 'Creative studio direction',
        presentation: 'wide',
        id: 'mg4',
      },
    ],
    eventDate: '2026-05-24T00:00:00.000Z',
    location: 'Colombo Studio',
    featured: true,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -306,
    title: 'Soft Focus Study',
    slug: 'soft-focus-study',
    category: category('editorial'),
    clientName: 'Beauty Editorial III',
    excerpt:
      'Minimal makeup, quiet texture, and a soft studio approach designed around skin rather than statement.',
    heroImage: demoImages.editorialMinimal,
    story: richText(
      headingNode('When less product creates more presence.'),
      paragraphNode(
        'This study keeps complexion and structure extremely quiet. The focus is skin preparation, subtle tone correction, and enough definition to hold the face in a clean studio frame.',
      ),
    ),
    gallery: [
      {
        image: demoImages.editorialSquare,
        caption: 'Structured studio portrait',
        presentation: 'landscape',
        id: 'sf1',
      },
      {
        image: demoImages.editorialIntricate,
        caption: 'A more detailed beauty variation',
        presentation: 'portrait',
        id: 'sf2',
      },
      {
        image: demoImages.editorialGlam,
        caption: 'Glamour variation with the same skin-first approach',
        presentation: 'portrait',
        id: 'sf3',
      },
      {
        image: demoImages.productsWhite,
        caption: 'A restrained beauty workspace',
        presentation: 'wide',
        id: 'sf4',
      },
    ],
    eventDate: '2026-06-04T00:00:00.000Z',
    location: 'Studio',
    featured: false,
    sortOrder: 6,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -307,
    title: 'After Dark',
    slug: 'after-dark',
    category: category('occasion'),
    clientName: 'Evening Study',
    excerpt:
      'Defined eyes, luminous complexion, and a confident finish designed for an evening occasion.',
    heroImage: demoImages.editorialGlam,
    story: richText(
      headingNode('A little more definition, never more noise.'),
      paragraphNode(
        'Evening makeup can carry stronger contrast while keeping the skin believable. The look is built to feel polished under both warm room light and flash photography.',
      ),
    ),
    gallery: [
      {
        image: demoImages.editorialCurl,
        caption: 'Evening portrait study',
        presentation: 'portrait',
        id: 'ad1',
      },
      {
        image: demoImages.editorialWarm,
        caption: 'Warm skin and eye detail',
        presentation: 'portrait',
        id: 'ad2',
      },
      {
        image: demoImages.editorialDark,
        caption: 'A deeper studio variation',
        presentation: 'landscape',
        id: 'ad3',
      },
      {
        image: demoImages.accessoriesFlatlay,
        caption: 'Beauty tools and finishing details',
        presentation: 'wide',
        id: 'ad4',
      },
    ],
    eventDate: '2026-07-12T00:00:00.000Z',
    location: 'Colombo',
    featured: false,
    sortOrder: 7,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -308,
    title: 'Engagement Light',
    slug: 'engagement-light',
    category: category('engagement'),
    clientName: 'Engagement Study',
    excerpt:
      'Soft polished beauty for an engagement portrait—fresh skin, clean definition, and romantic restraint.',
    heroImage: demoImages.bridalStudio,
    story: richText(
      headingNode('Polished enough for the photograph, light enough for the moment.'),
      paragraphNode(
        'Engagement makeup sits between everyday familiarity and bridal-level finish. The complexion is refined, the eyes are gently structured, and every detail is designed to work in close portrait photography.',
      ),
    ),
    gallery: [
      {
        image: demoImages.bridalPrepRoom,
        caption: 'Preparation before the portrait session',
        presentation: 'landscape',
        id: 'el1',
      },
      {
        image: demoImages.bridalPrepJoy,
        caption: 'Finishing touches',
        presentation: 'wide',
        id: 'el2',
      },
      {
        image: demoImages.brushesJar,
        caption: 'Tools and preparation',
        presentation: 'portrait',
        id: 'el3',
      },
      {
        image: demoImages.productsWhite,
        caption: 'A quiet cosmetic detail frame',
        presentation: 'portrait',
        id: 'el4',
      },
    ],
    eventDate: '2026-08-02T00:00:00.000Z',
    location: 'Negombo',
    featured: true,
    sortOrder: 8,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -309,
    title: 'Monochrome Bride',
    slug: 'monochrome-bride',
    category: category('bridal'),
    clientName: 'Bridal Study IV',
    excerpt:
      'A cinematic black-and-white bridal direction focused on structure, skin texture, and quiet emotion.',
    heroImage: demoImages.bridalMonochrome,
    story: richText(
      headingNode('When color disappears, structure matters more.'),
      paragraphNode(
        'Monochrome photographs reveal texture, contrast, and shape very clearly. The makeup therefore stays carefully balanced: enough structure to define the features, but no heavy edges that become distracting in black and white.',
      ),
    ),
    gallery: [
      {
        image: demoImages.editorialMono,
        caption: 'Monochrome beauty reference',
        presentation: 'portrait',
        id: 'mb1',
      },
      {
        image: demoImages.bridalMirror,
        caption: 'Quiet preparation frame',
        presentation: 'portrait',
        id: 'mb2',
      },
      {
        image: demoImages.bridalCandle,
        caption: 'Veil and light study',
        presentation: 'wide',
        id: 'mb3',
      },
      {
        image: demoImages.bridalDark,
        caption: 'A deeper bridal portrait variation',
        presentation: 'landscape',
        id: 'mb4',
      },
    ],
    eventDate: '2026-08-23T00:00:00.000Z',
    location: 'Colombo',
    featured: false,
    sortOrder: 9,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -310,
    title: 'Art House Bride',
    slug: 'art-house-bride',
    category: category('editorial'),
    clientName: 'Creative Bridal Editorial',
    excerpt:
      'A more expressive bridal beauty story exploring color, styling, and fashion-led makeup direction.',
    heroImage: demoImages.artisticBridal,
    story: richText(
      headingNode('Bridal beauty with permission to become fashion.'),
      paragraphNode(
        'This story pushes beyond traditional bridal references while keeping the face sophisticated. Color and styling lead the mood, but skin and proportion keep the result editorial rather than theatrical.',
      ),
    ),
    gallery: [
      {
        image: demoImages.fantasyBridal,
        caption: 'A surreal creative variation',
        presentation: 'portrait',
        id: 'ah1',
      },
      {
        image: demoImages.editorialCreative,
        caption: 'Fashion beauty frame',
        presentation: 'portrait',
        id: 'ah2',
      },
      {
        image: demoImages.editorialBlue,
        caption: 'Color-led makeup detail',
        presentation: 'landscape',
        id: 'ah3',
      },
      {
        image: demoImages.paletteFlatlay,
        caption: 'Palette and tools behind the look',
        presentation: 'wide',
        id: 'ah4',
      },
      {
        image: demoImages.brushesPink,
        caption: 'Brush detail and soft color story',
        presentation: 'portrait',
        id: 'ah5',
      },
    ],
    eventDate: '2026-09-06T00:00:00.000Z',
    location: 'Creative Studio',
    featured: true,
    sortOrder: 10,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoServices: Service[] = [
  {
    id: -401,
    title: 'Bridal Artistry',
    slug: 'bridal-artistry',
    shortDescription:
      'A calm, personal bridal experience built around skin, light, longevity, and how you want to feel.',
    description: richText(
      paragraphNode(
        'From the first conversation to the final touch, the bridal service is designed to feel considered rather than rushed.',
      ),
      headingNode('Designed for the whole day', 'h3'),
      paragraphNode(
        'Skin preparation, complexion balance, eye definition, and finish are planned for real light, photography, and long wear.',
      ),
    ),
    image: demoImages.serviceBridal,
    priceLabel: 'Custom quote',
    durationLabel: 'Bridal morning',
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -402,
    title: 'Engagement Makeup',
    slug: 'engagement-makeup',
    shortDescription:
      'Softly polished makeup for engagement portraits, celebrations, and pre-wedding events.',
    description: richText(
      paragraphNode(
        'A refined middle ground between occasion makeup and full bridal artistry, tailored to portrait photography and event light.',
      ),
    ),
    image: demoImages.serviceEngagement,
    priceLabel: 'By enquiry',
    durationLabel: '90–120 min',
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -403,
    title: 'Editorial & Campaign',
    slug: 'editorial-campaign',
    shortDescription:
      'Beauty direction for portraits, fashion, campaigns, content, and creative image-making.',
    description: richText(
      paragraphNode(
        'A collaborative service for photographers, brands, stylists, and creatives who need makeup with a clear visual point of view.',
      ),
    ),
    image: demoImages.serviceEditorial,
    priceLabel: 'Half / full day',
    durationLabel: 'By brief',
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -404,
    title: 'Occasion Makeup',
    slug: 'occasion-makeup',
    shortDescription:
      'Refined makeup for celebrations, dinners, portraits, and important evenings.',
    description: richText(
      paragraphNode(
        'A polished look tailored to the event, outfit, light, and personal comfort level—never a one-look-fits-all appointment.',
      ),
    ),
    image: demoImages.editorialShimmer,
    priceLabel: 'By enquiry',
    durationLabel: '90–120 min',
    featured: true,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -405,
    title: 'Bridal Party',
    slug: 'bridal-party',
    shortDescription:
      'A coordinated beauty service for bridesmaids, family, and the wider wedding party.',
    description: richText(
      paragraphNode(
        'Designed for consistency, timing, and a cohesive visual finish without making every person look the same.',
      ),
    ),
    image: demoImages.serviceBridalParty,
    priceLabel: 'Custom quote',
    durationLabel: 'By group size',
    featured: false,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoTestimonials: Testimonial[] = [
  {
    id: -501,
    clientName: 'Amaya',
    quote:
      'I still looked like myself, just calmer, brighter, and somehow more photographed than I thought possible.',
    location: 'Colombo',
    portrait: demoImages.bridalSoft,
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -502,
    clientName: 'Nethmi',
    quote:
      'The makeup lasted through the entire day and never felt heavy. The whole morning felt beautifully unhurried.',
    location: 'Galle',
    portrait: demoImages.bridalTraditional,
    featured: true,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -503,
    clientName: 'Maya',
    quote:
      'She understood the brief immediately and gave the shoot exactly the polished editorial finish we needed.',
    location: 'Studio client',
    portrait: demoImages.editorialGloss,
    featured: true,
    sortOrder: 3,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -504,
    clientName: 'Shenali',
    quote:
      'Nothing felt rushed. Every detail was explained, and the final look photographed beautifully from every angle.',
    location: 'Kandy',
    portrait: demoImages.bridalLace,
    featured: true,
    sortOrder: 4,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
  {
    id: -505,
    clientName: 'Ari',
    quote:
      'The makeup felt modern and intentional without becoming too much. Exactly what I hoped the portraits would feel like.',
    location: 'Editorial client',
    portrait: demoImages.editorialNatural,
    featured: true,
    sortOrder: 5,
    createdAt: now,
    updatedAt: now,
    _status: 'published',
  },
]

export const demoSiteSettings: SiteSetting = {
  id: -801,
  siteName: 'Elara Vale Makeup',
  artistName: 'Elara Vale',
  tagline: 'Bridal & Editorial Makeup',
  shortDescription:
    'Refined, skin-focused makeup for weddings, portraits, editorial work, and modern occasions.',
  contact: {
    serviceArea: 'Colombo & destination bookings',
  },
  socialLinks: null,
  defaultSEO: {
    title: 'Elara Vale — Bridal & Editorial Makeup',
    description:
      'Refined bridal, occasion, portrait, and editorial makeup with a calm, personal approach.',
    noIndex: true,
  },
  createdAt: now,
  updatedAt: now,
}

export const demoNavigation: Navigation = {
  id: -802,
  headerLinks: [
    { id: 'nav-portfolio', label: 'Portfolio', url: '/portfolio', newTab: false },
    { id: 'nav-services', label: 'Services', url: '/services', newTab: false },
    { id: 'nav-about', label: 'About', url: '/about', newTab: false },
    { id: 'nav-journal', label: 'Journal', url: '/journal', newTab: false },
    { id: 'nav-contact', label: 'Contact', url: '/contact', newTab: false },
  ],
  primaryCTA: {
    label: 'Check availability',
    url: '/contact',
  },
  footerLinks: [
    { id: 'footer-portfolio', label: 'Portfolio', url: '/portfolio', newTab: false },
    { id: 'footer-services', label: 'Services', url: '/services', newTab: false },
    { id: 'footer-about', label: 'About', url: '/about', newTab: false },
    { id: 'footer-journal', label: 'Journal', url: '/journal', newTab: false },
    { id: 'footer-contact', label: 'Contact', url: '/contact', newTab: false },
  ],
  footerNote: 'Concept portfolio · sample content and demo photography.',
  createdAt: now,
  updatedAt: now,
}

export const demoAbout: About = {
  id: -601,
  eyebrow: 'Behind the work',
  heading: 'Beauty with a personal point of view.',
  lead:
    'A calm, detail-led approach to makeup that begins with listening and ends with a look that still feels entirely like you.',
  portrait: demoImages.artistPortrait,
  story: richText(
    headingNode('Technique matters. So does the way the experience feels.'),
    paragraphNode(
      'My approach begins with the person, not a fixed makeup map. I pay attention to skin, facial structure, wardrobe, photography, the pace of the day, and the level of polish that feels natural to you.',
    ),
    paragraphNode(
      'The goal is never to hide the face. It is to edit, balance, and bring intention to what is already there.',
    ),
    quoteNode(
      'Luxury, to me, is thoughtful attention and enough restraint to know when the look is finished.',
    ),
  ),
  credentials: [
    {
      id: 'c1',
      title: 'Bridal & occasion',
      detail:
        'Personal makeup experiences designed around photography, comfort, timing, and long wear.',
    },
    {
      id: 'c2',
      title: 'Editorial direction',
      detail:
        'Beauty work for portraits, fashion stories, campaigns, content, and creative teams.',
    },
    {
      id: 'c3',
      title: 'Skin-first approach',
      detail:
        'Preparation and complexion work treated as the foundation of every finished look.',
    },
  ],
  cta: { label: 'Start an enquiry', url: '/contact' },
  updatedAt: now,
  createdAt: now,
}

export const demoJournalPosts: JournalPost[] = [
  {
    id: -701,
    title: 'How to make bridal makeup feel like you',
    slug: 'bridal-makeup-that-feels-like-you',
    excerpt:
      'A practical way to think about references, skin, coverage, and the difference between looking polished and looking unfamiliar.',
    featuredImage: demoImages.journalBridalDetail,
    content: richText(
      paragraphNode(
        'The most useful bridal reference is not always the most dramatic image in your saved folder. It is the one that helps explain how you want to feel when you look in the mirror.',
      ),
      headingNode('Start with the feeling, not the trend'),
      paragraphNode(
        'Bring references for finish, softness, eye definition, lip tone, and skin texture separately. That gives your artist more useful information than trying to copy one complete face.',
      ),
      headingNode('Let skin still look like skin'),
      paragraphNode(
        'Coverage can be strategic. The goal is usually evenness and longevity without removing every natural detail from the complexion.',
      ),
      quoteNode(
        'The best result is polished enough for the photograph and familiar enough for the person wearing it.',
      ),
    ),
    publishedAt: '2026-10-24T08:00:00.000Z',
    featured: true,
    tags: [
      { id: 'jt1', label: 'Bridal' },
      { id: 'jt2', label: 'Preparation' },
    ],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -702,
    title: 'What good skin preparation actually changes',
    slug: 'what-skin-preparation-changes',
    excerpt:
      'Why texture, hydration, timing, and restraint matter more than adding another layer of makeup.',
    featuredImage: demoImages.editorialNatural,
    content: richText(
      paragraphNode(
        'Beautiful complexion makeup starts before foundation. Preparation changes how product sits, how it moves, and how much coverage is needed later.',
      ),
      headingNode('Hydration is not the same as shine'),
      paragraphNode(
        'The right preparation supports flexibility and comfort while still allowing the final finish to be controlled for photography.',
      ),
      headingNode('More product is rarely the answer'),
      paragraphNode(
        'When texture looks heavy, adding coverage can make the problem more visible. Good preparation gives the artist room to use less.',
      ),
    ),
    publishedAt: '2026-10-08T08:00:00.000Z',
    featured: false,
    tags: [
      { id: 'js1', label: 'Skin' },
      { id: 'js2', label: 'Beauty' },
    ],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -703,
    title: 'Inside an editorial beauty morning',
    slug: 'inside-an-editorial-beauty-morning',
    excerpt:
      'A quieter look at references, lighting, testing texture, and the small decisions behind a finished beauty frame.',
    featuredImage: demoImages.journalEditorialProcess,
    content: richText(
      paragraphNode(
        'Editorial beauty work is often less about adding more and more about deciding what the image actually needs.',
      ),
      headingNode('The camera changes the conversation'),
      paragraphNode(
        'Lighting, lens choice, framing, wardrobe, and retouching direction all influence how makeup should be built.',
      ),
      quoteNode('A strong beauty image usually has one clear idea, not ten competing ones.'),
    ),
    publishedAt: '2026-09-18T08:00:00.000Z',
    featured: false,
    tags: [
      { id: 'je1', label: 'Editorial' },
      { id: 'je2', label: 'Behind the scenes' },
    ],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -704,
    title: 'A calmer wedding-morning timeline',
    slug: 'a-calmer-wedding-morning-timeline',
    excerpt:
      'A practical framework for timing makeup, dressing, photography, and final touch-ups without turning the morning into a race.',
    featuredImage: demoImages.bridalPrepJoy,
    content: richText(
      paragraphNode(
        'A beautiful bridal morning is often less about having more time and more about protecting the right pockets of time.',
      ),
      headingNode('Work backwards from photography'),
      paragraphNode(
        'Start with the first moment you need to be fully ready, then protect time for dressing, portraits, small delays, and one calm final check.',
      ),
      headingNode('Build in breathing room'),
      paragraphNode(
        'A little buffer changes the emotional pace of the morning. It gives the artist time to work precisely and gives you time to actually experience the day.',
      ),
    ),
    publishedAt: '2026-08-30T08:00:00.000Z',
    featured: false,
    tags: [
      { id: 'jw1', label: 'Wedding day' },
      { id: 'jw2', label: 'Planning' },
    ],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
  {
    id: -705,
    title: 'Choosing references your makeup artist can actually use',
    slug: 'choosing-useful-makeup-references',
    excerpt:
      'How to save inspiration that communicates finish, texture, color, and mood instead of asking one photograph to explain everything.',
    featuredImage: demoImages.paletteFlatlay,
    content: richText(
      paragraphNode(
        'A reference folder becomes much more useful when each image answers one question clearly.',
      ),
      headingNode('Separate skin, eyes, lips, and mood'),
      paragraphNode(
        'You may love the skin finish in one image, the eye shape in another, and the overall softness of a third. Saving those separately gives the artist better information.',
      ),
      quoteNode('References are a conversation tool, not a promise to copy another person’s face.'),
    ),
    publishedAt: '2026-08-12T08:00:00.000Z',
    featured: false,
    tags: [
      { id: 'jr1', label: 'Preparation' },
      { id: 'jr2', label: 'Consultation' },
    ],
    updatedAt: now,
    createdAt: now,
    _status: 'published',
  },
]

export const demoPortfolioCards = demoPortfolioProjects.map((project) => {
  const projectCategory =
    typeof project.category === 'object' ? project.category : demoPortfolioCategories[0]
  const image = typeof project.heroImage === 'object' ? project.heroImage : null

  return {
    categorySlug: projectCategory.slug,
    categoryTitle: projectCategory.title,
    excerpt: project.excerpt || null,
    id: project.id,
    image,
    location: project.location || null,
    slug: project.slug,
    title: project.title,
  }
})
