import FeatureSection from "~/components/Base/FeatureSection";
import Footer from "~/components/Base/Footer";
import HeroSection from "~/components/Base/HeroSection";
import Navbar from "~/components/Base/Navbar";
import UserReviews from "~/components/Base/UserReview";
import { authOptions, CustomSession } from "./api/auth/[...nextAuth]/options";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session: CustomSession | null = await getServerSession(authOptions);
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar user={session?.user ?? null} />
      <HeroSection />
      <FeatureSection />
      <UserReviews />
      <Footer />
    </div>
  );
}
