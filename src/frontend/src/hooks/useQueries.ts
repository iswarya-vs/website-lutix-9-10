import { createActor } from "@/backend";
import type { EnquiryInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useEnquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listEnquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitEnquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: EnquiryInput) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.submitEnquiry(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}
