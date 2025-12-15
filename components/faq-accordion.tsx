"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    category: "application",
    question: "How do I start my application?",
    answer:
      "To start your application, click the 'Apply Now' button on our homepage. You'll need to create an account first, then follow the step-by-step application form. Make sure to have all required documents ready before starting.",
  },
  {
    category: "application",
    question: "Can I save my application and continue later?",
    answer:
      "Yes! Your application progress is automatically saved as a draft. You can log back into your account at any time to continue where you left off. We recommend completing your application within 30 days of starting.",
  },
  {
    category: "application",
    question: "How do I check my application status?",
    answer:
      "Log into your student dashboard using your registered email and application ID. You'll see a timeline showing your current application status, from submission through verification to final decision.",
  },
  {
    category: "documents",
    question: "What documents are required for admission?",
    answer:
      "Required documents include: 10th and 12th marksheets, passport-sized photograph, government ID proof, and any relevant certificates. Specific courses may require additional documents like portfolio or entrance exam scores.",
  },
  {
    category: "documents",
    question: "What file formats are accepted for document upload?",
    answer:
      "We accept PDF, JPG, JPEG, and PNG formats. Each file should be under 5MB in size. Make sure documents are clearly scanned and all text is readable.",
  },
  {
    category: "documents",
    question: "Can I update my documents after submission?",
    answer:
      "You can update documents until your application is under review. Once the verification process begins, you'll need to contact our support team to make any changes.",
  },
  {
    category: "eligibility",
    question: "What are the minimum eligibility criteria?",
    answer:
      "Eligibility varies by course. Generally, you need a minimum of 50% aggregate in your qualifying examination. Some courses may have subject-specific requirements or entrance exam scores. Check the specific course page for detailed criteria.",
  },
  {
    category: "eligibility",
    question: "Is there an age limit for admission?",
    answer:
      "There is no upper age limit for most undergraduate programs. For certain professional courses, please check the specific eligibility requirements on the course details page.",
  },
  {
    category: "fees",
    question: "What is the application fee?",
    answer:
      "The application fee is $50 for domestic applicants and $75 for international applicants. This fee is non-refundable and must be paid to complete your application submission.",
  },
  {
    category: "fees",
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, net banking, and UPI payments. All transactions are secured with SSL encryption. You'll receive a payment confirmation via email.",
  },
  {
    category: "fees",
    question: "Are there any scholarships available?",
    answer:
      "Yes, we offer merit-based and need-based scholarships. Merit scholarships are automatically considered based on your academic performance. Need-based scholarships require a separate application after admission confirmation.",
  },
  {
    category: "technical",
    question: "I forgot my password. How do I reset it?",
    answer:
      "Click the 'Forgot Password' link on the login page. Enter your registered email address, and we'll send you a password reset link. The link is valid for 24 hours.",
  },
  {
    category: "technical",
    question: "The portal is not loading properly. What should I do?",
    answer:
      "Try clearing your browser cache and cookies, then refresh the page. We recommend using the latest version of Chrome, Firefox, or Safari. If issues persist, contact our technical support team.",
  },
  {
    category: "technical",
    question: "My document upload is failing. What could be wrong?",
    answer:
      "Common issues include: file size exceeding 5MB, unsupported file format, or unstable internet connection. Ensure your file meets our requirements and try uploading again. If the problem continues, try a different browser.",
  },
]

export function FAQAccordion() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 last:border-0">
              <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-slate-50/50 [&[data-state=open]]:bg-indigo-50/50">
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
