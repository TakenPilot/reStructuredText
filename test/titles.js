import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('titles', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'titles.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('get titles', function () {
    const result = document.getSections(topic.split('\n'));

    assert.deepEqual(result, [
      {start: 0, end: 1, length: 2, indent: 0, type: 'title'},
      {start: 3, end: 3, length: 1, indent: 0, type: 'paragraph'},
      {start: 5, end: 7, length: 3, indent: 0, type: 'title'},
      {start: 9, end: 9, length: 1, indent: 0, type: 'paragraph'},
      {start: 11, end: 13, length: 3, indent: 0, type: 'title'},
      {start: 15, end: 15, length: 1, indent: 0, type: 'paragraph'}
    ]);
  });

  it('gets HTML', function () {
    const lines = topic.split('\n'),
      sections = document.getSections(lines),
      html = document.getHTML(sections, lines);

    assert.equal(html, [
      '<h2 class="rst-title-1">text</h2>',
      '<p class="rst-paragraph">some words</p>',
      '<h2 class="rst-title-2">text</h2>',
      '<p class="rst-paragraph">some other words</p>',
      '<h2 class="rst-title-2">text</h2>',
      '<p class="rst-paragraph">some words more</p>'
    ].join(''));
  })
});
