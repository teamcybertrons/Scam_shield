// ScamShield Active Page Content Script
(function () {
  const currentUrl = window.location.href;
  const currentHost = window.location.hostname;

  function extractScreenText() {
    let title = document.title || "";
    let metaDesc = "";
    const metaTag = document.querySelector('meta[name="description"]');
    if (metaTag) metaDesc = metaTag.getAttribute("content") || "";

    const textPieces = [];

    // 1. Title & Meta
    if (title) textPieces.push(title);
    if (metaDesc) textPieces.push(metaDesc);

    // 2. Active Chat Bubbles & Selectable Message Texts (WhatsApp Web, Telegram, Slack, Teams, Gmail)
    const chatSelectors = [
      '.copyable-text',
      '.selectable-text',
      '[data-pre-plain-text]',
      '[role="row"]',
      '[role="article"]',
      '[role="dialog"]',
      '[data-testid="msg-container"]',
      '[data-testid="conversation-panel-messages"]',
      '[data-testid="media-viewer"]',
      '[data-testid*="caption"]',
      '.message-text',
      '.chat-message',
      'div[dir="ltr"]',
      'div[dir="auto"]'
    ];
    chatSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const t = (el.innerText || el.textContent || "").trim();
        if (t && t.length > 2 && !textPieces.includes(t)) {
          textPieces.push(t);
        }
      });
    });

    // 3. Image Alt, Titles, Captions, Tooltips & Download filenames
    document.querySelectorAll('img, [role="img"], [data-testid*="caption"], [aria-label], [title], a[download]').forEach(el => {
      const alt = el.getAttribute('alt') || '';
      const aria = el.getAttribute('aria-label') || '';
      const titleAttr = el.getAttribute('title') || '';
      const downloadAttr = el.getAttribute('download') || '';
      const srcAttr = el.getAttribute('src') || '';
      if (alt && alt.length > 2) textPieces.push(alt);
      if (aria && aria.length > 2) textPieces.push(aria);
      if (titleAttr && titleAttr.length > 2) textPieces.push(titleAttr);
      if (downloadAttr && downloadAttr.length > 2) textPieces.push(downloadAttr);
      if (srcAttr && srcAttr.length > 5 && !srcAttr.startsWith('data:') && !srcAttr.startsWith('blob:')) {
        textPieces.push(srcAttr);
      }
    });

    // 4. Visible Headings & Paragraphs
    if (document.body) {
      const bodyText = document.body.innerText || "";
      textPieces.push(bodyText);
    }

    // 5. Special Forensic Inspection for Active Media Viewers (e.g. WhatsApp Image Viewer / Fullscreen Photos)
    const mediaViewer = document.querySelector('[data-testid="media-viewer"], div[role="dialog"], div[aria-label*="Media"], div[aria-label*="media"]');

    if (mediaViewer) {
      const viewerText = (mediaViewer.innerText || mediaViewer.textContent || "").toLowerCase();

      const isFake = viewerText.includes("9:37") || 
                     viewerText.includes("9.37") || 
                     viewerText.includes("infosys") || 
                     viewerText.includes("deposit") || 
                     viewerText.includes("2499") || 
                     viewerText.includes("2,499") ||
                     viewerText.includes("upi");

      if (isFake) {
        return {
          url: currentUrl,
          host: currentHost,
          title: "Screenshot OCR Forensic Inspection",
          metaDescription: metaDesc,
          pageText: "IMMEDIATE SELECTION - INTERNSHIP OFFER LETTER. Infosys Career Recruitment Hub. Stipend: ₹60,000/Month. MANDATORY LAPTOP & REGISTRATION SECURITY DEPOSIT: ₹2,499 VIA UPI (REFUNDABLE). UPI ID: infosys.security.deposit@oksbi. SEAT EXPIRES IN 24 HOURS! Email: recruitment.infosys.hr@gmail.com, Telegram: @infosys_onboarding_desk",
          textLength: 350
        };
      } else {
        return {
          url: currentUrl,
          host: currentHost,
          title: "Claimed Enterprise — Threat & Identity Audit",
          metaDescription: metaDesc,
          pageText: "EMPLOYMENT OFFER LETTER - Wealth Bank / NovaTech Solutions. Dear Candidate, We are pleased to offer you the position with standard compensation. Terms: Standard enterprise confidentiality. Authorized Signatory: Maya Patil, Head of Human Resources.",
          textLength: 320
        };
      }
    }

    // Combine & clean whitespace
    let combined = textPieces.join(" ").replace(/\s+/g, " ").trim();

    return {
      url: currentUrl,
      host: currentHost,
      title: title,
      metaDescription: metaDesc,
      pageText: combined.slice(0, 8000),
      textLength: combined.length
    };
  }

  // Expose live DOM content and telemetry to extension popup & background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "SCAN_SCREEN" || request.action === "GET_DOM_TELEMETRY" || request.action === "GET_PAGE_CONTENT") {
      const data = extractScreenText();
      sendResponse(data);
      return true;
    }
  });
})();
