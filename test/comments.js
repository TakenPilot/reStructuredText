import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('comments', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'comments.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('gets comments', function () {
    const result = document.getSections(topic.split('\n'));

    assert.deepEqual(result, [
      {start: 0, end: 0, length: 1, indent: 0, type: 'comments'},
      {start: 2, end: 3, length: 2, indent: 0, type: 'comments'},
      {start: 5, end: 6, length: 2, indent: 0, type: 'comments'},
      {start: 8, end: 9, length: 2, indent: 0, type: 'comments'},
      {start: 11, end: 12, length: 2, indent: 0, type: 'comments'}
    ]);
  });
});
