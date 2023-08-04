export const defaultItem = {
  subject: '',
  topics: [
    {
      topic: '',
      decks: [
        {
          deck: '',
          cards: [
            {
              title: '',
              keywords: [],
            },
          ],
        },
      ],
    },
  ],
};

export const dummyData = [
  {
    subject: 'Subject 1',
    topics: [
      {
        topic: 'Topic 1',
        decks: [
          {
            deck: 'Deck 1',
            cards: [
              {
                title: 'Card 1',
                keywords: ['kw1', 'kw2', 'kw3'],
              },
              {
                title: 'Card 2',
                keywords: ['kw4', 'kw5', 'kw6'],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    subject: 'Subject 2',
    topics: [
      {
        topic: 'Topic 1',
        decks: [
          {
            deck: 'Deck 1',
            cards: [
              {
                title: 'Card 1',
                keywords: ['kw1', 'kw2', 'kw3'],
              },
            ],
          },
        ],
      },
    ],
  },
];
