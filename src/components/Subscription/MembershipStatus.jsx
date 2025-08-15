
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function MembershipStatus() {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["membershipStatus"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/subscription");
      return data;
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  if (isLoading) return <p>Loading membership...</p>;
  if (isError) return <p>Error loading membership</p>;

  return (
    <div>
      <h2>
        Membership Status:{" "}
        <span style={{ color: data?.membership === "premium" ? "green" : "red" }}>
          {data?.membership || "free"}
        </span>
      </h2>
      {data?.membership === "premium" && <p>🎉 You have premium access!</p>}
    </div>
  );
}
