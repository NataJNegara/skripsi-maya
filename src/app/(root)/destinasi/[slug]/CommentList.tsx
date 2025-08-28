"use client";

import Spinner from "@/components/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getComment } from "@/lib/actions/commentActions";
import { Comment } from "@/types";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { formatDistanceToNow } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type CommentListProps = {
  userId: string | undefined;
  destinationId: string;
  slug: string;
};

const CommentList = ({ userId, destinationId, slug }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchComments = async () => {
        const res = await getComment(destinationId);
        setComments(res.comments);
      };
      fetchComments();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [destinationId]);

  const handleReload = async () => {
    const res = await getComment(destinationId);
    setComments(res.comments);
  };

  return (
    <div className="space-y-4">
      {userId ? (
        <CommentForm
          userId={userId}
          destinationId={destinationId}
          onCommentSubmit={handleReload}
        />
      ) : (
        <div className="border border-brand-secondary flex items-center justify-center">
          <div className="flex flex-col gap-2 py-6">
            <p className="font-semibold text-brand">
              Bergabung ke komunitas untuk berkomentar
            </p>
            <Button asChild>
              <Link
                href={`/sign-in?callbackUrl=/destinasi/${slug}`}
                className="w-fit self-center rounded-none bg-brand! hover:bg-brand-secondary!">
                Masuk
              </Link>
            </Button>
          </div>
        </div>
      )}

      {/* comments */}
      {isLoading && <Spinner />}
      {!isLoading && comments.length !== 0 && (
        <div className="flex flex-col gap-4 mt-16">
          {comments.map((comment) => (
            <div className="border-b border-brand-secondary" key={comment.id}>
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar>
                    <AvatarImage src={`${comment.user?.image}`} />
                    <AvatarFallback className="bg-brand-accent text-brand-white-alt">
                      {comment.user?.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold text-brand">
                      {comment.user?.name}
                    </p>
                    <p className="text-xs font-semibold text-gray-400">
                      {formatDistanceToNow(comment.createdAt, {
                        addSuffix: true,
                        locale: localeID,
                      })}
                    </p>
                  </div>
                </div>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentList;
