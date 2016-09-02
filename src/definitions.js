
const directives = {
    attention: {behavior: 'admonition'},
    caution: {behavior: 'admonition'},
    danger: {behavior: 'admonition'},
    error: {behavior: 'admonition'},
    hint: {behavior: 'admonition'},
    important: {behavior: 'admonition'},
    note: {behavior: 'admonition'},
    tip: {behavior: 'admonition'},
    warning: {behavior: 'admonition'},
    admonition: {behavior: 'admonition'},
    image: {
      options: {
        text: ['alt', 'height', 'width', 'scale', 'align', 'target']
      }
    },
    figure: {
      options: {
        text: ['alt', 'height', 'width', 'scale', 'align', 'target', 'align', 'figwidth', 'figclass']
      }
    },
    topic: {},
    sidebar: {
      options: {
        text: ['subtitle']
      }
    },
    'line-block': {},
    'parsed-literal': {},
    code: {},
    math: {},
    rubric: {},
    epigraph: {},
    highlights: {},
    'pull-quote': {},
    compound: {},
    container: {},
    table: {
      options: {
        text: ['align']
      }
    },
    'csv-table': {
      options: {
        text: [
          'align', 'widths', 'header-rows', 'stub-columns', 'header', 'file', 'url', 'encoding',
          'delim', 'quote', 'keepspace', 'escape'
        ]
      }
    },
    'list-table': {
      options: {
        text: ['widths', 'header-rows', 'stub-columns', 'align']
      }
    },
    contents: {
      options: {
        text: ['backlinks'],
        integer: ['depth'],
        boolean: ['local']
      }
    },
    sectnum: {
      options: {
        text: ['prefix', 'suffix'],
        integer: ['depth', 'start']
      }
    },
    'section-numbering': {
      options: {
        text: ['prefix', 'suffix'],
        integer: ['depth', 'start']
      }
    },
    header: {},
    footer: {},
    footnotes: {notImplemented: true},
    'target-notes': {notImplemented: true},
    citations: {notImplemented: true},
    meta: {notImplemented: true},
    imagemap: {notImplemented: true},
    replace: {notImplemented: true},
    unicode: {notImplemented: 'Just use unicode directly.'},
    date: {notImplemented: true},
    include: {
      options: {
        text: ['start-after', 'end-before', 'code', 'encoding'],
        integer: ['start-line', 'end-line', 'tab-width', 'number-lines'],
        boolean: ['literal']
      }
    },
    raw: {
      options: {
        text: ['file', 'url', 'encoding']
      }
    },
    class: {},
    role: {},
    'default-role': {},
    title: {}
  };


export default {
  directives
}
