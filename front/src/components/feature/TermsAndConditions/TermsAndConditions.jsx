import { useState } from "react"
import Banner from "../../shared/Banner/Banner"
import { TermsBanner } from "../../../utils/static/bannerData"; // adjust this path as needed
import Footer from "../../shared/Footer/Footer"
import Header from "../../shared/Header/Header"
import { useScrollToTop } from "../../../utils/scrollHook"

const TermsAndConditions = () => {

  const [headerHeight, setHeaderHeight] = useState(0)

  useScrollToTop()

  return (
    <>
      <Header height={setHeaderHeight} />
      <Banner
        title={TermsBanner.title}
        bg={TermsBanner.bg}
        width={TermsBanner.width}
        height={TermsBanner.height}
        marginTop={headerHeight}
      />
      <div className="container mt-lg-4 mt-3 py-5">
        <h2 className="mb-4">Website Terms &amp; Conditions</h2>
        <p><strong>Effective Date:</strong> 01/04/2024</p>

        <p>
          Welcome to the Storeys Real Estate website ("Site"). By accessing or using this Site, you agree to comply with and be bound by the following terms and conditions. Please review them carefully. If you do not agree to these terms, you should not use this Site.
        </p>

        <h4>1. Acceptance of Terms</h4>
        <p>
          By accessing this Site, you agree to these Terms &amp; Conditions and our Privacy Policy. Storeys Real Estate reserves the right to change, modify, or update these terms at any time without prior notice. Continued use of the Site constitutes your acceptance of any changes.
        </p>

        <h4>2. Use of the Website</h4>
        <p>You agree to use this Site for lawful purposes only. You must not:</p>
        <ul>
          <li>Use the Site in any way that may impair its performance or accessibility.</li>
          <li>Use the Site to conduct any illegal activities or solicit any unlawful act.</li>
          <li>Attempt to gain unauthorized access to any part of the Site or our systems.</li>
        </ul>

        <h4>3. Intellectual Property</h4>
        <p>
          All content on this Site, including but not limited to text, graphics, logos, images, property listings, and software, is the property of Storeys Real Estate or its licensors and is protected by copyright, trademark, and other applicable laws. You may not copy, reproduce, or distribute any content without prior written permission.
        </p>

        <h4>4. Property Listings</h4>
        <p>
          Property information provided on this Site is for informational purposes only and is subject to change without notice. We make reasonable efforts to ensure the accuracy of listings, but we do not warrant or guarantee their completeness or reliability.
        </p>

        <h4>5. Third-Party Links</h4>
        <p>
          This Site may contain links to third-party websites. Storeys Real Estate is not responsible for the content, policies, or practices of any third-party websites.
        </p>

        <h4>6. Disclaimer of Warranties</h4>
        <p>
          The Site is provided "as is" and "as available" without warranties of any kind, either express or implied. Storeys Real Estate does not guarantee the accuracy, completeness, or timeliness of the information provided on the Site.
        </p>

        <h4>7. Limitation of Liability</h4>
        <p>
          To the fullest extent permitted by law, Storeys Real Estate shall not be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with your use or inability to use the Site.
        </p>

        <h4>8. User Submissions</h4>
        <p>
          Any content or communication you submit through the Site (e.g., inquiries, comments, or applications) will be treated as non-confidential. By submitting content, you grant us the right to use, reproduce, and publish such content for business purposes.
        </p>

        <h4>9. Governing Law</h4>
        <p>
          These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Dubai.
        </p>

        <h4>10. Contact Us</h4>
        <p>For any questions about these Terms &amp; Conditions, you can contact us at:</p>
        <ul>
          <li>📧 <a href="mailto:enquiries@storeys.ae">enquiries@storeys.ae</a></li>
          <li>📞 <a href="tel:+971567897077">+971 56 7897077</a></li>
        </ul>
      </div>

      <Footer />
    </>
  )
}

export default TermsAndConditions