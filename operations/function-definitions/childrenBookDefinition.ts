const childrenBookDefinition = [
  {
    name: 'createAChildrensBook',
    description: `This function creates an entire *short* childrens book along with all of its pages (about ~5). It takes in a topic and a title and returns a childrens book object. These stories need to be profound and meaningful- reminiscent of the world's most important and transcendent children's stories and possesing profoundly archetypal characters rich in meaning and symbolism. It needs to be a powerful and profound narrative structure that is entertaining to read. Make sure that the language is simple and inocent like a childrens book.`,
    parameters: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Title of the book- needs to be creative, powerful, and intruiging'
        },
        topic: {
          type: 'string',
          description: 'Topic of the book'
        },
        introduction: {
          type: 'string',
          description:
            'Front cover introduction to the book. Needs to be as intruiging and mystifying as possible to get the reader hooked'
        },
        narrativeStructure: {
          type: 'string',
          description: 'strong one sentence description of the narrative structure of the book. '
        },
        archetypes_characters: {
          type: 'string',
          description:
            'This is a bulleted list of the characters in the book. It also has a description of the archetypes that they and their struggles represent. The archetypes need to be profound and meaningful. The characters need to be rich in symbolism and meaning.'
        },
        pages: {
          type: 'array',
          description:
            'Array of pages in the book- each page should be about ~2-4 sentences. Each page is an item inside of the array with text inside of it. This is the content of the book- return the writing in markdown if need be',
          items: {
            principle: {
              type: 'dictionary',
              description: 'dictionaries of the 10 pages of the book.',
              items: {
                page_number: {
                  type: 'number',
                  description: 'page number'
                },
                chapter_name: {
                  type: 'string',
                  description: 'Name that the chapter is called'
                },
                page_contents: {
                  type: 'number',
                  description: 'contents of the page of the book'
                }
              }
            }
          }
        }
      },
      required: [
        'title',
        'topic',
        'introduction',
        'narrativeStructure',
        'archetypes_characters',
        'pages'
      ]
    }
  }
];

export default childrenBookDefinition;
