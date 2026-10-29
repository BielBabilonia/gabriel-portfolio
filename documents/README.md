# Documents

Every PDF in this folder is published on the site, in the "Documents" section, on the next build/deploy.

- Name files so the site can tell what they are:
  - résumé: contains `resume`, `curriculo` or `cv`
  - cover letter: contains `cover` or `carta`
  - language: ends with `-EN` / `-en` for English or `-PT` / `-pt` for Portuguese
    (otherwise `resume`/`cover` count as English and `curriculo`/`carta` as Portuguese)
- For a custom title, add the file name to `documentInfo` in `src/content/profile.ts`.
- Everything here is public. Remove anything you don't want on the internet (phone number, address).
