import Claps from "@/components/(posts)/(post-detail)/post-detail/claps";
import PostDetailThumbnail from "@/components/(posts)/(post-detail)/post-detail/thumbnail";
import PostShare, {
  TwitterShare,
} from "@/components/(posts)/(post-detail)/post-share";
import DateTooltip, { IDateMode } from "@/components/ui/date-tooltip";
import { postivaClient } from "@/lib/postiva";
import { LucideEye, TimerIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const post = await postivaClient.contents.getContentBySlug(slug);
  const postUrl = process.env.NEXT_PUBLIC_URL + "/blogs/" + post.slug;

  const metadata: Metadata = {
    metadataBase: new URL(postUrl),
    title: post.title,
    description: post.description,
    authors: post.publishedBy?.user
      ? [{ name: post.publishedBy.user.name }]
      : [],
    creator: post.publishedBy?.user ? post.publishedBy.user.name : "",
    openGraph: {
      title: post.title,
      description: post.description || (post.seoDescription as string),
      url: postUrl,
      type: "article",
      publishedTime: post.publishedAt as string,
      modifiedTime: post.updatedAt as string,
      tags: post.categories?.map((category) => category.name) || [],
      siteName: "Postiva",
      images: [
        {
          url: post.thumbnail as string,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@aliosmandev",
      title: post.title || (post.seoTitle as string),
      description: post.description || (post.seoDescription as string),
      siteId: "@aliosmandev",
      creator: post.publishedBy?.user?.name || "",
      images: [
        {
          url: post.thumbnail as string,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };

  return metadata;
}

export default async function BlogDetail({
  params,
}: {
  params: { slug: string };
}) {
  const post = await postivaClient.contents.getContentBySlug(params.slug);

  return (
    <div className="flex flex-col gap-y-4 items-center pb-6">
      <div className="max-w-[400px] md:max-w-[600px] ">
        <div className="flex justify-between items-center mb-6">
          <div className="flex w-full sm:items-center gap-x-5 sm:gap-x-3">
            <div className="flex-shrink-0">
              <Image
                className="w-full object-cover rounded-lg"
                src={post?.publishedBy?.user?.image as string}
                alt={post.title}
                width={40}
                height={40}
              />
            </div>

            <div className="grow">
              <div className="flex justify-between items-center gap-x-2">
                <div>
                  <div className="hs-tooltip inline-block [--trigger:hover] [--placement:bottom]">
                    <div className="hs-tooltip-toggle sm:mb-1 block text-start">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {post?.publishedBy?.user?.name}
                      </span>
                    </div>
                  </div>
                  <ul className="text-xs text-gray-500 dark:text-gray-400 flex gap-x-2">
                    <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                      <DateTooltip
                        date={new Date(post?.publishedAt as string)}
                        mode={IDateMode.absolute}
                      />
                    </li>
                    {post.readingStatus && (
                      <li className="inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:size-1 before:bg-gray-300 before:rounded-full">
                        {post.readingStatus.minutes} min read
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <TwitterShare {...post} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-5 md:space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold md:text-3xl">{post?.title}</h2>
            {post.thumbnail && (
              <PostDetailThumbnail imageSrc={post.thumbnail as string} />
            )}
          </div>

          <article
            className="prose lg:prose-xl max-w-[600px] dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post?.html }}
          />

          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.categories.map((category) => (
                <a
                  key={category.id}
                  className="m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  href="#"
                >
                  {category.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="sticky bottom-6 inset-x-0 text-center">
        <div className="inline-block bg-white shadow-md rounded-full py-3 px-4 text-sm text-gray-500 dark:bg-gray-800 dark:text-gray-200">
          <div className="flex items-center gap-x-1.5">
            <PostShare {...post} />

            {post?.analytics?.views && (
              <Fragment>
                <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-700"></div>
                <div className="hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <LucideEye className="flex-shrink-0 size-4" />
                    {post.analytics.views} views
                    <span
                      className="hs-tooltip-content opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip"
                    >
                      Views
                    </span>
                  </button>
                </div>
              </Fragment>
            )}

            <Claps {...post} />

            {post.readingStatus && (
              <Fragment>
                <div className="block h-3 border-e border-gray-300 mx-3 dark:border-gray-700"></div>
                <div className="hs-tooltip inline-block">
                  <button
                    type="button"
                    className="hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    <TimerIcon className="flex-shrink-0 size-4" />
                    {post.readingStatus.minutes} min read
                    <span
                      className="hs-tooltip-content opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm"
                      role="tooltip"
                    >
                      Reading time
                    </span>
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
