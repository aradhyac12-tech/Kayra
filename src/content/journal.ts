export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readingMinutes: number;
  /** Set to true only after a qualified Ayurvedic practitioner has reviewed the text. */
  practitionerReviewed: boolean;
  body: { h?: string; p: string[] }[];
}

export const articles: Article[] = [
  {
    slug: 'reading-an-ayurvedic-label',
    title: 'Reading an Ayurvedic label',
    excerpt: 'What an ingredient list can tell you, what it cannot, and the questions worth asking about any herbal product.',
    date: '2026-10-14',
    readingMinutes: 4,
    practitionerReviewed: false,
    body: [
      {
        p: [
          'The word “Ayurvedic” on a pack describes a tradition, not a quality standard. It tells you very little about what is inside, where it came from or how it was made. The useful information is further down the label.',
        ],
      },
      {
        h: 'Start with the ingredient list',
        p: [
          'A clear list names each ingredient, ideally with the plant part used (root, leaf, fruit) and the botanical name alongside the common one. Ashwagandha, for example, is Withania somnifera; the botanical name removes doubt about which plant is meant.',
          'Notice whether an ingredient is a whole powder or an extract, and whether quantities are given. “Proprietary blend” without amounts makes comparison impossible.',
        ],
      },
      {
        h: 'Look for traceability',
        p: [
          'A batch number and a manufacturing or expiry date show that the product can be traced. The manufacturer’s name and address should be printed, and in India the product category determines which licences and labelling rules apply. If those details are missing, that is worth noticing.',
        ],
      },
      {
        h: 'Be careful with claims',
        p: [
          'Wording that promises to cure, treat or reverse a condition deserves caution. Traditional use is not the same as demonstrated effect, and a responsible label keeps the two apart.',
          'If you are pregnant, take regular medication or have a health condition, speak to a qualified practitioner or doctor before starting any herbal product. This article is general information and not medical advice.',
        ],
      },
    ],
  },
  {
    slug: 'prakriti-a-traditional-idea',
    title: 'Prakriti: a traditional idea, not a diagnosis',
    excerpt: 'A plain introduction to Prakriti in Ayurveda, and why an online quiz cannot replace a qualified practitioner.',
    date: '2026-10-14',
    readingMinutes: 4,
    practitionerReviewed: false,
    body: [
      {
        p: [
          'In Ayurveda, Prakriti refers to an individual’s natural constitution. Classical texts describe it through three principles, Vata, Pitta and Kapha, and the idea that each person carries them in a different balance.',
        ],
      },
      {
        h: 'What the idea is for',
        p: [
          'Within the tradition, Prakriti is a way of thinking about why people differ in routine, temperament and response to food and environment. Practitioners use it alongside a detailed conversation and examination, not as a stand-alone label.',
        ],
      },
      {
        h: 'What a quiz cannot do',
        p: [
          'A short online questionnaire cannot assess Prakriti in the way a trained practitioner would, and it is not a medical assessment. We have deliberately not built one into this website.',
          'Kaayra does not offer consultations or personalised recommendations at this stage. If you want an individual assessment, please consult a qualified Ayurvedic practitioner.',
        ],
      },
      {
        h: 'A note on evidence',
        p: [
          'Prakriti is a framework from a living traditional system. It should be described as that, and not presented as a laboratory-measured category. We will say so whenever we write about it.',
        ],
      },
    ],
  },
  {
    slug: 'from-classical-text-to-formulation',
    title: 'From classical text to formulation',
    excerpt: 'The questions we ask when a classical Ayurvedic preparation is considered for a modern product.',
    date: '2026-10-14',
    readingMinutes: 5,
    practitionerReviewed: false,
    body: [
      {
        p: [
          'Classical preparations such as Triphala or Dashamoola are described in traditional texts. Turning one of them into a modern product raises practical questions that the text alone cannot answer.',
        ],
      },
      {
        h: 'Which plants, from where',
        p: [
          'Plant identity, plant part, growing region and harvest all matter. We want to know who supplies each raw material and how its identity is confirmed.',
        ],
      },
      {
        h: 'How it is prepared',
        p: [
          'Powders, decoctions and tablets behave differently. The preparation method, the form and the packaging all affect how a product is used and how long it stays stable.',
        ],
      },
      {
        h: 'What could go wrong',
        p: [
          'Safety review comes before marketing. That includes contaminants, interactions, who should not use a product and what warnings belong on the pack.',
        ],
      },
      {
        h: 'What we are allowed to say',
        p: [
          'Regulation in India governs manufacturing licences and what can be claimed. We plan to take professional regulatory advice before any product is offered, and until then we describe our products only as concepts under development.',
        ],
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
