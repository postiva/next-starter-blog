"use client";
import { Content } from "@postiva/client";
import { MenuProvider } from "kmenu";
import { PostCard, PostLoader } from "../post-card";

import { postivaClient } from "@/lib/postiva";
import { Fragment, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PostsFilters } from "./posts-filters";

export const PostsSection = ({ posts }: { posts: Content[] }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Content[]>(posts);

  const handleLoadPosts = async () => {
    const posts = await postivaClient.contents.getContents({
      pagination: {
        page: page,
        size: 7,
      },
    });
    setAllPosts((prev) => [...prev, ...(posts.data || [])]);
    setHasMore(posts?.pagination?.totalPages > posts.pagination?.page);
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
          loader={
            <Fragment>
              {new Array(3).fill(0).map((_, index) => (
                <PostLoader key={index} />
              ))}
            </Fragment>
          }
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allPosts.length > 0 ? (
            allPosts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <div className="col-span-full">No posts found</div>
          )}
        </InfiniteScroll>
      </div>
    </MenuProvider>
  );
};
