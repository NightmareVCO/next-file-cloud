export default function PolicyPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>

      <h2>General Information</h2>
      <p>
        Your privacy is important to us. This Privacy Policy outlines what
        personal data we collect, how we use it, and your rights regarding your
        data.
      </p>

      <h2>Data We Collect</h2>
      <p>
        With your consent, our web app collects the following information from
        your Google Account:
      </p>
      <ul>
        <li>
          <strong>
            Primary Email Address (scope: .../auth/userinfo.email)
          </strong>{" "}
          <br />
          We use this to identify you and personalize your experience on our
          platform. Your email address will not be shared with third parties
          without your explicit consent.
        </li>
        <li>
          <strong>
            Profile Information (scope: .../auth/userinfo.profile)
          </strong>{" "}
          <br />
          We access your public Google profile information, which may include
          your name, profile picture, and other public data you’ve shared. This
          helps us create a customized experience and improve your interaction
          with the app.
        </li>
        <li>
          <strong>OpenID (scope: openid)</strong> <br />
          This permission allows us to associate your Google identity with our
          application, ensuring account authenticity and data security.
        </li>
      </ul>

      <h2>Use of Information</h2>
      <p>
        All information we collect is used solely for the following purposes:
      </p>
      <ul>
        <li>To personalize and enhance your experience in the web app.</li>
        <li>To authenticate your account and protect your data.</li>
        <li>To improve our service and its security.</li>
      </ul>

      <h2>Information Storage and Protection</h2>
      <p>
        We are committed to keeping your data secure. We employ advanced
        security measures to prevent unauthorized access, and we do not store
        your personal information beyond what is necessary to fulfill the
        purposes outlined.
      </p>

      <h2>User Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access and update the information we have about you.</li>
        <li>Request the deletion of your data.</li>
        <li>Withdraw your consent at any time.</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For questions or requests related to this Privacy Policy, you can
        contact us at{" "}
        <a href="mailto:vladimircuriel@outlook.com">
          vladimircuriel@outlook.com
        </a>
        .
      </p>
    </section>
  );
}
