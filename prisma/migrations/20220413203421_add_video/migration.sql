-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author_name" TEXT NOT NULL,
    "author_url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "provider_name" TEXT NOT NULL,
    "provider_url" TEXT NOT NULL,
    "thumbnail_height" INTEGER NOT NULL,
    "thumbnail_width" INTEGER NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "html" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);
