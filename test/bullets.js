import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('bullets', function () {
  let topic;

  before(function (done) {
    fs.readFile(path.join(__dirname, 'bullets.txt'), {encoding: 'utf8'}, (err, contents) => {
      if (err) return done(err);
      topic = contents;
      done();
    });
  });

  it('gets bullet', function () {
    const result = document.getStructure(topic.split('\n'));

    assert.deepEqual(result, {
      sections: [
        {start: 0, end: 0, length: 1, indent: 0, type: 'bulletList'},
        {start: 2, end: 2, length: 1, indent: 0, type: 'bulletList'},
        {start: 4, end: 8, length: 5, indent: 0, type: 'bulletList'},
        {start: 10, end: 10, length: 1, indent: 0, type: 'bulletList'}
      ],
      start: 0,
      end: 10,
      length: 11,
      indent: 0
    });
  });
});
