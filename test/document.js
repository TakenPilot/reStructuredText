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
      const result = document.getSections(topic.split('\n'));

      console.log('result', result);

      assert.deepEqual(result, [
        {start: 0, end: 0, length: 1, indent: 0, type: 'comments'},
        {start: 2, end: 3, length: 2, indent: 0, type: 'comments'},
        {start: 5, end: 6, length: 2, indent: 0, type: 'comments'},
        {start: 8, end: 9, length: 2, indent: 0, type: 'comments'},
        {start: 11, end: 12, length: 2, indent: 0, type: 'comments'}
      ]);
    });

    it('gets HTML', function () {
      const lines = topic.split('\n'),
        sections = document.getSections(lines),
        html = document.getHTML(sections, lines);

      // three paragraphs with stuff in them
      assert.equal(html, 'expected three paragraphs with stuff in them');
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
      const result = document.getSections(topic.split('\n'));

      console.log('result', result);

      assert.deepEqual(result, [
        {start: 0, end: 0, length: 1, indent: 0, type: 'comments'},
        {start: 2, end: 3, length: 2, indent: 0, type: 'comments'},
        {start: 5, end: 6, length: 2, indent: 0, type: 'comments'},
        {start: 8, end: 9, length: 2, indent: 0, type: 'comments'},
        {start: 11, end: 12, length: 2, indent: 0, type: 'comments'}
      ]);
    });

    it('gets HTML', function () {
      const lines = topic.split('\n'),
        sections = document.getSections(lines),
        html = document.getHTML(sections, lines);

      // three paragraphs with stuff in them
      assert.equal(html, 'expected three paragraphs with stuff in them');
    });
  });
});
