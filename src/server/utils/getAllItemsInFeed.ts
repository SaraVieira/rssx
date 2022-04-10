import Parser, { Item } from 'rss-parser';
const parser: Parser<unknown, { 'content:encoded': string }> = new Parser({
  customFields: {
    item: ['content:encoded'],
  },
});

export const getAllItemsInFeed = async ({
  websiteId,
  url,
}: {
  url: string;
  websiteId: string;
}) => {
  const { items } = await parser.parseURL(url);
  return items.map((item: Item) => ({
    link: item.link,
    guid: item.guid,
    title: item.title,
    pubDate: item.pubDate,
    creator: item.creator,
    summary: item.summary,
    // @ts-ignore
    content: item['content:encoded'] || item.content,
    isoDate: item.isoDate,
    categories: item.categories || [],
    contentSnippet: item.contentSnippet,
    websiteId: websiteId,
  }));
};
