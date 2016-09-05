import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('transitions', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'transitions.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('gets transitions', function () {
    const result = document.getSections(topic.split('\n'));

    assert.deepEqual(result, [
      {start: 0, end: 0, length: 1, indent: 0, type: 'paragraph'},
      {start: 2, end: 2, length: 1, indent: 0, type: 'transition'},
      {start: 4, end: 4, length: 1, indent: 0, type: 'paragraph'},
      {start: 6, end: 6, length: 1, indent: 0, type: 'paragraph'},
      {start: 8, end: 8, length: 1, indent: 0, type: 'paragraph'},
      {start: 10, end: 10, length: 1, indent: 0, type: 'transition'},
      {start: 12, end: 12, length: 1, indent: 0, type: 'paragraph'}
    ]);
  });
});
