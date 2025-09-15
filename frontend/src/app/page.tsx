import Navigation from "../components/navigation"
import BookTranslationUpload from "../components/uploadBook"
import HowToUploadBook from "../components/howToUpload"
import WhyChoose from "../components/WhyChoose"
import MarketingTranslatorComponent from "../components/whoUse"
import TranslationAdvantages from "../components/keyAdvantages"
import Footer from "../components/footer"

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation />
      <BookTranslationUpload />
      <HowToUploadBook />
      <WhyChoose />
      <MarketingTranslatorComponent />
      <TranslationAdvantages />
      <Footer />
    </div>
  );
}
