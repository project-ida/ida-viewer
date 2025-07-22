import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';
import fg from 'fast-glob';
import toml from 'toml';
import type {
  CollectionDTO,
  ConfigFile,
  ConfigOverviewDTO,
  ImageSummaryDTO,
} from './types';

const isChildPath = (parent: string, child: string): boolean => {
  // from https://github.com/sindresorhus/is-path-inside
  const parentFolder = parent.substring(0, parent.indexOf('config.toml'));
  const childFolder = child.substring(0, child.indexOf('config.toml'));

  const relation = path.relative(parentFolder, childFolder);
  return Boolean(
    relation &&
      relation !== '..' &&
      !relation.startsWith(`..${path.sep}`) &&
      relation !== path.resolve(childFolder),
  );
};

export const configOverview = async (
  entryPaths: string[],
): Promise<ConfigOverviewDTO> => {
  const paths = await fg(
    entryPaths.map((p) => path.resolve(path.join(p, '/**/config.toml'))),
  );
  const configFiles: ConfigFile[] = paths
    .map((absolutePath) => {
      const data = toml.parse(fs.readFileSync(absolutePath, 'utf-8'));
      if (data.collection?.title || data.image?.title) {
        return {
          data,
          absolutePath,
          type: data.collection ? 'collection' : 'image',
        } as ConfigFile;
      } else {
        return null;
      }
    })
    .filter((r) => !!r);
  const collectionOwnedImagePaths: string[] = [];
  const collections: CollectionDTO[] = configFiles
    .filter((cf) => cf.type === 'collection')
    .map((cf) => ({
      title: cf.data.collection?.title || '',
      description: cf.data.collection?.description,
      // TODO: fix this O(n^2) nightmare
      images: configFiles
        .filter((cff) => cff.type === 'image')
        .filter((cff) => isChildPath(cf.absolutePath, cff.absolutePath))
        .map((cff) => {
          collectionOwnedImagePaths.push(cff.absolutePath);
          return {
            title: cff.data.image?.title || '',
            description: cff.data.image?.description,
            encodedPath: Buffer.from(cff.absolutePath).toString('base64url'),
          } as ImageSummaryDTO;
        }),
    }));
  const orphanImages: ImageSummaryDTO[] = configFiles
    .filter((cf) => cf.type === 'image')
    .filter((cf) => !collectionOwnedImagePaths.includes(cf.absolutePath))
    .map(
      (cf) =>
        ({
          title: cf.data.image?.title || '',
          description: cf.data.image?.description,
          encodedPath: Buffer.from(cf.absolutePath).toString('base64url'),
        }) as ImageSummaryDTO,
    );
  return {
    collections,
    orphanImages,
  };
};
