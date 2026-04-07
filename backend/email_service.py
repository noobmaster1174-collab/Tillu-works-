"""SMTP email service for sending notifications."""
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
OWNER_EMAIL = os.getenv("OWNER_EMAIL", "phanindra1174@gmail.com")


def send_email(to: str, subject: str, html_body: str) -> bool:
    """Send an HTML email. Returns True on success, False on failure."""
    if not SMTP_USER or not SMTP_PASS:
        print("[Email] SMTP credentials not configured. Skipping email.")
        return False
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"Tillu Works <{SMTP_USER}>"
        msg["To"] = to
        msg.attach(MIMEText(html_body, "html"))

        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to, msg.as_string())
        return True
    except Exception as e:
        print(f"[Email] Failed to send email to {to}: {e}")
        return False


def send_quote_notification(quote_data: dict) -> None:
    """Send quote notification to business owner and confirmation to customer."""
    products_list = ", ".join(quote_data.get("products", []))
    quantities = quote_data.get("quantities", {})
    qty_text = "<br>".join([f"&nbsp;&nbsp;• {k}: {v}" for k, v in quantities.items()]) if quantities else "Not specified"

    # Email to owner
    owner_html = f"""
    <div style="font-family: 'DM Sans', Arial, sans-serif; max-width:600px; margin:0 auto; background:#FAF9F6; border-radius:16px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#FF6B00,#FFD700); padding:32px; text-align:center;">
            <h1 style="color:white; font-size:24px; margin:0;">🖨️ New Quote Request</h1>
            <p style="color:rgba(255,255,255,0.85); margin:8px 0 0;">Tillu Works — Quote Notification</p>
        </div>
        <div style="padding:32px;">
            <h2 style="color:#1A1A1A; font-size:18px;">Customer Details</h2>
            <table style="width:100%; border-collapse:collapse;">
                <tr><td style="padding:8px 0; color:#6B7280; width:140px;">Name</td><td style="padding:8px 0; font-weight:600; color:#1A1A1A;">{quote_data.get('name')}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Email</td><td style="padding:8px 0; font-weight:600; color:#1A1A1A;">{quote_data.get('email')}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Phone</td><td style="padding:8px 0; font-weight:600; color:#1A1A1A;">{quote_data.get('phone')}</td></tr>
                <tr><td style="padding:8px 0; color:#6B7280;">Company</td><td style="padding:8px 0; color:#1A1A1A;">{quote_data.get('company') or '—'}</td></tr>
            </table>
            <h2 style="color:#1A1A1A; font-size:18px; margin-top:24px;">Products Requested</h2>
            <p style="color:#FF6B00; font-weight:600;">{products_list}</p>
            <p style="color:#4B5563; font-size:14px;"><strong>Quantities:</strong><br>{qty_text}</p>
            {f'<p style="color:#4B5563; font-size:14px;"><strong>Requirements:</strong><br>{quote_data.get("requirements")}</p>' if quote_data.get("requirements") else ""}
        </div>
        <div style="background:#1A1A1A; padding:20px; text-align:center;">
            <p style="color:rgba(255,255,255,0.5); font-size:12px; margin:0;">Tillu Works · Hyderabad · tilluworks.in</p>
        </div>
    </div>
    """
    send_email(OWNER_EMAIL, f"New Quote Request from {quote_data.get('name')}", owner_html)

    # Confirmation to customer
    customer_html = f"""
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:0 auto; background:#FAF9F6; border-radius:16px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#FF6B00,#FFD700); padding:32px; text-align:center;">
            <h1 style="color:white; font-size:24px; margin:0;">✅ Quote Received!</h1>
            <p style="color:rgba(255,255,255,0.85); margin:8px 0 0;">Tillu Works — Hyderabad</p>
        </div>
        <div style="padding:32px;">
            <p style="color:#1A1A1A; font-size:16px;">Hi <strong>{quote_data.get('name')}</strong>,</p>
            <p style="color:#4B5563; line-height:1.6;">Thank you for reaching out to Tillu Works! We've received your quote request for <strong>{products_list}</strong> and our team will get back to you within <strong>2 business hours</strong>.</p>
            <div style="background:#FF6B00; color:white; border-radius:12px; padding:20px; text-align:center; margin:24px 0;">
                <p style="margin:0; font-size:14px; opacity:0.85;">Need urgent help?</p>
                <p style="margin:8px 0 0; font-size:18px; font-weight:700;">📞 +91 99999 99999</p>
                <p style="margin:4px 0 0; font-size:13px; opacity:0.85;">or WhatsApp us anytime!</p>
            </div>
            <p style="color:#6B7280; font-size:14px;">Warm regards,<br><strong>Team Tillu Works</strong><br>Your Brand, Beautifully Printed</p>
        </div>
        <div style="background:#1A1A1A; padding:20px; text-align:center;">
            <p style="color:rgba(255,255,255,0.5); font-size:12px; margin:0;">© Tillu Works · Kukatpally, Hyderabad · hello@tilluworks.in</p>
        </div>
    </div>
    """
    send_email(quote_data.get("email"), "Your Quote Request — Tillu Works", customer_html)


def send_contact_notification(contact_data: dict) -> None:
    """Send contact form notification to owner and confirmation to sender."""
    owner_html = f"""
    <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto; background:#FAF9F6; border-radius:16px; overflow:hidden;">
        <div style="background:linear-gradient(135deg,#1A1A1A,#2D2D2D); padding:32px; text-align:center;">
            <h1 style="color:#FF6B00; font-size:22px; margin:0;">📩 New Contact Message</h1>
        </div>
        <div style="padding:32px;">
            <p><strong>From:</strong> {contact_data.get('name')} ({contact_data.get('email')})</p>
            <p><strong>Phone:</strong> {contact_data.get('phone')}</p>
            <p><strong>Message:</strong></p>
            <div style="background:#fff; border-left:4px solid #FF6B00; padding:16px; border-radius:8px; color:#4B5563;">
                {contact_data.get('message')}
            </div>
        </div>
    </div>
    """
    send_email(OWNER_EMAIL, f"Contact: {contact_data.get('name')}", owner_html)

    customer_html = f"""
    <div style="font-family:Arial,sans-serif; max-width:600px; margin:0 auto;">
        <div style="background:linear-gradient(135deg,#FF6B00,#FFD700); padding:32px; border-radius:16px 16px 0 0; text-align:center;">
            <h1 style="color:white; font-size:22px; margin:0;">Message Received! 🙏</h1>
        </div>
        <div style="padding:32px; background:#FAF9F6;">
            <p>Hi <strong>{contact_data.get('name')}</strong>, thanks for contacting Tillu Works. We'll reply to <strong>{contact_data.get('email')}</strong> shortly!</p>
            <p style="color:#6B7280; font-size:14px;">— Team Tillu Works, Hyderabad</p>
        </div>
    </div>
    """
    send_email(contact_data.get("email"), "We received your message — Tillu Works", customer_html)
