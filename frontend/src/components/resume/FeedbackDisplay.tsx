import React from "react";

interface LearningResource {
  title: string;
  url: string;
}

interface Feedback {
  strengths: string[];
  missingSkills: string[];
  suggestions: string[];
  learningResources: LearningResource[];
}

interface FeedbackDisplayProps {
  feedback: Feedback;
  onClose: () => void;
  mode?: "modal" | "inline";
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  feedback,
  onClose,
  mode = "modal",
}) => {
  const downloadPDF = async () => {
    //  Lazy-load jsPDF ONLY when needed
    const { jsPDF } = await import("jspdf");

    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 40;
    const maxWidth = pageWidth - 2 * margin;
    let y = 60;
    const lineHeight = 16;

    const addPageIfNeeded = (requiredSpace: number) => {
      if (y + requiredSpace > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
    };

    pdf.setFontSize(18);
    pdf.text("Resume Feedback Summary", margin, y);
    y += 30;

    pdf.setFontSize(14);

    const renderList = (title: string, items: string[]) => {
      addPageIfNeeded(24);
      pdf.text(title, margin, y);
      y += 18;

      items.forEach((item) => {
        const lines = pdf.splitTextToSize(`• ${item}`, maxWidth - 20);
        addPageIfNeeded(lines.length * lineHeight);
        pdf.text(lines, margin + 20, y);
        y += lines.length * lineHeight;
      });

      y += 10;
    };

    renderList("Strengths", feedback.strengths);
    renderList("Skill Gaps", feedback.missingSkills);
    renderList("Recommendations", feedback.suggestions);

    if (feedback.learningResources.length > 0) {
      addPageIfNeeded(20);
      pdf.text("Learning Resources", margin, y);
      y += 20;

      feedback.learningResources.forEach((res) => {
        pdf.setTextColor(13, 148, 136);
        pdf.textWithLink(`• ${res.title}`, margin + 20, y, {
          url: res.url,
        });
        y += lineHeight;
        pdf.setTextColor(0, 0, 0);
      });
    }

    pdf.save("Resume_Feedback.pdf");
  };

  return (
    <div
      className={
        mode === "modal"
          ? "fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
          : "h-full"
      }
    >
      <div
        className={
          mode === "modal"
            ? "w-full max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden"
            : "h-full bg-white rounded-2xl border shadow-sm flex flex-col"
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Resume Feedback
          </h2>
          {mode === "modal" && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500 text-lg"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-xl bg-teal-50 p-4">
            <h3 className="font-semibold text-teal-700 mb-2">
              Strengths
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {feedback.strengths.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-700 mb-2">
              Skill Gaps
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {feedback.missingSkills.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl bg-gray-50 p-4 lg:col-span-2">
            <h3 className="font-semibold text-teal-700 mb-2">
              Recommendations
            </h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {feedback.suggestions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          {feedback.learningResources.length > 0 && (
            <section className="rounded-xl border p-4 lg:col-span-2">
              <h3 className="font-semibold text-teal-700 mb-2">
                Learning Resources
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1">
                {feedback.learningResources.map((res, idx) => (
                  <li key={idx}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:text-teal-800 underline"
                    >
                      {res.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4">
          <button
            onClick={downloadPDF}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackDisplay;
