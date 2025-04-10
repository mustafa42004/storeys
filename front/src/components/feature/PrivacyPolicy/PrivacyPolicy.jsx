import { useState } from "react"
import Banner from "../../shared/Banner/Banner"
import { PrivacyBanner } from "../../../utils/static/bannerData"; // adjust this path as needed
import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import { useScrollToTop } from "../../../utils/scrollHook"

const PrivacyPolicy = () => {

  const [headerHeight, setHeaderHeight] = useState(0)

  useScrollToTop()

  return (
    <>
      <Header height={setHeaderHeight} />
      <Banner
        title={PrivacyBanner.title}
        bg={PrivacyBanner.bg}
        width={PrivacyBanner.width}
        height={PrivacyBanner.height}
        marginTop={headerHeight}
      />
      <div className="container mt-lg-4 mt-3 py-5">
        <h2 className="mb-4">Privacy Policy</h2>
        <p><strong>Effective Date:</strong> 01/04/2024</p>
        <p>
          This Privacy Policy explains how <strong>Storeys Real Estate</strong> ("we", "our", or "us") collects, uses, and protects the personal information of visitors ("you", "your") who use our website (the "Site"). By accessing our Site, you agree to the practices outlined in this policy.
        </p>

        <h4>1. Information We Collect</h4>
        <p>We may collect the following types of personal information:</p>
        <ul>
          <li><strong>Contact Information:</strong> Name, email address, phone number</li>
          <li><strong>Property Preferences:</strong> Budget, location, property type</li>
          <li><strong>Transaction Information:</strong> Property inquiries, bookings, service requests</li>
          <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage data via cookies</li>
        </ul>

        <h4>2. How We Use Your Information</h4>
        <p>We use your personal data to:</p>
        <ul>
          <li>Provide property listings and real estate services</li>
          <li>Respond to inquiries and customer service requests</li>
          <li>Send updates, offers, and newsletters (you can opt out at any time)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h4>3. Sharing Your Information</h4>
        <p>We do not sell your personal information. We may share your data with:</p>
        <ul>
          <li>Internal staff and agents of Storeys Real Estate</li>
          <li>Trusted third-party service providers (e.g., CRM systems, marketing platforms, mortgage advisors)</li>
          <li>Legal authorities when required by law or for compliance purposes</li>
        </ul>
        <p>All third-party partners are required to maintain confidentiality and adhere to data protection standards.</p>

        <h4>4. Cookies and Tracking</h4>
        <p>
          We use cookies to enhance user experience and analyze website performance. You can manage or disable cookies through your browser settings. However, some features of the Site may not function properly if cookies are disabled.
        </p>

        <h4>5. Data Security</h4>
        <p>
          We implement industry-standard measures to protect your information from unauthorized access, alteration, or disclosure. However, no online platform can guarantee complete security.
        </p>

        <h4>6. Your Rights</h4>
        <p>Depending on applicable laws, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction or deletion of your data</li>
          <li>Withdraw consent for certain processing activities</li>
          <li>Opt-out of marketing communications at any time</li>
        </ul>
        <p>To exercise your rights, please contact us using the details below.</p>

        <h4>7. Data Retention</h4>
        <p>
          We retain your information only as long as necessary for business purposes or as required by law.
        </p>

        <h4>8. Third-Party Links</h4>
        <p>
          Our Site may contain links to external websites. We are not responsible for the privacy practices or content of those websites.
        </p>

        <h4>9. Changes to This Policy</h4>
        <p>
          We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.
        </p>

        <h4>10. Contact Us</h4>
        <p>
          If you have questions about this Privacy Policy or your data, please contact us at:
        </p>
        <ul>
          <li>📧 <a href="mailto:enquiries@storeys.ae">enquiries@storeys.ae</a></li>
          <li>📞 <a href="tel:+971567897077">+971 56 7897077</a></li>
        </ul>
      </div>

      <Footer />
    </>
  )
}

export default PrivacyPolicy