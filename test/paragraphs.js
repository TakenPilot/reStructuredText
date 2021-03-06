import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('paragraphs', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'paragraphs.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('gets paragraph sections', function () {
    const result = document.getStructure(topic.split('\n'));

    assert.deepEqual(result, {
        sections: [
          {start: 0, end: 4, length: 5, indent: 0, type: 'paragraph'},
          {start: 6, end: 11, length: 6, indent: 0, type: 'paragraph'},
          {start: 13, end: 19, length: 7, indent: 0, type: 'paragraph'}
        ],
        start: 0,
        end: 19,
        length: 20,
        indent: 0
      }
    );
  });

  it('gets HTML', function () {
    const lines = topic.split('\n'),
      structure = document.getStructure(lines),
      html = document.getHTML(structure, lines);

    // three paragraphs with stuff in them
    assert(html.match(/(<p class="rst-paragraph">.+<\/p>){3}/g), 'expected three paragraphs with stuff in them');
  });
});
