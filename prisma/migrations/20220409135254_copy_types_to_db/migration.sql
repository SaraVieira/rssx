-- AlterTable
ALTER TABLE "Feed" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "guid" TEXT,
ADD COLUMN     "isoDate" TEXT,
ADD COLUMN     "pubDate" TEXT,
ADD COLUMN     "summary" TEXT,
ALTER COLUMN "creator" DROP NOT NULL,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "contentSnippet" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL;
