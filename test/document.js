import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

describe('document', function () {
  let topic;

  describe('int', function () {
    before(function (done) {
      fs.readFile(path.join(__dirname, 'docstring-examples', 'int.txt'), {encoding: 'utf8'}, (err, contents) => {
        if (err) return done(err);
        topic = contents;
        done();
      });
    });

    it('gets sections', function () {
      const result = document.getStructure(topic.split('\n'));

      assert.deepEqual(result, {
        sections: [
          {start: 0, end: 0, length: 1, indent: 0, type: 'paragraph'},
          {start: 2, end: 193, length: 192, indent: 0, type: 'paragraph'}
        ],
        start: 0,
        end: 193,
        length: 194,
        indent: 0
      });
    });

    it('gets HTML', function () {
      const lines = topic.split('\n'),
        structure = document.getStructure(lines),
        html = document.getHTML(structure, lines);

      // three paragraphs with stuff in them
      assert(html.match(/(<p class="rst-paragraph">.+<\/p>){2}/g), 'expected two paragraphs with stuff in them');
    });
  });

  describe('matplotlib', function () {
    before(function (done) {
      fs.readFile(path.join(__dirname, 'docstring-examples', 'matplotlib.txt'), {encoding: 'utf8'}, (err, contents) => {
        if (err) return done(err);
        topic = contents;
        done();
      });
    });

    it('gets sections', function () {
      const result = document.getStructure(topic.split('\n'));

      assert.deepEqual(result, {
        sections: [
          {start: 0, end: 1, length: 2, indent: 0, type: 'paragraph'},
          {start: 3, end: 4, length: 2, indent: 0, type: 'paragraph'},
          {start: 6, end: 102, length: 97, indent: 0, type: 'paragraph'},
          {start: 104, end: 186, length: 83, indent: 0, type: 'paragraph'},
          {start: 188, end: 190, length: 3, indent: 0, type: 'paragraph'},
          {start: 192, end: 450, length: 259, indent: 0, type: 'paragraph'},
          {start: 452, end: 701, length: 250, indent: 0, type: 'paragraph'},
          {start: 703, end: 727, length: 25, indent: 0, type: 'paragraph'},
          {start: 729, end: 730, length: 2, indent: 0, type: 'paragraph'}
        ],
        start: 0,
        end: 730,
        length: 731,
        indent: 0
      });
    });

    it('gets HTML', function () {
      const lines = topic.split('\n'),
        structure = document.getStructure(lines),
        html = document.getHTML(structure, lines);

      // three paragraphs with stuff in them
      assert(html.match(/(<p class="rst-paragraph">.+<\/p>){9}/g), 'expected nine paragraphs with stuff in them');
    });
  });
});
