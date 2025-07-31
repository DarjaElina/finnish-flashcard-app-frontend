import Carousel from "../Carousel/Carousel";

export default function Home({
  isAuthenticated,
  username,
}: {
  isAuthenticated?: boolean;
  username?: string;
}) {
  return <Carousel isAuthenticated={isAuthenticated} username={username} />;
}
