import Navigation from "../../components/navigation"

export default function TermsAndConditions() {

   // WhatsApp Icon Component
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
    </svg>
  );

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 ">
      <Navigation />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-6">
            By accessing and using TranslateDocs, you accept and agree to be bound by the terms 
            and provision of this agreement. If you do not agree to abide by the above, please 
            do not use this service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Description of Service</h2>
          <p className="text-gray-700 mb-6">
            TranslateDocs provides AI-powered document translation services. We offer both free 
            and premium tiers with varying features, usage limits, and service levels. The service 
            includes smart rate limiting and error recovery mechanisms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Account</h2>
          <p className="text-gray-700 mb-4">
            To access certain features of our service, you may be required to create an account. You agree to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">User Responsibilities</h2>
          <p className="text-gray-700 mb-4">
            As a user of our service, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>Use the service only for lawful purposes</li>
            <li>Not upload copyrighted content without permission</li>
            <li>Not attempt to reverse engineer or exploit our systems</li>
            <li>Respect usage limits and fair use policies</li>
            <li>Not use the service to harm others or violate their rights</li>
            <li>Comply with all applicable local, state, national, and international laws</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Prohibited Uses</h2>
          <p className="text-gray-700 mb-4">
            You may not use our service:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700">
            <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
            <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
            <li>To submit false or misleading information</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Service Availability</h2>
          <p className="text-gray-700 mb-6">
            While we strive for high availability, we do not guarantee that our service will be 
            available at all times. We may experience downtime for maintenance, updates, or due 
            to factors beyond our control. We implement smart rate limiting to ensure fair usage 
            and maintain service quality for all users.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property Rights</h2>
          <p className="text-gray-700 mb-6">
            You retain ownership of all content you upload to our service. However, you grant us 
            a limited, non-exclusive license to process, translate, and store your content as necessary 
            to provide our services. We respect your intellectual property and automatically delete 
            processed documents according to our retention policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Payment Terms</h2>
          <p className="text-gray-700 mb-6">
            For premium services, payment is required in advance. All fees are non-refundable except 
            as required by law. We reserve the right to change our pricing with 30 days notice to 
            existing subscribers.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Termination</h2>
          <p className="text-gray-700 mb-6">
            We may terminate or suspend your account and bar access to the service immediately, 
            without prior notice or liability, under our sole discretion, for any reason whatsoever 
            and without limitation, including but not limited to a breach of the Terms.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer of Warranties</h2>
          <p className="text-gray-700 mb-6">
            The information on this website is provided on an "as is" basis. To the fullest extent 
            permitted by law, we exclude all representations, warranties, and conditions relating 
            to our website and the use of this website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            TranslateDocs shall not be liable for any indirect, incidental, special, consequential, 
            or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
            or other intangible losses, resulting from your use of the service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-6">
            These Terms shall be interpreted and governed by the laws of the State of California, 
            without regard to its conflict of law provisions. Our failure to enforce any right or 
            provision of these Terms will not be considered a waiver of those rights.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-6">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any 
            time. If a revision is material, we will provide at least 30 days notice prior to any 
            new terms taking effect.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Information</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Email: ntwarifrank100@gmail.com<br />
              Address: Kigali/Rwanda<br />
              Phone: +250 793 189 088
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/+250793189088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
                </a>
      </div>
    </div>
  )
}