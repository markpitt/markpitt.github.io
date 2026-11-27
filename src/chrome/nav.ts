// The markpitt.dev site nav, in order. One list for every site that wears the chrome kit, so the
// main site and the project sites cannot drift. Adding an item moves the collapse width in
// chrome.css: re-measure it (see the comment there).

/** The main site's origin. Project sites link back to it absolutely. */
export const SITE_HOME = 'https://markpitt.dev';

/** The main site's home page sections: [anchor id, label]. */
export const SITE_SECTIONS: ReadonlyArray<readonly [string, string]> = [
  ['about', 'About'],
  ['expertise', 'Expertise'],
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

/** Pages beyond the home page: [key, path under the main site, label]. */
export const SITE_PAGES = [
  ['skills', '/claude-skills/', 'Skills'],
  ['projects', '/projects/', 'Projects'],
] as const;

export type SitePage = (typeof SITE_PAGES)[number][0];
