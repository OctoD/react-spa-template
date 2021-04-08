#!/usr/bin/env node

import glob from 'glob';
import { join } from 'path';
import { extract } from '@formatjs/cli';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { languages } from '../src/locales.mjs';
import { predicate, pipe, array } from 'tiinvo';

const defaultlanguage = 'en';
const fileformat = '.json';

const srcdir = join(process.cwd(), 'src');
const globsrc = join(srcdir, '**/*.{ts,tsx}');
const globfiles = glob.sync(globsrc);
const outdir = join(srcdir, 'lang');
const defaultfilepath = join(outdir, defaultlanguage + fileformat);

const defaultfileexists = existsSync(defaultfilepath);

const includesdts = (filename) => !filename.includes('.d.ts');
const filterdeclarations = array.filter(includesdts);

if (!existsSync(outdir)) {
  mkdirSync(outdir);
}

extract(filterdeclarations(globfiles), {}).then(messages => {
  const formatted = parseandformat(messages);
  let defaultlanguagefile;

  if (existsSync(getfilename(defaultlanguage))) {
    defaultlanguagefile = readmessagesfromfile(defaultlanguage);
  } else {
    defaultlanguagefile = formatted;
  }

  if (!defaultfileexists) {
    languages.forEach(language => writefile(language, formatted));
  } else {
    const otherlanguages = languages.filter(predicate.withdifferentvalue(defaultlanguage));
    const difftuples = diff(defaultlanguagefile, formatted)

    writefile(defaultlanguage, formatted)

    difftuples.forEach(([key, difftype]) => {
      console.info(`Key ${key} has been ${difftype} from default ${defaultlanguage}.json file`);
    });

    otherlanguages.forEach(language => {
      if (existsSync(getfilename(language))) {
        const file = {... readmessagesfromfile(language)};
        const diffedfile = applydiff(difftuples, file);

        writefile(language, diffedfile);
      } else {
        writefile(language, formatted);
      }
    });
  }
}).catch(console.error);

const formatmessage = messages => {
  const results = {}

  for (const [id, msg] of Object.entries(messages)) {
    results[id] = msg.defaultMessage;
  }

  return results
}

const parseandformat = pipe(
  JSON.parse,
  formatmessage,
);

const getfilename = (locale) => join(outdir, locale + fileformat);

const messagestostring = (messages) => JSON.stringify(messages, null, 4);

const parsejson = pipe(
  readFileSync,
  JSON.parse,
)

const readmessagesfromfile = pipe(
  getfilename,
  parsejson,
);

const writefile = (language, messages) => writeFileSync(getfilename(language), messagestostring(messages), { encoding: 'utf-8' });

//#region diffing

const difftypes = {
  added: 'added',
  changed: 'changed',
  removed: 'removed',
}

const applydiff = (diffarray, newdict) => {
  const dictcopy = JSON.parse(JSON.stringify(newdict));
  
  diffarray.forEach(([ key, difftype, value ]) => {
    if (difftype === difftypes.removed) {
      delete dictcopy[key];
    } else {
      dictcopy[key] = value;
    }
  });

  return sortkeys(dictcopy);
}

const diff = (olddict, newdict) => {
  const diffarray = [];
  
  for (const [key, value] of Object.entries(newdict)) {
    const hasolddictkey = key in olddict;
    const oldvalue = olddict[key];
  
    if (hasolddictkey && oldvalue === value) {
      continue;
    }

    if (hasolddictkey && oldvalue !== value) {
      diffarray.push([key, difftypes.changed, value]);
    }

    if (!hasolddictkey) {
      diffarray.push([key, difftypes.added, value]);
    }
  }

  for (const [key] of Object.entries(olddict)) {
    const haskey = key in newdict;

    if (!haskey) {
      diffarray.push([key, difftypes.removed, undefined]);
    }
  }

  return diffarray;
}

const sortkeys = (dict) => {
  const sorteddict = {};

  Object.keys(dict).sort().forEach(key => sorteddict[key] = dict[key]);

  return sorteddict;
}

//#endregion