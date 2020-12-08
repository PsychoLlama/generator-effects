import runtime, { fs, log } from 'effect-runtime';

runtime(function* () {
  try {
    const contents = yield fs.readFile('./package.json', 'utf8');
    yield log.print('File contents:', contents);
  } catch (error) {
    yield log.print('No such file.');
  }
});
