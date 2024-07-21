/* eslint-disable react/display-name */
"use client";
import { Content } from "@postiva/client";
import { MenuProvider } from "kmenu";
import { PostCard, PostLoader } from "../post-card";

import { postivaClient } from "@/lib/postiva";
import { Files } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostsFilters } from "./posts-filters";

const PostsSection = ({
  posts,
  randomPost,
}: {
  posts: Content[];
  randomPost: Content;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState<Content[]>(posts);
  const categories = useSearchParams().get("categories");

  const handleLoadPosts = async () => {
    const posts = await postivaClient.contents.getContents({
      pagination: {
        page: page,
        size: 7,
      },
      categories: categories?.split(","),
    });
    setAllPosts((prev) => [...prev, ...(posts.data || [])]);
    setHasMore(posts?.pagination?.totalPages > posts.pagination?.page);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isMounted) {
      handleLoadPosts();
    }
  }, [page]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleUpdateCategories = async () => {
    setIsLoading(true);
    setAllPosts([]);
    await handleLoadPosts();
    setPage(1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isMounted) {
      handleUpdateCategories();
    }
  }, [categories]);

  const computedPosts = allPosts.filter((post) => post.id !== randomPost.id);

  return (
    <MenuProvider
      dimensions={{ sectionHeight: 30, commandHeight: 50, commands: 6 }}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-x-10 gap-y-2">
          <h2 className="text-3xl font-medium">Recent Articles</h2>
          <PostsFilters />
        </div>
        <InfiniteScroll
          dataLength={allPosts.length}
          next={handleNextPage}
          hasMore={hasMore}
          scrollThreshold={0.5}
          loader={
            <Fragment>
              {new Array(3).fill(0).map((_, index) => (
                <PostLoader key={index} />
              ))}
            </Fragment>
          }
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading ? (
            new Array(3).fill(0).map((_, index) => <PostLoader key={index} />)
          ) : allPosts.length > 0 ? (
            computedPosts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <PostsSection.NotFound />
          )}
        </InfiniteScroll>
      </div>
    </MenuProvider>
  );
};

PostsSection.NotFound = () => {
  return (
    <div className="flex flex-col items-center col-span-full mt-20 text-center">
      <Files className="w-8 h-8 text-gray-600 mb-3" />
      <h2 className="text-xl font-medium text-gray-600">No articles found</h2>
      <p className="text-gray-600 w-[40%] mx-auto">
        We couldn&apos;t find any articles matching your criteria. Please try
        again with different filters.
      </p>
    </div>
  );
};

export default PostsSection;
